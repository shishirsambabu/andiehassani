import type { Metadata } from "next";
import { InsightExplorer } from "@/components/insight-explorer";
import { PageIntro } from "@/components/page-intro";
import { insights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights for Founders",
  description:
    "Field notes from Andie Hassani on business clarity, founder mindset, strategic focus and sustainable momentum.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageIntro
        index="04"
        eyebrow="Field notes"
        title={<>For the part where things are changing, <i>but not finished.</i></>}
        description="Short, practical perspectives on the decisions, patterns and in-between seasons that shape a business."
        aside="Clarity / mindset / momentum / strategy"
      />
      <InsightExplorer items={insights} />
    </>
  );
}
