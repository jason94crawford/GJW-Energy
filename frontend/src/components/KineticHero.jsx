import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const lineVariants = {
  hidden: { y: "115%" },
  visible: (i) => ({
    y: "0%",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.13 },
  }),
};

const fade = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export const KineticHero = ({ kicker, lines, description, image, children, compact = false }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  return (
    <section
      ref={ref}
      className={`relative flex items-end overflow-hidden bg-obsidian ${compact ? "min-h-[72vh]" : "min-h-screen"}`}
      data-testid="kinetic-hero"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full scale-110 object-cover opacity-40" />
        <div className="absolute inset-0 bg-obsidian/55" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-44 lg:px-10 lg:pb-28">
        {kicker && (
          <motion.p
            {...fade(0.05)}
            className="mb-8 font-mono text-[11px] uppercase tracking-[0.35em] text-ochre md:text-xs"
            data-testid="hero-kicker"
          >
            {kicker}
          </motion.p>
        )}

        <h1
          className="font-display text-[clamp(2.75rem,8vw,6rem)] font-extrabold uppercase leading-[0.95] tracking-tighter text-white"
          data-testid="hero-headline"
        >
          {lines.map((line, i) => {
            const isAccent = typeof line === "object";
            const text = isAccent ? line.text : line;
            return (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${isAccent ? "text-ochre" : ""}`}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                >
                  {text}
                </motion.span>
              </span>
            );
          })}
        </h1>

        {description && (
          <motion.p {...fade(0.85)} className="mt-8 max-w-xl text-sm leading-relaxed text-white/70 md:text-lg" data-testid="hero-description">
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div {...fade(1.0)} className="mt-10 flex flex-wrap items-center gap-4">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
