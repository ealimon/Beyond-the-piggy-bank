import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  FileText, 
  Lightbulb, 
  Award, 
  CheckCircle2, 
  XCircle,
  Telescope,
  TrendingUp,
  Landmark,
  Sprout
} from 'lucide-react';
import { STORYBOOK_PAGES } from '../data/storybookData';
import { StoryPage } from '../types';

interface StorybookReaderProps {
  onNavigateToWorksheet: (worksheetId: string) => void;
  onRecordConceptLearned: (term: string) => void;
}

export const StorybookReader: React.FC<StorybookReaderProps> = ({
  onNavigateToWorksheet,
  onRecordConceptLearned
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [selectedConcept, setSelectedConcept] = useState<StoryPage['keyConcepts'][0] | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const page = STORYBOOK_PAGES[currentPageIndex];

  // Stop speech when changing pages
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setQuizAnswer(null);
    setQuizSubmitted(false);
    setSelectedConcept(null);
  }, [currentPageIndex]);

  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = page.text.replace(/[\n\r]+/g, ' ');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.92; // warm storytelling pace
      utterance.pitch = 1.05;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const getPageIcon = (pageNo: number) => {
    switch (pageNo) {
      case 1:
      case 2:
      case 9:
      case 11:
        return <Telescope className="w-5 h-5 text-amber-300" />;
      case 3:
      case 7:
      case 8:
        return <TrendingUp className="w-5 h-5 text-rose-300" />;
      case 4:
      case 5:
      case 10:
        return <Landmark className="w-5 h-5 text-sky-300" />;
      case 6:
        return <Sprout className="w-5 h-5 text-emerald-300" />;
      default:
        return <BookOpen className="w-5 h-5 text-amber-300" />;
    }
  };

  // Map page to corresponding worksheet ID
  const getMatchingWorksheetId = (pageNo: number) => {
    if (pageNo <= 3) return "ws-1";
    if (pageNo === 7 || pageNo === 8) return "ws-2";
    if (pageNo === 5 || pageNo === 6) return "ws-3";
    if (pageNo === 4 || pageNo === 10) return "ws-4";
    return "ws-5";
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white border-4 border-[#FDE68A] rounded-3xl p-5 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center text-2xl shadow-sm">
            {page.pageNumber % 2 === 0 ? '🪐' : '🔭'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-black tracking-wider text-[#92400E] bg-[#FEF3C7] px-3 py-0.5 rounded-full border border-[#F59E0B]">
                Chapter {page.pageNumber} of {STORYBOOK_PAGES.length}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#78350F] mt-1">{page.sceneTitle}</h2>
          </div>
        </div>

        {/* Read-Aloud & Worksheet Shortcut Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="btn-read-aloud"
            onClick={handleToggleSpeak}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all ${
              isSpeaking
                ? 'bg-[#EF4444] text-white border-b-4 border-[#B91C1C] shadow-md animate-pulse'
                : 'bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] border-2 border-[#F59E0B]'
            }`}
            title="Listen to story page aloud"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#D97706]" />}
            <span>{isSpeaking ? "Pause Reading" : "Read to Me 🔊"}</span>
          </button>

          <button
            id="btn-open-related-worksheet"
            onClick={() => onNavigateToWorksheet(getMatchingWorksheetId(page.pageNumber))}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black bg-[#10B981] hover:bg-[#059669] text-white shadow-md border-b-4 border-[#047857] transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Open Worksheet 📝</span>
          </button>
        </div>
      </div>

      {/* Main Storybook Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Main Page Content Card */}
        <div className="lg:col-span-8 flex flex-col">
          <motion.div
            key={page.pageNumber}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="relative flex-1 rounded-3xl border-4 border-[#FDE68A] bg-white text-slate-800 p-6 sm:p-10 shadow-xl flex flex-col justify-between"
          >
            {/* Story Header Banner */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#FDE68A] pb-4">
                <div className="flex items-center gap-2 text-[#92400E] font-black text-sm uppercase tracking-wider">
                  <span>✨ BEYOND THE PIGGY BANK</span>
                </div>
                <span className="text-xs font-black bg-[#FEF3C7] text-[#92400E] px-3 py-1 rounded-full border border-[#F59E0B]">
                  Page {page.pageNumber}
                </span>
              </div>

              <div className="prose max-w-none text-slate-800 text-lg sm:text-xl leading-relaxed font-serif space-y-4">
                {page.text.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="first-letter:text-4xl first-letter:font-black first-letter:text-[#D97706] first-letter:mr-1 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Key Concepts Clickable Chips on the Page */}
            <div className="mt-8 pt-6 border-t-2 border-[#FDE68A]">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-[#D97706]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#92400E]">
                  Aunt Minty's Key Concepts on this Page (Click to Explore):
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {page.keyConcepts.map((concept, idx) => (
                  <button
                    key={idx}
                    id={`btn-concept-${idx}`}
                    onClick={() => {
                      setSelectedConcept(concept);
                      onRecordConceptLearned(concept.term);
                    }}
                    className={`text-xs font-black px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                      selectedConcept?.term === concept.term
                        ? 'bg-[#F59E0B] text-white border-2 border-[#B45309] shadow-md scale-105'
                        : 'bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border-2 border-[#F59E0B]'
                    }`}
                  >
                    <span>💡</span>
                    <span>{concept.term}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 bg-white border-4 border-[#FDE68A] rounded-3xl p-4 shadow-lg">
            <button
              id="btn-prev-page"
              onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
              disabled={currentPageIndex === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                currentPageIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border border-gray-200'
                  : 'bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] border-2 border-[#F59E0B] shadow-sm'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            {/* Quick Page Circles */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-2 max-w-[200px] sm:max-w-none">
              {STORYBOOK_PAGES.map((p, idx) => (
                <button
                  key={idx}
                  id={`btn-page-dot-${p.pageNumber}`}
                  onClick={() => setCurrentPageIndex(idx)}
                  className={`w-8 h-8 rounded-full text-xs font-black transition-all flex items-center justify-center ${
                    currentPageIndex === idx
                      ? 'bg-[#F59E0B] text-white border-2 border-[#D97706] shadow-md scale-110'
                      : 'bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border border-[#F59E0B]'
                  }`}
                  title={`Go to page ${p.pageNumber}`}
                >
                  {p.pageNumber}
                </button>
              ))}
            </div>

            <button
              id="btn-next-page"
              onClick={() => setCurrentPageIndex(Math.min(STORYBOOK_PAGES.length - 1, currentPageIndex + 1))}
              disabled={currentPageIndex === STORYBOOK_PAGES.length - 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                currentPageIndex === STORYBOOK_PAGES.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-[#10B981] hover:bg-[#059669] text-white border-b-4 border-[#047857] shadow-lg'
              }`}
            >
              <span>Next Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Sidebar: Concept Explainer & Quick Check */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Concept Detail Card */}
          <aside className="bg-white rounded-3xl border-4 border-[#FDE68A] p-5 sm:p-6 shadow-xl flex flex-col gap-4">
            <div className="bg-[#FEF3C7] p-4 rounded-2xl border-2 border-[#F59E0B] flex items-center gap-2">
              <span className="text-xl">🎓</span>
              <h3 className="font-black text-[#78350F] text-base">Aunt Minty's Notebook</h3>
            </div>

            {selectedConcept ? (
              <motion.div
                key={selectedConcept.term}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-[#E0F2FE] p-4 rounded-2xl border-2 border-[#7DD3FC]">
                  <p className="text-[#0369A1] font-bold text-xs uppercase mb-1 italic">Selected Concept</p>
                  <h4 className="text-[#0C4A6E] font-black text-xl leading-tight">{selectedConcept.term}</h4>
                </div>

                <div className="bg-[#F0FDF4] p-4 rounded-2xl border-2 border-[#BBF7D0]">
                  <span className="text-xs font-bold text-[#166534] uppercase tracking-wider block mb-1">Definition:</span>
                  <p className="text-sm font-medium text-[#14532D] leading-relaxed">{selectedConcept.definition}</p>
                </div>

                <div className="bg-[#FDF2F2] p-4 rounded-2xl border border-[#FEE2E2]">
                  <span className="text-xs font-bold text-[#991B1B] uppercase tracking-wider block mb-1">In Silas's Story:</span>
                  <p className="text-xs text-[#991B1B] font-medium leading-relaxed italic">"{selectedConcept.storybookQuote}"</p>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-8 text-[#92400E] bg-[#FFFBEB] rounded-2xl border-2 border-dashed border-[#FDE68A] p-4">
                <span className="text-3xl block mb-2">✨</span>
                <p className="text-xs sm:text-sm font-bold">Click any highlighted concept badge on the page to view Aunt Minty's lesson notes!</p>
              </div>
            )}
          </aside>

          {/* Quick Page Comprehension Check */}
          {page.interactiveCheck && (
            <div className="bg-white rounded-3xl border-4 border-[#FDE68A] p-5 sm:p-6 shadow-xl space-y-4">
              <div className="bg-[#FEF3C7] p-3.5 rounded-2xl border-2 border-[#F59E0B] flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <h3 className="font-black text-sm text-[#78350F]">Page {page.pageNumber} Quick Quiz</h3>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-[#78350F] leading-snug">
                  {page.interactiveCheck.question}
                </p>

                <div className="space-y-2">
                  {page.interactiveCheck.options.map((option, idx) => {
                    const isSelected = quizAnswer === idx;
                    const isCorrect = idx === page.interactiveCheck?.correctIndex;

                    let btnStyle = "bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#78350F] border-2 border-[#FDE68A]";
                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = "bg-[#DCFCE7] border-2 border-[#22C55E] text-[#166534] font-black";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-[#FEE2E2] border-2 border-[#EF4444] text-[#991B1B]";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-[#FEF3C7] border-2 border-[#F59E0B] font-black text-[#78350F]";
                    }

                    return (
                      <button
                        key={idx}
                        id={`btn-check-opt-${idx}`}
                        onClick={() => {
                          if (!quizSubmitted) {
                            setQuizAnswer(idx);
                          }
                        }}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3 rounded-2xl text-xs sm:text-sm border transition-all flex items-start gap-2.5 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-white border-2 border-current flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 shadow-sm">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 font-semibold">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    id="btn-submit-quick-check"
                    onClick={() => {
                      if (quizAnswer !== null) {
                        setQuizSubmitted(true);
                      }
                    }}
                    disabled={quizAnswer === null}
                    className={`w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all mt-2 ${
                      quizAnswer === null
                        ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                        : 'bg-[#10B981] hover:bg-[#059669] text-white border-b-4 border-[#047857] shadow-md'
                    }`}
                  >
                    Check Answer
                  </button>
                ) : (
                  <div className="mt-3 p-4 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 font-black text-sm">
                      {quizAnswer === page.interactiveCheck.correctIndex ? (
                        <span className="text-[#166534] flex items-center gap-1">
                          ✅ That's exactly right!
                        </span>
                      ) : (
                        <span className="text-[#991B1B] flex items-center gap-1">
                          ❌ Not quite, let's review:
                        </span>
                      )}
                    </div>
                    <p className="text-[#78350F] font-medium leading-relaxed">{page.interactiveCheck.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
