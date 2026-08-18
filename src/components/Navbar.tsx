import React from 'react';
import { 
  Telescope, 
  BookOpen, 
  FileText, 
  Sparkles, 
  Bot, 
  Award, 
  GraduationCap, 
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

export type NavView = 'story' | 'worksheets' | 'simulators' | 'minty' | 'certificate' | 'educator';

interface NavbarProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  completedWorksheetsCount: number;
  totalWorksheets: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  completedWorksheetsCount,
  totalWorksheets,
}) => {
  const navItems: { id: NavView; label: string; icon: string }[] = [
    { id: 'story', label: 'Storybook', icon: '📖' },
    { id: 'worksheets', label: 'Worksheets', icon: '📝' },
    { id: 'simulators', label: 'Simulators', icon: '🚀' },
    { id: 'minty', label: 'Ask Minty', icon: '✨' },
    { id: 'certificate', label: 'Certificate', icon: '🏆' },
    { id: 'educator', label: 'Educator Hub', icon: '🎓' },
  ];

  const progressPercent = Math.round((completedWorksheetsCount / totalWorksheets) * 100);

  return (
    <header className="print:hidden sticky top-0 z-50 bg-[#FBBF24] border-b-4 border-[#D97706] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div 
            id="brand-logo"
            onClick={() => onSelectView('story')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center border-2 border-[#D97706] shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-2xl">🔭</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-black text-[#78350F] tracking-tight leading-none">
                  BEYOND THE PIGGY BANK
                </h1>
                <span className="text-[10px] uppercase font-black tracking-wider bg-[#FEF3C7] text-[#92400E] px-2.5 py-0.5 rounded-full border border-[#F59E0B] shadow-inner hidden sm:inline-block">
                  Storybook Finance
                </span>
              </div>
              <p className="text-xs font-bold text-[#92400E] hidden md:block">
                Interactive Financial Literacy for Young Astronomers
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#FEF3C7] p-1.5 rounded-2xl border-2 border-[#F59E0B] shadow-inner">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => onSelectView(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    isActive
                      ? 'bg-[#78350F] text-white shadow-md border-b-2 border-[#451A03]'
                      : 'text-[#92400E] hover:bg-[#FDE68A] hover:text-[#78350F]'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Progress Tracker Pill */}
          <div className="flex items-center gap-2">
            <button
              id="btn-nav-progress"
              onClick={() => onSelectView('worksheets')}
              className="flex items-center gap-2.5 bg-[#FEF3C7] px-3.5 py-1.5 rounded-full border-2 border-[#F59E0B] shadow-sm hover:bg-white transition-colors"
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-[#92400E] uppercase leading-none">
                  Progress ({completedWorksheetsCount}/{totalWorksheets})
                </span>
                <div className="w-20 sm:w-28 h-2.5 bg-white rounded-full overflow-hidden border border-[#F59E0B] mt-1">
                  <div 
                    className="h-full bg-[#10B981] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 scrollbar-none border-t-2 border-[#D97706]">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-btn-${item.id}`}
                onClick={() => onSelectView(item.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#78350F] text-white shadow'
                    : 'bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
