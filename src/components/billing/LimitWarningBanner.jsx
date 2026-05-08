import { AlertTriangle } from 'lucide-react';

export default function LimitWarningBanner({ onUpgradeClick, current = 500, max = 500 }) {
  return (
    <div className="bg-[#F8DCA5] border border-[#E9C37A] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fade-in w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-4 w-full">
        <div className="text-[#C17C29]">
          <AlertTriangle size={32} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-[#8C5815] font-black text-lg leading-tight">Product limit reached ({current}/{max})</h3>
          <p className="text-[#A66E22] font-bold text-sm">Upgrade to pro to add unlimited products</p>
        </div>
      </div>
      <button 
        onClick={onUpgradeClick}
        className="shrink-0 w-full sm:w-auto px-6 py-2.5 bg-[#C68D37] hover:bg-[#B37E30] text-white rounded-xl font-bold transition shadow-sm"
      >
        Upgrade Now
      </button>
    </div>
  );
}
