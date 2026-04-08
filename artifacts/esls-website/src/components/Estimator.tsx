import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Calculator, User, Phone, Mail, CheckCircle, ChevronDown } from "lucide-react";

type ProjectType = "turf" | "putting" | "irrigation" | "hardscape";
type TurfTier = "standard" | "premium" | "luxury";
type SiteCondition = "easy" | "moderate" | "difficult";

const PRICES: Record<TurfTier, number> = { standard: 8, premium: 11, luxury: 15 };
const CONDITION_MULTIPLIER: Record<SiteCondition, number> = { easy: 1.0, moderate: 1.1, difficult: 1.2 };

interface EstimateResult {
  low: number;
  high: number;
  baseCost: number;
  addonCost: number;
  adjustment: string;
  discount: string;
}

function calculateEstimate(
  sqft: number,
  tier: TurfTier,
  condition: SiteCondition,
  petInfill: boolean,
  drainage: boolean,
  customDesign: boolean
): EstimateResult {
  const pricePerSqFt = PRICES[tier];
  const baseCost = sqft * pricePerSqFt;

  let addonCost = 0;
  if (petInfill) addonCost += sqft * 2;
  if (drainage) addonCost += sqft * 3;
  if (customDesign) addonCost += 500;

  const subtotal = baseCost + addonCost;
  const multiplier = CONDITION_MULTIPLIER[condition];
  const adjusted = subtotal * multiplier;
  const adjustment = condition !== "easy" ? `+${((multiplier - 1) * 100).toFixed(0)}% site condition` : "";

  let final = adjusted;
  let discount = "";
  if (sqft > 1500) {
    final = adjusted * 0.95;
    discount = "-5% volume discount";
  }

  const low = Math.round(final * 0.9);
  const high = Math.round(final * 1.1);

  return { low, high, baseCost, addonCost, adjustment, discount };
}

export default function Estimator() {
  const [step, setStep] = useState<"form" | "lead" | "result">("form");
  const [projectType, setProjectType] = useState<ProjectType>("turf");
  const [sqft, setSqft] = useState("");
  const [tier, setTier] = useState<TurfTier>("premium");
  const [condition, setCondition] = useState<SiteCondition>("easy");
  const [petInfill, setPetInfill] = useState(false);
  const [drainage, setDrainage] = useState(false);
  const [customDesign, setCustomDesign] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sqft || Number(sqft) <= 0) {
      setError("Please enter a valid square footage.");
      return;
    }
    setError("");
    setStep("lead");
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      setError("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    setError("");

    const est = calculateEstimate(Number(sqft), tier, condition, petInfill, drainage, customDesign);
    setResult(est);

    try {
      await addDoc(collection(db, "estimates"), {
        name,
        phone,
        email,
        projectType,
        sqft: Number(sqft),
        tier,
        condition,
        petInfill,
        drainage,
        customDesign,
        estimateLow: est.low,
        estimateHigh: est.high,
        timestamp: serverTimestamp(),
      });
    } catch {
    }

    setSubmitting(false);
    setStep("result");
  };

  const reset = () => {
    setStep("form");
    setResult(null);
    setName(""); setPhone(""); setEmail("");
    setSqft(""); setError("");
  };

  return (
    <section id="estimator" className="section-padding bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-600/15 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6">
            Instant Pricing Tool
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Get Your <span className="text-gradient">Free Estimate</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Answer a few questions about your project and get an instant cost range — no obligation, no pressure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-10 green-glow"
        >
          <div className="flex items-center gap-3 mb-8">
            {["form", "lead", "result"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  step === s ? "border-green-500 bg-green-600 text-white" :
                  (["form","lead","result"].indexOf(step) > i) ? "border-green-700 bg-green-900/50 text-green-400" :
                  "border-white/20 text-white/40"
                }`}>
                  {["form","lead","result"].indexOf(step) > i ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={`text-xs font-semibold tracking-wider uppercase hidden sm:block ${step === s ? "text-green-400" : "text-white/30"}`}>
                  {["Project Details", "Your Info", "Your Estimate"][i]}
                </span>
                {i < 2 && <div className="w-8 h-px bg-white/10 mx-1" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === "form" && (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleFormSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-white/80 font-semibold text-sm mb-3 tracking-wide uppercase">Project Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {([["turf", "Artificial Turf"], ["putting", "Putting Green"], ["irrigation", "Irrigation"], ["hardscape", "Hardscapes"]] as const).map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setProjectType(val)}
                        className={`p-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                          projectType === val
                            ? "border-green-500 bg-green-600/20 text-green-400"
                            : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/70"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 font-semibold text-sm mb-3 tracking-wide uppercase">
                    Square Footage
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 500"
                    value={sqft}
                    onChange={(e) => setSqft(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-semibold text-sm mb-3 tracking-wide uppercase">Turf Quality</label>
                  <div className="grid grid-cols-3 gap-3">
                    {([
                      ["standard", "Standard", "$8/sq ft"],
                      ["premium", "Premium", "$11/sq ft"],
                      ["luxury", "Luxury", "$15/sq ft"],
                    ] as const).map(([val, label, price]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setTier(val)}
                        className={`p-4 rounded-xl border text-sm transition-all duration-200 ${
                          tier === val
                            ? "border-green-500 bg-green-600/20 text-green-400"
                            : "border-white/15 text-white/50 hover:border-white/30"
                        }`}
                      >
                        <div className="font-bold">{label}</div>
                        <div className={`text-xs mt-1 ${tier === val ? "text-green-500" : "text-white/40"}`}>{price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 font-semibold text-sm mb-3 tracking-wide uppercase">Site Conditions</label>
                  <div className="grid grid-cols-3 gap-3">
                    {([
                      ["easy", "Easy", "Flat, clear area"],
                      ["moderate", "Moderate", "+10%"],
                      ["difficult", "Difficult", "+20%"],
                    ] as const).map(([val, label, note]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setCondition(val)}
                        className={`p-4 rounded-xl border text-sm transition-all duration-200 ${
                          condition === val
                            ? "border-green-500 bg-green-600/20 text-green-400"
                            : "border-white/15 text-white/50 hover:border-white/30"
                        }`}
                      >
                        <div className="font-bold">{label}</div>
                        <div className={`text-xs mt-1 ${condition === val ? "text-green-500" : "text-white/40"}`}>{note}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 font-semibold text-sm mb-3 tracking-wide uppercase">Add-Ons</label>
                  <div className="space-y-3">
                    {[
                      [petInfill, setPetInfill, "Pet-Safe Infill", "+$2/sq ft — antimicrobial, odor-control"],
                      [drainage, setDrainage, "Premium Drainage", "+$3/sq ft — superior water management"],
                      [customDesign, setCustomDesign, "Custom Design Consultation", "+$500 flat — bespoke layout planning"],
                    ].map(([val, setter, label, desc]: any) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setter(!val)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${
                          val ? "border-green-500 bg-green-600/20" : "border-white/15 hover:border-white/30"
                        }`}
                      >
                        <div>
                          <div className={`font-semibold text-sm ${val ? "text-green-400" : "text-white/70"}`}>{label}</div>
                          <div className="text-xs text-white/40 mt-0.5">{desc}</div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${val ? "border-green-500 bg-green-600" : "border-white/30"}`}>
                          {val && <span className="text-white text-xs">✓</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-200 shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-3"
                >
                  <Calculator size={20} />
                  Calculate My Estimate
                </button>
              </motion.form>
            )}

            {step === "lead" && (
              <motion.form
                key="lead"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleLeadSubmit}
                className="space-y-5"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-black text-white mb-2">Almost There!</h3>
                  <p className="text-white/60">Enter your info to see your personalized estimate and receive it by email.</p>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-semibold mb-2 uppercase tracking-wide">Full Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-semibold mb-2 uppercase tracking-wide">Phone Number *</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="tel"
                      placeholder="(714) 555-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-semibold mb-2 uppercase tracking-wide">Email Address *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      placeholder="john@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/15 text-white py-4 rounded-xl font-semibold transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-200 shadow-lg disabled:opacity-50"
                  >
                    {submitting ? "Calculating..." : "See My Estimate →"}
                  </button>
                </div>

                <p className="text-white/30 text-xs text-center">
                  We respect your privacy. Your info is only used to contact you about your project.
                </p>
              </motion.form>
            )}

            {step === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-16 h-16 bg-green-600/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="text-green-400" size={28} />
                </motion.div>

                <h3 className="text-2xl font-black text-white mb-2">Your Estimate is Ready!</h3>
                <p className="text-white/60 mb-8">Thanks {name}! Here's your personalized project range.</p>

                <div className="bg-gradient-to-br from-green-900/30 to-green-800/10 border border-green-500/30 rounded-2xl p-8 mb-6">
                  <div className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-2">Estimated Project Cost</div>
                  <div className="text-5xl md:text-6xl font-black text-white mb-1">
                    ${result.low.toLocaleString()} – ${result.high.toLocaleString()}
                  </div>
                  <div className="text-green-400 text-sm font-semibold">±10% range based on final site assessment</div>
                </div>

                <div className="glass-card rounded-xl p-5 text-left mb-6 space-y-3">
                  <div className="text-white/60 text-xs font-bold tracking-widest uppercase mb-3">Cost Breakdown</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Base Cost ({sqft} sq ft × ${PRICES[tier]}/ft)</span>
                    <span className="text-white font-semibold">${result.baseCost.toLocaleString()}</span>
                  </div>
                  {result.addonCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Add-ons</span>
                      <span className="text-white font-semibold">+${result.addonCost.toLocaleString()}</span>
                    </div>
                  )}
                  {result.adjustment && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Site Condition Adjustment</span>
                      <span className="text-yellow-400 font-semibold">{result.adjustment}</span>
                    </div>
                  )}
                  {result.discount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Volume Discount</span>
                      <span className="text-green-400 font-semibold">{result.discount}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <a
                    href="tel:7142538124"
                    className="bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Phone size={16} /> Call Now
                  </a>
                  <a
                    href="#contact"
                    className="bg-white/5 hover:bg-white/10 border border-white/20 text-white py-4 rounded-xl font-bold text-sm transition-all"
                  >
                    Schedule Visit
                  </a>
                </div>

                <button onClick={reset} className="text-white/40 hover:text-white/60 text-sm underline transition-colors">
                  Start Over
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
