import { Wrench } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function PlaceholderPage() {
  const location = useLocation();
  const pathName = location.pathname.split('/').pop();
  const title = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  return (
    <div className="h-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <div className="w-20 h-20 bg-brand-50 rounded-[24px] flex items-center justify-center mb-6 shadow-sm border border-brand-100">
        <Wrench className="w-10 h-10 text-brand-600" />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{title} Module</h2>
      <p className="text-lg text-slate-500 font-medium max-w-md">
        This page is under construction. Associated data will be fetched by API soon!
      </p>
      <div className="mt-8 px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-400 uppercase tracking-widest">
        Pending Integration
      </div>
    </div>
  );
}
