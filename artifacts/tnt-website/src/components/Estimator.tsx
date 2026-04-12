import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Step = "area" | "contact" | "success";

const PRICE_TIERS = [
  {
    label: "Standard Turf",
    pricePerSqFt: 8,
    desc: "Natural-looking, durable — Festival Turf grade",
    icon: "🌿",
    brand: "Festival Turf",
    color: "from-emerald-500/20 to-teal-500/10",
    activeGlow: "rgba(16,185,129,0.15)",
  },
  {
    label: "Premium Turf",
    pricePerSqFt: 10,
    desc: "Ultra-realistic, extra cushion — Shaw & Tiger Turf",
    icon: "⭐",
    brand: "Shaw / Tiger Turf",
    color: "from-blue-500/20 to-indigo-500/10",
    activeGlow: "rgba(59,130,246,0.15)",
  },
  {
    label: "Putting Green",
    pricePerSqFt: 12,
    desc: "Tour-grade precision turf for custom greens",
    icon: "⛳",
    brand: "Tiger Turf",
    color: "from-violet-500/20 to-purple-500/10",
    activeGlow: "rgba(139,92,246,0.15)",
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
  const lowPrice = sqft ? Math.round(Number(sqft) * 7) : 0;
  const highPrice = sqft ? Math.round(Number(sqft) * 13) : 0;

  const handleGetEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(sqft) > 0) setStep("contact");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "companies/top-notch-turf/leads"), {
        name, phone, email, message,
        sqft: Number(sqft),
        tier: PRICE_TIERS[selectedTier].label,
        estimatedCost: price,
        companyId: "top-notch-turf",
        source: "tnt-website",
        createdAt: serverTimestamp(),
      });
      setStep("success");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-5 py-4 text-white placeholder:text-white/25 rounded-xl focus:outline-none transition-all";
  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
  };
  const inputFocusStyle = "focus:border-emerald-500/50 focus:bg-white/7";

  return (
    <section id="estimate" className="py-28 relative overflow-hidden" style={{ background: "#040a14" }}>
      {/* Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)", filter: "blur(80px)", transform: "translate(30%, -30%)" }} />

      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left: info */}
          <div className="lg:sticky lg:top-24">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#34d399" }}
            >
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              Free Estimate
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Find Out What Your<br />
              <span className="gradient-text-gb">Project Will Cost</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-10">
              Use our instant calculator to get a ballpark range, then submit your info and Miguel will follow up with a full accurate quote — zero obligation.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: "📐", title: "Enter Your Square Footage", desc: "Use Google Maps or measure your space" },
                { icon: "🌿", title: "Choose Your Turf Grade", desc: "Tiger Turf, Shaw Flooring, or Festival Turf" },
                { icon: "📞", title: "Miguel Calls Within 24 Hours", desc: "Free, accurate quote — no pressure" },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white/80 text-sm">{s.title}</div>
                    <div className="text-white/35 text-sm mt-0.5">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <svg className="w-5 h-5 text-white/30 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <div>
                <div
                  className="text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, #34d399, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Powered by Rivalis Computer Vision
                </div>
                <div className="text-xs text-white/25 mt-0.5">AI-powered turf measurement technology</div>
              </div>
            </div>
          </div>

          {/* Right: form card */}
          <div className="rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Header */}
            <div className="px-8 py-7 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(59,130,246,0.2) 100%)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 0% 50%, rgba(16,185,129,0.3), transparent 60%)" }} />
              <div className="relative">
                <h3 className="text-white font-black text-xl">Instant Estimate Calculator</h3>
                <p className="text-white/50 text-sm mt-1">Get a ballpark cost in under a minute</p>
              </div>
            </div>

            <div className="p-8">
              {step === "area" && (
                <form onSubmit={handleGetEstimate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-white/70 mb-2.5">
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
                        className={`${inputClass} ${inputFocusStyle} text-lg font-semibold pr-16`}
                        style={inputStyle}
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/25 text-sm font-semibold">sq ft</span>
                    </div>
                    <p className="text-xs text-white/25 mt-2">Tip: Use Google Maps satellite to measure your space</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/70 mb-3">Select Turf Type</label>
                    <div className="space-y-3">
                      {PRICE_TIERS.map((tier, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedTier(i)}
                          className="w-full text-left p-4 rounded-xl transition-all duration-300"
                          style={{
                            background: selectedTier === i ? `rgba(255,255,255,0.07)` : "rgba(255,255,255,0.03)",
                            border: selectedTier === i ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(255,255,255,0.07)",
                            boxShadow: selectedTier === i ? `0 0 20px ${tier.activeGlow}` : "none"
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{tier.icon}</span>
                              <div>
                                <div className="font-bold text-sm text-white">{tier.label}</div>
                                <div className="text-xs text-white/30">{tier.brand}</div>
                              </div>
                            </div>
                            <div className={`text-sm font-black ${selectedTier === i ? "text-emerald-400" : "text-white/30"}`}>
                              ${tier.pricePerSqFt}/ft²
                            </div>
                          </div>
                          {selectedTier === i && (
                            <p className="text-xs text-white/40 mt-2 pl-9">{tier.desc}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {sqft && Number(sqft) > 0 && (
                    <div
                      className="px-6 py-5 rounded-xl"
                      style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-emerald-400/70 mb-1.5">
                        Estimated Investment Range
                      </p>
                      <p
                        className="text-3xl font-black"
                        style={{
                          background: "linear-gradient(135deg, #34d399, #60a5fa)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text"
                        }}
                      >
                        ${lowPrice.toLocaleString()} – ${highPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-white/30 mt-1.5">
                        {Number(sqft).toLocaleString()} sq ft · Materials + Labor · Final quote may vary
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 text-white font-black text-base rounded-xl transition-all hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #3b82f6)",
                      boxShadow: "0 6px 24px rgba(16,185,129,0.25)"
                    }}
                  >
                    Get My Free Quote →
                  </button>
                </form>
              )}

              {step === "contact" && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div
                    className="px-5 py-4 rounded-xl mb-2"
                    style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-400/70 mb-1">Your Estimate</p>
                    <p
                      className="text-2xl font-black"
                      style={{
                        background: "linear-gradient(135deg, #34d399, #60a5fa)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}
                    >
                      ${price.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/30">{Number(sqft).toLocaleString()} sq ft · {PRICE_TIERS[selectedTier].label}</p>
                  </div>

                  <p className="text-sm text-white/40">Fill in your info and Miguel will reach out within 24 hours.</p>

                  <div className="space-y-3">
                    {[
                      { value: name, setter: setName, placeholder: "Your Full Name", type: "text", required: true },
                      { value: phone, setter: setPhone, placeholder: "Phone Number", type: "tel", required: true },
                      { value: email, setter: setEmail, placeholder: "Email Address (optional)", type: "email", required: false },
                    ].map((field, i) => (
                      <input
                        key={i}
                        type={field.type}
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={`${inputClass} ${inputFocusStyle}`}
                        style={inputStyle}
                      />
                    ))}
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Anything else you'd like us to know?"
                      rows={3}
                      className={`${inputClass} ${inputFocusStyle} resize-none`}
                      style={inputStyle}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep("area")}
                      className="flex-1 py-3.5 text-sm font-semibold text-white/40 rounded-xl transition-all hover:text-white/60"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-[2] py-3.5 text-white font-black rounded-xl transition-all hover:-translate-y-0.5 disabled:opacity-50"
                      style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
                    >
                      {submitting ? "Sending..." : "Send My Request"}
                    </button>
                  </div>
                  <p className="text-xs text-center text-white/20">We'll never share your info. No spam, ever.</p>
                </form>
              )}

              {step === "success" && (
                <div className="text-center py-8 space-y-5">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}
                  >
                    <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">You're all set, {name}!</h3>
                    <p className="text-white/40 mt-2">Miguel will reach out within 24 hours with your personalized quote.</p>
                  </div>
                  <div
                    className="rounded-2xl px-6 py-5 text-left space-y-3"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {[
                      { label: "Area", value: `${Number(sqft).toLocaleString()} sq ft` },
                      { label: "Type", value: PRICE_TIERS[selectedTier].label },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between text-sm">
                        <span className="text-white/30">{row.label}</span>
                        <span className="font-bold text-white/80">{row.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-white/30">Estimate</span>
                      <span
                        className="font-black text-xl"
                        style={{
                          background: "linear-gradient(135deg, #34d399, #60a5fa)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text"
                        }}
                      >
                        ${price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <a
                    href="tel:7142693329"
                    className="block w-full py-3.5 text-center font-bold text-sm rounded-xl text-white/70 transition-all hover:text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    Or call (714) 269-3329
                  </a>
                  <button
                    onClick={() => { setStep("area"); setSqft(""); setName(""); setPhone(""); setEmail(""); setMessage(""); }}
                    className="text-sm text-white/25 hover:text-white/50 underline"
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
