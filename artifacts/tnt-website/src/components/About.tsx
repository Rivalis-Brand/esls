export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #050e18 0%, #040a14 100%)" }}>
      {/* Background orb */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)", filter: "blur(80px)", transform: "translate(30%, -30%)" }} />

      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#60a5fa" }}
            >
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              About Us
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Local Expertise,<br />
              <span className="gradient-text-gb">Royal Results.</span>
            </h2>

            <p className="text-white/50 text-lg leading-relaxed mb-5">
              I'm Miguel Marquez, founder of Top Notch Turf. For over 13 years I've been bringing premium-grade turf installations to Anaheim and all of Orange County — one meticulous project at a time.
            </p>
            <p className="text-white/40 leading-relaxed mb-10">
              We're proud authorized installers for three of the finest turf brands in the business. That means access to warrantied, premium product backed by our own craftsmanship guarantee.
            </p>

            {/* Brand cards */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              {[
                { brand: "Tiger Turf", tagline: "Premium Grade" },
                { brand: "Shaw Flooring", tagline: "Commercial" },
                { brand: "Festival Turf", tagline: "Residential" },
              ].map((b, i) => (
                <div
                  key={b.brand}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)"
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2.5 font-black text-white text-sm"
                    style={{ background: i === 0 ? "linear-gradient(135deg, #10b981, #3b82f6)" : i === 1 ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "linear-gradient(135deg, #6366f1, #10b981)" }}
                  >
                    {b.brand[0]}
                  </div>
                  <p className="font-bold text-xs text-white/80">{b.brand}</p>
                  <p className="text-[10px] text-white/35 mt-0.5">{b.tagline}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:7142693329"
                className="px-7 py-3.5 text-white font-bold rounded-full transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)", boxShadow: "0 6px 24px rgba(16,185,129,0.25)" }}
              >
                Call Miguel Directly
              </a>
              <a
                href="#estimate"
                className="px-7 py-3.5 font-bold rounded-full transition-all hover:bg-white/5 text-white/70"
                style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              >
                Free Estimate
              </a>
            </div>
          </div>

          {/* Visual panel */}
          <div className="relative">
            <div
              className="aspect-square rounded-3xl flex items-center justify-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #071a2e 0%, #051a12 100%)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0"
                style={{ background: "radial-gradient(circle at 50% 30%, rgba(16,185,129,0.15), transparent 60%)" }} />
              <div className="absolute inset-0"
                style={{ background: "radial-gradient(circle at 70% 70%, rgba(59,130,246,0.1), transparent 50%)" }} />

              <div className="relative text-center p-10">
                <div className="text-8xl mb-4 animate-float">🌿</div>
                <div
                  className="text-6xl font-black mb-2"
                  style={{
                    background: "linear-gradient(135deg, #34d399, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  13+
                </div>
                <div className="text-xl font-bold text-white/60">Years of Mastery</div>
                <div className="mt-6 pt-6 border-t border-white/10 text-white/30 text-sm">
                  Anaheim, CA · Orange County, CA
                </div>
              </div>
            </div>

            {/* Floating stats */}
            <div
              className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-4 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)", boxShadow: "0 8px 32px rgba(16,185,129,0.3)" }}
            >
              <div className="text-3xl font-black text-white">500+</div>
              <div className="text-sm font-medium text-white/80">Projects Completed</div>
            </div>

            <div
              className="absolute -top-4 -right-4 rounded-2xl px-5 py-3 shadow-xl"
              style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">★</span>)}
              </div>
              <div className="text-xs text-white/50 font-medium mt-0.5">5-Star Rated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
