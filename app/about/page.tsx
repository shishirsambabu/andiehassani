import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { DISCOVERY_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Andie Hassani, a Dubai-based ICF and EMCC certified business coach with more than 20 years of cross-market business experience.",
  alternates: { canonical: "/about" },
};

const chapters = [
  {
    year: "20+",
    title: "Inside the business",
    text: "Across Europe, the Middle East and the UK, Andie worked in family-run companies and large organisations. Different contexts revealed the same friction: unclear direction, difficult communication and capable people disconnected from the work.",
  },
  {
    year: "01",
    title: "The question that changed things",
    text: "The desire to build her own vision kept returning. Personal development, business strategy, mindset, NLP and coaching became more than subjects of study; they became a way to understand how real change happens.",
  },
  {
    year: "NOW",
    title: "Strategy made human",
    text: "Andie's practice connects commercial clarity with transformational coaching. The aim is not to hand founders a borrowed formula, but to help them build a business that reflects who they are and can still perform in the real world.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        index="01"
        eyebrow="The story"
        title={<>Experience shaped the strategy. <i>Purpose changed the work.</i></>}
        description="Andie Hassani brings more than two decades of cross-market business experience to coaching women entrepreneurs and aspiring founders."
        aside="Dubai based / working worldwide"
      />

      <section className="about-feature">
        <div className="about-feature-image">
          <img src="/andie-hassani.jpg" alt="Andie Hassani" />
          <span>AH / BUSINESS COACHING</span>
        </div>
        <div>
          <p className="kicker">Why this work</p>
          <h2>“I wanted the freedom to build something that truly mattered.”</h2>
          <p className="lead">
            For years, Andie found herself building other people’s visions while the
            desire to create her own kept getting louder.
          </p>
          <p>
            That tension became a teacher. It revealed that success is not only about
            doing more or knowing more. It also depends on inner alignment, a clear
            direction and the right environment for honest growth.
          </p>
        </div>
      </section>

      <section className="story-chapters">
        <p className="section-index">THREE CHAPTERS / ONE RED THREAD</p>
        {chapters.map((chapter, index) => (
          <article key={chapter.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{chapter.year}</strong>
            <div><h2>{chapter.title}</h2><p>{chapter.text}</p></div>
          </article>
        ))}
      </section>

      <section className="principles-section">
        <div className="section-opening section-opening-light">
          <p className="kicker kicker-on-dark">What guides the work</p>
          <h2>Practical enough to use. <i>Personal enough to last.</i></h2>
        </div>
        <div className="principle-list">
          <div><span>01</span><h3>Alignment is not the end point.</h3><p>It is the quality of connection between what matters and what you do next.</p></div>
          <div><span>02</span><h3>Outside perspective should build self-trust.</h3><p>Good coaching does not make you dependent on the coach. It sharpens your own judgement.</p></div>
          <div><span>03</span><h3>Strategy should survive real life.</h3><p>A plan is only useful when it respects capacity, energy, uncertainty and the people involved.</p></div>
        </div>
      </section>

      <section className="credentials-ledger">
        <div><small>EXPERIENCE</small><strong>20+ years</strong><span>Family businesses and large organisations</span></div>
        <div><small>CREDENTIALS</small><strong>ICF / EMCC</strong><span>Certified business coaching practice</span></div>
        <div><small>LANGUAGES</small><strong>04</strong><span>English, French, Italian and Farsi</span></div>
        <div><small>PERSPECTIVE</small><strong>03 regions</strong><span>Europe, Middle East and United Kingdom</span></div>
      </section>

      <section className="inline-cta">
        <p className="kicker">The work begins with a conversation</p>
        <h2>Bring the question you have not been able to resolve alone.</h2>
        <div>
          <a className="button button-red" href={DISCOVERY_URL} target="_blank" rel="noreferrer">Book a discovery call <span aria-hidden="true">NE</span></a>
          <Link className="text-link" href="/coaching">See how coaching works</Link>
        </div>
      </section>
    </>
  );
}
