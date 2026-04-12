export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Deep layered background */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 20% 50%, #0d2d1f 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #0c1f3f 0%, transparent 60%), linear-gradient(160deg, #040a14 0%, #060d1a 40%, #050e12 100%)"
      }} />

      {/* Animated orbs */}
      <div className="absolute top-[15%] right-[8%] w-[500px] h-[500px] rounded-full opacity-20 animate-float"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full opacity-15 animate-float"
        style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)", filter: "blur(50px)", animationDelay: "2s" }} />
      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to top, #040a14, transparent)" }} />

      <div className="relative max-w-6xl mx-auto px-5 pt-28 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 border rounded-full px-4 py-2 mb-8"
            style={{
              background: "rgba(16,185,129,0.08)",
              borderColor: "rgba(16,185,129,0.25)"
            }}>
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
              13+ Years · Anaheim, CA · Orange County
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight mb-6">
            <span className="text-white">Premium Turf.</span>
            <br />
            <span className="gradient-text">Flawless Results.</span>
          </h1>

          <p className="text-white/55 text-xl leading-relaxed mb-10 max-w-xl">
            Miguel Marquez and the Top Notch Turf team bring precision, premium materials, and 13+ years of mastery to every installation across Orange County.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="#estimate"
              className="group flex items-center gap-2.5 px-8 py-4 text-white font-black text-base rounded-full transition-all shadow-2xl hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)", boxShadow: "0 8px 32px rgba(16,185,129,0.3)" }}
            >
              Get a Free Estimate
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="tel:7142693329"
              className="flex items-center gap-2 px-8 py-4 border font-semibold text-base rounded-full transition-all hover:bg-white/5 text-white/80"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              📞 (714) 269-3329
            </a>
          </div>

          {/* Brand row */}
          <div className="pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-5">Authorized Installer</p>
            <div className="flex flex-wrap gap-3">
              {["Tiger Turf", "Shaw Flooring", "Festival Turf"].map((brand) => (
                <div
                  key={brand}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.09)",
                    color: "rgba(255,255,255,0.7)"
                  }}
                >
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-5 h-8 border rounded-full flex items-start justify-center pt-1.5" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
          <div className="w-1 h-2 bg-emerald-400/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
