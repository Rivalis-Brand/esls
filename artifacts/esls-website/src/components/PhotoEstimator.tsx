import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Ruler, RefreshCw, ArrowRight } from "lucide-react";

interface Point { x: number; y: number; }

export default function PhotoEstimator() {
  const [image, setImage] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [knownLength, setKnownLength] = useState("");
  const [scaleFt, setScaleFt] = useState<number | null>(null);
  const [sqftResult, setSqftResult] = useState<number | null>(null);
  const [mode, setMode] = useState<"draw" | "scale">("scale");
  const [scalePoints, setScalePoints] = useState<Point[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      setPoints([]);
      setScalePoints([]);
      setSqftResult(null);
      setScaleFt(null);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const ratio = Math.min(700 / img.width, 420 / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      redraw(ctx, img, canvas.width, canvas.height);
    };
    img.src = image;
  }, [image, points, scalePoints, mode]);

  const redraw = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    if (mode === "scale" && scalePoints.length > 0) {
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
    }

    if (mode === "draw" && points.length > 0) {
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 2;
      ctx.fillStyle = "rgba(34, 197, 94, 0.15)";
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach((p) => ctx.lineTo(p.x, p.y));
      if (points.length > 2) ctx.closePath();
      ctx.fill();
      ctx.stroke();

      points.forEach((p) => {
        ctx.fillStyle = "#22c55e";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    if (mode === "scale") {
      if (scalePoints.length >= 2) {
        setScalePoints([{ x, y }]);
      } else {
        setScalePoints((prev) => [...prev, { x, y }]);
      }
    } else {
      setPoints((prev) => [...prev, { x, y }]);
    }
  };

  const calcPixelPerFoot = () => {
    if (scalePoints.length < 2 || !knownLength || Number(knownLength) <= 0) return;
    const dx = scalePoints[1].x - scalePoints[0].x;
    const dy = scalePoints[1].y - scalePoints[0].y;
    const pixelLen = Math.sqrt(dx * dx + dy * dy);
    setScaleFt(pixelLen / Number(knownLength));
    setMode("draw");
  };

  const calcArea = () => {
    if (points.length < 3 || !scaleFt) return;
    let area = 0;
    const n = points.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    const pixelArea = Math.abs(area) / 2;
    const sqftArea = pixelArea / (scaleFt * scaleFt);
    setSqftResult(Math.round(sqftArea));
  };

  const reset = () => {
    setImage(null);
    setPoints([]);
    setScalePoints([]);
    setSqftResult(null);
    setScaleFt(null);
    setMode("scale");
  };

  return (
    <section className="section-padding bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-600/15 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6">
            Advanced Tool
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Photo-Based <span className="text-gradient">Area Measurer</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Upload a photo of your yard, draw the area you want turf, and we'll calculate the square footage instantly.
            Your photo never leaves your device.
          </p>
        </motion.div>

        <div className="glass-card rounded-3xl p-6 md:p-8">
          {!image ? (
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-white/20 hover:border-green-500/50 rounded-2xl p-16 text-center transition-all duration-300 hover:bg-green-500/5">
                <Upload className="text-white/40 mx-auto mb-4" size={48} />
                <div className="text-white/70 font-semibold text-lg mb-2">Upload a yard photo</div>
                <div className="text-white/40 text-sm">JPG, PNG — stays on your device, never uploaded</div>
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </div>
            </label>
          ) : (
            <div>
              <div className="flex flex-wrap gap-3 mb-4">
                <div className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  mode === "scale" ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400" : "bg-white/5 border-white/15 text-white/50"
                }`}>
                  {mode === "scale" ? "Step 1: Mark Known Distance" : "✓ Scale Set"}
                </div>
                <ArrowRight className="text-white/30 self-center" size={16} />
                <div className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  mode === "draw" ? "bg-green-500/20 border-green-500/50 text-green-400" : "bg-white/5 border-white/15 text-white/50"
                }`}>
                  Step 2: Draw Your Area
                </div>
              </div>

              {mode === "scale" && (
                <div className="mb-4 flex flex-wrap gap-3 items-end">
                  <div className="flex-1 min-w-48">
                    <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                      Click 2 points on a known object (e.g. fence), then enter its length:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        placeholder="e.g. 20"
                        value={knownLength}
                        onChange={(e) => setKnownLength(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-yellow-500 text-sm"
                      />
                      <span className="text-white/60 self-center text-sm">ft</span>
                    </div>
                  </div>
                  <button
                    onClick={calcPixelPerFoot}
                    disabled={scalePoints.length < 2 || !knownLength}
                    className="bg-yellow-600 hover:bg-yellow-500 disabled:opacity-40 text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all"
                  >
                    <Ruler size={16} /> Set Scale
                  </button>
                </div>
              )}

              {mode === "draw" && (
                <div className="mb-4 flex gap-3 items-center text-sm text-white/60">
                  <span className="text-green-400 font-semibold">Click to mark the corners of your turf area.</span>
                  <span>({points.length} points)</span>
                </div>
              )}

              <div className="relative rounded-2xl overflow-hidden bg-black/50 mb-4">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="w-full cursor-crosshair"
                  style={{ maxHeight: "420px", objectFit: "contain" }}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {mode === "draw" && points.length >= 3 && !sqftResult && (
                  <button
                    onClick={calcArea}
                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all"
                  >
                    <Ruler size={16} /> Calculate Area
                  </button>
                )}

                {sqftResult && (
                  <div className="flex items-center gap-6">
                    <div className="bg-green-900/40 border border-green-500/40 rounded-xl px-6 py-4">
                      <div className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1">Calculated Area</div>
                      <div className="text-3xl font-black text-white">{sqftResult.toLocaleString()} <span className="text-lg text-white/60">sq ft</span></div>
                    </div>
                    <a
                      href="#estimator"
                      className="bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all"
                    >
                      Use in Estimator →
                    </a>
                  </div>
                )}

                <button
                  onClick={reset}
                  className="bg-white/5 hover:bg-white/10 border border-white/15 text-white/60 px-4 py-3 rounded-xl text-sm flex items-center gap-2 transition-all ml-auto"
                >
                  <RefreshCw size={14} /> Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
