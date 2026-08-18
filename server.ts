import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI
let genAI: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAI;
}

// API: Ask Aunt Minty
app.post("/api/ask-minty", async (req, res) => {
  try {
    const { question, context } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const ai = getGemini();
    if (!ai) {
      // Friendly fallback if API key is not yet set
      return res.json({
        answer: `Hello there! Aunt Minty here! In our story with Silas, we learned that money in a piggy bank takes a long nap. To answer your question: "${question}", remember that whenever you put your money into a bank or credit union, it earns interest—a little 'thank you bonus' that helps your money grow faster than rising prices (inflation) so you can reach your telescope goals!`,
        fallback: true,
      });
    }

    const systemInstruction = `You are Aunt Minty from the children's financial literacy storybook "Beyond the Piggy Bank".
You are a warm, encouraging, smart mentor who explains finance to kids and young learners (ages 7-14) using space, gardening, and real-life metaphors.
Key concepts in your book:
- Silas saved coins in his piggy bank "Belly" to buy a telescope to see Saturn's rings.
- Idle cash loses purchasing power to inflation ("money is getting smaller while things get bigger").
- Banks & credit unions lend money to help people buy homes and start businesses, paying depositors "interest" (a thank-you bonus).
- Compound interest is like a sprout growing leaves that grow their own sprouts ("building a ladder to the stars").
- Smart money bucketing: keep a few loose quarters in Belly for the ice cream truck, put the rest in a High-Yield Savings Account (HYSA) for the telescope.

Keep responses warm, kid-friendly (2-3 concise paragraphs), conversational, and always connect to Silas's story or astronomy/sprouts where fitting.`;

    const prompt = `A young student asked you: "${question}".
Context: ${context || "General question about the story or financial literacy."}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ answer: response.text });
  } catch (error: any) {
    console.error("Gemini ask-minty error:", error);
    res.status(500).json({
      answer: "Aunt Minty is checking her financial notebook right now! Remember: saving in a high-yield account puts your money to work so inflation doesn't win the race!",
      error: error.message,
    });
  }
});

// API: Generate Custom Goal Worksheet / Math Story
app.post("/api/custom-worksheet", async (req, res) => {
  try {
    const { studentName, goalItem, goalCost, currentSavings, allowanceOrChores } = req.body;
    const ai = getGemini();

    if (!ai) {
      return res.json({
        worksheet: {
          title: `${studentName || "Young Learner"}'s Savings Mission to the Stars`,
          storyIntro: `Just like Silas saved for his telescope to see Saturn, ${studentName || "you"} are saving $${goalCost || 100} for ${goalItem || "a dream goal"}! Right now, you have $${currentSavings || 20} saved up.`,
          questions: [
            {
              id: "q1",
              question: `How much more money do you need to reach $${goalCost || 100}?`,
              mathExpression: `$${goalCost || 100} - $${currentSavings || 20} = ?`,
              answer: `${(goalCost || 100) - (currentSavings || 20)}`,
              hint: "Subtract what you have from what you need!",
            },
            {
              id: "q2",
              question: `If you earn $${allowanceOrChores || 10} each month, how many months will it take in a Piggy Bank?`,
              mathExpression: `Remaining Goal ÷ Monthly Savings`,
              answer: `${Math.ceil(((goalCost || 100) - (currentSavings || 20)) / (allowanceOrChores || 10))}`,
              hint: "Divide the remaining dollars by your monthly earnings.",
            },
            {
              id: "q3",
              question: `Why is putting this in a High-Yield Savings Account (HYSA) better than leaving it under a mattress?`,
              answer: "Because the bank pays interest ('thank you bonus') and prevents inflation from making the item more expensive!",
              hint: "Think about Aunt Minty's Inflation Race!",
            },
          ],
        },
      });
    }

    const prompt = `Generate an interactive custom worksheet for a student based on the style and tone of "Beyond the Piggy Bank".
Student Name: ${studentName || "Alex"}
Dream Goal: ${goalItem || "Astronomy Telescope"}
Target Cost: $${goalCost || 150}
Current Savings: $${currentSavings || 30}
Monthly chore/earning rate: $${allowanceOrChores || 15}

Format your response as valid JSON with this structure:
{
  "title": "A creative title featuring the student and their goal",
  "storyIntro": "A 2-3 sentence personalized story opening connecting their dream to Silas and Aunt Minty",
  "questions": [
    {
      "id": "q1",
      "question": "A math or concept question",
      "mathExpression": "optional math formula/expression",
      "answer": "the numerical or short correct answer",
      "hint": "helpful hint from Aunt Minty"
    },
    {
      "id": "q2",
      "question": "A timeline question comparing piggy bank vs interest-earning account",
      "mathExpression": "math expression",
      "answer": "answer",
      "hint": "helpful hint"
    },
    {
      "id": "q3",
      "question": "A conceptual question about inflation or compound interest",
      "answer": "answer explanation",
      "hint": "helpful hint"
    },
    {
      "id": "q4",
      "question": "A smart bucketing question (how much for immediate ice cream vs big goal)",
      "answer": "answer explanation",
      "hint": "helpful hint"
    }
  ],
  "auntMintyTip": "An inspiring piece of advice from Aunt Minty for this specific goal"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ worksheet: parsed });
  } catch (error: any) {
    console.error("Gemini custom worksheet error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
