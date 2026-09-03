import { BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CREDENTIALS = [
  "EPRA Class C1",
  "EPRA Class V1",
  "EPRA Class V2",
  "A1 Electrician",
  "T3 Solar PV Technician",
  "Engineers Board of Kenya",
];

export const CredentialsBand = () => (
  <section className="bg-forest py-24 text-white lg:py-28" data-testid="credentials-band">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
        <Reveal className="max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Credentials & licensing</p>
          <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-none tracking-tighter sm:text-5xl">
            Licensed to build. Bound to deliver.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/60 md:text-base">
            Statutory EPRA business licences, an A1 electrician licence and a Class T3 Solar PV
            Technician licence — backed by an Electrical & Electronic Engineering degree and
            Engineers Board of Kenya licensing.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="flex-1">
          <ul className="grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-2" data-testid="credentials-list">
            {CREDENTIALS.map((c) => (
              <li
                key={c}
                className="flex items-center gap-3 bg-forest px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/75"
              >
                <BadgeCheck className="h-4 w-4 shrink-0 text-ochre" />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);
