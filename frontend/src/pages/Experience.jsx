import { Link } from "react-router-dom";
import { ArrowUpRight, Sun, BatteryCharging, Zap } from "lucide-react";
import { KineticHero } from "@/components/KineticHero";
import { Reveal } from "@/components/Reveal";
import { StatsBand } from "@/components/StatsBand";
import { CredentialsBand } from "@/components/CredentialsBand";

const AREAS = [
  {
    n: "01",
    title: "C&I & utility solar PV",
    icon: Sun,
    body: "Our team has engineered and delivered 20 MWp of solar PV across East Africa — predominantly commercial & industrial systems powering manufacturers, hotels, malls, hospitals and flower farms, alongside utility-scale plants.",
    image: "/images/rooftop-ci.jpeg",
  },
  {
    n: "02",
    title: "Battery energy storage",
    icon: BatteryCharging,
    body: "10 MWh of BESS designed, built and commissioned — integrating storage with C&I solar and grid infrastructure for reliable, dispatchable power.",
    image: "/images/bess-containers.jpeg",
  },
  {
    n: "03",
    title: "Transmission & distribution",
    icon: Zap,
    body: "Deep experience across transmission and distribution networks — the grid-side expertise that makes generation assets actually deliver.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
  },
];

export default function Experience() {
  return (
    <main data-testid="experience-page">
      <KineticHero
        compact
        kicker="Experience"
        lines={["Built at", { text: "utility scale" }, "and speed."]}
        description="The people behind GJW Energy have delivered 20 MWp of solar PV and 10 MWh of battery storage across East Africa — predominantly for commercial & industrial clients — backed by deep transmission and distribution experience."
        image="https://images.unsplash.com/photo-1589276534126-adef63a95e05"
      />

      <StatsBand />

      <section className="bg-bone py-20 lg:py-32" data-testid="experience-areas">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Where we've delivered</p>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold uppercase leading-none tracking-tighter sm:text-5xl lg:text-6xl">
              Three arenas. One grid.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-3" data-testid="sector-chips">
              {["Manufacturing", "Hospitality", "Malls & Retail", "Hospitals & Healthcare", "Flower Farms & Agri"].map((s) => (
                <span
                  key={s}
                  className="border border-black/15 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-black/60 transition-colors duration-300 hover:border-obsidian hover:bg-obsidian hover:text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-20 space-y-24">
            {AREAS.map((a, i) => (
              <Reveal key={a.n}>
                <div
                  className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                  data-testid={`experience-area-${a.n}`}
                >
                  <div className="group relative max-h-[80vh] overflow-hidden">
                    <img loading="lazy" decoding="async" src={a.image} alt={a.title} className="h-full max-h-[80vh] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute left-0 top-0 bg-obsidian px-5 py-3">
                      <p className="font-mono text-xs tracking-[0.3em] text-ochre">{a.n}</p>
                    </div>
                    <div className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center bg-ochre transition-transform duration-300 group-hover:rotate-6">
                      <a.icon className="h-5 w-5 text-obsidian" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase tracking-tighter sm:text-4xl lg:text-5xl">
                      {a.title}
                    </h3>
                    <p className="mt-6 max-w-lg text-sm leading-relaxed text-black/60 md:text-lg">{a.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-obsidian py-24 text-white lg:py-32" data-testid="case-studies-teaser">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Case studies</p>
              <h2 className="mt-6 max-w-2xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-5xl lg:text-6xl">
                Selected work, documented.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
                Explore solar PV and storage projects delivered by our team across East Africa's
                core sectors — from flower farms to factories, resorts to hospitals.
              </p>
            </div>
            <Link
              to="/case-studies"
              data-testid="experience-cta-button"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-white/25 px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:border-ochre hover:text-ochre"
            >
              View case studies
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CredentialsBand />
    </main>
  );
}
