const services = [
  {
    icon: "🏡",
    title: "Residential Lawns",
    desc: "Transform your front or backyard with premium grass that stays lush year-round — no watering, no mowing, no muddy paws.",
    features: ["Pet-friendly options", "Kid-safe surface", "Drought resistant"],
    color: "from-emerald-500/20 to-teal-500/10",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: "⛳",
    title: "Putting Greens",
    desc: "Tour-quality putting greens custom-built with precise ball roll and realistic texture. Play daily, steps from your back door.",
    features: ["Custom contours & breaks", "Fringe & chipping areas", "All skill levels"],
    color: "from-blue-500/20 to-indigo-500/10",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: "🏢",
    title: "Commercial Turf",
    desc: "Pristine curb appeal for offices, retail centers, HOAs, and complexes that makes a powerful first impression every day.",
    features: ["High-traffic durability", "Low maintenance", "HOA approved installs"],
    color: "from-violet-500/20 to-purple-500/10",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    icon: "🐾",
    title: "Pet Turf",
    desc: "Antimicrobial technology and excellent drainage keep your yard smelling fresh and your pets happy and safe.",
    features: ["Odor-neutralizing infill", "Easy to clean", "Safe for all breeds"],
    color: "from-emerald-500/20 to-cyan-500/10",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: "⚽",
    title: "Sports & Play Areas",
    desc: "From kids' play areas to bocce courts and backyard sports zones — turf engineered for constant, hard use.",
    features: ["Shock-absorbent padding", "Non-slip surface", "Custom field markings"],
    color: "from-blue-500/20 to-sky-500/10",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: "🌊",
    title: "Pool Surrounds",
    desc: "Non-slip, drainage-ready turf that turns concrete pool decks into resort-worthy outdoor retreats.",
    features: ["Excellent drainage", "UV resistant", "Barefoot-friendly"],
    color: "from-cyan-500/20 to-blue-500/10",
    glow: "rgba(6,182,212,0.15)",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28" style={{ background: "#040a14" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#34d399" }}
          >
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            What We Install
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Every Project,{" "}
            <span className="gradient-text-gb">Done to Perfection</span>
          </h2>
          <p className="text-white/40 text-lg mt-5 max-w-xl mx-auto">
            From intimate patios to large commercial properties — we bring the same precision and pride to every install.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${s.glow}, transparent 70%)` }}
              />
              {/* Top gradient strip */}
              <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${s.color} opacity-50 group-hover:opacity-100 transition-opacity`} />

              <div className="relative">
                <div className="text-4xl mb-5">{s.icon}</div>
                <h3 className="text-xl font-black text-white mb-2">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(52,211,153,0.15)" }}>
                        <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 2.5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="text-white/55">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#estimate"
            className="inline-flex items-center gap-2.5 px-9 py-4 text-white font-black text-base rounded-full transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
              boxShadow: "0 8px 32px rgba(16,185,129,0.25)"
            }}
          >
            Get Your Free Estimate →
          </a>
        </div>
      </div>
    </section>
  );
}
