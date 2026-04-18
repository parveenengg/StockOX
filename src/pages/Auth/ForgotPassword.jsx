import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { forgotPassword } from '../../services/auth.service';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await forgotPassword(email);
      navigate('/set-new-password', { state: { email } });
    } catch (err) {
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Reset Your Password</h2>
        <p className="text-slate-500 font-medium mt-4">Enter the email you used to sign up. We will send an OTP.</p>
      </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-lg text-sm font-medium">{error}</div>}
          
          <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-brand-100 focus:border-brand-600 outline-none font-medium text-slate-900 transition-all bg-white"
              placeholder="admin@stockox.com"
              required
            />
          </div>
        </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg shadow-brand-500/20 text-lg font-bold text-white bg-brand-600 hover:bg-brand-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Reset OTP'}
          </button>
        </form>

      <div className="mt-8 text-center">
        <Link to="/sign-in" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
