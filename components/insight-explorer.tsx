"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Insight } from "@/lib/insights";

export function InsightExplorer({ items }: { items: Insight[] }) {
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        !normalized ||
        item.title.toLowerCase().includes(normalized) ||
        item.excerpt.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, items, query]);

  return (
    <section className="insight-explorer">
      <div className="insight-controls">
        <label>
          <span>Search the field notes</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try clarity, focus or strategy"
          />
        </label>
        <div className="category-filter" aria-label="Filter by topic">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "is-active" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {String(filtered.length).padStart(2, "0")} FIELD NOTE{filtered.length === 1 ? "" : "S"}
      </p>

      <div className="field-note-list">
        {filtered.map((item) => (
          <Link className="field-note" href={"/insights/" + item.slug} key={item.slug}>
            <span className="field-note-number">{item.number}</span>
            <span className="field-note-meta">{item.category}<br />{item.readingTime}</span>
            <span>
              <strong>{item.title}</strong>
              <small>{item.excerpt}</small>
            </span>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h2>No exact match.</h2>
          <p>Try a broader topic or clear the filters.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Show all field notes</button>
        </div>
      ) : null}
    </section>
  );
}
