export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-[#1B6B45] rounded-xl flex items-center justify-center text-white font-black text-sm">
                TN
              </div>
              <div>
                <div className="font-black text-base">Top Notch Turf</div>
                <div className="text-xs text-gray-500">Anaheim, CA</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium artificial turf installation by Miguel Marquez. Serving Anaheim and all of Orange County for 13+ years.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-4">Services</h4>
            <ul className="space-y-2.5">
              {["Residential Lawns", "Putting Greens", "Pet Turf", "Commercial Turf", "Pool Surrounds", "Sports Areas"].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:7142693329" className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors">
                <span className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">📞</span>
                (714) 269-3329
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">📍</span>
                Anaheim, CA · Orange County
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">🕐</span>
                Mon–Sat: 7am – 6pm
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs text-gray-600 mb-3 uppercase tracking-widest font-semibold">Authorized Installer</p>
              <div className="flex flex-wrap gap-2">
                {["Tiger Turf", "Shaw Flooring", "Festival Turf"].map((b) => (
                  <span key={b} className="px-3 py-1 bg-gray-800 text-xs text-gray-300 rounded-full border border-gray-700">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2025 Top Notch Turf · Anaheim, CA · All rights reserved
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Estimate calculator powered by{" "}
            <span className="text-gray-400 font-semibold">Rivalis Computer Vision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
