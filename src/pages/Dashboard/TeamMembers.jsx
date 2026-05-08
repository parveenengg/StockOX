import { useState, useEffect } from 'react';
import { Plus, X, Check, Send } from 'lucide-react';
import { getAllUsers, inviteUser } from '../../services/userService';

function InviteMemberModal({ isOpen, onClose, onInviteSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Staff',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [invitedEmail, setInvitedEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await inviteUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role.toUpperCase(), // Backend expects ADMIN, MANAGER, STAFF
        phone: formData.phone
      });
      setInvitedEmail(formData.email);
      setIsSuccess(true);
      onInviteSuccess();
    } catch (err) {
      setError(err.message || 'Failed to send invite.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteAnother = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'Staff',
      phone: ''
    });
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 animate-fade-in p-4 sm:p-0">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-slide-up">
        {isSuccess ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#dcfce7] text-[#16a34a] rounded-full flex items-center justify-center mb-6">
              <Check size={32} strokeWidth={3} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Invitation sent!</h2>
            <p className="text-sm text-slate-500 font-medium mb-1">We've sent an invitation to</p>
            <p className="text-sm font-bold text-brand-600 mb-4">{invitedEmail}</p>
            <p className="text-xs text-slate-500 font-medium mb-8 max-w-[250px] leading-relaxed">
              The user will receive an email with instruction to join to team.
            </p>
            
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="flex-1 px-4 py-2.5 bg-white border border-brand-200 text-brand-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition"
              >
                Back to team members
              </button>
              <button 
                onClick={handleInviteAnother}
                className="flex-1 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-bold transition flex justify-center items-center gap-2"
              >
                <Send size={16} /> Invite another
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h2 className="text-xl font-bold text-brand-600">Invite team member</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Add your teammate to your team and start working together on getting done !</p>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm font-bold">{error}</div>}
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">First name:</label>
                <input 
                  type="text" 
                  required
                  value={formData.firstName}
                  onChange={e => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none transition-all text-sm font-medium"
                  placeholder="Ramesh"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Last name:<span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  value={formData.lastName}
                  onChange={e => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none transition-all text-sm font-medium"
                  placeholder="Kumar"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email:</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none transition-all text-sm font-medium"
                  placeholder="ramesh@gmail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role:<span className="text-rose-500">*</span></label>
                <select 
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none transition-all text-sm font-medium appearance-none bg-white text-brand-600"
                >
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone number:</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none transition-all text-sm font-medium"
                  placeholder="+913654551512"
                />
              </div>

              <div className="flex gap-4 pt-4 mt-2">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-bold transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-bold transition disabled:opacity-70"
                >
                  {isLoading ? 'Inviting...' : 'Invite'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function TeamMembers() {
  const [filter, setFilter] = useState('All'); // All, Active, Pending, Declined
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsers();
      if (response && response.data) {
        setUsers(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getInitials = (firstName, lastName) => {
    return `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase() || 'U';
  };

  // Mock data mapping if API returns different statuses
  // Active -> status: 'ACTIVE'
  // Pending -> status: 'PENDING'
  // Declined -> status: 'DECLINED'
  const activeUsers = users.filter(u => u.status === 'ACTIVE' || !u.status); // fallback to active if no status
  const pendingUsers = users.filter(u => u.status === 'PENDING');
  const declinedUsers = users.filter(u => u.status === 'DECLINED');

  const filteredUsers = users.filter(u => {
    if (filter === 'All') return true;
    if (filter === 'Active') return u.status === 'ACTIVE' || !u.status;
    if (filter === 'Pending') return u.status === 'PENDING';
    if (filter === 'Declined') return u.status === 'DECLINED';
    return true;
  });

  const renderRoleBadge = (role) => {
    const r = role?.toUpperCase() || 'STAFF';
    if (r === 'ADMIN') return <span className="bg-brand-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">Admin</span>;
    if (r === 'MANAGER') return <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-bold">Manager</span>;
    return <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-bold">Staff</span>;
  };

  const renderUserCard = (user) => (
    <div key={user.id || user.email} className="bg-white p-4 rounded-xl border border-brand-200 shadow-sm flex justify-between items-center hover:border-brand-300 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
          {getInitials(user.firstName, user.lastName)}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{user.firstName} {user.lastName}</h4>
          <p className="text-xs text-brand-600 font-medium">{user.email}</p>
          <div className="mt-1.5">{renderRoleBadge(user.role)}</div>
        </div>
      </div>
      
      <div>
        {(user.status === 'ACTIVE' || !user.status) && (
          <span className="bg-slate-100 text-slate-600 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">Active</span>
        )}
        {user.status === 'PENDING' && (
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 text-slate-400 text-xs font-bold rounded-lg hover:bg-slate-50 transition">Resend</button>
            <button className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition shadow-sm">Revoke</button>
          </div>
        )}
        {user.status === 'DECLINED' && (
          <span className="bg-rose-100 text-rose-600 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">Declined</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in w-full font-sans">
      
      {/* Header Section */}
      <div className="bg-brand-500 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 shadow-md shadow-brand-500/10">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Team members</h2>
          <p className="text-brand-100 text-sm font-medium">Manage your team and track invitations</p>
        </div>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="mt-4 sm:mt-0 px-4 py-2 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl font-bold transition flex items-center gap-2 text-sm backdrop-blur-sm shadow-sm"
        >
          <Plus size={16} /> Add member
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-brand-200 shadow-sm">
          <h3 className="text-3xl font-black text-brand-500 mb-1">{activeUsers.length}</h3>
          <p className="text-sm font-bold text-brand-600">Active member</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-brand-200 shadow-sm">
          <h3 className="text-3xl font-black text-brand-500 mb-1">{pendingUsers.length}</h3>
          <p className="text-sm font-bold text-brand-600">Pending invites</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-brand-200 shadow-sm">
          <h3 className="text-3xl font-black text-brand-500 mb-1">{users.length}</h3>
          <p className="text-sm font-bold text-brand-600">Total invited</p>
        </div>
      </div>

      {/* Segmented Control */}
      <div className="flex bg-white border border-brand-200 rounded-xl p-1 w-max mb-8 shadow-sm">
        {['All', 'Active', 'Pending', 'Declined'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
              filter === tab 
                ? 'bg-brand-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Users List */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 font-bold">Loading members...</div>
      ) : (
        <div className="space-y-8">
          {(filter === 'All' || filter === 'Active') && activeUsers.length > 0 && (
            <div>
              <h3 className="text-xs font-black text-brand-500 uppercase tracking-wider mb-4">ACTIVE MEMBERS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeUsers.map(renderUserCard)}
              </div>
            </div>
          )}

          {(filter === 'All' || filter === 'Pending') && pendingUsers.length > 0 && (
            <div>
              <h3 className="text-xs font-black text-brand-500 uppercase tracking-wider mb-4">PENDING INVITATION</h3>
              <div className="grid grid-cols-1 gap-4">
                {pendingUsers.map(renderUserCard)}
              </div>
            </div>
          )}

          {(filter === 'All' || filter === 'Declined') && declinedUsers.length > 0 && (
            <div>
              <h3 className="text-xs font-black text-brand-500 uppercase tracking-wider mb-4">DECLINED</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {declinedUsers.map(renderUserCard)}
              </div>
            </div>
          )}
          
          {filteredUsers.length === 0 && (
             <div className="py-12 text-center text-slate-400 font-bold bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
               No members found for this filter.
             </div>
          )}
        </div>
      )}

      {/* Invite Modal */}
      <InviteMemberModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
        onInviteSuccess={() => {
          fetchUsers(); // Refresh list
        }}
      />
    </div>
  );
}
