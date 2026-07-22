import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Pathfinder } from "@/components/pathfinder";
import { StudioIndex } from "@/components/studio-index";
import { ThreadField } from "@/components/thread-field";
import { ThreadGate } from "@/components/thread-gate";
import { DecisionInstrument } from "@/components/decision-instrument";
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

      <ThreadGate index="01" from="Noise" to="Signal" />

      <ScrollManifesto />

      <DecisionInstrument quote={featuredProof.quote} client={featuredProof.name} role={featuredProof.role} />

      <ThreadGate index="02" from="Signal" to="Decision" reverse tone="blush" />

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

      <ThreadGate index="03" from="Decision" to="Movement" tone="ink" />

      <section className="proof-window" id="evidence" data-reveal data-scrub data-atmosphere="ink" data-thread-label="Evidence">
        <div className="proof-window-index"><span>01</span><small>CLIENT DOSSIER</small></div>
        <div className="proof-window-quote"><blockquote>“Andie helped me dive much deeper and uncover insights I had completely missed.”</blockquote><p>{featuredProof.name}<br /><small>{featuredProof.role}</small></p></div>
        <div className="proof-window-shift"><small>THE SHIFT</small><strong>{featuredProof.shift}</strong><Link href="/results">Read documented results <span>↗</span></Link></div>
      </section>

      <section className="field-notes-home" id="field-notes" data-reveal data-scrub data-atmosphere="paper" data-thread-label="Field notes">
        <div className="field-notes-heading"><p className="eyebrow">Field notes</p><h2>Ideas for the part where the next version is <em>not fully visible yet.</em></h2><Link className="quiet-link" href="/insights">View all field notes</Link></div>
        <div className="field-note-cards">
          {insights.slice(0, 3).map((insight) => (
            <Link href={`/insights/${insight.slug}`} key={insight.slug}>
              <span>{insight.number}</span><small>{insight.category} · {insight.readingTime}</small><strong>{insight.title}</strong><p>{insight.excerpt}</p><b>↗</b>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
