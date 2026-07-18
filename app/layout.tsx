import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = protocol + "://" + host;

  return {
    title: "Andie Hassani | Business Coach for Women Entrepreneurs",
    description: "Dubai-based ICF and EMCC certified business coaching for women entrepreneurs and aspiring founders. Find clarity, alignment and sustainable momentum.",
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
    openGraph: {
      title: "Andie Hassani | Business Coaching",
      description: "Build a business that feels as good as it grows.",
      type: "website",
      url: origin,
      images: [{ url: origin + "/og.png", width: 1200, height: 630, alt: "Andie Hassani Business Coaching" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Andie Hassani | Business Coaching",
      description: "Clarity. Alignment. Momentum.",
      images: [origin + "/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
