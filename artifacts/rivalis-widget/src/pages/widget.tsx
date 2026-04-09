import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Step = "area" | "contact" | "success";

const PRICE_TIERS = [
  { label: "Standard Turf", pricePerSqFt: 8, desc: "Durable, natural-looking — perfect for lawns & landscapes" },
  { label: "Premium Turf", pricePerSqFt: 10, desc: "Ultra-realistic blades, extra cushioning for comfort" },
  { label: "Putting Green", pricePerSqFt: 12, desc: "Tour-grade precision turf for backyard putting greens" },
];

function PoweredBadge() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 border border-primary/30 rounded-full">
      <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Powered by Rivalis Computer Vision</span>
    </div>
  );
}

export default function Widget() {
  const companyId = new URLSearchParams(window.location.search).get("companyId") || "demo";
  const companyName = new URLSearchParams(window.location.search).get("companyName") || "Your Turf Company";

  const [step, setStep] = useState<Step>("area");
  const [sqft, setSqft] = useState("");
  const [selectedTier, setSelectedTier] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
      await addDoc(collection(db, `companies/${companyId}/leads`), {
        name,
        phone,
        email,
        sqft: Number(sqft),
        tier: PRICE_TIERS[selectedTier].label,
        estimatedCost: price,
        companyId,
        createdAt: serverTimestamp(),
        source: "rivalis-widget",
      });
      setStep("success");
    } catch (err) {
      console.error("Error saving lead:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-primary/90 to-primary px-6 py-5">
            <h2 className="text-white font-bold text-xl leading-tight">{companyName}</h2>
            <p className="text-white/80 text-sm mt-0.5">Free Turf Estimate Calculator</p>
          </div>

          <div className="p-6">
            {step === "area" && (
              <form onSubmit={handleGetEstimate} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Square Footage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      placeholder="e.g. 500"
                      min="1"
                      required
                      className="w-full px-4 py-3 pr-16 bg-secondary border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">sq ft</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Turf Type</label>
                  <div className="space-y-2">
                    {PRICE_TIERS.map((tier, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedTier(i)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                          selectedTier === i
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-secondary text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-sm">{tier.label}</span>
                          <span className={`text-xs font-bold ${selectedTier === i ? "text-primary" : ""}`}>
                            ${tier.pricePerSqFt}/sq ft
                          </span>
                        </div>
                        <p className="text-xs mt-0.5 opacity-70">{tier.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {sqft && Number(sqft) > 0 && (
                  <div className="bg-primary/10 border border-primary/30 rounded-xl px-5 py-4">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Estimated Range</p>
                    <p className="text-2xl font-bold text-primary">${lowPrice.toLocaleString()} – ${highPrice.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">Based on {Number(sqft).toLocaleString()} sq ft · {PRICE_TIERS[selectedTier].label}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors text-base"
                >
                  Get My Free Estimate →
                </button>
              </form>
            )}

            {step === "contact" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-primary/10 border border-primary/30 rounded-xl px-5 py-4 mb-2">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Your Estimate</p>
                  <p className="text-2xl font-bold text-primary">${price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{Number(sqft).toLocaleString()} sq ft · {PRICE_TIERS[selectedTier].label}</p>
                </div>

                <p className="text-sm text-muted-foreground">Enter your info and we'll send you a full quote.</p>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-secondary border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    required
                    className="w-full px-4 py-3 bg-secondary border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 bg-secondary border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("area")}
                    className="flex-1 py-3 border border-border text-muted-foreground rounded-xl hover:bg-secondary transition-colors text-sm"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-[2] py-3 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold rounded-xl transition-colors"
                  >
                    {submitting ? "Sending..." : "Get My Quote"}
                  </button>
                </div>
              </form>
            )}

            {step === "success" && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">You're all set, {name}!</h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    We'll be in touch shortly with your personalized turf estimate.
                  </p>
                </div>
                <div className="bg-secondary rounded-xl px-5 py-4 text-left space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Area</span>
                    <span className="font-semibold">{Number(sqft).toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-semibold">{PRICE_TIERS[selectedTier].label}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimate</span>
                    <span className="font-bold text-primary">${price.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setStep("area"); setSqft(""); setName(""); setPhone(""); setEmail(""); }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Start a new estimate
                </button>
              </div>
            )}
          </div>

          <div className="px-6 pb-5 flex justify-center">
            <PoweredBadge />
          </div>
        </div>
      </div>
    </div>
  );
}
