import { Box, Package, ShoppingCart, Truck, Bell, BarChart2, Shield, Search, Zap, Smartphone, Users, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { name: 'Real-Time Inventory Tracking', icon: Box, text: 'Instantly tracking global warehouse stocks dynamically across unified ledgers.' },
  { name: 'Product Management', icon: Package, text: 'Full lifecycle control allowing deep custom classifications and pricing matrices.' },
  { name: 'Order Management', icon: ShoppingCart, text: 'Robust ingestion handling B2B/B2C fulfillment lines securely.' },
  { name: 'Supplier Management', icon: Truck, text: 'Digital vendor tracking, predicting shipping delays via AI workflows.' },
  { name: 'Low Stock Alerts', icon: Bell, text: 'Automatic predictive email and UI warnings triggering before blackouts.' },
  { name: 'Dashboard Analytics', icon: BarChart2, text: 'Instant top-level charts mapping out high revenue margins dynamically.' },
  { name: 'Team Roles', icon: Shield, text: 'Multi-layer RBAC systems allowing admin over employee granular restrictions.' },
  { name: 'Reports & Insights', icon: Zap, text: 'Raw intelligence exports rendering 90-day profit vectors.' },
  { name: 'Search & Filters', icon: Search, text: 'Instantaneous dataset filtering capable of churning 10k items sub-second.' },
  { name: 'Subscription Ready', icon: Filter, text: 'Natively handles B2B tier groupings out of the box.' },
  { name: 'Mobile Friendly', icon: Smartphone, text: 'Full PWA readiness tracking data on standard modern browsers securely.' },
  { name: 'Secure Access', icon: Users, text: 'SOC2 hardened endpoints ensuring extreme reliability across data structures.' }
];

export default function Features() {
  return (
    <div className="bg-slate-50 font-sans flex flex-col">
      
      {/* Hero */}
      <section className="px-8 pt-32 pb-24 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">Designed for velocity</h1>
        <p className="text-xl text-slate-500 font-medium">Enterprise grade architecture wrapped in a consumer-friendly shell. Meet the ultimate backend for modern commerce.</p>
      </section>

      {/* Grid */}
      <section className="px-8 sm:px-16 lg:px-24 mb-32 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map(feat => {
            const Icon = feat.icon;
            return (
              <div key={feat.name} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-brand-300 hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 transition">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{feat.name}</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{feat.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why StockOX */}
      <section className="bg-white py-32 px-8 border-y border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-8">Why StockOX?</h2>
          <p className="text-lg font-medium text-slate-500 mb-12">
            Supply chains are messy. Spreadsheets fail. Traditional ERPs are brutally slow. StockOX combines the heavy data architecture of an enterprise system with the buttery smooth UI of modern SaaS.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-brand-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-700 shadow-xl shadow-brand-500/20 transition">
            Create your workspace
          </Link>
        </div>
      </section>
    </div>
  );
}
