import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/logo.jpeg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto">
      <div className="text-center mb-12">
        <img src={logo} alt="StockOX" className="w-[64px] h-[64px] object-contain rounded-2xl mx-auto mb-6 shadow-sm border border-slate-100" />
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
        <p className="text-slate-500 mt-4 text-lg font-medium">Enter your credentials to access your account.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
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
              className="block w-full pl-12 pr-4 py-4 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-brand-100 focus:border-brand-600 outline-none transition-all font-medium text-slate-900"
              placeholder="admin@stockox.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-12 pr-12 py-4 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-brand-100 focus:border-brand-600 outline-none transition-all font-medium text-slate-900"
              placeholder="••••••••"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 transition">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <input id="remember" type="checkbox" className="h-5 w-5 text-brand-600 focus:ring-brand-600 border-2 border-slate-200 rounded-md cursor-pointer" />
            <label htmlFor="remember" className="ml-3 block text-sm font-bold text-slate-600">
              Keep me signed in
            </label>
          </div>
          <Link to="/forgot-password" className="text-sm font-bold text-brand-600 hover:text-brand-700 transition">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-4 px-4 mt-8 rounded-xl shadow-lg shadow-brand-500/20 text-lg font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100 transition-all border border-transparent"
        >
          Sign In
        </button>
      </form>

      <div className="my-8 flex items-center">
        <div className="flex-1 border-t-2 border-slate-100"></div>
        <span className="px-4 text-sm font-bold text-slate-400">OR</span>
        <div className="flex-1 border-t-2 border-slate-100"></div>
      </div>

      <div className="text-center space-y-4">
        <Link to="/register" className="w-full flex justify-center py-4 px-4 rounded-xl border-2 border-slate-200 text-lg font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all">
          Create New Company Workspace
        </Link>
        <p className="text-slate-500 font-medium pt-2">
          New company customer?{' '}
          <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700 transition">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
