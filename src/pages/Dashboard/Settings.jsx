import { CreditCard, Database, User } from 'lucide-react';

export default function Settings() {
  return (
    <div className="animate-fade-in w-full max-w-5xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your profile, billing, and organizational data.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-4">
            <User size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Profile</h3>
          <p className="text-sm font-medium text-slate-500 mb-6">Control your personal dataset and credentials.</p>
          <div className="space-y-4">
             <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-bold text-slate-600">Email</span>
                <span className="text-sm font-bold text-slate-900">admin@stockox.com</span>
             </div>
             <button className="w-full py-2.5 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition text-sm">Edit Profile</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ring-2 ring-brand-100 relative">
          <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">Active</div>
          <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-4">
            <CreditCard size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Subscription</h3>
          <p className="text-sm font-medium text-slate-500 mb-6">Manage your StockOX SaaS tier and seating.</p>
          <div className="space-y-4">
             <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-bold text-slate-600">Current Plan</span>
                <span className="text-sm font-black text-brand-600">Pro Tier</span>
             </div>
             <button className="w-full py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition text-sm">Manage Billing</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-4">
            <Database size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Your Data</h3>
          <p className="text-sm font-medium text-slate-500 mb-6">Import external ledgers or export internal matrices.</p>
          <div className="space-y-3">
             <button className="w-full py-2.5 px-4 bg-slate-50 border border-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition text-sm text-left">Request CSV Export</button>
             <button className="w-full py-2.5 px-4 bg-slate-50 border border-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition text-sm text-left">Connect ERP Source</button>
          </div>
        </div>

      </div>
    </div>
  );
}
