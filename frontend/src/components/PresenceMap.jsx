import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MAP_DOTS, CITIES, LINKS } from "@/components/mapData";

const TERRITORIES = [
  { id: "kenya", name: "Kenya", city: "nairobi", cityLabel: "Nairobi · HQ", note: "EPRA-licensed delivery, C&I & utility" },
  { id: "uganda", name: "Uganda", city: "kampala", cityLabel: "Kampala", note: "C&I solar & storage" },
  { id: "tanzania", name: "Tanzania", city: "dar", cityLabel: "Dar es Salaam", note: "C&I solar & storage" },
  { id: "somalia", name: "Somalia", city: "mogadishu", cityLabel: "Mogadishu", note: "Off-grid & diesel displacement" },
  { id: "somaliland", name: "Somaliland", city: "hargeisa", cityLabel: "Hargeisa", note: "Water & utility solar" },
];

export const PresenceMap = () => {
  const [active, setActive] = useState("kenya");
  const activeCountry = active;

  return (
    <section className="bg-obsidian py-24 text-white lg:py-32" data-testid="presence-map">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Geographical presence</p>
            <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-none tracking-tighter sm:text-5xl lg:text-6xl">
              One team. Five territories.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/55 md:text-base">
            Headquartered in Kenya with a delivery mandate across East Africa — hover the map or
            the list to explore the footprint.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="border-t border-white/10">
              {TERRITORIES.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onMouseEnter={() => setActive(t.id)}
                  onFocus={() => setActive(t.id)}
                  onClick={() => setActive(t.id)}
                  className={`grid w-full grid-cols-12 items-center gap-3 border-b border-white/10 px-3 py-5 text-left transition-colors duration-300 ${
                    active === t.id ? "bg-white/5" : "hover:bg-white/5"
                  }`}
                  data-testid={`territory-row-${t.id}`}
                >
                  <span className="col-span-2 font-mono text-xs tracking-[0.3em] text-ochre sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`col-span-10 font-display text-xl font-extrabold uppercase tracking-tighter transition-colors duration-300 sm:col-span-5 sm:text-2xl ${
                      active === t.id ? "text-ochre" : "text-white"
                    }`}
                  >
                    {t.name}
                  </span>
                  <span className="col-span-12 pl-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 sm:col-span-6 sm:pl-0 sm:text-right">
                    {t.note}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
              <MapPin className="h-3.5 w-3.5 text-ochre" />
              5 territories · 1 engineering standard
            </p>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="border border-white/10 bg-[#0D0D10] p-3 sm:p-6" data-testid="presence-map-canvas">
              <svg
                id="presence-map-svg"
                data-active={activeCountry}
                viewBox="0 0 620 760"
                className="h-auto w-full"
                role="img"
                aria-label="Map of GJW Energy's East African delivery footprint"
              >

                {Object.entries(MAP_DOTS).map(([id, ds], ci) => (
                  <motion.g
                    key={id}
                    className={`dots-${id}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.15 + ci * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() =>
                      ["kenya", "uganda", "tanzania", "somalia", "somaliland"].includes(id) && setActive(id)
                    }
                  >
                    {ds.map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="4.6" className="map-dot" />
                    ))}
                  </motion.g>
                ))}

                {Object.entries(LINKS).map(([city, d]) => (
                  <path
                    key={city}
                    d={d}
                    fill="none"
                    stroke="#D97725"
                    strokeWidth="1.4"
                    strokeDasharray="5 7"
                    opacity="0.55"
                    className="animate-dashflow"
                  />
                ))}

                {TERRITORIES.map((t, i) => {
                  const [x, y] = CITIES[t.city];
                  const isActive = active === t.id;
                  return (
                    <g key={t.id} onMouseEnter={() => setActive(t.id)} style={{ cursor: "pointer" }}>
                      <motion.circle
                        cx={x}
                        cy={y}
                        r="7"
                        fill="none"
                        stroke="#D97725"
                        strokeWidth="1.5"
                        animate={{ scale: [1, isActive ? 4.2 : 2.8], opacity: [0.75, 0] }}
                        transition={{ duration: isActive ? 1.1 : 1.9, repeat: Infinity, delay: i * 0.25, ease: "easeOut" }}
                        style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      />
                      <motion.circle
                        cx={x}
                        cy={y}
                        r="5.5"
                        fill="#D97725"
                        animate={{ scale: isActive ? 1.5 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      />
                      {t.id === "kenya" && <circle cx={x} cy={y} r="2" fill="#0A0A0C" />}
                      <text
                        x={x + 14}
                        y={y + 4}
                        fontSize="11"
                        letterSpacing="2"
                        className={`select-none transition-all duration-300 ${isActive ? "fill-white" : "fill-white/45"}`}
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {t.cityLabel.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
