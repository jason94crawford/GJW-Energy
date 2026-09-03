import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Zap, HardHat, DraftingCompass, ClipboardCheck } from "lucide-react";
import { KineticHero } from "@/components/KineticHero";
import { Reveal } from "@/components/Reveal";
import { EditorialMarquee } from "@/components/EditorialMarquee";
import { StatsBand } from "@/components/StatsBand";
import { SectorsBand } from "@/components/SectorsBand";
import { PresenceMap } from "@/components/PresenceMap";
import { CredentialsBand } from "@/components/CredentialsBand";

const MANIFESTO = [
  {
    n: "01",
    title: "Principal-led",
    body: "Technical governance is anchored by our Project Lead — an Electrical & Electronic Engineer licensed by the Engineers Board of Kenya. Every engineering decision has a name behind it.",
  },
  {
    n: "02",
    title: "Licensed & accountable",
    body: "Statutory EPRA Class C1, V1 and V2 business licences, an A1 electrician licence and a Class T3 Solar PV Technician licence. Compliance is our starting point, not the finish line.",
  },
  {
    n: "03",
    title: "Built for the region",
    body: "From our base in Kenya, we assemble specialist suppliers, installers and subcontract resources matched precisely to each final construction programme — anywhere in East Africa.",
  },
];

const SERVICES = [
  {
    n: "01",
    title: "EPC",
    icon: Zap,
    body: "Full turnkey engineering, procurement and construction for C&I and utility-scale solar PV, BESS and grid infrastructure.",
    image: "https://images.pexels.com/photos/8783541/pexels-photo-8783541.jpeg",
    span: "md:col-span-4",
    dark: true,
  },
  {
    n: "02",
    title: "Construction",
    icon: HardHat,
    body: "Civil, mechanical and electrical works — executed to programme, to spec, to standard.",
    span: "md:col-span-2",
    solid: true,
  },
  {
    n: "03",
    title: "Design",
    icon: DraftingCompass,
    body: "Feasibility, yield modelling, system design and grid interconnection studies.",
    span: "md:col-span-2",
    solid: true,
  },
  {
    n: "04",
    title: "Consultancy",
    icon: ClipboardCheck,
    body: "Owner's engineering, technical due diligence and advisory across the project lifecycle.",
    image: "https://images.pexels.com/photos/934586/pexels-photo-934586.jpeg",
    span: "md:col-span-4",
    dark: true,
  },
];

export default function Home() {
  return (
    <main data-testid="home-page">
      <KineticHero
        kicker="GJW Energy · Kenya · East Africa"
        lines={["Power,", { text: "Engineered" }, "for East Africa."]}
        description="A principal-led engineering and EPC company delivering commercial & industrial solar PV, battery energy storage and utility-scale energy infrastructure across the region."
        image="https://images.pexels.com/photos/35105443/pexels-photo-35105443.jpeg"
      >
        <Link
          to="/contact"
          data-testid="hero-cta-primary"
          className="group flex items-center gap-2 rounded-full bg-ochre px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-obsidian transition-colors duration-300 hover:bg-white"
        >
          Start a project
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <Link
          to="/services"
          data-testid="hero-cta-secondary"
          className="group flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:border-ochre hover:text-ochre"
        >
          Explore services
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </KineticHero>

      <EditorialMarquee
        items={["EPC", "Construction", "Design", "Consultancy", "20 MWp Solar PV", "10 MWh BESS", "EPRA Licensed", "East Africa"]}
      />

      <section className="bg-bone py-24 lg:py-32" data-testid="manifesto-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">The manifesto</p>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-extrabold uppercase leading-none tracking-tighter sm:text-5xl lg:text-6xl">
              The way we build
            </h2>
          </Reveal>

          <div className="mt-20 space-y-0 border-t border-black/10">
            {MANIFESTO.map((m, i) => (
              <Reveal key={m.n} delay={i * 0.08}>
                <div className="grid grid-cols-1 gap-6 border-b border-black/10 py-12 md:grid-cols-12 md:py-16" data-testid={`manifesto-chapter-${m.n}`}>
                  <p className="font-mono text-sm tracking-[0.3em] text-ochre md:col-span-2">{m.n}</p>
                  <h3 className="font-display text-3xl font-extrabold uppercase tracking-tighter sm:text-4xl md:col-span-4">
                    {m.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-black/60 md:col-span-6 md:text-base">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      <SectorsBand />

      <PresenceMap />

      <section className="bg-bone py-24 lg:py-32" data-testid="services-preview">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">What we do</p>
              <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-none tracking-tighter sm:text-5xl lg:text-6xl">
                Four disciplines.
                <br />
                One standard.
              </h2>
            </div>
            <Link
              to="/services"
              data-testid="services-view-all"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-black/60 transition-colors duration-300 hover:text-ochre"
            >
              All services
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06} className={s.span}>
                <Link
                  to="/services"
                  data-testid={`service-card-${s.title.toLowerCase()}`}
                  className={`group relative block h-72 overflow-hidden md:h-80 ${
                    s.solid ? "bg-forest text-white" : "bg-obsidian text-white"
                  }`}
                >
                  {s.image && (
                    <>
                      <img
                        src={s.image}
                        alt={s.title}
                        className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-obsidian/40" />
                    </>
                  )}
                  <div className="relative flex h-full flex-col justify-between p-8">
                    <div className="flex items-start justify-between">
                      <p className="font-mono text-xs tracking-[0.3em] text-ochre">{s.n}</p>
                      <span className="flex h-10 w-10 items-center justify-center border border-white/25 transition-all duration-300 group-hover:rotate-6 group-hover:border-ochre group-hover:bg-ochre">
                        <s.icon className="h-4 w-4 text-white transition-colors duration-300 group-hover:text-obsidian" />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-3xl font-extrabold uppercase tracking-tighter">{s.title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">{s.body}</p>
                      <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 group-hover:text-ochre">
                        Learn more
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CredentialsBand />

      <section className="bg-obsidian py-28 text-white lg:py-36" data-testid="home-cta">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Next step</p>
            <h2 className="mt-8 max-w-4xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-5xl lg:text-6xl">
              Let's build your next energy asset.
            </h2>
            <Link
              to="/contact"
              data-testid="home-cta-button"
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-ochre px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-obsidian transition-colors duration-300 hover:bg-white"
            >
              Start the conversation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
