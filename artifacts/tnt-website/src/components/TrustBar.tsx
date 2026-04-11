const stats = [
  { value: "13+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100%", label: "Licensed & Insured" },
  { value: "5★", label: "Rated on Google" },
];

export default function TrustBar() {
  return (
    <section className="bg-[#1B6B45] py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-4 md:py-0">
              <div className="text-4xl font-black text-white">{s.value}</div>
              <div className="text-white/70 text-sm font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
