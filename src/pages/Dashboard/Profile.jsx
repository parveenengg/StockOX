import { useState, useEffect, useRef } from 'react';
import { User, Lock, Mail, Camera, Trash2, CheckCircle, Smartphone, Edit2, Check } from 'lucide-react';
import { getMyProfile, updateMyProfile, changePassword } from '../../services/userService';

export default function Profile({ hideHeader = false }) {
  const [activeTab, setActiveTab] = useState('personal'); // personal, password, security
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // Personal Info State
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    language: 'English',
    bio: ''
  });

  // Password State
  const [pwdData, setPwdData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Security State
  const [emailData, setEmailData] = useState({
    newEmail: '',
    currentPassword: '',
    otp: ['', '', '', '', '', '']
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getMyProfile();
      if (response && response.data) {
        setProfileData({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          phone: response.data.phone || '',
          language: 'English',
          bio: response.data.bio || ''
        });
      }
    } catch (err) {
      console.error('Failed to fetch profile', err);
    }
  };

  const handlePersonalSubmit = async () => {
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await updateMyProfile(profileData);
      setSuccessMsg('Profile updated successfully.');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (pwdData.newPassword !== pwdData.confirmPassword) {
      setErrorMsg("New passwords don't match.");
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await changePassword({
        currentPassword: pwdData.currentPassword,
        newPassword: pwdData.newPassword,
        confirmPassword: pwdData.confirmPassword
      });
      setSuccessMsg('Password changed successfully.');
      setPwdData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setErrorMsg(err.message || 'Failed to change password.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderTabs = () => (
    <div className="flex border-b border-slate-200 mb-8">
      <button 
        onClick={() => setActiveTab('personal')}
        className={`pb-4 px-2 mr-8 text-sm font-bold transition-all ${activeTab === 'personal' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
      >
        Personal info
      </button>
      <button 
        onClick={() => setActiveTab('password')}
        className={`pb-4 px-2 mr-8 text-sm font-bold transition-all ${activeTab === 'password' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
      >
        Change password
      </button>
      <button 
        onClick={() => setActiveTab('security')}
        className={`pb-4 px-2 text-sm font-bold transition-all ${activeTab === 'security' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
      >
        Email & Security
      </button>
    </div>
  );

  return (
    <div className={`animate-fade-in w-full max-w-4xl mx-auto font-sans ${hideHeader ? '' : 'pb-12'}`}>
      {!hideHeader && (
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">My profile</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your personal information and account preferences.</p>
        </div>
      )}

      {renderTabs()}

      {errorMsg && <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm font-bold">{errorMsg}</div>}
      {successMsg && <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2"><CheckCircle size={16}/>{successMsg}</div>}

      {/* Personal Info Tab */}
      {activeTab === 'personal' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Profile Photo</h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">Shown across your workspace</p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 font-bold text-2xl border border-brand-100 overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    profileData.firstName ? profileData.firstName[0].toUpperCase() : 'U'
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition shadow-sm"
                >
                  <Edit2 size={12} />
                </button>
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">{profileData.firstName || 'User'} {profileData.lastName}</p>
                <p className="text-sm text-slate-500 font-medium mb-3">
                  {sessionStorage.getItem('userEmail') || 'user@example.com'} 
                  <span className="bg-brand-50 text-brand-600 text-[10px] px-2 py-0.5 rounded-full font-bold ml-2">Admin</span>
                </p>
                <div className="flex gap-3">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setProfileImage(URL.createObjectURL(e.target.files[0]));
                      }
                    }} 
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Camera size={16} /> Upload photo
                  </button>
                  <button 
                    onClick={() => setProfileImage(null)}
                    className="flex items-center gap-2 px-4 py-2 border border-rose-100 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">First name</label>
              <input 
                type="text" 
                value={profileData.firstName}
                onChange={e => setProfileData({...profileData, firstName: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Last name</label>
              <input 
                type="text" 
                value={profileData.lastName}
                onChange={e => setProfileData({...profileData, lastName: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Phone number <span className="text-slate-400 font-normal text-xs ml-1 bg-slate-100 px-1.5 py-0.5 rounded">Optional</span></label>
              <input 
                type="text" 
                value={profileData.phone}
                onChange={e => setProfileData({...profileData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Language</label>
              <select 
                value={profileData.language}
                onChange={e => setProfileData({...profileData, language: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white appearance-none"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Bio <span className="text-slate-400 font-normal text-xs ml-1 bg-slate-100 px-1.5 py-0.5 rounded">Optional</span></label>
              <textarea 
                rows="3"
                value={profileData.bio}
                onChange={e => setProfileData({...profileData, bio: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white resize-none"
                placeholder="Write a short bio..."
              ></textarea>
              <div className="text-xs text-slate-400 font-medium mt-2 text-right">{profileData.bio.length} / 300 characters</div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={handlePersonalSubmit}
              disabled={isLoading}
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition shadow-lg shadow-brand-500/20 disabled:opacity-70 flex items-center gap-2"
            >
              <Check size={18} /> Save changes
            </button>
            <button className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Change password</h3>
              <p className="text-sm text-slate-500 font-medium">Use a strong password - minimum 8 characters</p>
            </div>
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
              <Lock size={20} />
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Current password</label>
              <input 
                type="password" 
                value={pwdData.currentPassword}
                onChange={e => setPwdData({...pwdData, currentPassword: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">New password</label>
              <input 
                type="password" 
                value={pwdData.newPassword}
                onChange={e => setPwdData({...pwdData, newPassword: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
                placeholder="••••••••"
              />
              {pwdData.newPassword.length > 0 && (
                <div className="flex gap-2 mt-2">
                  <div className={`h-1 flex-1 rounded-full ${pwdData.newPassword.length > 0 ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${pwdData.newPassword.length > 4 ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${pwdData.newPassword.length > 7 ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(pwdData.newPassword) && /[0-9]/.test(pwdData.newPassword) ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
                </div>
              )}
              {pwdData.newPassword.length > 0 && <p className="text-xs text-emerald-600 font-bold mt-2">Strong password</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Confirm new password</label>
              <input 
                type="password" 
                value={pwdData.confirmPassword}
                onChange={e => setPwdData({...pwdData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
                placeholder="••••••••"
              />
              {pwdData.confirmPassword && pwdData.confirmPassword === pwdData.newPassword && (
                <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1"><CheckCircle size={12}/> Password match</p>
              )}
            </div>

            <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl mt-4">
              <p className="text-sm font-bold text-slate-700 mb-2">Password requirements</p>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                <span className={pwdData.newPassword.length >= 8 ? "text-emerald-600 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                  <Check size={12}/> At least 8 characters
                </span>
                <span className={/[A-Z]/.test(pwdData.newPassword) ? "text-emerald-600 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                  <Check size={12}/> One uppercase letter
                </span>
                <span className={/[0-9]/.test(pwdData.newPassword) ? "text-emerald-600 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                  <Check size={12}/> One number
                </span>
                <span className={/[^A-Za-z0-9]/.test(pwdData.newPassword) ? "text-emerald-600 flex items-center gap-1" : "text-slate-500 flex items-center gap-1"}>
                  <Check size={12}/> One special character
                </span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={handlePasswordSubmit}
                disabled={isLoading}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition shadow-lg shadow-brand-500/20 disabled:opacity-70 flex items-center gap-2"
              >
                <Check size={18} /> Update password
              </button>
              <button className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Email address</h3>
                <p className="text-sm text-slate-500 font-medium">Changing email requires OTP verification on new address</p>
              </div>
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                <Mail size={20} />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Current email</label>
                <input 
                  type="email" 
                  disabled
                  value="admin@stockox.com"
                  className="w-full px-4 py-3 border border-amber-100 rounded-xl bg-amber-50/30 text-slate-600 font-medium cursor-not-allowed"
                />
                <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1"><CheckCircle size={12}/> Verified</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">New email address</label>
                <input 
                  type="email" 
                  value={emailData.newEmail}
                  onChange={e => setEmailData({...emailData, newEmail: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
                  placeholder="new@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Confirm with current password</label>
                <input 
                  type="password" 
                  value={emailData.currentPassword}
                  onChange={e => setEmailData({...emailData, currentPassword: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium bg-white"
                  placeholder="••••••••"
                />
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Mail size={16} className="text-slate-500"/>
                  <span className="text-sm font-bold text-slate-800">OTP sent to {emailData.newEmail || 'new email'}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-4">Enter the 6-digit code we sent to verify ownership of your new email</p>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <input 
                      key={i}
                      type="text" 
                      maxLength="1"
                      className={`w-10 h-12 text-center text-lg font-black border rounded-lg outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${emailData.otp[i] ? 'border-brand-300 text-brand-700 bg-brand-50' : 'border-slate-200 bg-white'}`}
                      value={emailData.otp[i] || ''}
                      onChange={(e) => {
                        const newOtp = [...emailData.otp];
                        newOtp[i] = e.target.value;
                        setEmailData({...emailData, otp: newOtp});
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500 font-medium mt-3">Didn't get it? <button className="text-brand-600 font-bold hover:underline">Resend code</button> (2:30 remaining)</p>
              </div>

              <div className="flex gap-4 pt-2">
                <button className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl font-bold transition flex items-center gap-2 shadow-sm">
                  <Check size={18} /> Verify & update email
                </button>
                <button className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-0 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Security setting</h3>
                <p className="text-sm text-slate-500 font-medium">Manage login sessions and 2FA</p>
              </div>
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                <Lock size={20} />
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Two-factor authentication</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Add extra layer of login security</p>
                  </div>
                </div>
                <button className="text-sm font-bold text-slate-500 hover:text-slate-800">Disabled</button>
              </div>

              <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Email verified</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">admin@stockox.com</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md">Verified</span>
              </div>

              <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Active sessions</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">2 devices logged in</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-rose-600 border border-rose-200 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition">Remove all</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
