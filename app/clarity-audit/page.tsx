import type { Metadata } from "next";
import { ClarityAudit } from "@/components/clarity-audit";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Business Clarity Audit",
  description:
    "Take Andie Hassani's private three-minute business clarity audit across direction, offer, evidence, alignment, focus and momentum.",
  alternates: { canonical: "/clarity-audit" },
};

export default function ClarityAuditPage() {
  return (
    <>
      <PageIntro
        index="05"
        eyebrow="Interactive clarity audit"
        title={<>Six questions. One useful <i>next move.</i></>}
        description="A private diagnostic for founders who can feel that something needs attention but have not yet named the real lever."
        aside="No sign-up / no stored answers / approximately 3 minutes"
      />
      <ClarityAudit />
      <section className="audit-context">
        <p className="section-index">WHAT THIS MEASURES / 01</p>
        <div><strong>Direction</strong><span>Can you name the problem and audience?</span></div>
        <div><strong>Offer</strong><span>Can the right client recognise the value?</span></div>
        <div><strong>Evidence</strong><span>Are real signals shaping the plan?</span></div>
        <div><strong>Alignment</strong><span>Does the business fit your definition of success?</span></div>
        <div><strong>Focus</strong><span>Does the calendar protect what matters?</span></div>
        <div><strong>Momentum</strong><span>Is the next useful move visible?</span></div>
      </section>
    </>
  );
}
