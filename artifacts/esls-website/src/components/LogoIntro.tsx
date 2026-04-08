import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@assets/IMG_20260406_190242_1775657876475.jpeg";

export default function LogoIntro() {
  const [phase, setPhase] = useState<"hold" | "slam" | "done">("hold");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("slam"), 1400);
    const t2 = setTimeout(() => setPhase("done"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
        animate={{ opacity: phase === "slam" ? 0 : 1 }}
        transition={{ duration: 0.5, delay: phase === "slam" ? 0.45 : 0 }}
      >
        <motion.div
          className="flex flex-col items-center gap-5"
          animate={
            phase === "slam"
              ? {
                  position: "absolute",
                  left: 16,
                  top: 14,
                  x: 0,
                  y: 0,
                  scale: 0.28,
                  transformOrigin: "top left",
                }
              : {}
          }
          transition={
            phase === "slam"
              ? { type: "spring", stiffness: 500, damping: 32, mass: 0.8 }
              : {}
          }
        >
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.15 }}
          >
            <div className="absolute inset-0 rounded-full bg-green-500/40 blur-2xl scale-125 animate-pulse" />
            <img
              src={logoImg}
              alt="Elite Synthetic Lawn Solutions"
              className="relative w-44 h-44 rounded-full object-cover border-4 border-green-500 shadow-2xl shadow-green-500/60"
            />
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.55 }}
          >
            <div className="text-white font-black text-4xl tracking-widest uppercase leading-none">
              Elite Synthetic
            </div>
            <div className="text-green-400 text-lg tracking-wider uppercase font-semibold mt-1">
              Lawn Solutions & Putting Greens
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
