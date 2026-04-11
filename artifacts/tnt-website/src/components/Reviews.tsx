const reviews = [
  {
    name: "Jessica R.",
    location: "Anaheim, CA",
    text: "Miguel and his crew were absolutely incredible. They transformed our bare backyard into a gorgeous lawn in just two days. Our kids are obsessed with it and we haven't watered the lawn once since. Best home improvement decision we've made.",
    project: "Residential Backyard",
    date: "March 2025",
  },
  {
    name: "Carlos V.",
    location: "Orange, CA",
    text: "I had Top Notch install a putting green in my backyard and I couldn't be happier. The craftsmanship is outstanding — perfectly smooth rolls, realistic feel. Miguel clearly takes pride in his work. Worth every penny.",
    project: "Putting Green",
    date: "January 2025",
  },
  {
    name: "Amy T.",
    location: "Fullerton, CA",
    text: "Our HOA had been on us about the lawn looking rough. Called Top Notch and they handled everything — permits, grading, install — super smooth process. The neighborhood looks amazing now and we're getting compliments from everyone.",
    project: "Front Yard HOA",
    date: "February 2025",
  },
  {
    name: "David M.",
    location: "Anaheim Hills, CA",
    text: "We have three large dogs and the old grass was a mud disaster. Top Notch installed pet turf with the odor-control infill and it's been a game changer. The yard smells fresh, drains perfectly, and the dogs love it.",
    project: "Pet Turf — Dog Run",
    date: "December 2024",
  },
  {
    name: "Sandra & Tom K.",
    location: "Garden Grove, CA",
    text: "From the first call to the final cleanup, Miguel was communicative, professional, and fair. No hidden fees, no surprises. The turf looks better than we imagined and I've already referred three neighbors to him.",
    project: "Full Front & Back Yard",
    date: "November 2024",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-base">★</span>)}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-[#f8faf8]">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-14">
          <div className="inline-block bg-[#1B6B45]/10 text-[#1B6B45] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Customer Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            What Orange County Says
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-xl">★</span>)}
            </div>
            <span className="text-gray-600 font-semibold">5.0 · 100+ Reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col ${
                i === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <Stars />
              <blockquote className="text-gray-700 text-sm leading-relaxed mt-3 mb-5 flex-1">
                "{r.text}"
              </blockquote>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div>
                  <div className="font-bold text-sm text-gray-900">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-[#1B6B45]">{r.project}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{r.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#1B6B45] rounded-3xl p-8 md:p-12 text-white text-center">
          <div className="text-4xl font-black mb-2">Ready to join them?</div>
          <p className="text-white/75 text-lg mb-8 max-w-md mx-auto">
            Get a free, no-pressure estimate from Miguel and see why hundreds of homeowners trust Top Notch Turf.
          </p>
          <a
            href="#estimate"
            className="inline-block px-10 py-4 bg-[#E8652A] hover:bg-[#d4571f] text-white font-black text-base rounded-full transition-all shadow-xl hover:shadow-2xl"
          >
            Get My Free Estimate →
          </a>
        </div>
      </div>
    </section>
  );
}
