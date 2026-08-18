import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  Sprout, 
  Landmark, 
  Rocket, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { WORKSHEETS_DATA } from '../data/worksheetsData';
import { Worksheet, WorksheetQuestion, UserWorksheetProgress } from '../types';

interface WorksheetHubProps {
  initialWorksheetId?: string;
  progressMap: Record<string, UserWorksheetProgress>;
  onSaveProgress: (progress: UserWorksheetProgress) => void;
  onNavigateToStoryPage: (pageNo: number) => void;
}

export const WorksheetHub: React.FC<WorksheetHubProps> = ({
  initialWorksheetId = "ws-1",
  progressMap,
  onSaveProgress,
  onNavigateToStoryPage
}) => {
  const [selectedWsId, setSelectedWsId] = useState<string>(initialWorksheetId);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showTeacherKey, setShowTeacherKey] = useState<boolean>(false);
  const [printMode, setPrintMode] = useState<boolean>(false);
  const [sortingState, setSortingState] = useState<Record<string, 'piggy' | 'bank'>>({});

  const currentWorksheet = WORKSHEETS_DATA.find(w => w.id === selectedWsId) || WORKSHEETS_DATA[0];

  // Load existing answers if available
  React.useEffect(() => {
    if (progressMap[selectedWsId]) {
      setAnswers(progressMap[selectedWsId].answers || {});
      setIsSubmitted(progressMap[selectedWsId].completed);
    } else {
      setAnswers({});
      setIsSubmitted(false);
    }
    setShowHints({});
    setSortingState({});
  }, [selectedWsId, progressMap]);

  const handleSelectAnswer = (qId: string, value: any) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleToggleHint = (qId: string) => {
    setShowHints(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSortItem = (qId: string, itemId: string, bucket: 'piggy' | 'bank') => {
    if (isSubmitted) return;
    setSortingState(prev => {
      const next = { ...prev, [itemId]: bucket };
      setAnswers(a => ({ ...a, [qId]: next }));
      return next;
    });
  };

  // Grade calculation
  const calculateScore = () => {
    let earned = 0;
    currentWorksheet.questions.forEach(q => {
      const userAns = answers[q.id];
      if (q.type === 'multiple-choice') {
        if (userAns === q.correctOptionIndex) earned += 1;
      } else if (q.type === 'number-input') {
        const num = parseFloat(userAns);
        if (!isNaN(num) && q.correctNumber !== undefined) {
          const tol = q.tolerance ?? 0.05;
          if (Math.abs(num - q.correctNumber) <= tol) earned += 1;
        }
      } else if (q.type === 'sorting' && q.sortingItems) {
        let allCorrect = true;
        const sorts = userAns || {};
        q.sortingItems.forEach(item => {
          if (sorts[item.id] !== item.correctBucket) allCorrect = false;
        });
        if (allCorrect) earned += 1;
      } else {
        if (userAns && String(userAns).trim().length > 0) earned += 1;
      }
    });
    return earned;
  };

  const handleSubmitWorksheet = () => {
    const score = calculateScore();
    setIsSubmitted(true);

    // Save progress
    onSaveProgress({
      worksheetId: currentWorksheet.id,
      completed: true,
      score,
      totalQuestions: currentWorksheet.questions.length,
      answers,
      lastAttemptedAt: new Date().toISOString(),
    });

    // Confetti celebration if 100% or passing
    if (score === currentWorksheet.questions.length) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#38bdf8', '#10b981', '#ec4899']
      });
    }
  };

  const handleResetWorksheet = () => {
    setAnswers({});
    setIsSubmitted(false);
    setShowHints({});
    setSortingState({});
  };

  const getWorksheetIcon = (iconName: string) => {
    switch (iconName) {
      case "PiggyBank": return <Landmark className="w-5 h-5 text-pink-400" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5 text-rose-400" />;
      case "Sprout": return <Sprout className="w-5 h-5 text-emerald-400" />;
      case "FileSpreadsheet": return <FileText className="w-5 h-5 text-cyan-400" />;
      case "Rocket": return <Rocket className="w-5 h-5 text-amber-400" />;
      default: return <FileText className="w-5 h-5 text-amber-400" />;
    }
  };

  const isQuestionCorrect = (q: WorksheetQuestion): boolean => {
    const userAns = answers[q.id];
    if (userAns === undefined) return false;
    if (q.type === 'multiple-choice') {
      return userAns === q.correctOptionIndex;
    }
    if (q.type === 'number-input') {
      const num = parseFloat(userAns);
      if (isNaN(num) || q.correctNumber === undefined) return false;
      const tol = q.tolerance ?? 0.05;
      return Math.abs(num - q.correctNumber) <= tol;
    }
    if (q.type === 'sorting' && q.sortingItems) {
      const sorts = userAns || {};
      return q.sortingItems.every(item => sorts[item.id] === item.correctBucket);
    }
    return false;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 print:p-0 print:m-0 print:max-w-full">
      {/* Print Controls Header (Hidden during physical print) */}
      <div className="print:hidden flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white border-4 border-[#FDE68A] rounded-3xl p-5 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center text-2xl shadow-sm">
            {getWorksheetIcon(currentWorksheet.icon)}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#78350F] leading-tight">{currentWorksheet.title}</h2>
            <div className="flex items-center gap-3 text-xs text-[#92400E] font-bold mt-1">
              <span className="bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#F59E0B]">
                {currentWorksheet.gradeLevel}
              </span>
              <span>• ⏱️ {currentWorksheet.estimatedTime}</span>
              <span>• 📝 {currentWorksheet.questions.length} Interactive Questions</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle Print / Classroom Mode */}
          <button
            id="btn-print-worksheet"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] border-2 border-[#F59E0B] transition-all shadow-sm"
            title="Print clean PDF worksheet for classroom use"
          >
            <Printer className="w-4 h-4 text-[#D97706]" />
            <span>Print Worksheet 🖨️</span>
          </button>

          {/* Teacher Answer Key Toggle */}
          <button
            id="btn-toggle-teacher-key"
            onClick={() => setShowTeacherKey(!showTeacherKey)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black border-2 transition-all shadow-sm ${
              showTeacherKey
                ? 'bg-[#F59E0B] text-white border-[#B45309]'
                : 'bg-white hover:bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]'
            }`}
          >
            {showTeacherKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-[#D97706]" />}
            <span>{showTeacherKey ? "Hide Answer Key" : "Teacher Answer Key 🔑"}</span>
          </button>
        </div>
      </div>

      {/* Printable Worksheet Selection Tabs (Screen Only) */}
      <div className="print:hidden grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
        {WORKSHEETS_DATA.map((ws, idx) => {
          const isSelected = ws.id === selectedWsId;
          const prog = progressMap[ws.id];
          return (
            <button
              key={ws.id}
              id={`tab-ws-${ws.id}`}
              onClick={() => setSelectedWsId(ws.id)}
              className={`p-3.5 rounded-3xl text-left border-4 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#FEF3C7] border-[#F59E0B] shadow-md scale-[1.02]'
                  : 'bg-white hover:bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#D97706]">
                  Part {idx + 1}
                </span>
                {prog?.completed && (
                  <span className="flex items-center text-[10px] font-bold bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full border border-[#22C55E]">
                    <CheckCircle2 className="w-3 h-3 mr-0.5" />
                    {prog.score}/{prog.totalQuestions}
                  </span>
                )}
              </div>
              <h4 className="text-xs sm:text-sm font-black text-[#78350F] line-clamp-2 leading-tight">
                {ws.title.split(':')[1] || ws.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Main Worksheet Container (Screen & Print Formatted) */}
      <div className="worksheet-print-container bg-white print:bg-white border-4 border-[#FDE68A] print:border-none rounded-3xl p-6 sm:p-10 print:p-0 shadow-xl print:shadow-none text-slate-800 print:text-black">
        {/* Printable Classroom Header */}
        <div className="print-avoid-break border-b-4 border-[#FDE68A] print:border-black pb-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#D97706] print:text-amber-800 text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>BEYOND THE PIGGY BANK • FINANCIAL LITERACY WORKBOOK</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#78350F] print:text-black mt-1">
                {currentWorksheet.title}
              </h1>
              <p className="text-sm font-medium text-[#92400E] print:text-gray-700 mt-1 max-w-2xl">
                {currentWorksheet.subtitle}
              </p>
            </div>

            {/* Student Info Lines for Print */}
            <div className="w-full sm:w-64 bg-[#FEF3C7] print:bg-gray-100 p-4 rounded-2xl border-2 border-[#F59E0B] print:border-gray-300 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-[#78350F]">
                <span>Student Name:</span>
                <div className="border-b-2 border-[#92400E] print:border-black w-32 h-4" />
              </div>
              <div className="flex items-center justify-between font-bold text-[#78350F]">
                <span>Date:</span>
                <div className="border-b-2 border-[#92400E] print:border-black w-32 h-4" />
              </div>
              <div className="flex items-center justify-between font-bold text-[#78350F]">
                <span>Score / Grade:</span>
                <div className="font-black text-[#D97706] print:text-black text-sm">
                  {isSubmitted ? `${calculateScore()} / ${currentWorksheet.questions.length}` : `___ / ${currentWorksheet.questions.length}`}
                </div>
              </div>
            </div>
          </div>

          {/* Storybook Reference Banner */}
          <div className="mt-4 p-4 rounded-2xl bg-[#E0F2FE] print:bg-amber-50 border-2 border-[#7DD3FC] print:border-amber-300 flex items-center justify-between text-xs text-[#0C4A6E] print:text-amber-900">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0284C7] print:text-amber-800 flex-shrink-0" />
              <span className="font-medium">
                <strong className="font-black text-[#0369A1]">Story Connection:</strong> {currentWorksheet.storybookConnection}
              </span>
            </div>
            <button
              id="btn-goto-story-page"
              onClick={() => onNavigateToStoryPage(currentWorksheet.relatedPages[0])}
              className="print:hidden flex items-center gap-1 font-black text-[#0284C7] hover:text-[#0C4A6E] underline ml-2 flex-shrink-0"
            >
              <span>Read Story Pages ({currentWorksheet.relatedPages.join(', ')})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Teacher Key Banner (if toggled) */}
        {showTeacherKey && (
          <div className="mb-6 p-4 rounded-2xl bg-[#DCFCE7] print:bg-emerald-100 border-2 border-[#22C55E] text-[#166534] text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#166534]" />
              <div>
                <strong className="block text-sm font-black">TEACHER ANSWER KEY MODE ACTIVE 🔑</strong>
                <span className="font-medium">Correct answers and full explanations are highlighted below for classroom grading.</span>
              </div>
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6 print:space-y-4">
          {currentWorksheet.questions.map((q) => {
            const userAns = answers[q.id];
            const isCorrect = isQuestionCorrect(q);

            return (
              <div
                key={q.id}
                id={`question-box-${q.id}`}
                className={`worksheet-question-card p-6 print:p-4 rounded-3xl border-4 print:border-2 transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-[#F0FDF4] border-[#22C55E] print:bg-white print:border-gray-400'
                      : 'bg-[#FEF2F2] border-[#EF4444] print:bg-white print:border-gray-400'
                    : 'bg-[#FFFBEB] print:bg-white border-[#FDE68A] print:border-gray-300'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-2xl bg-[#FEF3C7] print:bg-gray-200 text-[#78350F] print:text-black font-black flex items-center justify-center text-sm border-2 border-[#F59E0B] print:border-gray-400 shadow-sm">
                      {q.questionNumber}
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#D97706] print:text-amber-800 bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-[#F59E0B]">
                        {q.conceptTag}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-[#78350F] print:text-black mt-0.5">
                        {q.title}
                      </h3>
                    </div>
                  </div>

                  {/* Submission Status Badge */}
                  {isSubmitted && (
                    <div className="print:hidden">
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-xs font-black text-[#166534] bg-[#DCFCE7] px-3 py-1 rounded-full border-2 border-[#22C55E]">
                          <CheckCircle2 className="w-4 h-4" /> Correct (+1)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-black text-[#991B1B] bg-[#FEE2E2] px-3 py-1 rounded-full border-2 border-[#EF4444]">
                          <XCircle className="w-4 h-4" /> Review (0)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Prompt Text */}
                <p className="text-sm sm:text-base text-slate-800 print:text-gray-900 mb-4 whitespace-pre-line leading-relaxed font-medium">
                  {q.prompt}
                </p>

                {/* Math Expression Box if provided */}
                {q.mathExpression && (
                  <div className="mb-4 p-4 rounded-2xl bg-white print:bg-gray-100 border-2 border-[#FDE68A] print:border-gray-300 font-mono text-sm sm:text-base text-[#78350F] print:text-black flex items-center justify-between font-bold shadow-inner">
                    <span>{q.mathExpression}</span>
                    {showTeacherKey && q.correctNumber !== undefined && (
                      <span className="text-[#166534] print:text-emerald-800 font-black ml-4 bg-[#DCFCE7] px-3 py-1 rounded-xl border border-[#22C55E]">
                        = {q.correctNumber}
                      </span>
                    )}
                  </div>
                )}

                {/* Interactive Question Types */}
                {/* 1. Multiple Choice */}
                {q.type === 'multiple-choice' && q.options && (
                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAns === optIdx;
                      const isCorrectOpt = optIdx === q.correctOptionIndex;

                      let optClass = "bg-white print:bg-white border-2 border-[#FDE68A] print:border-gray-300 text-slate-800 print:text-black hover:bg-[#FEF3C7]";
                      if (isSubmitted || showTeacherKey) {
                        if (isCorrectOpt) {
                          optClass = "bg-[#DCFCE7] print:bg-emerald-50 border-2 border-[#22C55E] text-[#166534] font-black";
                        } else if (isSelected && !isCorrectOpt) {
                          optClass = "bg-[#FEE2E2] print:bg-rose-50 border-2 border-[#EF4444] text-[#991B1B]";
                        }
                      } else if (isSelected) {
                        optClass = "bg-[#FEF3C7] border-2 border-[#F59E0B] text-[#78350F] font-black shadow-md";
                      }

                      return (
                        <button
                          key={optIdx}
                          id={`btn-opt-${q.id}-${optIdx}`}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          disabled={isSubmitted}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${optClass}`}
                        >
                          <span className="w-6 h-6 rounded-full bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center flex-shrink-0 text-xs mt-0.5 font-black text-[#78350F]">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1 leading-snug font-semibold">{opt}</span>
                          {showTeacherKey && isCorrectOpt && (
                            <span className="text-[10px] uppercase font-black bg-[#10B981] text-white px-2.5 py-0.5 rounded-full">
                              Correct
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. Number Input */}
                {q.type === 'number-input' && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="relative flex-1 max-w-xs">
                      <input
                        id={`input-number-${q.id}`}
                        type="number"
                        step="any"
                        placeholder="Enter your calculation..."
                        value={userAns ?? ''}
                        onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                        disabled={isSubmitted}
                        className={`w-full px-4 py-3 rounded-2xl bg-white print:bg-white border-2 text-slate-900 print:text-black text-sm focus:outline-none focus:border-[#F59E0B] font-mono font-bold shadow-sm ${
                          isSubmitted
                            ? isCorrect
                              ? 'border-[#22C55E] bg-[#DCFCE7] text-[#166534]'
                              : 'border-[#EF4444] bg-[#FEE2E2] text-[#991B1B]'
                            : 'border-[#FDE68A] print:border-gray-400'
                        }`}
                      />
                    </div>
                    {showTeacherKey && (
                      <div className="text-xs text-[#166534] font-black bg-[#DCFCE7] px-4 py-2.5 rounded-2xl border-2 border-[#22C55E]">
                        Correct Answer: {q.correctNumber}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Sorting Activity */}
                {q.type === 'sorting' && q.sortingItems && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Bucket A: Piggy Bank */}
                      <div className="bg-[#FFF1F2] border-4 border-dashed border-[#F43F5E] rounded-3xl p-4">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#FECDD3] text-[#9F1239] font-black text-sm">
                          <span>🐷</span>
                          <span>Ceramic Piggy Bank (Idle Cash)</span>
                        </div>
                        <div className="space-y-2 min-h-[120px]">
                          {q.sortingItems.map(item => {
                            const bucket = sortingState[item.id] || (userAns && userAns[item.id]);
                            if (bucket !== 'piggy') return null;

                            const itemCorrect = item.correctBucket === 'piggy';
                            let itemStyle = "bg-white text-[#9F1239] border-2 border-[#FECDD3]";
                            if (isSubmitted) {
                              itemStyle = itemCorrect
                                ? 'bg-[#DCFCE7] text-[#166534] border-2 border-[#22C55E] font-bold'
                                : 'bg-[#FEE2E2] text-[#991B1B] border-2 border-[#EF4444]';
                            }

                            return (
                              <div
                                key={item.id}
                                className={`p-3 rounded-2xl border text-xs flex items-center justify-between shadow-sm ${itemStyle}`}
                              >
                                <span className="font-bold">{item.text}</span>
                                {!isSubmitted && (
                                  <button
                                    id={`btn-move-bank-${item.id}`}
                                    onClick={() => handleSortItem(q.id, item.id, 'bank')}
                                    className="text-[10px] font-black bg-[#E0F2FE] text-[#0284C7] px-2.5 py-1 rounded-xl border border-[#7DD3FC] hover:bg-[#BAE6FD]"
                                  >
                                    Move to Bank →
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Bucket B: Bank Account */}
                      <div className="bg-[#E0F2FE] border-4 border-dashed border-[#0284C7] rounded-3xl p-4">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#BAE6FD] text-[#0C4A6E] font-black text-sm">
                          <span>🏛️</span>
                          <span>Bank Account (Savings Engine)</span>
                        </div>
                        <div className="space-y-2 min-h-[120px]">
                          {q.sortingItems.map(item => {
                            const bucket = sortingState[item.id] || (userAns && userAns[item.id]);
                            if (bucket !== 'bank') return null;

                            const itemCorrect = item.correctBucket === 'bank';
                            let itemStyle = "bg-white text-[#0C4A6E] border-2 border-[#BAE6FD]";
                            if (isSubmitted) {
                              itemStyle = itemCorrect
                                ? 'bg-[#DCFCE7] text-[#166534] border-2 border-[#22C55E] font-bold'
                                : 'bg-[#FEE2E2] text-[#991B1B] border-2 border-[#EF4444]';
                            }

                            return (
                              <div
                                key={item.id}
                                className={`p-3 rounded-2xl border text-xs flex items-center justify-between shadow-sm ${itemStyle}`}
                              >
                                <span className="font-bold">{item.text}</span>
                                {!isSubmitted && (
                                  <button
                                    id={`btn-move-piggy-${item.id}`}
                                    onClick={() => handleSortItem(q.id, item.id, 'piggy')}
                                    className="text-[10px] font-black bg-[#FFE4E6] text-[#E11D48] px-2.5 py-1 rounded-xl border border-[#FECDD3] hover:bg-[#FECDD3]"
                                  >
                                    ← Move to Piggy
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Unsorted Pool */}
                    {!isSubmitted && (
                      <div className="p-4 bg-[#FEF3C7] rounded-3xl border-2 border-[#F59E0B]">
                        <span className="text-xs text-[#78350F] font-black mb-2 block">
                          👇 Click a bucket to place each item:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {q.sortingItems.map(item => {
                            const bucket = sortingState[item.id] || (userAns && userAns[item.id]);
                            if (bucket) return null; // already placed

                            return (
                              <div
                                key={item.id}
                                className="bg-white p-3 rounded-2xl border-2 border-[#FDE68A] text-xs text-[#78350F] font-bold flex items-center gap-2 shadow-sm"
                              >
                                <span>{item.text}</span>
                                <div className="flex gap-1">
                                  <button
                                    id={`btn-sort-piggy-${item.id}`}
                                    onClick={() => handleSortItem(q.id, item.id, 'piggy')}
                                    className="px-2.5 py-1 rounded-xl bg-[#FFE4E6] hover:bg-[#FECDD3] text-[#E11D48] text-[10px] font-black border border-[#FDA4AF]"
                                  >
                                    🐷 Piggy
                                  </button>
                                  <button
                                    id={`btn-sort-bank-${item.id}`}
                                    onClick={() => handleSortItem(q.id, item.id, 'bank')}
                                    className="px-2.5 py-1 rounded-xl bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] text-[10px] font-black border border-[#7DD3FC]"
                                  >
                                    🏛️ Bank
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Aunt Minty Hint & Explanation Accordion */}
                <div className="mt-4 pt-3 border-t-2 border-[#FDE68A] print:border-gray-200 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <button
                      id={`btn-hint-${q.id}`}
                      onClick={() => handleToggleHint(q.id)}
                      className="print:hidden text-xs text-[#D97706] hover:text-[#78350F] flex items-center gap-1.5 font-black"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>{showHints[q.id] ? "Hide Aunt Minty's Hint" : "Need a Hint from Aunt Minty? 💡"}</span>
                    </button>
                  </div>

                  {showHints[q.id] && (
                    <div className="p-3.5 rounded-2xl bg-[#FEF3C7] print:bg-amber-50 border-2 border-[#F59E0B] text-xs text-[#78350F] print:text-amber-900 leading-relaxed font-medium">
                      <strong className="font-black text-[#92400E]">Aunt Minty's Tip:</strong> {q.hint}
                    </div>
                  )}

                  {(isSubmitted || showTeacherKey) && (
                    <div className="p-4 rounded-2xl bg-[#FEF3C7] print:bg-gray-100 border-2 border-[#F59E0B] print:border-gray-300 text-xs text-[#78350F] print:text-gray-800 space-y-1">
                      <strong className="text-[#92400E] font-black block">📖 Concept Explanation:</strong>
                      <p className="font-medium leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Footer (Submit / Reset / Next Worksheet) */}
        <div className="print:hidden mt-8 pt-6 border-t-4 border-[#FDE68A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {!isSubmitted ? (
              <button
                id="btn-submit-worksheet-final"
                onClick={handleSubmitWorksheet}
                className="px-8 py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-sm border-b-4 border-[#047857] shadow-xl transition-all flex items-center gap-2"
              >
                <Award className="w-5 h-5" />
                <span>Submit & Grade Worksheet ⭐</span>
              </button>
            ) : (
              <button
                id="btn-retry-worksheet"
                onClick={handleResetWorksheet}
                className="px-5 py-2.5 rounded-2xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] font-black text-xs border-2 border-[#F59E0B] flex items-center gap-2 shadow-sm"
              >
                <RotateCcw className="w-4 h-4 text-[#D97706]" />
                <span>Try Worksheet Again</span>
              </button>
            )}
          </div>

          {/* Quick Jump to Next Worksheet */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#92400E]">Jump to:</span>
            {WORKSHEETS_DATA.map((w, idx) => (
              <button
                key={w.id}
                id={`btn-jump-ws-${w.id}`}
                onClick={() => setSelectedWsId(w.id)}
                className={`w-8 h-8 rounded-xl text-xs font-black border-2 transition-all ${
                  selectedWsId === w.id
                    ? 'bg-[#F59E0B] text-white border-[#B45309] shadow-sm'
                    : 'bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] border-[#F59E0B]'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
