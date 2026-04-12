import { useState, useEffect } from "react";
import logoImg from "@assets/Vibrant_logo_for_Top_Notch_Turf_2_1776027888982.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(4,10,20,0.95)"
          : "rgba(4,10,20,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(16,185,129,0.15)" : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.6)" : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-5 flex items-center justify-between py-2">
        {/* Always-visible logo */}
        <a href="#" className="flex items-center group flex-shrink-0">
          <img
            src={logoImg}
            alt="Top Notch Artificial Turf"
            className="h-16 w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-semibold text-white/60 hover:text-white transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="tel:7142693329"
            className="ml-1 px-5 py-2.5 text-sm font-black text-white rounded-full transition-all hover:-translate-y-0.5 hover:shadow-emerald-500/30"
            style={{
              background: "linear-gradient(135deg, #10b981, #3b82f6)",
              boxShadow: "0 4px 16px rgba(16,185,129,0.3)"
            }}
          >
            📞 Call Now
          </a>
        </div>

        <button
          className="md:hidden p-2.5 rounded-lg"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className={`w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
          <div className={`w-5 h-0.5 bg-white my-1 transition-all ${open ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </nav>

      {open && (
        <div
          className="md:hidden px-5 py-5 space-y-1"
          style={{ background: "rgba(4,10,20,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-sm font-semibold text-white/60 hover:text-white border-b transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              <span className="w-1 h-1 rounded-full bg-emerald-500/60" />
              {l.label}
            </a>
          ))}
          <a
            href="tel:7142693329"
            className="flex items-center justify-center gap-2 w-full py-3.5 text-center text-white font-black text-sm rounded-xl mt-3"
            style={{
              background: "linear-gradient(135deg, #10b981, #3b82f6)",
              boxShadow: "0 4px 20px rgba(16,185,129,0.3)"
            }}
          >
            📞 Call (714) 269-3329
          </a>
        </div>
      )}
    </header>
  );
}
