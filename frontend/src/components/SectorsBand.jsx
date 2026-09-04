import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Factory, Hotel, ShoppingBag, HeartPulse, Flower2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectorInfographic } from "@/components/SectorInfographic";

const SECTORS = [
  { n: "01", name: "Manufacturing", icon: Factory, scene: "manufacturing", driver: "Solar and storage sized to process loads — cutting diesel and tariff exposure on the production line." },
  { n: "02", name: "Hospitality", icon: Hotel, scene: "hospitality", driver: "Resilient power for hotels, lodges and camps — guest comfort without the generator hum." },
  { n: "03", name: "Malls & Retail", icon: ShoppingBag, scene: "retail", driver: "Daytime demand meets daytime generation — solar that mirrors the retail load curve." },
  { n: "04", name: "Hospitals & Healthcare", icon: HeartPulse, scene: "healthcare", driver: "Uninterrupted, high-quality power where uptime is measured in outcomes, not losses." },
  { n: "05", name: "Flower Farms & Agri", icon: Flower2, scene: "agri", driver: "Cold chain, irrigation and packhouse loads powered reliably — built for East Africa's export engine." },
];

export const SectorsBand = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-24 lg:py-32" data-testid="sectors-band">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">C&I focus</p>
            <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-none tracking-tighter sm:text-5xl lg:text-6xl">
              Sectors we power
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-black/60 md:text-base">
            Our solar expertise is predominantly commercial & industrial — engineered around the
            market drivers of East Africa's core sectors.
          </p>
        </Reveal>

        <div className="mt-16 border-t border-black/10">
          {SECTORS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.04}>
              <div
                className={`group grid cursor-pointer grid-cols-1 gap-3 border-b border-black/10 px-4 py-8 transition-colors duration-300 md:grid-cols-12 md:items-center md:px-6 md:py-10 ${
                  active === i ? "bg-obsidian" : "hover:bg-obsidian"
                }`}
                data-testid={`sector-row-${s.n}`}
                onMouseOver={() => setActive(i)}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <p className="font-mono text-xs tracking-[0.3em] text-ochre md:col-span-2">{s.n}</p>
                <div className="flex items-center gap-4 md:col-span-5">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center border transition-all duration-300 group-hover:rotate-6 group-hover:border-ochre group-hover:bg-ochre group-hover:text-obsidian ${
                      active === i ? "rotate-6 border-ochre bg-ochre text-obsidian" : "border-black/15 text-black/55"
                    }`}
                  >
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3
                    className={`font-display text-2xl font-extrabold uppercase tracking-tighter transition-colors duration-300 group-hover:text-white sm:text-3xl ${
                      active === i ? "text-white" : ""
                    }`}
                  >
                    {s.name}
                  </h3>
                </div>
                <p
                  className={`text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/60 md:col-span-5 ${
                    active === i ? "text-white/60" : "text-black/55"
                  }`}
                >
                  {s.driver}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-black/40">
            Hover a sector to see how solar PV + battery integrate for the application
          </p>
        </Reveal>

        <div className="mt-6 bg-obsidian px-4 py-8 md:px-8 md:py-12" data-testid={`sector-panel-${SECTORS[active].n}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectorInfographic scene={SECTORS[active].scene} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
