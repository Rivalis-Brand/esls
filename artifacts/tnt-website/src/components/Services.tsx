const services = [
  {
    icon: "🏡",
    title: "Residential Lawns",
    desc: "Transform your front or backyard with premium artificial grass that stays green year-round. No watering, no mowing, no muddy paws.",
    features: ["Pet-friendly turf options", "Kid-safe surface", "Drought resistant"],
  },
  {
    icon: "⛳",
    title: "Putting Greens",
    desc: "Play tour-quality golf steps from your back door. We custom-build practice greens with precise ball roll and realistic texture.",
    features: ["Custom contours & breaks", "Fringe & chipping areas", "All skill levels"],
  },
  {
    icon: "🏢",
    title: "Commercial Turf",
    desc: "Curb appeal that makes a statement. Offices, retail centers, HOAs, and apartment communities trust us to keep it looking immaculate.",
    features: ["High-traffic durability", "Low maintenance", "HOA approved installs"],
  },
  {
    icon: "🐾",
    title: "Pet Turf",
    desc: "Specially selected turf with antimicrobial technology and excellent drainage — so your yard smells fresh and your pets stay happy.",
    features: ["Odor-neutralizing infill", "Easy to clean", "Safe for all breeds"],
  },
  {
    icon: "⚽",
    title: "Sports & Play Areas",
    desc: "From kids' play areas to bocce courts and sports practice zones, we install turf built to handle constant use.",
    features: ["Shock-absorbent padding", "Non-slip surface", "Customizable field markings"],
  },
  {
    icon: "🌊",
    title: "Pool Surrounds",
    desc: "Say goodbye to slippery concrete and muddy pool decks. Our non-slip turf creates a beautiful, comfortable poolside retreat.",
    features: ["Excellent drainage", "UV resistant", "Barefoot-friendly texture"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-14">
          <div className="inline-block bg-[#1B6B45]/10 text-[#1B6B45] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            What We Install
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Every Project, Done Right
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            From small patios to large commercial properties — we do it all with the same attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-white border border-gray-100 rounded-2xl p-7 hover:border-[#1B6B45]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-1.5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="w-4 h-4 rounded-full bg-[#1B6B45]/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#1B6B45]" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#estimate"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8652A] hover:bg-[#d4571f] text-white font-black text-base rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            Get Your Free Estimate →
          </a>
        </div>
      </div>
    </section>
  );
}
