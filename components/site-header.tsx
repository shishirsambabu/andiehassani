import Link from "next/link";
import { DISCOVERY_URL, primaryNav } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Andie Hassani home">
        <span className="brand-monogram">AH</span>
        <span>
          <strong>ANDIE HASSANI</strong>
          <small>BUSINESS COACHING</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {primaryNav.map((item) => (
          <Link href={item.href} key={item.href}>
            <small>{item.index}</small>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <Link className="header-action" href="/clarity-audit">
        Take the clarity audit <span aria-hidden="true">+</span>
      </Link>

      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu <span aria-hidden="true">+</span></summary>
        <nav aria-label="Mobile navigation">
          {primaryNav.map((item) => (
            <Link href={item.href} key={item.href}>
              <small>{item.index}</small>{item.label}
            </Link>
          ))}
          <Link href="/clarity-audit">Clarity audit</Link>
          <Link href="/contact">Start a conversation</Link>
          <a href={DISCOVERY_URL} target="_blank" rel="noreferrer">Book a discovery call</a>
        </nav>
      </details>
    </header>
  );
}
