"""Generate crawler-readable pages without changing the reviewed manuscripts.

Run after catalog updates. Optional presentation.json entries, keyed by paper ID,
may provide verified authors, a stable slug, or an approved social image.
"""
import html
import json
import re
from pathlib import Path
from urllib.parse import quote
from xml.sax.saxutils import escape as xml

from research_art import art_svg, domain_key

ROOT = Path(__file__).resolve().parent
DIST = ROOT.parent.parent / 'public/research/library-content'
BASE = 'https://shodh.ai/research'
e = lambda value: html.escape(str(value), quote=True)


def share_links(url, title):
    """Share row for a paper page: plain links (no trackers) plus copy-link and the
    device share sheet, which app.js enables where supported."""
    u, t = quote(url, safe=''), quote(title, safe='')
    pill = 'class="share-pill"'
    return ('<div class="share" role="group" aria-label="Share this paper"><span class="share-label">Share</span>'
            f'<button type="button" {pill} data-native-share data-url="{e(url)}" data-title="{e(title)}" hidden>Share…</button>'
            f'<a {pill} href="https://www.linkedin.com/sharing/share-offsite/?url={u}" target="_blank" rel="noopener noreferrer">LinkedIn</a>'
            f'<a {pill} href="https://twitter.com/intent/tweet?url={u}&amp;text={t}" target="_blank" rel="noopener noreferrer">X</a>'
            f'<a {pill} href="mailto:?subject={t}&amp;body={u}">Email</a>'
            f'<button type="button" {pill} data-copy-link data-url="{e(url)}">Copy link</button></div>')
# Dark is the default theme; the home page's light-mode choice (shodh-theme) carries over.
THEME_BOOT = "<script>try{document.documentElement.dataset.theme=localStorage.getItem('shodh-theme')==='light'?'light':'dark'}catch(_){}</script>"
# Same sun/moon toggle as the home page header.
THEME_TOGGLE = ('<button class="theme-toggle" id="theme-toggle" type="button" aria-label="Use light mode">'
                '<svg class="icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
                '<svg class="icon-moon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></button>')


def build():
    catalog = json.loads((DIST / 'catalog.json').read_text())
    presentation = json.loads((ROOT / 'presentation.json').read_text())
    papers = catalog['papers']
    for p in papers:
        p.update(presentation.get(p['id'], {}))
        p.setdefault('slug', re.sub(r'[^a-z0-9]+', '-', p['title'].lower()).strip('-'))
        for key in ('pdf', 'text', 'report', 'bibtex'):
            if p.get(key):
                p[key] = '/' + p[key].lstrip('/')
        p.setdefault('ogImage', '/social/' + p['id'].lower() + '.png')
    assert len({p['slug'] for p in papers}) == len(papers)

    def byline(p):
        return f'<p class="paper-meta byline">By {e(", ".join(p["authors"]))}</p>' if p.get('authors') else ''

    def paper_status(p):
        return f"{e(p.get('publicationType', 'Working paper'))} · {p['pages']} pages"

    def card(p):
        return f'''<article class="paper-row reveal" data-paper="{e(p['id'])}" data-domain="{domain_key(p['domain'])}"><div class="card-art">{art_svg(p['domain'])}</div><div class="paper-summary"><span class="eyebrow">{e(p['domain'])}</span><h3><a href="/{p['slug']}">{e(p['title'])}</a></h3>{byline(p)}<p>{e(p['question'])}</p><details class="list-abstract"><summary>Abstract</summary><p>{e(p['abstract'])}</p></details><span class="paper-meta">{paper_status(p)}</span></div><a class="read-link" href="/{p['slug']}">Read paper <span aria-hidden="true">→</span></a></article>'''

    def shell(title, description, path, body, p=None, kind='CollectionPage', extra=None):
        image = p['ogImage'] if p else '/social/research.png'
        structured = {'@context': 'https://schema.org', '@type': 'ScholarlyArticle' if p else kind, 'name': title, 'description': description, 'url': BASE + path}
        if p:
            structured.update(headline=p['title'], abstract=p['abstract'], encoding={'@type': 'MediaObject', 'contentUrl': BASE + p['pdf'], 'encodingFormat': 'application/pdf'})
            if p.get('authors'):
                structured['author'] = [{'@type': p.get('authorType', 'Person'), 'name': a} for a in p['authors']]
        elif kind == 'CollectionPage':
            structured['hasPart'] = [{'@type': 'ScholarlyArticle', 'name': item['title'], 'url': BASE + '/' + item['slug']} for item in papers]
        if extra:
            structured.update(extra)
        author_meta = ''.join(f'<meta name="author" content="{e(a)}"><meta name="citation_author" content="{e(a)}">' for a in (p or {}).get('authors', []))
        citation = f'<meta name="citation_title" content="{e(p["title"])}"><meta name="citation_pdf_url" content="{BASE}{e(p["pdf"])}">' if p else ''
        data = json.dumps(papers, ensure_ascii=False).replace('<', '\\u003c')
        # Kept outside the f-string so the generator also runs on Python < 3.12.
        ld_json = json.dumps(structured, ensure_ascii=False).replace('<', '\\u003c')
        return f'''<!doctype html>
<html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">{THEME_BOOT}
<title>{e(title)} — Shodh Research</title><meta name="description" content="{e(description)}"><meta name="theme-color" content="#01050b"><link rel="canonical" href="{BASE}{path}">
<meta property="og:type" content="{'article' if p else 'website'}"><meta property="og:site_name" content="Shodh Research"><meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(description)}"><meta property="og:url" content="{BASE}{path}"><meta property="og:image" content="{BASE}{image}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="{e(p.get('ogAlt', title) if p else title)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{e(title)}"><meta name="twitter:description" content="{e(description)}"><meta name="twitter:image" content="{BASE}{image}">{author_meta}{citation}
<link rel="icon" href="/brand/shodh-brandmark.svg" type="image/svg+xml"><link rel="preload" href="/brand/Syne-Variable.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="/styles.css?v=ssg-20261128c">
<script type="application/ld+json">{ld_json}</script></head>
<body><div id="brand-background" aria-hidden="true"></div><a class="skip" href="#main">Skip to research</a><header class="header"><a class="brand" href="/" aria-label="Shodh Research home"><img class="wordmark" src="/brand/shodh-wordmark.svg" width="136" height="32" alt="Shodh AI"><span class="brand-sub">Research</span></a><nav aria-label="Main navigation"><a href="/">Papers</a><a href="/about">About</a><a href="https://shodh.ai">Shodh AI</a></nav>{THEME_TOGGLE}</header>
<main id="main" tabindex="-1">{body}</main><footer><a class="brand" href="/"><img class="wordmark" src="/brand/shodh-wordmark.svg" width="108" height="26" alt="Shodh AI"><span class="brand-sub">Research</span></a></footer><script id="paper-data" type="application/json">{data}</script><script src="/app.js?v=ssg-20261128c" defer></script><script src="/brand-background.js?v=ssg-20261128c" defer></script></body></html>'''

    home = f'''<div class="container"><section class="hero"><span class="eyebrow">Shodh Research</span><h1>Research<br>at <span>Shodh.</span></h1><p>Working papers on scientific AI, physical simulation, and learned representations.</p><div class="actions"><a class="button" href="#collection-title">Explore the papers</a><a class="button secondary" href="/about">About our research</a></div></section><section class="collection" aria-labelledby="collection-title"><div class="section-top"><h2 id="collection-title">Explore our papers</h2><label class="search" hidden data-enhanced><input id="search" type="search" placeholder="Search papers" aria-label="Search papers"></label></div><div class="filters" id="filters" aria-label="Filter papers by topic" hidden data-enhanced></div><div class="results-summary"><p class="result-count" id="result-count" role="status" aria-live="polite">{len(papers)} papers</p><button class="reset-filters" id="reset-filters" hidden>Show all papers</button></div><div class="paper-list" id="paper-list">{''.join(card(p) for p in papers)}</div></section></div>'''
    featured = '<section class="related"><h2>Featured research</h2><div class="related-grid"><a href="/reactor-h100-triton"><span class="eyebrow">Scientific computing</span><h3>Fused reactor-field generation</h3></a><a href="/lucan-10b-physics"><span class="eyebrow">Technical whitepaper</span><h3>LUCAN: Physical intelligence</h3></a><a href="/beyond-reconstruction-error"><span class="eyebrow">Reading guide</span><h3>Beyond reconstruction error</h3></a></div></section>'
    home = home.replace('<section class="collection"', featured + '<section class="collection"')
    (DIST / 'index.html').write_text(shell('Scientific AI & simulation', 'Explore Shodh working papers on scientific AI, physical simulation, and learned representations. Read abstracts and download PDFs.', '/', home))
    for p in papers:
        limitations = '<h3>Limitations</h3><ul>' + ''.join(f'<li>{e(item)}</li>' for item in p['limitations']) + '</ul>' if p.get('limitations') else ''
        report = f'<a href="{e(p["report"])}">Read the verification notes</a>' if p.get('report') else ''
        notes = f'<details class="research-notes"><summary>Scope & supporting notes</summary><div>{limitations}{report}</div></details>' if limitations or report else ''
        refs = f'<a href="{e(p["bibtex"])}" class="text-link" download>References (BibTeX)</a>' if p.get('bibtex') else ''
        engineering = f'<a href="{e(p["engineeringPath"])}" class="text-link">Engineering overview</a>' if p.get('engineeringPath') else ''
        publication_type = e(p.get('publicationType', 'Working paper').lower())
        content = f'''<div class="container"><div class="breadcrumb"><a href="/">All papers</a></div><header class="paper-heading" data-domain="{domain_key(p['domain'])}"><div class="heading-art">{art_svg(p['domain'])}</div><span class="eyebrow">{e(p['domain'])}</span><h1>{e(p['title'])}</h1>{byline(p)}<p class="paper-meta">{paper_status(p)}</p><div class="actions"><a href="{e(p['pdf'])}" class="button">Read PDF</a><a href="{e(p['pdf'])}" class="button secondary" download="{e(p.get('downloadName', p['title'] + '.pdf'))}">Download PDF</a><a href="{e(p['text'])}" class="text-link">Read extracted text</a>{refs}{engineering}</div>{share_links(BASE + '/' + p['slug'], p['title'])}</header><div class="paper-content"><section class="abstract" aria-labelledby="abstract-title"><h2 id="abstract-title">Abstract</h2><p>{e(p['abstract'])}</p></section>{notes}<p class="publication-note">This is a {publication_type}. Please refer to the manuscript for methods, results, and limitations.</p></div><section class="related"><h2>Related papers</h2><div class="related-grid">{''.join(f'<a href="/{q["slug"]}"><h3>{e(q["title"])}</h3></a>' for q in papers if q['domain'] == p['domain'] and q['id'] != p['id'])}</div></section></div>'''.replace('<div class="related-grid"><a href=', '<div class="related-grid"><a class="reveal" href=').replace('</a><a href=', '</a><a class="reveal" href=')
        # Flat HTML files plus Vercel cleanUrls give canonical extensionless URLs.
        (DIST / (p['slug'] + '.html')).write_text(shell(p['title'], p['abstract'][:250], '/' + p['slug'], content, p))
    about = '<div class="container"><section class="about-page"><span class="eyebrow">About Shodh Research</span><h1>Exploring AI<br>for science.</h1><div class="about-copy"><p>Our research explores how learned representations interact with the structure of physical systems, from molecules and materials to fluid dynamics and electromagnetics.</p><p>Each manuscript describes the methods, evidence, and limits of its findings. We share this work as working papers for researchers to read and build on.</p><a class="button" href="/">Explore the papers</a></div></section></div>'
    (DIST / 'about.html').write_text(shell('About our research', 'Working papers on scientific AI and physical systems at Shodh.', '/about', about))
    (DIST / '404.html').write_text(shell('Page not found', 'Explore the Shodh Research paper collection.', '/404', '<div class="container"><section class="empty"><h1>Page not found</h1><a href="/">Explore the papers</a></section></div>').replace('<meta name="description"', '<meta name="robots" content="noindex"><meta name="description"', 1))
    # LUCAN-10B is now a full catalog manuscript supplied by the author.
    selected = [next(p for p in papers if p['id'] == pid) for pid in ['P01', 'P06', 'P14', 'P18', 'P21']]
    guide_description = 'A reading guide to Shodh working papers on reconstruction fidelity, symmetry response, and physical constraints.'
    guide = '<div class="container"><div class="breadcrumb"><a href="/">All research</a></div><header class="paper-heading"><span class="eyebrow">Reading guide</span><h1>Beyond reconstruction error</h1><p>' + guide_description + '</p>' + share_links(BASE + '/beyond-reconstruction-error', 'Beyond reconstruction error') + '</header><div class="paper-content"><h2>Separate the questions</h2><p>The papers below examine distinct questions about learned scientific representations: how closely a decoded field matches its input, how stored features respond to transformations, and which physical constraints a decoder enforces. Each question requires its own evidence.</p><p>This guide collects existing working papers. Refer to each manuscript for its methods, results, and limitations.</p></div><div class="paper-list">' + ''.join(card(p) for p in selected) + '</div></div>'
    (DIST / 'beyond-reconstruction-error.html').write_text(shell('Beyond reconstruction error', guide_description, '/beyond-reconstruction-error', guide, extra={'hasPart': [{'@type': 'ScholarlyArticle', 'name': p['title'], 'url': BASE + '/' + p['slug']} for p in selected]}).replace(BASE + '/social/research.png', BASE + '/social/charts/beyond-reconstruction-error.png'))
    urls = ['/', '/about', '/beyond-reconstruction-error'] + ['/' + p['slug'] for p in papers]
    (DIST / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'<url><loc>{xml(BASE + path)}</loc></url>\n' for path in urls) + '</urlset>\n')
    (DIST / 'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: ' + BASE + '/sitemap.xml\n')
    (DIST / 'routes.json').write_text(json.dumps({p['id']: '/' + p['slug'] for p in papers}, indent=2) + '\n')
    print(f'Generated {len(papers)} paper pages, homepage, about, 404, sitemap and robots.txt')


if __name__ == '__main__':
    build()
