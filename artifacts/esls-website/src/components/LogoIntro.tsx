import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import logoImg from "@assets/IMG_20260406_190242_1775657876475.jpeg";

type Phase = "appear" | "putter" | "roll" | "slam" | "cta" | "done";

const SOURCES = [
  "Google Search",
  "Instagram / Social Media",
  "Friend or Family Referral",
  "Yelp",
  "Saw a Project / Drove By",
  "Other",
];

export default function LogoIntro() {
  const [phase, setPhase] = useState<Phase>("appear");
  const [target, setTarget] = useState({ x: 0, y: 0, rot: -720 });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const navX = 56;
    const navY = 40;
    const deltaX = navX - w / 2;
    const deltaY = navY - h / 2;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const rot = -((dist / 88) * (180 / Math.PI));
    setTarget({ x: deltaX, y: deltaY, rot });

    const t1 = setTimeout(() => setPhase("putter"), 2000);
    const t2 = setTimeout(() => setPhase("roll"), 3200);
    const t3 = setTimeout(() => setPhase("slam"), 7000);
    const t4 = setTimeout(() => setPhase("cta"), 7800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!source) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "introLeads"), {
        name,
        phone,
        source,
        timestamp: new Date(),
      });
      setSubmitted(true);
      setTimeout(() => setPhase("done"), 1400);
    } catch {
      setSubmitting(false);
    }
  };

  const handleSkip = () => setPhase("done");

  if (phase === "done") return null;

  const isIntroPhase = phase === "appear" || phase === "putter" || phase === "roll";

  return (
    <motion.div
      className="fixed inset-0 z-[300] overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #0a1a0a 0%, #000000 100%)" }}
      animate={{ opacity: phase === "done" ? 0 : 1 }}
      transition={{ duration: 0.9 }}
    >
      {/* Turf stripe texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(34,197,94,0.3) 80px, rgba(34,197,94,0.3) 82px)",
        }}
      />

      {/* ── INTRO PHASES: appear / putter / roll ── */}
      <AnimatePresence>
        {isIntroPhase && (
          <motion.div
            key="intro-content"
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Company name during ball animation */}
            <motion.div
              className="absolute left-0 right-0 text-center pointer-events-none"
              style={{ top: "60%" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
            >
              <div
                className="text-white font-black text-5xl tracking-widest uppercase leading-none"
                style={{ textShadow: "0 0 40px rgba(34,197,94,0.6), 0 2px 8px rgba(0,0,0,0.8)" }}
              >
                Elite Synthetic
              </div>
              <div
                className="text-green-400 font-bold text-xl tracking-wider uppercase mt-3"
                style={{ textShadow: "0 0 20px rgba(34,197,94,0.8)" }}
              >
                Lawn Solutions & Putting Greens
              </div>
            </motion.div>

            {/* Putter */}
            <AnimatePresence>
              {phase === "putter" && (
                <motion.div
                  key="putter"
                  className="fixed pointer-events-none"
                  style={{ left: "50%", top: "50%", marginLeft: 72, marginTop: -150, transformOrigin: "50% 0%" }}
                  initial={{ rotate: 52 }}
                  animate={{ rotate: -18 }}
                  transition={{ duration: 0.65, ease: [0.55, 0, 0.45, 1] }}
                >
                  <div className="mx-auto rounded-full" style={{ width: 5, height: 148, background: "linear-gradient(to bottom, #e5e7eb, #9ca3af)" }} />
                  <div className="rounded" style={{ width: 38, height: 10, marginLeft: -17, marginTop: 2, background: "linear-gradient(to bottom, #e5e7eb, #6b7280)" }} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ball / Logo */}
            <motion.div
              className="fixed"
              style={{ top: "50%", left: "50%", width: 176, height: 176, marginTop: -88, marginLeft: -88 }}
              animate={
                phase === "roll"
                  ? { x: target.x, y: target.y, scale: 0.27, rotate: target.rot }
                  : phase === "putter"
                  ? { x: 0, y: 0, scale: 1, rotate: 0 }
                  : {}
              }
              transition={
                phase === "roll"
                  ? {
                      duration: 3.5,
                      ease: [0.85, 0, 0.15, 1],
                      rotate: { duration: 3.5, ease: [0.9, 0, 0.3, 1] },
                      scale: { duration: 3.5, ease: [0.9, 0, 0.1, 1] },
                    }
                  : {}
              }
            >
              <motion.div
                className="relative w-full h-full"
                initial={{ scale: 0, y: 80, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 13, delay: 0.12 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-500/50 blur-2xl scale-125"
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <img
                  src={logoImg}
                  alt="Elite Synthetic Lawn Solutions"
                  className="relative w-full h-full rounded-full object-cover border-4 border-green-500 shadow-2xl shadow-green-500/60"
                  draggable={false}
                />
              </motion.div>
            </motion.div>

            {/* Impact flash */}
            <AnimatePresence>
              {phase === "putter" && (
                <motion.div
                  key="impact"
                  className="fixed rounded-full bg-green-400/30 pointer-events-none"
                  style={{ top: "50%", left: "50%", width: 176, height: 176, marginTop: -88, marginLeft: -88 }}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: [0, 0.6, 0], scale: [1, 1.4, 1.8] }}
                  transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SLAM PHASE: company name crashes in ── */}
      <AnimatePresence>
        {(phase === "slam" || phase === "cta") && (
          <motion.div
            key="slam-name"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 1 }}
          >
            {/* Name slams in from above */}
            <motion.div
              className="text-center mb-10"
              initial={{ scale: 3, y: -120, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 28, delay: 0.05 }}
            >
              <div
                className="text-white font-black uppercase leading-none tracking-widest"
                style={{
                  fontSize: "clamp(2.2rem, 6vw, 5rem)",
                  textShadow: "0 0 60px rgba(34,197,94,0.7), 0 4px 16px rgba(0,0,0,0.9)",
                }}
              >
                Elite Synthetic
              </div>
              <div
                className="text-green-400 font-bold uppercase tracking-wider mt-2"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                  textShadow: "0 0 30px rgba(34,197,94,0.9)",
                }}
              >
                Lawn Solutions & Putting Greens
              </div>
              {/* Underline flash */}
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full mt-4 mx-auto"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "80%", opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              />
            </motion.div>

            {/* ── CTA FORM ── */}
            <AnimatePresence>
              {phase === "cta" && (
                <motion.div
                  key="cta-form"
                  className="w-full max-w-md"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                >
                  <div
                    className="rounded-2xl p-6 border border-green-500/30"
                    style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)" }}
                  >
                    {submitted ? (
                      <motion.div
                        className="text-center py-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="text-green-400 text-4xl mb-3">✓</div>
                        <div className="text-white font-bold text-lg">Thanks! Welcome to Elite Synthetic.</div>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="text-center mb-2">
                          <p className="text-white font-bold text-lg">Quick question before you explore!</p>
                          <p className="text-white/50 text-sm mt-1">How did you hear about us?</p>
                        </div>

                        {/* Source selector */}
                        <div className="grid grid-cols-2 gap-2">
                          {SOURCES.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSource(s)}
                              className={`text-xs font-semibold py-2.5 px-3 rounded-xl border transition-all duration-150 text-left ${
                                source === s
                                  ? "bg-green-600 border-green-500 text-white"
                                  : "bg-white/5 border-white/10 text-white/70 hover:border-green-500/50 hover:text-white"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>

                        {/* Name */}
                        <input
                          type="text"
                          placeholder="Your name (optional)"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-green-500"
                        />

                        {/* Phone */}
                        <input
                          type="tel"
                          placeholder="Phone number (optional)"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-green-500"
                        />

                        <button
                          type="submit"
                          disabled={!source || submitting}
                          className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200 tracking-wide"
                        >
                          {submitting ? "Saving..." : "Enter Site →"}
                        </button>

                        <button
                          type="button"
                          onClick={handleSkip}
                          className="w-full text-white/30 hover:text-white/60 text-xs transition-colors py-1"
                        >
                          Skip
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
