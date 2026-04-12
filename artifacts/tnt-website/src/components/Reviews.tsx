const reviews = [
  {
    name: "Jessica R.",
    location: "Anaheim, CA",
    text: "Miguel and his crew were absolutely incredible. They transformed our bare backyard into a gorgeous lawn in just two days. Our kids are obsessed with it and we haven't watered the lawn once since. Best home improvement decision we've made.",
    project: "Residential Backyard",
    date: "March 2025",
    avatar: "JR",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Carlos V.",
    location: "Orange, CA",
    text: "I had Top Notch install a putting green in my backyard and I couldn't be happier. The craftsmanship is outstanding — perfectly smooth rolls, realistic feel. Miguel clearly takes pride in his work. Worth every penny.",
    project: "Putting Green",
    date: "January 2025",
    avatar: "CV",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Amy T.",
    location: "Fullerton, CA",
    text: "Our HOA had been on us about the lawn looking rough. Called Top Notch and they handled everything — permits, grading, install — super smooth process. The neighborhood looks amazing and we're getting compliments from everyone.",
    project: "Front Yard HOA",
    date: "February 2025",
    avatar: "AT",
    color: "from-violet-500 to-purple-500",
  },
  {
    name: "David M.",
    location: "Anaheim Hills, CA",
    text: "We have three large dogs and the old grass was a mud disaster. Top Notch installed pet turf with the odor-control infill and it's been a game changer. The yard smells fresh, drains perfectly, and the dogs love it.",
    project: "Pet Turf — Dog Run",
    date: "December 2024",
    avatar: "DM",
    color: "from-emerald-500 to-cyan-500",
  },
  {
    name: "Sandra & Tom K.",
    location: "Garden Grove, CA",
    text: "From the first call to the final cleanup, Miguel was communicative, professional, and fair. No hidden fees, no surprises. The turf looks better than we imagined and I've already referred three neighbors to him.",
    project: "Full Front & Back Yard",
    date: "November 2024",
    avatar: "SK",
    color: "from-blue-500 to-violet-500",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-sm">★</span>)}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #050e18 0%, #040a14 100%)" }}>
      {/* Background orb */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #10b981, transparent 70%)", filter: "blur(80px)", transform: "translate(-30%, 30%)" }} />

      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.2)", color: "#fbbf24" }}
          >
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
            Customer Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            What Southern California{" "}
            <span className="gradient-text">Is Saying</span>
          </h2>
          <div className="flex items-center justify-center gap-2.5 mt-5">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-xl">★</span>)}
            </div>
            <span className="text-white/50 font-semibold">5.0 · 100+ Reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="group relative rounded-2xl p-6 flex flex-col transition-all duration-400 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Top gradient line */}
              <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${r.color} opacity-40 group-hover:opacity-80 transition-opacity rounded-full`} />

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white font-black text-xs`}
                >
                  {r.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{r.name}</div>
                  <div className="text-xs text-white/35">{r.location}</div>
                </div>
                <div className="ml-auto">
                  <Stars />
                </div>
              </div>

              <blockquote className="text-white/50 text-sm leading-relaxed flex-1 mb-5">
                "{r.text}"
              </blockquote>

              <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.15)" }}
                >
                  {r.project}
                </span>
                <span className="text-xs text-white/25">{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(59,130,246,0.1) 100%)",
            border: "1px solid rgba(255,255,255,0.08)"
          }}
        >
          <div className="absolute inset-0 opacity-20"
            style={{ background: "radial-gradient(circle at 50% 0%, rgba(16,185,129,0.4), transparent 60%)" }} />
          <div className="relative">
            <div className="text-3xl md:text-4xl font-black text-white mb-3">Ready to join them?</div>
            <p className="text-white/45 text-lg mb-8 max-w-md mx-auto">
              Get a free, no-pressure estimate from Miguel. Honest pricing, guaranteed results.
            </p>
            <a
              href="#estimate"
              className="inline-block px-10 py-4 text-white font-black text-base rounded-full transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #10b981, #3b82f6)",
                boxShadow: "0 8px 32px rgba(16,185,129,0.3)"
              }}
            >
              Get My Free Estimate →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
