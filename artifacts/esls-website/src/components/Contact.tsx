import { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Phone, Mail, MapPin, Send, CheckCircle, Instagram } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", details: "", availability: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await addDoc(collection(db, "inquiries"), {
        ...form,
        timestamp: serverTimestamp(),
      });
      setStatus("done");
      setForm({ name: "", phone: "", email: "", address: "", details: "", availability: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-600/15 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready to Transform <span className="text-gradient">Your Space?</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Request your free estimate today. Art will personally follow up within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-5">Contact Details</h3>
              <div className="space-y-4">
                <a href="tel:7142538124" className="flex items-center gap-4 group">
                  <div className="p-3 bg-green-600/20 rounded-xl border border-green-500/20 group-hover:bg-green-600/30 transition-colors">
                    <Phone className="text-green-400" size={18} />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-wide mb-0.5">Phone</div>
                    <div className="text-white font-bold text-lg group-hover:text-green-400 transition-colors">714-253-8124</div>
                  </div>
                </a>
                <a href="mailto:elitesyntheticlawnsolutions@gmail.com" className="flex items-center gap-4 group">
                  <div className="p-3 bg-green-600/20 rounded-xl border border-green-500/20 group-hover:bg-green-600/30 transition-colors">
                    <Mail className="text-green-400" size={18} />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-wide mb-0.5">Email</div>
                    <div className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors break-all">elitesyntheticlawnsolutions@gmail.com</div>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-600/20 rounded-xl border border-green-500/20">
                    <MapPin className="text-green-400" size={18} />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-wide mb-0.5">Area</div>
                    <div className="text-white font-semibold text-sm">Serving Southern California</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/elite_synthetic_lawns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 flex-1 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-pink-500/50 rounded-xl p-4 transition-all"
                >
                  <Instagram className="text-pink-400" size={20} />
                  <div>
                    <div className="text-white font-bold text-sm">Instagram</div>
                    <div className="text-white/50 text-xs">@elite_synthetic_lawns</div>
                  </div>
                </a>
                <a
                  href="https://www.yelp.com/biz/elite-synthetic-lawn-solutions-fullerton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 flex-1 bg-[#d32323]/10 border border-[#d32323]/30 hover:border-[#d32323]/60 rounded-xl p-4 transition-all"
                >
                  <span className="text-[#d32323] font-black text-xl">y</span>
                  <div>
                    <div className="text-white font-bold text-sm">Yelp</div>
                    <div className="text-white/50 text-xs">5 Stars</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Free Estimates", icon: "✓" },
                  { label: "Licensed & Insured", icon: "✓" },
                  { label: "Same-Week Service", icon: "✓" },
                  { label: "Warranty Included", icon: "✓" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="text-green-400 font-bold">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 md:p-8 green-glow">
              {status === "done" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-600/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="text-green-400" size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Request Received!</h3>
                  <p className="text-white/60 max-w-sm mx-auto">Art will personally reach out to you within 24 hours to schedule your free estimate.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-white/40 hover:text-white/60 text-sm underline transition-colors"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-black text-white mb-6">Request Free Estimate</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Full Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange} placeholder="John Smith"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors text-sm" />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Phone *</label>
                      <input name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="(714) 555-0000"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@email.com"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors text-sm" />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Project Address</label>
                    <input name="address" value={form.address} onChange={handleChange} placeholder="123 Main St, Fullerton, CA"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors text-sm" />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Project Details</label>
                    <textarea name="details" rows={4} value={form.details} onChange={handleChange} placeholder="Describe your project — type of turf, putting green, area size, any specific requirements..."
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors text-sm resize-none" />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Your Availability</label>
                    <input name="availability" value={form.availability} onChange={handleChange} placeholder="e.g. Weekday mornings, Saturdays"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors text-sm" />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm">Something went wrong. Please call us directly at 714-253-8124.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-200 shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-3"
                  >
                    <Send size={18} />
                    {status === "submitting" ? "Sending..." : "Submit Request"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
