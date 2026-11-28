"""Decorative, animated line art for each research topic (inline SVG, no assets).

Each topic gets its own motif and hue; styles.css colours and animates them, and
switches the motion off for visitors who prefer reduced motion.
"""
import math
import re

DOMAIN_KEYS = {
    'Physical foundation models': 'foundation',
    'Mechanics': 'mechanics',
    'Molecular science': 'molecular',
    'Materials': 'materials',
    'Fluid dynamics': 'fluid',
    'Electromagnetics': 'em',
    'Research methods': 'methods',
}


def domain_key(domain):
    return DOMAIN_KEYS.get(domain) or re.sub(r'[^a-z0-9]+', '-', domain.lower()).strip('-')


def _f(value):
    return f'{value:.1f}'.rstrip('0').rstrip('.')


def _fluid():
    lines = []
    for k in range(6):
        y, amp = 18 + k * 17, 6 + (k % 3) * 2
        waves = ' '.join(f'q20 {-amp if j % 2 == 0 else amp} 40 0' for j in range(10))
        lines.append(f'<path class="flow" style="--i:{k}" d="M-40 {y} {waves}" stroke-opacity="{0.35 + 0.1 * (k % 3):.2f}"/>')
    return ''.join(lines)


def _molecular():
    nodes = [(70, 62, 7), (112, 38, 5), (118, 86, 6), (160, 60, 9), (204, 34, 5), (206, 88, 6), (250, 60, 7), (286, 36, 4), (36, 40, 4), (34, 88, 4)]
    bonds = [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4), (3, 5), (4, 6), (5, 6), (6, 7), (0, 8), (0, 9)]
    out = [f'<line x1="{nodes[a][0]}" y1="{nodes[a][1]}" x2="{nodes[b][0]}" y2="{nodes[b][1]}" stroke-opacity=".45"/>' for a, b in bonds]
    out += [f'<circle class="pulse" style="--i:{i}" cx="{x}" cy="{y}" r="{r}" fill="currentColor" fill-opacity=".18"/>' for i, (x, y, r) in enumerate(nodes)]
    return ''.join(out)


def _materials():
    out, pts = [], []
    for row in range(6):
        for col in range(11):
            pts.append((col * 32 + (16 if row % 2 else 0), 12 + row * 20))
    for i, (x, y) in enumerate(pts):
        for (u, v) in pts[i + 1:]:
            if abs(u - x) <= 16 and 0 < v - y <= 20 or (v == y and u - x == 32):
                out.append(f'<line x1="{x}" y1="{y}" x2="{u}" y2="{v}" stroke-opacity=".22"/>')
    out += [f'<circle cx="{x}" cy="{y}" r="2.4" fill="currentColor" stroke="none" fill-opacity=".75"/>' for x, y in pts]
    return f'<g class="drift">{"".join(out)}</g>'


def _mechanics():
    saw = 'M-10 92 ' + ' '.join(f'L{_f(x + 20)} {28 if i % 2 == 0 else 92}' for i, x in enumerate(range(-10, 330, 20)))
    loops = ''.join(f'<ellipse class="loop" style="--i:{i}" cx="160" cy="60" rx="{46 + i * 22}" ry="{14 + i * 7}" transform="rotate(-18 160 60)" stroke-opacity="{0.6 - i * 0.15:.2f}"/>' for i in range(3))
    return f'<path d="{saw}" stroke-opacity=".22"/>{loops}'


def _em():
    out = []
    for h in (16, 30, 46, 64):
        for sign in (-1, 1):
            out.append(f'<path class="field" d="M110 60 C140 {60 + sign * h} 180 {60 + sign * h} 210 60" stroke-opacity="{0.25 + h / 160:.2f}"/>')
    for x in (110, 210):
        out += [f'<circle class="ring" style="--i:{i}" cx="{x}" cy="60" r="{6 + i * 9}" stroke-opacity="{0.5 - i * 0.12:.2f}"/>' for i in range(3)]
    return ''.join(out)


def _foundation():
    out = ['<ellipse class="orbit" cx="160" cy="60" rx="120" ry="44" stroke-dasharray="3 7" stroke-opacity=".4"/>']
    for i in range(8):
        a = i / 8 * 2 * math.pi
        x, y = 160 + 120 * math.cos(a), 60 + 44 * math.sin(a)
        out.append(f'<line x1="160" y1="60" x2="{_f(x)}" y2="{_f(y)}" stroke-opacity=".3"/>')
        out.append(f'<circle class="pulse" style="--i:{i}" cx="{_f(x)}" cy="{_f(y)}" r="5" fill="currentColor" fill-opacity=".2"/>')
    out.append('<circle cx="160" cy="60" r="12" fill="currentColor" fill-opacity=".25"/><circle class="pulse" cx="160" cy="60" r="20" stroke-opacity=".35"/>')
    return ''.join(out)


def _methods():
    bars = [28, 46, 38, 62, 54, 76, 70, 88]
    out = ['<path d="M30 104 H300 M30 104 V14" stroke-opacity=".35"/>']
    out += [f'<rect class="bar" style="--i:{i}" x="{44 + i * 31}" y="{104 - h}" width="16" height="{h}" rx="2" fill="currentColor" fill-opacity=".16" stroke-opacity=".5"/>' for i, h in enumerate(bars)]
    out.append('<path class="trend" d="M40 80 C110 66 180 44 296 20" stroke-opacity=".85"/>')
    return ''.join(out)


_MOTIFS = {'fluid': _fluid, 'molecular': _molecular, 'materials': _materials, 'mechanics': _mechanics,
           'em': _em, 'foundation': _foundation, 'methods': _methods}


def art_svg(domain):
    """Inline SVG for a topic; unknown topics fall back to the foundation motif."""
    key = domain_key(domain)
    motif = _MOTIFS.get(key, _foundation)()
    return (f'<svg class="art art-{key}" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" '
            f'fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true" focusable="false">{motif}</svg>')
