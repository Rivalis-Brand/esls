import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Step = "area" | "contact" | "success";

const PRICE_TIERS = [
  {
    label: "Standard Turf",
    pricePerSqFt: 8,
    desc: "Natural-looking, durable — great for residential lawns",
    icon: "🌿",
    brand: "Festival Turf",
  },
  {
    label: "Premium Turf",
    pricePerSqFt: 10,
    desc: "Ultra-realistic, extra cushion — Shaw & Tiger Turf grade",
    icon: "⭐",
    brand: "Shaw / Tiger Turf",
  },
  {
    label: "Putting Green",
    pricePerSqFt: 12,
    desc: "Tour-grade precision turf for custom putting greens",
    icon: "⛳",
    brand: "Tiger Turf",
  },
];

export default function Estimator() {
  const [step, setStep] = useState<Step>("area");
  const [sqft, setSqft] = useState("");
  const [selectedTier, setSelectedTier] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const price = sqft ? Math.round(Number(sqft) * PRICE_TIERS[selectedTier].pricePerSqFt) : 0;

  const handleGetEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(sqft) > 0) setStep("contact");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "companies/top-notch-turf/leads"), {
        name,
        phone,
        email,
        message,
        sqft: Number(sqft),
        tier: PRICE_TIERS[selectedTier].label,
        estimatedCost: price,
        companyId: "top-notch-turf",
        source: "tnt-website",
        createdAt: serverTimestamp(),
      });
      setStep("success");
    } catch (err) {
      console.error("Error saving lead:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="estimate" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: copy */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-block bg-[#1B6B45]/10 text-[#1B6B45] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Free Estimate
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
              Find Out What Your Project Will Cost
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Use our instant estimator to get a ballpark range, then submit your info and Miguel will follow up with a full, accurate quote — no obligation.
            </p>

            <div className="space-y-4">
              {[
                { icon: "📐", title: "Enter Your Square Footage", desc: "Use Google Maps or measure your space" },
                { icon: "🌿", title: "Choose Your Turf Grade", desc: "We carry Tiger Turf, Shaw, and Festival Turf" },
                { icon: "📞", title: "Get Your Custom Quote", desc: "Miguel will call or text you within 24 hours" },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1B6B45]/10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
                    {step.icon}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{step.title}</div>
                    <div className="text-gray-500 text-sm">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-[#f8faf8] rounded-2xl border border-[#1B6B45]/10">
              <div className="text-xs text-[#1B6B45] font-bold uppercase tracking-widest mb-1">Powered by</div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <span className="font-bold text-sm text-gray-700">Rivalis Computer Vision</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">AI-powered measurement technology</p>
            </div>
          </div>

          {/* Right: estimator form */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#1B6B45] to-[#2d8a60] px-7 py-6">
              <h3 className="text-white font-black text-xl">Instant Estimate Calculator</h3>
              <p className="text-white/70 text-sm mt-1">Get a ballpark cost in under a minute</p>
            </div>

            <div className="p-7">
              {step === "area" && (
                <form onSubmit={handleGetEstimate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Square Footage of Your Area
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={sqft}
                        onChange={(e) => setSqft(e.target.value)}
                        placeholder="e.g. 450"
                        min="1"
                        required
                        className="w-full px-5 py-4 pr-16 border-2 border-gray-100 focus:border-[#1B6B45] rounded-xl text-gray-900 text-lg font-semibold placeholder:text-gray-300 focus:outline-none transition-colors"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
                        sq ft
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Tip: Use Google Maps satellite view to measure your space
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Select Turf Type
                    </label>
                    <div className="space-y-3">
                      {PRICE_TIERS.map((tier, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedTier(i)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            selectedTier === i
                              ? "border-[#1B6B45] bg-[#1B6B45]/5"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{tier.icon}</span>
                              <div>
                                <div className="font-bold text-sm text-gray-900">{tier.label}</div>
                                <div className="text-xs text-gray-400">{tier.brand}</div>
                              </div>
                            </div>
                            <div className={`text-sm font-black ${selectedTier === i ? "text-[#1B6B45]" : "text-gray-400"}`}>
                              ${tier.pricePerSqFt}/ft²
                            </div>
                          </div>
                          {selectedTier === i && (
                            <p className="text-xs text-gray-500 mt-2 pl-9">{tier.desc}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {sqft && Number(sqft) > 0 && (
                    <div className="bg-[#1B6B45]/5 border border-[#1B6B45]/20 rounded-xl px-5 py-4">
                      <p className="text-xs text-[#1B6B45] font-bold uppercase tracking-wider mb-1">
                        Your Estimated Investment
                      </p>
                      <p className="text-3xl font-black text-[#1B6B45]">
                        ${Math.round(Number(sqft) * 7).toLocaleString()} – ${Math.round(Number(sqft) * 13).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {Number(sqft).toLocaleString()} sq ft · Materials + Labor · Final quote may vary
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#E8652A] hover:bg-[#d4571f] text-white font-black text-base rounded-xl transition-colors shadow-md"
                  >
                    Get My Free Quote →
                  </button>
                </form>
              )}

              {step === "contact" && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="bg-[#1B6B45]/5 border border-[#1B6B45]/20 rounded-xl px-5 py-4 mb-2">
                    <p className="text-xs text-[#1B6B45] font-bold uppercase tracking-wider mb-0.5">Your Estimate</p>
                    <p className="text-2xl font-black text-[#1B6B45]">${price.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">{Number(sqft).toLocaleString()} sq ft · {PRICE_TIERS[selectedTier].label}</p>
                  </div>

                  <p className="text-sm text-gray-600">
                    Fill in your info and Miguel will reach out within 24 hours with a full quote.
                  </p>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Full Name"
                      required
                      className="w-full px-4 py-3.5 border-2 border-gray-100 focus:border-[#1B6B45] rounded-xl text-gray-900 placeholder:text-gray-300 focus:outline-none transition-colors"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      required
                      className="w-full px-4 py-3.5 border-2 border-gray-100 focus:border-[#1B6B45] rounded-xl text-gray-900 placeholder:text-gray-300 focus:outline-none transition-colors"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address (optional)"
                      className="w-full px-4 py-3.5 border-2 border-gray-100 focus:border-[#1B6B45] rounded-xl text-gray-900 placeholder:text-gray-300 focus:outline-none transition-colors"
                    />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Anything else you'd like us to know?"
                      rows={3}
                      className="w-full px-4 py-3.5 border-2 border-gray-100 focus:border-[#1B6B45] rounded-xl text-gray-900 placeholder:text-gray-300 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep("area")}
                      className="flex-1 py-3.5 border-2 border-gray-100 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-[2] py-3.5 bg-[#E8652A] hover:bg-[#d4571f] disabled:opacity-60 text-white font-black rounded-xl transition-colors"
                    >
                      {submitting ? "Sending..." : "Send My Request"}
                    </button>
                  </div>

                  <p className="text-xs text-center text-gray-400">
                    We'll never share your info. No spam, ever.
                  </p>
                </form>
              )}

              {step === "success" && (
                <div className="text-center py-8 space-y-5">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">You're all set, {name}!</h3>
                    <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                      Miguel will reach out within 24 hours with your personalized turf quote.
                    </p>
                  </div>
                  <div className="bg-[#f8faf8] rounded-2xl px-6 py-4 text-left space-y-2.5 border border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Area</span>
                      <span className="font-bold text-gray-900">{Number(sqft).toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Type</span>
                      <span className="font-bold text-gray-900">{PRICE_TIERS[selectedTier].label}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                      <span className="text-gray-400">Estimate</span>
                      <span className="font-black text-[#1B6B45] text-lg">${price.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <a href="tel:7142693329" className="block w-full py-3.5 border-2 border-[#1B6B45] text-[#1B6B45] font-bold rounded-xl hover:bg-[#1B6B45]/5 transition-colors">
                      Or call (714) 269-3329
                    </a>
                  </div>
                  <button
                    onClick={() => { setStep("area"); setSqft(""); setName(""); setPhone(""); setEmail(""); setMessage(""); }}
                    className="text-sm text-gray-400 hover:text-gray-600 underline"
                  >
                    Start a new estimate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
