import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "@/lib/insights";
import { DISCOVERY_URL, serviceLines } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Andie Hassani | Business Coach for Women Entrepreneurs" },
  description:
    "Business coaching for women entrepreneurs and aspiring founders. Andie Hassani combines practical strategy, personal alignment and focused action.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-ledger" aria-hidden="true">
          <span>AH / 01</span>
          <span>DUBAI / WORLDWIDE</span>
        </div>
        <div className="home-hero-copy">
          <p className="kicker">Business coaching for women ready to lead</p>
          <h1>Build a business that <i>feels as good</i> as it grows.</h1>
          <p className="hero-deck">
            Practical strategy for the business. Honest alignment for the person
            building it. Focused momentum for what comes next.
          </p>
          <div className="hero-actions">
            <a className="button button-red" href={DISCOVERY_URL} target="_blank" rel="noreferrer">
              Book a discovery call <span aria-hidden="true">NE</span>
            </a>
            <Link className="text-link" href="/clarity-audit">Start with the clarity audit</Link>
          </div>
        </div>

        <div className="home-portrait">
          <div className="portrait-red-field" aria-hidden="true" />
          <img src="/andie-hassani.jpg" alt="Andie Hassani, certified business coach" />
          <div className="portrait-caption">
            <strong>ANDIE HASSANI</strong>
            <span>ICF / EMCC CERTIFIED</span>
          </div>
          <div className="portrait-side-note">CLARITY INTO CONFIDENT ACTION</div>
        </div>

        <div className="home-proof">
          <div><strong>20+</strong><span>Years across Europe,<br />the Middle East and UK</span></div>
          <div><strong>04</strong><span>Languages:<br />EN / FR / IT / FA</span></div>
          <div><strong>01</strong><span>Business built<br />on your own terms</span></div>
        </div>
      </section>

      <section className="red-thread-manifesto">
        <div className="thread-line" aria-hidden="true"><span /></div>
        <p className="section-index">THE RED THREAD / 01</p>
        <div>
          <h2>Most founders do not need <i>more information.</i></h2>
          <p>
            They need a way to connect what they know, what they want and what the
            business is asking of them now. That connection is the red thread:
            alignment carried into strategy, then strategy carried into action.
          </p>
        </div>
      </section>

      <section className="service-index">
        <div className="section-opening">
          <p className="kicker">The work</p>
          <h2>Three conversations.<br /><i>One connected business.</i></h2>
          <Link className="text-link" href="/coaching">Explore the coaching</Link>
        </div>
        <div className="service-lines">
          {serviceLines.map((service) => (
            <Link className="service-line" href="/coaching" key={service.number}>
              <span className="service-number">{service.number}</span>
              <span className="service-label">{service.label}</span>
              <strong>{service.title}</strong>
              <p>{service.description}</p>
              <b aria-hidden="true">NE</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="diagnostic-callout">
        <div className="diagnostic-mark" aria-hidden="true">
          <span>?</span><small>6 QUESTIONS<br />3 MINUTES</small>
        </div>
        <div>
          <p className="kicker kicker-on-dark">A useful place to begin</p>
          <h2>Where is the business asking for <i>clarity?</i></h2>
          <p>
            Take a short, private diagnostic across direction, offer, evidence,
            alignment, focus and momentum. Get one practical move for the week ahead.
          </p>
          <Link className="button button-light" href="/clarity-audit">
            Take the clarity audit <span aria-hidden="true">NE</span>
          </Link>
        </div>
      </section>

      <section className="story-preview">
        <div className="story-image">
          <img src="/andie-hassani.jpg" alt="Portrait of Andie Hassani" />
          <span>EUROPE / MIDDLE EAST / UK</span>
        </div>
        <div className="story-copy">
          <p className="kicker">The story behind the work</p>
          <h2>Twenty years inside business. Then a decision to build <i>differently.</i></h2>
          <p>
            Andie saw how often talented people worked hard without enough direction,
            communication or fulfilment. Her coaching practice brings commercial
            experience together with transformational work, creating space for both
            the plan and the person.
          </p>
          <Link className="button button-dark" href="/about">Meet Andie <span aria-hidden="true">NE</span></Link>
        </div>
      </section>

      <section className="testimonial-editorial">
        <p className="section-index">CLIENT PERSPECTIVE / 02</p>
        <blockquote>
          <p>
            "After just one session, I felt more relieved, energised, motivated
            and - most importantly - focused."
          </p>
          <footer>
            <strong>VERONIKA BUBENICKOVA</strong>
            <span>Founder, coach, speaker and author</span>
          </footer>
        </blockquote>
        <div className="testimonial-result">
          <span>THE RESULT</span>
          <strong>CLEARER.<br />ENERGISED.<br />FOCUSED.</strong>
        </div>
      </section>

      <section className="latest-notes">
        <div className="section-opening">
          <p className="kicker">Field notes</p>
          <h2>Ideas for the <i>in-between.</i></h2>
          <p>For the part where things are changing, but the next version is not fully visible yet.</p>
          <Link className="text-link" href="/insights">Explore all insights</Link>
        </div>
        <div className="latest-note-list">
          {insights.slice(0, 3).map((insight) => (
            <Link href={"/insights/" + insight.slug} key={insight.slug}>
              <span>{insight.number}</span>
              <small>{insight.category} / {insight.readingTime}</small>
              <strong>{insight.title}</strong>
              <b aria-hidden="true">NE</b>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
