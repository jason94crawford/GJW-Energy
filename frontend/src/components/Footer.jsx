import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

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
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  ["EPC", "footer-service-epc"],
                  ["Construction", "footer-service-construction"],
                  ["Design", "footer-service-design"],
                  ["Consultancy", "footer-service-consultancy"],
                  ["O&M", "footer-service-om"],
                  ["Asset Management", "footer-service-asset-management"],
                ].map(([label, id]) => (
                  <li key={id}>
                    <Link
                      to="/services"
                      data-testid={id}
                      className="group inline-flex items-center gap-2 text-white/60 transition-colors duration-300 hover:text-ochre"
                    >
                      {label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Contact</p>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a
                    href="mailto:info@gjwenergy.co.ke"
                    data-testid="footer-email"
                    className="flex items-center gap-2.5 text-white/60 transition-colors duration-300 hover:text-ochre"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-ochre" />
                    info@gjwenergy.co.ke
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+254722660630"
                    data-testid="footer-phone"
                    className="flex items-center gap-2.5 text-white/60 transition-colors duration-300 hover:text-ochre"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-ochre" />
                    +254 722 660 630
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-white/60">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-ochre" />
                  Ngong, Kajiado County, Kenya
                </li>
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
