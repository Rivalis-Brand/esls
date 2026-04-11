import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-[#1B6B45] rounded-xl flex items-center justify-center text-white font-black text-sm leading-none shadow-md group-hover:bg-[#145536] transition-colors">
            TN
          </div>
          <div className="leading-none">
            <div className={`font-black text-base tracking-tight transition-colors ${scrolled ? "text-[#1B6B45]" : "text-white"}`}>
              Top Notch Turf
            </div>
            <div className={`text-[10px] font-medium transition-colors ${scrolled ? "text-gray-400" : "text-white/70"}`}>
              Anaheim, CA
            </div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`text-sm font-semibold transition-colors ${
                scrolled ? "text-gray-600 hover:text-[#1B6B45]" : "text-white/90 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:7142693329"
            className="ml-2 px-5 py-2.5 bg-[#E8652A] hover:bg-[#d4571f] text-white text-sm font-bold rounded-full transition-colors shadow-sm"
          >
            Call Now
          </a>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className={`w-5 h-0.5 mb-1 transition-colors ${scrolled ? "bg-gray-700" : "bg-white"}`} />
          <div className={`w-5 h-0.5 mb-1 transition-colors ${scrolled ? "bg-gray-700" : "bg-white"}`} />
          <div className={`w-5 h-0.5 transition-colors ${scrolled ? "bg-gray-700" : "bg-white"}`} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-3 shadow-lg">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-semibold text-gray-700 hover:text-[#1B6B45]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:7142693329"
            className="block w-full py-3 text-center bg-[#E8652A] text-white font-bold text-sm rounded-xl mt-2"
          >
            Call (714) 269-3329
          </a>
        </div>
      )}
    </header>
  );
}
