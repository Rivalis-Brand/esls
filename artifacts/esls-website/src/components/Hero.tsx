import { motion } from "framer-motion";
import { Phone, Calculator, ChevronDown } from "lucide-react";
import heroImg from "@assets/IMG_20260406_190248_1775657876475.jpeg";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Southern California's Premier Turf Installers
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6 tracking-tight">
            Transform Your Yard Into
            <br />
            <span className="text-gradient">a Luxury Outdoor</span>
            <br />
            Experience
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4 leading-relaxed font-light">
            Premium artificial turf installation & custom putting greens.
            Zero maintenance. Lasting beauty. Unmatched craftsmanship.
          </p>

          <p className="text-base text-green-400 font-semibold tracking-wide mb-10">
            Festival Turf · Tiger Turf · Shaw Flooring — Top Brands Installed Right
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#estimator"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full text-lg font-bold tracking-wide transition-all duration-200 shadow-2xl shadow-green-900/50 hover:shadow-green-500/40"
            >
              <Calculator size={20} />
              Get Free Estimate
            </motion.a>
            <motion.a
              href="tel:7142538124"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full text-lg font-bold tracking-wide transition-all duration-200"
            >
              <Phone size={20} />
              Call Now: 714-253-8124
            </motion.a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm font-semibold tracking-wider uppercase">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Free Estimates
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Licensed & Insured
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span> 5-Star Rated
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Residential & Commercial
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors"
      >
        <ChevronDown size={32} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
