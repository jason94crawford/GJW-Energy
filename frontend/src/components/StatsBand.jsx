import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const CountUp = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const num = parseInt(value, 10);
  const suffix = value.includes("+") ? "+" : "";
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, num, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, num]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const STATS = [
  { value: "20+", unit: "MWp", label: "Solar PV engineering & delivery experience", testId: "stat-solar" },
  { value: "10+", unit: "MWh", label: "Battery energy storage engineering & delivery experience", testId: "stat-bess" },
  { value: "20+", unit: "yrs", label: "Combined engineering & project delivery experience", testId: "stat-years" },
  { value: "5", unit: "", label: "Markets · regional project experience", testId: "stat-countries" },
];

export const StatsBand = () => (
  <section className="bg-obsidian py-20 text-white lg:py-32" data-testid="stats-band">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Track record</p>
        <h2 className="mt-6 max-w-2xl font-display text-4xl font-extrabold uppercase leading-none tracking-tighter sm:text-5xl lg:text-6xl">
          Numbers that carry weight
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.testId} className="bg-obsidian p-8 lg:p-10" data-testid={s.testId}>
            <Reveal delay={i * 0.08}>
              <p className="font-display text-5xl font-extrabold tracking-tighter text-white lg:text-6xl">
                <CountUp value={s.value} />
                {s.unit && <span className="ml-1 text-2xl font-bold text-ochre lg:text-3xl">{s.unit}</span>}
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-white/45">
                {s.label}
              </p>
            </Reveal>
          </div>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">
          Principal & team project experience
        </p>
      </Reveal>
    </div>
  </section>
);
