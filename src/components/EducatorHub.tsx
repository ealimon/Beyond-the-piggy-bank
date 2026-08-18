import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Printer, 
  Sparkles, 
  Layers, 
  RotateCw, 
  Lightbulb, 
  FileText 
} from 'lucide-react';

export const EducatorHub: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const flashcards = [
    {
      term: "Idle Cash",
      definition: "Money that sits in a piggy bank, jar, or under a mattress without earning interest. While protected from impulsive spending, it steadily loses purchasing power due to inflation.",
      example: "Silas's $120 sitting in Belly the ceramic pig."
    },
    {
      term: "Inflation",
      definition: "The gradual, steady increase in prices of goods and services over time. It causes each dollar to buy less in the future than it does today.",
      example: "The telescope costing $100 twenty years ago on a vintage poster vs $300 today."
    },
    {
      term: "Compound Interest",
      definition: "Interest earned on both the original deposited money (principal) AND all the past accumulated interest. It creates exponential growth over time.",
      example: "Aunt Minty's sprout growing leaves that grow their own smaller sprouts."
    },
    {
      term: "High-Yield Savings Account (HYSA)",
      definition: "A specialized bank or credit union savings account that pays a much higher annual percentage yield (APY) than standard 0.01% accounts.",
      example: "The account Silas opened that gave him a digital statement with 'Interest Earned'."
    },
    {
      term: "Purchasing Power",
      definition: "The real quantity of physical goods, food, or tools that a specific amount of money can purchase.",
      example: "Aunt Minty's explanation: 'Your money is getting smaller while what you want to buy gets bigger.'"
    },
    {
      term: "Money Bucketing",
      definition: "Dividing funds into short-term pocket spending (loose coins in Belly for ice cream) vs long-term wealth building in high-yield accounts (telescope).",
      example: "Silas keeping Belly on the shelf for treats while his main savings work in the bank."
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white border-4 border-[#FDE68A] rounded-3xl p-5 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center text-[#D97706] shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#78350F] leading-tight">Educator & Caregiver Hub 📚</h2>
            <p className="text-xs text-[#92400E] font-bold mt-0.5">Classroom discussion prompts, standards alignment, and lesson materials</p>
          </div>
        </div>

        <button
          id="btn-print-lesson-packet"
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] border-2 border-[#F59E0B] transition-all shadow-sm"
        >
          <Printer className="w-4 h-4 text-[#D97706]" />
          <span>Print Teacher Lesson Plan 🖨️</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Lesson Pillars from Page 12 */}
        <div className="lg:col-span-7 space-y-6">
          {/* Core Storybook Lessons */}
          <div className="bg-white border-4 border-[#FDE68A] rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xl space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[#FDE68A] text-[#78350F]">
              <BookOpen className="w-5 h-5 text-[#D97706]" />
              <h3 className="font-black text-[#78350F] text-base">Key Concepts Covered (Page 12 Overview)</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] space-y-1 shadow-sm">
                <span className="font-black text-[#B45309] text-sm block">1. The Problem with Idle Cash</span>
                <p className="text-[#78350F] font-medium leading-relaxed">
                  Explains why money stored in piggy banks or hidden in rooms takes a "long nap" and loses purchasing power over time due to inflation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#DCFCE7] border-2 border-[#22C55E] space-y-1 shadow-sm">
                <span className="font-black text-[#15803D] text-sm block">2. The Magic of Compound Interest</span>
                <p className="text-[#166534] font-medium leading-relaxed">
                  Uses Aunt Minty's botanical sprout metaphor to teach young learners how interest earns its own interest, accelerating savings timelines even while they are asleep.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#E0F2FE] border-2 border-[#0284C7] space-y-1 shadow-sm">
                <span className="font-black text-[#0369A1] text-sm block">3. Strategic Goal Setting & Timeline Math</span>
                <p className="text-[#075985] font-medium leading-relaxed">
                  Transforms abstract coin hoarding into structured mathematical goal setting with milestone dates, contribution rates, and timeline calculations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFE4E6] border-2 border-[#F43F5E] space-y-1 shadow-sm">
                <span className="font-black text-[#BE123C] text-sm block">4. Saving vs. Investing Systems</span>
                <p className="text-[#9F1239] font-medium leading-relaxed">
                  Demystifies banks and credit unions as community financial hubs that lend funds for home building and entrepreneurship while paying depositors interest bonuses.
                </p>
              </div>
            </div>
          </div>

          {/* Classroom Discussion Starters */}
          <div className="bg-white border-4 border-[#FDE68A] rounded-3xl p-6 text-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-[#FDE68A] text-[#78350F]">
              <Lightbulb className="w-5 h-5 text-[#D97706]" />
              <h4 className="font-black text-sm text-[#78350F]">Classroom & Dinner Table Discussion Starters</h4>
            </div>

            <ul className="space-y-2.5 text-xs text-[#78350F] list-disc list-inside font-medium">
              <li>"Why did Silas feel like his coins were stuck in a 'ceramic prison'?"</li>
              <li>"What is an item in your home that cost less when your parents were kids?"</li>
              <li>"How does compound interest act like a ladder to reach big dreams?"</li>
              <li>"What small treats would you put in your 'Belly the Pig' bucket vs your bank account?"</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Interactive Vocabulary Deck */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-4 border-[#FDE68A] rounded-3xl p-6 text-slate-800 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#FDE68A]">
              <div className="flex items-center gap-2 text-[#78350F]">
                <Layers className="w-5 h-5 text-[#D97706]" />
                <h3 className="font-black text-sm text-[#78350F]">Interactive Vocabulary Deck</h3>
              </div>
              <span className="text-xs text-[#92400E] font-black font-mono bg-[#FEF3C7] px-2.5 py-1 rounded-xl border border-[#F59E0B]">
                {activeCardIndex + 1} / {flashcards.length}
              </span>
            </div>

            {/* Flashcard Box */}
            <div
              id="flashcard-interactive"
              onClick={() => setIsFlipped(!isFlipped)}
              className="mt-6 p-8 min-h-[260px] rounded-3xl bg-[#FFFBEB] border-4 border-[#F59E0B] hover:border-[#D97706] shadow-xl cursor-pointer flex flex-col items-center justify-center text-center transition-all group select-none"
            >
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-black text-[#D97706] tracking-widest bg-[#FEF3C7] px-3.5 py-1 rounded-full border border-[#F59E0B]">
                    Click card to Flip for Definition
                  </span>
                  <h4 className="text-2xl font-black text-[#78350F] group-hover:text-[#B45309] transition-colors">
                    {flashcards[activeCardIndex].term}
                  </h4>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#92400E] pt-2 font-bold">
                    <RotateCw className="w-4 h-4 text-[#D97706]" />
                    <span>Flip to reveal explanation</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-black text-[#15803D] tracking-widest bg-[#DCFCE7] px-3.5 py-1 rounded-full border border-[#22C55E]">
                    Definition & Story Context
                  </span>
                  <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed font-serif font-medium">
                    {flashcards[activeCardIndex].definition}
                  </p>
                  <div className="p-3 rounded-2xl bg-[#FEF3C7] text-xs text-[#92400E] font-bold italic border border-[#FDE68A]">
                    "{flashcards[activeCardIndex].example}"
                  </div>
                </div>
              )}
            </div>

            {/* Card Controls */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-[#FDE68A]">
              <button
                id="btn-prev-card"
                onClick={() => {
                  setIsFlipped(false);
                  setActiveCardIndex(Math.max(0, activeCardIndex - 1));
                }}
                disabled={activeCardIndex === 0}
                className="px-3.5 py-2 rounded-xl bg-[#FEF3C7] text-[#78350F] border border-[#F59E0B] text-xs font-black disabled:opacity-40"
              >
                Previous
              </button>

              <button
                id="btn-flip-card"
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-5 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-black shadow-md"
              >
                {isFlipped ? "Show Term" : "Flip Card 🔄"}
              </button>

              <button
                id="btn-next-card"
                onClick={() => {
                  setIsFlipped(false);
                  setActiveCardIndex(Math.min(flashcards.length - 1, activeCardIndex + 1));
                }}
                disabled={activeCardIndex === flashcards.length - 1}
                className="px-3.5 py-2 rounded-xl bg-[#FEF3C7] text-[#78350F] border border-[#F59E0B] text-xs font-black disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
