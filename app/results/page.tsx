import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { EvidenceDeck } from "@/components/evidence-deck";

export const metadata: Metadata = {
  title: "Client Results and Coaching Stories",
  description: "Explore documented coaching shifts: clearer positioning, recentered focus, stronger communication and more useful business decisions.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return (
    <>
      <PageIntro
        index="04"
        eyebrow="The evidence desk"
        title={<>Not polished promises. <i>Documented shifts.</i></>}
        description="The most useful coaching result is not dependence on a coach. It is seeing more clearly, deciding more cleanly and moving with greater self-trust."
        aside="Publicly documented client perspectives"
        tone="dark"
      />
      <EvidenceDeck />
      <section className="proof-philosophy" data-reveal>
        <span>NO INVENTED METRICS</span><div><p className="eyebrow">A different standard of proof</p><h2>Specific enough to trust. Human enough to recognise.</h2><p>This evidence focuses on the decision, perspective or pattern that changed. Commercial outcomes matter, but the site will not manufacture revenue claims, ratings or aggregate numbers that have not been documented.</p><Link className="action-link" href="/contact">Bring your own question <span>↗</span></Link></div>
      </section>
    </>
  );
}
