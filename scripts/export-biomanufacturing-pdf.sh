#!/bin/bash
# Export /biomanufacturing as a PDF with each section as a landscape slide
# Usage: bash scripts/export-biomanufacturing-pdf.sh [URL] [OUTPUT]

URL="${1:-http://localhost:3000/biomanufacturing}"
OUTPUT="${2:-./biomanufacturing-export.pdf}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

echo "Exporting $URL to $OUTPUT ..."

"$CHROME" \
  --headless=new \
  --no-sandbox \
  --use-angle=metal \
  --enable-webgl \
  --ignore-gpu-blocklist \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=10000 \
  --print-to-pdf="$OUTPUT" \
  --print-to-pdf-no-header \
  --no-pdf-header-footer \
  --paper-width=13.333 \
  --paper-height=7.5 \
  --margin-top=0 \
  --margin-bottom=0 \
  --margin-left=0 \
  --margin-right=0 \
  "$URL"

echo "Done! PDF saved to: $OUTPUT"
