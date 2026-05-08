import { useState } from 'react';
import { Search, Plus, Filter, Users, Mail, Phone, ExternalLink, X, ShoppingBag, MapPin, Edit2, Trash2 } from 'lucide-react';
import { mockCustomers } from '../../mock/customers.mock.js';
import { appCurrencies } from '../../mock/settings.mock.js';

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const userEmail = sessionStorage.getItem('userEmail');
  const isDemoUser = userEmail === 'demo@gmail.com';
  const [customersList, setCustomersList] = useState(isDemoUser ? mockCustomers : []);

  const savedCurrencyCode = localStorage.getItem('appCurrency') || 'USD';
  const currencySymbol = appCurrencies.find(c => c.code === savedCurrencyCode)?.symbol || '$';
  const formatCurrency = (amount) => `${currencySymbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const [isModalOpen, setModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ id: '', name: '', email: '', phone: '', status: 'Active', company: '', address: '' });

  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleDeleteCustomer = (id) => {
    setCustomersList(customersList.filter(c => c.id !== id));
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setNewCustomer({ ...customer });
    setModalOpen(true);
  };

  const handleSaveCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) return;

    if (editingCustomer) {
      const updatedList = customersList.map(c => 
        c.id === editingCustomer.id ? { ...c, ...newCustomer } : c
      );
      setCustomersList(updatedList);
    } else {
      const customerToAdd = {
        ...newCustomer,
        id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
        totalOrders: 0,
        lifetimeValue: 0,
        lastActive: 'Just now',
        notes: '',
        purchaseHistory: []
      };
      setCustomersList([customerToAdd, ...customersList]);
    }

    setModalOpen(false);
    setEditingCustomer(null);
    setNewCustomer({ id: '', name: '', email: '', phone: '', status: 'Active', company: '', address: '' });
  };

  const filteredCustomers = customersList.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customers</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Manage your customer database and purchase history.</p>
        </div>
        <button 
          onClick={() => {
            setEditingCustomer(null);
            setNewCustomer({ id: '', name: '', email: '', phone: '', status: 'Active', company: '', address: '' });
            setModalOpen(true);
          }} 
          className="bg-brand-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-500/20 flex items-center gap-2"
        >
          <Plus size={18} strokeWidth={2.5} /> Add Customer
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-600 transition"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 shrink-0">
            <Filter size={16} className="text-slate-400" />
            <select
              className="bg-transparent text-sm font-bold text-slate-700 outline-none w-28"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="VIP">VIP</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[20px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-black">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Total Orders</th>
                <th className="px-6 py-4">Lifetime Value</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-black shrink-0 border border-brand-100">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{customer.name}</p>
                        <p className="text-xs font-medium text-slate-500">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} className="text-slate-400" />
                        <span className="truncate max-w-[150px] block">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={14} className="text-slate-400" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-800 text-sm font-bold">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 font-black text-emerald-600">
                    {formatCurrency(customer.lifetimeValue)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border
                      ${customer.status === 'VIP' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        customer.status === 'Active' ? 'bg-brand-50 text-brand-700 border-brand-100' :
                          'bg-slate-100 text-slate-600 border-slate-200'}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">
                    {customer.lastActive}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => { setSelectedCustomer(customer); setCustomerModalOpen(true); }}
                        className="p-1.5 text-brand-600 hover:bg-brand-50 rounded transition"
                        title="View Profile"
                      >
                        <ExternalLink size={16} />
                      </button>
                      <button onClick={() => handleEditCustomer(customer)} className="p-1.5 text-brand-600 hover:bg-brand-50 rounded transition" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteCustomer(customer.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded transition" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500 font-medium bg-slate-50/50">
                    <div className="flex flex-col items-center justify-center">
                      <Users size={48} className="text-slate-300 mb-4" />
                      <p>No customers found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          <div className="bg-white rounded-[24px] shadow-2xl border border-slate-100 w-full max-w-lg relative z-10 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h2>
            <div className="space-y-4 mb-8">
              <input
                type="text"
                placeholder="Full Name"
                value={newCustomer.name}
                onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium"
              />
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newCustomer.email}
                  onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-1/2 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={newCustomer.phone}
                  onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-1/2 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium"
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={newCustomer.company}
                  onChange={e => setNewCustomer({ ...newCustomer, company: e.target.value })}
                  className="w-1/2 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium"
                />
                <select 
                  value={newCustomer.status}
                  onChange={e => setNewCustomer({ ...newCustomer, status: e.target.value })}
                  className="w-1/2 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium text-slate-600"
                >
                  <option value="Active">Active</option>
                  <option value="VIP">VIP</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Address"
                value={newCustomer.address}
                onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setModalOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition">Cancel</button>
              <button onClick={handleSaveCustomer} className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition">
                {editingCustomer ? 'Update Customer' : 'Save Customer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Customer Details Modal */}
      {customerModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setCustomerModalOpen(false)}></div>
          <div className="bg-white rounded-[24px] shadow-2xl border border-slate-100 w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="bg-slate-50 p-6 sm:p-8 border-b border-slate-200 shrink-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-2xl font-black shrink-0 border-2 border-brand-200 shadow-sm">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                      {selectedCustomer.name}
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${selectedCustomer.status === 'VIP' ? 'bg-amber-100 text-amber-700 border-amber-200' : selectedCustomer.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-200 text-slate-600 border-slate-300'}`}>
                        {selectedCustomer.status}
                      </span>
                    </h2>
                    <p className="text-sm font-medium text-slate-500 mt-1">{selectedCustomer.id} • {selectedCustomer.company || 'Individual'}</p>
                  </div>
                </div>
                <button onClick={() => setCustomerModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Contact Info */}
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <Mail size={16} className="text-slate-400" /> {selectedCustomer.email}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <Phone size={16} className="text-slate-400" /> {selectedCustomer.phone}
                    </div>
                    {selectedCustomer.address && (
                      <div className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                        <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" /> {selectedCustomer.address}
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Metrics */}
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Account Overview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                      <p className="text-xs font-bold text-brand-600 mb-1">Total Orders</p>
                      <p className="text-xl font-black text-slate-900">{selectedCustomer.totalOrders}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <p className="text-xs font-bold text-emerald-600 mb-1">Lifetime Value</p>
                      <p className="text-xl font-black text-slate-900">{formatCurrency(selectedCustomer.lifetimeValue)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedCustomer.notes && (
                <div className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                  <h3 className="text-xs font-black text-amber-600 uppercase tracking-wider mb-2">Customer Notes</h3>
                  <p className="text-sm font-medium text-amber-900">{selectedCustomer.notes}</p>
                </div>
              )}

              {/* Purchase History */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ShoppingBag size={14} /> Recent Purchase History
                </h3>
                {selectedCustomer.purchaseHistory?.length > 0 ? (
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 font-bold text-slate-600">Order ID</th>
                          <th className="px-4 py-3 font-bold text-slate-600">Date</th>
                          <th className="px-4 py-3 font-bold text-slate-600">Items</th>
                          <th className="px-4 py-3 font-bold text-slate-600 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedCustomer.purchaseHistory.map(order => (
                          <tr key={order.id} className="hover:bg-slate-50 transition">
                            <td className="px-4 py-3 font-medium text-brand-600">{order.id}</td>
                            <td className="px-4 py-3 font-medium text-slate-600">{order.date}</td>
                            <td className="px-4 py-3 font-medium text-slate-600">{order.items}</td>
                            <td className="px-4 py-3 font-black text-slate-900 text-right">{formatCurrency(order.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <p className="text-sm font-medium text-slate-500">No purchase history available.</p>
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
