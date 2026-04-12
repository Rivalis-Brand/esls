import { useState, useRef, useEffect, useCallback } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Step = "area" | "photo" | "contact" | "success";
type PhotoMode = "scale" | "draw";
interface Point { x: number; y: number; }

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

function PhotoMeasurer({ onResult, onCancel }: { onResult: (sqft: number) => void; onCancel: () => void }) {
  const [image, setImage] = useState<string | null>(null);
  const [photoMode, setPhotoMode] = useState<PhotoMode>("scale");
  const [scalePoints, setScalePoints] = useState<Point[]>([]);
  const [knownLength, setKnownLength] = useState("");
  const [scaleFt, setScaleFt] = useState<number | null>(null);
  const [drawPoints, setDrawPoints] = useState<Point[]>([]);
  const [sqftResult, setSqftResult] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    if (scalePoints.length > 0) {
      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 2;
      scalePoints.forEach((p, i) => {
        if (i > 0) {
          ctx.beginPath();
          ctx.moveTo(scalePoints[i - 1].x, scalePoints[i - 1].y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
      if (scalePoints.length === 2) {
        ctx.fillStyle = "#facc15";
        ctx.font = "bold 11px sans-serif";
        const mx = (scalePoints[0].x + scalePoints[1].x) / 2;
        const my = (scalePoints[0].y + scalePoints[1].y) / 2;
        ctx.fillText(knownLength ? `${knownLength} ft` : "mark distance", mx + 5, my - 5);
      }
    }

    if (drawPoints.length > 0) {
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 2;
      ctx.fillStyle = "rgba(34, 197, 94, 0.18)";
      ctx.beginPath();
      ctx.moveTo(drawPoints[0].x, drawPoints[0].y);
      drawPoints.forEach((p) => ctx.lineTo(p.x, p.y));
      if (drawPoints.length > 2) ctx.closePath();
      ctx.fill();
      ctx.stroke();
      drawPoints.forEach((p, i) => {
        ctx.fillStyle = "#22c55e";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "bold 10px sans-serif";
        ctx.fillText(String(i + 1), p.x + 7, p.y - 4);
      });
      if (drawPoints.length > 1) {
        ctx.strokeStyle = "rgba(34,197,94,0.4)";
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(drawPoints[drawPoints.length - 1].x, drawPoints[drawPoints.length - 1].y);
        ctx.lineTo(drawPoints[0].x, drawPoints[0].y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }, [scalePoints, drawPoints, knownLength]);

  useEffect(() => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ratio = Math.min(380 / img.width, 260 / img.height);
      canvas.width = Math.round(img.width * ratio);
      canvas.height = Math.round(img.height * ratio);
      redraw();
    };
    img.src = image;
  }, [image]);

  useEffect(() => {
    if (imgRef.current) redraw();
  }, [redraw]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      setScalePoints([]); setDrawPoints([]); setSqftResult(null);
      setScaleFt(null); setKnownLength(""); setPhotoMode("scale");
    };
    reader.readAsDataURL(file);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    if (photoMode === "scale") {
      setScalePoints((prev) => prev.length >= 2 ? [{ x, y }] : [...prev, { x, y }]);
    } else {
      setDrawPoints((prev) => [...prev, { x, y }]);
    }
  };

  const setScale = () => {
    if (scalePoints.length < 2 || !knownLength || Number(knownLength) <= 0) return;
    const dx = scalePoints[1].x - scalePoints[0].x;
    const dy = scalePoints[1].y - scalePoints[0].y;
    setScaleFt(Math.sqrt(dx * dx + dy * dy) / Number(knownLength));
    setPhotoMode("draw");
  };

  const calculateArea = () => {
    if (drawPoints.length < 3 || !scaleFt) return;
    let area = 0;
    for (let i = 0; i < drawPoints.length; i++) {
      const j = (i + 1) % drawPoints.length;
      area += drawPoints[i].x * drawPoints[j].y;
      area -= drawPoints[j].x * drawPoints[i].y;
    }
    setSqftResult(Math.round(Math.abs(area) / 2 / (scaleFt * scaleFt)));
  };

  const undoPoint = () => {
    if (photoMode === "draw") setDrawPoints((p) => p.slice(0, -1));
    else setScalePoints((p) => p.slice(0, -1));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back
        </button>
        <span className="text-foreground font-bold text-sm flex-1 text-center">📸 Photo Measurement Tool</span>
      </div>

      {!image ? (
        <label className="block cursor-pointer group">
          <div className="border-2 border-dashed border-border hover:border-primary/60 rounded-xl p-8 text-center transition-all hover:bg-primary/5">
            <div className="text-4xl mb-3">📷</div>
            <div className="text-foreground font-semibold text-sm mb-1">Upload a yard photo</div>
            <div className="text-muted-foreground text-xs">JPG or PNG · Never leaves your device</div>
            <div className="mt-3 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary text-xs font-bold inline-block">
              Choose Photo
            </div>
            <input type="file" accept="image/*" capture="environment" onChange={handleFile} className="hidden" />
          </div>
        </label>
      ) : (
        <div>
          {/* Step indicators */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${photoMode === "scale" ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400" : scaleFt ? "bg-green-500/15 border-green-500/40 text-green-400" : "bg-secondary border-border text-muted-foreground"}`}>
              {scaleFt ? "✓" : "1"} Set Scale
            </div>
            <svg className="w-3 h-3 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${photoMode === "draw" ? "bg-primary/20 border-primary/50 text-primary" : "bg-secondary border-border text-muted-foreground"}`}>
              2 Draw Area
            </div>
          </div>

          {photoMode === "scale" && (
            <div className="mb-3 p-3 bg-yellow-500/10 border border-yellow-500/25 rounded-lg">
              <p className="text-yellow-400 text-xs font-semibold mb-2">Click 2 points on a known object (fence, door, etc.)</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  placeholder="Length in feet"
                  value={knownLength}
                  onChange={(e) => setKnownLength(e.target.value)}
                  className="flex-1 bg-secondary border border-input rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-yellow-500 text-sm"
                />
                <button
                  onClick={setScale}
                  disabled={scalePoints.length < 2 || !knownLength}
                  className="px-3 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                >
                  Set Scale ✓
                </button>
              </div>
              <p className="text-muted-foreground text-xs mt-1.5">{scalePoints.length}/2 points marked</p>
            </div>
          )}

          {photoMode === "draw" && (
            <div className="mb-3 p-3 bg-primary/10 border border-primary/25 rounded-lg">
              <p className="text-primary text-xs font-semibold">Click the corners of your turf area to draw the shape.</p>
              <p className="text-muted-foreground text-xs mt-0.5">{drawPoints.length} point{drawPoints.length !== 1 ? "s" : ""} marked {drawPoints.length >= 3 ? "— ready to calculate!" : ""}</p>
            </div>
          )}

          <div className="relative rounded-xl overflow-hidden bg-black/50 mb-3">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full cursor-crosshair block"
              style={{ touchAction: "none" }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {sqftResult ? (
              <div className="flex-1 flex items-center gap-3">
                <div className="bg-primary/15 border border-primary/40 rounded-xl px-4 py-3 flex-1">
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-wide mb-0.5">Measured Area</div>
                  <div className="text-2xl font-black text-primary">{sqftResult.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">sq ft</span></div>
                </div>
                <button
                  onClick={() => onResult(sqftResult)}
                  className="px-4 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  Use This →
                </button>
              </div>
            ) : (
              <>
                {photoMode === "draw" && drawPoints.length >= 3 && (
                  <button
                    onClick={calculateArea}
                    className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    📐 Calculate Area
                  </button>
                )}
                {(drawPoints.length > 0 || scalePoints.length > 0) && (
                  <button
                    onClick={undoPoint}
                    className="px-3 py-2.5 bg-secondary border border-border text-muted-foreground text-sm rounded-xl hover:bg-secondary/80 transition-colors"
                  >
                    ↩ Undo
                  </button>
                )}
                <button
                  onClick={() => { setImage(null); setScalePoints([]); setDrawPoints([]); setSqftResult(null); setScaleFt(null); setKnownLength(""); setPhotoMode("scale"); }}
                  className="px-3 py-2.5 bg-secondary border border-border text-muted-foreground text-sm rounded-xl hover:bg-secondary/80 transition-colors"
                >
                  🔄 Reset
                </button>
              </>
            )}
          </div>
        </div>
      )}
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
        name, phone, email,
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

  const inputClass = "w-full px-4 py-3 bg-secondary border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-4 pt-6">
      <div className="w-full max-w-md">
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-primary/90 to-primary px-6 py-5">
            <h2 className="text-white font-bold text-xl leading-tight">{companyName}</h2>
            <p className="text-white/80 text-sm mt-0.5">Free Turf Estimate Calculator</p>
          </div>

          <div className="p-6">
            {/* PHOTO STEP */}
            {step === "photo" && (
              <PhotoMeasurer
                onResult={(sqftVal) => {
                  setSqft(String(sqftVal));
                  setStep("area");
                }}
                onCancel={() => setStep("area")}
              />
            )}

            {/* AREA STEP */}
            {step === "area" && (
              <form onSubmit={handleGetEstimate} className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-foreground">
                      Square Footage
                    </label>
                    <button
                      type="button"
                      onClick={() => setStep("photo")}
                      className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors border border-primary/30 bg-primary/8 px-2.5 py-1.5 rounded-lg"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                      </svg>
                      Measure from Photo
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      placeholder="e.g. 500"
                      min="1"
                      required
                      className={`${inputClass} pr-16 text-lg`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">sq ft</span>
                  </div>
                  {sqft && Number(sqft) > 0 && (
                    <p className="text-xs text-primary/70 mt-1.5 font-medium">✓ {Number(sqft).toLocaleString()} sq ft entered</p>
                  )}
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

            {/* CONTACT STEP */}
            {step === "contact" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-primary/10 border border-primary/30 rounded-xl px-5 py-4 mb-2">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Your Estimate</p>
                  <p className="text-2xl font-bold text-primary">${price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{Number(sqft).toLocaleString()} sq ft · {PRICE_TIERS[selectedTier].label}</p>
                </div>

                <p className="text-sm text-muted-foreground">Enter your info and we'll send you a full quote.</p>

                <div className="space-y-3">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required className={inputClass} />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required className={inputClass} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className={inputClass} />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep("area")} className="flex-1 py-3 border border-border text-muted-foreground rounded-xl hover:bg-secondary transition-colors text-sm">
                    ← Back
                  </button>
                  <button type="submit" disabled={submitting} className="flex-[2] py-3 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold rounded-xl transition-colors">
                    {submitting ? "Sending..." : "Get My Quote"}
                  </button>
                </div>
              </form>
            )}

            {/* SUCCESS STEP */}
            {step === "success" && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">You're all set, {name}!</h3>
                  <p className="text-muted-foreground text-sm mt-2">We'll be in touch shortly with your personalized turf estimate.</p>
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
