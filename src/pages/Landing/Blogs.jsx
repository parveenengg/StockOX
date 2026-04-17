export default function Blogs() {
  return (
    <div className="bg-slate-50 font-sans flex flex-col">

      <section className="px-8 sm:px-16 lg:px-24 pt-32 pb-24 text-center max-w-4xl mx-auto flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Latest Updates & Architecture</h1>
        <p className="text-lg text-slate-500 font-medium mb-16">Deep dives into scaling your supply chain natively.</p>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer">
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4 inline-block">Engineering</span>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Why we chose a monolithic core for inventory tracking</h3>
            <p className="text-sm text-slate-500 mb-6">A technical overview of abandoning microservices to gain sub-millisecond stock resolutions.</p>
            <div className="text-xs font-bold text-slate-400">Read Article →</div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4 inline-block">Case Study</span>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Scaling Acme Corp to 50k transactions daily</h3>
            <p className="text-sm text-slate-500 mb-6">How standardizing data models in StockOX completely rebuilt their wholesale margins.</p>
            <div className="text-xs font-bold text-slate-400">Read Article →</div>
          </div>
        </div>
      </section>
    </div>
  );
}
