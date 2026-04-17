import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopNavbar from '../components/layout/TopNavbar';

export default function DashboardLayout() {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Start expanded by default on larger screens
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  // Auto-close mobile sidebar when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        setMobileOpen={setMobileSidebarOpen}
        isDesktopCollapsed={isDesktopCollapsed}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300">
        <TopNavbar 
          onMenuClick={() => setMobileSidebarOpen(true)} 
          onDesktopMenuToggle={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
          isDesktopCollapsed={isDesktopCollapsed}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
