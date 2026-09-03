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

## Backlog
- P0: Replace placeholder contact details with real email/phone; case studies section (user-planned)
- P1: Email notification on enquiry (Resend); simple admin view/password for enquiries; SEO meta/OG images per page
- P2: Blog/insights, team profiles, project map of East Africa, language toggle

## Next Tasks
1. Collect real contact details and swap placeholders
2. Design + build case studies pages when project content is ready
3. Add email alerts for new enquiries
