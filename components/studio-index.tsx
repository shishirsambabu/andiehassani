"use client";

import { useEffect, useState } from "react";

const stops = [
  { id: "orientation", label: "Orient" },
  { id: "manifesto", label: "The thesis" },
  { id: "decision-desk", label: "Decision desk" },
  { id: "diagnosis", label: "Diagnose" },
  { id: "method", label: "Method" },
  { id: "evidence", label: "Evidence" },
  { id: "field-notes", label: "Field notes" },
];

export function StudioIndex() {
  const [active, setActive] = useState(stops[0].id);

  useEffect(() => {
    const targets = stops.map((stop) => document.getElementById(stop.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55%", threshold: [0.05, 0.25, 0.5] },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="studio-index" aria-label="Home page sections">
      <span className="studio-index-line" aria-hidden="true"><i /></span>
      {stops.map((stop, index) => (
        <a href={`#${stop.id}`} className={active === stop.id ? "is-active" : ""} key={stop.id} aria-current={active === stop.id ? "location" : undefined}>
          <span>{String(index + 1).padStart(2, "0")}</span><strong>{stop.label}</strong>
        </a>
      ))}
    </nav>
  );
}
