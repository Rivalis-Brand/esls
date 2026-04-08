import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  { name: "Maria Gonzalez", date: "March 2025", text: "Art and his crew did an absolutely stunning job on our backyard. The turf looks better than any real grass we've ever had. Zero maintenance and the kids love it. Highly recommend!", location: "Fullerton, CA" },
  { name: "Jason Park", date: "February 2025", text: "We got a custom putting green installed and couldn't be happier. My handicap has already dropped 3 strokes practicing at home. The quality of the install is impeccable.", location: "Anaheim, CA" },
  { name: "Sandra & Mike Torres", date: "January 2025", text: "From the estimate to the final walkthrough, everything was professional and on-time. Our front yard went from embarrassing to the nicest on the block overnight!", location: "Placentia, CA" },
  { name: "David Chen", date: "December 2024", text: "Transformed our commercial property with 3,200 sq ft of luxury turf. They handled the scale perfectly and finished ahead of schedule. Our tenants love it.", location: "Orange, CA" },
  { name: "Brittney Wallace", date: "November 2024", text: "I have two large dogs and was worried about the pet infill. It has been perfect — no odors, easy to clean, and the dogs are obsessed with it. Life changing!", location: "Yorba Linda, CA" },
  { name: "Robert Sanchez", date: "October 2024", text: "Elite installed turf and a 3-hole putting green in our backyard. The craftsmanship is incredible. Art personally oversaw every detail. Real pros.", location: "Brea, CA" },
  { name: "Lisa Nguyen", date: "September 2024", text: "We were quoted by 4 companies. Elite was not the cheapest but they were by far the most professional and the quality shows. Worth every penny.", location: "Tustin, CA" },
  { name: "Thomas Mitchell", date: "August 2024", text: "Our HOA board was skeptical about synthetic turf but the end result looks so natural they couldn't tell the difference at the inspection. Outstanding work.", location: "Laguna Hills, CA" },
  { name: "Alicia Flores", date: "July 2024", text: "Installed turf + hardscaping together and the design integration is seamless. It looks like it was planned by a landscape architect. Art has a real eye for design.", location: "Garden Grove, CA" },
  { name: "Kevin Reynolds", date: "June 2024", text: "Third project with Elite — always the same excellent standard. This time we did a sports area for the kids with custom markings. They absolutely nailed it.", location: "Irvine, CA" },
  { name: "Rachel Hoffman", date: "May 2024", text: "Completely transformed our rental property. The tenants are thrilled and we've eliminated water and lawn care costs entirely. Best investment we've made.", location: "Santa Ana, CA" },
  { name: "Carlos Medina", date: "April 2024", text: "I've seen a lot of turf installs that look fake up close. Elite's work genuinely fools people — the blade variety and infill makes it look 100% real. Incredible.", location: "Chino Hills, CA" },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const visibleCount = 3;

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  const visible = Array.from({ length: visibleCount }, (_, i) => reviews[(current + i) % reviews.length]);

  return (
    <section id="reviews" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-600/15 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6">
            What Customers Say
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Trusted by Hundreds of <span className="text-gradient">Happy Homeowners</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />)}
          </div>
          <p className="text-white/60">5.0 average across 200+ verified reviews</p>
        </motion.div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {visible.map((review, i) => (
              <motion.div
                key={`${current}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 relative"
              >
                <Quote className="text-green-500/30 mb-4" size={32} />
                <p className="text-white/75 text-sm leading-relaxed mb-5">{review.text}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="text-yellow-400 fill-yellow-400" size={12} />)}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{review.name}</div>
                  <div className="text-white/40 text-xs">{review.location} · {review.date}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button onClick={prev} className="bg-white/5 hover:bg-white/10 border border-white/15 text-white p-3 rounded-full transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? "w-8 h-2 bg-green-500" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="bg-white/5 hover:bg-white/10 border border-white/15 text-white p-3 rounded-full transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.yelp.com/biz/elite-synthetic-lawn-solutions-fullerton"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#d32323]/10 hover:bg-[#d32323]/20 border border-[#d32323]/40 text-white px-6 py-3 rounded-full transition-all duration-200"
          >
            <span className="text-[#d32323] font-black text-lg">Yelp</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="text-[#d32323] fill-[#d32323]" size={14} />)}
            </div>
            <span className="text-white/70 text-sm font-semibold">5.0 Stars on Yelp — Read All Reviews →</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
