import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { KineticHero } from "@/components/KineticHero";
import { Reveal } from "@/components/Reveal";
import { CredentialsBand } from "@/components/CredentialsBand";

const CHAPTERS = [
  {
    n: "01",
    title: "Who we are",
    body: "GJW Energy is a newly incorporated Kenyan private limited company focused on solar, energy solutions and engineering. From our offices in Ngong, Kenya, we hold a delivery mandate across East Africa — pairing the agility of a young company with the depth of decades of regional project experience.",
  },
  {
    n: "02",
    title: "How we operate",
    body: "We are structured as a principal-led engineering and EPC business. Technical governance is anchored by our Project Lead and supported by specialist suppliers, installers and subcontract resources assembled to match each final construction programme — no bloated overheads, no diluted accountability.",
  },
  {
    n: "03",
    title: "Governance & standards",
    body: "Our practice rests on statutory EPRA Class C1, V1 and V2 business licences, an A1 electrician licence, and an EPRA Class T3 Solar PV Technician licence — underpinned by an Electrical & Electronic Engineering degree and Engineers Board of Kenya licensing.",
  },
];

const VALUES = [
  { title: "Precision", body: "Engineering decisions backed by calculation, not convention." },
  { title: "Accountability", body: "One principal. One standard. One name on the line." },
  { title: "Region-first", body: "Designed for East African grids, climates and realities." },
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

      <section className="bg-obsidian py-24 lg:py-32" data-testid="about-image-band">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="relative max-h-[80vh] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1660330589257-813305a4a383"
                alt="Engineer installing solar panels"
                className="h-full max-h-[80vh] w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-ochre px-6 py-4 md:px-8 md:py-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-obsidian">
                  On site · Solar PV installation
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <div key={v.title} className="bg-obsidian p-8 lg:p-10" data-testid={`value-${v.title.toLowerCase()}`}>
                <Reveal delay={i * 0.08}>
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-tighter text-white">{v.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">{v.body}</p>
                </Reveal>
              </div>
            ))}
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
