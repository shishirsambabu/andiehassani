import Link from "next/link";
import { DISCOVERY_URL, LINKEDIN_URL, primaryNav, utilityNav } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-pitch">
        <p className="kicker kicker-on-dark">The red thread ends in a decision</p>
        <h2>Find what is true.<br /><i>Move from there.</i></h2>
        <div className="footer-actions">
          <a className="button button-light" href={DISCOVERY_URL} target="_blank" rel="noreferrer">
            Book a discovery call <span aria-hidden="true">↗</span>
          </a>
          <Link className="text-link text-link-light" href="/contact">Prepare for the conversation</Link>
        </div>
      </div>
      <div className="footer-lower">
        <Link className="brand brand-inverse" href="/">
          <span className="brand-monogram">ah</span>
          <span><strong>ANDIE HASSANI</strong><small>BUSINESS COACHING</small></span>
        </Link>
        <nav aria-label="Footer navigation">
          {primaryNav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          {utilityNav.slice(0, 2).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          <Link href="/contact">Contact</Link>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
        <p>Dubai based. Working worldwide.<br />English / French / Italian / Farsi</p>
      </div>
      <div className="footer-legal">
        <span>© {new Date().getFullYear()} Andie Hassani</span>
        <Link href="/privacy">Privacy</Link>
        <Link href="/accessibility">Accessibility</Link>
        <Link href="/llms.txt">AI-readable profile</Link>
      </div>
    </footer>
  );
}
