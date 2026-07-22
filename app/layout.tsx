import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ExperienceLayer } from "@/components/experience-layer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import "./studio.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Andie Hassani | Business Coach for Women Entrepreneurs",
    template: "%s | Andie Hassani",
  },
  description:
    "Dubai-based ICF and EMCC certified business coaching for women entrepreneurs and aspiring founders. Find clarity, alignment and sustainable momentum.",
  keywords: [
    "business coach Dubai",
    "business coach for women entrepreneurs",
    "founder coaching",
    "entrepreneur strategy coach",
    "ICF business coach",
    "EMCC coach Dubai",
  ],
  authors: [{ name: "Andie Hassani", url: SITE_URL }],
  creator: "Andie Hassani",
  category: "Business coaching",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    title: "Andie Hassani | Business Coaching",
    description: "Build a business that feels as good as it grows.",
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Andie Hassani Business Coaching",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Find the red thread — Andie Hassani Business Coaching" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andie Hassani | Business Coaching",
    description: "Clarity. Alignment. Momentum.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c51727",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": SITE_URL + "/#andie",
      name: "Andie Hassani",
      url: SITE_URL,
      image: SITE_URL + "/andie-hassani.jpg",
      jobTitle: "Business Coach",
      knowsLanguage: ["English", "French", "Italian", "Farsi"],
      sameAs: ["https://www.linkedin.com/in/andiehassani/"],
      worksFor: { "@id": SITE_URL + "/#business" },
    },
    {
      "@type": "Organization",
      "@id": SITE_URL + "/#business",
      name: "Andie Hassani Business Coaching",
      url: SITE_URL,
      logo: SITE_URL + "/favicon.png",
      image: SITE_URL + "/andie-hassani.jpg",
      areaServed: "Worldwide",
      founder: { "@id": SITE_URL + "/#andie" },
      description:
        "Business coaching for women entrepreneurs and aspiring founders, combining strategy, alignment and focused action.",
    },
    {
      "@type": "WebSite",
      "@id": SITE_URL + "/#website",
      url: SITE_URL,
      name: "Andie Hassani Business Coaching",
      publisher: { "@id": SITE_URL + "/#business" },
      inLanguage: "en-GB",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <ExperienceLayer />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
