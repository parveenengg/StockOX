import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { resetPassword } from '../../services/auth.service';

export default function SetNewPassword() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'user@email.com';

  const getPasswordStrength = () => {
    if (!password) return 0;
    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 4;
    if (password.length > 6 && /[0-9]/.test(password)) return 3;
    if (password.length > 4) return 2;
    return 1;
  };

  const strength = getPasswordStrength();
  const strengthLabels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong Password'];
  const strengthColors = ['bg-slate-200', 'bg-rose-500', 'bg-amber-400', 'bg-emerald-400', 'bg-emerald-600'];

  const handleOtpChange = (e, index) => {
    let val = e.target.value;
    if (isNaN(val)) return false;
    if (val.length > 1) val = val.charAt(val.length - 1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 5) inputRefs.current[index + 1].focus();
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
    pastedData.forEach((char, index) => { newOtp[index] = char; });
    setOtp(newOtp);
    if (pastedData.length > 0) inputRefs.current[Math.min(pastedData.length, 5)].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const extractedOtp = otp.join('');
    if (extractedOtp.length < 6) {
      setError("Please enter all 6 digits of the OTP.");
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      await resetPassword(email, extractedOtp, password, confirmPassword);
      sessionStorage.clear();
      navigate('/sign-in');
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto">
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3 mb-8 text-emerald-700 font-bold text-sm shadow-sm">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        OTP sent to {email}
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Set a New Password</h2>
        <p className="text-slate-500 font-medium mt-4">Enter the OTP from your email and choose a new password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-lg text-sm font-medium">{error}</div>}
        
        <div>
          <div className="flex justify-between mb-2 gap-2">
            {otp.map((data, index) => (
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                className={`w-12 h-16 sm:w-14 sm:h-16 border-[3px] rounded-xl text-center text-2xl font-bold bg-white outline-none transition-all duration-200 
                  ${data ? 'border-brand-600 text-brand-600' : 'border-slate-200 text-slate-900'} 
                  focus:border-brand-600 focus:shadow-[0_0_0_4px_rgba(45,59,255,0.1)]`}
                type="text"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                required={index === 0}
              />
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <label className="block text-sm font-bold text-slate-700 mb-2 mt-4">New Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-12 pr-12 py-3 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-brand-100 focus:border-brand-600 outline-none font-medium text-slate-900 transition-all bg-white"
              placeholder="••••••••"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 transition">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {/* Password Strength */}
          {password.length > 0 && (
            <div className="mt-3">
              <div className="flex gap-2 h-1.5 mb-2">
                {[1, 2, 3, 4].map((level) => (
                  <div key={level} className={`flex-1 rounded-full transition-colors duration-300 ${strength >= level ? strengthColors[strength] : 'bg-slate-100'}`} />
                ))}
              </div>
              <p className={`text-xs font-bold transition-colors ${strength >= 3 ? 'text-emerald-600' : 'text-slate-500'}`}>
                {strengthLabels[strength]}
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full pl-12 pr-12 py-3 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-brand-100 focus:border-brand-600 outline-none font-medium text-slate-900 transition-all bg-white"
              placeholder="••••••••"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-slate-400 hover:text-slate-600 transition">
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-4 px-4 mt-8 rounded-xl shadow-lg shadow-brand-500/20 text-lg font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100 transition-all border border-transparent disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save New Password'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm font-bold">
        <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-900 transition">
          Back
        </button>
      </div>
    </div>
  );
}
