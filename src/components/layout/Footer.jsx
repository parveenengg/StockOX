import logo from '../../assets/logo.jpeg';
import { Apple, Play } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
          <div className="col-span-1 md:col-span-2 md:border-r border-slate-100 md:pr-8">
            <div className="flex items-center gap-4 mb-6">
              <img src={logo} alt="StockOX" className="w-12 h-12 object-contain rounded-xl" />
              <span className="text-2xl font-bold tracking-tight text-slate-900">StockOX</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Eliminate stockouts and automate your warehouse in minutes with intelligent supply chain visibility.
            </p>
            
            {/* App Store Downloads (Placeholder) */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button disabled className="flex items-center justify-center gap-3 bg-slate-900 text-white px-4 py-2.5 rounded-xl opacity-90 cursor-not-allowed group relative">
                <Apple size={24} />
                <div className="text-left">
                  <p className="text-[10px] leading-tight text-slate-300">Download on the</p>
                  <p className="text-sm font-bold leading-tight">App Store</p>
                </div>
                <div className="absolute -top-3 -right-3 bg-brand-50 border border-brand-200 text-brand-600 text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full uppercase">
                  Coming Soon
                </div>
              </button>
              
              <button disabled className="flex items-center justify-center gap-3 bg-slate-900 text-white px-4 py-2.5 rounded-xl opacity-90 cursor-not-allowed group relative">
                <Play size={24} fill="currentColor" />
                <div className="text-left">
                  <p className="text-[10px] leading-tight text-slate-300">GET IT ON</p>
                  <p className="text-sm font-bold leading-tight">Google Play</p>
                </div>
                <div className="absolute -top-3 -right-3 bg-brand-50 border border-brand-200 text-brand-600 text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full uppercase">
                  Coming Soon
                </div>
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6 pb-2">Product</h3>
            <ul className="space-y-4 text-sm text-slate-600 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition">Interactive Demo</a></li>
              <li><a href="#features" className="hover:text-brand-600 transition">Features</a></li>
              <li><a href="#pricing" className="hover:text-brand-600 transition">Pricing Plans</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6 pb-2">Business</h3>
            <ul className="space-y-4 text-sm text-slate-600 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition">About the Team</a></li>
              <li><a href="#" className="hover:text-brand-600 transition">Customer Success</a></li>
              <li><a href="#" className="hover:text-brand-600 transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6 pb-2">Legal</h3>
            <ul className="space-y-4 text-sm text-slate-600 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition">Data Security (SOC2)</a></li>
              <li><a href="#" className="hover:text-brand-600 transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-100 text-center text-sm font-medium text-slate-400">
          © {new Date().getFullYear()} StockOX. Built for the modern supply chain.
        </div>
      </div>
    </footer>
  );
}
