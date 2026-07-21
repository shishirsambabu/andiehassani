import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Accessibility", description: "Accessibility approach for the Andie Hassani website.", alternates: { canonical: "/accessibility" } };

export default function AccessibilityPage() {
  return <article className="legal-page"><p className="eyebrow">Access for more people</p><h1>Designed to move without getting in the way.</h1><p className="legal-lead">The site is being built to support keyboard navigation, clear focus states, semantic headings, readable contrast and reduced-motion preferences.</p><h2>Motion</h2><p>Animated reveals, scrolling lines and orbiting details stop or simplify when your device requests reduced motion. Essential content does not depend on animation or hover.</p><h2>Interaction</h2><p>Buttons and links have text labels, interactive tools provide live status where useful, and menus can be closed with the keyboard. The core site remains readable if JavaScript is unavailable.</p><h2>Feedback</h2><p>Accessibility is an ongoing practice. If something prevents you from using the site, please share the page, device and issue through the contact pathway.</p><Link className="action-link" href="/contact">Share accessibility feedback <span>↗</span></Link></article>;
}
