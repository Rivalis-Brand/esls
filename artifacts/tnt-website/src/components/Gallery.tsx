import img0 from "@assets/image0_1776027888651.jpeg";
import img1 from "@assets/image1_1776027888724.jpeg";
import img2 from "@assets/image2_1776027888794.jpeg";
import img3 from "@assets/image3_1776027888833.jpeg";
import img4 from "@assets/image4_1776027888857.jpeg";
import img5 from "@assets/image5_1776027888881.jpeg";
import img6 from "@assets/image6_1776027888905.jpeg";

const photos = [
  { src: img0, label: "Custom Putting Green", tag: "Putting Green", span: "col-span-1 row-span-2" },
  { src: img1, label: "Residential Front Yard", tag: "Residential", span: "col-span-1" },
  { src: img2, label: "Pool Surround", tag: "Pool Area", span: "col-span-1" },
  { src: img3, label: "Front Yard Patio", tag: "Residential", span: "col-span-1" },
  { src: img4, label: "Lawn Install", tag: "Residential", span: "col-span-1" },
  { src: img5, label: "Backyard Oasis", tag: "Backyard", span: "col-span-1" },
  { src: img6, label: "Full Backyard", tag: "Backyard", span: "col-span-1" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-28 relative overflow-hidden" style={{ background: "#040a14" }}>
      {/* Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #10b981, transparent 70%)", filter: "blur(80px)" }} />

      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", color: "#a78bfa" }}
          >
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            Real Projects · Southern California
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Our Work Speaks{" "}
            <span className="gradient-text">For Itself</span>
          </h2>
          <p className="text-white/35 text-lg mt-4 max-w-md mx-auto">
            Every photo is a real job completed by the Top Notch Artificial Turf team.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[220px]">
          {photos.map((p, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${p.span}`}
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <img
                src={p.src}
                alt={p.label}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
              />
              {/* Permanent subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(to top, rgba(4,10,20,0.85), rgba(16,185,129,0.1) 50%, transparent)" }}
              />

              {/* Tag top-left */}
              <div className="absolute top-3 left-3">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
                  style={{ background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  {p.tag}
                </span>
              </div>

              {/* Label bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-black text-white text-sm">{p.label}</p>
                <p className="text-xs text-emerald-400 font-semibold mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  Top Notch Artificial Turf ✓
                </p>
              </div>

              {/* Bottom gradient glow line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, #10b981, #3b82f6)" }}
              />
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#estimate"
            className="inline-flex items-center gap-2.5 px-10 py-4 text-white font-black text-base rounded-full transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
              boxShadow: "0 8px 40px rgba(16,185,129,0.35)"
            }}
          >
            Start Your Project →
          </a>
        </div>
      </div>
    </section>
  );
}
