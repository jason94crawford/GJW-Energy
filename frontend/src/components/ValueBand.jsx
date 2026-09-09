import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gem, Scale, X } from "lucide-react";
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

const INFOGRAPHIC_SRC = "/images/infographics/cheap-solar-failure.png";
const INFOGRAPHIC_ALT =
  "Isometric render of a failed low-cost solar installation on a factory — system offline, panel fire, corroded walkway and no roof protection";

export const ValueBand = () => {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(null); // {x, y} percentages, or null

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setZoom(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleZoom = (e) => {
    e.stopPropagation();
    if (zoom) {
      setZoom(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section className="bg-obsidian py-20 text-white lg:py-32" data-testid="value-band">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Quality & price</p>
            <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-5xl lg:text-6xl">
              The lowest capex
              <br />
              isn't always the
              <br />
              lowest cost.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
              We engineer for lifecycle value — balancing capital cost, performance, reliability and
              maintainability across the operating life of the asset.
            </p>
          </div>
          <figure className="lg:col-span-5" data-testid="value-band-infographic">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group block w-full cursor-zoom-in"
              data-testid="value-band-zoom-toggle"
              aria-label="Enlarge infographic"
            >
              <img loading="lazy" decoding="async"
                src={INFOGRAPHIC_SRC}
                alt={INFOGRAPHIC_ALT}
                className="block w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </button>
            <figcaption className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/40">
              What cheap solar becomes — zero output, failed plant, unsafe roof ·{" "}
              <span className="text-ochre">click to inspect</span>
            </figcaption>
          </figure>
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 p-4 lg:p-10"
            onClick={() => {
              setOpen(false);
              setZoom(null);
            }}
            data-testid="value-band-lightbox"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                setZoom(null);
              }}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-white/20 text-white/70 transition-colors duration-300 hover:border-ochre hover:text-ochre"
              data-testid="value-band-lightbox-close"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: zoom ? 2.2 : 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              src={INFOGRAPHIC_SRC}
              alt={INFOGRAPHIC_ALT}
              onClick={handleZoom}
              style={{
                originX: zoom ? zoom.x / 100 : 0.5,
                originY: zoom ? zoom.y / 100 : 0.5,
              }}
              className={`max-h-[82vh] w-auto max-w-full select-none ${
                zoom ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              data-testid="value-band-lightbox-image"
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              {zoom ? "Click the image to zoom back out" : "Click any area to zoom in"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
