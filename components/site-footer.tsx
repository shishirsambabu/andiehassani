import Link from "next/link";
import { DISCOVERY_URL, LINKEDIN_URL, primaryNav } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-pitch">
        <p className="kicker kicker-on-dark">Your ambition. Your rhythm. Your business.</p>
        <h2>Make the next move <i>mean something.</i></h2>
        <div className="footer-actions">
          <a className="button button-light" href={DISCOVERY_URL} target="_blank" rel="noreferrer">
            Book a discovery call <span aria-hidden="true">NE</span>
          </a>
          <Link className="text-link text-link-light" href="/contact">Prepare for the conversation</Link>
        </div>
      </div>
      <div className="footer-lower">
        <Link className="brand brand-inverse" href="/">
          <span className="brand-monogram">AH</span>
          <span><strong>ANDIE HASSANI</strong><small>BUSINESS COACHING</small></span>
        </Link>
        <nav aria-label="Footer navigation">
          {primaryNav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          <Link href="/contact">Contact</Link>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
        <p>Dubai based. Working worldwide.<br />English / French / Italian / Farsi</p>
      </div>
    </footer>
  );
}
