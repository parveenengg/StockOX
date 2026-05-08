import { Download, TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Reports() {
  const userEmail = sessionStorage.getItem('userEmail');
  const isDemoUser = userEmail === 'demo@gmail.com';

  const summaryMetrics = isDemoUser ? [
    { title: 'Total Revenue', value: '₹1,245,000', change: '+14%', isPositive: true, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Orders Completed', value: '1,842', change: '+5%', isPositive: true, icon: ShoppingCart, color: 'text-brand-600', bg: 'bg-brand-50' },
    { title: 'Active Customers', value: '428', change: '-2%', isPositive: false, icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Low Stock Items', value: '24', change: '+12', isPositive: false, icon: Package, color: 'text-rose-600', bg: 'bg-rose-50' },
  ] : [
    { title: 'Total Revenue', value: '₹0', change: '0%', isPositive: true, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Orders Completed', value: '0', change: '0%', isPositive: true, icon: ShoppingCart, color: 'text-brand-600', bg: 'bg-brand-50' },
    { title: 'Active Customers', value: '0', change: '0%', isPositive: true, icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Low Stock Items', value: '0', change: '0', isPositive: true, icon: Package, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const topProducts = isDemoUser ? [
    { name: 'MacBook Pro M2', sales: 124, rev: '₹2,480,000' },
    { name: 'iPhone 15 Pro', sales: 98, rev: '₹1,274,000' },
    { name: 'AirPods Pro', sales: 256, rev: '₹640,000' },
    { name: 'iPad Air', sales: 84, rev: '₹504,000' },
    { name: 'Apple Watch S9', sales: 112, rev: '₹448,000' }
  ] : [];

  const handleExportPDF = () => {
    if (!isDemoUser) {
      alert("No data available to export.");
      return;
    }
    
    const doc = new jsPDF();
    
    // Header & Professional Margins
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text('StockOX Inventory & Sales Report', 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Summary Metrics Section
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Key Performance Metrics', 14, 45);
    
    const metricsData = summaryMetrics.map(m => [m.title, m.value, m.change]);
    autoTable(doc, {
      startY: 50,
      head: [['Metric', 'Current Value', 'Period Change']],
      body: metricsData,
      theme: 'grid',
      headStyles: { fillColor: [45, 59, 255] }, // matches brand-600
      margin: { left: 14, right: 14 }
    });

    // Top Products Section
    const finalY = doc.lastAutoTable.finalY || 50;
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Top Selling Products', 14, finalY + 15);

    const productsData = topProducts.map((p, i) => [i + 1, p.name, p.sales.toString(), p.rev]);
    autoTable(doc, {
      startY: finalY + 20,
      head: [['Rank', 'Product Name', 'Units Sold', 'Total Revenue']],
      body: productsData,
      theme: 'striped',
      headStyles: { fillColor: [45, 59, 255] },
      margin: { left: 14, right: 14 }
    });

    doc.save('stockox_professional_report.pdf');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Key metrics and performance of your inventory.</p>
        </div>
        <button 
          onClick={handleExportPDF}
          className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm flex items-center gap-2"
        >
          <Download size={18} strokeWidth={2.5} /> Export PDF
        </button>
      </div>

      {/* High level metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-brand-200 transition-colors">
            <div className={`absolute top-0 right-0 w-24 h-24 ${metric.bg} rounded-bl-full -mr-8 -mt-8 opacity-50 transition-transform group-hover:scale-110`}></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${metric.bg} ${metric.color}`}>
                  <metric.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${metric.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {metric.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {metric.change}
                </div>
              </div>
              <p className="text-sm font-bold text-slate-500 mb-1">{metric.title}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{metric.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Placeholder for Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
            <select className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-lg px-3 py-1.5 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 bg-slate-50/50 rounded-xl border border-slate-100 border-dashed flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
                <TrendingUp size={32} />
              </div>
              <p className="text-slate-500 font-bold">Chart Integration Pending</p>
              <p className="text-slate-400 text-sm mt-1">Connect backend to visualize revenue data.</p>
            </div>
          </div>
        </div>

        {/* Top Products List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Top Selling Products</h3>
          <div className="space-y-4 flex-1">
            {topProducts.length > 0 ? topProducts.map((prod, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{prod.name}</p>
                    <p className="text-xs font-medium text-slate-500">{prod.sales} units sold</p>
                  </div>
                </div>
                <div className="font-black text-emerald-600 text-sm">
                  {prod.rev}
                </div>
              </div>
            )) : (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <Package size={40} className="text-slate-200 mb-3" />
                <p className="text-sm font-medium text-slate-500">No product sales data yet.</p>
              </div>
            )}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-bold text-brand-600 bg-brand-50 rounded-xl hover:bg-brand-100 transition">
            View All Products
          </button>
        </div>
      </div>

    </div>
  );
}
