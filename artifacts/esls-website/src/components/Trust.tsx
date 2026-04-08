import { motion } from "framer-motion";
import { Shield, Home, Building2, Award, Clock, ThumbsUp } from "lucide-react";
import heroImg2 from "@assets/IMG_20260406_190258_1775657876475.jpeg";

const trustItems = [
  { icon: Shield, title: "Free Estimates", desc: "No-pressure consultations with a detailed quote — always at no cost to you." },
  { icon: Home, title: "Residential Expert", desc: "Backyard lawns, front yards, pet areas, and putting greens for your home." },
  { icon: Building2, title: "Commercial Projects", desc: "Offices, HOAs, dog parks, sports facilities, and commercial properties." },
  { icon: Award, title: "Premium Materials Only", desc: "We only install the highest grade turf from top manufacturers." },
  { icon: Clock, title: "Fast Turnaround", desc: "Most residential projects completed in 1-3 days with minimal disruption." },
  { icon: ThumbsUp, title: "100% Satisfaction", desc: "We stand behind every installation with a comprehensive warranty." },
];

export default function Trust() {
  return (
    <section className="section-padding bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-green-600/15 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6">
              Why Choose Elite
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              The Standard Others <span className="text-gradient">Aspire To</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Art Silva started Elite Synthetic Lawn Solutions with one goal: deliver installations so beautiful that customers never have to second-guess their investment.
              That commitment drives every project we take on.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-3"
                  >
                    <div className="p-2 bg-green-600/15 rounded-lg border border-green-500/20 flex-shrink-0 h-fit mt-0.5">
                      <Icon className="text-green-400" size={16} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm mb-0.5">{item.title}</div>
                      <div className="text-white/50 text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:7142538124"
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full font-bold tracking-wide transition-all duration-200 text-sm"
              >
                Call for Free Estimate
              </a>
              <a
                href="#contact"
                className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full font-bold tracking-wide transition-all duration-200 text-sm"
              >
                Request Quote Online
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={heroImg2}
                alt="Beautiful synthetic lawn installation"
                className="w-full object-cover"
                style={{ maxHeight: "560px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-5 border-green-500/30">
              <div className="text-green-400 text-3xl font-black">500+</div>
              <div className="text-white/70 text-sm font-medium">Installations Completed</div>
            </div>
            <div className="absolute -top-4 -right-4 glass-card rounded-2xl p-5 border-green-500/30">
              <div className="text-green-400 text-3xl font-black">5★</div>
              <div className="text-white/70 text-sm font-medium">Average Rating</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
