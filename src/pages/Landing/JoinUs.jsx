import { UserPlus } from 'lucide-react';

export default function JoinUs() {
  return (
    <div className="bg-slate-50 font-sans flex flex-col">

      <section className="px-8 sm:px-16 lg:px-24 pt-32 pb-24 text-center max-w-4xl mx-auto flex-1">
        <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
           <UserPlus size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Join the infrastructure team</h1>
        <p className="text-lg text-slate-500 font-medium mb-16">We are rebuilding commerce from the ledger up. View our open roles.</p>

        <div className="text-left space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-brand-300 transition cursor-pointer">
             <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Senior React Engineer</h3>
                <p className="text-sm text-slate-500 font-medium">Remote · Full Time</p>
             </div>
             <button className="px-4 py-2 bg-slate-50 text-slate-900 font-bold rounded-lg group-hover:bg-brand-50 group-hover:text-brand-600 transition">Apply</button>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-brand-300 transition cursor-pointer">
             <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Product Design Intern</h3>
                <p className="text-sm text-slate-500 font-medium">Remote · Fall Internship</p>
             </div>
             <button className="px-4 py-2 bg-slate-50 text-slate-900 font-bold rounded-lg group-hover:bg-brand-50 group-hover:text-brand-600 transition">Apply</button>
          </div>
        </div>
      </section>
    </div>
  );
}
