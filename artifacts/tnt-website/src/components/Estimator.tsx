const WIDGET_URL = `${window.location.origin}/rivalis-widget/?companyId=top-notch-turf&companyName=Top+Notch+Artificial+Turf`;

export default function Estimator() {
  return (
    <section id="estimate" className="py-28 relative overflow-hidden" style={{ background: "#040a14" }}>
      {/* Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)", filter: "blur(80px)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #10b981, transparent 70%)", filter: "blur(70px)", transform: "translate(-20%, 20%)" }} />

      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Left: info panel */}
          <div className="lg:sticky lg:top-24">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#34d399" }}
            >
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Free Estimate
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Find Out What Your<br />
              <span style={{
                background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                Project Will Cost
              </span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-10">
              Use our instant calculator to get a ballpark range, then submit your info and Miguel will follow up with a full accurate quote — zero obligation.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: "📐", title: "Enter Your Square Footage", desc: "Type it in or use Google Maps to measure" },
                { icon: "🌿", title: "Choose Your Turf Grade", desc: "Tiger Turf, Shaw Flooring, or Festival Turf" },
                { icon: "📞", title: "Miguel Calls Within 24 Hours", desc: "Free, accurate quote — no pressure ever" },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white/80 text-sm">{s.title}</div>
                    <div className="text-white/35 text-sm mt-0.5">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rivalis badge */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "rgba(255,255,255,0.3)" }}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <div>
                <div
                  className="text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, #34d399, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Powered by Rivalis Computer Vision
                </div>
                <div className="text-xs text-white/25 mt-0.5">AI-powered turf measurement technology</div>
              </div>
            </div>

            {/* Direct call CTA */}
            <a
              href="tel:7142693329"
              className="mt-6 flex items-center justify-center gap-2 w-full py-4 text-white font-black text-base rounded-full transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #10b981, #3b82f6)",
                boxShadow: "0 8px 32px rgba(16,185,129,0.3)"
              }}
            >
              📞 Or Call (714) 269-3329
            </a>
          </div>

          {/* Right: Rivalis widget iframe */}
          <div className="relative">
            {/* Glow behind widget */}
            <div className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 30%, rgba(16,185,129,0.4), rgba(59,130,246,0.3), transparent 70%)", filter: "blur(40px)", transform: "scale(1.05)" }} />

            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: "1px solid rgba(16,185,129,0.2)", boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(16,185,129,0.1)" }}
            >
              <iframe
                src={WIDGET_URL}
                title="Free Turf Estimate — Powered by Rivalis"
                className="w-full"
                style={{ height: "680px", border: "none", display: "block" }}
                allow="camera"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
