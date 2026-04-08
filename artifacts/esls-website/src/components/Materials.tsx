import { motion } from "framer-motion";
import installImg from "@assets/Installing_artificial_turf_for_a_backyard_1775657908509.png";

const brands = [
  {
    name: "Festival Turf",
    desc: "Industry-leading manufacturer with 30+ years of innovation. Known for exceptional softness and natural appearance across residential and commercial applications.",
    specs: ["Ultra-soft fibers", "UV-stabilized", "Drainage system integrated"],
  },
  {
    name: "Tiger Turf",
    desc: "Globally recognized brand trusted for durability in high-traffic areas. Engineered for sports fields and demanding residential use.",
    specs: ["Heavy-traffic rated", "Multi-sport capable", "Eco-friendly production"],
  },
  {
    name: "Shaw Flooring Turf",
    desc: "Shaw's premium artificial grass line brings flooring engineering expertise to outdoor turf, delivering unmatched fiber quality and longevity.",
    specs: ["Stain resistant", "15-year warranty", "High-density backing"],
  },
];

export default function Materials() {
  return (
    <section className="section-padding bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-600/15 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6">
            Only The Best
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Premium Turf Brands <span className="text-gradient">We Install</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We don't cut corners on materials. Every installation uses top-tier turf from trusted brands known for quality, durability, and realistic appearance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-300 font-black text-lg">{brand.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{brand.name}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-3">{brand.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {brand.specs.map((spec) => (
                        <span key={spec} className="bg-green-600/15 border border-green-500/25 text-green-400 text-xs px-3 py-1 rounded-full font-semibold">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={installImg}
                alt="Professional turf installation"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card rounded-xl p-5">
                  <div className="text-white font-bold mb-1">Professional Installation</div>
                  <div className="text-white/60 text-sm">Every installation is handled by our expert team with years of hands-on experience.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "No Watering", icon: "💧", desc: "Save thousands in water bills annually" },
              { label: "No Mowing", icon: "🌿", desc: "Eliminate maintenance forever" },
              { label: "Pet Safe", icon: "🐾", desc: "Safe infill options for pets" },
              { label: "Eco-Friendly", icon: "♻️", desc: "Reduce water usage by 70%" },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-2xl p-5 text-center hover:border-green-500/30 transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-white font-bold text-sm mb-1">{item.label}</div>
                <div className="text-white/50 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
