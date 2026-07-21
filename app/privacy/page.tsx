import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy", description: "How this website handles information and third-party links.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <article className="legal-page"><p className="eyebrow">Website information</p><h1>Privacy, in plain language.</h1><p className="legal-lead">The interactive tools on this website are designed to minimise data collection. The clarity audit runs in your browser. The focus planner stores its map only on your device. The consultation brief is not transmitted by this website.</p><h2>External services</h2><p>Booking and LinkedIn links open third-party services. Their own privacy policies apply once you leave this website.</p><h2>Analytics and future forms</h2><p>This pitch build does not submit personal information to an Andie Hassani database. Before any analytics, newsletter or application form is connected, this notice should be updated with the provider, purpose, retention period and contact details.</p><h2>Your choices</h2><p>You can clear the focus planner from inside the tool or remove this site’s local browser data. You can also use the website without using any interactive tool.</p><Link className="action-link" href="/contact">Ask a privacy question <span>↗</span></Link></article>;
}
