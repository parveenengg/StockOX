import { useState } from 'react';
import { Star, Package, Home, Users, Lock, Crown, Rocket } from 'lucide-react';

export default function UpgradeModal({ onSelectPlan, onCancel }) {
  const [selectedPlan, setSelectedPlan] = useState('business'); // 'pro' or 'business'

  return (
    <div className="bg-white p-8 animate-slide-up w-full max-w-lg mx-auto rounded-3xl shadow-2xl border border-slate-100">
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 relative">
            <Star size={24} fill="currentColor" />
            <span className="absolute -top-1 -right-4 bg-orange-100 text-orange-600 text-[8px] font-black uppercase px-2 py-0.5 rounded border border-orange-200">Lite plan</span>
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Upgrade to add more products</h2>
        <p className="text-sm font-medium text-slate-500">You've used 500 of 500 product on the starter plan. Upgrade to continue growing your business.</p>
      </div>

      {/* Progress Bar Area */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-indigo-600" />
            <span className="text-xs font-bold text-slate-800">Product used</span>
          </div>
          <span className="text-xs font-black text-rose-500">500/500</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-rose-500 rounded-full" style={{ width: '100%' }}></div>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
          <div className="flex items-center gap-1">
            <Home size={12} className="text-orange-500"/> Warehouse: '1'
          </div>
          <div className="w-px h-3 bg-slate-200"></div>
          <div className="flex items-center gap-1">
            <Users size={12} className="text-orange-500"/> User: 3/3
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="flex gap-1"><div className="w-1 h-1 rounded-full bg-brand-400"></div><div className="w-1 h-1 rounded-full bg-brand-400"></div><div className="w-1 h-1 rounded-full bg-brand-400"></div></div>
        <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Choose a plan</span>
        <div className="flex gap-1"><div className="w-1 h-1 rounded-full bg-brand-400"></div><div className="w-1 h-1 rounded-full bg-brand-400"></div><div className="w-1 h-1 rounded-full bg-brand-400"></div></div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        
        {/* Pro Plan */}
        <div 
          onClick={() => setSelectedPlan('pro')}
          className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${selectedPlan === 'pro' ? 'border-brand-500 bg-brand-50 shadow-md ring-4 ring-brand-500/10' : 'border-slate-100 hover:border-slate-200'}`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${selectedPlan === 'pro' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
            <Lock size={14} />
          </div>
          <h4 className="font-black text-slate-800 text-sm">Pro</h4>
          <p className="text-brand-600 font-black text-sm my-1">₹999<span className="text-[10px] text-slate-400 font-bold">/mo</span></p>
          <p className="text-[10px] font-bold text-slate-500">up to 15 user</p>
        </div>

        {/* Business Plan */}
        <div 
          onClick={() => setSelectedPlan('business')}
          className={`relative cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${selectedPlan === 'business' ? 'border-brand-500 bg-brand-50 shadow-md ring-4 ring-brand-500/10' : 'border-slate-100 hover:border-slate-200'}`}
        >
          <div className="absolute -top-2 right-2 bg-brand-600 text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">Recommended</div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${selectedPlan === 'business' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
            <Crown size={14} />
          </div>
          <h4 className="font-black text-slate-800 text-sm">Business</h4>
          <p className="text-brand-600 font-black text-sm my-1">₹2,999<span className="text-[10px] text-slate-400 font-bold">/mo</span></p>
          <p className="text-[10px] font-bold text-slate-500">Unlimited everything</p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button 
          onClick={() => onSelectPlan(selectedPlan === 'pro' ? { name: 'Pro plan', price: 999 } : { name: 'Business plan', price: 2999 })}
          className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-brand-500/30 transition-all text-sm"
        >
          <Rocket size={16} /> Upgrade to {selectedPlan === 'pro' ? 'Pro' : 'Business'} - ₹ {selectedPlan === 'pro' ? '999' : '2,999'}/mo
        </button>
        <button 
          onClick={onCancel}
          className="w-full py-3 bg-white hover:bg-slate-50 border border-brand-200 text-brand-600 rounded-xl font-bold transition-all text-sm"
        >
          Maybe later
        </button>
      </div>

    </div>
  );
}
