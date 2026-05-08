import { useState } from 'react';
import { ArrowUpRight, DollarSign, Package, ShoppingCart, TrendingUp, Plus, MapPin, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockChartData, emptyChartData, mockRecentActivity, mockWarehouses } from '../../mock/dashboard.mock.js';
import { appCurrencies } from '../../mock/settings.mock.js';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <div className="flex items-center gap-1 mt-2 text-sm font-medium text-emerald-600">
        <ArrowUpRight size={16} />
        <span>{change}</span>
      </div>
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={24} />
    </div>
  </div>
);

export default function DashboardOverview() {
  const userEmail = sessionStorage.getItem('userEmail');
  const isDemoUser = userEmail === 'demo@gmail.com';

  const savedCurrencyCode = localStorage.getItem('appCurrency') || 'USD';
  const currencySymbol = appCurrencies.find(c => c.code === savedCurrencyCode)?.symbol || '$';

  const [warehouses, setWarehouses] = useState(isDemoUser ? mockWarehouses : []);
  const [selectedWarehouse, setSelectedWarehouse] = useState('All');
  const [timeFilter, setTimeFilter] = useState('Last 7 Days');

  const [isModalOpen, setModalOpen] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({ name: '', location: '' });

  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Dynamic Data Logic
  const baseChartData = isDemoUser ? mockChartData[timeFilter] : emptyChartData;
  const warehouseMultiplier = selectedWarehouse === 'All' ? 1 : (selectedWarehouse === '1' ? 0.6 : 0.4);

  const chartData = baseChartData.map(d => ({
    ...d,
    revenue: Math.floor(d.revenue * warehouseMultiplier),
    profit: Math.floor(d.profit * warehouseMultiplier)
  }));

  const formatCurrency = (amount) => `${currencySymbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const totalRevenue = chartData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalProfit = chartData.reduce((acc, curr) => acc + curr.profit, 0);
  const totalOrders = Math.floor((isDemoUser ? 2341 : 0) * warehouseMultiplier);
  const lowStockItems = Math.floor((isDemoUser ? 12 : 0) * warehouseMultiplier);

  const filteredActivities = isDemoUser ? mockRecentActivity.filter(a => {
    if (selectedWarehouse === 'All') return true;
    const w = warehouses.find(w => w.id.toString() === selectedWarehouse);
    return a.details.warehouse === w?.name;
  }) : [];

  const handleAddWarehouse = () => {
    if (!newWarehouse.name) return;
    const warehouseToAdd = {
      id: warehouses.length + 1,
      name: newWarehouse.name,
      location: newWarehouse.location || 'Unspecified'
    };
    setWarehouses([...warehouses, warehouseToAdd]);
    setModalOpen(false);
    setNewWarehouse({ name: '', location: '' });
  };

  const handleGenerateReport = () => {
    if (!isDemoUser) {
      alert("No data available to generate report.");
      return;
    }

    const headers = ['Day', 'Revenue', 'Profit'];
    const csvContent = [
      headers.join(','),
      ...chartData.map(row => `${row.name},${row.revenue},${row.profit}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'dashboard_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in animate-duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm shrink-0">
            <MapPin size={16} className="text-brand-600" />
            <select
              className="bg-transparent text-sm font-bold text-slate-700 outline-none w-32"
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
            >
              <option value="All">All ({warehouses.length})</option>
              {warehouses.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-2 rounded-lg font-bold transition flex items-center gap-1 shrink-0"
          >
            <Plus size={18} /> <span className="hidden sm:inline">Add</span>
          </button>
          <button
            onClick={handleGenerateReport}
            className="bg-brand-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-brand-700 transition shadow-sm shrink-0"
          >
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} change={isDemoUser ? "+20.1% vs last month" : "0.0% vs last month"} icon={DollarSign} color="bg-emerald-100 text-emerald-600" />
        <StatCard title="Total Orders" value={totalOrders.toLocaleString()} change={isDemoUser ? "+15.0% vs last month" : "0.0% vs last month"} icon={ShoppingCart} color="bg-brand-100 text-brand-600" />
        <StatCard title="Total Profit" value={formatCurrency(totalProfit)} change={isDemoUser ? "+12.5% vs last month" : "0.0% vs last month"} icon={TrendingUp} color="bg-blue-100 text-blue-600" />
        <StatCard title="Low Stock Items" value={lowStockItems} change={isDemoUser ? "-2.4% vs last month" : "0.0% vs last month"} icon={Package} color="bg-rose-100 text-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Revenue & Profit Overview</h3>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-lg px-3 py-1.5 outline-none cursor-pointer"
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last Month">Last Month</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Last Year">Last Year</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {filteredActivities.length > 0 ? filteredActivities.map((activity) => (
              <div
                key={activity.id}
                onClick={() => {
                  setSelectedActivity(activity);
                  setActivityModalOpen(true);
                }}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-100 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                  <ShoppingCart size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.timestamp} • {activity.type}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <p className="text-sm font-medium text-slate-500">No recent activity.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Warehouse Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          <div className="bg-white rounded-[24px] shadow-2xl border border-slate-100 w-full max-w-sm relative z-10 p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Add Warehouse</h2>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Warehouse Name</label>
                <input
                  type="text"
                  placeholder="e.g. Downtown Hub"
                  value={newWarehouse.name}
                  onChange={e => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                <input
                  type="text"
                  placeholder="City, Region"
                  value={newWarehouse.location}
                  onChange={e => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition">Cancel</button>
              <button onClick={handleAddWarehouse} className="bg-brand-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-700 transition">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Activity Details Modal */}
      {activityModalOpen && selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setActivityModalOpen(false)}></div>
          <div className="bg-white rounded-[24px] shadow-2xl border border-slate-100 w-full max-w-md relative z-10 p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">{selectedActivity.title}</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">{selectedActivity.timestamp}</p>
              </div>
              <button onClick={() => setActivityModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Type</p>
                  <p className="text-sm font-medium text-slate-900">{selectedActivity.type}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Warehouse</p>
                  <p className="text-sm font-medium text-slate-900">{selectedActivity.details.warehouse}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Product</p>
                  <p className="text-sm font-medium text-slate-900">{selectedActivity.details.product}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Quantity</p>
                  <p className="text-sm font-medium text-slate-900">{selectedActivity.details.quantity}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">User / Actor</p>
                  <p className="text-sm font-medium text-slate-900">{selectedActivity.details.user}</p>
                </div>
                {selectedActivity.details.totalValue > 0 && (
                  <div className="col-span-2 mt-2 pt-4 border-t border-slate-200 flex justify-between items-center">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Value</p>
                    <p className="text-lg font-black text-emerald-600">{formatCurrency(selectedActivity.details.totalValue)}</p>
                  </div>
                )}
                {selectedActivity.details.notes && (
                  <div className="col-span-2 mt-2 pt-4 border-t border-slate-200">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Notes</p>
                    <p className="text-sm font-medium text-slate-700">{selectedActivity.details.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
