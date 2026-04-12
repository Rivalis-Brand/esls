export default function CtaBanner() {
  return (
    <section className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #071a2e 0%, #051a12 50%, #071428 100%)" }}>
      {/* Orbs */}
      <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #10b981, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)", filter: "blur(50px)" }} />
      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), rgba(59,130,246,0.4), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(16,185,129,0.4), transparent)" }} />

      <div className="max-w-4xl mx-auto px-5 text-center relative">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#34d399" }}
        >
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Free Consultation Available
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
          Ready for a Yard You'll{" "}
          <span className="gradient-text-gb">Actually Love?</span>
        </h2>
        <p className="text-white/45 text-lg mb-10">
          Call Miguel or submit our quick form. Free quotes, honest pricing, zero pressure — ever.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="tel:7142693329"
            className="flex items-center gap-2 px-8 py-4 text-white font-black text-base rounded-full transition-all shadow-2xl hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #10b981, #3b82f6)",
              boxShadow: "0 8px 32px rgba(16,185,129,0.3)"
            }}
          >
            📞 (714) 269-3329
          </a>
          <a
            href="#estimate"
            className="flex items-center gap-2 px-8 py-4 font-bold text-base rounded-full transition-all hover:bg-white/5 text-white/75"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          >
            Get Free Estimate →
          </a>
        </div>
      </div>
    </section>
  );
}
