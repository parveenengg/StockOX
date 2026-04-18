import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp, resendOtp } from '../../services/auth.service';

export default function OTPVerify() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'user@example.com';

  const handleChange = (e, index) => {
    let val = e.target.value;
    if (isNaN(val)) return false;
    
    if (val.length > 1) {
      val = val.charAt(val.length - 1);
    }
    
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    setError(''); 
    
    if (val && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.some(isNaN)) return;
    
    const newOtp = [...otp];
    pastedData.forEach((char, index) => {
      newOtp[index] = char;
    });
    setOtp(newOtp);
    setError('');
    
    if (pastedData.length > 0) {
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const extractedOtp = otp.join('');
    
    if (extractedOtp.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setError('');
    setResendMessage('');
    try {
      await verifyOtp(email, extractedOtp);
      // Data persistence clear if successful
      sessionStorage.clear();
      // Redirect successfully to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Verification failed. Try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setResending(true);
    setError('');
    setResendMessage('');
    try {
      await resendOtp(email);
      setResendMessage('OTP has been resent to your email.');
    } catch (err) {
      setError(err.message || 'Failed to resend OTP.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto text-center">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Verify Your Email</h2>
      <p className="text-slate-500 font-medium mb-8">
        We sent a six-digit code to <strong>{email}</strong>
      </p>

      <form onSubmit={handleVerify}>
        <div className="flex justify-between mb-4 gap-2">
          {otp.map((data, index) => (
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              className={`w-12 h-16 sm:w-14 sm:h-16 border-[3px] rounded-xl text-center text-2xl font-bold bg-white outline-none transition-all duration-200 
                ${error ? 'border-rose-500 text-rose-500 focus:shadow-[0_0_0_4px_rgba(244,63,94,0.1)]' : data ? 'border-brand-600 text-brand-600 focus:border-brand-600 focus:shadow-[0_0_0_4px_rgba(45,59,255,0.1)]' : 'border-slate-200 text-slate-900 focus:border-brand-600 focus:shadow-[0_0_0_4px_rgba(45,59,255,0.1)]'} 
              `}
              type="text"
              name="otp"
              key={index}
              value={data}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        
        {error && <p className="text-rose-500 font-bold text-sm mb-4">{error}</p>}
        {resendMessage && <p className="text-brand-600 font-bold text-sm mb-4">{resendMessage}</p>}
        
        {!error && (
          <p className="text-sm font-bold text-slate-400 mb-8">
            Code expires in <span className="text-slate-700">09:50</span>
          </p>
        )}

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg shadow-brand-500/20 text-lg font-bold text-white bg-brand-600 hover:bg-brand-700 transition"
        >
          {isVerifying ? 'Verifying...' : 'Verify and Continue'}
        </button>
      </form>
      
      <div className="mt-8 space-y-4">
        <p className="text-center font-medium text-slate-600">
          Didn't get the code?{' '}
          <button 
            type="button" 
            onClick={handleResendOtp}
            disabled={resending}
            className="font-bold text-brand-600 hover:text-brand-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {resending ? 'Resending...' : 'Resend OTP'}
          </button>
        </p>
        <p className="text-center font-medium text-slate-600">
          Wrong email?{' '}
          <button onClick={() => navigate(-1)} className="font-bold text-brand-600 hover:text-brand-700 transition">
            Go back and change
          </button>
        </p>
      </div>
    </div>
  );
}
