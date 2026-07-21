import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { Pathfinder } from "@/components/pathfinder";

export const metadata: Metadata = {
  title: "Start Here | Find Your Next Business Move",
  description: "Choose the business situation that feels most true and find the most useful next step, tool or coaching pathway with Andie Hassani.",
  alternates: { canonical: "/start-here" },
};

export default function StartHerePage() {
  return (
    <>
      <PageIntro
        index="00"
        eyebrow="Start with what is true"
        title={<>You do not need certainty. <i>You need a clear next move.</i></>}
        description="A useful direction begins with an honest read of where you are now—not a borrowed formula for where you should be."
        aside="Three pathways / one decision at a time"
        tone="dark"
      />
      <Pathfinder />
      <section className="decision-principles" data-reveal>
        <article data-spotlight data-tilt><span>01</span><small>ORIENT</small><h2>Name the real situation.</h2><p>Clarity starts when the symptom and the actual constraint stop being treated as the same thing.</p></article>
        <article data-spotlight data-tilt><span>02</span><small>DIAGNOSE</small><h2>Find the decision underneath.</h2><p>The work turns a wide field of concern into one useful question you can act on.</p></article>
        <article data-spotlight data-tilt><span>03</span><small>MOVE</small><h2>Make evidence, not theatre.</h2><p>A small true move teaches more than a perfect plan that never meets the market.</p></article>
      </section>
      <section className="route-switchboard" data-reveal>
        <div><p className="eyebrow">Prefer to explore directly?</p><h2>Enter through the question you already have.</h2></div>
        <nav aria-label="Direct pathways">
          <Link href="/clarity-audit"><span>01</span><strong>Where is my clarity breaking down?</strong><small>Take the clarity audit</small><b>↗</b></Link>
          <Link href="/tools/focus-planner"><span>02</span><strong>How do I turn an overloaded week into movement?</strong><small>Use Map · Match · Move</small><b>↗</b></Link>
          <Link href="/coaching"><span>03</span><strong>What would outside perspective change?</strong><small>Explore business coaching</small><b>↗</b></Link>
        </nav>
      </section>
    </>
  );
}
