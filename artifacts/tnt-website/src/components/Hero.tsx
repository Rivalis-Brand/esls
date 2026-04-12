import crewImg from "@assets/Landscapers_installing_artificial_turf_outdoors_1776027888931.png";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Deep multi-layer background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(160deg, #020810 0%, #050e1a 40%, #041410 100%)"
      }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 15% 60%, rgba(16,185,129,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(59,130,246,0.15) 0%, transparent 55%)"
      }} />

      {/* Animated orbs */}
      <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full opacity-25 animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 65%)", filter: "blur(70px)" }} />
      <div className="absolute bottom-[5%] left-[0%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #10b981 0%, transparent 65%)", filter: "blur(60px)", animationDelay: "2.5s" }} />
      <div className="absolute top-[45%] left-[35%] w-[350px] h-[350px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(70px)" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #020810, transparent)" }} />

      <div className="relative max-w-6xl mx-auto px-5 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Text */}
          <div>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 border rounded-full px-4 py-2 mb-8"
              style={{
                background: "rgba(16,185,129,0.1)",
                borderColor: "rgba(16,185,129,0.3)"
              }}>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-xs font-black tracking-widest uppercase">
                13+ Years · Southern California
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.0] tracking-tight mb-6">
              <span className="text-white">Premium Turf.</span>
              <br />
              <span style={{
                background: "linear-gradient(135deg, #34d399 0%, #60a5fa 55%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Flawless Results.
              </span>
            </h1>

            <p className="text-white/55 text-xl leading-relaxed mb-10 max-w-lg">
              Miguel Marquez and the Top Notch Artificial Turf team deliver precision, premium materials, and 13+ years of mastery to every installation across Southern California.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#estimate"
                className="group flex items-center gap-2.5 px-8 py-4 text-white font-black text-base rounded-full transition-all hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
                  boxShadow: "0 8px 40px rgba(16,185,129,0.4)"
                }}
              >
                Get a Free Estimate
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="tel:7142693329"
                className="flex items-center gap-2 px-7 py-4 border font-semibold text-base rounded-full transition-all hover:bg-white/5 text-white/80 hover:text-white"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                📞 (714) 269-3329
              </a>
            </div>

            {/* Brand row */}
            <div className="pt-7 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-white/25 text-xs font-black uppercase tracking-widest mb-4">Authorized Installer</p>
              <div className="flex flex-wrap gap-3">
                {["Tiger Turf", "Shaw Flooring", "Festival Turf"].map((brand) => (
                  <div
                    key={brand}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all hover:border-emerald-500/30"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.65)"
                    }}
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Crew photo */}
          <div className="relative hidden lg:block">
            {/* Glow behind image */}
            <div className="absolute inset-0 rounded-3xl opacity-40"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.4), rgba(59,130,246,0.3), transparent 70%)", filter: "blur(40px)", transform: "scale(1.1)" }} />

            <div className="relative rounded-3xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
              <img
                src={crewImg}
                alt="Top Notch Artificial Turf crew at work"
                className="w-full h-[520px] object-cover"
              />
              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-40"
                style={{ background: "linear-gradient(to top, rgba(4,10,20,0.9), transparent)" }} />

              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 px-5 py-4 rounded-xl"
                style={{ background: "rgba(4,10,20,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0 font-black"
                  style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
                >
                  ✓
                </div>
                <div>
                  <div className="font-black text-white text-sm">Top Notch. Every Time.</div>
                  <div className="text-xs text-white/40 mt-0.5">Licensed · Insured · Guaranteed</div>
                </div>
              </div>
            </div>

            {/* Floating stats */}
            <div
              className="absolute -top-4 -right-4 px-5 py-3.5 rounded-2xl shadow-xl"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.9), rgba(59,130,246,0.9))",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(16,185,129,0.4)"
              }}
            >
              <div className="text-2xl font-black text-white">1,000+</div>
              <div className="text-xs font-semibold text-white/80">Installs Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="w-5 h-8 border rounded-full flex items-start justify-center pt-1.5" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
          <div className="w-1 h-2 bg-emerald-400/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
