import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Menu, Search, Bell, User, LogOut, Package } from 'lucide-react';

export default function TopNavbar({ onMenuClick, onDesktopMenuToggle, isDesktopCollapsed }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Boilerplate outside click handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  const notifications = [
    { id: 1, text: 'Low stock alert: MacBook Pro M2', time: '5m ago', read: false },
    { id: 2, text: 'New order #ORD-8940 received', time: '12m ago', read: false },
    { id: 3, text: 'Supplier shipment delayed', time: '1h ago', read: true },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Mobile menu wrapper */}
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Collapse Toggle */}
        <button 
          onClick={onDesktopMenuToggle}
          className="hidden lg:block p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden sm:flex relative md:w-[350px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search across modules..." 
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 relative">
        
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full relative transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white focus:outline-none"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 animate-fade-in origin-top-right overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <span className="font-bold text-slate-800">Notifications</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notif => (
                  <div key={notif.id} className={`px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 ${!notif.read ? 'bg-brand-50/20' : ''}`}>
                    <p className="text-sm font-medium text-slate-800">{notif.text}</p>
                    <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
        
        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:bg-slate-100"
          >
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold overflow-hidden shadow-sm">
              <User size={16} />
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block pr-2">Admin</span>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 animate-fade-in origin-top-right overflow-hidden z-50 py-2">
              <Link to="/dashboard/profile" onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-sm font-medium text-slate-700 transition">
                <User size={16} className="text-slate-400" /> My Profile
              </Link>
              <Link to="/dashboard/settings" onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-sm font-medium text-slate-700 transition">
                <Package size={16} className="text-slate-400" /> Account Settings
              </Link>
              <div className="h-px bg-slate-100 my-2"></div>
              <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-rose-50 text-sm font-bold text-rose-600 transition">
                <LogOut size={16} /> Log out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
