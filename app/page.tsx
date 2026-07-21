import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Pathfinder } from "@/components/pathfinder";
import { StudioIndex } from "@/components/studio-index";
import { ThreadField } from "@/components/thread-field";
import { ScrollManifesto } from "@/components/scroll-manifesto";
import { insights } from "@/lib/insights";
import { proofStories } from "@/lib/proof";
import { DISCOVERY_URL, serviceLines } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Andie Hassani | Business Coach for Women Entrepreneurs" },
  description: "Business coaching for women entrepreneurs and aspiring founders who need clearer direction, stronger decisions and sustainable momentum.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const featuredProof = proofStories[0];

  return (
    <>
      <StudioIndex />
      <section className="studio-hero" id="orientation" data-scrub data-atmosphere="paper" data-thread-label="Orientation">
        <div className="studio-hero-copy">
          <ThreadField />
          <div className="hero-coordinate"><span>AH / DECISION STUDIO</span><span>DUBAI · WORLDWIDE</span></div>
          <p className="eyebrow">Business coaching for women building on their own terms</p>
          <h1><span>Find the</span><strong>red thread.</strong><em>Build from what is true.</em></h1>
          <p className="hero-intro">You do not need another formula. You need a clearer read of the business, the person building it and the next move that connects them.</p>
          <div className="hero-actions-v2">
            <Link className="action-button action-button-red" href="/start-here">Find your starting point <span>↗</span></Link>
            <a className="quiet-link" href={DISCOVERY_URL} target="_blank" rel="noreferrer">Book a discovery call</a>
          </div>
          <blockquote className="hero-thesis"><span>ANDIE’S FIELD NOTE / 01</span><p>“Simple does not mean easy.<br />Simple means clear.”</p></blockquote>
        </div>

        <div className="studio-portrait" data-spotlight>
          <div className="portrait-thread" aria-hidden="true"><span /><i /></div>
          <div className="studio-portrait-frame">
            <Image src="/andie-hassani.jpg" alt="Andie Hassani, business coach" fill priority sizes="(max-width: 900px) 100vw, 44vw" />
          </div>
          <div className="portrait-note"><small>THE WORK</small><strong>Alignment<br />Strategy<br />Action</strong></div>
          <div className="portrait-stamp"><span>20+</span><small>YEARS ACROSS<br />3 REGIONS</small></div>
          <p>ICF / EMCC · EN / FR / IT / FA</p>
        </div>
      </section>

      <div className="signal-marquee" aria-label="Andie's coaching principles">
        <div><span>ALIGNMENT BEFORE ACCELERATION</span><i>✳</i><span>EVIDENCE BEFORE CERTAINTY</span><i>✳</i><span>MOVEMENT WITHOUT SELF-ABANDONMENT</span><i>✳</i><span>ALIGNMENT BEFORE ACCELERATION</span></div>
      </div>

      <ScrollManifesto />

      <section className="decision-desk" id="decision-desk" data-reveal data-scrub data-atmosphere="paper" data-thread-label="The decision desk">
        <div className="decision-desk-heading">
          <p className="eyebrow">The decision desk</p>
          <h2>A business is a system of <em>connected choices.</em></h2>
          <p>Andie works where inner alignment, commercial evidence and focused execution meet.</p>
        </div>
        <div className="decision-bento">
          <article className="bento-card bento-method" data-spotlight data-tilt>
            <span className="bento-index">01 / METHOD</span>
            <div className="method-orbit" aria-hidden="true"><i>ALIGN</i><i>STRATEGISE</i><i>ACT</i><b /></div>
            <h3>The Red Thread</h3><p>One connected method for the person, the business and the next decision.</p>
            <Link href="/approach">See the method <span>↗</span></Link>
          </article>
          <article className="bento-card bento-proof" data-spotlight data-tilt>
            <span className="bento-index">02 / EVIDENCE</span>
            <strong>“{featuredProof.quote}”</strong><p>{featuredProof.name}<br /><small>{featuredProof.role}</small></p>
            <Link href="/results">Open the evidence desk <span>↗</span></Link>
          </article>
          <article className="bento-card bento-experience" data-spotlight data-tilt>
            <span className="bento-index">03 / PERSPECTIVE</span><strong>20+</strong><p>years across Europe, the Middle East and the UK</p><small>FAMILY BUSINESSES · LARGE ORGANISATIONS · ENTREPRENEURSHIP</small>
          </article>
          <article className="bento-card bento-tool" data-spotlight data-tilt>
            <span className="bento-index">04 / WORKING TOOL</span><h3>Map.<br />Match.<br /><em>Move.</em></h3><p>Turn an overloaded list into a protected sequence.</p><Link href="/tools/focus-planner">Open the planner <span>↗</span></Link>
          </article>
          <article className="bento-card bento-languages" data-spotlight data-tilt>
            <span className="bento-index">05 / LANGUAGES</span><strong>04</strong><p>English · French<br />Italian · Farsi</p>
          </article>
        </div>
      </section>

      <div id="diagnosis" data-atmosphere="blush" data-thread-label="Pathfinder"><Pathfinder /></div>

      <section className="method-stage" id="method" data-reveal data-scrub data-atmosphere="paper" data-thread-label="The method">
        <header><p className="eyebrow">The Red Thread / 03</p><h2>Clarity is not a mood.<br /><em>It is a decision system.</em></h2></header>
        <div className="method-stage-list">
          {serviceLines.map((service) => (
            <article key={service.number} data-spotlight data-tilt>
              <span>{service.number}</span><small>{service.label}</small><h3>{service.title}</h3><p>{service.description}</p><strong>{service.result}</strong>
            </article>
          ))}
        </div>
        <Link className="action-link" href="/approach">Explore the complete method <span>↗</span></Link>
      </section>

      <section className="proof-window" id="evidence" data-reveal data-scrub data-atmosphere="ink" data-thread-label="Evidence">
        <div className="proof-window-index"><span>01</span><small>CLIENT DOSSIER</small></div>
        <div className="proof-window-quote"><blockquote>“Andie helped me dive much deeper and uncover insights I had completely missed.”</blockquote><p>{featuredProof.name}<br /><small>{featuredProof.role}</small></p></div>
        <div className="proof-window-shift"><small>THE SHIFT</small><strong>{featuredProof.shift}</strong><Link href="/results">Read documented results <span>↗</span></Link></div>
      </section>

      <section className="field-notes-home" id="field-notes" data-reveal data-scrub data-atmosphere="paper" data-thread-label="Field notes">
        <div className="field-notes-heading"><p className="eyebrow">Field notes</p><h2>Ideas for the part where the next version is <em>not fully visible yet.</em></h2><Link className="quiet-link" href="/insights">View all field notes</Link></div>
        <div className="field-note-cards">
          {insights.slice(0, 3).map((insight) => (
            <Link href={`/insights/${insight.slug}`} key={insight.slug} data-spotlight data-tilt>
              <span>{insight.number}</span><small>{insight.category} · {insight.readingTime}</small><strong>{insight.title}</strong><p>{insight.excerpt}</p><b>↗</b>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
