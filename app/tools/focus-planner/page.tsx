import type { Metadata } from "next";
import { FocusPlanner } from "@/components/focus-planner";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Map Match Move Focus Planner",
  description: "Use Andie Hassani's Map Match Move framework to organise revenue, operations and growth work around your energy and priorities.",
  alternates: { canonical: "/tools/focus-planner" },
};

export default function FocusPlannerPage() {
  return (
    <>
      <PageIntro
        index="02"
        eyebrow="Interactive framework"
        title={<>Map the work. Match the energy. <i>Move what matters.</i></>}
        description="A practical focus planner for founders doing too much at the same level of urgency. Build a clearer sequence in a few honest minutes."
        aside="Saved locally / copy when ready"
        tone="dark"
      />
      <FocusPlanner />
      <section className="framework-explainer" data-reveal>
        <article><span>MAP</span><h2>Make the invisible workload visible.</h2><p>Revenue, operations and growth are all necessary. Seeing the balance stops one kind of work quietly consuming the others.</p></article>
        <article><span>MATCH</span><h2>Stop treating every hour as equal.</h2><p>Strategy and creation need a different quality of attention from email, administration and routine follow-through.</p></article>
        <article><span>MOVE</span><h2>Turn priority into protected time.</h2><p>A priority that never enters the calendar is still only an intention. Give the most meaningful outcome a place to happen.</p></article>
      </section>
    </>
  );
}
