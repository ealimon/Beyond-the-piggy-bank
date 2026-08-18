import React, { useState, useEffect } from 'react';
import { Navbar, NavView } from './components/Navbar';
import { StorybookReader } from './components/StorybookReader';
import { WorksheetHub } from './components/WorksheetHub';
import { SavingsSimulator } from './components/SavingsSimulator';
import { AskAuntMinty } from './components/AskAuntMinty';
import { CertificateView } from './components/CertificateView';
import { EducatorHub } from './components/EducatorHub';
import { WORKSHEETS_DATA } from './data/worksheetsData';
import { UserWorksheetProgress } from './types';
import { Telescope, Sparkles, BookOpen, FileText, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'beyond_piggy_bank_progress_v1';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('story');
  const [targetWorksheetId, setTargetWorksheetId] = useState<string>('ws-1');
  const [targetStoryPage, setTargetStoryPage] = useState<number>(1);
  const [progressMap, setProgressMap] = useState<Record<string, UserWorksheetProgress>>({});
  const [learnedConcepts, setLearnedConcepts] = useState<string[]>([]);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProgressMap(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load saved student progress:", e);
    }
  }, []);

  const handleSaveProgress = (prog: UserWorksheetProgress) => {
    setProgressMap(prev => {
      const next = { ...prev, [prog.worksheetId]: prog };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn("Could not persist student progress:", e);
      }
      return next;
    });
  };

  const handleRecordConcept = (term: string) => {
    if (!learnedConcepts.includes(term)) {
      setLearnedConcepts(prev => [...prev, term]);
    }
  };

  const handleNavigateToWorksheet = (wsId: string) => {
    setTargetWorksheetId(wsId);
    setCurrentView('worksheets');
  };

  const handleNavigateToStoryPage = (pageNo: number) => {
    setTargetStoryPage(pageNo);
    setCurrentView('story');
  };

  const completedCount = (Object.values(progressMap) as UserWorksheetProgress[]).filter(p => p.completed).length;

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-slate-800 flex flex-col font-sans selection:bg-[#FBBF24] selection:text-[#78350F]">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        completedWorksheetsCount={completedCount}
        totalWorksheets={WORKSHEETS_DATA.length}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1 w-full flex flex-col items-center justify-start py-4 sm:py-8 px-2 sm:px-4">
        {currentView === 'story' && (
          <StorybookReader
            onNavigateToWorksheet={handleNavigateToWorksheet}
            onRecordConceptLearned={handleRecordConcept}
          />
        )}

        {currentView === 'worksheets' && (
          <WorksheetHub
            initialWorksheetId={targetWorksheetId}
            progressMap={progressMap}
            onSaveProgress={handleSaveProgress}
            onNavigateToStoryPage={handleNavigateToStoryPage}
          />
        )}

        {currentView === 'simulators' && (
          <SavingsSimulator />
        )}

        {currentView === 'minty' && (
          <AskAuntMinty />
        )}

        {currentView === 'certificate' && (
          <CertificateView
            completedWorksheetsCount={completedCount}
            totalWorksheets={WORKSHEETS_DATA.length}
          />
        )}

        {currentView === 'educator' && (
          <EducatorHub />
        )}
      </main>

      {/* Footer */}
      <footer className="print:hidden border-t-4 border-[#FDE68A] bg-[#FEF3C7] py-6 px-4 sm:px-8 text-xs text-[#92400E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-[#D97706] shadow-sm flex items-center justify-center text-[#D97706]">
              <Telescope className="w-5 h-5" />
            </div>
            <div>
              <p className="font-black text-[#78350F] text-sm">
                Beyond the Piggy Bank: Storybook Financial Literacy
              </p>
              <p className="text-xs text-[#92400E] font-medium">
                Mastering compound interest, beating inflation & building savings engines with Silas and Aunt Minty.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-bold text-xs text-[#92400E]">
            <button
              id="footer-nav-story"
              onClick={() => setCurrentView('story')}
              className="bg-white px-3 py-1 rounded-full border border-[#F59E0B] hover:bg-[#FEF3C7] transition-colors"
            >
              📖 Storybook
            </button>
            <button
              id="footer-nav-ws"
              onClick={() => setCurrentView('worksheets')}
              className="bg-white px-3 py-1 rounded-full border border-[#F59E0B] hover:bg-[#FEF3C7] transition-colors"
            >
              📝 5 Worksheets
            </button>
            <button
              id="footer-nav-sim"
              onClick={() => setCurrentView('simulators')}
              className="bg-white px-3 py-1 rounded-full border border-[#F59E0B] hover:bg-[#FEF3C7] transition-colors"
            >
              🚀 Simulators
            </button>
            <button
              id="footer-nav-cert"
              onClick={() => setCurrentView('certificate')}
              className="bg-white px-3 py-1 rounded-full border border-[#F59E0B] hover:bg-[#FEF3C7] transition-colors"
            >
              🏆 Certificate
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
