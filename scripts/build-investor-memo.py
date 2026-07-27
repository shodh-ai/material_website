from __future__ import annotations

import html
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Investor-Memo.md"
OUTPUT_DIR = ROOT / "public" / "investor-memo"
OUTPUT = OUTPUT_DIR / "index.html"


def unescape_markdown(value: str) -> str:
    return re.sub(r"\\([\\`*{}\[\]()#+\-.!><~&$])", r"\1", value)


def inline_markup(value: str) -> str:
    value = unescape_markdown(value.strip())
    value = html.escape(value, quote=False)
    value = value.replace("&lt;br&gt;", "<br>")
    value = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", value)
    value = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<em>\1</em>", value)
    return value


def valley_visual() -> str:
    return """
    <figure class="memo-pitch-valley" aria-label="Two funding mountains surrounding the dark scale-up gap occupied by Shodh">
      <div class="valley-diagram">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="none" role="img" aria-hidden="true">
          <defs>
            <linearGradient id="memoPitchValleyLeft" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stop-color="#ffffff" stop-opacity="0.46" />
              <stop offset="0.62" stop-color="#ffffff" stop-opacity="0.82" />
              <stop offset="1" stop-color="#ffffff" />
            </linearGradient>
            <linearGradient id="memoPitchValleyRight" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stop-color="#ffffff" />
              <stop offset="0.38" stop-color="#ffffff" stop-opacity="0.82" />
              <stop offset="1" stop-color="#ffffff" stop-opacity="0.46" />
            </linearGradient>
          </defs>
          <path d="M 0 900 L 0 655 C 90 625 170 555 245 465 C 300 400 320 342 385 325 C 460 305 515 385 555 465 C 600 535 650 625 690 710 C 710 770 720 810 730 830 L 730 900 Z" fill="url(#memoPitchValleyLeft)" opacity="0.92" />
          <path d="M 870 900 L 870 830 C 880 810 890 770 910 710 C 950 625 1000 535 1065 455 C 1110 375 1165 270 1240 280 C 1310 290 1350 385 1410 465 C 1475 555 1540 625 1600 650 L 1600 900 Z" fill="url(#memoPitchValleyRight)" opacity="0.92" />
        </svg>
        <div class="valley-copy">
          <div class="valley-cost-block">
            <strong>Drug-launch delay: ~$500K per day</strong>
            <strong>1% yield loss: ~$1–10M for a battery factory</strong>
            <p>Millions in experiments · 1–5 years of pilot runs · delayed production</p>
          </div>
          <div class="valley-mountain-copy left">
            <p class="valley-kicker">Discovery AI</p>
            <p class="valley-money">Isomorphic · $2.1B</p>
            <p class="valley-names">Insilico · Lila · Periodic · CuspAI</p>
          </div>
          <div class="valley-gap-copy">
            <p class="valley-gap-title">The scale-up gap</p>
            <p class="valley-gap-path">LAB → PILOT → FACTORY</p>
          </div>
          <div class="valley-shodh">
            <strong>SHODH</strong>
            <span>Molecule → factory</span>
          </div>
          <div class="valley-mountain-copy right">
            <p class="valley-kicker">Engineering AI</p>
            <p class="valley-money">Prometheus · $18B+</p>
            <p class="valley-names">PhysicsX · $300M at $2.4B</p>
          </div>
        </div>
      </div>
    </figure>
    """


def io_visual() -> str:
    return """
    <figure class="memo-visual io-visual" aria-label="Shodh input and output engine">
      <div class="visual-eyebrow">The input-output engine</div>
      <div class="io-grid">
        <div class="io-card">
          <span>Inputs</span>
          <b>Molecule / biologic</b>
          <b>Process data</b>
          <b>Equipment geometry</b>
          <b>Operating constraints</b>
        </div>
        <div class="io-core"><small>FORWARD + INVERSE</small><strong>SHODH</strong></div>
        <div class="io-card io-card-dark">
          <span>Outputs</span>
          <b>Outcome prediction</b>
          <b>Failure diagnosis</b>
          <b>Operating window</b>
          <b>Scale-up configuration</b>
        </div>
      </div>
    </figure>
    """


def product_visual() -> str:
    return """
    <figure class="memo-visual product-visual" aria-label="Shodh Scale and Shodh Synth">
      <div class="visual-eyebrow">One platform · two deployment modules</div>
      <div class="product-grid">
        <div class="product-card">
          <span>Factory intelligence</span>
          <strong>SHODH SCALE</strong>
          <p>Transfer and optimise existing processes in industrial equipment.</p>
        </div>
        <div class="product-card product-card-dark">
          <span>Process intelligence</span>
          <strong>SHODH SYNTH</strong>
          <p>Design new routes and processes backwards from the required result.</p>
        </div>
      </div>
    </figure>
    """


def result_visual() -> str:
    return """
    <figure class="memo-visual result-visual" aria-label="Prospective industrial validation result">
      <div class="visual-eyebrow">Prospective industrial validation · Aarti Industries</div>
      <div class="result-grid">
        <div class="metric-card">
          <span>Baseline</span>
          <strong>82.4%</strong>
          <small>YIELD</small>
          <b>12.3% impurity</b>
        </div>
        <div class="recommendation-card">
          <span>SHODH RECOMMENDATION</span>
          <b>Process bottleneck identified</b>
          <b>Continuous-flow configuration</b>
          <b>Operating and cooling window</b>
          <small>LOCKED BEFORE EXECUTION</small>
        </div>
        <div class="metric-card">
          <span>Physical result</span>
          <strong>96.7%</strong>
          <small>YIELD</small>
          <b>3.1% impurity</b>
        </div>
      </div>
      <div class="result-strip">+14.3 percentage points in yield · −9.2 percentage points in impurity</div>
    </figure>
    """


def market_visual() -> str:
    return """
    <figure class="memo-visual market-visual" aria-label="Bottom-up market construction">
      <div class="visual-eyebrow">Bottom-up market construction</div>
      <div class="market-total">$10B+ <span>initial addressable market</span></div>
      <div class="market-grid">
        <div><small>THE SAAS FLOOR</small><strong>$1.0B ARR</strong></div>
        <div class="market-dark"><small>SCALE GAIN-SHARE</small><strong>$4.0B+ ARR</strong></div>
        <div><small>SYNTH IP &amp; MILESTONES</small><strong>$5.0B+ annually</strong></div>
      </div>
    </figure>
    """


SPECIAL_HEADINGS = {
    "The limitation of the existing stack",
    "The inverse-design opportunity",
    "The input-output engine",
    "Shodh SCALE — Factory Intelligence",
    "Shodh SYNTH — Process Intelligence",
    "Inputs",
    "Outputs",
    "Proven Today",
    "Still Being Established (The Goal of this Round)",
    "Conclusion",
}


def render_markdown(source: str) -> str:
    lines = source.splitlines()
    out: list[str] = []
    i = 0
    list_open = False
    section_open = False
    section_index = 0

    def close_list() -> None:
        nonlocal list_open
        if list_open:
            out.append("</ul>")
            list_open = False

    def close_section() -> None:
        nonlocal section_open
        if section_open:
            out.append("</section>")
            section_open = False

    while i < len(lines):
        raw = lines[i].rstrip()
        value = unescape_markdown(raw.strip())

        if value.startswith("Energy and materials: a 1% yield loss in a battery factory can represent"):
            fragments = [value]
            while i + 1 < len(lines) and "annual economic loss." not in fragments[-1]:
                i += 1
                fragments.append(unescape_markdown(lines[i].strip()))
            value = " ".join(fragment for fragment in fragments if fragment)

        if not value:
            close_list()
            i += 1
            continue

        if value == "***":
            close_list()
            out.append('<div class="section-rule"></div>')
            i += 1
            continue

        if value.startswith("|") and i + 1 < len(lines):
            close_list()
            rows: list[list[str]] = []
            while i < len(lines):
                table_line = unescape_markdown(lines[i].strip())
                if not table_line.startswith("|"):
                    break
                cells = [cell.strip() for cell in table_line.strip("|").split("|")]
                rows.append(cells)
                i += 1
            if len(rows) >= 2:
                out.append('<div class="table-wrap"><table>')
                out.append("<thead><tr>" + "".join(f"<th>{inline_markup(c)}</th>" for c in rows[0]) + "</tr></thead>")
                out.append("<tbody>")
                for row in rows[2:]:
                    out.append("<tr>" + "".join(f"<td>{inline_markup(c)}</td>" for c in row) + "</tr>")
                out.append("</tbody></table></div>")
            continue

        heading_match = re.match(r"^(#{2,3})\s+(.+)$", value)
        numbered_section = re.match(r"^(\d+)\.\s+(.+)$", value)
        numbered_subsection = re.match(r"^(\d+\.\d+)\s+(.+)$", value)
        if heading_match or numbered_section or numbered_subsection:
            close_list()
            if heading_match:
                hashes, title = heading_match.groups()
                tag = "h2" if len(hashes) == 2 else "h3"
            elif numbered_subsection:
                number, title = numbered_subsection.groups()
                tag = "h3"
                title = f"{number} {title}"
            else:
                number, title = numbered_section.groups()
                tag = "h2"
                title = f"{number}. {title}"
            if tag == "h2":
                close_section()
                section_index += 1
                tone = ("atmosphere", "paper", "split", "paper", "deep")[(section_index - 1) % 5]
                out.append(f'<section class="memo-section memo-section-{section_index} tone-{tone}">')
                section_open = True
            out.append(f'<{tag} class="memo-heading">{inline_markup(title)}</{tag}>')
            i += 1
            continue

        if value in SPECIAL_HEADINGS:
            close_list()
            tag = "h4" if value not in {"Inputs", "Outputs"} else "h5"
            out.append(f"<{tag}>{inline_markup(value)}</{tag}>")
            i += 1
            continue

        if value.startswith(">"):
            close_list()
            out.append(f'<blockquote>{inline_markup(value[1:].strip())}</blockquote>')
            i += 1
            continue

        bullet = re.match(r"^\*\s+(.*)$", value)
        if bullet:
            if not list_open:
                out.append("<ul>")
                list_open = True
            out.append(f"<li>{inline_markup(bullet.group(1))}</li>")
            if "projecting a potential $2.4M annual value per production line." in value:
                close_list()
                out.append(result_visual())
            i += 1
            continue

        close_list()
        classes = []
        if value.endswith(":") and len(value) < 110:
            classes.append("lead-in")
        if value.startswith("How does a molecule") or value.startswith("Given a required yield"):
            classes.append("pull-quote")
        class_attr = f' class="{" ".join(classes)}"' if classes else ""
        out.append(f"<p{class_attr}>{inline_markup(value)}</p>")

        if value == "This is the scale-up gap.":
            out.append(valley_visual())
        elif value == "Quantified uncertainty around the recommendation.":
            out.append(io_visual())
        elif value == "SCALE makes existing production more intelligent. SYNTH designs the processes industry should run next.":
            out.append(product_visual())
        elif "projecting a potential $2.4M annual value per production line." in value:
            out.append(result_visual())
        elif value == "This creates an initial addressable market in excess of **$10 billion**.":
            out.append(market_visual())
        i += 1

    close_list()
    close_section()
    return "\n".join(out)


CSS = r"""
@font-face {
  font-family: "Syne";
  src: url("/shodh-new/Syne/Syne-VariableFont_wght.ttf") format("truetype");
  font-weight: 100 900;
  font-display: swap;
}

:root {
  --navy: #000042;
  --ink: #171740;
  --muted: rgba(0, 0, 66, .64);
  --rule: rgba(0, 0, 66, .15);
  --paper: rgba(255, 255, 255, .93);
  --blue: #c8d8ef;
}

* { box-sizing: border-box; }
html { background: #aebfd8; }
body {
  margin: 0;
  color: var(--ink);
  background:
    linear-gradient(rgba(200, 216, 239, .88), rgba(200, 216, 239, .88)),
    url("/webgl-bg-foundation-v2.png") center top / cover fixed;
  font-family: "Syne", Arial, sans-serif;
  font-size: 10.1pt;
  line-height: 1.52;
  -webkit-font-smoothing: antialiased;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.screen-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 58px;
  padding: 0 28px;
  border-bottom: 1px solid var(--rule);
  background: rgba(235, 243, 252, .82);
  backdrop-filter: blur(20px);
}
.screen-header img { width: 28px; filter: invert(1); }
.screen-header span {
  color: var(--navy);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
}

.memo-shell {
  width: 210mm;
  margin: 20px auto 60px;
  padding: 18mm 16mm 20mm;
  background:
    linear-gradient(rgba(255, 255, 255, .90), rgba(255, 255, 255, .90)),
    url("/webgl-bg-foundation-v2.png") center / cover;
  box-shadow: 0 28px 80px rgba(0, 0, 66, .18);
}

.memo-brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13mm;
  padding-bottom: 5mm;
  border-bottom: 1px solid var(--rule);
}
.memo-brand img { width: 31px; filter: invert(1); }
.memo-brand span {
  color: rgba(0, 0, 66, .48);
  font-size: 8pt;
  font-weight: 700;
  letter-spacing: .17em;
  text-transform: uppercase;
}

.memo-content { max-width: 100%; }
.memo-heading {
  color: var(--navy);
  letter-spacing: -.035em;
  break-after: avoid;
  page-break-after: avoid;
}
h2.memo-heading {
  margin: 0 0 8mm;
  padding-top: 2mm;
  font-size: 29pt;
  font-weight: 520;
  line-height: 1.04;
  break-before: page;
  page-break-before: always;
}
h2.memo-heading:first-child { break-before: auto; page-break-before: auto; }
h3.memo-heading {
  margin: 8mm 0 3mm;
  padding-top: 2mm;
  border-top: 1px solid var(--rule);
  font-size: 17pt;
  font-weight: 560;
  line-height: 1.12;
}
h4 {
  margin: 7mm 0 2.5mm;
  color: var(--navy);
  font-size: 13.5pt;
  font-weight: 650;
  letter-spacing: -.02em;
  break-after: avoid;
}
h5 {
  display: inline-flex;
  margin: 4mm 0 2mm;
  padding: 1.4mm 3mm;
  border: 1px solid var(--rule);
  border-radius: 999px;
  color: var(--navy);
  font-size: 8pt;
  letter-spacing: .14em;
  text-transform: uppercase;
  break-after: avoid;
}

p { margin: 0 0 3.4mm; orphans: 3; widows: 3; }
p.lead-in {
  margin-top: 5mm;
  color: var(--navy);
  font-weight: 650;
}
.pull-quote {
  margin: 6mm 0;
  padding: 5mm 6mm;
  border-left: 3px solid var(--navy);
  background: rgba(255,255,255,.65);
  color: var(--navy);
  font-size: 14pt;
  font-weight: 520;
  line-height: 1.32;
  letter-spacing: -.02em;
  break-inside: avoid;
}
strong { color: var(--navy); font-weight: 700; }
em { color: rgba(0, 0, 66, .78); }

ul {
  margin: 1mm 0 4mm;
  padding: 0;
  list-style: none;
}
li {
  position: relative;
  margin: 0 0 2mm;
  padding-left: 5mm;
  orphans: 2;
  widows: 2;
}
li::before {
  content: "";
  position: absolute;
  left: 0;
  top: .65em;
  width: 2mm;
  height: 1px;
  background: var(--navy);
}
blockquote {
  margin: 5mm 0;
  padding: 5mm 6mm;
  border: 1px solid var(--rule);
  background: rgba(255,255,255,.72);
  color: var(--navy);
  font-weight: 600;
  line-height: 1.45;
  break-inside: avoid;
}
.section-rule {
  height: 1px;
  margin: 8mm 0;
  background: var(--rule);
}

.table-wrap {
  margin: 5mm 0 7mm;
  overflow: hidden;
  border: 1px solid var(--rule);
  background: rgba(255,255,255,.76);
  break-inside: avoid;
}
table { width: 100%; border-collapse: collapse; table-layout: fixed; }
th, td {
  padding: 3mm;
  border-right: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  vertical-align: top;
  font-size: 7.2pt;
  line-height: 1.36;
}
th:last-child, td:last-child { border-right: 0; }
tr:last-child td { border-bottom: 0; }
th {
  background: var(--navy);
  color: white;
  font-size: 6.8pt;
  letter-spacing: .08em;
  text-align: left;
  text-transform: uppercase;
}

.memo-visual {
  margin: 8mm 0;
  padding: 6mm;
  border: 1px solid var(--rule);
  background: rgba(255,255,255,.78);
  break-inside: avoid;
  page-break-inside: avoid;
}
.visual-eyebrow {
  margin-bottom: 5mm;
  color: rgba(0,0,66,.5);
  font-size: 7pt;
  font-weight: 700;
  letter-spacing: .17em;
  text-transform: uppercase;
}

.valley-scene {
  position: relative;
  display: grid;
  grid-template-columns: 1fr .72fr 1fr;
  align-items: end;
  height: 61mm;
  overflow: hidden;
  background: linear-gradient(135deg, #09172b, #41698e);
}
.mountain {
  position: relative;
  height: 47mm;
  background: linear-gradient(145deg, #fff, #c9d6e6);
  clip-path: polygon(0 100%, 19% 42%, 43% 10%, 68% 34%, 100% 100%);
}
.mountain-right { clip-path: polygon(0 100%, 28% 46%, 55% 8%, 76% 35%, 100% 100%); }
.mountain-copy {
  position: absolute;
  left: 50%;
  bottom: 11mm;
  display: grid;
  gap: 1mm;
  width: 70%;
  transform: translateX(-50%);
  color: var(--navy);
  text-align: center;
}
.mountain-copy b { font-size: 10pt; }
.mountain-copy span { font-size: 5.7pt; letter-spacing: .12em; }
.valley-core {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}
.valley-core span, .valley-core small { font-size: 6pt; letter-spacing: .1em; }
.valley-core strong { margin: 3mm 0 1mm; color: white; font-size: 19pt; letter-spacing: .08em; }

.io-grid, .product-grid, .result-grid, .market-grid {
  display: grid;
  gap: 3mm;
}
.io-grid { grid-template-columns: 1fr .72fr 1fr; align-items: stretch; }
.io-card, .product-card, .metric-card, .recommendation-card, .market-grid > div {
  padding: 5mm;
  border: 1px solid var(--rule);
  background: white;
}
.io-card { display: grid; gap: 2mm; }
.io-card span, .product-card span, .metric-card span, .recommendation-card span {
  color: rgba(0,0,66,.5);
  font-size: 6.5pt;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.io-card b { font-size: 8.2pt; font-weight: 550; }
.io-card-dark, .product-card-dark { background: var(--navy); color: white; }
.io-card-dark span, .product-card-dark span { color: rgba(255,255,255,.58); }
.io-card-dark b, .product-card-dark strong { color: white; }
.io-core {
  display: flex;
  min-height: 47mm;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(150deg, #051326, #41698e);
  color: white;
  text-align: center;
}
.io-core small { font-size: 5.5pt; letter-spacing: .12em; }
.io-core strong { margin-top: 2mm; color: white; font-size: 17pt; }

.product-grid { grid-template-columns: 1fr 1fr; }
.product-card { min-height: 45mm; display: flex; flex-direction: column; }
.product-card strong { margin-top: 5mm; font-size: 19pt; letter-spacing: -.03em; }
.product-card p { margin: auto 0 0; font-size: 8.7pt; }
.product-card-dark p { color: rgba(255,255,255,.8); }

.result-grid { grid-template-columns: .8fr 1.3fr .8fr; }
.metric-card, .recommendation-card { min-height: 48mm; }
.metric-card { display: flex; flex-direction: column; }
.metric-card strong { margin-top: 4mm; font-size: 25pt; letter-spacing: -.05em; }
.metric-card small { font-size: 6.5pt; font-weight: 700; letter-spacing: .12em; }
.metric-card b { margin-top: auto; font-size: 10pt; }
.recommendation-card {
  display: grid;
  gap: 2mm;
  background: var(--navy);
  color: white;
}
.recommendation-card span { color: rgba(255,255,255,.58); }
.recommendation-card b { font-size: 8.2pt; font-weight: 520; }
.recommendation-card small {
  align-self: end;
  padding-top: 2mm;
  border-top: 1px solid rgba(255,255,255,.2);
  font-size: 6pt;
  letter-spacing: .11em;
}
.result-strip {
  margin-top: 3mm;
  padding: 3mm;
  background: #edf4fa;
  color: var(--navy);
  font-size: 8pt;
  font-weight: 650;
  text-align: center;
}

.market-total {
  margin-bottom: 4mm;
  color: var(--navy);
  font-size: 29pt;
  font-weight: 600;
  letter-spacing: -.05em;
}
.market-total span {
  margin-left: 2mm;
  color: rgba(0,0,66,.5);
  font-size: 8pt;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.market-grid { grid-template-columns: repeat(3, 1fr); }
.market-grid > div { min-height: 34mm; display: flex; flex-direction: column; justify-content: space-between; }
.market-grid small { color: rgba(0,0,66,.5); font-size: 6pt; letter-spacing: .1em; }
.market-grid strong { font-size: 14pt; }
.market-grid .market-dark { background: var(--navy); color: white; }
.market-grid .market-dark small { color: rgba(255,255,255,.58); }
.market-grid .market-dark strong { color: white; }

.print-footer { display: none; }

@media screen and (max-width: 860px) {
  .memo-shell { width: calc(100% - 24px); margin-top: 12px; padding: 28px 24px 60px; }
  body { font-size: 10pt; }
}

@page {
  size: A4;
  margin: 17mm 16mm 18mm;
}

@media print {
  html, body {
    width: 210mm;
    min-height: 297mm;
    background:
      linear-gradient(rgba(255,255,255,.90), rgba(255,255,255,.90)),
      url("/webgl-bg-foundation-v2.png") center / cover fixed !important;
  }
  .screen-header, .memo-brand { display: none !important; }
  .memo-shell {
    width: auto;
    margin: 0;
    padding: 0;
    background: transparent;
    box-shadow: none;
  }
  h2.memo-heading { font-size: 27pt; }
  .memo-visual, blockquote, .pull-quote, .table-wrap {
    background: rgba(255,255,255,.82) !important;
  }
}

/* Foundation Model Bio editorial system */
body {
  background: #bfd3eb url("/webgl-bg-foundation-v2.png") center top / cover fixed;
  color: #080846;
  font-size: 10.25pt;
  line-height: 1.55;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -2;
  background:
    linear-gradient(115deg, rgba(216,232,248,.18), rgba(110,154,198,.12)),
    url("/webgl-bg-foundation-v2.png") center / cover no-repeat;
}
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 15%, rgba(255,255,255,.22), transparent 28%),
    radial-gradient(circle at 76% 82%, rgba(83,131,181,.20), transparent 36%);
}
.screen-header {
  background: rgba(202,222,243,.78);
  border-color: rgba(0,0,66,.12);
}
.memo-shell {
  padding: 18mm 17mm 22mm;
  background: transparent;
  box-shadow: 0 30px 85px rgba(0,0,66,.18);
}
.memo-brand {
  margin-bottom: 19mm;
  padding-bottom: 0;
  border: 0;
}
.memo-brand span {
  padding: 2.2mm 5mm;
  border: 1px solid rgba(0,0,66,.26);
  border-radius: 999px;
  color: var(--navy);
}
h2.memo-heading {
  margin: 0 0 10mm;
  padding-top: 11mm;
  max-width: 155mm;
  font-size: 34pt;
  font-weight: 500;
  line-height: .99;
  letter-spacing: -.052em;
}
h2.memo-heading::before {
  content: "SHODH AI · INVESTOR MEMO";
  display: block;
  margin-bottom: 7mm;
  color: rgba(0,0,66,.55);
  font-size: 7.5pt;
  font-weight: 700;
  letter-spacing: .22em;
}
h3.memo-heading {
  margin: 11mm 0 4mm;
  padding-top: 4mm;
  border-top: 1px solid rgba(0,0,66,.18);
  font-size: 20pt;
  font-weight: 520;
  line-height: 1.08;
}
h4 {
  margin-top: 9mm;
  font-size: 15pt;
  font-weight: 620;
}
h5 {
  padding: 0;
  border: 0;
  border-radius: 0;
  color: rgba(0,0,66,.58);
  font-size: 7.2pt;
  letter-spacing: .2em;
}
p { max-width: 165mm; }
p.lead-in {
  margin-top: 7mm;
  font-size: 11.5pt;
}
.pull-quote {
  margin: 8mm 0;
  padding: 8mm;
  border: 0;
  border-radius: 7mm;
  background: var(--navy);
  color: white;
  font-size: 17pt;
  font-weight: 500;
  line-height: 1.2;
  box-shadow: 0 5mm 10mm rgba(0,0,66,.11);
}
.pull-quote strong { color: white; }
blockquote {
  margin: 7mm 0;
  padding: 7mm;
  border: 0;
  border-radius: 7mm;
  background: rgba(255,255,255,.78);
  box-shadow: 0 4mm 9mm rgba(0,0,66,.09);
}
.table-wrap {
  margin: 7mm 0 9mm;
  border: 0;
  border-radius: 7mm;
  background: rgba(255,255,255,.82);
  box-shadow: 0 4mm 9mm rgba(0,0,66,.09);
}
th, td { padding: 3.6mm; }
th { background: var(--navy); }
.memo-visual {
  margin: 10mm 0;
  padding: 7mm;
  border: 0;
  border-radius: 7mm;
  background: rgba(255,255,255,.80);
  box-shadow: 0 5mm 11mm rgba(0,0,66,.10);
}
.visual-eyebrow {
  margin-bottom: 6mm;
  color: rgba(0,0,66,.62);
  letter-spacing: .2em;
}
.valley-scene, .io-core {
  background:
    linear-gradient(135deg, rgba(3,15,37,.95), rgba(61,104,145,.82)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.io-card, .product-card, .metric-card, .recommendation-card, .market-grid > div {
  border: 0;
  border-radius: 5mm;
  background: rgba(255,255,255,.88);
}
.io-card-dark, .product-card-dark, .recommendation-card, .market-grid .market-dark {
  background: var(--navy);
}
.result-strip {
  border-radius: 999px;
  background: rgba(208,226,244,.9);
}

/* Exact static Valley of Death composition from the pitch deck */
.memo-pitch-valley {
  position: relative;
  height: 89mm;
  margin: 9mm 0 11mm;
  overflow: hidden;
  border-radius: 7mm;
  background: transparent;
  box-shadow: 0 5mm 11mm rgba(0,0,66,.14);
  break-inside: avoid;
  page-break-inside: avoid;
}
.memo-pitch-valley .valley-diagram {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
}
.memo-pitch-valley .valley-diagram::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(ellipse at 50% 84%, rgba(1,5,11,.76) 0%, rgba(0,0,66,.3) 26%, transparent 58%);
}
.memo-pitch-valley .valley-diagram::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 22%;
  z-index: 1;
  background: linear-gradient(to bottom, transparent 0%, rgba(1,5,11,.46) 25%, #01050b 62%, #01050b 100%);
}
.memo-pitch-valley svg {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
}
.memo-pitch-valley .valley-copy {
  position: absolute;
  inset: 0;
  z-index: 2;
  color: #fff;
}
.memo-pitch-valley p { max-width: none; margin: 0; }
.memo-pitch-valley .valley-cost-block {
  position: absolute;
  top: 6%;
  left: 50%;
  width: 84%;
  transform: translateX(-50%);
  color: #fff;
  text-align: center;
  text-shadow: 0 1mm 5mm rgba(0,0,66,.42);
}
.memo-pitch-valley .valley-cost-block strong {
  display: block;
  color: #fff;
  font-size: 8.3pt;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -.02em;
}
.memo-pitch-valley .valley-cost-block p {
  margin-top: 1.8mm;
  color: rgba(255,255,255,.68);
  font-size: 6.2pt;
  font-weight: 500;
  line-height: 1.3;
}
.memo-pitch-valley .valley-mountain-copy {
  position: absolute;
  top: 54%;
  width: 26%;
  color: #000042;
  text-align: center;
}
.memo-pitch-valley .valley-mountain-copy.left { left: 9%; }
.memo-pitch-valley .valley-mountain-copy.right { right: 9%; }
.memo-pitch-valley .valley-kicker,
.memo-pitch-valley .valley-gap-title {
  font-size: 5.9pt;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
}
.memo-pitch-valley .valley-money {
  margin-top: 1.8mm;
  font-size: 10.8pt;
  font-weight: 650;
  line-height: 1.08;
  letter-spacing: -.025em;
  white-space: nowrap;
}
.memo-pitch-valley .valley-names {
  margin-top: 1.5mm;
  font-size: 5.5pt;
  font-weight: 500;
  line-height: 1.3;
}
.memo-pitch-valley .valley-gap-copy {
  position: absolute;
  left: 50%;
  top: 48%;
  width: 34%;
  transform: translateX(-50%);
  color: #fff;
  text-align: center;
  text-shadow: 0 1mm 5mm rgba(0,0,66,.5);
}
.memo-pitch-valley .valley-gap-path {
  margin-top: 1.7mm;
  font-size: 7pt;
  font-weight: 600;
  line-height: 1.35;
}
.memo-pitch-valley .valley-shodh {
  position: absolute;
  left: 50%;
  top: 67.5%;
  transform: translate(-50%,-50%);
  color: #fff;
  text-align: center;
}
.memo-pitch-valley .valley-shodh strong {
  display: block;
  color: #fff;
  font-size: 18pt;
  line-height: 1;
  letter-spacing: .12em;
}
.memo-pitch-valley .valley-shodh span {
  display: block;
  margin-top: .8mm;
  font-size: 4.7pt;
  font-weight: 650;
  letter-spacing: .08em;
  text-transform: uppercase;
}

/* Alternating editorial rhythm inspired by the pitch deck */
.memo-content {
  display: block;
}
.memo-section {
  position: relative;
  margin: 0 -10mm 12mm;
  padding: 12mm 10mm 13mm;
  overflow: hidden;
  border-radius: 8mm;
  break-before: page;
  page-break-before: always;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
.memo-section:first-child {
  break-before: auto;
  page-break-before: auto;
}
.memo-section::after {
  position: absolute;
  top: 10mm;
  right: 9mm;
  color: rgba(0,0,66,.12);
  font-size: 41pt;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -.06em;
}
.memo-section-1::after { content: "02"; }
.memo-section-2::after { content: "03"; }
.memo-section-3::after { content: "04"; }
.memo-section-4::after { content: "05"; }
.memo-section-5::after { content: "06"; }
.memo-section-6::after { content: "07"; }
.memo-section-7::after { content: "08"; }
.memo-section-8::after { content: "09"; }
.memo-section-9::after { content: "10"; }
.memo-section-10::after { content: "11"; }

.tone-paper {
  background: rgba(255,255,255,.96);
  box-shadow: 0 6mm 18mm rgba(0,0,66,.10);
}
.tone-atmosphere {
  background:
    linear-gradient(135deg, rgba(235,245,254,.16), rgba(91,141,190,.13)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.tone-split {
  padding-right: 29%;
  background:
    linear-gradient(90deg, rgba(255,255,255,.97) 0 72%, rgba(7,26,51,.94) 72% 100%),
    url("/webgl-bg-foundation-v2.png") center / cover;
  box-shadow: 0 6mm 18mm rgba(0,0,66,.11);
}
.tone-split::before {
  content: "PHYSICAL\A INTELLIGENCE";
  position: absolute;
  right: 4mm;
  bottom: 13mm;
  width: 23%;
  color: rgba(255,255,255,.75);
  font-size: 11pt;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: .12em;
  white-space: pre;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
.tone-deep {
  background:
    linear-gradient(135deg, rgba(1,10,28,.96), rgba(34,76,116,.90)),
    url("/webgl-bg-foundation-v2.png") center / cover;
  color: rgba(255,255,255,.86);
  box-shadow: 0 7mm 20mm rgba(0,0,66,.20);
}
.tone-deep::after { color: rgba(255,255,255,.13); }
.tone-deep h2.memo-heading,
.tone-deep h3.memo-heading,
.tone-deep h4,
.tone-deep h5,
.tone-deep strong {
  color: #fff;
}
.tone-deep h2.memo-heading::before,
.tone-deep h5,
.tone-deep em {
  color: rgba(255,255,255,.58);
}
.tone-deep h3.memo-heading {
  border-color: rgba(255,255,255,.20);
}
.tone-deep li::before { background: #fff; }
.tone-deep blockquote,
.tone-deep .pull-quote {
  background: rgba(255,255,255,.94);
  color: var(--navy);
}
.tone-deep blockquote strong,
.tone-deep .pull-quote strong {
  color: var(--navy);
}

.memo-section h2.memo-heading {
  max-width: 143mm;
  padding-top: 2mm;
}
.memo-section h2.memo-heading::before {
  max-width: 120mm;
}
.memo-section > p:first-of-type {
  font-size: 11.6pt;
  line-height: 1.48;
}
.tone-paper > p,
.tone-paper > ul,
.tone-paper > blockquote {
  max-width: 151mm;
}

/* Let the product moment become a true SCALE / SYNTH split spread */
.product-visual {
  margin: 10mm -3mm 12mm;
  padding: 0;
  overflow: hidden;
  border-radius: 7mm;
  background: transparent;
}
.product-visual .visual-eyebrow {
  margin: 0;
  padding: 4mm 6mm;
  background: rgba(210,228,246,.92);
}
.product-visual .product-grid {
  gap: 0;
}
.product-visual .product-card {
  min-height: 67mm;
  padding: 8mm;
  border-radius: 0;
}
.product-visual .product-card:first-child {
  background:
    linear-gradient(rgba(255,255,255,.90), rgba(255,255,255,.90)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.product-visual .product-card-dark {
  background:
    linear-gradient(145deg, rgba(1,8,28,.96), rgba(29,69,108,.91)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.product-visual .product-card strong {
  margin-top: 7mm;
  font-size: 23pt;
}
.product-visual .product-card p {
  font-size: 9.4pt;
  line-height: 1.42;
}

.io-visual {
  padding: 0;
  overflow: hidden;
}
.io-visual .visual-eyebrow {
  margin: 0;
  padding: 4mm 6mm;
  background: rgba(255,255,255,.92);
}
.io-visual .io-grid { gap: 0; }
.io-visual .io-card,
.io-visual .io-core { border-radius: 0; }

@media print {
  html, body {
    background: #bfd3eb !important;
  }
  body::before {
    background:
      linear-gradient(115deg, rgba(216,232,248,.16), rgba(110,154,198,.10)),
      url("/webgl-bg-foundation-v2.png") center / cover no-repeat !important;
  }
  body::after {
    background:
      radial-gradient(circle at 18% 15%, rgba(255,255,255,.20), transparent 28%),
      radial-gradient(circle at 76% 82%, rgba(83,131,181,.18), transparent 36%) !important;
  }
  .memo-shell { padding: 0; }
  h2.memo-heading {
    padding-top: 9mm;
    font-size: 32pt;
  }
  .memo-visual, blockquote, .table-wrap {
    background: rgba(255,255,255,.80) !important;
  }
  .pull-quote, .recommendation-card, .product-card-dark, .io-card-dark, .market-grid .market-dark {
    background: var(--navy) !important;
  }
  .memo-pitch-valley {
    background: transparent !important;
  }
  .memo-section {
    margin: 0 -4mm;
    padding: 10mm 4mm 11mm;
    border-radius: 0;
    box-shadow: none;
  }
  .memo-section h2.memo-heading {
    padding-top: 1mm;
  }
  .tone-paper {
    background: rgba(255,255,255,.97) !important;
  }
  .tone-split {
    padding-right: 27%;
    background:
      linear-gradient(90deg, rgba(255,255,255,.98) 0 74%, rgba(7,26,51,.96) 74% 100%) !important;
  }
  .tone-deep {
    background:
      linear-gradient(135deg, rgba(1,10,28,.98), rgba(34,76,116,.94)),
      url("/webgl-bg-foundation-v2.png") center / cover !important;
  }
}
"""


def build() -> None:
    source = SOURCE.read_text(encoding="utf-8")
    content = render_markdown(source)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    document = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Shodh AI · Investor Memo</title>
  <style>{CSS}</style>
</head>
<body>
  <header class="screen-header">
    <img src="/shodh-new/White%20Shodh%20AI%20Brandmark.svg" alt="Shodh AI">
    <span>Investor memo · Print-ready A4</span>
  </header>
  <main class="memo-shell">
    <div class="memo-brand">
      <img src="/shodh-new/White%20Shodh%20AI%20Brandmark.svg" alt="Shodh AI">
      <span>Investor memo</span>
    </div>
    <article class="memo-content">{content}</article>
    <footer class="print-footer"><span>Shodh AI · Investor memo</span><span>Confidential</span></footer>
  </main>
</body>
</html>
"""
    OUTPUT.write_text(document, encoding="utf-8")
    print(OUTPUT)


if __name__ == "__main__":
    build()
