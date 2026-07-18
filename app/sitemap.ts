import type { MetadataRoute } from "next";
import { insights } from "@/lib/insights";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/coaching", "/approach", "/insights", "/clarity-audit", "/contact"];
  const staticPages = routes.map((route, index) => ({
    url: SITE_URL + route,
    lastModified: new Date("2026-07-18"),
    changeFrequency: index === 0 ? "weekly" as const : "monthly" as const,
    priority: index === 0 ? 1 : 0.8,
  }));
  const insightPages = insights.map((insight) => ({
    url: SITE_URL + "/insights/" + insight.slug,
    lastModified: new Date(insight.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticPages, ...insightPages];
}
