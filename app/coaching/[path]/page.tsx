import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { coachingPaths, getCoachingPath } from "@/lib/coaching-paths";
import { DISCOVERY_URL, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return coachingPaths.map((path) => ({ path: path.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ path: string }> }): Promise<Metadata> {
  const item = getCoachingPath((await params).path);
  if (!item) return {};
  return { title: `${item.title} Business Coaching`, description: item.description, alternates: { canonical: `/coaching/${item.slug}` } };
}

export default async function CoachingPathPage({ params }: { params: Promise<{ path: string }> }) {
  const item = getCoachingPath((await params).path);
  if (!item) notFound();
  const words = item.headline.split(" ");
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/coaching/${item.slug}#service`,
    name: `${item.title} business coaching`,
    description: item.description,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: "Worldwide",
    url: `${SITE_URL}/coaching/${item.slug}`,
  };

  return (
    <>
      <PageIntro index={item.index} eyebrow={`${item.stage} pathway`} title={<>{words.slice(0, -1).join(" ")} <i>{words.at(-1)}</i></>} description={item.description} aside="Private business coaching / shaped through discovery" tone={item.index === "02" ? "red" : "dark"} />
      <section className="pathway-diagnosis" data-reveal><p className="eyebrow">The real tension</p><blockquote>{item.tension}</blockquote><div><small>THE AIM</small><h2>Not a borrowed playbook. A stronger decision system for this stage of the business.</h2></div></section>
      <section className="pathway-process" data-reveal><header><p className="eyebrow">How the work moves</p><h2>Orient. Diagnose. <em>Move.</em></h2></header><div>{item.process.map((step, index) => <article data-spotlight key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></section>
      <section className="pathway-outcomes" data-reveal><div><p className="eyebrow">A useful outcome</p><h2>What should be clearer when the work has done its job?</h2></div><ol>{item.outcomes.map((outcome, index) => <li key={outcome}><span>{String(index + 1).padStart(2, "0")}</span><strong>{outcome}</strong></li>)}</ol></section>
      <section className="inline-cta inline-cta-red"><p className="kicker kicker-on-dark">Start with a considered conversation</p><h2>Bring the question you keep circling.</h2><div><a className="button button-light" href={DISCOVERY_URL} target="_blank" rel="noreferrer">Book a discovery call <span>↗</span></a><Link className="text-link text-link-light" href="/start-here">Revisit the pathway finder</Link></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
