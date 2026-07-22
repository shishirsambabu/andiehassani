# Studio Statement — Andie Hassani website

A design-and-development fee statement for the Andie Hassani coaching website,
presented in the site's own "Red Thread" brand language (warm paper, signal red,
Oswald display, Fraunces serif).

**Deliverable:** [`Andie-Hassani_Website-Studio-Statement.pdf`](./Andie-Hassani_Website-Studio-Statement.pdf) — 5 pages, A4.

## What it covers

1. **Cover** — a plain statement of intent, not a cold quote.
2. **A note before the numbers** — how this began: a LinkedIn post → the profile →
   her existing website → a reimagining built first, then the invoice.
3. **What the fee is for** — the real scope (25 routes, ~9.7k lines of code, 5 custom
   motion systems, SEO / AI-search infrastructure).
4. **Why it costs what it costs** — an itemised breakdown of studio value.
5. **Terms** — three interest-free instalments, inclusions, and a note on the discount.

## The numbers

| | |
|---|---|
| Total studio value | **$17,700** |
| Founding-client goodwill reduction | **−$14,100** (≈ 80%) |
| **Amount due** | **$3,600** (≈ AED 13,220) |
| Instalments | 3 × $1,200 (on acceptance, day 30, day 60) |
| Pay-in-full | $3,400 |

The studio-value figures reflect what comparable custom work is commissioned for;
the reduced figure reflects that the site was built unprompted, as a gesture.

## Rebuilding the PDF

```bash
cd proposal/src
pip install pymupdf     # optional, for metadata
python3 build.py        # renders ../Andie-Hassani_Website-Studio-Statement.pdf
```

The six fonts in `src/fonts/` are open-source (Oswald, Fraunces, Space Mono,
Archivo — SIL Open Font License) and are embedded into the PDF at build time.
