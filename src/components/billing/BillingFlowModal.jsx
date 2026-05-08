import { useState } from 'react';
import UpgradeModal from './UpgradeModal';
import PaymentSummary from './PaymentSummary';
import PaymentSuccess from './PaymentSuccess';

export default function BillingFlowModal({ isOpen, onClose, onUpgradeSuccess }) {
  // states: 'upgrade', 'summary', 'success'
  const [flowState, setFlowState] = useState('upgrade');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  if (!isOpen) return null;

  const handleSelectPlan = (planDetails) => {
    setSelectedPlan(planDetails);
    setFlowState('summary');
  };

  const handlePay = (amount) => {
    // In a real app, this is where we would trigger Razorpay
    // For now, we simulate a successful payment after a small delay
    setTimeout(() => {
      setTransactionId(`Pay_${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
      setFlowState('success');
      if (onUpgradeSuccess) onUpgradeSuccess();
    }, 1500);
  };

  const handleClose = () => {
    setFlowState('upgrade');
    setSelectedPlan(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      {flowState === 'upgrade' && (
        <UpgradeModal onSelectPlan={handleSelectPlan} onCancel={handleClose} />
      )}

      {flowState === 'summary' && selectedPlan && (
        <PaymentSummary 
          planDetails={selectedPlan} 
          onPay={handlePay} 
          onCancel={handleClose} 
        />
      )}

      {flowState === 'success' && selectedPlan && (
        <PaymentSuccess 
          planDetails={selectedPlan} 
          transactionId={transactionId}
          onContinue={handleClose} 
        />
      )}
    </div>
  );
}
