import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Truck, LogOut, Settings, BarChart2, Users } from 'lucide-react';
import clsx from 'clsx';
import logo from '../../assets/logo.jpeg'; 

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', path: '/dashboard/products', icon: Package },
  { name: 'Orders', path: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Suppliers', path: '/dashboard/suppliers', icon: Truck },
  { name: 'Reports', path: '/dashboard/reports', icon: BarChart2 },
  { name: 'Customers', path: '/dashboard/customers', icon: Users },
];

export default function Sidebar({ isMobileOpen, setMobileOpen, isDesktopCollapsed }) {
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Architecture */}
      <div className={clsx(
        "fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transform transition-all duration-300 ease-in-out lg:static flex flex-col",
        // Desktop handling
        isDesktopCollapsed ? "lg:w-20" : "lg:w-[260px]",
        // Mobile handling
        isMobileOpen ? "translate-x-0 w-[260px]" : "-translate-x-full lg:translate-x-0 w-[260px]"
      )}>
        <div className={clsx(
          "h-16 flex items-center border-b border-slate-200 transition-all", 
          isDesktopCollapsed ? "justify-center px-0" : "px-6"
        )}>
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src={logo} alt="StockOX" className="w-[32px] h-[32px] object-contain rounded-lg flex-shrink-0 border border-slate-100 shadow-sm" />
            {!isDesktopCollapsed && <span className="text-xl font-bold text-slate-900 tracking-tight animate-fade-in block">StockOX</span>}
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/dashboard');
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                title={isDesktopCollapsed ? item.name : undefined}
                className={clsx(
                  "flex items-center rounded-xl font-medium transition-all duration-200 group relative",
                  isDesktopCollapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
                  isActive 
                    ? "bg-brand-50 text-brand-700 font-bold" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon size={20} className={isActive ? "text-brand-600" : "text-slate-400 group-hover:text-slate-600"} strokeWidth={isActive ? 2.5 : 2} />
                {!isDesktopCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </div>

        <div className="p-3 border-t border-slate-200 space-y-1.5 bg-slate-50/50">
          <Link 
             to="/dashboard/settings" 
             title={isDesktopCollapsed ? 'Settings' : undefined}
             className={clsx(
               "flex items-center rounded-xl font-medium transition-all group",
               isDesktopCollapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5 text-slate-600 hover:bg-white hover:shadow-sm"
             )}>
            <Settings size={20} className="text-slate-400 group-hover:text-slate-600" />
            {!isDesktopCollapsed && <span>Settings</span>}
          </Link>
          <button 
             onClick={handleLogout}
             title={isDesktopCollapsed ? 'Log out' : undefined}
             className={clsx(
               "w-full flex items-center rounded-xl font-medium transition-all text-rose-600",
               isDesktopCollapsed ? "justify-center p-3 hover:bg-rose-50" : "gap-3 px-3 py-2.5 hover:bg-white hover:text-rose-700 hover:shadow-sm"
             )}>
            <LogOut size={20} className="text-rose-500" />
            {!isDesktopCollapsed && <span>Log out</span>}
          </button>
        </div>
      </div>
    </>
  );
}
