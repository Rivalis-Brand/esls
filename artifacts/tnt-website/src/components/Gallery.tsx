const placeholders = [
  { label: "Backyard Lawn", tag: "Residential", accent: "from-emerald-500/30 to-teal-500/20" },
  { label: "Putting Green", tag: "Putting Green", accent: "from-blue-500/30 to-indigo-500/20" },
  { label: "Front Yard", tag: "Residential", accent: "from-violet-500/30 to-purple-500/20" },
  { label: "Pool Surround", tag: "Pool Area", accent: "from-cyan-500/30 to-blue-500/20" },
  { label: "Dog Run", tag: "Pet Turf", accent: "from-emerald-500/30 to-green-500/20" },
  { label: "Commercial Property", tag: "Commercial", accent: "from-blue-500/30 to-violet-500/20" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-28" style={{ background: "#040a14" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa" }}
          >
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
            Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            See the{" "}
            <span className="gradient-text">Difference</span>
          </h2>
          <p className="text-white/35 text-lg mt-5 max-w-md mx-auto">
            Real Orange County projects. Job photos being added soon — check back shortly.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholders.map((p, i) => (
            <div
              key={i}
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl`}
              style={{
                background: `linear-gradient(135deg, rgba(4,10,20,0.9), rgba(4,10,20,0.7))`,
                border: "1px solid rgba(255,255,255,0.07)"
              }}
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />

              <div className="relative flex flex-col items-center gap-2 text-center px-4">
                <div className="text-4xl opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300">🌿</div>
                <p className="text-white font-black text-base">{p.label}</p>
                <p className="text-white/40 text-xs">Photo Coming Soon</p>
              </div>

              <div className="absolute top-3 left-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  {p.tag}
                </span>
              </div>

              {/* Bottom hover bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, #10b981, #3b82f6)" }}
              />
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
            Start Your Project →
          </a>
        </div>
      </div>
    </section>
  );
}
