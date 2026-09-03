import { BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CREDENTIALS = [
  "BSc Electrical & Electronic Engineering",
  "Engineers Board of Kenya (EBK) Licensed Engineer",
  "EPRA Class A1 Electrician — Licence No. 6767",
  "EPRA Class T3 Solar PV Technician",
  "Formerly Project Developer, New Southern Energy",
];

export const ProjectLead = () => (
  <section className="bg-obsidian py-24 text-white lg:py-32" data-testid="project-lead">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
      <Reveal>
        <div className="group relative aspect-[4/5] max-h-[80vh] overflow-hidden bg-bone" data-testid="project-lead-portrait">
          <img
            src="/images/geoffrey.jpg"
            alt="Eng. Geoffrey Kipyegon, Co-Founder & Technical Director of GJW Energy"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
          <div className="absolute bottom-0 left-0 bg-ochre px-6 py-4 md:px-8 md:py-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-obsidian">Co-Founder & Technical Director</p>
          </div>
          <div className="absolute right-0 top-0 border-b border-l border-white/15 px-5 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">ENG · EBK · EPRA</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Technical governance</p>
        <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-5xl lg:text-6xl" data-testid="project-lead-name">
          Eng. Geoffrey Kipyegon
        </h2>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
          Co-Founder & Technical Director · GJW Energy
        </p>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
          Leads the company's technical governance — an Electrical & Electronic Engineer licensed
          by the Engineers Board of Kenya, holding statutory EPRA licences, with a track record of
          commercial & industrial and utility-scale solar and storage delivery across East Africa:
          manufacturing, hospitality, retail, healthcare and horticulture.
        </p>

        <ul className="mt-10 border-t border-white/10" data-testid="project-lead-credentials">
          {CREDENTIALS.map((c) => (
            <li
              key={c}
              className="flex items-center gap-3 border-b border-white/10 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/70"
            >
              <BadgeCheck className="h-4 w-4 shrink-0 text-ochre" />
              {c}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);
