export default function About() {
  return (
    <section id="about" className="py-24 bg-[#f8faf8]">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-[#1B6B45]/10 text-[#1B6B45] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              About Us
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
              Local, Experienced,<br />
              <span className="text-[#1B6B45]">Dedicated to Quality.</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Hi, I'm Miguel Marquez, founder of Top Notch Turf. I've been installing artificial turf across Anaheim and Orange County for over 13 years, and I take every project personally.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We're proud authorized installers for three of the best turf brands in the industry — Tiger Turf, Shaw Flooring, and Festival Turf. That means you get access to premium, warrantied products backed by our own craftsmanship guarantee.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { brand: "Tiger Turf", tagline: "Premium Grade" },
                { brand: "Shaw Flooring", tagline: "Commercial Quality" },
                { brand: "Festival Turf", tagline: "Residential Favorite" },
              ].map((b) => (
                <div key={b.brand} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                  <div className="w-10 h-10 bg-[#1B6B45]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-[#1B6B45] font-black text-sm">{b.brand[0]}</span>
                  </div>
                  <p className="font-bold text-sm text-gray-900">{b.brand}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{b.tagline}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:7142693329"
                className="px-7 py-3.5 bg-[#1B6B45] hover:bg-[#145536] text-white font-bold rounded-full transition-colors"
              >
                Call Miguel Directly
              </a>
              <a
                href="#estimate"
                className="px-7 py-3.5 border-2 border-[#1B6B45] text-[#1B6B45] font-bold rounded-full hover:bg-[#1B6B45]/5 transition-colors"
              >
                Free Estimate
              </a>
            </div>
          </div>

          {/* Visual panel */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#1B6B45] to-[#2d8a60] flex items-center justify-center shadow-2xl">
              <div className="text-center text-white p-10">
                <div className="text-8xl mb-4">🌿</div>
                <div className="text-5xl font-black mb-2">13+</div>
                <div className="text-xl font-bold text-white/80">Years of Craftsmanship</div>
                <div className="mt-6 pt-6 border-t border-white/20 text-white/70 text-sm">
                  Anaheim, CA · Orange County
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#E8652A] text-white rounded-2xl px-6 py-4 shadow-xl">
              <div className="text-3xl font-black">500+</div>
              <div className="text-sm font-medium text-white/90">Projects Complete</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-5 py-3 shadow-lg border border-gray-100">
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">★</span>)}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">5-Star Rated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
