import { Link } from "react-router-dom";
import { ArrowUpRight, Factory, Building2, Flower2, Hotel, HeartPulse } from "lucide-react";
import { KineticHero } from "@/components/KineticHero";
import { Reveal } from "@/components/Reveal";

const STUDIES = [
  {
    name: "Tata Chemicals",
    sector: "Manufacturing",
    icon: Factory,
    capacity: "5.1 MWp",
    country: "Kenya · Magadi",
    tech: "On-grid solar · grid stabilisation · distribution & transmission",
    role: "Turnkey EPC",
    body: "Grid-stabilising solar PV for one of Kenya's largest industrial operations — integrating 5.1 MWp of solar PV with grid-support functionality to improve power quality, resilience and energy cost performance at a remote, energy-intensive site.",
    image: "/images/tata-aerial-top.jpg",
    gallery: [
      { src: "/images/tata-inverter-room.jpg", alt: "Tata Chemicals Magadi — inverter and control room" },
      { src: "/images/tata-sunset.jpg", alt: "Tata Chemicals Magadi — plant at dusk" },
    ],
  },
  {
    name: "Devki Group",
    sector: "Manufacturing",
    icon: Factory,
    capacity: "3.8 MWp · 4 sites",
    country: "Kenya · Athi River & Lukenya",
    tech: "On-grid solar",
    role: "Turnkey EPC",
    body: "A multi-site rooftop solar portfolio spanning four facilities across Kenya's building-materials sector — delivering nearly 5 GWh of clean energy annually across steel, cement, paving and roofing operations.",
    image: "https://images.pexels.com/photos/8783541/pexels-photo-8783541.jpeg",
  },
  {
    name: "Tatu City",
    sector: "Mixed-use & Retail",
    icon: Building2,
    capacity: "2.05 MWp rooftop",
    country: "Kenya · Tatu City SEZ",
    tech: "On-grid solar · distribution & transmission",
    role: "Turnkey EPC",
    body: "A flagship rooftop solar installation at Tatu City, Kenya's first operational Special Economic Zone — supporting one of East Africa's most ambitious mixed-use developments.",
    image: "https://images.pexels.com/photos/934586/pexels-photo-934586.jpeg",
  },
  {
    name: "SAJ Ceramics",
    sector: "Manufacturing",
    icon: Factory,
    capacity: "693 kWp rooftop",
    country: "Kenya",
    tech: "On-grid solar",
    role: "Turnkey EPC",
    body: "A grid-tied rooftop solar solution with integrated generator control for East & Central Africa's first ceramic tile manufacturer — reducing utility dependence and improving energy resilience.",
    image: "/images/saj-topdown.webp",
    gallery: [
      { src: "/images/saj-rooftop-close.webp", alt: "SAJ Ceramics — rooftop array close-up" },
      { src: "/images/saj-site-overview.webp", alt: "SAJ Ceramics — site overview with both solar roofs" },
    ],
  },
  {
    name: "Kinondo Kwetu Resort",
    sector: "Hospitality",
    icon: Hotel,
    capacity: "93 kWp + 120 kWh",
    country: "Kenya · Galu Beach, Diani",
    tech: "Off-grid solar",
    role: "Turnkey EPC",
    body: "An off-grid solar system for a boutique beach resort south of Diani — ending diesel-generator dependence after years of grid instability, silently.",
    image: "https://images.unsplash.com/photo-1589276534126-adef63a95e05",
  },
  {
    name: "andBeyond Grumeti",
    sector: "Hospitality",
    icon: Hotel,
    capacity: "150 kWp + 450 kWh",
    country: "Tanzania",
    tech: "Off-grid solar & BESS",
    role: "Turnkey EPC",
    body: "An off-grid solar and battery solution for an &Beyond lodge in Tanzania — combining renewable generation, energy storage and intelligent controls to reduce diesel dependence and deliver reliable, resilient power in a remote hospitality environment.",
    image: "/images/aerial-sunset.jpeg",
  },
  {
    name: "Solio Lodge",
    sector: "Hospitality",
    icon: Hotel,
    capacity: "600 kWp + 1,075 kWh",
    country: "Kenya",
    tech: "Off-grid solar & BESS",
    role: "Construction lead",
    body: "An off-grid solar and battery solution for Solio Lodge in Kenya — integrating renewable generation, energy storage and intelligent energy management to reduce diesel consumption, lower operating costs and provide reliable power in a remote safari environment.",
    image: "/images/aerial-day.jpeg",
  },
  {
    name: "Waridi Flowers",
    sector: "Flower Farms & Agri",
    icon: Flower2,
    capacity: "600 kWp",
    country: "Kenya · Athi River",
    tech: "On-grid solar · distribution & transmission",
    role: "Turnkey EPC",
    body: "An on-grid ground-mounted solar PV solution for Waridi Flowers — delivering clean, cost-efficient power to support energy-intensive horticultural operations while reducing grid consumption and long-term electricity costs.",
    image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg",
  },
  {
    name: "Mwale Medical & Technology City",
    sector: "Healthcare",
    icon: HeartPulse,
    capacity: "999 kWp + 2 MWh",
    country: "Kenya · Kakamega County",
    tech: "Off-grid solar & BESS · distribution & transmission",
    role: "Turnkey EPC",
    body: "Solar power for the MRI and critical medical machinery of a state-of-the-art medical and technology city — reliability where it matters most.",
    image: "/images/mwale-compound.jpeg",
    gallery: [
      { src: "/images/mwale-aerial-road.jpeg", alt: "Mwale Medical & Technology City — solar plant from the access road" },
      { src: "/images/mwale-array-topdown.jpeg", alt: "Mwale Medical & Technology City — array tables from above" },
    ],
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
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative h-72 overflow-hidden lg:h-96">
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
                  {s.gallery && (
                    <div className="mt-2 grid grid-cols-2 gap-2" data-testid={`case-study-${slug(s.name)}-gallery`}>
                      {s.gallery.map((g) => (
                        <div key={g.src} className="relative h-32 overflow-hidden lg:h-40">
                          <img loading="lazy" decoding="async"
                            src={g.src}
                            alt={g.alt}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
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
