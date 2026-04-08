import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import logoImg from "@assets/IMG_20260406_190242_1775657876475.jpeg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Estimator", href: "#estimator" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        <a href="#hero" className="flex items-center gap-3">
          <img src={logoImg} alt="Elite Synthetic Lawn Solutions" className="h-12 w-12 rounded-full object-cover border-2 border-green-500" />
          <div className="hidden sm:block">
            <div className="company-name-shimmer font-black text-sm leading-none tracking-widest uppercase">Elite Synthetic</div>
            <div className="text-green-400 text-xs leading-none tracking-wider uppercase font-semibold">Lawn Solutions & Putting Greens</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-green-400 text-sm font-semibold tracking-wider uppercase transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:7142538124"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30"
          >
            <Phone size={14} />
            714-253-8124
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white p-2"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/98 border-t border-white/10"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-green-400 text-base font-semibold tracking-wider uppercase transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:7142538124"
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full text-sm font-bold mt-2"
              >
                <Phone size={14} />
                Call Now: 714-253-8124
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
