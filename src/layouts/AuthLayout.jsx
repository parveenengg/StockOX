import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-16 px-8 sm:px-16 relative">
      <div className="max-w-xl w-full border border-brand-100/50 bg-white shadow-2xl shadow-brand-100 rounded-[32px] p-12 sm:p-16 z-10">
        <Outlet />
      </div>
      
      <div className="absolute bottom-8 w-full text-center pointer-events-auto">
        <p className="text-xs font-bold text-slate-400">
          StockOX © 2026 <span className="mx-2">|</span> <span className="cursor-pointer hover:text-slate-600 transition">Privacy</span> <span className="mx-2">|</span> <span className="cursor-pointer hover:text-slate-600 transition">Terms</span> <span className="mx-2">|</span> <span className="cursor-pointer hover:text-slate-600 transition">Help</span>
        </p>
      </div>
    </div>
  );
}
