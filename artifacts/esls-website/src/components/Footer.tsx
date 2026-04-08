import { Phone, Mail, Instagram, Star } from "lucide-react";
import logoImg from "@assets/IMG_20260406_190242_1775657876475.jpeg";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImg} alt="Logo" className="w-12 h-12 rounded-full object-cover border-2 border-green-500" />
              <div>
                <div className="text-white font-black text-sm uppercase tracking-widest">Elite Synthetic</div>
                <div className="text-green-400 text-xs uppercase tracking-wider">Lawn Solutions & Putting Greens</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Southern California's premier artificial turf and putting green installation company. Serving the region with premium materials and expert craftsmanship.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li>Artificial Turf Installation</li>
              <li>Custom Putting Greens</li>
              <li>Irrigation Systems</li>
              <li>Hardscapes & Softscapes</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:7142538124" className="flex items-center gap-3 text-white/70 hover:text-green-400 transition-colors text-sm">
                <Phone size={14} className="text-green-400 flex-shrink-0" />
                714-253-8124
              </a>
              <a href="mailto:elitesyntheticlawnsolutions@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-green-400 transition-colors text-sm break-all">
                <Mail size={14} className="text-green-400 flex-shrink-0" />
                elitesyntheticlawnsolutions@gmail.com
              </a>
              <a href="https://www.instagram.com/elite_synthetic_lawns" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-green-400 transition-colors text-sm">
                <Instagram size={14} className="text-green-400 flex-shrink-0" />
                @elite_synthetic_lawns
              </a>
              <a href="https://www.yelp.com/biz/elite-synthetic-lawn-solutions-fullerton" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-green-400 transition-colors text-sm">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="text-[#d32323] fill-[#d32323]" size={10} />)}
                </div>
                View on Yelp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2025 Elite Synthetic Lawn Solutions & Putting Greens. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/30 text-xs">
            <span>Licensed & Insured</span>
            <span>Serving Southern California</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-t border-white/10 p-3 md:hidden">
        <a
          href="tel:7142538124"
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-4 rounded-full font-bold text-base w-full transition-all"
        >
          <Phone size={18} />
          Call Now: 714-253-8124
        </a>
      </div>
    </footer>
  );
}
