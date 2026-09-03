import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-obsidian text-white" data-testid="footer">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-4xl font-extrabold uppercase leading-none tracking-tighter sm:text-5xl">
              GJW
              <br />
              <span className="text-ochre">Energy</span>
            </p>
            <p className="mt-6 text-sm leading-relaxed text-white/50">
              Principal-led engineering and EPC for commercial & industrial solar PV, battery
              storage and grid infrastructure. Based in Kenya, delivering across East Africa.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40" data-testid="footer-licenses">
              EPRA C1 · V1 · V2 · A1 · T3 Solar PV · EBK
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Explore</p>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  ["Home", "/", "footer-link-home"],
                  ["About", "/about", "footer-link-about"],
                  ["Services", "/services", "footer-link-services"],
                  ["Experience", "/experience", "footer-link-experience"],
                  ["Case Studies", "/case-studies", "footer-link-case-studies"],
                  ["Contact", "/contact", "footer-link-contact"],
                ].map(([label, to, id]) => (
                  <li key={to}>
                    <Link to={to} data-testid={id} className="text-white/60 transition-colors duration-300 hover:text-ochre">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Services</p>
              <ul className="mt-5 space-y-3 text-sm text-white/60">
                <li>EPC</li>
                <li>Construction</li>
                <li>Design</li>
                <li>Consultancy</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Contact</p>
              <ul className="mt-5 space-y-3 text-sm text-white/60">
                <li data-testid="footer-email">info@gjwenergy.co.ke</li>
                <li data-testid="footer-phone">+254 700 000 000</li>
                <li>Ngong, Kajiado County, Kenya</li>
              </ul>
              <Link
                to="/contact"
                data-testid="footer-cta"
                className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ochre transition-colors duration-300 hover:text-white"
              >
                Start a project
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/10 pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 GJW Energy Ltd. All rights reserved.</p>
          <p>Kenya · East Africa</p>
        </div>
      </div>
    </footer>
  );
}
