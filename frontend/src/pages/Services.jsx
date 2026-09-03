import { Link } from "react-router-dom";
import { ArrowUpRight, Zap, HardHat, DraftingCompass, ClipboardCheck, BadgeCheck, Wrench, TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KineticHero } from "@/components/KineticHero";
import { Reveal } from "@/components/Reveal";
import { EditorialMarquee } from "@/components/EditorialMarquee";

const SERVICES = [
  {
    n: "01",
    title: "EPC",
    icon: Zap,
    tagline: "Turnkey delivery, single point of accountability.",
    capabilities: ["Engineering, procurement & construction", "C&I rooftop & ground-mount solar PV", "Battery energy storage systems", "Grid connection & commissioning"],
    intro: "One contract. One point of accountability. We engineer, procure and construct the full asset — and stay answerable for its performance long after energisation.",
    details: [
      "Full turnkey delivery — feasibility to energisation",
      "Power stabilisation & grid-code compliance",
      "Procurement, logistics & supplier management",
      "MV/LV electrical balance of plant",
      "Testing, commissioning & QA/QC handover",
      "Performance monitoring & O&M readiness",
    ],
    image: "/images/aerial-day.jpeg",
    span: "md:col-span-4",
  },
  {
    n: "02",
    title: "Construction",
    icon: HardHat,
    tagline: "Built to programme, to spec, to standard.",
    capabilities: ["Civil & structural works", "Mechanical installation", "Electrical installation", "Testing & commissioning"],
    intro: "Boots, cranes and cable drums on the ground — civil, mechanical and electrical works executed by crews we trust, supervised by engineers who sign off.",
    details: [
      "Civil & structural works — foundations, access, drainage",
      "Mechanical installation — racking, trackers & modules",
      "Electrical installation — cabling, switchgear & transformers",
      "BESS & hybrid power stabilisation systems",
      "Site HSE management & quality control",
      "Testing & commissioning",
    ],
    span: "md:col-span-2",
    theme: "forest",
  },
  {
    n: "03",
    title: "Design",
    icon: DraftingCompass,
    tagline: "Engineering that starts on paper — and holds up in the field.",
    capabilities: ["Feasibility & yield assessment", "System & electrical design", "Grid interconnection studies", "BESS integration design"],
    intro: "Every megawatt starts as a model. Our designs are built on measured data, simulation and grid studies — and they hold up in the field.",
    details: [
      "Feasibility studies & yield assessment",
      "Energy modelling & production simulation",
      "System & electrical design — SLDs, earthing, protection",
      "Grid interconnection & power quality studies",
      "BESS sizing & integration design",
      "Power stabilisation & load-flow analysis",
    ],
    span: "md:col-span-2",
    theme: "light",
  },
  {
    n: "04",
    title: "Consultancy",
    icon: ClipboardCheck,
    tagline: "Independent expertise across the project lifecycle.",
    capabilities: ["Owner's engineering", "Technical due diligence", "Project management support", "Regulatory & licensing advisory"],
    intro: "Independent engineering judgement across the project lifecycle — for owners, lenders and developers who need a straight answer.",
    details: [
      "Owner's engineering & technical advisory",
      "Lender's technical due diligence",
      "EPC procurement & contract support",
      "Regulatory & licensing navigation — EPRA, EBK",
      "Construction supervision & programme oversight",
      "Performance audits & power stabilisation reviews",
    ],
    image: "https://images.pexels.com/photos/934586/pexels-photo-934586.jpeg",
    span: "md:col-span-4",
  },
  {
    n: "05",
    title: "O&M",
    fullTitle: "Operations & Maintenance",
    icon: Wrench,
    tagline: "We stay after switch-on — keeping assets at peak yield.",
    capabilities: ["Preventive & corrective maintenance", "Performance monitoring & reporting", "Spares & warranty management", "Rapid response teams"],
    intro: "A solar plant is a 25-year promise. Our O&M programmes protect yield, catch faults early and keep warranties intact — so the asset performs as modelled, year after year.",
    details: [
      "Scheduled preventive maintenance & inspection",
      "24/7 remote performance monitoring & alarms",
      "Corrective maintenance & rapid fault response",
      "Spare parts, warranty & claims management",
      "Cleaning, vegetation & site upkeep programmes",
      "Performance ratio guarantees & reporting",
    ],
    image: "/images/rooftop-ci.jpeg",
    span: "md:col-span-3",
  },
  {
    n: "06",
    title: "Asset Management",
    icon: TrendingUp,
    tagline: "The numbers behind the asset — managed like the investment it is.",
    capabilities: ["Technical & commercial asset management", "Billing, metering & revenue assurance", "Compliance, licences & reporting", "Lifecycle & repowering planning"],
    intro: "We manage the technical and commercial life of energy assets for owners and investors — contracts, compliance, performance, and the data that ties them together.",
    details: [
      "Technical & commercial asset management",
      "Performance analytics & investor reporting",
      "Billing, metering & revenue assurance",
      "Regulatory compliance & licence management — EPRA",
      "Contract & O&M contractor oversight",
      "Lifecycle, augmentation & repowering planning",
    ],
    span: "md:col-span-3",
    theme: "forest",
  },
];

export default function Services() {
  return (
    <main data-testid="services-page">
      <KineticHero
        compact
        kicker="Services"
        lines={["From concept", { text: "to commissioning." }]}
        description="EPC, construction, design and consultancy — delivered by a principal-led engineering team with a C&I and utility-scale track record across East Africa."
        image="https://images.pexels.com/photos/35105443/pexels-photo-35105443.jpeg"
      />

      <EditorialMarquee
        dark
        items={["Engineering", "Procurement", "Construction", "Commissioning", "Monitoring & Maintenance", "Asset Management", "Owner's Engineer", "Due Diligence"]}
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
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      role="button"
                      tabIndex={0}
                      className={`group relative flex h-full min-h-[26rem] w-full cursor-pointer flex-col justify-between overflow-hidden p-8 text-left lg:p-10 ${
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
                        <div className={`mb-6 flex h-12 w-12 items-center justify-center border transition-transform duration-300 group-hover:-rotate-6 ${s.theme === "light" ? "border-black/20" : "border-white/25"}`}>
                          <s.icon className="h-5 w-5 text-ochre" />
                        </div>
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
                        <p className={`mt-8 font-mono text-[10px] uppercase tracking-[0.25em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${s.theme === "light" ? "text-black/45" : "text-white/45"}`}>
                          Click to explore the full scope
                        </p>
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent
                    className="max-w-lg border-white/10 bg-obsidian p-8 text-white sm:p-10"
                    data-testid={`service-dialog-${s.title.toLowerCase()}`}
                  >
                    <DialogHeader>
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center border border-white/20">
                          <s.icon className="h-5 w-5 text-ochre" />
                        </span>
                        <p className="font-mono text-xs tracking-[0.3em] text-ochre">{s.n}</p>
                      </div>
                      <DialogTitle className="mt-6 text-left font-display text-3xl font-extrabold uppercase tracking-tighter text-white sm:text-4xl">
                        {s.fullTitle || s.title}
                      </DialogTitle>
                      <DialogDescription className="pt-3 text-left text-sm leading-relaxed text-white/60">
                        {s.intro}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6 border-t border-white/10 pt-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">Scope highlights</p>
                      <ul className="mt-4 space-y-3">
                        {s.details.map((d) => (
                          <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
                            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-ochre" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      to="/contact"
                      data-testid={`service-dialog-cta-${s.title.toLowerCase()}`}
                      className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ochre px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-obsidian transition-colors duration-300 hover:bg-white"
                    >
                      Discuss this scope
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </DialogContent>
                </Dialog>
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
