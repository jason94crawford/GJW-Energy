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

## Iteration 13 (2026-09-04)
- Manifesto chapter 01: "Project Lead" → "Technical Director"
- Sector infographics rebuilt as AI-generated 3D isometric renders (Gemini Nano Banana via universal key, /public/images/infographics/): Manufacturing (rooftop PV, walkways, guardrails, roof access ladder, dock safety lines, BESS), Malls & Retail (rooftop PV + solar carports + EV posts + BESS), Hospitals & Healthcare (rooftop PV, helipad, N+1 BESS), Hospitality (lodge villas, ground-mount PV, silent BESS), Flower Farms & Agri (greenhouses, rammed-pile ground-mount, cold store, BESS) — all in obsidian/navy/ochre palette
- Presentation: clip-path reveal + scale settle on open, mouse-parallax drift (spring), ochre corner ticks, figure caption, notes + legend chips; panel moved to a fixed slot below the sector list with AnimatePresence crossfade (fixed layout-shift hover-flicker bug)
- Verified: retail/agri/healthcare hover switches all swap scenes correctly; manufacturing default renders
- Generation script kept at /app/scripts/gen_infographics.py (uses EMERGENT_LLM_KEY from backend/.env)

## Iteration 14 (2026-09-04)
- Infographic panel now renders in-flow directly below the selected sector row (user request), with 400ms hover-intent delay (glide-past doesn't trigger) and scroll anchoring (useLayoutEffect + lenis immediate scrollTo) so the hovered row stays glued under the cursor when panels open/close — no cascade, no flicker
- Regenerated all 5 infographics darker (night-time theme matching Healthcare): manufacturing now has chimney smoke plumes; hospitality now includes the silent generator unit beside the BESS; agri darkened; all scenes have orange dashed power-flow lines from PV/BESS to loads. Script: /app/scripts/gen_infographics2.py
- Verified via automated browser tests: hover rows 01/02/04/05 each open the correct panel directly below (gap 0), gliding past rows opens nothing; all five v2 renders reviewed visually. Note: the testing_agent subagent referenced in the workflow is not available in this environment — verification was done with scripted browser tests instead

## Iteration 15 (2026-09-04)
- Case Studies note strip enlarged (11px → 16px mono, more padding) and "Project photography follows shortly." removed

## Iteration 16 (2026-09-04)
- Experience hero headline updated to "Built at / utility scale / and speed."

## Iteration 17 (2026-09-04)
- Contact page: "conversation with our Project Lead" → "conversation with our team"; confirmed zero remaining "Project Lead" references site-wide

## Iteration 18 — Surgical Refinement Pass (2026-09-05)
Full refinement brief applied without redesign:
- Removed all "newly incorporated" references; About hero + chapter 01 now use the Kenyan engineering/EPC positioning copy; About CTA heading → "Principal-led. Engineer-first."
- Track record reframed as experience: 20+ MWp / 10+ MWh "engineering & delivery experience", 20+ yrs combined, 5 markets regional experience + "Principal & team project experience" footnote
- Manifesto 03 (multidisciplinary team leadership, not broker language) and 04 (lifecycle value, no competitor attacks) rewritten per brief
- ValueBand → "THE LOWEST CAPEX ISN'T ALWAYS THE LOWEST COST." + refined pillar copy
- CredentialsBand intro → applicable-national-licensing wording (no absolute claims); generic categories retained; EPRA/EBK specifics remain in leadership section
- PresenceMap territory notes now differentiate home market / delivery experience / development experience; stats panel → "Team delivery record"; intro copy softened
- Sector infographics labelled "Typical system configuration · Solar PV + BESS"
- Services: Consultancy → Advisory (full title "Technical Advisory") with PVsyst, energy audits, tender evaluation, commissioning & acceptance testing, performance verification; footer/contact/marquee updated
- Case studies: consistent CAPACITY / SECTOR / COUNTRY / TECHNOLOGY / SCOPE structure + subtle "Principal project experience" tag per project
- ProjectLead portrait via PORTRAIT const for easy future swap

- Performance: loading="lazy" + decoding="async" on all below-fold imagery (hero excluded); metadata: keywords, OG tags, JSON-LD Organization schema
- Mobile: section padding py-24→py-20 (~15% tighter on mobile only, desktop unchanged)
- QA: 390px — zero horizontal overflow on Home/Services, mobile dialog verified; desktop checks for stats/values/manifesto/case-study structure; metadata served correctly

## Iteration 19 — Tata Chemicals Real Photography (2026-09-05)
- Tata Chemicals case study updated per client spec: CAPACITY 5.1 MWp, SECTOR Manufacturing, COUNTRY Kenya · Magadi, TECHNOLOGY On-grid solar · grid stabilisation · distribution & transmission
- Placeholder stock image replaced with real site photography hosted locally in /app/frontend/public/images/: hero = top-down drone aerial of full array (tata-aerial-top.jpg); 2-photo strip below hero = inverter/control room (tata-inverter-room.jpg) + plant at dusk (tata-sunset.jpg)
- Also saved locally for future use: tata-team.jpg (commissioning team aerial), tata-wide-lake.jpg (wide aerial with Lake Magadi)
- CaseStudies.jsx: entries now support an optional `gallery` array (2-col strip under hero); only Tata uses it (flagship entry). Lazy loading retained. Verified: all 3 images load, specs row correct, layout intact at desktop width

## Iteration 20 — Branded Proposal Deck (2026-09-06)
- PresenceMap copy tweak: "hover the map" → "hover over the map"
- Generated /app/GJW_Energy_Techno_Commercial_Proposal.pptx (10 slides, 16:9) via /app/tools/generate_proposal_pptx.py — site brand system applied: obsidian/bone/ochre/forest, Cabinet Grotesk display, Satoshi body, JetBrains Mono kickers/labels, hairline rules, ochre accents
- Slides: cover · about (principal-led positioning + stats) · client brief · technical offer spec sheet · scope of work (A–D) · delivery programme table · track record (real project list + Tata Magadi aerial) · commercial offer price table · payment milestones & terms · next steps/contact close
- All client/price fields are [BRACKETED PLACEHOLDERS] for per-offer editing; fonts are free (Fontshare/Google Fonts) and must be installed on the presenting machine for exact brand rendering
- Verified by rendering all 10 slides to images via LibreOffice: no overflow, layout intact

## Iteration 21 — Proposal Deck Imagery (2026-09-06)
- Cover slide: full-bleed website hero image (Pexels 35105443, saved locally) pre-shaded toward obsidian via PIL to match the site's opacity-40 hero treatment
- New slide 03 "Geographical presence": the site's dot-matrix East Africa map captured live from presence-map-canvas (674×827 PNG on obsidian) alongside the 5-territory list with delivery notes; deck now 11 slides, footers renumbered
- Closing slide: full-bleed shaded Tata Magadi dusk aerial (close-shaded.jpg) behind next-steps/contact
- Assets in /app/tools/assets/ (hero-cover, cover-shaded, close-shaded, presence-map.png); regenerated via tools/generate_proposal_pptx.py; all 11 slides render-verified via LibreOffice

## Iteration 22 — Proposal Deck: O&M + Solution Icons + Scope Transparency (2026-09-06)
- Deck now 14 slides. New slide 05 "The offer at a glance": 6 bordered icon stat boxes (Lucide sun / battery-charging / plug-zap / cable / activity / fuel, rasterised to ochre PNGs via cairosvg) for Solar PV [___] kWp · BESS [___] kWh · Transformer & distribution [___] MVA · Transmission line [___] km · Grid stabilisation [___] kVAR · Generator integration [___] kVA + EPC delivery-model line
- New slide 08 "Scope, in the open — Priced in. Not sprung on you.": two-column transparency list (walkways, guard rails, roof access, safety lines, generator integration, cable management, earthing, as-builts INCLUDED vs utility fees/grid reinforcement/VAT flagged upfront)
- New slide 13 "Optional · Annual O&M": included-plan list (preventive visits, cleaning cycles, 24/7 monitoring, [48]h response, spares, P50 review) + obsidian pricing card ([USD —]/yr or per-kWp) + add-ons; positions recurring revenue
- Kickers/footers renumbered 01–12 sections; spec_rows helper extracted; all 14 slides render-verified via LibreOffice, no out-of-bounds shapes

## Iteration 23 — "Cheap Solar" Failure Infographic (2026-09-09)
- Generated /images/infographics/cheap-solar-failure.png via Gemini image generation (tools/generate_failure_infographic.py) using manufacturing.png as style reference: same obsidian isometric factory scene but failed state — red (off) accent power lines, production meter reading 0 kW, worker falling off guardrail-less roof edge, rusty steel walkway, charred smoking battery container, one PV panel on fire
- ValueBand.jsx: header restructured to 12-col grid — headline/copy left (7), infographic right (5) in hairline white/10 frame with mono caption "What cheap solar becomes — zero output, failed plant, unsafe roof"; lazy loading; data-testid value-band-infographic
- Verified on homepage: image loads, section layout intact desktop; pillars unchanged

## Iteration 24 — Interactive Infographic Zoom (2026-09-09)
- ValueBand infographic: border removed, image sits directly on obsidian; hover subtle scale; caption gains "click to inspect" ochre hint
- Click-to-inspect lightbox: full-screen obsidian/95 overlay, framer-motion fade, click any point on the image to zoom 2.2x anchored at that point (originX/originY), click again to zoom out, ESC / backdrop / X button closes; zoom hint line at bottom
- testids: value-band-zoom-toggle, value-band-lightbox, value-band-lightbox-image, value-band-lightbox-close
- Verified via browser automation: section render, lightbox open, click-point zoom (transform scale(2.2) at clicked origin), ESC close

## Iteration 25 — Failure Infographic: Roof Leakage (2026-09-09)
- Edited cheap-solar-failure.png in place via image-edit pass (tools/add_leakage_to_infographic.py): added water streaming through badly sealed roof penetrations, wet stains streaking down wall cladding, ground puddles, splashed pallets/goods at loading bay — all prior failure elements (fire, rust, worker, smoke, 0 kW meter, red fault lines) preserved
- No code change needed (same file path); verified live: image loads in value-band

## Iteration 26 — Case Studies Priority Order (2026-09-09)
- Reordered case studies to client's master spreadsheet: Tata → Devki → Tatu → SAJ → Kinondo → andBeyond → Solio → Waridi → Mwale (+ Wilfay Flowers retained at end — not on the sheet, kept rather than deleted)
- New entries: andBeyond Lodge (Tanzania, Hospitality, 150 kWp, off-grid PV+BESS, Turnkey EPC, aerial-sunset.jpeg) and Solio Lodge (Kenya, Hospitality, 600 kWp, off-grid PV+BESS, Construction partner, aerial-day.jpeg)
- Data aligned to sheet: capacities normalised (Kinondo 93 kWp, Waridi renamed Waridi Flowers 600 kWp, Mwale 999 kWp, Tatu 2.05 MWp rooftop); scope/role set to "Turnkey EPC" per sheet (Solio "Construction partner"); tech lines prefixed On-grid/Off-grid solar
- Sheet's storage figures after "|" were truncated in the screenshot — existing tech lines retain storage detail; pending confirmation of exact kWh figures
- Verified live: 10 entries render in order, all 13 images load, zero broken

## Backlog
- P0: Replace placeholder contact details with real email/phone; real headshot for Project Lead panel; real per-case-study photos (user sending)
- P1: Email notification on enquiry (Resend); simple admin view/password for enquiries; SEO meta/OG images per page
- P2: Blog/insights, project map of East Africa, language toggle

## Next Tasks
1. Swap in real project photos per case study when the user sends them
2. Collect real contact details + Project Lead headshot
3. Add email alerts for new enquiries
