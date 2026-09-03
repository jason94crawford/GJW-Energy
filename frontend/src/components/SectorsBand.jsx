import { Reveal } from "@/components/Reveal";

const SECTORS = [
  { n: "01", name: "Manufacturing", driver: "Solar and storage sized to process loads — cutting diesel and tariff exposure on the production line." },
  { n: "02", name: "Hospitality", driver: "Resilient power for hotels, lodges and camps — guest comfort without the generator hum." },
  { n: "03", name: "Malls & Retail", driver: "Daytime demand meets daytime generation — solar that mirrors the retail load curve." },
  { n: "04", name: "Hospitals & Healthcare", driver: "Uninterrupted, high-quality power where uptime is measured in outcomes, not losses." },
  { n: "05", name: "Flower Farms & Agri", driver: "Cold chain, irrigation and packhouse loads powered reliably — built for East Africa's export engine." },
];

export const SectorsBand = () => (
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
              className="group grid grid-cols-1 gap-3 border-b border-black/10 px-4 py-8 transition-colors duration-300 hover:bg-obsidian md:grid-cols-12 md:items-center md:px-6 md:py-10"
              data-testid={`sector-row-${s.n}`}
            >
              <p className="font-mono text-xs tracking-[0.3em] text-ochre md:col-span-2">{s.n}</p>
              <h3 className="font-display text-2xl font-extrabold uppercase tracking-tighter transition-colors duration-300 group-hover:text-white sm:text-3xl md:col-span-5">
                {s.name}
              </h3>
              <p className="text-sm leading-relaxed text-black/55 transition-colors duration-300 group-hover:text-white/60 md:col-span-5">
                {s.driver}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
