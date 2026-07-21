import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsight, insights } from "@/lib/insights";
import { SITE_URL } from "@/lib/site";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.excerpt,
    alternates: { canonical: "/insights/" + insight.slug },
    openGraph: {
      title: insight.title,
      description: insight.excerpt,
      type: "article",
      publishedTime: insight.publishedAt,
      authors: ["Andie Hassani"],
      url: SITE_URL + "/insights/" + insight.slug,
    },
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const related = insights.filter((item) => item.slug !== insight.slug).slice(0, 2);
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${SITE_URL}/insights/${insight.slug}#article`,
        headline: insight.title,
        description: insight.excerpt,
        datePublished: insight.publishedAt,
        dateModified: insight.publishedAt,
        author: { "@id": SITE_URL + "/#andie" },
        publisher: { "@id": SITE_URL + "/#business" },
        mainEntityOfPage: SITE_URL + "/insights/" + insight.slug,
        isPartOf: { "@id": SITE_URL + "/#website" },
        image: SITE_URL + "/opengraph-image",
        inLanguage: "en-GB",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Field notes", item: SITE_URL + "/insights" },
          { "@type": "ListItem", position: 3, name: insight.title, item: SITE_URL + "/insights/" + insight.slug },
        ],
      },
    ],
  };

  return (
    <>
      <article className="article-page">
        <header className="article-header">
          <Link className="article-back" href="/insights">← All field notes</Link>
          <div className="article-number">{insight.number}</div>
          <p className="kicker">{insight.category} / {insight.readingTime}</p>
          <h1>{insight.title}</h1>
          <p className="article-deck">{insight.excerpt}</p>
          <div className="article-byline"><span>BY ANDIE HASSANI</span><time dateTime={insight.publishedAt}>{insight.publishedAt}</time></div>
        </header>

        <div className="article-layout">
          <aside>
            <small>THE USEFUL IDEA</small>
            <p>{insight.takeaway}</p>
          </aside>
          <div className="article-body">
            {insight.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.pullQuote ? <blockquote><p>{section.pullQuote}</p></blockquote> : null}
              </section>
            ))}
          </div>
        </div>
      </article>

      <section className="related-notes">
        <p className="section-index">CONTINUE READING / 02</p>
        {related.map((item) => (
          <Link href={"/insights/" + item.slug} key={item.slug}>
            <span>{item.number}</span><small>{item.category}</small><strong>{item.title}</strong><b>↗</b>
          </Link>
        ))}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </>
  );
}
