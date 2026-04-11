export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0f4027 0%, #1B6B45 45%, #2d8a60 100%)",
          }}
        />
        {/* Decorative grass blades */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full opacity-20"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          fill="white"
        >
          {Array.from({ length: 80 }).map((_, i) => {
            const x = (i / 80) * 1440 + Math.sin(i * 1.7) * 8;
            const h = 80 + Math.sin(i * 2.3) * 60;
            const w = 5 + Math.sin(i * 1.1) * 3;
            return (
              <ellipse
                key={i}
                cx={x}
                cy={200}
                rx={w / 2}
                ry={h}
                style={{ transform: `rotate(${Math.sin(i * 0.8) * 8}deg)`, transformOrigin: `${x}px 200px` }}
              />
            );
          })}
        </svg>
        {/* Top-right circle decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            <span className="text-white text-xs font-semibold tracking-wider uppercase">Anaheim, CA · Serving All of Orange County</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Beautiful Turf,<br />
            <span className="text-[#F5A742]">Done Right.</span>
          </h1>

          <p className="text-white/80 text-xl leading-relaxed mb-8 max-w-lg">
            Premium artificial turf installation by Miguel Marquez and the Top Notch Turf team. 13+ years turning Orange County backyards, lawns, and putting greens into something you'll love every day.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#estimate"
              className="px-8 py-4 bg-[#E8652A] hover:bg-[#d4571f] text-white font-black text-base rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Get a Free Estimate →
            </a>
            <a
              href="tel:7142693329"
              className="px-8 py-4 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-base rounded-full transition-all"
            >
              (714) 269-3329
            </a>
          </div>

          {/* Brand logos */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">Authorized Installer</p>
            <div className="flex flex-wrap gap-6 items-center">
              {["Tiger Turf", "Shaw Flooring", "Festival Turf"].map((brand) => (
                <div key={brand} className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg">
                  <span className="text-white/90 font-bold text-sm">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-white text-xs font-medium">Scroll</span>
        <div className="w-5 h-8 border-2 border-white/50 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
