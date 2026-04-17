import { Compass } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export default function PublicPlaceholder() {
  const location = useLocation();
  const pathName = location.pathname.split('/').pop() || 'Page';
  const title = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center px-4 animate-fade-in pt-16">
      <div className="w-20 h-20 bg-brand-50 rounded-[24px] flex items-center justify-center mb-6 shadow-sm border border-brand-100">
        <Compass className="w-10 h-10 text-brand-600" />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{title}</h2>
      <p className="text-lg text-slate-500 font-medium max-w-md mb-8">
        We are building something amazing here. Please check back soon!
      </p>
      <Link to="/" className="text-brand-600 font-bold hover:text-brand-700 transition underline underline-offset-4">
        Return Home
      </Link>
    </div>
  );
}
