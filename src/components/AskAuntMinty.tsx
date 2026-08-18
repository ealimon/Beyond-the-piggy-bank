import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  FileText, 
  Printer, 
  Award, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle2, 
  Wand2, 
  BookOpen 
} from 'lucide-react';

export const AskAuntMinty: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'chat' | 'generator'>('chat');

  // Chat State
  const [question, setQuestion] = useState<string>('');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'minty'; text: string }[]>([
    {
      sender: 'minty',
      text: "Hello there, young astronomer! I'm Aunt Minty. Ask me anything about Silas's journey, how compound interest sprouts grow, why inflation happens, or how to turn your savings into a real engine for your dreams!"
    }
  ]);
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false);

  // Generator State
  const [studentName, setStudentName] = useState<string>('Alex');
  const [goalItem, setGoalItem] = useState<string>('Mars Rover Robotics Kit');
  const [goalCost, setGoalCost] = useState<number>(160);
  const [currentSavings, setCurrentSavings] = useState<number>(40);
  const [monthlyChores, setMonthlyChores] = useState<number>(20);
  const [customWorksheet, setCustomWorksheet] = useState<any>(null);
  const [isGeneratingWs, setIsGeneratingWs] = useState<boolean>(false);

  const suggestedQuestions = [
    "Why does the price of Silas's telescope keep climbing?",
    "How does compound interest build a ladder to the stars?",
    "Why does the credit union pay Silas interest on his deposit?",
    "Can I still keep some coins in my piggy bank for the ice cream truck?"
  ];

  const handleSendQuestion = async (textToSend?: string) => {
    const q = textToSend || question;
    if (!q.trim()) return;

    const newLog = [...chatLog, { sender: 'user' as const, text: q }];
    setChatLog(newLog);
    setQuestion('');
    setIsLoadingChat(true);

    try {
      const res = await fetch('/api/ask-minty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setChatLog(prev => [...prev, { sender: 'minty', text: data.answer || "Aunt Minty is always here to help your savings grow!" }]);
    } catch (err) {
      setChatLog(prev => [
        ...prev,
        {
          sender: 'minty',
          text: "Remember Silas's rule: putting your money in a high-yield account lets your savings work hard for you while you are asleep!"
        }
      ]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const handleGenerateCustomWorksheet = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingWs(true);

    try {
      const res = await fetch('/api/custom-worksheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          goalItem,
          goalCost,
          currentSavings,
          allowanceOrChores: monthlyChores,
        }),
      });
      const data = await res.json();
      setCustomWorksheet(data.worksheet);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingWs(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white border-4 border-[#FDE68A] rounded-3xl p-5 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center text-[#D97706] shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#78350F] leading-tight">Ask Aunt Minty & Goal Studio 💡</h2>
            <p className="text-xs text-[#92400E] font-bold mt-0.5">Personalized financial literacy guidance & custom story worksheets</p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-[#FEF3C7] p-1.5 rounded-2xl border-2 border-[#F59E0B]">
          <button
            id="tab-mode-chat"
            onClick={() => setActiveMode('chat')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeMode === 'chat'
                ? 'bg-[#F59E0B] text-white shadow-md'
                : 'text-[#78350F] hover:bg-[#FDE68A]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Chat with Minty</span>
          </button>

          <button
            id="tab-mode-gen"
            onClick={() => setActiveMode('generator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeMode === 'generator'
                ? 'bg-[#10B981] text-white shadow-md'
                : 'text-[#78350F] hover:bg-[#FDE68A]'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>Build Goal Worksheet</span>
          </button>
        </div>
      </div>

      {/* CHAT MODE */}
      {activeMode === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Chat Box */}
          <div className="lg:col-span-8 bg-white border-4 border-[#FDE68A] rounded-3xl p-6 text-slate-800 shadow-xl flex flex-col justify-between min-h-[500px]">
            {/* Conversation Log */}
            <div className="space-y-4 overflow-y-auto max-h-[380px] pr-2 mb-4">
              {chatLog.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 text-xs font-black shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#F59E0B] text-white border-2 border-[#B45309]'
                        : 'bg-[#10B981] text-white border-2 border-[#047857]'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div
                    className={`max-w-[80%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed font-medium ${
                      msg.sender === 'user'
                        ? 'bg-[#FEF3C7] border-2 border-[#F59E0B] text-[#78350F] rounded-tr-none shadow-sm'
                        : 'bg-[#FFFBEB] border-2 border-[#FDE68A] text-slate-800 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoadingChat && (
                <div className="flex items-center gap-2 text-xs text-[#D97706] font-bold italic">
                  <Sparkles className="w-4 h-4 animate-spin text-[#F59E0B]" />
                  <span>Aunt Minty is writing back with guidance...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="pt-4 border-t-2 border-[#FDE68A]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendQuestion();
                }}
                className="flex items-center gap-2"
              >
                <input
                  id="input-ask-minty"
                  type="text"
                  placeholder="Ask Aunt Minty about money, compound interest, or Silas's story..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] text-sm text-slate-800 focus:outline-none focus:border-[#F59E0B] font-medium"
                />
                <button
                  id="btn-send-minty"
                  type="submit"
                  disabled={!question.trim() || isLoadingChat}
                  className="px-6 py-3 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Sidebar: Suggested Questions */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border-4 border-[#FDE68A] rounded-3xl p-6 text-slate-800 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b-2 border-[#FDE68A] text-[#78350F]">
                <Lightbulb className="w-5 h-5 text-[#D97706]" />
                <h3 className="font-black text-sm text-[#78350F]">Suggested Story Questions</h3>
              </div>

              <div className="mt-4 space-y-2.5">
                {suggestedQuestions.map((sq, idx) => (
                  <button
                    key={idx}
                    id={`btn-suggested-q-${idx}`}
                    onClick={() => handleSendQuestion(sq)}
                    className="w-full text-left p-3.5 rounded-2xl bg-[#FFFBEB] hover:bg-[#FEF3C7] text-xs text-[#78350F] font-bold border-2 border-[#FDE68A] transition-all hover:border-[#F59E0B] flex items-start gap-2.5 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                    <span>{sq}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GENERATOR MODE */}
      {activeMode === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Form */}
          <div className="lg:col-span-5 bg-white border-4 border-[#FDE68A] rounded-3xl p-6 text-slate-800 shadow-xl space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[#FDE68A] text-[#78350F]">
              <Wand2 className="w-5 h-5 text-[#10B981]" />
              <h3 className="font-black text-[#78350F] text-base">Personalized Savings Worksheet Builder</h3>
            </div>

            <form onSubmit={handleGenerateCustomWorksheet} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#78350F] font-bold mb-1">Student / Child Name:</label>
                <input
                  id="input-gen-name"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] text-slate-800 text-sm font-bold focus:outline-none focus:border-[#F59E0B]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#78350F] font-bold mb-1">Dream Goal (Item/Experience):</label>
                <input
                  id="input-gen-goal"
                  type="text"
                  placeholder="e.g. Science Microscope, Skateboard..."
                  value={goalItem}
                  onChange={(e) => setGoalItem(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] text-slate-800 text-sm font-medium focus:outline-none focus:border-[#F59E0B]"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[#78350F] font-bold mb-1">Target ($):</label>
                  <input
                    id="input-gen-cost"
                    type="number"
                    min="10"
                    value={goalCost}
                    onChange={(e) => setGoalCost(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#FFFBEB] border-2 border-[#FDE68A] text-slate-800 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#78350F] font-bold mb-1">Saved ($):</label>
                  <input
                    id="input-gen-current"
                    type="number"
                    min="0"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#FFFBEB] border-2 border-[#FDE68A] text-slate-800 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#78350F] font-bold mb-1">Monthly ($):</label>
                  <input
                    id="input-gen-monthly"
                    type="number"
                    min="5"
                    value={monthlyChores}
                    onChange={(e) => setMonthlyChores(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#FFFBEB] border-2 border-[#FDE68A] text-slate-800 font-bold"
                    required
                  />
                </div>
              </div>

              <button
                id="btn-generate-custom-ws"
                type="submit"
                disabled={isGeneratingWs}
                className="w-full py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black transition-all flex items-center justify-center gap-2 border-b-4 border-[#047857] shadow-lg text-sm"
              >
                <Sparkles className="w-5 h-5" />
                <span>{isGeneratingWs ? "Designing Story Worksheet..." : "Generate Custom Worksheet ⭐"}</span>
              </button>
            </form>
          </div>

          {/* Generated Worksheet View */}
          <div className="lg:col-span-7 bg-white border-4 border-[#FDE68A] rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xl">
            {customWorksheet ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b-2 border-[#FDE68A] pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#D97706] tracking-wider">
                      Custom Storybook Worksheet
                    </span>
                    <h3 className="text-xl font-black text-[#78350F] mt-0.5">{customWorksheet.title}</h3>
                  </div>
                  <button
                    id="btn-print-custom-ws"
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] text-xs border-2 border-[#F59E0B] font-black shadow-sm"
                  >
                    <Printer className="w-4 h-4 text-[#D97706]" />
                    <span>Print 🖨️</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] text-xs text-[#78350F] leading-relaxed font-serif italic">
                  "{customWorksheet.storyIntro}"
                </div>

                <div className="space-y-4">
                  {customWorksheet.questions?.map((q: any, i: number) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-[#FEF3C7] border-2 border-[#F59E0B] text-[#78350F] font-black flex items-center justify-center text-xs">
                          {i + 1}
                        </span>
                        <h4 className="text-sm font-black text-[#78350F]">{q.question}</h4>
                      </div>
                      {q.mathExpression && (
                        <div className="p-2.5 rounded-xl bg-white border border-[#FDE68A] font-mono text-xs text-[#D97706] font-bold">
                          {q.mathExpression}
                        </div>
                      )}
                      <div className="text-xs text-[#92400E] font-medium">
                        <strong className="font-black text-[#78350F]">Answer:</strong> {q.answer}
                      </div>
                    </div>
                  ))}
                </div>

                {customWorksheet.auntMintyTip && (
                  <div className="p-4 rounded-2xl bg-[#DCFCE7] border-2 border-[#22C55E] text-xs text-[#166534]">
                    <strong className="block font-black mb-0.5">🌱 Aunt Minty's Advice:</strong> {customWorksheet.auntMintyTip}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-slate-400">
                <div className="w-16 h-16 rounded-3xl bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center text-[#D97706] mb-3">
                  <Wand2 className="w-8 h-8" />
                </div>
                <h4 className="font-black text-base text-[#78350F]">No Custom Worksheet Generated Yet</h4>
                <p className="text-xs text-[#92400E] max-w-sm mt-1 font-medium">
                  Fill in your goal on the left to create a personalized financial literacy worksheet!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
