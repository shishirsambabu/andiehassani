#!/usr/bin/env python3
"""
Render the Red Thread "Studio Statement" to PDF.

Self-contained: embeds the six woff2 faces in ./fonts as base64 data URIs,
wraps statement_body.html in statement.css, and prints to PDF with headless
Chromium. Run from this directory:

    python3 build.py

Requires a Chromium/Chrome binary (path auto-detected, or set CHROME env var)
and, optionally, PyMuPDF (`pip install pymupdf`) to stamp document metadata.
"""
import base64
import glob
import os
import pathlib
import subprocess

HERE = pathlib.Path(__file__).resolve().parent
FONTS = HERE / "fonts"
OUT_PDF = HERE.parent / "Andie-Hassani_Website-Studio-Statement.pdf"


def b64(name: str) -> str:
    return base64.b64encode((FONTS / name).read_bytes()).decode()


FACES = {
    "Display": ("oswald.woff2", 400, "normal"),        # condensed display (Oswald 600 file)
    "Editorial": ("fraunces-400.woff2", 400, "normal"),
    "Editorial-it": ("fraunces-it.woff2", 400, "italic"),
    "Editorial-b": ("fraunces-600.woff2", 600, "normal"),
    "Mono": ("spacemono.woff2", 400, "normal"),
    "Grotesk": ("archivo.woff2", 400, "normal"),
}

font_faces = "\n".join(
    f"@font-face{{font-family:'{fam.split('-')[0]}';font-weight:{w};font-style:{s};"
    f"src:url(data:font/woff2;base64,{b64(f)}) format('woff2');}}"
    for fam, (f, w, s) in FACES.items()
)

full = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Studio Statement 001 — Andie Hassani Website</title>
<style>
{font_faces}
{(HERE / 'statement.css').read_text()}
</style></head>
<body>
{(HERE / 'statement_body.html').read_text()}
</body></html>"""

html_path = HERE / "statement_full.html"
html_path.write_text(full)

chrome = os.environ.get("CHROME") or next(
    iter(
        glob.glob("/opt/pw-browsers/chromium*/chrome-linux/chrome")
        + glob.glob("/usr/bin/chromium*")
        + glob.glob("/usr/bin/google-chrome*")
    ),
    "chromium",
)

subprocess.run(
    [chrome, "--headless", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
     f"--print-to-pdf={OUT_PDF}", f"file://{html_path}"],
    check=True,
)
print("Wrote", OUT_PDF)

try:
    import fitz  # PyMuPDF
    d = fitz.open(OUT_PDF)
    d.set_metadata({
        "title": "Studio Statement 001 — Andie Hassani Website",
        "author": "Shishir Babu",
        "subject": "Design & development statement for the Andie Hassani website",
        "keywords": "website, design, development, statement, Red Thread, Andie Hassani",
        "creator": "Red Thread Studio Statement",
    })
    d.saveIncr()
    d.close()
    print("Metadata stamped.")
except Exception as exc:  # PyMuPDF optional
    print("Metadata step skipped:", exc)
