import { Link } from "react-router-dom";
import { ArrowUpRight, Factory, Building2, Flower2, Hotel, HeartPulse } from "lucide-react";
import { KineticHero } from "@/components/KineticHero";
import { Reveal } from "@/components/Reveal";

const STUDIES = [
  {
    name: "Tata Chemicals",
    sector: "Industrial",
    icon: Factory,
    capacity: "5.1 MW",
    country: "Kenya · Magadi",
    tech: "Solar PV · grid-supplementing · COD 2025",
    role: "EPC · grid integration",
    body: "Grid-supplementing solar for one of Kenya's largest industrial operations — 5.1 MW delivered under a full-turnkey model at a remote, energy-intensive site.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
  },
  {
    name: "Devki Group Portfolio",
    sector: "Manufacturing",
    icon: Factory,
    capacity: "3.8 MWp · 4 sites",
    country: "Kenya · Athi River & Lukenya",
    tech: "Rooftop solar PV · ±4.94 GWh/yr",
    role: "Engineering · project delivery",
    body: "A portfolio of rooftop solar systems across four premises of Kenya's building-materials group — steel, cement, paving and roofing — delivering close to 5 GWh of clean production a year.",
    image: "https://images.pexels.com/photos/8783541/pexels-photo-8783541.jpeg",
  },
  {
    name: "Tatu City",
    sector: "Mixed-use & Retail",
    icon: Building2,
    capacity: "2.05 MW rooftop",
    country: "Kenya · Tatu City SEZ",
    tech: "Rooftop solar PV · 3,468 modules",
    role: "Engineering · project delivery · grid integration",
    body: "A 2.05 MW rooftop system at Kenya's first operational Special Economic Zone — 3,468 Jinko N-type modules and 8 Huawei 200KTL inverters powering a 5,000-acre mixed-use city.",
    image: "https://images.pexels.com/photos/934586/pexels-photo-934586.jpeg",
  },
  {
    name: "SAJ Ceramics",
    sector: "Manufacturing",
    icon: Factory,
    capacity: "693 kWp rooftop",
    country: "Kenya",
    tech: "Rooftop solar PV + genset control · ±12% of demand",
    role: "Engineering · project delivery",
    body: "A grid-tied rooftop system with integrated generator control for East & Central Africa's first ceramic tile manufacturer — covering 12% of energy needs and offsetting utility draw.",
    image: "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg",
  },
  {
    name: "Waridi Farm",
    sector: "Flower Farms & Agri",
    icon: Flower2,
    capacity: "Grid-tied solar",
    country: "Kenya · Athi River",
    tech: "Grid-tied solar PV",
    role: "Engineering · project delivery",
    body: "A grid-tied plant cutting operational costs for a boutique rose and horticulture farm — freeing up capital for the farm's expansion into aquaculture.",
    image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg",
  },
  {
    name: "Wilfay Flowers",
    sector: "Flower Farms & Agri",
    icon: Flower2,
    capacity: "274.5 MWh / yr",
    country: "Kenya · Subukia, Nakuru",
    tech: "Solar PV · IPP (GridX Africa)",
    role: "Engineering · project delivery",
    body: "Solar for a 40-hectare summer-flower farm on the equator at 2,200 m — clean power for cold chain and packhouse loads at one of the Rift Valley's quality growers.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
  },
  {
    name: "Kinondo Kwetu Resort",
    sector: "Hospitality",
    icon: Hotel,
    capacity: "Off-grid solar",
    country: "Kenya · Galu Beach, Diani",
    tech: "Off-grid solar PV + BESS · diesel displaced",
    role: "Engineering · project delivery",
    body: "An off-grid solar system for a boutique beach resort south of Diani — ending diesel-generator dependence after years of grid instability, silently.",
    image: "https://images.unsplash.com/photo-1589276534126-adef63a95e05",
  },
  {
    name: "Mwale Medical & Technology City",
    sector: "Healthcare",
    icon: HeartPulse,
    capacity: "Solar PV plant",
    country: "Kenya · Kakamega County",
    tech: "Solar PV · critical loads",
    role: "Engineering · project delivery",
    body: "Solar power for the MRI and critical medical machinery of a state-of-the-art medical and technology city — reliability where it matters most.",
    image: "https://images.pexels.com/photos/35105443/pexels-photo-35105443.jpeg",
  },
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function CaseStudies() {
  return (
    <main data-testid="case-studies-page">
      <KineticHero
        compact
        kicker="Case studies"
        lines={["Proof, not", { text: "promises." }]}
        description="Solar PV and storage delivered by the GJW Energy team across East Africa's core sectors — from flower farms to factories, resorts to hospitals."
        image="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d"
      />

      <section className="border-b border-black/10 bg-white py-12 lg:py-16" data-testid="case-studies-note">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="max-w-4xl font-mono text-sm uppercase leading-relaxed tracking-[0.2em] text-black/60 md:text-base">
            Projects developed, constructed and designed in partnership with regional solar
            developers, IPPs, EPCs and consultants.
          </p>
        </div>
      </section>

      <section className="bg-bone" data-testid="case-studies-list">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {STUDIES.map((s, i) => (
            <Reveal key={s.name}>
              <article
                className="group grid grid-cols-1 items-center gap-8 border-b border-black/10 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20"
                data-testid={`case-study-${slug(s.name)}`}
              >
                <div className={`relative h-72 overflow-hidden lg:col-span-5 lg:h-96 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <img loading="lazy" decoding="async"
                    src={s.image}
                    alt={s.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-0 top-0 flex items-center gap-2 bg-obsidian px-4 py-2.5">
                    <s.icon className="h-3.5 w-3.5 text-ochre" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white">{s.sector}</span>
                  </div>
                </div>

                <div className={`flex flex-col justify-center lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="font-mono text-xs tracking-[0.3em] text-ochre">{String(i + 1).padStart(2, "0")}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/40">
                      Principal project experience
                    </p>
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tighter sm:text-4xl lg:text-5xl">
                    {s.name}
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-black/60 md:text-base">{s.body}</p>
                  <div className="mt-8 border-t border-black/10 pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-black/55">
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                      <span data-testid={`case-study-${slug(s.name)}-capacity`}>
                        <span className="text-ochre">Capacity</span> · {s.capacity}
                      </span>
                      <span>
                        <span className="text-ochre">Sector</span> · {s.sector}
                      </span>
                      <span>
                        <span className="text-ochre">Country</span> · {s.country}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
                      <span>
                        <span className="text-ochre">Technology</span> · {s.tech}
                      </span>
                      <span>
                        <span className="text-ochre">Scope</span> · {s.role}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-obsidian py-20 text-white lg:py-32" data-testid="case-studies-cta">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Your sector. Your site.</p>
            <h2 className="mt-8 max-w-4xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-5xl lg:text-6xl">
              Your project could be next.
            </h2>
            <Link
              to="/contact"
              data-testid="case-studies-cta-button"
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-ochre px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-obsidian transition-colors duration-300 hover:bg-white"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
