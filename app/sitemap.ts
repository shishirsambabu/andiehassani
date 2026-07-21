import type { MetadataRoute } from "next";
import { insights } from "@/lib/insights";
import { SITE_URL } from "@/lib/site";
import { coachingPaths } from "@/lib/coaching-paths";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/start-here",
    "/about",
    "/coaching",
    "/approach",
    "/results",
    "/tools",
    "/tools/focus-planner",
    "/insights",
    "/clarity-audit",
    "/contact",
    "/privacy",
    "/accessibility",
  ];
  const staticPages = routes.map((route, index) => ({
    url: SITE_URL + route,
    lastModified: new Date("2026-07-21"),
    changeFrequency: index === 0 ? "weekly" as const : "monthly" as const,
    priority: index === 0 ? 1 : 0.8,
  }));
  const insightPages = insights.map((insight) => ({
    url: SITE_URL + "/insights/" + insight.slug,
    lastModified: new Date(insight.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const coachingPages = coachingPaths.map((path) => ({
    url: `${SITE_URL}/coaching/${path.slug}`,
    lastModified: new Date("2026-07-21"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...staticPages, ...coachingPages, ...insightPages];
}
