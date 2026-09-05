import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const IMAGES = {
  manufacturing: "/images/infographics/manufacturing.png",
  hospitality: "/images/infographics/hospitality.png",
  retail: "/images/infographics/retail.png",
  healthcare: "/images/infographics/healthcare.png",
  agri: "/images/infographics/agri.png",
};

const FIG = {
  manufacturing: "Fig. 01 — Factory rooftop PV + BESS",
  hospitality: "Fig. 02 — Lodge ground-mount PV + silent BESS",
  retail: "Fig. 03 — Mall rooftop PV + solar carports",
  healthcare: "Fig. 04 — Hospital rooftop PV + N+1 BESS",
  agri: "Fig. 05 — Rammed-pile ground-mount PV + cold chain",
};

const NOTES = {
  manufacturing: "Rooftop PV with marked walkways, guardrails, safety lines and dedicated roof access — battery storage sitting beside the production line.",
  hospitality: "Ground-mount solar and silent battery power — the generator stays off, the guests never hear a hum.",
  retail: "Solar carports shade the parking while rooftop PV and storage carry the mall's daytime load curve — EV-ready.",
  healthcare: "Solar PV with N+1 battery backup and guarded roof access — critical loads stay live, 24/7.",
  agri: "Ground-mount arrays on rammed piles — no concrete, fast to build — powering cold chain, packhouse and irrigation.",
};

const LEGENDS = {
  manufacturing: ["Rooftop PV", "Walkways", "Guardrails", "Roof access", "Safety lines", "BESS"],
  hospitality: ["Ground-mount PV", "Silent BESS power", "Genset displacement"],
  retail: ["Solar carports", "Rooftop PV", "EV-ready", "BESS"],
  healthcare: ["Rooftop PV", "BESS N+1 backup", "Critical loads 24/7", "Roof access"],
  agri: ["Ground-mount PV", "Rammed piles", "Cold chain", "BESS"],
};

export const SectorInfographic = ({ scene }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });
  const tx = useTransform(sx, [0, 1], [12, -12]);
  const ty = useTransform(sy, [0, 1], [9, -9]);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div data-testid={`infographic-${scene}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ochre">
          Typical system configuration · Solar PV + BESS
        </p>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 md:block">
          Hover another sector to compare
        </p>
      </div>

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative mt-6 overflow-hidden"
        data-testid={`infographic-frame-${scene}`}
      >
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            loading="lazy"
            decoding="async"
            src={IMAGES[scene]}
            alt={FIG[scene]}
            initial={{ scale: 1.12 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: tx, y: ty }}
            className="h-auto w-full select-none"
            draggable={false}
          />
        </motion.div>

        <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-ochre" />
        <span className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-ochre" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-ochre" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-ochre" />

        <div className="pointer-events-none absolute bottom-0 left-0 bg-obsidian/85 px-4 py-2.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/75">{FIG[scene]}</p>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60">{NOTES[scene]}</p>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {LEGENDS[scene].map((l) => (
          <span
            key={l}
            className="flex items-center gap-2 border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/55"
          >
            <span className="h-1.5 w-1.5 rotate-45 bg-ochre" />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
};
