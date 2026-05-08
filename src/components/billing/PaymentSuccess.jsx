import { Check, ArrowRight } from 'lucide-react';

export default function PaymentSuccess({ planDetails, transactionId, onContinue }) {
  const amountPaid = (planDetails.price * 1.18).toFixed(2);
  // Calculate next renewal date (1 month from now)
  const nextRenewalDate = new Date();
  nextRenewalDate.setMonth(nextRenewalDate.getMonth() + 1);
  const formattedDate = nextRenewalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-white p-10 animate-slide-up w-full max-w-lg mx-auto shadow-2xl rounded-sm text-center">
      
      {/* Confetti / Success Icon area */}
      <div className="relative w-32 h-32 mx-auto mb-6 flex justify-center items-center">
        {/* Abstract confetti pieces */}
        <div className="absolute top-0 right-4 w-2 h-2 bg-yellow-400 rounded-sm transform rotate-45"></div>
        <div className="absolute top-4 left-4 w-2 h-2 bg-red-500 rounded-full"></div>
        <div className="absolute bottom-6 left-0 w-2 h-2 bg-blue-500 rounded-sm transform -rotate-12"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-400 rounded-full"></div>
        <div className="absolute top-8 right-0 w-2 h-2 bg-purple-500 rounded-sm"></div>

        <div className="w-24 h-24 bg-[#34A853] rounded-full flex justify-center items-center shadow-lg shadow-green-500/30 animate-scale-in">
          <Check size={48} className="text-white" strokeWidth={3} />
        </div>
      </div>

      <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Payment successful!</h2>
      <p className="text-slate-600 font-medium mb-8 text-sm px-4">Your workspace is now on the {planDetails.name}. All features are unlocked.</p>

      {/* Receipt Box */}
      <div className="bg-[#FFF8EE] p-5 rounded-lg mb-8 text-left">
        <div className="grid grid-cols-2 gap-y-4 text-xs font-bold">
          <div className="text-slate-600">Plan activated</div>
          <div className="text-right text-[#C68D37]">{planDetails.name}</div>
          
          <div className="text-slate-600">Amount paid</div>
          <div className="text-right text-slate-900 font-black">₹{amountPaid}</div>
          
          <div className="text-slate-600">Next renewal</div>
          <div className="text-right text-slate-900">{formattedDate}</div>
          
          <div className="text-slate-600">Transaction ID</div>
          <div className="text-right text-slate-500 font-medium truncate">{transactionId || 'Pay_QX9K2nm'}</div>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={onContinue}
          className="w-full py-3 bg-[#34A853] hover:bg-green-600 text-white rounded-lg font-bold flex justify-center items-center shadow-lg shadow-green-500/20 transition-all text-sm"
        >
          Continue to Products
        </button>
        <p className="text-[10px] font-medium text-slate-400">Receipt sent to admin@stockox.com</p>
      </div>

    </div>
  );
}
