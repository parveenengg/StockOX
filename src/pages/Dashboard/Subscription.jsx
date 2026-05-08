import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CreditCard, Check, Zap, ArrowUpCircle, Package, Users, Home } from 'lucide-react';
import BillingFlowModal from '../../components/billing/BillingFlowModal';

export default function Subscription() {
  const location = useLocation();
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  
  // Simulated data for now
  const [subscriptionData, setSubscriptionData] = useState({
    planName: 'Starter Free',
    status: 'Active',
    validUntil: 'Forever',
    price: '₹0 / month',
    usage: {
      products: { used: 450, limit: 500 },
      users: { used: 3, limit: 3 },
      warehouses: { used: 1, limit: 1 },
    },
    features: [
      '1 company workspace',
      'Up to 3 users',
      'Up to 500 products',
      '1 warehouse',
      'Basic stock tracking',
      'Purchase + sales orders',
      'Email OTP auth'
    ]
  });

  // Check if we arrived here with an intent to upgrade (from Landing Page pricing)
  useEffect(() => {
    if (location.state?.intent === 'upgrade') {
      setIsBillingModalOpen(true);
      // Clear the state so it doesn't reopen if the user refreshes
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const renderProgressBar = (label, used, limit, Icon) => {
    const percentage = Math.min(100, Math.round((used / limit) * 100));
    const isNearingLimit = percentage >= 80;
    const isAtLimit = percentage >= 100;

    return (
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-4">
        <div className="flex justify-between items-end mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isAtLimit ? 'bg-rose-50 text-rose-600' : isNearingLimit ? 'bg-amber-50 text-amber-600' : 'bg-brand-50 text-brand-600'}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{label}</p>
              <p className="text-xs font-medium text-slate-500">{used} of {limit} used</p>
            </div>
          </div>
          <span className={`text-sm font-black ${isAtLimit ? 'text-rose-600' : isNearingLimit ? 'text-amber-600' : 'text-slate-800'}`}>
            {percentage}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${isAtLimit ? 'bg-rose-500' : isNearingLimit ? 'bg-amber-500' : 'bg-brand-500'}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        {isAtLimit && (
          <p className="text-xs font-bold text-rose-500 mt-3 flex items-center gap-1">
            <Zap size={12} fill="currentColor" /> Limit reached. Please upgrade to add more.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto font-sans pb-12">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <CreditCard className="text-brand-600" size={28} /> Subscription & Billing
        </h1>
        <p className="text-slate-500 font-medium mt-1">Manage your plan, check usage limits, and unlock more features.</p>
      </div>

      {/* Current Plan Overview */}
      <div className="bg-white border border-brand-200 rounded-[24px] p-8 mb-8 shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div>
            <div className="inline-block bg-brand-50 border border-brand-100 text-brand-700 font-bold text-xs px-3 py-1 rounded-full mb-4">
              Current Plan
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">{subscriptionData.planName}</h2>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-emerald-600 font-bold">{subscriptionData.status}</span>
              </span>
              <span>•</span>
              <span>Valid: <span className="font-bold text-slate-700">{subscriptionData.validUntil}</span></span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl md:w-64 text-center md:text-left">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Monthly cost</p>
            <p className="text-2xl font-black text-slate-900 mb-4">{subscriptionData.price}</p>
            <button 
              onClick={() => setIsBillingModalOpen(true)}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg shadow-brand-500/20 text-sm"
            >
              <ArrowUpCircle size={18} /> Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Usage Section */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Usage & Limits</h3>
          
          {renderProgressBar('Products', subscriptionData.usage.products.used, subscriptionData.usage.products.limit, Package)}
          {renderProgressBar('Users', subscriptionData.usage.users.used, subscriptionData.usage.users.limit, Users)}
          {renderProgressBar('Warehouses', subscriptionData.usage.warehouses.used, subscriptionData.usage.warehouses.limit, Home)}

          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mt-6">
             <h4 className="font-bold text-brand-900 mb-1 flex items-center gap-2">
               <Zap size={16} className="text-brand-600 fill-brand-600" /> Need more capacity?
             </h4>
             <p className="text-sm text-brand-700 font-medium mb-4">Upgrade to the Pro or Business plan to get unlimited products and more users.</p>
             <button 
                onClick={() => setIsBillingModalOpen(true)}
                className="text-sm font-bold text-brand-700 bg-white px-4 py-2 rounded-lg border border-brand-200 hover:bg-brand-100 transition shadow-sm"
             >
               View upgrade options
             </button>
          </div>
        </div>

        {/* Privileges Section */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Plan Privileges</h3>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <ul className="space-y-4">
              {subscriptionData.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-emerald-100 text-emerald-600 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Billing Flow Modal */}
      <BillingFlowModal 
        isOpen={isBillingModalOpen} 
        onClose={() => setIsBillingModalOpen(false)} 
        onUpgradeSuccess={() => {
          // Simulate an update to the current plan
          setSubscriptionData({
            ...subscriptionData,
            planName: 'Pro Plan',
            price: '₹999 / month',
            validUntil: 'Jun 6, 2026',
            usage: {
              ...subscriptionData.usage,
              products: { used: 450, limit: 'Unlimited' },
              users: { used: 3, limit: 15 },
              warehouses: { used: 1, limit: 5 },
            },
            features: [
              '1 company workspace',
              'Up to 15 users',
              'Unlimited products',
              'Up to 5 warehouses',
              'Advanced stock tracking',
              'PDF + Excel + CSV export',
              'Low stock email alerts'
            ]
          });
        }}
      />

    </div>
  );
}
