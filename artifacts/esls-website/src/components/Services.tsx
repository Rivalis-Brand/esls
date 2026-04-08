import { motion } from "framer-motion";
import { Leaf, Flag, Droplets, Mountain } from "lucide-react";

const services = [
  {
    icon: Leaf,
    title: "Artificial Turf",
    description: "Premium synthetic grass that looks and feels like real turf. Perfect for lawns, play areas, and pet zones. Stays lush year-round with zero watering.",
    features: ["Residential & Commercial", "Pet-Safe Infill Available", "15+ Year Lifespan"],
    img: "/api/placeholder/400/300",
  },
  {
    icon: Flag,
    title: "Putting Greens",
    description: "Custom-designed backyard putting greens built to tour-quality standards. Improve your game from the comfort of your home.",
    features: ["Contoured Undulation", "Multiple Hole Configurations", "Fringe & Rough Areas"],
    img: "/api/placeholder/400/300",
  },
  {
    icon: Droplets,
    title: "Irrigation Systems",
    description: "Smart irrigation solutions that work with your turf installation for surrounding landscape beds, trees, and gardens.",
    features: ["Smart Controller Ready", "Water Conservation Focus", "Zone-Based Systems"],
    img: "/api/placeholder/400/300",
  },
  {
    icon: Mountain,
    title: "Hardscapes & Softscapes",
    description: "Complete outdoor transformations including pavers, retaining walls, stepping stones, and planted borders that complement your turf.",
    features: ["Custom Stone Work", "Retaining Walls", "Decorative Borders"],
    img: "/api/placeholder/400/300",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  return (
    <section id="services" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-600/15 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6">
            What We Do
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Expert Services for Every <span className="text-gradient">Outdoor Vision</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From a simple lawn upgrade to a complete backyard transformation — we bring your vision to life with premium materials and expert craftsmanship.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={item}
                className="glass-card rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-green-600/20 rounded-xl border border-green-500/20 group-hover:bg-green-600/30 transition-colors">
                    <Icon className="text-green-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                  </div>
                </div>
                <p className="text-white/60 leading-relaxed mb-5">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Projects Completed", value: "500+" },
            { label: "Years of Experience", value: "10+" },
            { label: "Customer Satisfaction", value: "100%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center glass-card rounded-2xl p-8">
              <div className="text-4xl font-black text-gradient mb-2">{stat.value}</div>
              <div className="text-white/60 font-medium tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
