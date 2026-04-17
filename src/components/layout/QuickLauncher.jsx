import { useState } from 'react';
import { MessageCircle, X, LayoutDashboard, PackageSearch, ShoppingCart, Tag, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-64 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[24px] shadow-2xl p-4 animate-fade-in origin-bottom-right">
          <div className="pb-3 mb-3 border-b border-slate-100 flex justify-between items-center px-1">
            <span className="font-bold text-slate-900 text-sm">Quick Preview</span>
            <span className="bg-brand-100 text-brand-600 text-[10px] font-bold px-2 py-0.5 rounded-full">DEMO</span>
          </div>

          <div className="space-y-1">
            <button onClick={() => handleNav('/dashboard')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-brand-600 transition text-sm font-medium">
              <LayoutDashboard size={16} /> Dashboard Preview
            </button>
            <button onClick={() => handleNav('/dashboard/products')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-brand-600 transition text-sm font-medium">
              <PackageSearch size={16} /> Inventory Page
            </button>
            <button onClick={() => handleNav('/dashboard/orders')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-brand-600 transition text-sm font-medium">
              <ShoppingCart size={16} /> Orders Page
            </button>
            <button onClick={() => handleNav('/dashboard/suppliers')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-brand-600 transition text-sm font-medium">
              <Tag size={16} /> Suppliers Page
            </button>

            <div className="h-px bg-slate-100 my-2"></div>

            <button onClick={() => handleNav('/login')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-brand-600 transition text-sm font-medium">
              <LogIn size={16} /> Sign In UI
            </button>
            <button onClick={() => handleNav('/register')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-brand-600 transition text-sm font-medium">
              <UserPlus size={16} /> Create Account UI
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-full flex items-center justify-center shadow-xl shadow-brand-500/30 transition-transform active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
