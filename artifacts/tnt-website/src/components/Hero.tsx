import crewImg from "@assets/Landscapers_installing_artificial_turf_outdoors_1776027888931.png";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* Full-bleed background image */}
      <img
        src={crewImg}
        alt="Top Notch Artificial Turf crew at work"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to top, rgba(2,12,8,0.97) 0%, rgba(2,12,8,0.75) 45%, rgba(2,12,8,0.25) 75%, rgba(2,12,8,0.1) 100%)"
      }} />

      {/* Green ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 20% 80%, rgba(16,185,129,0.25) 0%, transparent 50%), radial-gradient(ellipse at 70% 90%, rgba(16,185,129,0.12) 0%, transparent 45%)"
      }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "50px 50px"
      }} />

      {/* Floating stats badge — top right */}
      <div
        className="absolute top-20 right-5 px-5 py-3.5 rounded-2xl shadow-xl z-10"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.9), rgba(59,130,246,0.9))",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(16,185,129,0.4)"
        }}
      >
        <div className="text-2xl font-black text-white">1,000+</div>
        <div className="text-xs font-semibold text-white/80">Installs Complete</div>
      </div>

      {/* Text content — overlaid at bottom of image */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 pb-14 pt-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 border rounded-full px-4 py-2 mb-6"
          style={{ background: "rgba(16,185,129,0.12)", borderColor: "rgba(16,185,129,0.35)" }}>
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-xs font-black tracking-widest uppercase">
            13+ Years · Southern California
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-5">
          <span className="text-white block">Premium Turf.</span>
          <span className="gradient-text block">Flawless Results.</span>
        </h1>

        <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl">
          Miguel Marquez and the Top Notch Artificial Turf team deliver precision, premium materials, and 13+ years of mastery to every installation across Southern California.
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
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
            style={{ borderColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" }}
          >
            📞 (714) 269-3329
          </a>
        </div>

        {/* Brand row */}
        <div className="pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-white/25 text-xs font-black uppercase tracking-widest mb-3">Authorized Installer</p>
          <div className="flex flex-wrap gap-3">
            {["Tiger Turf", "Shaw Flooring", "Festival Turf"].map((brand) => (
              <div
                key={brand}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.1)",
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

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
        <div className="w-5 h-8 border rounded-full flex items-start justify-center pt-1.5" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
          <div className="w-1 h-2 bg-emerald-400/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
