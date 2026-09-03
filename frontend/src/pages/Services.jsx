import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { KineticHero } from "@/components/KineticHero";
import { Reveal } from "@/components/Reveal";
import { EditorialMarquee } from "@/components/EditorialMarquee";

const SERVICES = [
  {
    n: "01",
    title: "EPC",
    tagline: "Turnkey delivery, single point of accountability.",
    capabilities: ["Engineering, procurement & construction", "Utility-scale solar PV plants", "Battery energy storage systems", "Grid connection & commissioning"],
    image: "https://images.pexels.com/photos/8783541/pexels-photo-8783541.jpeg",
    span: "md:col-span-4",
  },
  {
    n: "02",
    title: "Construction",
    tagline: "Built to programme, to spec, to standard.",
    capabilities: ["Civil & structural works", "Mechanical installation", "Electrical installation", "Testing & commissioning"],
    span: "md:col-span-2",
    theme: "forest",
  },
  {
    n: "03",
    title: "Design",
    tagline: "Engineering that starts on paper — and holds up in the field.",
    capabilities: ["Feasibility & yield assessment", "System & electrical design", "Grid interconnection studies", "BESS integration design"],
    span: "md:col-span-2",
    theme: "light",
  },
  {
    n: "04",
    title: "Consultancy",
    tagline: "Independent expertise across the project lifecycle.",
    capabilities: ["Owner's engineering", "Technical due diligence", "Project management support", "Regulatory & licensing advisory"],
    image: "https://images.pexels.com/photos/934586/pexels-photo-934586.jpeg",
    span: "md:col-span-4",
  },
];

export default function Services() {
  return (
    <main data-testid="services-page">
      <KineticHero
        compact
        kicker="Services"
        lines={["From concept", { text: "to commissioning." }]}
        description="EPC, construction, design and consultancy — delivered by a principal-led engineering team with utility-scale track record across East Africa."
        image="https://images.pexels.com/photos/35105443/pexels-photo-35105443.jpeg"
      />

      <EditorialMarquee
        dark
        items={["Engineering", "Procurement", "Construction", "Commissioning", "Owner's Engineer", "Due Diligence"]}
      />

      <section className="bg-bone py-24 lg:py-32" data-testid="services-grid">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Capabilities</p>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold uppercase leading-none tracking-tighter sm:text-5xl lg:text-6xl">
              Everything an energy asset needs
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06} className={s.span}>
                <div
                  className={`group relative flex h-full min-h-[26rem] flex-col justify-between overflow-hidden p-8 lg:p-10 ${
                    s.theme === "light"
                      ? "border border-black/15 bg-white text-[#1A1A1A]"
                      : s.theme === "forest"
                        ? "bg-forest text-white"
                        : "bg-obsidian text-white"
                  }`}
                  data-testid={`service-detail-${s.title.toLowerCase()}`}
                >
                  {s.image && (
                    <>
                      <img
                        src={s.image}
                        alt={s.title}
                        className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-obsidian/50" />
                    </>
                  )}
                  <div className="relative flex items-start justify-between">
                    <p className="font-mono text-sm tracking-[0.3em] text-ochre">{s.n}</p>
                    <ArrowUpRight className="h-5 w-5 opacity-40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ochre group-hover:opacity-100" />
                  </div>
                  <div className="relative mt-16">
                    <h3 className="font-display text-3xl font-extrabold uppercase tracking-tighter sm:text-4xl">{s.title}</h3>
                    <p className={`mt-3 text-sm md:text-base ${s.theme === "light" ? "text-black/60" : "text-white/65"}`}>
                      {s.tagline}
                    </p>
                    <ul className="mt-8 space-y-3">
                      {s.capabilities.map((c) => (
                        <li
                          key={c}
                          className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] ${
                            s.theme === "light" ? "text-black/55" : "text-white/55"
                          }`}
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-ochre" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-obsidian py-24 text-white lg:py-32" data-testid="services-cta">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Scoping a project?</p>
            <h2 className="mt-8 max-w-4xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-5xl lg:text-6xl">
              Tell us what you're building.
            </h2>
            <Link
              to="/contact"
              data-testid="services-cta-button"
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-ochre px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-obsidian transition-colors duration-300 hover:bg-white"
            >
              Request a proposal
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
