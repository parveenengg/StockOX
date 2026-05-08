import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, UploadCloud, Check } from 'lucide-react';
import { defaultCompanyData, appCurrencies } from '../../mock/settings.mock.js';
import Profile from './Profile';
import TeamMembers from './TeamMembers';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('company'); // profile, company, team
  const navigate = useNavigate();
  const [companyLogo, setCompanyLogo] = useState(null);
  const logoInputRef = useRef(null);

  // Company Profile State
  const [companyData, setCompanyData] = useState(defaultCompanyData);

  const renderTabs = () => (
    <div className="flex border-b border-slate-200 mb-8 w-full">
      <button 
        onClick={() => setActiveTab('profile')}
        className={`pb-4 px-4 mr-6 text-sm font-bold transition-all ${activeTab === 'profile' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
      >
        My profile
      </button>
      <button 
        onClick={() => setActiveTab('company')}
        className={`pb-4 px-4 mr-6 text-sm font-bold transition-all ${activeTab === 'company' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
      >
        Company profile
      </button>
      <button 
        onClick={() => setActiveTab('team')}
        className={`pb-4 px-4 text-sm font-bold transition-all ${activeTab === 'team' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
      >
        Team member
      </button>
    </div>
  );

  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto font-sans pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Account setting</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your profile, billing, and organizational data.</p>
      </div>

      {renderTabs()}

      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl">
          <Profile hideHeader={true} />
        </div>
      )}

      {activeTab === 'company' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Company logo</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">Appears on invoice and the workspace headers</p>
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={logoInputRef} 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setCompanyLogo(URL.createObjectURL(e.target.files[0]));
                }
              }} 
            />
            <div 
              onClick={() => logoInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer group relative overflow-hidden min-h-[160px]"
            >
              {companyLogo ? (
                <img src={companyLogo} alt="Company Logo" className="absolute inset-0 w-full h-full object-contain p-4" />
              ) : (
                <>
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-600 group-hover:border-brand-200 transition mb-4">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">Click to upload or drag & drop</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">PNG, JPG, SVG up to 2MB. Recommended 300x300px</p>
                </>
              )}
            </div>
            
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Company/Business name</label>
                <input 
                  type="text" 
                  value={companyData.businessName}
                  onChange={(e) => setCompanyData({...companyData, businessName: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                <input 
                  type="text" 
                  value={companyData.phone}
                  onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Website <span className="text-slate-400 font-normal text-xs ml-1 bg-slate-100 px-1.5 py-0.5 rounded">Optional</span></label>
                <input 
                  type="text" 
                  value={companyData.website}
                  onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Business address</label>
                <input 
                  type="text" 
                  value={companyData.address}
                  onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">City state</label>
                <input 
                  type="text" 
                  value={companyData.city}
                  onChange={(e) => setCompanyData({...companyData, city: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">State</label>
                <input 
                  type="text" 
                  value={companyData.state}
                  onChange={(e) => setCompanyData({...companyData, state: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">PIN code</label>
                <input 
                  type="text" 
                  value={companyData.pin}
                  onChange={(e) => setCompanyData({...companyData, pin: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">GSTIN <span className="text-slate-400 font-normal text-xs ml-1 bg-slate-100 px-1.5 py-0.5 rounded">Optional</span></label>
                <input 
                  type="text" 
                  value={companyData.gstin}
                  onChange={(e) => setCompanyData({...companyData, gstin: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-4 outline-none transition-all text-slate-900 font-medium ${companyData.gstin.length > 0 ? 'border-emerald-200 focus:ring-emerald-50 focus:border-emerald-500 bg-emerald-50/20' : 'border-slate-200 focus:ring-brand-50 focus:border-brand-500 bg-white'}`}
                />
                {companyData.gstin.length > 0 && (
                  <p className="text-[10px] text-emerald-600 font-black uppercase tracking-wider bg-emerald-100 px-2 py-1 rounded w-max mt-2 flex items-center gap-1">
                    <Check size={10}/> Valid GSTIN format
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Currency</label>
                <select 
                  value={companyData.currency || 'USD'}
                  onChange={(e) => {
                    setCompanyData({...companyData, currency: e.target.value});
                    localStorage.setItem('appCurrency', e.target.value);
                  }}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white appearance-none"
                >
                  {appCurrencies.map(c => (
                    <option key={c.code} value={c.code}>{c.symbol} {c.code} - {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-100 mt-8">
              <button className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl font-bold transition flex items-center gap-2 shadow-sm">
                <Check size={18} /> Save company profile
              </button>
              <button className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition">
                Cancel
              </button>
            </div>
          </div>

          <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
            <h3 className="text-rose-600 font-bold text-lg mb-1">Danger zone</h3>
            <p className="text-rose-500 text-sm font-medium mb-6">These actions are permanent and cannot be undone.</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-rose-100/50 shadow-sm">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Delete all company data</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Permanently remove all products, orders, invoices</p>
                </div>
                <button className="text-sm font-bold text-rose-600 hover:text-rose-700 transition px-4 py-2 hover:bg-rose-50 rounded-lg">Delete data</button>
              </div>
              
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-rose-100/50 shadow-sm">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Close workspace</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Cancel subscription and deletes this workspace</p>
                </div>
                <button className="text-sm font-bold text-rose-600 hover:text-rose-700 transition px-4 py-2 hover:bg-rose-50 rounded-lg">Close workspace</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="bg-white rounded-2xl">
          <TeamMembers />
        </div>
      )}

    </div>
  );
}
