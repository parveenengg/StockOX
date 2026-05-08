import { Lock } from 'lucide-react';

export default function PaymentSummary({ planDetails, onPay, onCancel }) {
  const gstRate = 0.18;
  const gstAmount = (planDetails.price * gstRate).toFixed(2);
  const totalAmount = (planDetails.price + parseFloat(gstAmount)).toFixed(2);

  return (
    <div className="bg-white p-8 animate-fade-in w-full max-w-lg mx-auto shadow-2xl rounded-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Complete payment</h2>
        <p className="text-slate-600 font-medium mt-1">{planDetails.name} - ₹{planDetails.price.toLocaleString()}/month - Billed monthly</p>
      </div>

      <div className="bg-[#FFF8EE] p-6 mb-6">
        <div className="flex justify-between items-center mb-4 text-slate-800 font-medium">
          <span>{planDetails.name} (monthly)</span>
          <span className="font-bold">₹{planDetails.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-slate-500 font-medium">
          <span>GST (18%)</span>
          <span>₹{gstAmount}</span>
        </div>
        <div className="h-px w-full bg-slate-200 mb-4"></div>
        <div className="flex justify-between items-center text-slate-900 font-black text-lg">
          <span>Total</span>
          <span className="text-brand-600">₹{totalAmount}</span>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={() => onPay(totalAmount)}
          className="w-full py-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 rounded-xl font-bold flex justify-center items-center gap-2 shadow-sm transition-all text-sm"
        >
          {/* We'll use a text representation if logo is missing, but ideally an image */}
          <span className="text-brand-600 font-black italic mr-1 flex items-center">
             <div className="w-3 h-4 bg-brand-600 transform skew-x-[-15deg] mr-1"></div>
             Pay
          </span> 
          ₹{totalAmount} via Razorpay
        </button>
        
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
           <Lock size={12} /> Secured by Razorpay - <button onClick={onCancel} className="hover:text-slate-800 underline transition ml-1">Cancel anytime</button>
        </div>
      </div>
    </div>
  );
}
