import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Printer, Sparkles, Telescope, CheckCircle2, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateViewProps {
  completedWorksheetsCount: number;
  totalWorksheets: number;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  completedWorksheetsCount,
  totalWorksheets
}) => {
  const [studentName, setStudentName] = useState<string>('Young Astronomer');
  const [completionDate, setCompletionDate] = useState<string>(
    new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  );

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#38bdf8', '#10b981', '#fb7185', '#a855f7']
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-4">
      {/* Action Banner (Screen only) */}
      <div className="print:hidden flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white border-4 border-[#FDE68A] rounded-3xl p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center text-[#D97706] shadow-sm">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#78350F] leading-tight">Junior Financial Astronomer Certificate 🎓</h2>
            <p className="text-xs text-[#92400E] font-bold mt-0.5">Awarded for mastering inflation, compound interest, and savings engines</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-celebrate-cert"
            onClick={handleCelebrate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black bg-[#F59E0B] hover:bg-[#D97706] text-white transition-all shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Celebrate! 🎉</span>
          </button>

          <button
            id="btn-print-cert"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] border-2 border-[#F59E0B] transition-all shadow-sm"
          >
            <Printer className="w-4 h-4 text-[#D97706]" />
            <span>Print Official Certificate 🖨️</span>
          </button>
        </div>
      </div>

      {/* Name Customization Input on Screen */}
      <div className="print:hidden bg-white border-4 border-[#FDE68A] rounded-3xl p-5 mb-6 flex flex-col sm:flex-row items-center gap-4 text-xs shadow-md">
        <div className="flex-1 w-full">
          <label className="block text-[#78350F] mb-1 font-bold">Recipient Student Name:</label>
          <input
            id="input-cert-student-name"
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name..."
            className="w-full px-4 py-2.5 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] text-slate-800 text-sm font-bold focus:outline-none focus:border-[#F59E0B]"
          />
        </div>
        <div className="w-full sm:w-56">
          <label className="block text-[#78350F] mb-1 font-bold">Award Date:</label>
          <input
            id="input-cert-date"
            type="text"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] text-slate-800 text-sm font-bold focus:outline-none focus:border-[#F59E0B]"
          />
        </div>
      </div>

      {/* Certificate Frame (Designed for pristine print & vibrant display) */}
      <div className="relative bg-[#FFFBEB] print:bg-white text-slate-900 print:text-black border-8 border-double border-[#F59E0B] print:border-amber-700 rounded-3xl p-8 sm:p-14 shadow-2xl overflow-hidden">
        {/* Ornate Starry Corner Accents */}
        <div className="absolute top-4 left-4 text-[#D97706] print:text-amber-700 text-sm font-serif flex items-center gap-1">
          <Star className="w-5 h-5 fill-current" />
          <span>★</span>
        </div>
        <div className="absolute top-4 right-4 text-[#D97706] print:text-amber-700 text-sm font-serif flex items-center gap-1">
          <span>★</span>
          <Star className="w-5 h-5 fill-current" />
        </div>
        <div className="absolute bottom-4 left-4 text-[#D97706] print:text-amber-700 text-sm font-serif flex items-center gap-1">
          <Star className="w-5 h-5 fill-current" />
          <span>★</span>
        </div>
        <div className="absolute bottom-4 right-4 text-[#D97706] print:text-amber-700 text-sm font-serif flex items-center gap-1">
          <span>★</span>
          <Star className="w-5 h-5 fill-current" />
        </div>

        {/* Certificate Content */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <div className="w-18 h-18 rounded-3xl bg-[#FEF3C7] border-4 border-[#F59E0B] flex items-center justify-center text-[#D97706] shadow-md p-3">
              <Telescope className="w-10 h-10" />
            </div>
          </div>

          <div>
            <div className="text-xs uppercase font-black tracking-widest text-[#D97706] print:text-amber-800">
              BEYOND THE PIGGY BANK • OFFICIAL ACADEMY
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight mt-1 text-[#78350F] print:text-black">
              CERTIFICATE OF FINANCIAL EXCELLENCE
            </h1>
            <p className="text-xs sm:text-sm text-[#92400E] print:text-gray-600 italic mt-1 font-serif font-bold">
              "Building a Ladder to the Stars Through Active Savings & Compound Growth"
            </p>
          </div>

          <div className="py-2">
            <p className="text-xs uppercase tracking-widest text-[#92400E] print:text-gray-600 font-black">
              THIS RECOGNITION IS PROUDLY CONFERRED UPON
            </p>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#B45309] print:text-black border-b-4 border-[#F59E0B] print:border-black inline-block px-8 py-2 mt-2">
              {studentName || "Young Learner"}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#78350F] print:text-gray-800 leading-relaxed font-serif max-w-xl mx-auto font-medium">
            for successfully mastering the core principles of <strong>Beyond the Piggy Bank</strong>: understanding why idle cash loses to inflation, harnessing compound interest to grow savings, reading bank statements, and strategically budgeting for future dreams.
          </p>

          {/* Badges / Seals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-[#FDE68A] print:border-gray-300 text-center">
            <div className="p-3 bg-white print:bg-gray-100 rounded-2xl border-2 border-[#FDE68A] print:border-gray-300 text-[11px] shadow-sm">
              <span className="font-black text-[#D97706] print:text-black block">✓ Idle Cash vs Bank</span>
              <span className="text-[#92400E] print:text-gray-600 font-bold">Passed</span>
            </div>
            <div className="p-3 bg-white print:bg-gray-100 rounded-2xl border-2 border-[#FDE68A] print:border-gray-300 text-[11px] shadow-sm">
              <span className="font-black text-[#EF4444] print:text-black block">✓ Inflation Racer</span>
              <span className="text-[#92400E] print:text-gray-600 font-bold">Passed</span>
            </div>
            <div className="p-3 bg-white print:bg-gray-100 rounded-2xl border-2 border-[#FDE68A] print:border-gray-300 text-[11px] shadow-sm">
              <span className="font-black text-[#10B981] print:text-black block">✓ Compound Sprout</span>
              <span className="text-[#92400E] print:text-gray-600 font-bold">Passed</span>
            </div>
            <div className="p-3 bg-white print:bg-gray-100 rounded-2xl border-2 border-[#FDE68A] print:border-gray-300 text-[11px] shadow-sm">
              <span className="font-black text-[#0284C7] print:text-black block">✓ Saturn Planner</span>
              <span className="text-[#92400E] print:text-gray-600 font-bold">Passed</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="font-serif italic font-bold text-[#D97706] print:text-black text-lg">Aunt Minty</div>
              <div className="border-t-2 border-[#78350F] print:border-black mt-1 pt-1 text-[11px] text-[#78350F] print:text-gray-700 font-bold">
                Aunt Minty, Financial Mentor
              </div>
            </div>

            <div className="text-center">
              <div className="font-serif italic font-bold text-[#D97706] print:text-black text-lg">Silas & Belly</div>
              <div className="border-t-2 border-[#78350F] print:border-black mt-1 pt-1 text-[11px] text-[#78350F] print:text-gray-700 font-bold">
                Silas, Saturn Astronomer
              </div>
            </div>
          </div>

          <div className="text-[10px] text-[#92400E] print:text-gray-500 pt-2 font-mono font-bold">
            Issued on {completionDate} • Verified Beyond the Piggy Bank Academy
          </div>
        </div>
      </div>
    </div>
  );
};
