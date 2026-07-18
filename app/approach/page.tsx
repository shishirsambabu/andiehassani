import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Coaching Approach",
  description:
    "Explore Andie Hassani's coaching approach: alignment, practical strategy and focused action, including the Map Match Move framework.",
  alternates: { canonical: "/approach" },
};

const phases = [
  {
    number: "01",
    title: "Align",
    question: "What are you actually building - and why does it matter?",
    copy: "Reconnect to the strengths, values and version of success the business must support. This gives every later decision a cleaner reference point.",
    signal: "Meaning before motion",
  },
  {
    number: "02",
    title: "Strategise",
    question: "What does the evidence say is worth pursuing?",
    copy: "Clarify the problem, audience, offer and commercial path. Good strategy reduces complexity instead of decorating it.",
    signal: "Choice before expansion",
  },
  {
    number: "03",
    title: "Act",
    question: "What is the next useful move you can make now?",
    copy: "Translate direction into protected priorities, visible experiments and a rhythm that can keep moving when the week becomes real.",
    signal: "Momentum without self-abandonment",
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageIntro
        index="03"
        eyebrow="The method"
        title={<>Inner alignment. Commercial clarity. <i>Visible movement.</i></>}
        description="The work moves between the person, the business and the next decision. Each perspective makes the other two more useful."
        aside="No borrowed formulas / no performance theatre"
        tone="dark"
      />

      <section className="method-thread">
        <p className="section-index">THE RED THREAD / 01</p>
        <div className="method-thread-line" aria-hidden="true" />
        {phases.map((phase) => (
          <article key={phase.number}>
            <span>{phase.number}</span>
            <div><small>{phase.signal}</small><h2>{phase.title}</h2></div>
            <div><strong>{phase.question}</strong><p>{phase.copy}</p></div>
          </article>
        ))}
      </section>

      <section className="map-match-move">
        <div className="framework-intro">
          <p className="kicker kicker-on-dark">A framework for founder overwhelm</p>
          <h2>Map.<br />Match.<br /><i>Move.</i></h2>
          <p>Three simple acts that turn an overloaded list into a usable week.</p>
        </div>
        <div className="framework-grid">
          <div><span>MAP</span><h3>Clarify what matters</h3><p>Sort the work into revenue, operations and growth. The imbalance usually becomes visible quickly.</p><small>Question: what deserves attention?</small></div>
          <div><span>MATCH</span><h3>Work with your energy</h3><p>Put strategy, creation and difficult decisions where your attention is naturally strongest.</p><small>Question: when can I do this well?</small></div>
          <div><span>MOVE</span><h3>Protect the outcome</h3><p>Choose one to three weekly outcomes, schedule them and leave enough buffer for the unexpected.</p><small>Question: where will this happen?</small></div>
        </div>
      </section>

      <section className="reboot-system">
        <div className="section-opening">
          <p className="kicker">When you feel stuck</p>
          <h2>The momentum <i>reboot.</i></h2>
          <p>Stuckness is rarely solved by pushing harder at the same level. Change the frame first.</p>
        </div>
        <ol>
          <li><span>01</span><strong>Clarify the core problem</strong><p>Name the issue beneath the symptoms.</p></li>
          <li><span>02</span><strong>Reconnect to the vision</strong><p>Remember what the business is meant to make possible.</p></li>
          <li><span>03</span><strong>Choose a 90-day horizon</strong><p>Make the next chapter small enough to see.</p></li>
          <li><span>04</span><strong>Invite outside perspective</strong><p>Let a different question interrupt the familiar loop.</p></li>
          <li><span>05</span><strong>Audit energy and environment</strong><p>Remove the friction that strategy alone cannot solve.</p></li>
        </ol>
      </section>

      <section className="method-quote">
        <p>"Alignment means little without action. Strategy means little without alignment."</p>
        <span>ANDIE'S COACHING PHILOSOPHY</span>
      </section>

      <section className="inline-cta">
        <p className="kicker">See the method applied to your business</p>
        <h2>Start with six honest answers.</h2>
        <Link className="button button-red" href="/clarity-audit">Take the clarity audit <span aria-hidden="true">NE</span></Link>
      </section>
    </>
  );
}
