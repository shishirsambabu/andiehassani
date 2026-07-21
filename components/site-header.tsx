import Link from "next/link";
import { CommandCenter } from "@/components/command-center";
import { DISCOVERY_URL, primaryNav } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Andie Hassani home">
        <span className="brand-monogram">ah</span>
        <span>
          <strong>ANDIE HASSANI</strong>
          <small>BUSINESS COACHING</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {primaryNav.slice(1, 4).map((item) => (
          <Link href={item.href} key={item.href}>
            <small>{item.index}</small>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="header-tools">
        <CommandCenter />
        <Link className="header-action" href="/start-here">Start here <span aria-hidden="true">↗</span></Link>
      </div>

      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu <span aria-hidden="true">+</span></summary>
        <nav aria-label="Mobile navigation">
          {primaryNav.map((item) => (
            <Link href={item.href} key={item.href}>
              <small>{item.index}</small>{item.label}
            </Link>
          ))}
          <Link href="/tools">Decision tools</Link>
          <Link href="/clarity-audit">Clarity audit</Link>
          <Link href="/contact">Start a conversation</Link>
          <a href={DISCOVERY_URL} target="_blank" rel="noreferrer">Book a discovery call</a>
        </nav>
      </details>
    </header>
  );
}
