const linkedInProfile = "https://www.linkedin.com/in/andiehassani/";
const discoveryCall = "https://lnkd.in/eqRc4K86";

const services = [
  {
    number: "01",
    title: "Strategy & Direction",
    copy: "Shape the idea, sharpen the offer and build a practical roadmap that makes commercial sense for you.",
    outcome: "A business you can explain, sell and grow.",
  },
  {
    number: "02",
    title: "Mindset & Alignment",
    copy: "Move through uncertainty, challenge the noise and make decisions from your strengths, values and goals.",
    outcome: "Self-trust that holds up under pressure.",
  },
  {
    number: "03",
    title: "Focus & Momentum",
    copy: "Turn insight into priorities, protected time and consistent action without pushing yourself into burnout.",
    outcome: "Progress you can feel and measure.",
  },
];

const insights = [
  {
    tag: "CLARITY",
    title: "Stop looking for certainty. Start building evidence.",
    copy: "The clearest next step rarely arrives before action. Test, listen, learn and let real feedback shape the path.",
    href: "https://www.linkedin.com/in/andiehassani/recent-activity/all/",
  },
  {
    tag: "GROWTH",
    title: "Celebrate the shifts no one else can see.",
    copy: "Growth often appears first in the message you send, the boundary you hold and the moment you choose not to spiral.",
    href: "https://www.linkedin.com/posts/andiehassani_i-dont-think-you-realise-how-much-youve-activity-7447553841220362240-VCH1",
  },
  {
    tag: "FOCUS",
    title: "Map. Match. Move.",
    copy: "Clarify what matters, match the work to your energy, then protect time for the outcomes that move the business.",
    href: "https://www.bizpreneurme.com/coaching-spotlight-andie-hassani/",
  },
];

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#content">Skip to main content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Andie Hassani home">
          <span className="brand-mark">AH</span>
          <span className="brand-name">ANDIE HASSANI</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#coaching">Coaching</a>
          <a href="#approach">Approach</a>
          <a href="#insights">Insights</a>
        </nav>
        <a className="header-cta" href={discoveryCall} target="_blank" rel="noreferrer">
          Book a discovery call <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy" id="content">
          <p className="eyebrow"><span /> Business coaching for women ready to lead</p>
          <h1>
            Build a business that <em>feels as good</em> as it grows.
          </h1>
          <p className="hero-intro">
            Practical strategy meets personal alignment. I help women entrepreneurs
            and aspiring founders turn bold ideas into focused, sustainable businesses.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={discoveryCall} target="_blank" rel="noreferrer">
              Let&apos;s talk <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="#coaching">Explore coaching</a>
          </div>
          <p className="hero-meta">DUBAI BASED · GLOBAL PERSPECTIVE · ENGLISH / FRENCH / ITALIAN / FARSI</p>
        </div>

        <div className="hero-visual" aria-label="Portrait of Andie Hassani">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="portrait-frame">
            <img src="/andie-hassani.jpg" alt="Andie Hassani, certified business coach" />
          </div>
          <div className="experience-card">
            <strong>20+</strong>
            <span>YEARS ACROSS<br />EUROPE, MIDDLE<br />EAST & UK</span>
          </div>
          <div className="cert-card">CERTIFIED<br /><strong>ICF / EMCC COACH</strong></div>
          <p className="visual-note">CLARITY INTO CONFIDENT ACTION</p>
        </div>
      </section>

      <div className="ticker" aria-label="Andie Hassani coaching themes">
        <div>
          <span>STRATEGY</span><b>✦</b><span>ALIGNMENT</span><b>✦</b><span>MOMENTUM</span><b>✦</b>
          <span>STRATEGY</span><b>✦</b><span>ALIGNMENT</span><b>✦</b><span>MOMENTUM</span>
        </div>
      </div>

      <section className="credibility" aria-label="Professional highlights">
        <div><strong>20+</strong><span>Years of cross-market<br />business experience</span></div>
        <div><strong>3</strong><span>Regions: Europe,<br />Middle East and UK</span></div>
        <div><strong>4</strong><span>Languages for<br />cross-cultural coaching</span></div>
        <div><strong>ICF · EMCC</strong><span>Certified business<br />coaching practice</span></div>
      </section>

      <section className="services section-pad" id="coaching">
        <div className="section-heading">
          <p className="eyebrow"><span /> Coaching that meets you where you are</p>
          <h2>Build the whole business. <em>Not just the plan.</em></h2>
          <p>
            Your business strategy and the person building it are inseparable.
            We work on both—so growth feels focused, sustainable and genuinely yours.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-top"><span>{service.number}</span><span aria-hidden="true">↗</span></div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <strong>{service.outcome}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="approach section-pad" id="approach">
        <div className="approach-intro">
          <p className="eyebrow eyebrow-light"><span /> The 3M focus framework</p>
          <h2>Less overwhelm.<br /><em>More forward motion.</em></h2>
          <p>
            Clear priorities create the conditions for better work. This practical
            framework helps you protect attention without losing flexibility.
          </p>
          <a className="button button-cream" href={discoveryCall} target="_blank" rel="noreferrer">
            Find your next move <span aria-hidden="true">→</span>
          </a>
        </div>
        <ol className="approach-steps">
          <li>
            <span>01</span>
            <div><h3>Map</h3><p>Sort the work into revenue, operations and growth. See what deserves attention now.</p></div>
          </li>
          <li>
            <span>02</span>
            <div><h3>Match</h3><p>Align demanding work with your natural energy so effort becomes more effective.</p></div>
          </li>
          <li>
            <span>03</span>
            <div><h3>Move</h3><p>Choose one to three outcomes, schedule them and leave enough room for real life.</p></div>
          </li>
        </ol>
      </section>

      <section className="about section-pad" id="about">
        <div className="about-portrait">
          <img src="/andie-hassani.jpg" alt="Andie Hassani" />
          <div className="about-stamp"><span>AH</span><small>BUSINESS COACHING<br />DUBAI · WORLDWIDE</small></div>
        </div>
        <div className="about-copy">
          <p className="eyebrow"><span /> Meet Andie</p>
          <h2>Experience shaped the strategy. <em>Purpose changed the work.</em></h2>
          <p className="lead">
            For more than two decades, Andie worked across Europe, the Middle East
            and the UK in family-run businesses and large organisations.
          </p>
          <p>
            She saw the same pattern everywhere: talented people working hard, but
            without enough direction, communication or fulfilment. Her own journey
            through business strategy, mindset, NLP and transformational coaching
            led her to combine commercial experience with deeply human support.
          </p>
          <p>
            Today, she helps entrepreneurs find the clarity to build on their own
            terms—because alignment needs action, and strategy needs meaning.
          </p>
          <div className="about-links">
            <a className="button button-dark" href={linkedInProfile} target="_blank" rel="noreferrer">
              Connect on LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <span>English · French · Italian · Farsi</span>
          </div>
        </div>
      </section>

      <section className="testimonials section-pad" aria-labelledby="success-title">
        <div className="testimonial-heading">
          <p className="eyebrow eyebrow-light"><span /> Client perspective</p>
          <h2 id="success-title">Clearer. Energised. <em>Focused.</em></h2>
        </div>
        <div className="testimonial-grid">
          <blockquote>
            <p>“After just one session, I felt more relieved, energised, motivated and—most importantly—focused.”</p>
            <footer>
              <strong>VERONIKA BUBENICKOVA</strong>
              <span>Founder, Coach, Speaker & Author</span>
            </footer>
          </blockquote>
          <blockquote>
            <p>“Andie helped me envision and plan my business in a comfortable way. I could reorganise and refocus.”</p>
            <footer>
              <strong>CYRIELLE MUN</strong>
              <span>Leadership Coach</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="insights section-pad" id="insights">
        <div className="section-heading insights-heading">
          <p className="eyebrow"><span /> Notes for the journey</p>
          <h2>Think clearly. <em>Move intentionally.</em></h2>
        </div>
        <div className="insight-grid">
          {insights.map((insight, index) => (
            <a className="insight-card" href={insight.href} target="_blank" rel="noreferrer" key={insight.title}>
              <div><span>{String(index + 1).padStart(2, "0")}</span><span>{insight.tag}</span></div>
              <h3>{insight.title}</h3>
              <p>{insight.copy}</p>
              <strong>Read the perspective <span aria-hidden="true">↗</span></strong>
            </a>
          ))}
        </div>
      </section>

      <section className="faq section-pad">
        <div>
          <p className="eyebrow"><span /> A good place to start</p>
          <h2>Questions before <em>we talk?</em></h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Who is coaching for?<span>+</span></summary>
            <p>Women entrepreneurs and aspiring founders who want clearer direction, stronger decisions and sustainable momentum.</p>
          </details>
          <details>
            <summary>Do I need a finished business plan?<span>+</span></summary>
            <p>No. Coaching can help you shape an early idea, refine an existing offer or find the next move in an established business.</p>
          </details>
          <details>
            <summary>Is the work only about mindset?<span>+</span></summary>
            <p>No. The work brings together practical strategy and personal alignment, turning insight into decisions, priorities and action.</p>
          </details>
          <details>
            <summary>Can we work together internationally?<span>+</span></summary>
            <p>Yes. Andie is based in Dubai and brings cross-cultural experience from Europe, the Middle East and the UK.</p>
          </details>
        </div>
      </section>

      <section className="closing">
        <p>YOUR AMBITION. YOUR RHYTHM. YOUR BUSINESS.</p>
        <h2>Ready to turn uncertainty into a business you believe in?</h2>
        <a className="button button-cream" href={discoveryCall} target="_blank" rel="noreferrer">
          Book a discovery call <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">AH</span>
          <span className="brand-name">ANDIE HASSANI</span>
        </a>
        <p>BUSINESS COACHING · DUBAI & WORLDWIDE</p>
        <div>
          <a href={linkedInProfile} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="#coaching">Coaching</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
