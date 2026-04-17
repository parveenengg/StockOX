import { Link, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/set-new-password'); // Route to next step
  };

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Reset Your Password</h2>
        <p className="text-slate-500 font-medium mt-4">Enter the email you used to sign up. We will send an OTP.</p>
      </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="email"
              className="block w-full pl-12 pr-4 py-4 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-brand-100 focus:border-brand-600 outline-none font-medium text-slate-900 transition-all bg-white"
              placeholder="admin@stockox.com"
              required
            />
          </div>
        </div>

          <button
            type="submit"
          className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg shadow-brand-500/20 text-lg font-bold text-white bg-brand-600 hover:bg-brand-700 transition"
          >
          Send Reset OTP
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
