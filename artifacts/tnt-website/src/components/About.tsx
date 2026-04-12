import img5 from "@assets/image5_1776027888881.jpeg";

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #050e18 0%, #040a14 100%)" }}>
      {/* Background orb */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)", filter: "blur(100px)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #10b981, transparent 70%)", filter: "blur(80px)", transform: "translate(-30%, 30%)" }} />

      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#60a5fa" }}
            >
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              About Us
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Local Expertise,<br />
              <span style={{
                background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                Royal Results.
              </span>
            </h2>

            <p className="text-white/50 text-lg leading-relaxed mb-5">
              I'm Miguel Marquez, founder of Top Notch Artificial Turf. For over 13 years I've been bringing premium-grade turf installations to Anaheim and all of Southern California — one meticulous project at a time.
            </p>
            <p className="text-white/35 leading-relaxed mb-10">
              We're proud authorized installers for three of the finest turf brands in the business. That means access to warrantied, premium product backed by our own craftsmanship guarantee.
            </p>

            {/* Brand cards */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              {[
                { brand: "Tiger Turf", tagline: "Premium Grade", color: "linear-gradient(135deg, #10b981, #3b82f6)" },
                { brand: "Shaw Flooring", tagline: "Commercial", color: "linear-gradient(135deg, #3b82f6, #6366f1)" },
                { brand: "Festival Turf", tagline: "Residential", color: "linear-gradient(135deg, #6366f1, #10b981)" },
              ].map((b) => (
                <div
                  key={b.brand}
                  className="rounded-xl p-4 text-center transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)"
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2.5 font-black text-white text-sm"
                    style={{ background: b.color }}
                  >
                    {b.brand[0]}
                  </div>
                  <p className="font-bold text-xs text-white/80">{b.brand}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{b.tagline}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:7142693329"
                className="px-7 py-3.5 text-white font-black rounded-full transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)", boxShadow: "0 6px 30px rgba(16,185,129,0.35)" }}
              >
                Call Miguel Directly
              </a>
              <a
                href="#estimate"
                className="px-7 py-3.5 font-bold rounded-full transition-all hover:bg-white/5 text-white/65 hover:text-white"
                style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              >
                Free Estimate
              </a>
            </div>
          </div>

          {/* Real project photo */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl opacity-50 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.3), transparent 70%)", filter: "blur(40px)", transform: "scale(1.05)" }} />

            <div className="relative rounded-3xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.09)", boxShadow: "0 24px 80px rgba(0,0,0,0.7)" }}>
              <img
                src={img5}
                alt="Beautiful backyard turf installation"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(4,10,20,0.85) 0%, rgba(4,10,20,0.1) 50%, transparent 100%)" }} />

              {/* Bottom text */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-black text-sm">Backyard Transformation</p>
                <p className="text-emerald-400 text-xs font-semibold mt-0.5">Southern California · Completed 2024</p>
              </div>
            </div>

            {/* Floating stats badge */}
            <div
              className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-4 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)", boxShadow: "0 12px 40px rgba(16,185,129,0.4)" }}
            >
              <div className="text-3xl font-black text-white">1,000+</div>
              <div className="text-sm font-semibold text-white/80">Projects Completed</div>
            </div>

            <div
              className="absolute -top-4 -right-4 rounded-2xl px-5 py-3 shadow-xl"
              style={{ background: "rgba(6,12,26,0.9)", backdropFilter: "blur(20px)", border: "1px solid rgba(16,185,129,0.25)" }}
            >
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">★</span>)}
              </div>
              <div className="text-xs text-white/50 font-semibold mt-0.5">5-Star Rated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
