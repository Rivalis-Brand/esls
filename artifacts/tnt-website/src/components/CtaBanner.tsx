export default function CtaBanner() {
  return (
    <section className="py-16 bg-[#E8652A]">
      <div className="max-w-4xl mx-auto px-5 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
          Ready for a Yard You Actually Love?
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Call Miguel today or fill out our quick estimate form. Free quotes, honest pricing, zero pressure.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="tel:7142693329"
            className="px-8 py-4 bg-white text-[#E8652A] font-black text-base rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            📞 (714) 269-3329
          </a>
          <a
            href="#estimate"
            className="px-8 py-4 bg-white/20 border-2 border-white text-white font-bold text-base rounded-full hover:bg-white/30 transition-all"
          >
            Get Free Estimate →
          </a>
        </div>
      </div>
    </section>
  );
}
