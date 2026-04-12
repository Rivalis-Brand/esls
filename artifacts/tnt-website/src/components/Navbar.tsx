import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Estimate", href: "#estimate" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#060C1A]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-18 flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg"
            style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
          >
            TN
          </div>
          <div className="leading-none">
            <div className="font-black text-base tracking-tight text-white">
              Top Notch Artificial Turf
            </div>
            <div className="text-[10px] font-medium text-white/40 tracking-wider uppercase">
              Southern California
            </div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-semibold text-white/60 hover:text-white transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="tel:7142693329"
            className="ml-2 px-5 py-2.5 text-sm font-bold text-white rounded-full transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
          >
            Call Now
          </a>
        </div>

        <button className="md:hidden p-2 text-white/70" onClick={() => setOpen(!open)}>
          <div className="w-5 h-0.5 bg-white/60 mb-1.5" />
          <div className="w-5 h-0.5 bg-white/60 mb-1.5" />
          <div className="w-5 h-0.5 bg-white/60" />
        </button>
      </nav>

      {open && (
        <div
          className="md:hidden border-t border-white/5 px-5 py-5 space-y-3"
          style={{ background: "rgba(6,12,26,0.98)", backdropFilter: "blur(20px)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-semibold text-white/70 hover:text-white border-b border-white/5 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:7142693329"
            className="block w-full py-3.5 text-center text-white font-bold text-sm rounded-xl mt-3 shadow-lg"
            style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
          >
            Call (714) 269-3329
          </a>
        </div>
      )}
    </header>
  );
}
