import { useState } from 'react';
import { Search, Plus, Filter, Edit2, Trash2, ShoppingCart, ExternalLink, Download, X } from 'lucide-react';
import { mockOrders } from '../../mock/orders.mock.js';
import { appCurrencies } from '../../mock/settings.mock.js';

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const [ordersList, setOrdersList] = useState(mockOrders);
  
  const savedCurrencyCode = localStorage.getItem('appCurrency') || 'USD';
  const currencySymbol = appCurrencies.find(c => c.code === savedCurrencyCode)?.symbol || '$';
  const formatCurrency = (amount) => `${currencySymbol}${amount?.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) || '0.00'}`;
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  
  const [newOrder, setNewOrder] = useState({ id: '', customerSupplier: '', amount: '', status: 'Pending', type: 'Sales', date: '' });

  const handleDeleteOrder = (id) => {
    setOrdersList(ordersList.filter(o => o.id !== id));
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setNewOrder({ 
      id: order.id, 
      customerSupplier: order.customerSupplier || order.customer, 
      amount: order.amount, 
      status: order.status, 
      type: order.type,
      date: order.date
    });
    setModalOpen(true);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setViewModalOpen(true);
  };

  const handleSaveOrder = () => {
    if (!newOrder.customerSupplier || !newOrder.amount) return;
    
    if (editingOrder) {
      const updatedList = ordersList.map(o => 
        o.id === editingOrder.id ? { 
          ...o, 
          customerSupplier: newOrder.customerSupplier,
          amount: parseFloat(newOrder.amount),
          status: newOrder.status,
          type: newOrder.type
        } : o
      );
      setOrdersList(updatedList);
    } else {
      const prefix = newOrder.type === 'Sales' ? 'ORD' : 'PO';
      const orderToAdd = {
        id: `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString(),
        customerSupplier: newOrder.customerSupplier,
        amount: parseFloat(newOrder.amount),
        status: newOrder.status,
        type: newOrder.type,
        items: []
      };
      setOrdersList([orderToAdd, ...ordersList]);
    }
    setModalOpen(false);
    setEditingOrder(null);
    setNewOrder({ id: '', customerSupplier: '', amount: '', status: 'Pending', type: 'Sales', date: '' });
  };

  const filteredOrders = ordersList.filter(o => {
    const custName = o.customerSupplier || o.customer || '';
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || custName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || o.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Orders</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Manage sales and purchase orders.</p>
        </div>
        <button 
          onClick={() => {
            setEditingOrder(null);
            setNewOrder({ id: '', customerSupplier: '', amount: '', status: 'Pending', type: 'Sales', date: '' });
            setModalOpen(true);
          }} 
          className="bg-brand-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-500/20 flex items-center gap-2"
        >
          <Plus size={18} strokeWidth={2.5} /> Create Order
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer..."
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Sales">Sales</option>
              <option value="Purchase">Purchase</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[20px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-black">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer/Supplier</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-bold text-slate-900 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <ShoppingCart size={16} className="text-brand-500" /> {order.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm font-medium">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-slate-800 text-sm font-bold">{order.customerSupplier || order.customer}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded border ${order.type === 'Outgoing' || order.type === 'Sales' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-purple-50 text-purple-600 border-purple-100'}`}>
                      {order.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-slate-800">{formatCurrency(order.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border
                      ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                        order.status === 'Processing' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                        order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                        'bg-slate-100 text-slate-600 border-slate-200'}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleViewOrder(order)} className="p-1.5 text-brand-600 hover:bg-brand-50 rounded transition" title="View Details">
                        <ExternalLink size={16} />
                      </button>
                      <button onClick={() => handleEditOrder(order)} className="p-1.5 text-brand-600 hover:bg-brand-50 rounded transition" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteOrder(order.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded transition" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500 font-medium">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          <div className="bg-white rounded-[24px] shadow-2xl border border-slate-100 w-full max-w-lg relative z-10 p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{editingOrder ? 'Edit Order' : 'Create New Order'}</h2>
            <div className="space-y-4 mb-8">
              <select 
                value={newOrder.type}
                onChange={e => setNewOrder({...newOrder, type: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium text-slate-600"
              >
                <option value="Outgoing">Sales Order (Outgoing)</option>
                <option value="Incoming">Purchase Order (Incoming)</option>
              </select>
              <input 
                type="text" 
                placeholder="Customer or Supplier Name"
                value={newOrder.customerSupplier}
                onChange={e => setNewOrder({...newOrder, customerSupplier: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium" 
              />
              <input 
                type="number" 
                placeholder="Total Amount (e.g. 1500.00)" 
                value={newOrder.amount}
                onChange={e => setNewOrder({...newOrder, amount: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium" 
              />
              <select 
                value={newOrder.status}
                onChange={e => setNewOrder({...newOrder, status: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium text-slate-600"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setModalOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition">Cancel</button>
              <button onClick={handleSaveOrder} className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition">
                {editingOrder ? 'Update Order' : 'Save Order'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Detailed Order Invoice Modal */}
      {viewModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setViewModalOpen(false)}></div>
          <div className="bg-white rounded-[24px] shadow-2xl border border-slate-100 w-full max-w-3xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-slate-50 p-6 sm:p-8 border-b border-slate-200 shrink-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-extrabold text-slate-900">{selectedOrder.id}</h2>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${selectedOrder.status === 'Completed' || selectedOrder.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-500">{new Date(selectedOrder.date).toLocaleString()} • {selectedOrder.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold transition">
                    <Download size={16} /> <span className="hidden sm:inline">Export PDF</span>
                  </button>
                  <button onClick={() => setViewModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition">
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Customer / Supplier</p>
                <p className="text-lg font-black text-slate-900">{selectedOrder.customerSupplier || selectedOrder.customer}</p>
              </div>

              {selectedOrder.notes && (
                <div className="mb-8">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Order Notes</p>
                  <p className="text-sm font-medium text-slate-700">{selectedOrder.notes}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-black text-slate-900 mb-4">Line Items</h3>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 font-bold text-slate-600">Product</th>
                          <th className="px-4 py-3 font-bold text-slate-600 text-right">Qty</th>
                          <th className="px-4 py-3 font-bold text-slate-600 text-right">Unit Price</th>
                          <th className="px-4 py-3 font-bold text-slate-600 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedOrder.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-4 font-medium text-slate-900">
                              <span className="block text-xs text-brand-600 font-bold mb-0.5">{item.productId}</span>
                              {item.name}
                            </td>
                            <td className="px-4 py-4 font-medium text-slate-600 text-right">{item.quantity}</td>
                            <td className="px-4 py-4 font-medium text-slate-600 text-right">{formatCurrency(item.unitPrice)}</td>
                            <td className="px-4 py-4 font-black text-slate-900 text-right">{formatCurrency(item.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-slate-50">
                        <tr>
                          <td colSpan="3" className="px-4 py-4 text-right font-bold text-slate-500 uppercase text-xs">Total Amount</td>
                          <td className="px-4 py-4 text-right font-black text-emerald-600 text-lg">{formatCurrency(selectedOrder.amount)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <p className="text-sm font-medium text-slate-500">No line items specified.</p>
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
