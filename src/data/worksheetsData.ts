import { Worksheet } from '../types';

export const WORKSHEETS_DATA: Worksheet[] = [
  {
    id: "ws-1",
    title: "Worksheet 1: Belly the Pig & The Mystery of Idle Cash",
    subtitle: "Understanding why money in a piggy bank takes a 'very long nap' and loses purchasing power",
    gradeLevel: "Grades 3 - 6",
    estimatedTime: "15 - 20 mins",
    relatedPages: [1, 2, 3],
    icon: "PiggyBank",
    conceptSummary: "Idle cash in a ceramic piggy bank stays safe from being spent, but it doesn't earn any interest and loses value as prices rise (inflation).",
    storybookConnection: "In Chapter 1-3, Silas shakes his heavy pig 'Belly' and realizes that despite being full, the telescope price is slipping away.",
    questions: [
      {
        id: "ws1-q1",
        questionNumber: 1,
        title: "Vocabulary Check: The Sleeping Money",
        prompt: "What does Aunt Minty mean when she says Silas's money in Belly the Pig is 'having a very long nap'?",
        type: "multiple-choice",
        conceptTag: "Idle Cash",
        options: [
          "The coins are literally tired and need bedtime",
          "The money is sitting still without earning any interest or growing to beat rising prices",
          "The piggy bank is too dark inside for coins to see",
          "The bank teller is sleeping on the job"
        ],
        correctOptionIndex: 1,
        hint: "Think about what happens to money that stays under a mattress or inside ceramic vs a bank.",
        explanation: "Idle cash doesn't work for you. It stays static while store prices climb higher over time."
      },
      {
        id: "ws1-q2",
        questionNumber: 2,
        title: "Silas's Piggy Math",
        prompt: "Silas counted $120 inside Belly the Pig. The high-powered telescope to see Saturn costs $320 today. How many more dollars does Silas need right now?",
        type: "number-input",
        conceptTag: "Goal Math",
        mathExpression: "$320 (Telescope Price) - $120 (Belly's Coins) = ?",
        correctNumber: 200,
        tolerance: 0,
        hint: "Subtract the $120 he already saved from the $320 total price.",
        explanation: "$320 - $120 = $200. Silas is currently $200 short of his astronomy goal."
      },
      {
        id: "ws1-q3",
        questionNumber: 3,
        title: "Sorting Activity: Piggy Bank vs. Credit Union Bank Account",
        prompt: "Sort these 6 features into either 'Piggy Bank (Idle Cash)' or 'Bank Account (High-Yield)' based on what Aunt Minty taught Silas:",
        type: "sorting",
        conceptTag: "Financial Systems",
        sortingItems: [
          { id: "s1", text: "Pays you monthly interest ('thank you' bonus)", correctBucket: "bank" },
          { id: "s2", text: "Keeps loose quarters handy for the ice cream truck", correctBucket: "piggy" },
          { id: "s3", text: "Loses purchasing power over years due to inflation", correctBucket: "piggy" },
          { id: "s4", text: "Gives you a digital monthly statement tracking growth", correctBucket: "bank" },
          { id: "s5", text: "Helps your money work while you are asleep or at school", correctBucket: "bank" },
          { id: "s6", text: "Coins sit in a 'ceramic prison' without multiplying", correctBucket: "piggy" }
        ],
        hint: "Remember: Bank accounts pay interest and protect against inflation; piggy banks are good for immediate pocket money.",
        explanation: "Bank accounts put money to work in a larger system with interest, while piggy banks hold physical idle coins."
      },
      {
        id: "ws1-q4",
        questionNumber: 4,
        title: "Purchasing Power Concept",
        prompt: "If Silas keeps his $120 in Belly for 3 years without adding anything, what will happen to his purchasing power as telescope prices increase?",
        type: "multiple-choice",
        conceptTag: "Purchasing Power",
        options: [
          "His purchasing power will increase because the coins get older and rarer",
          "His purchasing power will decrease because the $120 will buy less telescope than it could today",
          "His purchasing power will stay exactly identical",
          "The piggy bank will double the amount to $240"
        ],
        correctOptionIndex: 1,
        hint: "Remember Aunt Minty's rule: 'Your money is getting smaller while the things you want to buy are getting bigger.'",
        explanation: "Because of inflation, the same $120 will buy fewer goods and services in the future."
      }
    ]
  },
  {
    id: "ws-2",
    title: "Worksheet 2: The Great Inflation Race",
    subtitle: "Tracking how prices climb and how your savings must run fast to win the race",
    gradeLevel: "Grades 4 - 7",
    estimatedTime: "20 - 25 mins",
    relatedPages: [7, 8],
    icon: "TrendingUp",
    conceptSummary: "Inflation makes goods more expensive over time because the cost of materials and labor increases. Savings must grow with interest to keep pace.",
    storybookConnection: "On Page 7 & 8, Silas sees a vintage shop poster showing a telescope for half price, and Aunt Minty explains the two-track race between inflation and interest.",
    questions: [
      {
        id: "ws2-q1",
        questionNumber: 1,
        title: "The Vintage Poster Mystery",
        prompt: "Why did the vintage poster in the shop window show a telescope priced at only $100 twenty years ago, while today's model is $200?",
        type: "multiple-choice",
        conceptTag: "Inflation Drivers",
        options: [
          "The older telescope was made out of cardboard and plastic",
          "Over time, the cost of materials (like precision glass/metal) and worker labor has increased (inflation)",
          "The store owner wanted to trick Silas",
          "Astronomers made Saturn farther away"
        ],
        correctOptionIndex: 1,
        hint: "Aunt Minty told Silas that the cost of materials and labor generally increases over time.",
        explanation: "Inflation is driven by rising costs for raw materials, manufacturing technology, transport, and wages over time."
      },
      {
        id: "ws2-q2",
        questionNumber: 2,
        title: "The Telescope Price Escalator",
        prompt: "A high-powered telescope costs $300 today. If inflation causes its price to increase by $15 next year, what will be its new price?",
        type: "number-input",
        conceptTag: "Inflation Math",
        mathExpression: "$300 (Today's Price) + $15 (1-Year Inflation) = ?",
        correctNumber: 315,
        tolerance: 0,
        hint: "Add the inflation increase ($15) to today's base price ($300).",
        explanation: "$300 + $15 = $315. The price climbs to $315 due to inflation."
      },
      {
        id: "ws2-q3",
        questionNumber: 3,
        title: "The Two-Runner Race",
        prompt: "In Aunt Minty's two-finger race metaphor, Runner A is 'Inflation' running at 3 mph. Runner B is Silas's money in a 5% High-Yield Savings Account running at 5 mph. Who wins the race?",
        type: "multiple-choice",
        conceptTag: "Real Return",
        options: [
          "Inflation wins because prices are unstoppable",
          "Silas's High-Yield Savings Account wins because 5% interest grows faster than 3% inflation",
          "They tie and Silas gets nothing",
          "The ceramic pig wins"
        ],
        correctOptionIndex: 1,
        hint: "Compare 5% growth to 3% price rise. Which number is larger?",
        explanation: "When your interest rate (5%) is higher than inflation (3%), your money gains 'real purchasing power'!"
      },
      {
        id: "ws2-q4",
        questionNumber: 4,
        title: "Cash Under the Mattress Trap",
        prompt: "If Silas had left $300 under his mattress while the telescope price climbed to $315, how much of a gap would he still have to make up?",
        type: "number-input",
        conceptTag: "Purchasing Power Gap",
        mathExpression: "$315 (New Price) - $300 (Unchanged Mattress Cash) = ?",
        correctNumber: 15,
        tolerance: 0,
        hint: "Subtract the $300 cash from the new $315 price.",
        explanation: "Under the mattress, his cash earned $0, leaving him $15 behind because inflation won the race."
      }
    ]
  },
  {
    id: "ws-3",
    title: "Worksheet 3: Aunt Minty's Compound Interest Sprout",
    subtitle: "Discovering how interest starts earning its own interest to build a ladder to the stars",
    gradeLevel: "Grades 4 - 8",
    estimatedTime: "20 - 25 mins",
    relatedPages: [5, 6],
    icon: "Sprout",
    conceptSummary: "Compound interest is interest calculated on both initial principal and accumulated past interest. It accelerates growth exponentially.",
    storybookConnection: "On Page 6, Aunt Minty draws a sprout in her notepad and adds leaves on top of leaves to show Silas how money builds a ladder to the stars.",
    questions: [
      {
        id: "ws3-q1",
        questionNumber: 1,
        title: "The Sprout Metaphor",
        prompt: "In Aunt Minty's drawing, the small sprout is the initial interest. What does the larger leaf growing on top of that sprout represent?",
        type: "multiple-choice",
        conceptTag: "Compound Growth",
        options: [
          "A weed stealing Silas's coins",
          "Compound interest: when your interest starts earning its own interest",
          "A tax penalty paid to the government",
          "The price of fertilizer"
        ],
        correctOptionIndex: 1,
        hint: "Think about what grows on top of the original sprout.",
        explanation: "Compound interest happens when previously earned interest begins earning its own 'thank you bonuses'!"
      },
      {
        id: "ws3-q2",
        questionNumber: 2,
        title: "Year 1 Sprout Math",
        prompt: "Silas deposits $100 into a savings account that pays 10% interest each year. At the end of Year 1, how many dollars of interest does he earn? ($100 × 0.10)",
        type: "number-input",
        conceptTag: "Simple Interest",
        mathExpression: "$100 (Principal) × 10% (0.10) = ?",
        correctNumber: 10,
        tolerance: 0,
        hint: "10% of 100 is 10.",
        explanation: "In Year 1, Silas earns $10 in interest, bringing his total balance to $110."
      },
      {
        id: "ws3-q3",
        questionNumber: 3,
        title: "Year 2 The Magic of Compounding",
        prompt: "In Year 2, Silas starts with $110 in the account. At 10% interest, how much interest will he earn this year? ($110 × 0.10)",
        type: "number-input",
        conceptTag: "Compound Math",
        mathExpression: "$110 (New Balance) × 10% (0.10) = ?",
        correctNumber: 11,
        tolerance: 0,
        hint: "Calculate 10% of 110 (110 ÷ 10).",
        explanation: "In Year 2, Silas earns $11! The extra $1 came from the interest earning interest on last year's $10 sprout!"
      },
      {
        id: "ws3-q4",
        questionNumber: 4,
        title: "Silas's 2-Year Total Balance",
        prompt: "What is Silas's total balance at the end of Year 2 after adding his $11 interest to his $110 starting balance?",
        type: "number-input",
        conceptTag: "Ending Balance",
        mathExpression: "$110 (Year 1 End) + $11 (Year 2 Interest) = ?",
        correctNumber: 121,
        tolerance: 0,
        hint: "Add 110 + 11.",
        explanation: "$110 + $11 = $121. His initial $100 grew to $121 without doing any extra chores!"
      }
    ]
  },
  {
    id: "ws-4",
    title: "Worksheet 4: Silas's First Bank Statement Mystery",
    subtitle: "Learning how to read a real digital account statement and track passive earnings",
    gradeLevel: "Grades 3 - 7",
    estimatedTime: "15 - 20 mins",
    relatedPages: [4, 10],
    icon: "FileSpreadsheet",
    conceptSummary: "A bank statement tracks starting balance, deposits, interest credits, withdrawals, and ending balance over a monthly statement cycle.",
    storybookConnection: "On Page 10, Silas and Aunt Minty look at his tablet screen and see the line 'Interest Earned'—making the invisible growth visible.",
    questions: [
      {
        id: "ws4-q1",
        questionNumber: 1,
        title: "Analyzing Silas's October Statement",
        prompt: "Look at Silas's Bank Statement Table below:\n• Oct 01 - Starting Balance: $150.00\n• Oct 12 - Chores Deposit: +$25.00\n• Oct 20 - Birthday Gift Deposit: +$20.00\n• Oct 31 - Interest Earned: +$1.50\n\nWhat is Silas's Final Ending Balance on October 31st?",
        type: "number-input",
        conceptTag: "Statement Math",
        mathExpression: "$150 + $25 + $20 + $1.50 = ?",
        correctNumber: 196.50,
        tolerance: 0.05,
        hint: "Add up the starting balance and all three positive deposits/interest.",
        explanation: "$150.00 + $25.00 + $20.00 + $1.50 = $196.50 total balance."
      },
      {
        id: "ws4-q2",
        questionNumber: 2,
        title: "Identifying Passive Growth",
        prompt: "On the statement, which transaction occurred without Silas having to rake leaves, wash dishes, or do any physical chores?",
        type: "multiple-choice",
        conceptTag: "Passive Income",
        options: [
          "Chores Deposit (+$25.00)",
          "Starting Balance ($150.00)",
          "Interest Earned (+$1.50)",
          "ATM withdrawal"
        ],
        correctOptionIndex: 2,
        hint: "Aunt Minty told Silas: 'His savings had done the work for him while he was at school and while he was asleep.'",
        explanation: "'Interest Earned' is the thank-you bonus paid by the bank simply for keeping his money deposited."
      },
      {
        id: "ws4-q3",
        questionNumber: 3,
        title: "What does APY stand for?",
        prompt: "On modern bank accounts, what does 'APY' mean when choosing a High-Yield Savings Account?",
        type: "multiple-choice",
        conceptTag: "Financial Acronyms",
        options: [
          "All Pigs Yawn",
          "Annual Percentage Yield (the real rate of return you earn in one year including compound interest)",
          "Astronomy Planet Yard",
          "Automatic Payment Yesterday"
        ],
        correctOptionIndex: 1,
        hint: "It relates to the annual percentage rate including compounding.",
        explanation: "APY stands for Annual Percentage Yield. A 5% APY means you earn $5 on every $100 over a full year."
      }
    ]
  },
  {
    id: "ws-5",
    title: "Worksheet 5: Smart Money Bucketing & Saturn Mission Plan",
    subtitle: "Setting up your personal savings engine: ice cream truck quarters vs long-term telescope dreams",
    gradeLevel: "Grades 3 - 8",
    estimatedTime: "20 - 30 mins",
    relatedPages: [9, 11, 12],
    icon: "Rocket",
    conceptSummary: "Smart savers balance short-term enjoyment (Belly the Pig) with long-term ambition (HYSA savings engine) using clear mathematical timelines.",
    storybookConnection: "On Page 11 & 12, Silas keeps Belly for ice cream quarters while his telescope fund grows in the bank, crafting a personal timeline to Saturn.",
    questions: [
      {
        id: "ws5-q1",
        questionNumber: 1,
        title: "Silas's Smart Bucketing Rule",
        prompt: "Why did Silas keep Belly the Pig on his shelf even after opening his high-yield bank account?",
        type: "multiple-choice",
        conceptTag: "Budgeting Strategy",
        options: [
          "He forgot he had a bank account",
          "He used Belly for short-term fun (loose quarters for the ice cream truck) while using the bank for his big telescope goal",
          "The bank told him he was required to keep a ceramic pig",
          "He was using Belly as a bookend"
        ],
        correctOptionIndex: 1,
        hint: "Remember Page 11: 'Now Belly held only a few loose quarters for the ice cream truck.'",
        explanation: "Smart money bucketing allows you to enjoy small treats today without derailing big dreams tomorrow!"
      },
      {
        id: "ws5-q2",
        questionNumber: 2,
        title: "Designing a Monthly Savings Engine",
        prompt: "Suppose you earn $30 every month from allowance and chores. You put $5 into your Piggy Bank for ice cream and snacks, and deposit $25 into your High-Yield Account for a $200 dream telescope. How many months of $25 deposits will it take (even before adding interest)?",
        type: "number-input",
        conceptTag: "Timeline Math",
        mathExpression: "$200 (Goal Cost) ÷ $25 (Monthly Bank Deposit) = ?",
        correctNumber: 8,
        tolerance: 0,
        hint: "Divide $200 by $25 (200 ÷ 25 = ?).",
        explanation: "200 ÷ 25 = 8 months! And with compound interest earned along the way, you'll reach it even faster!"
      },
      {
        id: "ws5-q3",
        questionNumber: 3,
        title: "The 3-Bucket Rule",
        prompt: "Financial experts like Aunt Minty often recommend dividing money into 3 buckets: SPEND (now), SAVE (future goals), and SHARE (giving/charity). If you get $10, which allocation matches a healthy balance?",
        type: "multiple-choice",
        conceptTag: "Financial Planning",
        options: [
          "Spend $10 immediately on candy, Save $0, Share $0",
          "Spend $2 (ice cream), Save $7 (telescope in HYSA), Share $1 (community cause)",
          "Hide $10 in the freezer forever",
          "Borrow $50 from a friend"
        ],
        correctOptionIndex: 1,
        hint: "Look for a balance that funds long-term savings while still allowing small treats and kindness.",
        explanation: "Allocating the largest portion to high-yield savings while enjoying a small treat and giving back is a proven financial habit."
      },
      {
        id: "ws5-q4",
        questionNumber: 4,
        title: "Your Personal Financial Pledge",
        prompt: "Complete Silas's motto: 'Saving is about more than just not spending; it is about building a _______ to the stars!'",
        type: "multiple-choice",
        conceptTag: "Mindset",
        options: [
          "ladder",
          "wall",
          "cage",
          "tunnel"
        ],
        correctOptionIndex: 0,
        hint: "Look at Page 6 of the storybook!",
        explanation: "'His money wasn't just resting; it was building a ladder to the stars.' Understanding how money works gives you control over your future."
      }
    ]
  }
];
