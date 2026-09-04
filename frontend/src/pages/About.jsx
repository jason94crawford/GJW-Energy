import { Link } from "react-router-dom";
import { ArrowUpRight, Crosshair, ShieldCheck, Globe2 } from "lucide-react";
import { KineticHero } from "@/components/KineticHero";
import { Reveal } from "@/components/Reveal";
import { CredentialsBand } from "@/components/CredentialsBand";
import { ProjectLead } from "@/components/ProjectLead";

const CHAPTERS = [
  {
    n: "01",
    title: "Who we are",
    body: "GJW Energy is a newly incorporated Kenyan private limited company focused on solar, energy solutions and engineering. From our offices in Kenya, we hold a delivery mandate across East Africa — pairing the agility of a young company with the depth of decades of regional project experience.",
  },
  {
    n: "02",
    title: "How we operate",
    body: "We are structured as a principal-led engineering and EPC business. Technical governance is anchored by our Founder & Technical Director and supported by specialist suppliers, installers and subcontract resources assembled to match each final construction programme — no bloated overheads, no diluted accountability.",
  },
  {
    n: "03",
    title: "Governance & standards",
    body: "Our practice rests on statutory EPRA Class C1, V1 and V2 business licences, an A1 electrician licence, and an EPRA Class T3 Solar PV Technician licence — underpinned by an Electrical & Electronic Engineering degree and Engineers Board of Kenya licensing.",
  },
];

const VALUES = [
  { title: "Precision", icon: Crosshair, body: "Engineering decisions backed by calculation, not convention." },
  { title: "Accountability", icon: ShieldCheck, body: "One principal. One standard. One name on the line." },
  { title: "Region-first", icon: Globe2, body: "Designed for East African grids, climates and realities." },
];

const FIELD_PHOTOS = [
  { src: "/images/rooftop-aerial.jpeg", caption: "C&I rooftop · Industrial estate" },
  { src: "/images/inverter-corridor.jpeg", caption: "Inverter station · String inverters on racking" },
  { src: "/images/inverter-closeup.jpeg", caption: "DC protection · Labelled, fused & dressed" },
];

export default function About() {
  return (
    <main data-testid="about-page">
      <KineticHero
        compact
        kicker="About GJW Energy"
        lines={["Principal-led.", { text: "Engineer-first." }]}
        description="A newly incorporated Kenyan private limited company delivering solar, energy solutions and engineering across East Africa."
        image="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e"
      />

      <section className="bg-bone py-24 lg:py-32" data-testid="about-chapters">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="border-t border-black/10">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.06}>
                <div className="grid grid-cols-1 gap-6 border-b border-black/10 py-14 md:grid-cols-12 lg:py-20" data-testid={`about-chapter-${c.n}`}>
                  <p className="font-mono text-sm tracking-[0.3em] text-ochre md:col-span-2">{c.n}</p>
                  <h2 className="font-display text-3xl font-extrabold uppercase tracking-tighter sm:text-4xl lg:text-5xl md:col-span-4">
                    {c.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-black/60 md:col-span-6 md:text-lg">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProjectLead />

      <section className="bg-obsidian py-24 lg:py-32" data-testid="about-image-band">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="group relative max-h-[80vh] overflow-hidden">
              <img
                src="/images/aerial-sunset.jpeg"
                alt="Utility-scale solar PV plant at dusk, East Africa"
                className="h-full max-h-[80vh] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 bg-ochre px-6 py-4 md:px-8 md:py-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-obsidian">
                  Solar PV · Delivered at scale
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <div key={v.title} className="bg-obsidian p-8 lg:p-10" data-testid={`value-${v.title.toLowerCase()}`}>
                <Reveal delay={i * 0.08}>
                  <v.icon className="mb-5 h-6 w-6 text-ochre" />
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-tighter text-white">{v.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">{v.body}</p>
                </Reveal>
              </div>
            ))}
          </div>

          <div className="mt-24" data-testid="field-gallery">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">From the field</p>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FIELD_PHOTOS.map((p, i) => (
                <Reveal key={p.src} delay={i * 0.08}>
                  <div className="group relative h-64 overflow-hidden lg:h-80" data-testid={`field-photo-${i + 1}`}>
                    <img
                      src={p.src}
                      alt={p.caption}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 bg-obsidian px-4 py-2.5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">{p.caption}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CredentialsBand />

      <section className="bg-bone py-24 lg:py-32" data-testid="about-cta">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Work with us</p>
            <h2 className="mt-8 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-5xl lg:text-6xl">
              A young company. Decades behind it.
            </h2>
            <Link
              to="/contact"
              data-testid="about-cta-button"
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-obsidian px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-ochre hover:text-obsidian"
            >
              Talk to our team
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
