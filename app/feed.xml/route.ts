import { insights } from "@/lib/insights";
import { SITE_URL } from "@/lib/site";

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '\"': "&quot;" })[character] ?? character);
}

export function GET() {
  const items = insights.map((item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${SITE_URL}/insights/${item.slug}</link>
      <guid>${SITE_URL}/insights/${item.slug}</guid>
      <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(item.excerpt)}</description>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>Andie Hassani Field Notes</title>
  <link>${SITE_URL}/insights</link>
  <description>Practical field notes on clarity, strategy and sustainable momentum.</description>
  <language>en-gb</language>${items}
</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
