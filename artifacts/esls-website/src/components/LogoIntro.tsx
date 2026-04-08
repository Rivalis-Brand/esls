import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@assets/IMG_20260406_190242_1775657876475.jpeg";

type Phase = "appear" | "putter" | "roll" | "done";

export default function LogoIntro() {
  const [phase, setPhase] = useState<Phase>("appear");
  const [target, setTarget] = useState({ x: 0, y: 0, rot: -720 });

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Navbar logo sits at roughly (56px, 40px) from viewport top-left
    const navX = 56;
    const navY = 40;
    const deltaX = navX - w / 2;
    const deltaY = navY - h / 2;
    // Rolling rotation: circumference of 176px ball over the distance
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const rot = -((dist / 88) * (180 / Math.PI));
    setTarget({ x: deltaX, y: deltaY, rot });

    const t1 = setTimeout(() => setPhase("putter"), 2000);
    const t2 = setTimeout(() => setPhase("roll"), 3200);
    const t3 = setTimeout(() => setPhase("done"), 5400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[300] bg-black overflow-hidden"
      animate={{ opacity: phase === "roll" ? 0 : 1 }}
      transition={{ duration: 1.0, delay: phase === "roll" ? 1.2 : 0 }}
    >
      {/* Subtle green turf lines */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(34,197,94,0.3) 80px, rgba(34,197,94,0.3) 82px)",
        }}
      />

      {/* Company name — visible during appear + putter, fades out before roll */}
      <AnimatePresence>
        {(phase === "appear" || phase === "putter") && (
          <motion.div
            className="absolute left-0 right-0 text-center pointer-events-none"
            style={{ top: "60%" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, delay: phase === "appear" ? 0.4 : 0 }}
          >
            <div className="text-white font-black text-5xl tracking-widest uppercase leading-none drop-shadow-2xl"
              style={{ textShadow: "0 0 40px rgba(34,197,94,0.6), 0 2px 8px rgba(0,0,0,0.8)" }}>
              Elite Synthetic
            </div>
            <div className="text-green-400 font-bold text-xl tracking-wider uppercase mt-3"
              style={{ textShadow: "0 0 20px rgba(34,197,94,0.8)" }}>
              Lawn Solutions & Putting Greens
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Putter — swings in from back-swing position */}
      <AnimatePresence>
        {phase === "putter" && (
          <motion.div
            className="fixed pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: 72,
              marginTop: -150,
              transformOrigin: "50% 0%",
            }}
            initial={{ rotate: 52 }}
            animate={{ rotate: -18 }}
            transition={{ duration: 0.65, ease: [0.55, 0, 0.45, 1] }}
          >
            {/* Shaft */}
            <div
              className="mx-auto rounded-full"
              style={{
                width: 5,
                height: 148,
                background: "linear-gradient(to bottom, #e5e7eb, #9ca3af)",
              }}
            />
            {/* Putter head */}
            <div
              className="rounded"
              style={{
                width: 38,
                height: 10,
                marginLeft: -17,
                marginTop: 2,
                background: "linear-gradient(to bottom, #e5e7eb, #6b7280)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ball / Logo — starts centered, then rolls to corner */}
      <motion.div
        className="fixed"
        style={{
          top: "50%",
          left: "50%",
          width: 176,
          height: 176,
          marginTop: -88,
          marginLeft: -88,
        }}
        animate={
          phase === "roll"
            ? {
                x: target.x,
                y: target.y,
                scale: 0.27,
                rotate: target.rot,
              }
            : phase === "putter"
            ? { x: 0, y: 0, scale: 1, rotate: 0 }
            : {}
        }
        transition={
          phase === "roll"
            ? {
                duration: 1.9,
                ease: [0.2, 0.8, 0.6, 1],
                rotate: { duration: 1.9, ease: "easeIn" },
                scale: { duration: 1.9, ease: "easeIn" },
              }
            : {}
        }
      >
        {/* Entrance bounce */}
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 0, y: 80, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 13, delay: 0.12 }}
        >
          {/* Green glow halo */}
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500/50 blur-2xl scale-125"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Logo */}
          <img
            src={logoImg}
            alt="Elite Synthetic Lawn Solutions"
            className="relative w-full h-full rounded-full object-cover border-4 border-green-500 shadow-2xl shadow-green-500/60"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* Impact flash when putter hits */}
      <AnimatePresence>
        {phase === "putter" && (
          <motion.div
            className="fixed rounded-full bg-green-400/30 pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              width: 176,
              height: 176,
              marginTop: -88,
              marginLeft: -88,
            }}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: [0, 0.6, 0], scale: [1, 1.4, 1.8] }}
            transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
