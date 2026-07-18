import type { Metadata } from "next";
import { ConsultationBrief } from "@/components/consultation-brief";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Start a Conversation",
  description:
    "Prepare for a discovery conversation with Andie Hassani. Clarify your business stage, priority and current constraint before you connect.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        index="06"
        eyebrow="Start a conversation"
        title={<>Bring the question that keeps <i>following you.</i></>}
        description="Use the consultation brief to organise what is happening now, then copy it into your discovery call notes or LinkedIn message."
        aside="Private local tool / nothing is stored or submitted"
        tone="red"
      />
      <ConsultationBrief />
    </>
  );
}
