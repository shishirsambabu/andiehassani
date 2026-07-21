import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Free Decision Tools for Women Entrepreneurs",
  description: "Practical, private tools from Andie Hassani to diagnose clarity, organise priorities and prepare for a useful coaching conversation.",
  alternates: { canonical: "/tools" },
};

const tools = [
  { index: "01", status: "3 min", title: "Clarity Audit", copy: "See which of six business dimensions is asking for attention, then leave with one useful move.", href: "/clarity-audit", action: "Run the diagnostic" },
  { index: "02", status: "Interactive", title: "Map · Match · Move", copy: "Sort the work, match it to your energy and turn an overloaded list into a protected sequence.", href: "/tools/focus-planner", action: "Build a focused week" },
  { index: "03", status: "Private", title: "Consultation Brief", copy: "Organise your stage, priority and current constraint before a discovery conversation.", href: "/contact", action: "Prepare the brief" },
];

export default function ToolsPage() {
  return (
    <>
      <PageIntro
        index="05"
        eyebrow="Decision tools"
        title={<>Less information. <i>Better questions.</i></>}
        description="Each tool is designed to make the next conversation—whether with yourself, your team or a coach—more precise and useful."
        aside="No account / no performance theatre"
        tone="red"
      />
      <section className="tool-desk" data-reveal>
        {tools.map((tool) => (
          <Link href={tool.href} className="tool-card" data-spotlight data-tilt key={tool.href}>
            <span className="tool-index">{tool.index}</span><small>{tool.status}</small>
            <div><h2>{tool.title}</h2><p>{tool.copy}</p></div>
            <strong>{tool.action}<b>↗</b></strong>
          </Link>
        ))}
      </section>
      <section className="tools-note" data-reveal>
        <p className="eyebrow">A note on privacy</p>
        <h2>Your thinking stays yours.</h2>
        <p>The interactive tools work in your browser. The focus planner saves only on your device; the consultation brief is not submitted unless you choose to share it.</p>
      </section>
    </>
  );
}
