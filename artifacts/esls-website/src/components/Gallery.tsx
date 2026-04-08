import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "@assets/IMG_20260406_190224_1775657876475.jpeg";
import img2 from "@assets/IMG_20260406_190228_1775657876475.jpeg";
import img3 from "@assets/IMG_20260406_190231_1775657876475.jpeg";
import img4 from "@assets/IMG_20260406_190234_1775657876475.jpeg";
import img5 from "@assets/IMG_20260406_190238_1775657876475.jpeg";
import img6 from "@assets/IMG_20260406_190242_1775657876475.jpeg";
import img7 from "@assets/IMG_20260406_190245_1775657876475.jpeg";
import img8 from "@assets/IMG_20260406_190248_1775657876475.jpeg";
import img9 from "@assets/IMG_20260406_190252_1775657876475.jpeg";
import img10 from "@assets/IMG_20260406_190255_1775657876475.jpeg";
import img11 from "@assets/IMG_20260406_190258_1775657876475.jpeg";
import img12 from "@assets/IMG_20260406_190301_1775657876475.jpeg";
import img13 from "@assets/Installing_artificial_turf_for_a_backyard_1775657908509.png";

const images = [
  { src: img1, label: "Luxury Lawn with Palms" },
  { src: img2, label: "Putting Green & Pool Area" },
  { src: img3, label: "Sports Turf Installation" },
  { src: img4, label: "Front Yard Transformation" },
  { src: img5, label: "Night-Lit Sports Complex" },
  { src: img6, label: "Elite Company Logo" },
  { src: img7, label: "Commercial Dog Park" },
  { src: img8, label: "Luxury Putting Green" },
  { src: img9, label: "Residential Putting Green" },
  { src: img10, label: "Hardscape & Turf Combo" },
  { src: img11, label: "Sunset Turf Garden" },
  { src: img12, label: "Stone Wall & Turf" },
  { src: img13, label: "Professional Installation" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevImg = () => setLightbox((l) => (l !== null ? (l - 1 + images.length) % images.length : null));
  const nextImg = () => setLightbox((l) => (l !== null ? (l + 1) % images.length : null));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
    }
  };

  return (
    <section id="gallery" className="section-padding bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-600/15 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6">
            Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Real Projects. <span className="text-gradient">Real Results.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Every project is a testament to our commitment to quality. Swipe through our portfolio of completed installations.
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-black/80 hover:bg-green-600 border border-white/20 text-white p-3 rounded-full transition-all duration-200 shadow-xl hidden md:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
          >
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-none w-72 md:w-80 snap-start cursor-pointer group"
                onClick={() => openLightbox(idx)}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-semibold text-sm">{img.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-black/80 hover:bg-green-600 border border-white/20 text-white p-3 rounded-full transition-all duration-200 shadow-xl hidden md:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              onClick={closeLightbox}
            >
              <X size={28} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 rounded-full"
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
            >
              <ChevronLeft size={24} />
            </button>
            <motion.img
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[lightbox].src}
              alt={images[lightbox].label}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 rounded-full"
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightbox + 1} / {images.length} — {images[lightbox].label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
