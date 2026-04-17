import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Package } from 'lucide-react';

const mockProducts = [
  { id: 'PRD-101', name: 'MacBook Pro M2 14"', price: '$1,999', category: 'Electronics', stock: 45, status: 'In Stock' },
  { id: 'PRD-102', name: 'Logitech MX Master 3', price: '$99', category: 'Accessories', stock: 12, status: 'Low Stock' },
  { id: 'PRD-103', name: 'Herman Miller Chair', price: '$1,299', category: 'Furniture', stock: 0, status: 'Out of Stock' },
  { id: 'PRD-104', name: 'Sony WH-1000XM5', price: '$348', category: 'Accessories', stock: 120, status: 'In Stock' },
  { id: 'PRD-105', name: 'Dell UltraSharp 27"', price: '$650', category: 'Electronics', stock: 8, status: 'Low Stock' }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setModalOpen] = useState(false);

  // Simple filtering engine
  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Strategy */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Products</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Manage your active inventory and stock pricing.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-brand-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-500/20 flex items-center gap-2"
        >
          <Plus size={18} strokeWidth={2.5} /> Add Product
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by SKU or Name..."
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
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Primary Table layout */}
      <div className="bg-white border border-slate-200 rounded-[20px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-black">
                <th className="px-6 py-4">SKU / ID</th>
                <th className="px-6 py-4">Product Outline</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-bold text-slate-600 text-sm whitespace-nowrap">{product.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600">
                        <Package size={18} />
                      </div>
                      <span className="font-bold text-slate-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm font-medium">{product.category}</td>
                  <td className="px-6 py-4 font-black text-slate-800">{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border
                      ${product.status === 'In Stock' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                        product.status === 'Low Stock' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                        'bg-rose-50 text-rose-700 border-rose-100'}`}
                    >
                      {product.status} ({product.stock})
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500 font-medium">
                    No products found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pseudo Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          <div className="bg-white rounded-[24px] shadow-2xl border border-slate-100 w-full max-w-lg relative z-10 p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Add New Product</h2>
            <div className="space-y-4 mb-8">
              <input type="text" placeholder="Product Name" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium" />
              <input type="text" placeholder="Price (USD)" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium" />
              <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-100 outline-none font-medium text-slate-600">
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Accessories</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setModalOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition">Cancel</button>
              <button onClick={() => setModalOpen(false)} className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
