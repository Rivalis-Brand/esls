import { motion } from "framer-motion";
import { Phone, Calculator } from "lucide-react";
import bannerImg from "@assets/IMG_20260406_190255_1775657876475.jpeg";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden py-24 px-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImg})` }}
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-black/50" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <div className="text-green-400 text-xs font-bold tracking-widest uppercase mb-4">Limited Spots Available</div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Your Dream Lawn <span className="text-gradient">Is One Call Away</span>
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Don't spend another summer fighting dead grass and water bills. Get a free on-site estimate and see exactly what your transformation will look like.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="tel:7142538124"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full text-lg font-bold tracking-wide transition-all shadow-2xl shadow-green-900/60"
          >
            <Phone size={20} />
            Call 714-253-8124
          </motion.a>
          <motion.a
            href="#estimator"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full text-lg font-bold tracking-wide transition-all"
          >
            <Calculator size={20} />
            Get Free Estimate
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
