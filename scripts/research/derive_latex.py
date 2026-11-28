"""Make editable LaTeX transcriptions from the library's extracted manuscripts."""

import hashlib
import json
import re
import unicodedata
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

ROOT = Path(__file__).resolve().parents[2]
LIBRARY = ROOT / "public/research/library-content"
CATALOG = LIBRARY / "catalog.json"

ESCAPES = {
    "\\": r"\textbackslash{}", "{": r"\{", "}": r"\}", "$": r"\$",
    "&": r"\&", "#": r"\#", "%": r"\%", "_": r"\_",
    "^": r"\textasciicircum{}", "~": r"\textasciitilde{}",
}
MATH = {
    "×": "times", "±": "pm", "≤": "leq", "≥": "geq",
    "≈": "approx", "≃": "simeq", "→": "to", "∂": "partial", "∅": "varnothing",
    "∈": "in", "∑": "sum", "∗": "ast", "√": "surd", "∞": "infty",
    "∥": "parallel", "∩": "cap", "⊗": "otimes", "⊙": "odot", "⊤": "top",
    "⋆": "star", "⌈": "lceil", "⌉": "rceil", "⌊": "lfloor", "⌋": "rfloor",
    "⟨": "langle", "⟩": "rangle", "′": "prime", "ℓ": "ell", "µ": "mu",
    "∆": "Delta", "Ω": "Omega", "ϕ": "varphi", "ϵ": "varepsilon",
}
MATH.update(zip("αβγδζηθκλνξπρστφχψω", """
    alpha beta gamma delta zeta eta theta kappa lambda nu xi pi
    rho sigma tau phi chi psi omega
""".split()))
MATH.update(zip("ΓΠΣΦ", ["Gamma", "Pi", "Sigma", "Phi"]))
ESCAPES.update({symbol: "\\ensuremath{\\" + command + "}" for symbol, command in MATH.items()})
ESCAPES["−"] = r"\ensuremath{-}"
LIGATURES = str.maketrans(dict(zip("ﬀﬁﬂﬃﬄ", ["ff", "fi", "fl", "ffi", "ffl"])))
HEADING = re.compile(r"(?:[1-9]\d?(?:\.\d+)*\.?\s+[A-Z][\w ,:'’()–-]{3,90}|Abstract|References)")


def escape(text):
    return "".join(
        ESCAPES.get(char, f"[U+{ord(char):04X}]" if unicodedata.category(char) in {"Cc", "Co"} else char)
        for char in unicodedata.normalize("NFC", text).translate(LIGATURES)
    )


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def transcribe(title, pdf, text, output):
    output.parent.mkdir(parents=True, exist_ok=True)
    document = [
        "% PDF-derived LaTeX transcription. Original manuscript source was unavailable.",
        f"% Published PDF SHA-256: {digest(pdf)}",
        f"% Extracted text SHA-256: {digest(text)}",
        r"\documentclass[11pt]{article}",
        r"\usepackage[margin=1in]{geometry}",
        r"\usepackage{amsmath,amssymb}",
        r"\setlength{\emergencystretch}{3em}",
        r"\title{" + escape(title) + "}",
        r"\author{}",
        r"\date{}",
        r"\begin{document}",
        r"\maketitle",
        r"\noindent\textbf{PDF-derived LaTeX transcription.} This editable text follows the PDF extraction. Refer to the published PDF for figures, table layouts, and mathematical notation.",
        "",
    ]
    for index, page in enumerate(text.read_text().split("\f"), start=1):
        if not page.strip():
            continue
        document.extend([f"% Extracted chunk {index}", ""])
        for original in page.splitlines():
            line = original.strip().expandtabs(4)
            if HEADING.fullmatch(line):
                document.extend(["", r"\section*{" + escape(line) + "}", ""])
            elif re.search(r" {3,}", line):
                columns = r"\quad ".join(escape(part) for part in re.split(r" {3,}", line))
                document.extend(["", r"\noindent " + columns + r"\par", ""])
            else:
                document.append(escape(line))
        document.append("")
    output.write_text("\n".join(document + [r"\end{document}", ""]))


def package(title, source, pdf, pdf_url, archive):
    readme = (
        f"{title}\n\n"
        "PDF-derived LaTeX package\n\n"
        "Extract the ZIP, then run tectonic main.tex or xelatex main.tex.\n"
        "The editable source follows the published PDF's extracted text.\n"
        "Use the published PDF for the exact equations, tables, and figures.\n\n"
        f"Published PDF: {pdf_url}\n"
        f"PDF SHA-256: {digest(pdf)}\n"
    )
    with ZipFile(archive, "w") as bundle:
        bundle.writestr(ZipInfo("main.tex"), source.read_bytes(), compress_type=ZIP_DEFLATED)
        bundle.writestr(ZipInfo("README.txt"), readme, compress_type=ZIP_DEFLATED)


def main():
    catalog = json.loads(CATALOG.read_text())
    for paper in catalog["papers"]:
        if paper.get("tex") and paper.get("latexKind") != "derived":
            continue
        pdf = LIBRARY / paper["pdf"]
        assert digest(pdf) == paper["sha256"], paper["id"]
        source = pdf.with_name("manuscript-derived.tex")
        archive = pdf.with_name(pdf.stem + "-latex.zip")
        transcribe(paper["title"], pdf, LIBRARY / paper["text"], source)
        package(paper["title"], source, pdf, "https://shodh.ai/research/" + paper["pdf"], archive)
        paper.update(
            tex=source.relative_to(LIBRARY).as_posix(),
            latexKind="derived",
            latexBundle=archive.relative_to(LIBRARY).as_posix(),
        )
    CATALOG.write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + "\n")

    title = "Rotation dependence in an antibody structure tokenizer and sequence-anchored canonicalization"
    pdf_path = "blog/antibody-tokenizer-rotation-invariance/antibody-tokenizer-pose-dependence.pdf"
    pdf = ROOT / "public" / pdf_path
    source = LIBRARY / "papers/antibody-pose-canonicalization/manuscript-derived.tex"
    transcribe(title, pdf, Path(__file__).with_name("antibody.txt"), source)
    package(title, source, pdf, "https://shodh.ai/" + pdf_path, source.with_name("antibody-pose-canonicalization-latex.zip"))


if __name__ == "__main__":
    main()
