import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Truck, Mail, Phone, MapPin, Star, Edit2, Trash2, X, ExternalLink } from 'lucide-react';
import { mockSuppliers } from '../../mock/suppliers.mock.js';
import { appCurrencies } from '../../mock/settings.mock.js';

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [suppliersList, setSuppliersList] = useState(mockSuppliers);

  const savedCurrencyCode = localStorage.getItem('appCurrency') || 'USD';
  const currencySymbol = appCurrencies.find(c => c.code === savedCurrencyCode)?.symbol || '$';
  const formatCurrency = (amount) => `${currencySymbol}${amount?.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) || '0.00'}`;

  const [isModalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const [newSupplier, setNewSupplier] = useState({ id: '', name: '', email: '', phone: '', location: '', status: 'Active', gstin: '', notes: '' });

  const handleDeleteSupplier = (id) => {
    setSuppliersList(suppliersList.filter(s => s.id !== id));
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setNewSupplier({ ...supplier });
    setModalOpen(true);
  };

  const handleViewSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setViewModalOpen(true);
  };

  const handleSaveSupplier = () => {
    if (!newSupplier.name || !newSupplier.email) return;
    
    if (editingSupplier) {
      const updatedList = suppliersList.map(s => 
        s.id === editingSupplier.id ? { ...s, ...newSupplier } : s
      );
      setSuppliersList(updatedList);
    } else {
      const supplierToAdd = {
        ...newSupplier,
        id: `SUP-00${Math.floor(10 + Math.random() * 90)}`,
        performanceScore: 100,
        totalPurchases: 0,
        suppliedProducts: []
      };
      setSuppliersList([supplierToAdd, ...suppliersList]);
    }

    setModalOpen(false);
    setEditingSupplier(null);
    setNewSupplier({ id: '', name: '', email: '', phone: '', location: '', status: 'Active', gstin: '', notes: '' });
  };

  const filteredSuppliers = suppliersList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Suppliers</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Manage your vendor relationships and contacts.</p>
        </div>
        <button 
          onClick={() => {
            setEditingSupplier(null);
            setNewSupplier({ id: '', name: '', email: '', phone: '', location: '', status: 'Active', gstin: '', notes: '' });
            setModalOpen(true);
          }} 
          className="bg-brand-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-500/20 flex items-center gap-2"
        >
          <Plus size={18} strokeWidth={2.5} /> Add Supplier
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by supplier or contact name..."
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.length > 0 ? filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow group relative">
            
            <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEditSupplier(supplier)} className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition" title="Edit">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDeleteSupplier(supplier.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1 pr-6">{supplier.name}</h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                  supplier.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {supplier.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <UserAvatar name={supplier.name} />
                <span className="font-medium text-slate-700">{supplier.gstin || 'No GSTIN'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Mail size={16} className="text-slate-400 shrink-0" />
                <a href={`mailto:${supplier.email}`} className="truncate hover:text-brand-600 transition">{supplier.email}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Phone size={16} className="text-slate-400 shrink-0" />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <MapPin size={16} className="text-slate-400 shrink-0" />
                <span className="truncate">{supplier.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-amber-500">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold text-slate-700">{supplier.performanceScore ? (supplier.performanceScore / 20).toFixed(1) : '5.0'}</span>
              </div>
              <button onClick={() => handleViewSupplier(supplier)} className="text-sm font-bold text-brand-600 hover:text-brand-700 transition flex items-center gap-1">
                View Details <ExternalLink size={14} />
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-200 border-dashed">
            No suppliers found matching your criteria.
          </div>
        )}
      </div>

      {/* Add / Edit Supplier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          <div className="bg-white rounded-[24px] shadow-2xl border border-slate-100 w-full max-w-lg relative z-10 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}</h2>
            <div className="space-y-4 mb-8">
              <input 
                type="text" 
                placeholder="Company Name" 
                value={newSupplier.name}
                onChange={e => setNewSupplier({...newSupplier, name: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium" 
              />
              <div className="flex gap-4">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={newSupplier.email}
                  onChange={e => setNewSupplier({...newSupplier, email: e.target.value})}
                  className="w-1/2 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium" 
                />
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  value={newSupplier.phone}
                  onChange={e => setNewSupplier({...newSupplier, phone: e.target.value})}
                  className="w-1/2 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium" 
                />
              </div>
              <input 
                type="text" 
                placeholder="Location (City, Country)" 
                value={newSupplier.location}
                onChange={e => setNewSupplier({...newSupplier, location: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium" 
              />
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="GSTIN / Tax ID" 
                  value={newSupplier.gstin}
                  onChange={e => setNewSupplier({...newSupplier, gstin: e.target.value})}
                  className="w-1/2 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium" 
                />
                <select 
                  value={newSupplier.status}
                  onChange={e => setNewSupplier({...newSupplier, status: e.target.value})}
                  className="w-1/2 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium text-slate-600"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <textarea 
                placeholder="Notes about supplier..." 
                value={newSupplier.notes}
                onChange={e => setNewSupplier({...newSupplier, notes: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium min-h-[100px]" 
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setModalOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition">Cancel</button>
              <button onClick={handleSaveSupplier} className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition">
                {editingSupplier ? 'Update Supplier' : 'Save Supplier'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Detailed Supplier Modal */}
      {viewModalOpen && selectedSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setViewModalOpen(false)}></div>
          <div className="bg-white rounded-[24px] shadow-2xl border border-slate-100 w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-slate-50 p-6 sm:p-8 border-b border-slate-200 shrink-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm border border-indigo-200">
                    <Truck size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">{selectedSupplier.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${selectedSupplier.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                        {selectedSupplier.status}
                      </span>
                      <span className="text-sm font-medium text-slate-500">ID: {selectedSupplier.id}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setViewModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider">Contact Info</h3>
                  <div className="space-y-3 text-sm font-medium">
                    <div className="flex items-center gap-3 text-slate-700"><Mail size={16} className="text-slate-400" /> {selectedSupplier.email}</div>
                    <div className="flex items-center gap-3 text-slate-700"><Phone size={16} className="text-slate-400" /> {selectedSupplier.phone}</div>
                    <div className="flex items-center gap-3 text-slate-700"><MapPin size={16} className="text-slate-400" /> {selectedSupplier.location}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider">Business Details</h3>
                  <div className="space-y-3 text-sm font-medium">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <span className="text-slate-500">GSTIN</span>
                      <span className="font-bold text-slate-900">{selectedSupplier.gstin || 'Not Provided'}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <span className="text-slate-500">Performance Score</span>
                      <span className="font-bold text-emerald-600">{selectedSupplier.performanceScore || 'N/A'}/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Total Purchases</span>
                      <span className="font-bold text-slate-900">{formatCurrency(selectedSupplier.totalPurchases || 0)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedSupplier.notes && (
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-3 uppercase tracking-wider">Supplier Notes</h3>
                  <div className="bg-amber-50 text-amber-900 p-4 rounded-xl border border-amber-100 text-sm font-medium">
                    {selectedSupplier.notes}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider">Linked Products</h3>
                {selectedSupplier.suppliedProducts && selectedSupplier.suppliedProducts.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.suppliedProducts.map((prod, idx) => (
                      <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                        {prod}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-medium text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">No products linked to this supplier yet.</p>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple helper component for avatars
function UserAvatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
  return (
    <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-[10px] font-black shrink-0">
      {initials}
    </div>
  );
}
