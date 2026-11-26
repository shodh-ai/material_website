"""Build the existing reviewed library with canonical URLs under shodh.ai/research.

The origin stays on its existing Vercel project. Only explicit public library
routes are proxied; existing main-site research articles and PDFs remain intact.
"""
from pathlib import Path
import html
import json
import re
import runpy
import shutil

SOURCE = Path(__file__).resolve().parent
DIST = SOURCE.parent.parent / 'public/research/library-content'
MAIN = 'https://shodh.ai/research'
builder = SOURCE / 'build_static.py'
for name in ['styles.css', 'app.js']:
    shutil.copy2(SOURCE / name, DIST / name)
runpy.run_path(str(builder), run_name='__main__')

nav = '<nav aria-label="Main navigation"><a href="/research">Research</a><a href="/engineering">Engineering</a><a href="/careers">Careers</a></nav>'
for path in DIST.glob('*.html'):
    text = path.read_text()
    text = re.sub(r'(href|src)="/(?!/)', r'\1="/research/', text)
    text = text.replace(MAIN + '/"', MAIN + '"')
    text = re.sub(r'<nav aria-label="Main navigation">.*?</nav>', lambda _: nav, text)
    path.write_text(text)

home = DIST / 'index.html'
text = home.read_text()
stack = '''<section class="architecture" aria-labelledby="stack-title"><h2 id="stack-title">Our physical intelligence stack</h2><ol class="stack-diagram" aria-label="Skanda, LURTEE, Fail-Closed, LUCAN, Inverse Design"><li>Skanda</li><li>LURTEE</li><li>Fail-Closed</li><li>LUCAN</li><li>Inverse Design</li></ol></section>'''
featured = '''<section class="related"><h2>Featured papers &amp; technical reports</h2><div class="related-grid"><a href="/research/antibody-pose-canonicalization"><span class="eyebrow">Research paper</span><h3>Sequence-anchored antibody canonicalization</h3></a><a href="/research/lucan-10b-physics"><span class="eyebrow">Technical whitepaper</span><h3>LUCAN: Physical intelligence</h3></a><a href="/world-model"><span class="eyebrow">Technical report</span><h3>A foundation world model for physical intelligence</h3></a></div></section><section class="related"><h2>Ideas &amp; perspectives</h2><div class="related-grid"><a href="/research/three-generations-of-foundation-models"><h3>The three generations of foundation models</h3></a><a href="/research/beyond-reconstruction-error"><h3>Beyond reconstruction error</h3></a><a href="/engineering"><h3>Engineering at Shodh</h3></a></div></section>'''
text = re.sub(r'<section class="related"><h2>Featured research</h2>.*?</section>', lambda _: stack + featured, text)
home.write_text(text)
(DIST / 'home.html').write_text(text)

# The current main website already hosts this manuscript. Preserve that PDF.
title = 'Rotation dependence in an antibody structure tokenizer and sequence-anchored canonicalization'
description = 'A frozen-tokenizer study of rotation-dependent preprocessing and a sequence-anchored canonical frame without retraining.'
raw = (Path(__file__).parent / 'antibody.txt').read_text()
abstract = ' '.join(raw.split('Abstract\n', 1)[1].split('\nIntroduction', 1)[0].split())
pdf = 'https://shodh.ai/blog/antibody-tokenizer-rotation-invariance/antibody-tokenizer-pose-dependence.pdf'
figure = 'https://shodh.ai/blog/antibody-tokenizer-rotation-invariance/rotation-stability.png'
lucan = next(p for p in json.loads((DIST / 'catalog.json').read_text())['papers'] if p['id'] == 'LUCAN10B')
page = (DIST / 'lucan-10b-physics.html').read_text()
page = page.replace(html.escape(lucan['title'], quote=True), html.escape(title, quote=True))
page = page.replace(html.escape(lucan['abstract'][:250], quote=True), html.escape(description, quote=True))
page = page.replace(MAIN + '/lucan-10b-physics', MAIN + '/antibody-pose-canonicalization')
page = page.replace(MAIN + '/social/lucan-10b.png', figure)
page = page.replace(MAIN + '/papers/lucan-10b/LUCAN_10B_arXiv_Research_Manuscript.pdf', pdf)
structured = {'@context':'https://schema.org','@type':'ScholarlyArticle','name':title,'headline':title,'abstract':abstract,'url':MAIN+'/antibody-pose-canonicalization','encoding':{'@type':'MediaObject','contentUrl':pdf,'encodingFormat':'application/pdf'}}
page = re.sub(r'<script type="application/ld\+json">.*?</script>', lambda _: '<script type="application/ld+json">' + json.dumps(structured).replace('<', '\\u003c') + '</script>', page)
page = re.sub(r'<meta property="og:image:alt"[^>]+>', '<meta property="og:image:alt" content="Rotation stability by preprocessing choice">', page)
body = f'''<main id="main" tabindex="-1"><div class="container"><div class="breadcrumb"><a href="/research">All research</a></div><header class="paper-heading"><span class="eyebrow">Research paper</span><h1>{html.escape(title)}</h1><div class="actions"><a class="button" href="{pdf}">Read paper PDF</a><a class="text-link" href="/engineering/antibody-tokenizer-rotation-invariance">Engineering overview</a></div></header><div class="paper-content"><section class="abstract"><h2>Abstract</h2><p>{html.escape(abstract)}</p></section><figure><img class="social-figure" src="{figure}" alt="Rotation stability by preprocessing choice"><figcaption>Rotation stability under the evaluated preprocessing variants. Refer to the manuscript for methods and limitations.</figcaption></figure></div></div></main>'''
page = re.sub(r'<main id="main".*?</main>', lambda _: body, page)
page = page.replace('content="1200"', 'content="1467"').replace('content="630"', 'content="735"')
(DIST / 'antibody-pose-canonicalization.html').write_text(page)

js = DIST / 'app.js'
js.write_text(js.read_text().replace('location.replace("/" + paper.slug)', 'location.replace("/research/" + paper.slug)').replace('location.replace("/about")', 'location.replace("/research/about")'))
css = DIST / 'styles.css'

sitemap = DIST / 'sitemap.xml'
text = sitemap.read_text().replace(MAIN + '/</loc>', MAIN + '</loc>').replace('</urlset>', f'<url><loc>{MAIN}/antibody-pose-canonicalization</loc></url>\n</urlset>')
sitemap.write_text(text)
(DIST / 'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: https://shodh.ai/sitemap.xml\n')
print('Prepared main-domain static research pages and manuscript links.')
