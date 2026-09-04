# GJW Energy — Website PRD

## Original Problem Statement
Build a sleek, professional, elite-EPC website for GJW Energy — a newly incorporated Kenyan private limited company (solar, energy solutions, engineering). Principal-led engineering & EPC business, technical governance anchored by its Project Lead, supported by specialist suppliers/installers/subcontractors. Services: EPC + Construction + Design + Consultancy, mandate across East Africa. Licences: EPRA Class C1/V1/V2 business licences, A1 electrician licence, EPRA Class T3 Solar PV Technician licence, E&EE degree, Engineers Board of Kenya licensing. Team track record: 20 MWp Solar PV, 10 MWh BESS, transmission & distribution experience, offices in Ngong, Kenya. Inspiration: New Southern Energy, Soventix, Ariya Finergy, Starsight Energy. Contact form required; case studies to be added later.

## User Choices (confirmed)
- Visual style: Mix — dark hero sections with light content sections
- Structure: Multi-page site
- Contact form: Saved to database only (no email notification yet)
- Contact details: Placeholders (info@gjwenergy.co.ke, +254 700 000 000, Ngong, Kajiado County, Kenya) — to be replaced with real details

## User Personas
- IPP / project developer seeking a licensed EPC partner in East Africa
- C&I energy buyer exploring solar PV / BESS
- Financier / consultant validating credentials and track record
- Potential suppliers, installers and subcontractors

## Architecture
- Frontend: React 19 + react-router-dom 7 (multi-page), Tailwind CSS, framer-motion (kinetic hero, scroll reveals), lenis (momentum scrolling), react-fast-marquee (editorial marquee), Shadcn UI (form controls), sonner (toasts)
- Backend: FastAPI, `/api` prefix, MongoDB via motor (MONGO_URL/DB_NAME from env)
- Design system: Obsidian #0A0A0C / Bone #F7F7F5 / Electric Ochre #D97725 / Forest #2B3A2F; Cabinet Grotesk (display), Satoshi (body), JetBrains Mono (labels)

## Implemented (2026-09-03)
- Home: full-height kinetic hero (masked line-by-line reveal, parallax solar-farm photography), ochre editorial marquee, 3-chapter numbered manifesto, dark stats band (20 MWp / 10 MWh / 20+ yrs / 6 licences), asymmetrical services bento, credentials band, CTA
- About: compact kinetic hero, 3 editorial chapters (who we are / operating model / governance), on-site image band, values grid, credentials band
- Services: kinetic hero, dark marquee, asymmetrical capability grid for EPC / Construction / Design / Consultancy, CTA
- Experience: kinetic hero, stats band, three delivery arenas (solar PV, BESS, T&D) with alternating imagery, case-studies "coming soon" teaser, credentials band
- Contact: kinetic hero, contact info column (placeholders), Shadcn-based enquiry form (name, email, phone, company, service select, message) → POST /api/contact → MongoDB, success/error toasts
- Backend: GET /api/ health, POST /api/contact, GET /api/contact (enquiry listing)
- Global: fixed glass navbar with mobile menu, footer with licences strip, Lenis smooth scrolling, scroll-to-top on route change, data-testid coverage

## Verified
- curl: root, POST contact (persisted), GET contact (listed)
- e2e screenshots: all 5 pages render; UI form submission → toast → record present in DB

## Iteration 2 (2026-09-03)
- Added Project Lead spotlight (About page): Eng. Geoffrey Kipyegon — BSc E&EE, EBK licensed, EPRA Class A1 Electrician (Licence No. 6767), EPRA T3 Solar PV Technician, formerly Project Developer at New Southern Energy; monogram portrait panel (real headshot pending from user)
- Repositioned messaging to C&I-predominant: hero descriptions, stats label, services capabilities, experience area renamed "C&I & utility solar PV"
- Added "Sectors we power" interactive section (Home) — Manufacturing, Hospitality, Malls & Retail, Hospitals & Healthcare, Flower Farms & Agri — plus sector chips on Experience
- De-emphasized Ngong across hero/footer/about/contact headings; retained only as office location in contact details
- Verified: spotlight renders with 6 credentials, sectors band hover interaction works, experience chips present

## Iteration 3 (2026-09-03)
- New Case Studies page (/case-studies): 8 East Africa projects sourced from NSE.africa — Tata Chemicals (5.1 MW, Magadi), Devki Group (3.8 MWp, 4 sites), Tatu City (2.05 MW rooftop SEZ), SAJ Ceramics (693 kWp), Waridi Farm (grid-tied horticulture), Wilfay Flowers (274.5 MWh/yr, Subukia), Kinondo Kwetu Resort (off-grid, Diani), Mwale Medical & Technology City (healthcare, Kakamega). Framed as "delivered by GJW Energy team during prior engagements, including with New Southern Energy"; stock imagery pending user's real project photos
- Animated lucide icons added across the site: sector rows (Factory/Hotel/ShoppingBag/HeartPulse/Flower2 with rotate+ochre hover), services cards (Zap/HardHat/DraftingCompass/ClipboardCheck), About values, Experience area image chips, Contact info rows (Mail/Phone/MapPin/Globe2), credentials lists (BadgeCheck)
- Replaced weak About rooftop photo with a dramatic golden-hour solar plant image (+ hover zoom); Experience teaser now links to the live case studies page; nav + footer gained Case Studies links
- Verified: 8 case studies render with capacity/location/detail meta, sector icon hover animation works, About photo loads, no compile errors

## Iteration 4 (2026-09-03)
- Interactive geographical presence map on Home (PresenceMap.jsx + generated mapData.js): real simplified GeoJSON geometry for Kenya, Uganda, Tanzania, Somalia and Somaliland (own polygon from Natural Earth data), SVG draw-in animation on scroll, hover-synced territory list ↔ country highlight (ochre flip), pulsing city markers (Nairobi HQ, Kampala, Dar es Salaam, Mogadishu, Hargeisa), animated dashed arcs radiating from Nairobi, dot-grid texture
- StatsBand numbers now count up on scroll (framer-motion animate + useInView)
- Verified: 12 SVG paths render, each territory highlights independently (Kenya/Uganda/Tanzania/Somalia/Somaliland), count-up completes to correct values

## Iteration 5 (2026-09-03)
- Stats band: "6 EPRA licences" replaced with "5 Countries across our East African footprint"
- Services page: each service card (EPC, Construction, Design, Consultancy) now opens a dark modal on click with an expanded intro and 6 scope highlights (turnkey delivery, power stabilisation, civils/mechanical/electrical works, energy modelling, grid studies, O&M readiness, due diligence etc.) plus a "Discuss this scope" CTA to the contact form; hover reveals a "Click to explore the full scope" hint
- Verified: EPC and Design dialogs open with full scope lists, stat counts up to 5

## Iteration 6 (2026-09-03)
- Real project photos (user-supplied, hosted in /public/images/) placed across the site: rooftop C&I array → Experience area 01; BESS containers → Experience area 02; aerial dusk solar farm → About image band; aerial day solar farm → Services EPC card; inverter room → Home EPC preview card. Hero images untouched; case study imagery unchanged per instruction
- Quality & price positioning added: manifesto chapter 04 "Honest value" + new ValueBand section on Home ("Cheap solar dominates. We build what lasts.") with two pillars — Quality you can verify (Gem icon) and Pricing you can defend (Scale icon), hover-animated
- Verified: all 5 local images load on their sections, chapter 04 renders, ValueBand pillars render

## Iteration 7 (2026-09-03)
- Footer: removed EPRA licence strip; Services column items (EPC/Construction/Design/Consultancy) now link to /services with hover arrows; contact items now icon-led and tappable (mailto:/tel:)
- Contact details updated to real phone +254 722 660 630 (footer + contact page, tel: links)
- About: Eng. Geoffrey Kipyegon re-titled Founder & Technical Director (portrait tag, role line, chapter 02); removed 20 MWp / 10 MWh BESS references from his bio and credentials list
- Verified: founder title renders, no MWp/MWh text in spotlight, footer licences gone, service links and tel:/mailto: hrefs work

## Iteration 8 (2026-09-03)
- PresenceMap rebuilt as dot-matrix style (per user reference): 1,341 SVG dots generated from Natural Earth geometry — presence countries (Kenya, Uganda, Tanzania, Somalia, Somaliland) brighter white, context countries (Ethiopia, South Sudan, DRC, Rwanda, Burundi, Malawi) dim; active territory flips to ochre dots via CSS data-active attribute (no re-render cost); staggered per-country fade-in, pulsing city markers and animated arcs retained
- ProjectLead: real headshot of Eng. Geoffrey Kipyegon (/images/geoffrey.jpg) replaces monogram panel; title updated to Co-Founder & Technical Director (portrait tag, role line, About chapter 02)
- Verified: 1,341 dots render, Tanzania/Kenya hover flips ochre, portrait loads with correct title

## Iteration 9 (2026-09-03)
- Map panel border removed — dot map now floats on the section background
- Per-territory delivered-volume stats panel added to PresenceMap (AnimatePresence swap on hover): Kenya 17 MWp PV / 9 MWh BESS / 5 MVA distribution / 10 km transmission; Uganda 200 kWp PV; Tanzania 1 MWp / 1 MWh; Somalia 1 MWp / 0 MWh; Somaliland 0.8 MWp / 0 MWh — with Sun/BatteryCharging/PlugZap/Cable icons
- Verified: Kenya/Uganda/Somaliland panels swap correctly with the exact figures

## Iteration 10 (2026-09-03)
- Added two new services: Operations & Maintenance (05) and Asset Management (06) — full popup content on Services page (O&M: preventive/corrective maintenance, 24/7 monitoring, spares & warranties, PR guarantees; AM: technical & commercial management, revenue assurance, EPRA compliance, repowering), Home preview cards (O&M solid forest, AM with rooftop photo), footer links, contact form select options, both marquees; Home heading updated to "Six disciplines. One standard."
- Verified: 6 cards render on both pages, O&M dialog opens with full title and 6 scope items

## Iteration 11 (2026-09-04)
- CredentialsBand made region-generic (licensing differs across East Africa): statutory energy-sector licences, licensed electrical contractors, certified solar PV technicians, registered professional engineers, country-specific EPC compliance, local permits & grid approvals; Kenyan EPRA/EBK specifics remain in Geoffrey's About spotlight
- Removed all "Co-Founder" references — single "Founder & Technical Director" throughout
- Geoffrey's portrait shaded with obsidian overlay + bottom gradient to sit into the dark theme
- New installation photos added for body: "From the field" gallery on About (rooftop aerial, inverter corridor, fuse-box close-up); Services Construction card now carries the inverter corridor photo
- Verified: gallery renders 3 photos with captions, portrait shaded with Founder title, generic credentials on Home, Construction card image loads

## Iteration 12 (2026-09-04)
- Removed orange "G" box from navbar logo — clean "GJW Energy" wordmark only
- Removed all New Southern Energy references: Geoffrey's credential now reads "Formerly Project Developer, leading regional EPC"; case studies note now reads "Projects developed, constructed and designed in partnership with regional solar developers, IPPs, EPCs and consultants. Project photography follows shortly."
- Verified: no NSE references on any page, clean logo renders, new note on Case Studies

## Backlog
- P0: Replace placeholder contact details with real email/phone; real headshot for Project Lead panel; real per-case-study photos (user sending)
- P1: Email notification on enquiry (Resend); simple admin view/password for enquiries; SEO meta/OG images per page
- P2: Blog/insights, project map of East Africa, language toggle

## Next Tasks
1. Swap in real project photos per case study when the user sends them
2. Collect real contact details + Project Lead headshot
3. Add email alerts for new enquiries
