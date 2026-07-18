import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { DISCOVERY_URL, faqs, serviceLines } from "@/lib/site";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Business Coaching",
  description:
    "Business coaching for women entrepreneurs, aspiring founders and business owners navigating growth, uncertainty or a strategic reset.",
  alternates: { canonical: "/coaching" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
  url: SITE_URL + "/coaching",
};

export default function CoachingPage() {
  return (
    <>
      <PageIntro
        index="02"
        eyebrow="The coaching"
        title={<>Build the whole business. <i>Not just the plan.</i></>}
        description="The strategy and the person building it are inseparable. Coaching works on both, so the business becomes clearer, stronger and more sustainable."
        aside="Individual business coaching / remote and Dubai"
        tone="red"
      />

      <section className="coaching-for">
        <p className="section-index">WHO THIS IS FOR / 01</p>
        <div className="coaching-audiences">
          <article><span>IDEA</span><h2>You know you want to build something, but the shape is still unclear.</h2><p>Move from scattered possibility to a focused problem, audience and first offer.</p></article>
          <article><span>RESET</span><h2>The business exists, but the direction no longer feels clean.</h2><p>Step out of reaction, review what the evidence is saying and choose what deserves to continue.</p></article>
          <article><span>GROWTH</span><h2>Opportunity is increasing faster than clarity or capacity.</h2><p>Build the decision rhythm, priorities and boundaries that let growth remain sustainable.</p></article>
        </div>
      </section>

      <section className="coaching-lines">
        <div className="section-opening">
          <p className="kicker">The three lines of work</p>
          <h2>The issue may enter through one door. <i>We look at the whole room.</i></h2>
        </div>
        <div>
          {serviceLines.map((service) => (
            <article key={service.number}>
              <span>{service.number}</span>
              <div><small>{service.label}</small><h2>{service.title}</h2></div>
              <div><p>{service.description}</p><strong>{service.result}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section className="ways-to-work">
        <div>
          <p className="kicker kicker-on-dark">Ways to work together</p>
          <h2>The format follows <i>the question.</i></h2>
          <p>Rather than forcing every founder into one programme, the right shape is defined through the discovery conversation.</p>
        </div>
        <div className="work-format-list">
          <details open>
            <summary><span>01</span><strong>Focused strategic conversation</strong><b>+</b></summary>
            <p>For a specific decision, offer question, communication challenge or point of stuckness that needs clean outside perspective.</p>
          </details>
          <details>
            <summary><span>02</span><strong>Business alignment journey</strong><b>+</b></summary>
            <p>For founders shaping, resetting or strengthening a business across strategy, mindset and execution over a connected period of work.</p>
          </details>
          <details>
            <summary><span>03</span><strong>Ongoing founder partnership</strong><b>+</b></summary>
            <p>For business owners who value a regular thinking partner as the company changes, decisions multiply and new levels of leadership emerge.</p>
          </details>
        </div>
      </section>

      <section className="fit-check">
        <div>
          <p className="kicker">A strong fit if...</p>
          <ul>
            <li>You want honest questions, not borrowed formulas.</li>
            <li>You are ready to turn reflection into action.</li>
            <li>You care about commercial results and how the business feels to run.</li>
            <li>You are willing to look at the pattern, not only the symptom.</li>
          </ul>
        </div>
        <div>
          <p className="kicker">Start here</p>
          <h2>Not sure what kind of support you need?</h2>
          <p>The clarity audit identifies the lever that may make the biggest difference right now.</p>
          <Link className="button button-dark" href="/clarity-audit">Take the 3-minute audit <span aria-hidden="true">NE</span></Link>
        </div>
      </section>

      <section className="faq-section">
        <div className="section-opening"><p className="kicker">Questions</p><h2>Before we <i>begin.</i></h2></div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.question}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.question}</strong><b>+</b></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="inline-cta inline-cta-red">
        <p className="kicker kicker-on-dark">Your next move does not need to be dramatic</p>
        <h2>It needs to be true, useful and possible.</h2>
        <a className="button button-light" href={DISCOVERY_URL} target="_blank" rel="noreferrer">Book a discovery call <span aria-hidden="true">NE</span></a>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
