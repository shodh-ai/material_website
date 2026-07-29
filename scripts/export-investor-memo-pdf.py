from __future__ import annotations

import io
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / "tmp" / "pdfs" / "investor-memo"
RAW = WORK / "shodh-investor-memo-raw.pdf"
OUTPUT = ROOT / "output" / "pdf" / "shodh-investor-memo.pdf"


def stamp_footer(raw_pdf: Path, output_pdf: Path) -> None:
    reader = PdfReader(str(raw_pdf))
    writer = PdfWriter()
    page_count = len(reader.pages)

    for index, page in enumerate(reader.pages, start=1):
        if index == 1:
            writer.add_page(page)
            continue
        width = float(page.mediabox.width)
        height = float(page.mediabox.height)
        packet = io.BytesIO()
        footer = canvas.Canvas(packet, pagesize=(width, height))
        footer.setStrokeColorRGB(0.0, 0.0, 0.26, alpha=0.18)
        footer.setLineWidth(0.35)
        footer.line(45, 31, width - 45, 31)
        footer.setFillColorRGB(0.0, 0.0, 0.26, alpha=0.5)
        footer.setFont("Helvetica", 6.5)
        footer.drawString(45, 19, "SHODH AI · INVESTOR MEMO")
        footer.drawRightString(width - 45, 19, f"CONFIDENTIAL · {index:02d} / {page_count:02d}")
        footer.save()
        packet.seek(0)
        page.merge_page(PdfReader(packet).pages[0])
        writer.add_page(page)

    with output_pdf.open("wb") as stream:
        writer.write(stream)


def main() -> None:
    WORK.mkdir(parents=True, exist_ok=True)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    if not RAW.exists():
        raise FileNotFoundError(f"Render the raw browser PDF first: {RAW}")
    stamp_footer(RAW, OUTPUT)
    print(OUTPUT)


if __name__ == "__main__":
    main()
