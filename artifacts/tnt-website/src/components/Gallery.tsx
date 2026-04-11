const placeholders = [
  { label: "Backyard Lawn", tag: "Residential" },
  { label: "Putting Green", tag: "Putting Green" },
  { label: "Front Yard", tag: "Residential" },
  { label: "Pool Surround", tag: "Pool Area" },
  { label: "Dog Run", tag: "Pet Turf" },
  { label: "Commercial Property", tag: "Commercial" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-14">
          <div className="inline-block bg-[#1B6B45]/10 text-[#1B6B45] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            See the Difference
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-md mx-auto">
            Real projects from right here in Orange County. Photos coming soon — check back shortly.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholders.map((p, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] bg-gradient-to-br from-[#e8f5ee] to-[#d4ede0] rounded-2xl overflow-hidden border border-[#1B6B45]/10 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-60 group-hover:opacity-80 transition-opacity">
                <div className="text-5xl">🌿</div>
                <div className="text-center px-4">
                  <p className="text-[#1B6B45] font-black text-base">{p.label}</p>
                  <p className="text-[#1B6B45]/60 text-xs mt-1">Photo Coming Soon</p>
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <span className="bg-white/80 backdrop-blur-sm text-[#1B6B45] text-xs font-bold px-3 py-1 rounded-full border border-[#1B6B45]/20">
                  {p.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Job photos being added shortly — follow us on social for project updates
        </p>

        <div className="mt-10 text-center">
          <a
            href="#estimate"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1B6B45] hover:bg-[#145536] text-white font-black text-base rounded-full transition-all shadow-lg"
          >
            Start Your Project →
          </a>
        </div>
      </div>
    </section>
  );
}
