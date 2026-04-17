import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Eye, EyeOff } from 'lucide-react';
import { registerUser } from '../../services/auth.service';
import logo from '../../assets/logo.jpeg';

export default function Register() {
  const navigate = useNavigate();

  // Load from sessionStorage if available
  const loadInitialState = (key, defaultVal) => {
    const saved = sessionStorage.getItem(`register_${key}`);
    return saved !== null ? saved : defaultVal;
  };

  const [formData, setFormData] = useState({
    businessName: loadInitialState('businessName', ''),
    companyEmail: loadInitialState('companyEmail', ''),
    phone: loadInitialState('phone', ''),
    workspaceId: loadInitialState('workspaceId', ''),
    firstName: loadInitialState('firstName', ''),
    lastName: loadInitialState('lastName', ''),
    adminEmail: loadInitialState('adminEmail', ''),
    password: loadInitialState('password', '')
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-generate workspace ID strictly mapped from business name if workspace ID is untouched
  useEffect(() => {
    if (formData.businessName && !sessionStorage.getItem('register_workspaceId_touched')) {
      const generated = formData.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, workspaceId: generated }));
      sessionStorage.setItem('register_workspaceId', generated);
    }
  }, [formData.businessName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    sessionStorage.setItem(`register_${name}`, value);
    if (name === 'workspaceId') sessionStorage.setItem('register_workspaceId_touched', 'true');
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return 0;
    if (p.length > 8 && /[A-Z]/.test(p) && /[0-9]/.test(p)) return 4;
    if (p.length > 6 && /[0-9]/.test(p)) return 3;
    if (p.length > 4) return 2;
    return 1;
  };

  const strength = getPasswordStrength();
  const strengthLabels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong password'];
  const strengthColors = ['bg-slate-200', 'bg-rose-500', 'bg-amber-400', 'bg-brand-400', 'bg-brand-600'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await registerUser(formData);
      // Success - carry email to OTP logic
      navigate('/otp', { state: { email: formData.adminEmail || formData.companyEmail } });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-lg mx-auto bg-white sm:p-4 rounded-xl">
      <div className="text-center mb-8">
        <img src={logo} alt="StockOX" className="w-[64px] h-[64px] object-contain rounded-2xl mx-auto mb-6 shadow-sm border border-slate-100" />
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create your workspace</h2>
        <p className="text-slate-500 text-sm font-medium mt-1">Set up your company - takes 2 minutes</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECTION A */}
        <div className="space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">COMPANY DETAILS</p>
          
          <div>
            <label className="block text-[13px] font-bold text-slate-800 mb-1.5">Company / business name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-100 focus:border-brand-600 outline-none transition-all text-sm font-medium text-slate-900"
              placeholder="Acme traders"
              required
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-800 mb-1.5">Company emails <span className="text-slate-500 font-normal">(or owner's personal Gmail)</span></label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-100 focus:border-brand-600 outline-none transition-all text-sm font-medium text-slate-900"
              placeholder="acme.traders@gmail.com"
              required
            />
          </div>

          <div>
             <label className="block text-[13px] font-bold text-slate-800 mb-1.5">Phone number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-100 focus:border-brand-600 outline-none transition-all text-sm font-medium text-slate-900"
              placeholder="+91 92654681654"
              required
            />
          </div>

          <div>
             <label className="block text-[13px] font-bold text-slate-800 mb-1.5">Workspace ID <span className="text-slate-500 font-normal">(auto - generated)</span></label>
            <div className="flex border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-100 focus-within:border-brand-600 transition-all">
              <div className="bg-slate-50 px-3 py-2.5 border-r border-slate-200 text-sm font-medium text-slate-500 flex items-center justify-center">
                stockflow.app/
              </div>
              <input
                type="text"
                name="workspaceId"
                value={formData.workspaceId}
                onChange={handleChange}
                className="flex-1 px-3 py-2.5 outline-none text-sm font-bold text-brand-600 w-full"
                placeholder="acme-traders"
                required
              />
              {formData.workspaceId.length > 2 && (
                <div className="pr-3 flex items-center bg-white">
                  <Check className="w-5 h-5 text-emerald-500 font-bold" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION B */}
        <div className="space-y-4 pt-4 border-t border-white"> {/* Space separator visually hidden border */}
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">YOUR ADMIN ACCOUNT</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1.5">First name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-100 focus:border-brand-600 outline-none transition-all text-sm font-medium text-slate-900"
                placeholder="Ramesh"
                required
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1.5">Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-100 focus:border-brand-600 outline-none transition-all text-sm font-medium text-slate-900"
                placeholder="Sharma"
                required
              />
            </div>
          </div>

          <div>
             <label className="block text-[13px] font-bold text-slate-800 mb-1.5">Your email <span className="text-slate-800 font-normal">(for sign in & OTP)</span></label>
             <input
              type="email"
              name="adminEmail"
              value={formData.adminEmail}
              onChange={handleChange}
              className="block w-full px-3 py-2.5 border border-brand-600 rounded-lg outline-none transition-all text-sm font-bold text-slate-900 shadow-[0_0_0_2px_rgba(45,59,255,0.1)]"
              placeholder="ramesh@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-800 mb-1.5">Password</label>
            <div className="relative border border-slate-300 rounded-lg focus-within:ring-2 focus-within:ring-brand-100 focus-within:border-brand-600 transition-all bg-white">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-3 pr-10 py-2.5 outline-none bg-transparent text-sm font-bold text-slate-900 tracking-wider"
                placeholder="••••••••"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 outline-none">
                  {showPassword ? <EyeOff className="h-[18px] w-[18px]" strokeWidth={1.5} /> : <Eye className="h-[18px] w-[18px]" strokeWidth={1.5} />}
                </button>
              </div>
            </div>
            
            {/* Password Verification UI Custom Styling directly from image */}
            <div className="mt-3">
              <div className="flex gap-1 h-[3px] mb-1.5">
                {[1, 2, 3, 4].map((level) => (
                  <div key={level} className={`flex-1 transition-colors duration-300 ${strength >= level ? strengthColors[strength] : 'bg-slate-200'}`} />
                ))}
              </div>
              <p className={`text-xs font-medium transition-colors ${strength >= 3 ? 'text-brand-600' : 'text-slate-500'}`}>
                {strength > 0 ? strengthLabels[strength] : 'Enter a password'}
              </p>
            </div>
          </div>
        </div>

        {/* OTP Notification Box */}
        <div className="bg-brand-50/50 p-4 rounded-xl text-brand-600 text-[13px] font-medium leading-relaxed border border-brand-50/50">
          A 6- digit OTP will be sent to <strong>{formData.adminEmail || 'your email'}</strong> to verify your account. No SMS charges.
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3.5 px-4 rounded-xl border border-slate-200 text-[15px] font-bold text-slate-900 bg-white hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-brand-100 transition-all shadow-sm"
        >
          {isSubmitting ? 'Processing...' : 'Create workspace & Send OTP'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm font-medium text-slate-900">
        Already have an account?{' '}
        <Link to="/sign-in" className="font-bold text-brand-600 hover:text-brand-700 transition">
          Sign In
        </Link>
      </p>
    </div>
  );
}
