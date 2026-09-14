# Biotechnology article and whitepaper series

The collection lives at `/industries/biotechnology`. Article routes are `/biotechnology/molecule-to-manufacturing`, `/biotechnology/cell-gene-therapy`, `/biotechnology/scale-up`, `/biotechnology/biologics-manufacturing`, and `/biotechnology/formulation-delivery`.

`app/research/biotechnology/content.ts` contains the full article manuscripts and primary references. `build_whitepapers.py` contains the concise whitepaper abstracts and modeling/verification summaries; it combines these with selected article passages, equations and scale diagrams. Revise the paired formats together. Historical research URLs redirect to the current routes.

## Rebuild PDFs

Use the repository's installed Node dependencies and Python with `reportlab` and `pypdf`. Set `BIOTECH_FONT_DIR` to a directory containing `DejaVuSans.ttf` and `DejaVuSans-Bold.ttf` when they are not in `/usr/share/fonts/truetype/dejavu`.

```sh
node scripts/biotechnology/export_content.cjs | python3 scripts/biotechnology/build_whitepapers.py
```

The builder writes exactly two pages per topic to `output/pdf/` and copies each deliverable to `public/biotechnology/whitepapers/`. It fails on layout overflow or unexpected page count. Render the PDFs and visually inspect all ten pages after substantive changes. Generated PDFs are ignored by Git and delivered separately. The website does not expose download links for these files.

The web articles distinguish established science, Shodh-reported results and prospective applications. Hypothetical examples are labeled. Do not convert illustrative calculations or simulation results into claims of validated therapeutic or manufacturing performance.

## Editorial hierarchy

Keep exactly five permanent Biotechnology pillars. Article introductions establish the future and the industry problem; the body explains fragmented approaches, cross-scale relationships, LUCAN and the technical evidence. Evidence and scope precede the final manufacturing opportunity. `articleOrder` controls narrative order without changing the source-section indices used by the paired PDF builder.

The flagship is the biotech manifesto. The scale-up paper is the public successor to the earlier UNIPHY overview, which remains linked only as background reading. Protein therapeutics and LNP delivery systems are distinct routes in the downstream figure. Do not present proposed CAR-T coupling as validated CAR-T manufacturing.

A future personalized-medicine / programmable-manufacturing editorial can sit beneath the flagship or formulation-and-delivery pillar; it should not automatically become a sixth permanent category.
