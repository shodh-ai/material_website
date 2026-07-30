from __future__ import annotations

import html
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "Investor-Memo.md"
OUTPUT_DIR = ROOT / "public" / "investor-memo"
OUTPUT = OUTPUT_DIR / "index.html"


def cover_page() -> str:
    return """
    <section class="memo-cover" aria-label="Shodh confidential investment memorandum cover">
      <img class="memo-page-snapshot" src="/webgl-bg-foundation-v2.png" alt="">
      <div class="memo-cover-top">
        <img src="/shodh-new/White%20Shodh%20AI%20Brandmark.svg" alt="Shodh AI">
        <span>Confidential</span>
      </div>
      <div class="memo-cover-image">
        <img src="/pitch-tomorrow/assets/orbit/pexels-cang-hai-2894404-4440227_gm_optimized.jpeg" alt="Industrial process equipment">
      </div>
      <div class="memo-cover-title">
        <strong>SHODH</strong>
        <h1>THE FOUNDATION MODEL<br>FOR PHYSICAL INTELLIGENCE</h1>
        <p>From molecule to factory</p>
      </div>
      <div class="memo-cover-meta">
        <span>CONFIDENTIAL INVESTMENT MEMORANDUM</span>
        <strong>$55M EQUITY FINANCING</strong>
        <span>JULY 2026</span>
      </div>
    </section>
    """.strip()


def executive_summary_visual() -> str:
    return """
    <section class="executive-spread executive-opener" aria-label="Executive Summary">
      <div class="executive-opener-paper">
        <p class="executive-proof"><strong>Shodh has built a new class of foundation model for the physical world.</strong> Its Uniform Physics World Model predicts, optimises, and designs physical systems across scales—from molecular behaviour to industrial mass production.</p>
        <p class="executive-proof"><strong>To our knowledge, Shodh is the first company to demonstrate this kind of joint reasoning across molecular, process and equipment-scale physics within one foundation-model architecture.</strong></p>
        <div class="executive-opener-title">
          <span>01 / INVESTMENT MEMORANDUM</span>
          <h2>Executive<br>Summary</h2>
        </div>
      </div>
      <div class="executive-opener-atmosphere">
        <img class="memo-page-snapshot" src="/webgl-bg-foundation-v2.png" alt="">
        <span class="executive-side-label">UNIFORM PHYSICS WORLD MODEL</span>
        <div class="executive-mark">
          <span>MOLECULE</span>
          <b>→</b>
          <span>FACTORY</span>
        </div>
        <small>01</small>
      </div>
    </section>

    <section class="executive-spread executive-narrative" aria-label="The industrialisation gap and Shodh">
      <img class="memo-page-snapshot" src="/webgl-bg-foundation-v2.png" alt="">
      <div class="executive-narrative-heading">
        <span>THE INDUSTRIALISATION GAP</span>
        <h2>The missing intelligence layer in the physical economy.</h2>
      </div>
      <div class="executive-narrative-panel">
        <p><strong>This solves the missing intelligence layer in the physical economy.</strong> Billions have funded Discovery AI (molecules) and Engineering AI (machines and engineered systems). One of the largest unresolved bottlenecks remains in the middle: the <strong>Industrialisation Gap</strong>. Translating a digital molecule into a mass-produced reality currently demands years of expensive, manual physical trial and error.</p>
        <p>Shodh replaces this guesswork with true cross-domain <em>inverse design</em>.<br><br>At the molecular level, Shodh compressed a 3-month physical formulation test into 24 hours of computation for a premier global CRO. At the equipment level, a prospectively locked recommendation successfully improved chemical factory yield from 82.4% to 96.7%.</p>
        <p><strong>Industrialisation provides a high-value commercial entry point.</strong> We are commercialising general physical intelligence starting with pharmaceuticals, CDMOs, and specialty chemicals, deployed via two enterprise modules:</p>
      </div>
    </section>

    <section class="executive-spread executive-modules" aria-label="Shodh Scale and Shodh Synth">
      <div class="executive-module executive-module-scale">
        <div class="executive-module-copy">
          <span>SHODH SCALE / FACTORY INTELLIGENCE</span>
          <h2>SHODH<br>SCALE</h2>
          <p><strong>Shodh SCALE (Recurring SaaS):</strong> Optimises existing processes for a $250K–$500K/year base site license plus a capped gain-share on verified factory economics.</p>
          <p class="executive-module-note">To accelerate enterprise deployment, Shodh leverages a heavyweight advisory board—including <strong>Kiran Mazumdar-Shaw</strong> (Founder, Biocon), <strong>Rahul Singhvi</strong> (ex-CEO, &gt;$8B raised), and <strong>Arun Seth</strong> (Enterprise tech veteran)—to secure immediate institutional trust and global market access.</p>
        </div>
      </div>
      <div class="executive-module executive-module-synth">
        <img class="memo-page-snapshot" src="/webgl-bg-foundation-v2.png" alt="">
        <span>SHODH SYNTH / PROCESS INTELLIGENCE</span>
        <div class="executive-module-icon">⌬</div>
        <h2>SHODH<br>SYNTH</h2>
        <p><strong>Shodh SYNTH (Step-Change Upside):</strong> Computationally invents or redesigns manufacturing routes for massive milestone payouts and selective process-IP royalties.</p>
        <p class="executive-module-note"><strong>Empirical scaling suggests compute expands this capability predictably.</strong> With paid pilots already converting into $250,000/year SaaS licenses, Shodh is raising <strong>$55M in equity capital</strong>. This funds the compute required to ride our proven power-law curve, scaling a world-first scientific breakthrough into a global intelligence platform.</p>
        <small>ONE PLATFORM · TWO ENTERPRISE MODULES</small>
      </div>
    </section>

    <section class="executive-spread executive-case" aria-label="Investment Case at a Glance">
      <img class="memo-page-snapshot" src="/webgl-bg-foundation-v2.png" alt="">
      <div class="executive-case-heading">
        <span>INVESTMENT CASE AT A GLANCE</span>
        <h2>Proven today.<br>Built to generalise.</h2>
      </div>
      <div class="executive-case-grid">
        <div class="executive-case-column">
          <h3>Proven Today</h3>
          <div class="executive-case-card"><strong>Frontier AI Breakthrough:</strong> A new class of Uniform Physics World Model successfully built, proving cross-scale reasoning with an empirically measured power-law scaling curve.</div>
          <div class="executive-case-card"><strong>Multi-Scale Physical Results:</strong> Prospective factory scale-up (Aarti Industries: +14.3 pts in yield) and zero-day formulation prediction (Syngene: matching 3-month wet-lab data in 24 hours).</div>
          <div class="executive-case-card"><strong>Commercial Traction:</strong> Paid validations converting to $250,000/year recurring enterprise SaaS site licenses.</div>
          <div class="executive-case-card"><strong>Enterprise Gravity:</strong> 9 active/scoped programmes, backed by an advisory board of globally recognized industrial leaders.</div>
        </div>
        <div class="executive-case-column executive-case-column-dark">
          <h3>What This Round Establishes</h3>
          <div class="executive-case-card"><strong>Generalisation:</strong> Repeatability across expanded process classes via dozens of parallel physical validations.</div>
          <div class="executive-case-card"><strong>Capability Unlocks:</strong> Scaling H100/B200 compute infrastructure to enable zero-shot transfer across unseen domains.</div>
          <div class="executive-case-card"><strong>Software Margins:</strong> Declining human adaptation effort and computational hours per new programme.</div>
          <div class="executive-case-card"><strong>Commercial Scale:</strong> Repeatable private SCALE deployments and a scalable organisation with dedicated commercial leadership.</div>
        </div>
      </div>
    </section>
    """.strip()


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
    group_open = False
    section_index = 0
    subsection_index = 0

    def close_list() -> None:
        nonlocal list_open
        if list_open:
            out.append("</ul>")
            list_open = False

    def close_section() -> None:
        nonlocal section_open
        close_group()
        if section_open:
            out.append("</section>")
            section_open = False

    def close_group() -> None:
        nonlocal group_open
        if group_open:
            out.append("</div>")
            group_open = False

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
            if tag == "h2" and title == "1. Executive Summary":
                close_section()
                section_index += 1
                out.append(executive_summary_visual())
                i += 1
                while i < len(lines):
                    candidate = unescape_markdown(lines[i].strip())
                    if re.match(r"^2\.\s+The Industrial Scale-Up Gap", candidate):
                        break
                    i += 1
                continue
            if tag == "h2":
                close_section()
                section_index += 1
                subsection_index = 0
                tone = ("atmosphere", "paper", "split", "paper", "deep")[(section_index - 1) % 5]
                out.append(f'<section class="memo-section memo-section-{section_index} tone-{tone}">')
                section_open = True
            elif tag == "h3":
                close_group()
                subsection_index += 1
                out.append(f'<div class="memo-subsection memo-subsection-{subsection_index}">')
                group_open = True
            out.append(f'<{tag} class="memo-heading">{inline_markup(title)}</{tag}>')
            i += 1
            continue

        if value in SPECIAL_HEADINGS:
            close_list()
            tag = "h4" if value not in {"Inputs", "Outputs"} else "h5"
            if tag == "h4":
                close_group()
                subsection_index += 1
                out.append(f'<div class="memo-topic memo-topic-{subsection_index}">')
                group_open = True
            out.append(f"<{tag}>{inline_markup(value)}</{tag}>")
            i += 1
            continue

        if value == "**Conclusion**":
            close_list()
            close_group()
            out.append('<div class="memo-conclusion"><h4>Conclusion</h4>')
            group_open = True
            i += 1
            continue

        if value.startswith(">"):
            close_list()
            out.append(f'<blockquote>{inline_markup(value[1:].strip())}</blockquote>')
            i += 1
            continue

        bullet = re.match(r"^[*-]\s+(.*)$", value)
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
            out.append('<div class="post-valley-essay">')
            group_open = True
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
html { background: #bfd3eb; }
body {
  margin: 0;
  color: var(--ink);
  background: #bfd3eb;
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
  background: #bfd3eb;
  color: #080846;
  font-size: 10.25pt;
  line-height: 1.55;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -2;
  display: none;
}
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  display: none;
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

/* Image-led A4 cover derived from the pitch opening */
.memo-brand { display: none; }
.memo-cover {
  position: relative;
  height: 260mm;
  margin: 0 -10mm 12mm;
  overflow: hidden;
  border-radius: 8mm;
  background:
    linear-gradient(135deg, rgba(217,233,248,.18), rgba(91,141,190,.18)),
    url("/webgl-bg-foundation-v2.png") center / cover;
  color: var(--navy);
  box-shadow: 0 7mm 20mm rgba(0,0,66,.14);
  break-after: page;
  page-break-after: always;
}
.memo-cover-top {
  position: absolute;
  top: 12mm;
  left: 12mm;
  right: 12mm;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.memo-cover-top img {
  width: 9mm;
  filter: invert(1);
}
.memo-cover-top span {
  padding: 2mm 4mm;
  border: 1px solid rgba(0,0,66,.26);
  border-radius: 999px;
  font-size: 6.7pt;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
}
.memo-cover-image {
  position: absolute;
  top: 48mm;
  right: 0;
  width: 72%;
  height: 128mm;
  overflow: hidden;
  border-radius: 2mm 0 0 2mm;
  box-shadow: 0 8mm 22mm rgba(0,0,45,.22);
}
.memo-cover-image::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0,0,50,.18), transparent 34%, rgba(0,0,28,.08));
}
.memo-cover-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 58% center;
}
.memo-cover-title {
  position: absolute;
  top: 36mm;
  left: 12mm;
  right: 10mm;
  z-index: 2;
}
.memo-cover-title > strong {
  display: block;
  margin-bottom: 13mm;
  font-size: 11pt;
  letter-spacing: .22em;
}
.memo-cover-title h1 {
  max-width: 176mm;
  margin: 0;
  color: #f7f8ff;
  font-size: 35pt;
  font-weight: 560;
  line-height: .96;
  letter-spacing: -.045em;
  text-shadow: 0 2mm 7mm rgba(0,0,45,.50);
}
.memo-cover-title p {
  position: absolute;
  top: 141mm;
  right: 1mm;
  margin: 0;
  color: #fff;
  font-size: 17pt;
  font-weight: 560;
  letter-spacing: -.025em;
  text-shadow: 0 2mm 6mm rgba(0,0,45,.52);
}
.memo-cover-meta {
  position: absolute;
  left: 12mm;
  right: 12mm;
  bottom: 14mm;
  display: grid;
  grid-template-columns: 1.4fr 1fr auto;
  align-items: end;
  gap: 6mm;
  padding-top: 6mm;
  border-top: 1px solid rgba(0,0,66,.22);
}
.memo-cover-meta span,
.memo-cover-meta strong {
  color: var(--navy);
  font-size: 7pt;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: .13em;
  text-transform: uppercase;
}
.memo-cover-meta strong {
  font-size: 9pt;
  letter-spacing: .08em;
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
.memo-content > .section-rule:first-child {
  display: none;
}
.memo-content > .memo-section:first-of-type {
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
.memo-section-1::after { content: "01"; }
.memo-section-2::after { content: "02"; }
.memo-section-3::after { content: "03"; }
.memo-section-4::after { content: "04"; }
.memo-section-5::after { content: "05"; }
.memo-section-6::after { content: "06"; }
.memo-section-7::after { content: "07"; }
.memo-section-8::after { content: "08"; }
.memo-section-9::after { content: "09"; }
.memo-section-10::after { content: "10"; }

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
.memo-section-1 {
  font-size: 9.1pt;
  line-height: 1.42;
}
.memo-section-1 h2.memo-heading {
  margin-bottom: 6mm;
  font-size: 28pt;
}
.memo-section-1 h3.memo-heading {
  margin-top: 6mm;
  margin-bottom: 2.5mm;
  padding-top: 3mm;
  font-size: 15.5pt;
}
.memo-section-1 > p:first-of-type {
  font-size: 10.4pt;
  line-height: 1.4;
}
.memo-section-1 p {
  margin-bottom: 2.4mm;
}
.memo-section-1 ul {
  margin-bottom: 2.5mm;
}
.memo-section-1 li {
  margin-bottom: 1.2mm;
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

/* Reference-led Executive Summary prototype */
.memo-page-snapshot {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  z-index: 0;
  display: block;
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  transform: translateX(-50%);
  object-fit: cover;
  object-position: center;
  pointer-events: none;
}
.memo-cover > *:not(.memo-page-snapshot),
.executive-spread > *:not(.memo-page-snapshot),
.executive-opener-atmosphere > *:not(.memo-page-snapshot),
.executive-module-synth > *:not(.memo-page-snapshot) {
  z-index: 1;
}
.executive-module-synth > *:not(.memo-page-snapshot) { position: relative; }
.memo-cover::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(circle at 14% 12%, rgba(255,255,255,.18), transparent 26%),
    linear-gradient(135deg, rgba(173,207,236,.06), rgba(17,66,110,.12));
  pointer-events: none;
}
.memo-cover > *:not(.memo-page-snapshot) { z-index: 2; }

.executive-spread {
  position: relative;
  width: calc(100% + 20mm);
  height: 262mm;
  margin-left: -10mm;
  margin-right: -10mm;
  overflow: hidden;
  color: var(--navy);
  background: #c2d7ed url("/webgl-bg-foundation-v2.png") center / cover no-repeat;
  break-before: page;
  break-after: page;
  break-inside: avoid;
  page-break-before: always;
  page-break-after: always;
  page-break-inside: avoid;
}
.executive-spread h2,
.executive-spread h3,
.executive-spread p {
  margin: 0;
  max-width: none;
}
.executive-opener {
  display: grid;
  grid-template-columns: 49% 51%;
  background: #c2d7ed url("/webgl-bg-foundation-v2.png") center / cover no-repeat;
}
.executive-opener-paper {
  position: relative;
  z-index: 2;
  padding: 15mm 10mm 13mm 12mm;
  background: #fff;
}
.executive-proof {
  max-width: 66mm !important;
  font-size: 10.2pt;
  font-weight: 500;
  line-height: 1.58;
  letter-spacing: -.015em;
}
.executive-proof strong {
  color: var(--navy);
  font-weight: 520;
}
.executive-proof + .executive-proof {
  margin-top: 6mm;
}
.executive-opener-title {
  position: absolute;
  left: 12mm;
  right: 8mm;
  bottom: 18mm;
}
.executive-opener-title span,
.executive-side-label,
.executive-module > span,
.executive-module-copy > span,
.executive-narrative-heading > span,
.executive-case-heading > span {
  display: block;
  color: rgba(0,0,66,.62);
  font-size: 7pt;
  font-weight: 700;
  letter-spacing: .20em;
  text-transform: uppercase;
}
.executive-opener-title h2 {
  margin-top: 6mm;
  font-size: 35pt;
  font-weight: 500;
  line-height: .95;
  letter-spacing: -.055em;
}
.executive-opener-atmosphere {
  position: relative;
  overflow: hidden;
}
.executive-opener-atmosphere::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(155deg, rgba(255,255,255,.04), rgba(47,100,149,.11));
}
.executive-side-label {
  position: absolute !important;
  top: 16mm;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  text-align: center;
}
.executive-mark {
  position: absolute !important;
  top: 47%;
  left: 50%;
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  gap: 3mm;
  transform: translate(-50%,-50%);
  color: var(--navy);
}
.executive-mark span {
  font-size: 7pt;
  font-weight: 700;
  letter-spacing: .15em;
}
.executive-mark b {
  font-size: 18pt;
  font-weight: 400;
}
.executive-opener-atmosphere small {
  position: absolute !important;
  left: 0;
  right: 0;
  bottom: 0;
  height: 31mm;
  padding-top: 16mm;
  background: rgba(213,228,244,.78);
  color: var(--navy);
  font-size: 6.5pt;
  font-weight: 700;
  letter-spacing: .15em;
  text-align: center;
}

.executive-narrative {
  padding: 15mm 12mm 13mm;
}
.executive-narrative::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(180deg, rgba(255,255,255,.06), rgba(74,125,174,.08)),
    radial-gradient(circle at 74% 16%, rgba(255,255,255,.16), transparent 27%);
}
.executive-narrative-heading {
  position: relative;
  z-index: 2;
  width: 126mm;
  margin-bottom: 10mm;
}
.executive-narrative-heading h2 {
  margin-top: 5mm;
  font-size: 28pt;
  font-weight: 500;
  line-height: 1.02;
  letter-spacing: -.05em;
}
.executive-narrative-panel {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.1fr 1.1fr .64fr;
  gap: 7mm;
  min-height: 112mm;
  padding: 9mm;
  border-radius: 8mm;
  background: rgba(255,255,255,.84);
  box-shadow: 0 5mm 12mm rgba(0,0,66,.10);
}
.executive-narrative-panel p {
  font-size: 8.5pt;
  line-height: 1.55;
}
.executive-narrative-panel p:last-child {
  align-self: auto;
  color: var(--ink);
  font-size: 8.5pt;
  font-weight: 500;
  line-height: 1.55;
  letter-spacing: -.01em;
  text-transform: none;
}
.executive-narrative-footer {
  position: relative;
  z-index: 2;
  margin: 7mm 0 0 39mm;
  padding: 6mm 7mm;
  border-radius: 6mm;
  background: var(--navy);
  color: rgba(255,255,255,.88);
}
.executive-narrative-footer p {
  font-size: 8.3pt;
  line-height: 1.5;
}
.executive-narrative-footer strong { color: #fff; }

.executive-modules {
  display: grid;
  grid-template-columns: 50% 50%;
  background: #fff;
}
.executive-module {
  position: relative;
  overflow: hidden;
}
.executive-module-scale {
  display: flex;
  align-items: flex-end;
  padding: 14mm 11mm 18mm 12mm;
  background: #fff;
}
.executive-module-copy > span { margin-bottom: 7mm; }
.executive-module h2 {
  font-size: 34pt;
  font-weight: 500;
  line-height: .92;
  letter-spacing: -.06em;
}
.executive-module p {
  margin-top: 8mm;
  font-size: 9.1pt;
  line-height: 1.55;
}
.executive-module .executive-module-note {
  margin-top: 7mm;
  padding-top: 6mm;
  border-top: 1px solid rgba(0,0,66,.15);
  font-size: 7.8pt;
  line-height: 1.48;
}
.executive-module-synth {
  padding: 15mm 10mm 14mm;
}
.executive-module-synth::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(160deg, rgba(255,255,255,.04), rgba(51,103,151,.09));
}
.executive-module-synth > span { text-align: center; }
.executive-module-icon {
  display: grid;
  width: 31mm;
  height: 31mm;
  margin: 28mm auto 0;
  place-items: center;
  border-radius: 9mm;
  background: rgba(255,255,255,.84);
  color: var(--navy);
  font-size: 27pt;
  box-shadow: 0 4mm 9mm rgba(0,0,66,.10);
}
.executive-module-synth h2 {
  margin-top: 13mm;
}
.executive-module-synth p {
  margin-top: 7mm;
}
.executive-module-synth small {
  position: absolute !important;
  left: 0;
  right: 0;
  bottom: 0;
  height: 31mm;
  padding-top: 15mm;
  background: rgba(213,228,244,.78);
  color: var(--navy);
  font-size: 6.5pt;
  font-weight: 700;
  letter-spacing: .13em;
  text-align: center;
}

.executive-case {
  padding: 15mm 12mm 12mm;
}
.executive-case::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(150deg, rgba(255,255,255,.08), rgba(46,99,148,.08));
}
.executive-case-heading {
  position: relative;
  z-index: 2;
  width: 132mm;
  margin-bottom: 8mm;
}
.executive-case-heading h2 {
  margin-top: 5mm;
  font-size: 27pt;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -.05em;
}
.executive-case-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6mm;
}
.executive-case-column {
  min-height: 176mm;
  padding: 7mm;
  border-radius: 8mm;
  background: rgba(255,255,255,.84);
  box-shadow: 0 4mm 10mm rgba(0,0,66,.09);
}
.executive-case-column h3 {
  margin-bottom: 6mm;
  font-size: 14pt;
  font-weight: 600;
  letter-spacing: -.025em;
}
.executive-case-card {
  padding: 5mm 0;
  border-top: 1px solid rgba(0,0,66,.13);
  font-size: 8.4pt;
  line-height: 1.48;
}
.executive-case-card strong {
  display: block;
  margin-bottom: 1mm;
}
.executive-case-column-dark {
  background: var(--navy);
  color: rgba(255,255,255,.82);
}
.executive-case-column-dark h3,
.executive-case-column-dark strong {
  color: #fff;
}
.executive-case-column-dark .executive-case-card {
  border-color: rgba(255,255,255,.18);
}

/* Whole-memo editorial pagination */
.memo-section {
  font-size: 9.45pt;
  line-height: 1.52;
}
.memo-section > h2.memo-heading {
  max-width: 148mm;
  margin-bottom: 9mm;
  padding-top: 3mm;
  font-size: 31pt;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -.052em;
}
.memo-section > h2.memo-heading::before {
  margin-bottom: 6mm;
}
.memo-section > p:first-of-type {
  max-width: 148mm;
  font-size: 11.2pt;
  line-height: 1.5;
}
.memo-subsection,
.memo-topic {
  position: relative;
  margin: 7mm 0;
  padding: 7mm;
  border-radius: 7mm;
  background: rgba(255,255,255,.86);
  box-shadow: 0 4mm 10mm rgba(0,0,66,.08);
  break-inside: avoid;
  page-break-inside: avoid;
}
.memo-subsection h3.memo-heading,
.memo-topic h4 {
  margin: 0 0 4mm;
  padding: 0 0 3mm;
  border-top: 0;
  border-bottom: 1px solid rgba(0,0,66,.14);
  font-size: 17.5pt;
  font-weight: 540;
  line-height: 1.08;
}
.memo-subsection p,
.memo-topic p {
  max-width: none;
}
.memo-subsection ul,
.memo-topic ul {
  margin-top: 3mm;
}
.memo-subsection li,
.memo-topic li {
  margin-bottom: 2.2mm;
}
.memo-subsection .memo-visual,
.memo-topic .memo-visual {
  margin-left: 0;
  margin-right: 0;
}
.tone-split {
  padding-right: 10mm;
}
.tone-split::before { display: none; }

/* 02 · Gap — market map, limitation, inverse opportunity */
.memo-section-2 {
  padding-left: 18mm;
  padding-right: 18mm;
  background: rgba(255,255,255,.97);
}
.memo-section-2 > p:nth-of-type(4) {
  margin: 7mm 0;
  padding: 7mm 8mm;
  border-radius: 7mm;
  background: var(--navy);
  color: #fff;
  font-size: 15.5pt;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -.025em;
  box-shadow: 0 5mm 12mm rgba(0,0,66,.13);
}
.memo-section-2 .memo-pitch-valley {
  height: 102mm;
}
.memo-section-2 .post-valley-essay {
  min-height: 205mm;
  margin: 8mm -10mm;
  padding: 12mm 66mm 12mm 10mm;
  border-radius: 8mm;
  background:
    linear-gradient(90deg, rgba(255,255,255,.96) 0 68%, rgba(204,224,243,.88) 68%),
    url("/webgl-bg-foundation-v2.png") center / cover;
  box-shadow: 0 5mm 12mm rgba(0,0,66,.09);
  break-before: page;
  break-inside: avoid;
  page-break-before: always;
  page-break-inside: avoid;
}
.memo-section-2 .post-valley-essay p {
  max-width: none;
}
.memo-section-2 .memo-topic {
  min-height: 112mm;
  margin-left: -10mm;
  margin-right: -10mm;
  padding: 10mm;
}
.memo-section-2 .memo-topic-1 {
  background:
    linear-gradient(90deg, rgba(255,255,255,.95) 0 68%, rgba(214,229,245,.88) 68%),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-2 .memo-topic-1 > * {
  max-width: 106mm;
}
.memo-section-2 .memo-topic-1 {
  font-size: 8.9pt;
  line-height: 1.42;
}
.memo-section-2 .memo-topic-1 p {
  margin-bottom: 2.6mm;
}
.memo-section-2 .memo-topic-1 p.lead-in {
  margin-top: 4mm;
  font-size: 10.5pt;
}
.memo-section-2 .memo-topic-1 .pull-quote {
  margin: 4mm 0;
  padding: 6mm;
  font-size: 15.5pt;
  line-height: 1.18;
}
.memo-section-2 .memo-topic-2 {
  min-height: 222mm;
  background:
    linear-gradient(145deg, rgba(1,8,35,.97), rgba(25,68,108,.92)),
    url("/webgl-bg-foundation-v2.png") center / cover;
  color: rgba(255,255,255,.84);
  break-before: page;
  page-break-before: always;
}
.memo-section-2 .memo-topic-2 h4,
.memo-section-2 .memo-topic-2 strong { color: #fff; }
.memo-section-2 .memo-topic-2 h4 { border-color: rgba(255,255,255,.18); }
.memo-section-2 .memo-topic-2 li::before { background: #fff; }
.memo-section-2 .memo-topic-2 .pull-quote {
  background: rgba(255,255,255,.94) !important;
  color: var(--navy);
}

/* 03 · Product — one opening essay, then three distinct capability pages */
.memo-section-3 {
  background:
    linear-gradient(90deg, rgba(255,255,255,.97) 0 71%, rgba(10,31,59,.96) 71%),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-3 > h2,
.memo-section-3 > p {
  max-width: 118mm !important;
}
.memo-section-3 .memo-topic {
  min-height: 183mm;
  padding: 10mm;
  break-before: page;
  page-break-before: always;
}
.memo-section-3 .memo-topic-1 {
  min-height: 164mm;
  padding: 8mm;
  font-size: 9.6pt;
  line-height: 1.5;
  background:
    linear-gradient(135deg, rgba(217,232,247,.22), rgba(92,142,190,.12)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-3 .memo-topic-1 h5 {
  margin-top: 7mm;
}
.memo-section-3 .memo-topic-1 .io-visual {
  margin-top: 0;
  margin-bottom: 5mm;
  break-before: page;
  page-break-before: always;
}
.memo-section-3 .memo-topic-1 .io-core {
  min-height: 40mm;
}
.memo-section-3 .memo-topic-2 {
  min-height: 222mm;
  padding-right: 58mm;
  background:
    linear-gradient(90deg, rgba(255,255,255,.97) 0 68%, rgba(213,229,246,.92) 68%),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-3 .memo-topic-2::after {
  content: "SCALE";
  position: absolute;
  right: 10mm;
  bottom: 11mm;
  color: rgba(0,0,66,.12);
  font-size: 35pt;
  font-weight: 600;
  writing-mode: vertical-rl;
}
.memo-section-3 .memo-topic-3 {
  font-size: 9.6pt;
  line-height: 1.5;
  background:
    linear-gradient(145deg, rgba(1,8,35,.98), rgba(29,70,110,.93)),
    url("/webgl-bg-foundation-v2.png") center / cover;
  color: rgba(255,255,255,.84);
}
.memo-section-3 .memo-topic-3 h4,
.memo-section-3 .memo-topic-3 strong { color: #fff; }
.memo-section-3 .memo-topic-3 h4 { border-color: rgba(255,255,255,.18); }
.memo-section-3 .memo-topic-3 .product-visual {
  margin-top: 0;
  break-before: page;
  page-break-before: always;
}
.memo-section-3 .memo-topic-3 .product-visual {
  color: var(--navy);
}

/* 04 · Evidence — proof sequence in paired editorial cards */
.memo-section-4 {
  background:
    linear-gradient(135deg, rgba(216,232,248,.88), rgba(165,199,229,.79)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-4 .memo-subsection {
  min-height: 76mm;
}
.memo-section-4 .memo-subsection:nth-of-type(even) {
  background:
    linear-gradient(135deg, rgba(213,230,247,.90), rgba(178,207,234,.82)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-4 .memo-subsection-2 {
  min-height: 150mm;
  background: rgba(255,255,255,.92);
}
.memo-section-4 .memo-subsection-3,
.memo-section-4 .memo-subsection-5 {
  break-before: page;
  page-break-before: always;
}
.memo-section-4 .memo-subsection.memo-subsection-4 {
  background:
    linear-gradient(145deg, rgba(1,9,35,.97), rgba(28,69,108,.93)),
    url("/webgl-bg-foundation-v2.png") center / cover;
  color: rgba(255,255,255,.84);
}
.memo-section-4 .memo-subsection-4 h3,
.memo-section-4 .memo-subsection-4 strong { color: #fff; }
.memo-section-4 .memo-subsection-4 h3 { border-color: rgba(255,255,255,.18); }
.memo-section-4 .memo-subsection-4 li::before { background: #fff; }
.memo-section-4 .memo-subsection-5,
.memo-section-4 .memo-subsection-6 {
  min-height: 98mm;
}

/* 05 · Technology — light atmospheric foundation with selective navy depth */
.memo-section-5 {
  background:
    linear-gradient(135deg, rgba(215,231,247,.90), rgba(152,190,224,.80)),
    url("/webgl-bg-foundation-v2.png") center / cover;
  color: var(--ink);
}
.memo-section-5 > h2,
.memo-section-5 > h2::before,
.memo-section-5 > p,
.memo-section-5 strong { color: var(--navy); }
.memo-section-5 .memo-subsection {
  min-height: 86mm;
}
.memo-section-5 .memo-subsection-3,
.memo-section-5 .memo-subsection-5 {
  break-before: page;
  page-break-before: always;
}
.memo-section-5 .memo-subsection-3 {
  min-height: 151mm;
  background: var(--navy);
  color: rgba(255,255,255,.84);
}
.memo-section-5 .memo-subsection-3 h3,
.memo-section-5 .memo-subsection-3 strong { color: #fff; }
.memo-section-5 .memo-subsection-3 h3 { border-color: rgba(255,255,255,.18); }
.memo-section-5 .memo-subsection-3 li::before { background: #fff; }
.memo-section-5 .memo-subsection-5 {
  min-height: 222mm;
  padding: 12mm;
  background: rgba(255,255,255,.91);
}

/* 06 · Commercial model — white economics pages plus a market construction spread */
.memo-section-6 {
  background: rgba(255,255,255,.97);
}
.memo-section-6 .memo-subsection {
  min-height: 71mm;
}
.memo-section-6 .memo-subsection-1,
.memo-section-6 .memo-subsection-3 {
  background:
    linear-gradient(135deg, rgba(216,232,248,.88), rgba(174,205,233,.78)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-6 .memo-subsection-3 {
  min-height: 222mm;
  padding: 12mm;
}
.memo-section-6 .memo-subsection-4 {
  min-height: 222mm;
  break-before: page;
  page-break-before: always;
  background:
    linear-gradient(145deg, rgba(1,9,35,.97), rgba(28,69,108,.93)),
    url("/webgl-bg-foundation-v2.png") center / cover;
  color: rgba(255,255,255,.84);
}
.memo-section-6 .memo-subsection-4 h3,
.memo-section-6 .memo-subsection-4 strong { color: #fff; }
.memo-section-6 .memo-subsection-4 h3 { border-color: rgba(255,255,255,.18); }
.memo-section-6 .memo-subsection-4 blockquote {
  margin-top: 10mm;
  background: rgba(255,255,255,.94);
  color: var(--navy);
}
.memo-section-6 .memo-subsection-4 blockquote strong { color: var(--navy); }
.memo-section-6 .memo-subsection-5 {
  min-height: 134mm;
  background:
    linear-gradient(145deg, rgba(1,9,35,.97), rgba(28,69,108,.93)),
    url("/webgl-bg-foundation-v2.png") center / cover;
  color: rgba(255,255,255,.84);
}
.memo-section-6 .memo-subsection-5 h3,
.memo-section-6 .memo-subsection-5 strong { color: #fff; }
.memo-section-6 .memo-subsection-5 h3 { border-color: rgba(255,255,255,.18); }
.memo-section-6 .memo-subsection-5 li::before { background: #fff; }
.memo-section-6 .memo-subsection-5 .market-visual {
  color: var(--navy);
}

/* 07 · Team — an editorial organisation page and an advisory page */
.memo-section-7 {
  background:
    linear-gradient(rgba(255,255,255,.96), rgba(255,255,255,.96)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-7 .memo-subsection {
  min-height: 81mm;
}
.memo-section-7 .memo-subsection-1 {
  background:
    linear-gradient(135deg, rgba(215,231,247,.89), rgba(165,199,229,.78)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-7 .memo-subsection-3 {
  min-height: 106mm;
  break-before: page;
  page-break-before: always;
}
.memo-section-7 .memo-subsection-4 {
  min-height: 151mm;
  background: var(--navy);
  color: rgba(255,255,255,.84);
}
.memo-section-7 .memo-subsection-4 h3,
.memo-section-7 .memo-subsection-4 strong { color: #fff; }
.memo-section-7 .memo-subsection-4 h3 { border-color: rgba(255,255,255,.18); }
.memo-section-7 .memo-subsection-4 li::before { background: #fff; }
.memo-section-7 .memo-subsection-5 {
  min-height: 222mm;
  padding: 11mm;
  background:
    linear-gradient(135deg, rgba(214,230,247,.92), rgba(170,202,231,.82)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}

/* 08 · Round — capital architecture, milestones and downside protection */
.memo-section-8 {
  background:
    linear-gradient(90deg, rgba(255,255,255,.97) 0 72%, rgba(10,31,59,.96) 72%),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-8 > h2,
.memo-section-8 > p { max-width: 119mm !important; }
.memo-section-8 .memo-subsection {
  min-height: 73mm;
}
.memo-section-8 .memo-subsection-1 {
  background:
    linear-gradient(135deg, rgba(215,231,247,.92), rgba(171,203,232,.82)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-8 .memo-subsection-3 blockquote {
  background: var(--navy);
  color: #fff;
}
.memo-section-8 .memo-subsection-3 {
  min-height: 222mm;
  padding: 12mm;
  background:
    linear-gradient(135deg, rgba(214,230,247,.92), rgba(164,198,229,.82)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-8 .memo-subsection-3 blockquote {
  margin-top: 24mm;
  padding: 12mm;
  font-size: 13pt;
  line-height: 1.5;
}
.memo-section-8 .memo-subsection-3 blockquote strong { color: #fff; }
.memo-section-8 .memo-subsection-4,
.memo-section-8 .memo-subsection-7 {
  break-before: page;
  page-break-before: always;
}
.memo-section-8 .memo-subsection-5 {
  min-height: 164mm;
  background: var(--navy);
  color: rgba(255,255,255,.84);
}
.memo-section-8 .memo-subsection-6 {
  min-height: 222mm;
  padding: 12mm;
  background:
    linear-gradient(135deg, rgba(214,230,247,.92), rgba(164,198,229,.82)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}
.memo-section-8 .memo-subsection-5 h3,
.memo-section-8 .memo-subsection-5 strong { color: #fff; }
.memo-section-8 .memo-subsection-5 h3 { border-color: rgba(255,255,255,.18); }
.memo-section-8 .memo-subsection-5 li::before { background: #fff; }
.memo-section-8 .memo-subsection-7,
.memo-section-8 .memo-subsection-8 {
  min-height: 106mm;
}
.memo-section-8 .memo-subsection-8 {
  background:
    linear-gradient(135deg, rgba(214,230,247,.92), rgba(170,202,231,.82)),
    url("/webgl-bg-foundation-v2.png") center / cover;
}

/* 09 · Risk — underwriting table with a strong close */
.memo-section-9 {
  background: rgba(255,255,255,.97);
}
.memo-section-9 .table-wrap {
  margin: 10mm 0;
  border-radius: 5mm;
  box-shadow: 0 4mm 10mm rgba(0,0,66,.10);
  break-inside: auto;
  page-break-inside: auto;
}
.memo-section-9 table {
  table-layout: auto;
}
.memo-section-9 thead {
  display: table-header-group;
}
.memo-section-9 tr {
  break-inside: avoid;
  page-break-inside: avoid;
}
.memo-section-9 th,
.memo-section-9 td {
  padding: 3mm;
  font-size: 6.7pt;
  line-height: 1.34;
}
.memo-section-9 > p:last-of-type {
  margin-top: 10mm;
  padding: 11mm;
  border-radius: 8mm;
  background:
    linear-gradient(145deg, rgba(1,9,35,.97), rgba(28,69,108,.93)),
    url("/webgl-bg-foundation-v2.png") center / cover;
  color: rgba(255,255,255,.88);
  font-size: 12pt;
  line-height: 1.52;
}
.memo-section-9 > p:last-of-type strong { color: #fff; }
.memo-section-9 .memo-conclusion {
  min-height: 222mm;
  padding: 14mm;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:
    linear-gradient(135deg, rgba(214,230,247,.92), rgba(157,193,226,.82)),
    url("/webgl-bg-foundation-v2.png") center / cover;
  break-before: page;
  page-break-before: always;
}
.memo-section-9 .memo-conclusion h4 {
  margin-bottom: 12mm;
  border: 0;
  font-size: 31pt;
  font-weight: 500;
  letter-spacing: -.05em;
}
.memo-section-9 .memo-conclusion p {
  padding: 10mm;
  border-radius: 7mm;
  background: var(--navy);
  color: rgba(255,255,255,.88);
  font-size: 12pt;
  line-height: 1.5;
}
.memo-section-9 .memo-conclusion p strong { color: #fff; }

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
  .executive-spread {
    width: 198mm;
    height: 262mm;
  }
  .memo-page-snapshot {
    display: block !important;
  }
  .memo-section {
    font-size: 9.2pt;
    line-height: 1.48;
  }
  .memo-subsection,
  .memo-topic {
    box-shadow: none;
  }
  .memo-section-5 {
    background:
      linear-gradient(135deg, rgba(215,231,247,.92), rgba(152,190,224,.84)),
      url("/webgl-bg-foundation-v2.png") center / cover !important;
  }
  .memo-section-5 > h2,
  .memo-section-5 > h2::before,
  .memo-section-5 > p {
    color: #fff !important;
  }
  .memo-section-4 {
    background:
      linear-gradient(135deg, rgba(216,232,248,.91), rgba(165,199,229,.83)),
      url("/webgl-bg-foundation-v2.png") center / cover !important;
  }
  .memo-section-6 .memo-subsection-4 {
    background:
      linear-gradient(145deg, rgba(1,9,35,.98), rgba(28,69,108,.95)),
      url("/webgl-bg-foundation-v2.png") center / cover !important;
  }
  .memo-section-6 .memo-subsection-4 blockquote {
    background: rgba(255,255,255,.94) !important;
    color: var(--navy) !important;
  }
  .memo-section-8 .memo-subsection-3 blockquote {
    background: var(--navy) !important;
    color: #fff !important;
  }
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
    margin: 0;
    padding: 10mm 18mm 11mm;
    border-radius: 0;
    box-shadow: none;
  }
  .memo-cover {
    height: 262mm;
    margin: 0;
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
  .memo-section-4 {
    background:
      linear-gradient(135deg, rgba(216,232,248,.91), rgba(165,199,229,.83)),
      url("/webgl-bg-foundation-v2.png") center / cover !important;
  }
  .memo-section-6 .memo-subsection-4 {
    background:
      linear-gradient(145deg, rgba(1,9,35,.98), rgba(28,69,108,.95)),
      url("/webgl-bg-foundation-v2.png") center / cover !important;
  }
  .memo-section-6 .memo-subsection-4 blockquote {
    background: rgba(255,255,255,.94) !important;
    color: var(--navy) !important;
  }
  .memo-section-8 .memo-subsection-3 blockquote {
    background: var(--navy) !important;
    color: #fff !important;
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
    {cover_page()}
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
