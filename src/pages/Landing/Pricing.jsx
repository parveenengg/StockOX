import { Link, useNavigate } from 'react-router-dom';
import { Check, X as XIcon } from 'lucide-react';

export default function Pricing() {
  const navigate = useNavigate();

  const handlePlanClick = () => {
    // Dynamic logic if token exists route to /payment, else /sign-in
    const token = sessionStorage.getItem('demo_token');
    if (token) {
      navigate('/payment');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <div className="bg-white font-sans flex flex-col">

      <section className="px-8 sm:px-16 lg:px-24 max-w-[1440px] mx-auto pt-32 pb-32 flex-1">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">3 PLANS — FREE, PRO, ENTERPRISE</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Scale your inventory seamlessly</h2>
          <p className="text-lg text-slate-500 font-medium">No hidden fees, no complicated tiers. Just pure infrastructure.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 max-w-6xl mx-auto items-center">
          
          {/* Starter Tier */}
          <div className="p-8 md:p-10 bg-white border border-slate-200 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-sm h-full flex flex-col hover:border-slate-300 transition-colors">
            <div className="inline-block bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full w-max mb-6">
              Free
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-extrabold text-slate-900">₹0</span>
              <span className="text-slate-500 font-medium mb-1">/ forever</span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-8 border-b border-slate-100 pb-8">
              Chhote business ke liye
            </p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                {text: '1 company workspace', inc: true},
                {text: 'Up to 3 users', inc: true},
                {text: 'Up to 500 products', inc: true},
                {text: '1 warehouse', inc: true},
                {text: 'Basic stock tracking', inc: true},
                {text: 'Purchase + sales orders', inc: true},
                {text: 'Email OTP auth', inc: true},
                {text: 'CSV export (basic)', inc: true},
                {text: 'Advanced reports', inc: false},
                {text: 'AI forecasting', inc: false},
                {text: 'Multi-warehouse', inc: false},
                {text: 'PDF / Excel export', inc: false},
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.inc ? 'bg-emerald-100/50 text-emerald-500' : 'bg-rose-50 text-rose-300'}`}>
                    {f.inc ? <Check size={12} strokeWidth={3} /> : <XIcon size={12} strokeWidth={3} />}
                  </div>
                  <span className={!f.inc ? 'text-slate-400' : ''}>{f.text}</span>
                </li>
              ))}
            </ul>
            <button onClick={handlePlanClick} className="w-full text-center bg-slate-100 text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-200 transition">
              Select Plan
            </button>
          </div>

          {/* Pro Tier */}
          <div className="p-8 md:p-12 bg-white border-2 border-brand-600 rounded-3xl shadow-2xl relative z-10 md:-mx-4 flex flex-col h-full md:scale-[1.02] bg-gradient-to-b from-white to-brand-50/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-100 text-brand-700 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              Most popular
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 mt-2">Pro</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-5xl font-extrabold text-slate-900 tracking-tight">₹999</span>
              <span className="text-slate-500 font-medium mb-1">/ month</span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-8 border-b border-brand-100 pb-8">
              Growing businesses ke liye
            </p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                {text: '1 company workspace', inc: true},
                {text: 'Up to 15 users', inc: true},
                {text: 'Unlimited products', inc: true},
                {text: 'Up to 5 warehouses', inc: true},
                {text: 'Advanced stock tracking', inc: true},
                {text: 'PDF + Excel + CSV export', inc: true},
                {text: 'Low stock email alerts', inc: true},
                {text: 'Sales + purchase analytics', inc: true},
                {text: 'Batch + expiry tracking', inc: true},
                {text: 'Audit logs', inc: true},
                {text: 'AI forecasting', inc: false},
                {text: 'API access', inc: false},
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-800">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.inc ? 'bg-brand-100/80 text-brand-600' : 'bg-rose-50 text-rose-300'}`}>
                    {f.inc ? <Check size={12} strokeWidth={3} /> : <XIcon size={12} strokeWidth={3} />}
                  </div>
                  <span className={!f.inc ? 'text-slate-400' : ''}>{f.text}</span>
                </li>
              ))}
            </ul>
            <button onClick={handlePlanClick} className="w-full text-center bg-brand-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/25 hover:bg-brand-700 transition">
              Select Plan
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="p-8 md:p-10 bg-white border border-slate-200 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none shadow-sm h-full flex flex-col hover:border-slate-300 transition-colors">
            <div className="inline-block bg-amber-50 text-amber-700 font-bold text-xs px-3 py-1 rounded-full w-max mb-6">
              Enterprise
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Business</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">₹2,999</span>
              <span className="text-slate-500 font-medium mb-1">/ month</span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-8 border-b border-slate-100 pb-8">
              Badi companies ke liye
            </p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                {text: '1 company workspace', inc: true},
                {text: 'Unlimited users', inc: true},
                {text: 'Unlimited products', inc: true},
                {text: 'Unlimited warehouses', inc: true},
                {text: 'Everything in Pro', inc: true},
                {text: 'AI stock forecasting', inc: true},
                {text: 'Auto replenishment alerts', inc: true},
                {text: 'REST API access', inc: true},
                {text: 'Barcode / QR scanning', inc: true},
                {text: 'WhatsApp alerts', inc: true},
                {text: 'Priority support', inc: true},
                {text: 'Custom branding', inc: true},
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-amber-100/50 text-amber-600">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
            <button onClick={handlePlanClick} className="w-full text-center bg-slate-100 text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-200 transition">
              Select Plan
            </button>
          </div>
          
        </div>
      </section>
    </div>
  );
}
