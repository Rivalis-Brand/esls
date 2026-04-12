export default function Footer() {
  return (
    <footer style={{ background: "#020710", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm"
                style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
              >
                TN
              </div>
              <div>
                <div className="font-black text-base text-white">Top Notch Artificial Turf</div>
                <div className="text-xs text-white/30 tracking-wider">Anaheim, CA</div>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-6">
              Premium artificial turf installation by Miguel Marquez. Serving Anaheim and all of Southern California for 13+ years with precision and pride.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Tiger Turf", "Shaw Flooring", "Festival Turf"].map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 text-xs font-semibold rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.45)"
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-white/25 mb-5">Services</h4>
            <ul className="space-y-3">
              {["Residential Lawns", "Putting Greens", "Pet Turf", "Commercial Turf", "Pool Surrounds", "Sports Areas"].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-white/35 hover:text-white/70 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-emerald-500/50 rounded-full" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-white/25 mb-5">Contact</h4>
            <div className="space-y-4">
              {[
                { icon: "📞", text: "(714) 269-3329", href: "tel:7142693329", label: "Call Miguel" },
                { icon: "📍", text: "Anaheim, CA · Southern California", href: null, label: null },
                { icon: "🕐", text: "Mon–Sat: 7am – 6pm", href: null, label: null },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-white/50 hover:text-white transition-colors">{item.text}</a>
                  ) : (
                    <span className="text-sm text-white/35">{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            <a
              href="tel:7142693329"
              className="mt-8 flex items-center justify-center gap-2 w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #10b981, #3b82f6)",
                boxShadow: "0 4px 20px rgba(16,185,129,0.2)"
              }}
            >
              📞 Call Now — Free Quote
            </a>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs text-white/20">
            © 2025 Top Notch Artificial Turf · Anaheim, CA · All rights reserved
          </p>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <svg className="w-3.5 h-3.5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Estimate calculator powered by{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #34d399, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 700
              }}
            >
              Rivalis Computer Vision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
