const stats = [
  { value: "13+", label: "Years Experience", icon: "🏆" },
  { value: "1,000+", label: "Projects Completed", icon: "✅" },
  { value: "100%", label: "Satisfaction Guaranteed", icon: "🛡️" },
  { value: "5.0★", label: "Google Rating", icon: "⭐" },
];

export default function TrustBar() {
  return (
    <section style={{ background: "linear-gradient(90deg, #040a14, #071428, #040a14)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center justify-center text-center py-8 px-6"
              style={{ background: "#040a14" }}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div
                className="text-4xl font-black mb-1"
                style={{
                  background: i % 2 === 0
                    ? "linear-gradient(135deg, #34d399, #60a5fa)"
                    : "linear-gradient(135deg, #60a5fa, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                {s.value}
              </div>
              <div className="text-white/40 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
