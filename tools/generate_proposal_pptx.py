#!/usr/bin/env python3
"""GJW Energy — Techno-Commercial Proposal deck generator.

Brand system (from the GJW Energy website):
  obsidian #0A0A0C · bone #F7F7F5 · ochre #D97725 · forest #2B3A2F
  Display: Cabinet Grotesk · Body: Satoshi · Mono: JetBrains Mono
  (Fonts are free — Fontshare / Google Fonts. Install them for exact rendering.)

Output: /app/GJW_Energy_Techno_Commercial_Proposal.pptx (16:9, 14 slides)
Placeholders in [SQUARE BRACKETS] are edited per offer.
Assets (cover/closing imagery, dot-matrix map, icons) live in /app/tools/assets/.
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# ---------------------------------------------------------------- brand tokens
OBSIDIAN = RGBColor(0x0A, 0x0A, 0x0C)
BONE = RGBColor(0xF7, 0xF7, 0xF5)
OCHRE = RGBColor(0xD9, 0x77, 0x25)
FOREST = RGBColor(0x2B, 0x3A, 0x2F)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
INK_55 = RGBColor(0x73, 0x73, 0x71)      # black/55 on bone
INK_35 = RGBColor(0xA6, 0xA6, 0xA3)      # black/35 on bone
PAPER_55 = RGBColor(0x8C, 0x8C, 0x8C)    # white/55 on obsidian
PAPER_25 = RGBColor(0x5A, 0x5A, 0x5E)    # hairline on obsidian
HAIR = RGBColor(0xE3, 0xE3, 0xE0)        # black/10 hairline on bone
EDGE = RGBColor(0xD4, 0xD4, 0xD1)        # black/15 box border on bone

DISPLAY = "Cabinet Grotesk"
BODY = "Satoshi"
MONO = "JetBrains Mono"

SW, SH = Inches(13.333), Inches(7.5)
MARGIN = Inches(0.9)
CW = Inches(13.333 - 1.8)                # content width

ASSETS = "/app/tools/assets"

prs = Presentation()
prs.slide_width = SW
prs.slide_height = SH
BLANK = prs.slide_layouts[6]

REF = "GJW-TCO-[YYYY]-[NNN]"


# ---------------------------------------------------------------- helpers
def slide():
    return prs.slides.add_slide(BLANK)


def bg(s, color):
    r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, SW, SH)
    r.fill.solid(); r.fill.fore_color.rgb = color
    r.line.fill.background(); r.shadow.inherit = False
    return r


def bg_image(s, path):
    """Full-bleed picture, centre-cropped to 16:9."""
    from PIL import Image
    w, h = Image.open(path).size
    img_ratio = w / h
    slide_ratio = 13.333 / 7.5
    pic = s.shapes.add_picture(path, 0, 0, SW, SH)
    if img_ratio > slide_ratio:          # too wide -> crop left/right
        crop = (1 - slide_ratio / img_ratio) / 2
        pic.crop_left = crop; pic.crop_right = crop
    else:                                # too tall -> crop top/bottom
        crop = (1 - img_ratio / slide_ratio) / 2
        pic.crop_top = crop; pic.crop_bottom = crop
    return pic


def box(s, x, y, w, h, fill=None, line=None, line_w=Pt(1)):
    r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    if fill is None:
        r.fill.background()
    else:
        r.fill.solid(); r.fill.fore_color.rgb = fill
    if line is None:
        r.line.fill.background()
    else:
        r.line.color.rgb = line; r.line.width = line_w
    r.shadow.inherit = False
    return r


def _track(run, val):
    """Letter-spacing in 1/100 pt, e.g. 300 = 3pt tracking."""
    run.font._rPr.set("spc", str(val))


def txt(s, x, y, w, h, runs, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP,
        line_spacing=1.0, space_after=0):
    """runs: list of paragraphs; each paragraph is a list of
    (text, font, size, color, bold, tracking) tuples."""
    tbox = s.shapes.add_textbox(x, y, w, h)
    tf = tbox.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    for i, para in enumerate(runs):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = line_spacing
        if space_after:
            p.space_after = Pt(space_after)
        for (t, f, size, color, bold, tracking) in para:
            r = p.add_run(); r.text = t
            r.font.name = f; r.font.size = Pt(size)
            r.font.color.rgb = color; r.font.bold = bold
            if tracking:
                _track(r, tracking)
    return tbox


def kicker(s, text, color=OCHRE, x=MARGIN, y=Inches(0.62)):
    txt(s, x, y, Inches(9), Inches(0.3),
        [[(text, MONO, 11, color, True, 350)]])


def headline(s, text, color, y=Inches(1.05), size=44, w=CW):
    txt(s, MARGIN, y, w, Inches(1.6),
        [[(text.upper(), DISPLAY, size, color, True, -10)]], line_spacing=0.95)


def rule(s, x, y, w, color=OCHRE, h=Pt(2.2)):
    ln = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    ln.fill.solid(); ln.fill.fore_color.rgb = color
    ln.line.fill.background(); ln.shadow.inherit = False
    return ln


def wordmark(s, x, y, dark_bg=True):
    base = WHITE if dark_bg else OBSIDIAN
    muted = PAPER_55 if dark_bg else INK_55
    txt(s, x, y, Inches(3), Inches(0.4),
        [[("GJW ", DISPLAY, 16, base, True, 60),
          ("ENERGY", DISPLAY, 16, muted, False, 60)]])


def footer(s, n, dark_bg=False):
    c = PAPER_55 if dark_bg else INK_35
    txt(s, MARGIN, Inches(7.02), Inches(8), Inches(0.3),
        [[(f"GJW ENERGY — TECHNO-COMMERCIAL PROPOSAL · {REF}", MONO, 8, c, False, 200)]])
    txt(s, Inches(12.15), Inches(7.02), Inches(0.35), Inches(0.3),
        [[(f"{n:02d}", MONO, 9, OCHRE, True, 150)]], align=PP_ALIGN.RIGHT)


def set_cell(cell, paras, fill=None, anchor=MSO_ANCHOR.MIDDLE,
             ml=0.12, mr=0.12, mt=0.05, mb=0.05):
    if fill is not None:
        cell.fill.solid(); cell.fill.fore_color.rgb = fill
    cell.vertical_anchor = anchor
    cell.margin_left = Inches(ml); cell.margin_right = Inches(mr)
    cell.margin_top = Inches(mt); cell.margin_bottom = Inches(mb)
    tf = cell.text_frame; tf.word_wrap = True
    for i, para in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        for (t, f, size, color, bold, tracking) in para:
            r = p.add_run(); r.text = t
            r.font.name = f; r.font.size = Pt(size)
            r.font.color.rgb = color; r.font.bold = bold
            if tracking:
                _track(r, tracking)


def label(s, x, y, text, color=OCHRE, w=Inches(6)):
    txt(s, x, y, w, Inches(0.25),
        [[(text.upper(), MONO, 9, color, True, 250)]])


def body(s, x, y, w, text, color, size=11.5, line_spacing=1.25):
    txt(s, x, y, w, Inches(1), [[(text, BODY, size, color, False, 0)]],
        line_spacing=line_spacing)


def spec_rows(s, rows, y0, row_h, lab_w=Inches(2.6), lab_size=10,
              val_x=Inches(3.6), val_w=Inches(8.8), val_size=12.5,
              val_color=OBSIDIAN, rule_color=HAIR):
    """Ochre mono label + value rows with hairlines, on light bg."""
    y = y0
    for lab, val in rows:
        txt(s, MARGIN, y, lab_w, Inches(0.3),
            [[(lab, MONO, lab_size, OCHRE, True, 220)]])
        txt(s, val_x, y - Inches(0.03), val_w, Inches(0.4),
            [[(val, BODY, val_size, val_color, False, 0)]])
        y += row_h
        rule(s, MARGIN, y - Inches(0.14), Inches(11.53), rule_color, Pt(0.75))
    return y


# ================================================================ 01 · COVER
s = slide(); bg_image(s, f"{ASSETS}/cover-shaded.jpg")
rule(s, MARGIN, Inches(0.9), Inches(0.55))
wordmark(s, MARGIN, Inches(1.15))
txt(s, MARGIN, Inches(2.9), Inches(11), Inches(0.3),
    [[(f"TECHNO-COMMERCIAL PROPOSAL · {REF}", MONO, 12, OCHRE, True, 350)]])
txt(s, MARGIN, Inches(3.3), Inches(11.5), Inches(2.2),
    [[("[SOLAR PV + BESS PLANT]", DISPLAY, 54, WHITE, True, -10)],
     [("[CAPACITY] kWp / [kWh] — [SITE NAME], [COUNTRY]", DISPLAY, 20, RGBColor(0xC9, 0xC9, 0xC9), False, 20)]],
    line_spacing=1.05)
rule(s, MARGIN, Inches(5.9), Inches(11.53), PAPER_25, Pt(0.75))
meta = [("PREPARED FOR", "[CLIENT NAME]"), ("PREPARED BY", "GJW ENERGY LTD"),
        ("DATE", "[DD MONTH YYYY]"), ("VALIDITY", "[30] DAYS")]
mx = MARGIN
for lab, val in meta:
    txt(s, mx, Inches(6.15), Inches(2.7), Inches(0.25),
        [[(lab, MONO, 9, OCHRE, True, 250)]])
    txt(s, mx, Inches(6.42), Inches(2.7), Inches(0.3),
        [[(val, BODY, 12.5, WHITE, False, 0)]])
    mx += Inches(2.92)
txt(s, MARGIN, Inches(7.02), Inches(6), Inches(0.3),
    [[("PRIVATE & CONFIDENTIAL", MONO, 8, PAPER_55, False, 250)]])

# ================================================================ 02 · ABOUT
s = slide(); bg(s, BONE)
kicker(s, "01 — WHO WE ARE")
headline(s, "Principal-led. Engineer-first.", OBSIDIAN)
body(s, MARGIN, Inches(2.15), Inches(6.6),
     "GJW Energy is a Kenyan engineering and EPC company delivering solar PV, "
     "battery storage and grid-integration projects across East Africa. Technical "
     "governance on every project is anchored directly by the company's technical "
     "leadership — the people who design your system are the people accountable "
     "for delivering it.", INK_55, size=12.5, line_spacing=1.3)
body(s, MARGIN, Inches(3.35), Inches(6.6),
     "Mandate across Kenya, Tanzania, Uganda, Somalia and Somaliland — EPC, "
     "construction, design and technical advisory for industrial, agricultural, "
     "hospitality, healthcare and mixed-use clients.", INK_55, size=12.5,
     line_spacing=1.3)
stats = [("20+", "MWp engineering &\ndelivery experience"),
         ("10+", "MWh storage\nexperience"),
         ("05", "territories — regional\ndelivery experience"),
         ("20+", "years combined team\nexperience")]
sx = Inches(8.1)
for i, (num, cap) in enumerate(stats):
    y = Inches(2.0) + Inches(1.18) * i
    txt(s, sx, y, Inches(1.6), Inches(0.6),
        [[(num, DISPLAY, 30, OCHRE, True, -10)]])
    txt(s, Inches(9.7), y + Inches(0.06), Inches(3.1), Inches(0.9),
        [[(line, MONO, 9.5, INK_55, False, 80)] for line in cap.split("\n")],
        line_spacing=1.2)
    if i < 3:
        rule(s, sx, y + Inches(0.98), Inches(4.35), HAIR, Pt(0.75))
rule(s, MARGIN, Inches(5.55), Inches(6.6), HAIR, Pt(0.75))
label(s, MARGIN, Inches(5.75), "What this means for you")
body(s, MARGIN, Inches(6.05), Inches(6.6),
     "One accountable engineering lead from first site visit to final acceptance "
     "testing. No hand-offs, no brokering — design intent survives construction.",
     OBSIDIAN, size=12.5, line_spacing=1.3)
footer(s, 2)

# ================================================================ 03 · PRESENCE MAP
s = slide(); bg(s, OBSIDIAN)
kicker(s, "02 — GEOGRAPHICAL PRESENCE")
headline(s, "One team. Five territories.", WHITE, y=Inches(1.0), size=36, w=Inches(6.6))
body(s, MARGIN, Inches(2.35), Inches(6.4),
     "Headquartered in Kenya, with project delivery and development experience "
     "across the region — one engineering standard, applied everywhere we work.",
     PAPER_55, size=12.5, line_spacing=1.3)
territories = [("01", "KENYA", "Home market · EPRA-licensed delivery"),
               ("02", "UGANDA", "C&I solar & storage"),
               ("03", "TANZANIA", "C&I solar & storage"),
               ("04", "SOMALIA", "Off-grid & diesel displacement"),
               ("05", "SOMALILAND", "Water & utility solar")]
y = Inches(3.45)
for num, name, note in territories:
    txt(s, MARGIN, y, Inches(0.55), Inches(0.3),
        [[(num, MONO, 11, OCHRE, True, 150)]])
    txt(s, Inches(1.55), y - Inches(0.02), Inches(2.6), Inches(0.35),
        [[(name, DISPLAY, 15, WHITE, True, 40)]])
    txt(s, Inches(4.25), y + Inches(0.04), Inches(3.4), Inches(0.3),
        [[(note.upper(), MONO, 8.5, PAPER_55, False, 150)]])
    y += Inches(0.68)
    rule(s, MARGIN, y - Inches(0.18), Inches(6.6), PAPER_25, Pt(0.75))
map_h = Inches(5.9)
map_w = Inches(5.9 * 674 / 827)
s.shapes.add_picture(f"{ASSETS}/presence-map.png", Inches(7.6), Inches(1.0), map_w, map_h)
footer(s, 3, dark_bg=True)

# ================================================================ 04 · UNDERSTANDING
s = slide(); bg(s, BONE)
kicker(s, "03 — YOUR REQUIREMENT")
headline(s, "The brief, as we understand it.", OBSIDIAN)
spec_rows(s, [("CLIENT", "[CLIENT NAME]"),
              ("SITE", "[SITE / FACILITY], [TOWN], [COUNTRY]"),
              ("OBJECTIVE", "[Reduce grid energy costs / secure supply / displace diesel]"),
              ("LOAD PROFILE", "[Daytime baseload ±XXX kW · peak XXX kVA · XX,XXX kWh/month]"),
              ("SUPPLY CONTEXT", "[Utility grid — utility tariff / outage profile / genset backup]"),
              ("CONSTRAINTS", "[Roof or land availability · outage windows · interconnection limits]")],
          Inches(2.2), Inches(0.62))
body(s, MARGIN, Inches(6.25), Inches(11.5),
     "Source: [site visit dated ___ / client data pack / utility bills for ___ months]. "
     "Any assumption stated here is confirmed during detailed design and does not "
     "alter the fixed price unless the physical scope changes.", INK_55, size=11)
footer(s, 4)

# ================================================================ 05 · OFFER AT A GLANCE
s = slide(); bg(s, BONE)
kicker(s, "04 — THE OFFER AT A GLANCE")
headline(s, "One system. Every part sized.", OBSIDIAN)
solutions = [("icon-sun.png", "[___]", "kWp", "SOLAR PV"),
             ("icon-battery-charging.png", "[___]", "kWh", "BATTERY STORAGE (BESS)"),
             ("icon-plug-zap.png", "[___]", "MVA", "TRANSFORMER & DISTRIBUTION"),
             ("icon-cable.png", "[___]", "km", "TRANSMISSION LINE"),
             ("icon-activity.png", "[___]", "kVAR", "GRID STABILISATION"),
             ("icon-fuel.png", "[___]", "kVA", "GENERATOR INTEGRATION")]
bw, gap = Inches(1.83), Inches(0.11)
bx = MARGIN
for icon, val, unit, name in solutions:
    box(s, bx, Inches(2.45), bw, Inches(2.3), line=EDGE, line_w=Pt(1))
    s.shapes.add_picture(f"{ASSETS}/{icon}", bx + Inches(0.18), Inches(2.63), Inches(0.42), Inches(0.42))
    txt(s, bx + Inches(0.18), Inches(3.25), bw - Inches(0.36), Inches(0.4),
        [[(val + " ", DISPLAY, 20, OBSIDIAN, True, -10),
          (unit, MONO, 10, OCHRE, True, 100)]])
    txt(s, bx + Inches(0.18), Inches(3.78), bw - Inches(0.32), Inches(0.8),
        [[(name, MONO, 8, INK_55, False, 120)]], line_spacing=1.25)
    bx += bw + gap
rule(s, MARGIN, Inches(5.25), Inches(11.53), HAIR, Pt(0.75))
txt(s, MARGIN, Inches(5.5), Inches(11.5), Inches(0.3),
    [[("DELIVERY MODEL — ", MONO, 10, OCHRE, True, 250),
      ("EPC · FIXED LUMP-SUM · SINGLE ACCOUNTABLE ENGINEERING LEAD", MONO, 10, OBSIDIAN, True, 200)]])
body(s, MARGIN, Inches(6.05), Inches(11.5),
     "Blank figures are completed per offer after site assessment — elements not "
     "required for your site are marked N/A rather than priced in. Full engineering "
     "detail follows in the technical offer.", INK_55, size=11)
footer(s, 5)

# ================================================================ 06 · TECHNICAL OFFER
s = slide(); bg(s, BONE)
kicker(s, "05 — TECHNICAL OFFER")
headline(s, "Proposed system.", OBSIDIAN)
spec_rows(s, [("SYSTEM SIZE", "[XXX] kWp DC / [XXX] kW AC"),
              ("PV MODULES", "[N × XXX Wp Tier-1 mono / n-type · make per final BOQ]"),
              ("INVERTERS", "[N × XXX kW string inverters · make per final BOQ]"),
              ("STORAGE (OPTION)", "[XXX kWh LFP BESS · hybrid inverter / PCS]"),
              ("GRID INTERFACE", "[Grid-tied / grid-stabilising · protection & synchronisation per utility]"),
              ("MOUNTING", "[Roof / ground-mounted · hot-dip galvanised structure]"),
              ("MONITORING", "[String-level monitoring · remote portal · generation meter]"),
              ("EST. YIELD", "[X,XXX MWh in year one · PR ≥ XX%]")],
          Inches(2.15), Inches(0.52), lab_w=Inches(3.1), val_x=Inches(4.2),
          val_w=Inches(8.2), val_size=12)
body(s, MARGIN, Inches(6.45), Inches(11.5),
     "Engineering basis: PVsyst simulation, utility interconnection study and "
     "structural verification precede construction. All equipment is Tier-1 with "
     "manufacturer warranties registered to the client.", INK_55, size=11)
footer(s, 6)

# ================================================================ 07 · SCOPE OF WORK
s = slide(); bg(s, BONE)
kicker(s, "06 — SCOPE OF WORK")
headline(s, "One contract. Full accountability.", OBSIDIAN)
scope = [("A", "ENGINEERING & DESIGN",
          "Site survey & yield assessment · PVsyst design · single-line diagrams · structural checks · utility application"),
         ("B", "PROCUREMENT",
          "Tier-1 equipment sourcing · factory inspections · logistics & customs · materials received & stored to spec"),
         ("C", "CONSTRUCTION",
          "Civil & structural works · mechanical & electrical installation · grid interconnection · HSE-managed site"),
         ("D", "COMMISSIONING & HANDOVER",
          "Testing & commissioning · acceptance tests with client · as-built dossier · operator training · O&M handover")]
y = Inches(2.25)
for tag, title, desc in scope:
    txt(s, MARGIN, y, Inches(0.5), Inches(0.4),
        [[(tag, MONO, 14, OCHRE, True, 100)]])
    txt(s, Inches(1.55), y + Inches(0.02), Inches(3.6), Inches(0.5),
        [[(title, DISPLAY, 14.5, OBSIDIAN, True, 40)]], line_spacing=1.0)
    txt(s, Inches(5.35), y + Inches(0.02), Inches(7.1), Inches(0.7),
        [[(desc, BODY, 11, INK_55, False, 0)]], line_spacing=1.2)
    y += Inches(0.95)
    rule(s, MARGIN, y - Inches(0.22), Inches(11.53), HAIR, Pt(0.75))
footer(s, 7)

# ================================================================ 08 · SCOPE, IN THE OPEN
s = slide(); bg(s, BONE)
kicker(s, "07 — SCOPE, IN THE OPEN")
headline(s, "Priced in. Not sprung on you.", OBSIDIAN)
included = ["Module cleaning walkways & access paths",
            "Guard rails & edge protection",
            "Roof access — ladders, hatches & steps",
            "Safety lines & anchor points",
            "Generator integration & synchronisation controls",
            "Cable tray, trenching & cable management",
            "Earthing & lightning protection",
            "As-built documentation, training & handover pack"]
excluded = ["Utility application & connection fees",
            "Grid network reinforcement",
            "VAT / import duties — unless expressly stated",
            "Structural roof upgrades beyond the agreed scope",
            "Land works beyond the agreed platform"]
label(s, MARGIN, Inches(2.15), "In our price — items others hide")
y = Inches(2.55)
for item in included:
    txt(s, MARGIN, y, Inches(0.3), Inches(0.3),
        [[("+", MONO, 11, OCHRE, True, 0)]])
    txt(s, Inches(1.25), y + Inches(0.01), Inches(5.2), Inches(0.35),
        [[(item, BODY, 11.5, OBSIDIAN, False, 0)]])
    y += Inches(0.51)
    rule(s, MARGIN, y - Inches(0.13), Inches(5.45), HAIR, Pt(0.75))
label(s, Inches(7.0), Inches(2.15), "Client / utility side — flagged upfront")
y = Inches(2.55)
for item in excluded:
    txt(s, Inches(7.0), y, Inches(0.3), Inches(0.3),
        [[("—", MONO, 11, INK_35, True, 0)]])
    txt(s, Inches(7.35), y + Inches(0.01), Inches(5.05), Inches(0.35),
        [[(item, BODY, 11.5, INK_55, False, 0)]])
    y += Inches(0.51)
    rule(s, Inches(7.0), y - Inches(0.13), Inches(5.43), HAIR, Pt(0.75))
rule(s, MARGIN, Inches(6.15), Inches(11.53), HAIR, Pt(0.75))
body(s, MARGIN, Inches(6.4), Inches(11.5),
     "If it is required to deliver the system properly and safely, it is in our "
     "price. Anything outside scope is flagged before signature — never after.",
     OBSIDIAN, size=12)
footer(s, 8)

# ================================================================ 09 · PROGRAMME
s = slide(); bg(s, BONE)
kicker(s, "08 — DELIVERY PROGRAMME")
headline(s, "Built at utility scale and speed.", OBSIDIAN)
phases = [("01", "Contract & mobilisation", "[WKS 1–2]"),
          ("02", "Detailed design & utility approvals", "[WKS 2–5]"),
          ("03", "Procurement & logistics", "[WKS 4–10]"),
          ("04", "Construction & installation", "[WKS 8–16]"),
          ("05", "Testing, commissioning & handover", "[WKS 16–18]")]
tbl = s.shapes.add_table(6, 3, MARGIN, Inches(2.3), CW, Inches(3.6)).table
tbl.columns[0].width = Inches(1.1)
tbl.columns[1].width = Inches(7.6)
tbl.columns[2].width = Inches(2.83)
hdr = ["", "PHASE", "TIMELINE"]
for c, t in enumerate(hdr):
    set_cell(tbl.cell(0, c), [[(t, MONO, 9.5, OCHRE, True, 250)]], fill=OBSIDIAN)
for i, (num, name, wks) in enumerate(phases, start=1):
    fill = WHITE if i % 2 else BONE
    set_cell(tbl.cell(i, 0), [[(num, MONO, 11, OCHRE, True, 100)]], fill=fill)
    set_cell(tbl.cell(i, 1), [[(name, BODY, 12, OBSIDIAN, True, 0)]], fill=fill)
    set_cell(tbl.cell(i, 2), [[(wks, MONO, 10.5, INK_55, False, 100)]], fill=fill)
body(s, MARGIN, Inches(6.25), Inches(11.5),
     "Programme assumes timely utility approvals and site access. A week-by-week "
     "schedule is issued at contract signature and tracked to completion.",
     INK_55, size=11)
footer(s, 9)

# ================================================================ 10 · TRACK RECORD
s = slide(); bg(s, OBSIDIAN)
kicker(s, "09 — PROOF, NOT PROMISES")
headline(s, "Delivered by this team.", WHITE)
track = [("TATA CHEMICALS · MAGADI, KENYA", "5.1 MWp on-grid solar · grid stabilisation · D&T"),
         ("DEVKI GROUP PORTFOLIO · KENYA", "3.8 MWp rooftop across 4 manufacturing sites"),
         ("TATU CITY SEZ · KENYA", "2.05 MW rooftop · 3,468 modules · mixed-use city"),
         ("SAJ CERAMICS · KENYA", "693 kWp rooftop + genset control"),
         ("KINONDO KWETU · DIANI, KENYA", "Off-grid solar PV + BESS · diesel displaced")]
y = Inches(2.3)
for name, detail in track:
    txt(s, MARGIN, y, Inches(6.6), Inches(0.3),
        [[(name, DISPLAY, 13, WHITE, True, 40)]])
    txt(s, MARGIN, y + Inches(0.32), Inches(6.6), Inches(0.3),
        [[(detail, MONO, 9, PAPER_55, False, 120)]])
    y += Inches(0.83)
    rule(s, MARGIN, y - Inches(0.19), Inches(6.6), PAPER_25, Pt(0.75))
img = s.shapes.add_picture("/app/frontend/public/images/tata-aerial-top.jpg",
                           Inches(8.15), Inches(2.3), Inches(4.28))
img.crop_top = 0.08; img.crop_bottom = 0.08
rule(s, Inches(8.15), Inches(2.3), Inches(4.28), OCHRE, Pt(2.2))
txt(s, Inches(8.15), Inches(6.72), Inches(4.3), Inches(0.3),
    [[("TATA CHEMICALS MAGADI — 5.1 MWP · COMMISSIONED [2025]", MONO, 8, PAPER_55, False, 150)]])
footer(s, 10, dark_bg=True)

# ================================================================ 11 · THE ALTERNATIVE
s = slide(); bg(s, OBSIDIAN)
kicker(s, "10 — THE ALTERNATIVE")
headline(s, "The lowest capex isn't", WHITE, y=Inches(1.0), size=36)
txt(s, MARGIN, Inches(1.62), CW, Inches(0.7),
    [[("ALWAYS THE LOWEST COST.", DISPLAY, 36, OCHRE, True, -10)]])
body(s, MARGIN, Inches(2.55), Inches(6.0),
     "Cheap solar fails quietly at first — then all at once. What a cut-price "
     "installation leaves off the BOQ returns as fire risk, corrosion, water "
     "damage and an unsafe roof. The repair bill arrives with interest.",
     PAPER_55, size=12, line_spacing=1.3)
faults = [("PANEL FIRE", "poor DC connections ignite"),
          ("CORRODED WALKWAYS", "mild steel, not aluminium"),
          ("WATER INGRESS", "failed roof penetrations"),
          ("NO GUARDRAILS", "no safety lines — a fall waiting"),
          ("THERMAL RUNAWAY", "under-spec BESS vents & burns"),
          ("0 kW OUTPUT", "production meter reads zero")]
fy = Inches(4.0)
for i, (t, d) in enumerate(faults):
    fx = MARGIN if i % 2 == 0 else Inches(4.1)
    yy = fy + Inches(0.72) * (i // 2)
    txt(s, fx, yy, Inches(3.1), Inches(0.3),
        [[(t, MONO, 9.5, OCHRE, True, 200)]])
    txt(s, fx, yy + Inches(0.24), Inches(3.1), Inches(0.3),
        [[(d.upper(), MONO, 8, PAPER_55, False, 120)]])
fail_img = s.shapes.add_picture(
    "/app/frontend/public/images/infographics/cheap-solar-failure.png",
    Inches(7.6), Inches(2.2), Inches(4.83))
rule(s, Inches(7.6), Inches(2.2), Inches(4.83), OCHRE, Pt(2.2))
txt(s, Inches(7.6), Inches(2.2) + Inches(4.83 * 768 / 1408 / 2) * 2 + Inches(0.15), Inches(4.83), Inches(0.3),
    [[("WHAT CHEAP SOLAR BECOMES — ZERO OUTPUT, FAILED PLANT, UNSAFE ROOF", MONO, 7.5, PAPER_55, False, 120)]])
footer(s, 11, dark_bg=True)

# ================================================================ 12 · COMMERCIAL OFFER
s = slide(); bg(s, BONE)
kicker(s, "11 — COMMERCIAL OFFER")
headline(s, "Priced once. Priced properly.", OBSIDIAN, y=Inches(1.0), size=36)
rows = [("1", "Engineering, design & approvals", "[USD —]"),
        ("2", "Equipment supply — PV, inverters[, BESS], BOS", "[USD —]"),
        ("3", "Civil, structural & electrical installation", "[USD —]"),
        ("4", "Grid interconnection & protection", "[USD —]"),
        ("5", "Testing, commissioning & handover", "[USD —]"),
        ("6", "[Optional: year-one O&M & performance monitoring]", "[USD —]")]
tbl = s.shapes.add_table(9, 3, MARGIN, Inches(2.45), CW, Inches(3.6)).table
tbl.columns[0].width = Inches(0.8)
tbl.columns[1].width = Inches(8.13)
tbl.columns[2].width = Inches(2.6)
for c, t in enumerate(["", "SCOPE LINE", "AMOUNT"]):
    set_cell(tbl.cell(0, c), [[(t, MONO, 9.5, OCHRE, True, 250)]], fill=OBSIDIAN)
for i, (num, item, amt) in enumerate(rows, start=1):
    fill = WHITE if i % 2 else BONE
    set_cell(tbl.cell(i, 0), [[(num, MONO, 11, OCHRE, True, 100)]], fill=fill)
    set_cell(tbl.cell(i, 1), [[(item, BODY, 12, OBSIDIAN, False, 0)]], fill=fill)
    set_cell(tbl.cell(i, 2), [[(amt, MONO, 10.5, INK_55, False, 100)]], fill=fill)
set_cell(tbl.cell(7, 0), [[("", MONO, 11, OCHRE, True, 0)]], fill=FOREST)
set_cell(tbl.cell(7, 1), [[("SUBTOTAL — SUPPLY & INSTALL (EXCL. VAT)", MONO, 10.5, WHITE, True, 150)]], fill=FOREST)
set_cell(tbl.cell(7, 2), [[("[USD —]", MONO, 10.5, WHITE, True, 100)]], fill=FOREST)
set_cell(tbl.cell(8, 0), [[("", MONO, 11, OCHRE, True, 0)]], fill=OBSIDIAN)
set_cell(tbl.cell(8, 1), [[("TOTAL CONTRACT PRICE (INCL. TAXES AS STATED)", MONO, 10.5, WHITE, True, 150)]], fill=OBSIDIAN)
set_cell(tbl.cell(8, 2), [[("[USD —]", MONO, 10.5, OCHRE, True, 100)]], fill=OBSIDIAN)
body(s, MARGIN, Inches(6.35), Inches(11.5),
     "Fixed, lump-sum turnkey price. No variation unless physical scope changes. "
     "Currency: [USD/KES] · price basis: [DDP site / ex-works + install].",
     INK_55, size=11)
footer(s, 12)

# ================================================================ 13 · TERMS
s = slide(); bg(s, BONE)
kicker(s, "12 — COMMERCIAL TERMS")
headline(s, "Clear terms. No surprises.", OBSIDIAN)
pay = [("30%", "Contract signature & mobilisation"),
       ("40%", "Major equipment delivered to site"),
       ("20%", "Mechanical completion"),
       ("10%", "Commissioning & acceptance")]
px = MARGIN
for pct, desc in pay:
    rule(s, px, Inches(2.35), Inches(2.6), OBSIDIAN, Pt(1.5))
    txt(s, px, Inches(2.5), Inches(2.6), Inches(0.5),
        [[(pct, DISPLAY, 26, OCHRE, True, -10)]])
    txt(s, px, Inches(3.05), Inches(2.55), Inches(0.7),
        [[(desc.upper(), MONO, 9, INK_55, False, 150)]], line_spacing=1.25)
    px += Inches(2.98)
spec_rows(s, [("VALIDITY", "This offer remains open for [30] days from the date of issue."),
              ("WARRANTIES", "Modules [12/25] yrs product & performance · inverters [5–10] yrs · workmanship [2] yrs."),
              ("PERFORMANCE", "Year-one yield per PVsyst P50 estimate · measured at the generation meter."),
              ("EXCLUSIONS", "Utility connection fees · grid reinforcement · unforeseen civils · VAT unless stated."),
              ("GOVERNING TERMS", "[FIDIC-based / client contract] · Kenyan law · amicable resolution then arbitration.")],
          Inches(4.1), Inches(0.52), val_size=11.5)
footer(s, 13)

# ================================================================ 14 · OPTIONAL O&M
s = slide(); bg(s, BONE)
kicker(s, "13 — OPTIONAL · ANNUAL O&M")
headline(s, "Built properly. Kept performing.", OBSIDIAN, size=40)
label(s, MARGIN, Inches(2.2), "Included in the annual plan")
om = ["Scheduled preventive maintenance — [2] visits / year",
      "Module cleaning — [N] cycles / year",
      "24/7 remote monitoring & monthly performance report",
      "Breakdown response within [48] hours",
      "Spare-parts management & warranty administration",
      "Annual performance review against the P50 yield estimate"]
y = Inches(2.6)
for item in om:
    txt(s, MARGIN, y, Inches(0.3), Inches(0.3),
        [[("+", MONO, 11, OCHRE, True, 0)]])
    txt(s, Inches(1.25), y + Inches(0.01), Inches(5.6), Inches(0.35),
        [[(item, BODY, 11.5, OBSIDIAN, False, 0)]])
    y += Inches(0.56)
    rule(s, MARGIN, y - Inches(0.15), Inches(5.9), HAIR, Pt(0.75))
box(s, Inches(7.6), Inches(2.2), Inches(4.83), Inches(3.75), fill=OBSIDIAN)
txt(s, Inches(7.95), Inches(2.5), Inches(4.2), Inches(0.3),
    [[("ANNUAL O&M PLAN", MONO, 10, OCHRE, True, 300)]])
txt(s, Inches(7.95), Inches(2.9), Inches(4.2), Inches(0.6),
    [[("[USD —] ", DISPLAY, 30, WHITE, True, -10),
      ("/ YEAR", MONO, 11, PAPER_55, True, 150)]])
txt(s, Inches(7.95), Inches(3.6), Inches(4.2), Inches(0.3),
    [[("OR [USD —] PER kWp PER YEAR", MONO, 9.5, PAPER_55, False, 150)]])
rule(s, Inches(7.95), Inches(4.1), Inches(4.13), PAPER_25, Pt(0.75))
txt(s, Inches(7.95), Inches(4.3), Inches(4.2), Inches(1.5),
    [[("ADD-ONS", MONO, 9, OCHRE, True, 250)],
     [("Extended warranty wrap — [OPT]", BODY, 11, WHITE, False, 0)],
     [("Additional cleaning cycles — [OPT]", BODY, 11, WHITE, False, 0)],
     [("Security & guarding — [OPT]", BODY, 11, WHITE, False, 0)]],
    line_spacing=1.35)
body(s, MARGIN, Inches(6.35), Inches(11.5),
     "O&M clients hold priority breakdown response. Systems we maintain carry our "
     "name — we keep them performing.", OBSIDIAN, size=12)
footer(s, 14)

# ================================================================ 15 · CLOSE
s = slide(); bg_image(s, f"{ASSETS}/close-shaded.jpg")
rule(s, MARGIN, Inches(0.9), Inches(0.55))
wordmark(s, MARGIN, Inches(1.15))
kicker(s, "NEXT STEPS", y=Inches(2.7))
txt(s, MARGIN, Inches(3.05), Inches(11.5), Inches(1.8),
    [[("Your sector. Your site.", DISPLAY, 44, WHITE, True, -10)],
     [("Built properly, once.", DISPLAY, 44, OCHRE, True, -10)]],
    line_spacing=1.02)
steps = [("01", "Site visit & data confirmation — [week of ___]"),
         ("02", "Final BOQ & contract signature"),
         ("03", "Mobilisation within [2] weeks of signature")]
y = Inches(5.1)
for num, step in steps:
    txt(s, MARGIN, y, Inches(0.5), Inches(0.3),
        [[(num, MONO, 11, OCHRE, True, 100)]])
    txt(s, Inches(1.45), y, Inches(6.2), Inches(0.3),
        [[(step, BODY, 12, WHITE, False, 0)]])
    y += Inches(0.45)
txt(s, Inches(8.6), Inches(5.1), Inches(3.9), Inches(1.4),
    [[("INFO@GJWENERGY.CO.KE", MONO, 10.5, WHITE, True, 150)],
     [("+254 722 660 630", MONO, 10.5, WHITE, False, 150)],
     [("NAIROBI, KENYA", MONO, 10.5, PAPER_55, False, 150)],
     [("GJWENERGY.CO.KE", MONO, 10.5, OCHRE, True, 150)]],
    line_spacing=1.6)
footer(s, 15, dark_bg=True)

OUT = "/app/GJW_Energy_Techno_Commercial_Proposal.pptx"
prs.save(OUT)
print("Saved", OUT, "·", len(prs.slides._sldIdLst), "slides")
