import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { to: "/", label: "Home", testId: "nav-link-home" },
  { to: "/about", label: "About", testId: "nav-link-about" },
  { to: "/services", label: "Services", testId: "nav-link-services" },
  { to: "/experience", label: "Experience", testId: "nav-link-experience" },
  { to: "/contact", label: "Contact", testId: "nav-link-contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-obsidian/90 backdrop-blur-md" data-testid="navbar">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 lg:px-10">
        <Link to="/" className="flex items-center gap-3" data-testid="nav-logo" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center bg-ochre font-display text-sm font-black text-obsidian">
            G
          </span>
          <span className="font-display text-lg font-extrabold uppercase tracking-tight text-white">
            GJW <span className="text-white/50">Energy</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" data-testid="nav-links-desktop">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={l.testId}
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive ? "text-ochre" : "text-white/60 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            data-testid="nav-cta-button"
            className="group flex items-center gap-2 rounded-full bg-ochre px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-obsidian transition-colors duration-300 hover:bg-white"
          >
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          data-testid="nav-menu-toggle"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key={location.pathname}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-obsidian lg:hidden"
            data-testid="nav-links-mobile"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  data-testid={`${l.testId}-mobile`}
                  className={({ isActive }) =>
                    `py-3 font-display text-2xl font-bold uppercase tracking-tight transition-colors duration-300 ${
                      isActive ? "text-ochre" : "text-white/70 hover:text-white"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
