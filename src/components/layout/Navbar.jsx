import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/logo.jpeg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const userEmail = sessionStorage.getItem('userEmail');
  const userName = sessionStorage.getItem('userName');
  const isLoggedIn = !!userEmail;

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative flex justify-between items-center h-[72px]">
          
          {/* LEFT: Branding */}
          <div className="flex-shrink-0 flex items-center md:w-1/4 z-20">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logo} alt="StockOX Logo" className="w-9 h-9 object-contain rounded-xl group-hover:scale-105 transition-transform" />
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">StockOX</span>
            </Link>
          </div>

          {/* CENTER: Navigation (True Center) */}
          <div className="hidden md:flex absolute inset-0 justify-center items-center pointer-events-none w-full">
            <div className="pointer-events-auto flex items-center gap-8 bg-slate-50/50 backdrop-blur-sm px-6 py-2 rounded-full border border-slate-100/50 shadow-sm shadow-slate-200/20">
              <Link to="/features" className="text-[14px] font-bold text-slate-600 hover:text-brand-600 tracking-wide transition-colors">Features</Link>
              <Link to="/pricing" className="text-[14px] font-bold text-slate-600 hover:text-brand-600 tracking-wide transition-colors">Pricing</Link>
              <Link to="/blogs" className="text-[14px] font-bold text-slate-600 hover:text-brand-600 tracking-wide transition-colors">Blogs</Link>
              <Link to="/join" className="text-[14px] font-bold text-slate-600 hover:text-brand-600 tracking-wide transition-colors">Join Us</Link>
              {isLoggedIn && (
                <Link to="/dashboard" className="text-[14px] font-bold text-brand-600 hover:text-brand-700 tracking-wide transition-colors">Dashboard</Link>
              )}
            </div>
          </div>

          {/* RIGHT: CTAs */}
          <div className="hidden md:flex items-center justify-end gap-5 md:w-1/4 z-20">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold shadow-md">
                  {userName ? userName.charAt(0).toUpperCase() : userEmail.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-bold text-slate-900 leading-tight">
                    {userName || 'Demo User'}
                  </p>
                  <p className="text-xs font-medium text-slate-500 truncate w-32 leading-tight">
                    {userEmail}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <Link to="/sign-in" className="text-[15px] font-bold text-brand-600 hover:text-brand-700 transition tracking-wide">Sign In</Link>
                <Link to="/register" className="bg-brand-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-brand-500/25 hover:bg-brand-700 hover:-translate-y-[1px] transition-all text-[14px] tracking-wide">
                  Create Account
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center z-20">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-brand-600 p-2 bg-slate-50 rounded-lg">
              <Menu size={24} />
            </button>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu Box */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl absolute top-full left-0 w-full border-b border-brand-100 shadow-2xl animate-fade-in">
          <div className="px-6 py-8 flex flex-col items-center gap-5">
            <Link to="/features" onClick={() => setIsOpen(false)} className="text-xl font-bold text-slate-700 hover:text-brand-600 tracking-wide">Features</Link>
            <Link to="/pricing" onClick={() => setIsOpen(false)} className="text-xl font-bold text-slate-700 hover:text-brand-600 tracking-wide">Pricing</Link>
            <Link to="/blogs" onClick={() => setIsOpen(false)} className="text-xl font-bold text-slate-700 hover:text-brand-600 tracking-wide">Blogs</Link>
            {isLoggedIn && (
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-xl font-bold text-brand-600 tracking-wide">Dashboard</Link>
            )}
            <div className="w-12 h-[2px] bg-slate-100 my-2 rounded-full"></div>
            {isLoggedIn ? (
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl w-full max-w-xs">
                <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {userName ? userName.charAt(0).toUpperCase() : userEmail.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-base font-bold text-slate-900 leading-tight">
                    {userName || 'Demo User'}
                  </p>
                  <p className="text-sm font-medium text-slate-500 truncate w-32 leading-tight">
                    {userEmail}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <Link to="/sign-in" onClick={() => setIsOpen(false)} className="text-xl font-bold text-brand-600 tracking-wide">Sign In</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full max-w-xs mt-2 text-center bg-brand-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-xl shadow-brand-500/25">
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
