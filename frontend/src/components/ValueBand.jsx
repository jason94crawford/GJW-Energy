import { Gem, Scale } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const PILLARS = [
  {
    icon: Gem,
    title: "Quality you can verify",
    body: "Tier-1 equipment. Documented QA/QC. Tested commissioning. Engineering margins designed around East African operating conditions.",
  },
  {
    icon: Scale,
    title: "Pricing you can defend",
    body: "Right-sized systems, transparent BOQs and lifecycle costing. Every material specification and design decision tied to performance, reliability and commercial value.",
  },
];

export const ValueBand = () => (
  <section className="bg-obsidian py-20 text-white lg:py-32" data-testid="value-band">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <Reveal className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Quality & price</p>
        <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-5xl lg:text-6xl">
          The lowest capex
          <br />
          isn't always the
          <br />
          lowest cost.
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-white/60 md:text-base">
          We engineer for lifecycle value — balancing capital cost, performance, reliability and
          maintainability across the operating life of the asset.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
        {PILLARS.map((p, i) => (
          <div key={p.title} className="group bg-obsidian p-8 lg:p-12" data-testid={`value-pillar-${i + 1}`}>
            <Reveal delay={i * 0.1}>
              <span className="flex h-12 w-12 items-center justify-center border border-white/20 transition-all duration-300 group-hover:rotate-6 group-hover:border-ochre group-hover:bg-ochre">
                <p.icon className="h-5 w-5 text-ochre transition-colors duration-300 group-hover:text-obsidian" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-extrabold uppercase tracking-tighter sm:text-3xl">
                {p.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">{p.body}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  </section>
);
