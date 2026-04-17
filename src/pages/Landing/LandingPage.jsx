import { Link } from 'react-router-dom';
import { ArrowRight, Box, Shield, Zap, TrendingUp, Check, X as XIcon } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import QuickLauncher from '../../components/layout/QuickLauncher';

// Minimal chart data for the dashboard mockup
const mockChartData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 700 },
  { name: 'Sat', value: 650 },
  { name: 'Sun', value: 900 },
];

export default function LandingPage() {
  return (
    <div className="bg-white relative font-sans">
      <QuickLauncher />

      {/* Hero Section */}
      <section className="relative px-8 sm:px-16 lg:px-24 max-w-[1440px] mx-auto pt-28 md:pt-32 text-center md:text-left grid md:grid-cols-2 gap-16 items-center">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-50/50 via-white to-white pointer-events-none -z-10" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-600 font-medium text-sm mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            StockOX V2 is now heavily intelligent
          </div>

          <h1 className="text-5xl md:text-[64px] leading-tight font-extrabold text-slate-900 tracking-tight mb-8 animate-fade-in">
            Eliminate Stockouts.<br />
            <span className="text-brand-600">Automate Storage.</span>
          </h1>
          <p className="text-xl text-slate-500 mb-12 font-medium leading-relaxed">
            Unify your warehouses, forecast demand intelligently, and track your profit margin in real-time. Built specifically for modern e-commerce and retail leaders.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 relative z-10">
            <Link to="/register" className="bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2">
              Create Account <ArrowRight size={20} />
            </Link>
            <Link to="/sign-in" className="bg-white text-slate-700 border-2 border-slate-100 px-8 py-4 rounded-xl font-bold text-lg hover:border-brand-100 hover:bg-brand-50 transition-all flex items-center justify-center">
              Sign In
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6 text-sm font-bold text-slate-400">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-5 h-5 object-contain" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="w-6 h-6 object-contain translate-y-1" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="w-6 h-6 object-contain" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-4 h-4 object-contain mb-0.5" />
              </div>
            </div>
            <p>Trusted by 5,000+ modern teams</p>
          </div>
        </div>

        {/* Hero Visual - Realistic Dashboard Mockup */}
        <div className="relative z-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="w-full bg-white rounded-[32px] overflow-hidden shadow-2xl border border-brand-100 p-6 flex flex-col gap-6">

            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                  <Box className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Total Inventory</p>
                  <p className="text-xs font-medium text-slate-500">Across 4 warehouses</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-slate-900">42,891</p>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">+12.4%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-500 mb-1">Weekly Revenue</p>
                <p className="text-lg font-black text-slate-900 mb-4">$124,500</p>
                <div className="h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2d3bff" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#2d3bff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#2d3bff" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-500 mb-1">Low Stock Alerts</p>
                <p className="text-lg font-black text-rose-600 mb-4">12 Items</p>
                <div className="space-y-2">
                  {['MacBook Air', 'Logitech Mouse'].map(item => (
                    <div key={item} className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-700">{item}</span>
                      <span className="font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">Action Req</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-brand-50 p-4 rounded-2xl text-brand-600 text-sm font-bold">
              <Zap className="w-5 h-5" /> AI Prediction: Restock needed by Friday.
            </div>

          </div>

          <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-brand-100 hidden md:flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Revenue Gained</p>
              <p className="text-2xl font-black text-slate-900">+48.5%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Figma Based) */}
      <section id="pricing" className="px-8 sm:px-16 lg:px-24 max-w-[1440px] mx-auto py-24 border-t border-slate-100 mt-16">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">3 PLANS — FREE, PRO, ENTERPRISE</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Scale your inventory seamlessly</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 max-w-6xl mx-auto items-center">

          {/* Starter Tier */}
          <div className="p-8 md:p-10 bg-white border border-slate-200 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-sm h-full flex flex-col hover:border-slate-300 transition-colors">
            <div className="inline-block bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full w-max mb-6">
              Free
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-extrabold text-slate-900">₹0</span>
              <span className="text-slate-500 font-medium mb-1">/ forever</span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-8 border-b border-slate-100 pb-8">
              Chhote business ke liye
            </p>

            <ul className="space-y-4 mb-8 flex-1">
              {[
                { text: '1 company workspace', inc: true },
                { text: 'Up to 3 users', inc: true },
                { text: 'Up to 500 products', inc: true },
                { text: '1 warehouse', inc: true },
                { text: 'Basic stock tracking', inc: true },
                { text: 'Purchase + sales orders', inc: true },
                { text: 'Email OTP auth', inc: true },
                { text: 'CSV export (basic)', inc: true },
                { text: 'Advanced reports', inc: false },
                { text: 'AI forecasting', inc: false },
                { text: 'Multi-warehouse', inc: false },
                { text: 'PDF / Excel export', inc: false },
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.inc ? 'bg-emerald-100/50 text-emerald-500' : 'bg-rose-50 text-rose-300'}`}>
                    {f.inc ? <Check size={12} strokeWidth={3} /> : <XIcon size={12} strokeWidth={3} />}
                  </div>
                  <span className={!f.inc ? 'text-slate-400' : ''}>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Tier */}
          <div className="p-8 md:p-12 bg-white border-2 border-brand-600 rounded-3xl shadow-2xl relative z-10 md:-mx-4 flex flex-col h-full md:scale-[1.02] bg-gradient-to-b from-white to-brand-50/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-100 text-brand-700 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              Most popular
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 mt-2">Pro</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-5xl font-extrabold text-slate-900 tracking-tight">₹999</span>
              <span className="text-slate-500 font-medium mb-1">/ month</span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-8 border-b border-brand-100 pb-8">
              Growing businesses ke liye
            </p>

            <ul className="space-y-4 mb-8 flex-1">
              {[
                { text: '1 company workspace', inc: true },
                { text: 'Up to 15 users', inc: true },
                { text: 'Unlimited products', inc: true },
                { text: 'Up to 5 warehouses', inc: true },
                { text: 'Advanced stock tracking', inc: true },
                { text: 'PDF + Excel + CSV export', inc: true },
                { text: 'Low stock email alerts', inc: true },
                { text: 'Sales + purchase analytics', inc: true },
                { text: 'Batch + expiry tracking', inc: true },
                { text: 'Audit logs', inc: true },
                { text: 'AI forecasting', inc: false },
                { text: 'API access', inc: false },
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-800">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.inc ? 'bg-brand-100/80 text-brand-600' : 'bg-rose-50 text-rose-300'}`}>
                    {f.inc ? <Check size={12} strokeWidth={3} /> : <XIcon size={12} strokeWidth={3} />}
                  </div>
                  <span className={!f.inc ? 'text-slate-400' : ''}>{f.text}</span>
                </li>
              ))}
            </ul>
            <Link to="/sign-in" className="w-full text-center bg-brand-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/25 hover:bg-brand-700 transition">
              Select Plan
            </Link>
          </div>

          {/* Enterprise Tier */}
          <div className="p-8 md:p-10 bg-white border border-slate-200 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none shadow-sm h-full flex flex-col hover:border-slate-300 transition-colors">
            <div className="inline-block bg-amber-50 text-amber-700 font-bold text-xs px-3 py-1 rounded-full w-max mb-6">
              Enterprise
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Business</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">₹2,999</span>
              <span className="text-slate-500 font-medium mb-1">/ month</span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-8 border-b border-slate-100 pb-8">
              Badi companies ke liye
            </p>

            <ul className="space-y-4 mb-8 flex-1">
              {[
                { text: '1 company workspace', inc: true },
                { text: 'Unlimited users', inc: true },
                { text: 'Unlimited products', inc: true },
                { text: 'Unlimited warehouses', inc: true },
                { text: 'Everything in Pro', inc: true },
                { text: 'AI stock forecasting', inc: true },
                { text: 'Auto replenishment alerts', inc: true },
                { text: 'REST API access', inc: true },
                { text: 'Barcode / QR scanning', inc: true },
                { text: 'WhatsApp alerts', inc: true },
                { text: 'Priority support', inc: true },
                { text: 'Custom branding', inc: true },
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-amber-100/50 text-amber-600">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="px-8 sm:px-16 lg:px-24 max-w-[1440px] mx-auto py-16 bg-slate-50/50 border-y border-slate-100">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Designed for scale.<br />Built for speed.</h2>
          <p className="text-xl text-slate-500 font-medium">Overcome complex supply chains through a perfectly synced centralized dashboard. No more spreadsheets.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-12 bg-white rounded-[32px] shadow-sm border border-slate-200 hover:border-brand-100 transition-all group">
            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-8 group-hover:scale-110 transition">
              <Box size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Real-Time Visibility</h3>
            <p className="text-slate-500 leading-relaxed font-medium">Track your stock across multiple geographic locations. Keep your e-commerce and retail completely aligned.</p>
          </div>

          <div className="p-12 bg-brand-600 rounded-[32px] shadow-xl shadow-brand-600/20 relative overflow-hidden group">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">AI-Driven Insights</h3>
            <p className="text-brand-100 leading-relaxed font-medium">Predictive analytics auto-generate purchase orders and identify best-selling products before stockouts happen.</p>
          </div>

          <div className="p-12 bg-white rounded-[32px] shadow-sm border border-slate-200 hover:border-brand-100 transition-all group">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:scale-110 transition">
              <Shield size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">SOC2 Certified</h3>
            <p className="text-slate-500 leading-relaxed font-medium">Enterprise grade security, role-based access controls ranging from floor-level employees to C-suite executives.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="px-8 sm:px-16 lg:px-24 max-w-[1440px] mx-auto py-24 border-b border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Trusted by real teams.</h2>
          <p className="text-xl text-slate-500 font-medium">See how StockOX transformed their daily operations.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah Jenkins',
              role: 'Head of Operations, Acme Corp',
              text: 'StockOX completely saved us from our spreadsheet nightmare. We recovered dozens of hours weekly managing stock across our 3 warehouses.',
              rating: 5
            },
            {
              name: 'David Chen',
              role: 'Founder, RetailFlow',
              text: 'The AI forecasting is unbelievably accurate. We make vastly better decisions with our analytics now. Cannot imagine running without it.',
              rating: 5
            },
            {
              name: 'Elena Rodriguez',
              role: 'Supply Chain Manager, TrendSet',
              text: 'Incredibly easy for our growing team to adopt. The role-based permissions meant I could safely onboard floor staff without security worries.',
              rating: 5
            }
          ].map((testimonial) => (
            <div key={testimonial.name} className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <div className="flex gap-1 mb-6 text-amber-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-slate-700 font-medium leading-relaxed mb-8">"{testimonial.text}"</p>
              <div>
                <p className="text-slate-900 font-bold">{testimonial.name}</p>
                <p className="text-slate-500 text-sm font-medium">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action */}
      <section className="bg-white py-24 px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-brand-50 to-white p-10 md:p-20 rounded-[40px] shadow-sm border border-brand-100">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">Stop guessing.<br />Start knowing.</h2>
          <p className="text-slate-500 text-xl mb-12 max-w-2xl mx-auto font-medium">
            Join the elite circle of businesses transforming their supply chain. Deploy StockOX in less than 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-brand-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-brand-700 transition shadow-xl shadow-brand-600/30">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
