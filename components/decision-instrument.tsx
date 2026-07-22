"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const movements = [
  {
    code: "01",
    title: "Align",
    signal: "Self / signal",
    headline: "Find the decision beneath the noise.",
    description: "Separate inherited expectations, urgency and comparison from what is actually true for you and the business now.",
    outcome: "A decision you can stand behind.",
    href: "/approach",
    cta: "Enter the Red Thread method",
  },
  {
    code: "02",
    title: "Strategise",
    signal: "Evidence / choice",
    headline: "Turn the signal into a commercial choice.",
    description: "Shape the audience, offer and test that will create useful evidence without building an entire business on assumptions.",
    outcome: "A direction you can explain and test.",
    href: "/coaching/strategy-reset",
    cta: "Explore strategy coaching",
  },
  {
    code: "03",
    title: "Act",
    signal: "Focus / movement",
    headline: "Protect the next move long enough to learn.",
    description: "Translate the decision into priorities, protected time and a rhythm that creates momentum without self-abandonment.",
    outcome: "Progress that remains sustainable.",
    href: "/tools/focus-planner",
    cta: "Open the focus planner",
  },
];

type DecisionInstrumentProps = {
  quote: string;
  client: string;
  role: string;
};

export function DecisionInstrument({ quote, client, role }: DecisionInstrumentProps) {
  const [active, setActive] = useState(0);
  const dialRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const dial = dialRef.current;
    if (!dial) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = active * -120;
    if (reduceMotion) {
      angleRef.current = target;
      dial.style.setProperty("--instrument-angle", `${target}deg`);
      dial.style.setProperty("--instrument-counter-angle", `${target * -1}deg`);
      return;
    }

    let frame = 0;
    const animate = () => {
      const distance = target - angleRef.current;
      velocityRef.current = (velocityRef.current + distance * .055) * .79;
      angleRef.current += velocityRef.current;
      dial.style.setProperty("--instrument-angle", `${angleRef.current.toFixed(3)}deg`);
      dial.style.setProperty("--instrument-counter-angle", `${(angleRef.current * -1).toFixed(3)}deg`);
      dial.style.setProperty("--instrument-speed", Math.min(1, Math.abs(velocityRef.current) / 8).toFixed(3));
      if (Math.abs(distance) > .01 || Math.abs(velocityRef.current) > .01) frame = window.requestAnimationFrame(animate);
      else dial.style.setProperty("--instrument-speed", "0");
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [active]);

  function movePointer(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    event.currentTarget.style.setProperty("--instrument-tilt-y", `${x * 7}deg`);
    event.currentTarget.style.setProperty("--instrument-tilt-x", `${y * -6}deg`);
    event.currentTarget.style.setProperty("--instrument-light-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--instrument-light-y", `${event.clientY - bounds.top}px`);
  }

  function resetPointer(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--instrument-tilt-y", "0deg");
    event.currentTarget.style.setProperty("--instrument-tilt-x", "0deg");
  }

  const movement = movements[active];

  return (
    <section className="decision-instrument" id="decision-desk" data-reveal data-atmosphere="ink" data-thread-label="The decision instrument">
      <header className="decision-instrument-heading">
        <p className="eyebrow">The decision instrument / live</p>
        <h2>A business is a system of <em>connected choices.</em></h2>
        <p>Andie works at the point where inner alignment, commercial evidence and focused execution become one clear movement.</p>
      </header>

      <div className="decision-instrument-stage">
        <article className="instrument-narrative" id="movement-panel" aria-live="polite" key={movement.code}>
          <div><small>{movement.code} / {movement.signal}</small><span>ACTIVE MOVEMENT</span></div>
          <h3>{movement.headline}</h3>
          <p>{movement.description}</p>
          <strong>{movement.outcome}</strong>
          <Link className="action-link" href={movement.href}>{movement.cta}<span>↗</span></Link>
        </article>

        <div
          className="decision-dial"
          ref={dialRef}
          onPointerMove={movePointer}
          onPointerLeave={resetPointer}
          aria-hidden="true"
        >
          <div className="decision-dial-face">
            <span className="dial-ring dial-ring-one" />
            <span className="dial-ring dial-ring-two" />
            <span className="dial-ring dial-ring-three" />
            <i className="dial-thread" />
            {movements.map((item, index) => <span className={`dial-marker dial-marker-${index + 1}`} key={item.code}>{item.code}<small>{item.title}</small></span>)}
            <b className="dial-core"><span>{movement.code}</span><i /></b>
          </div>
          <div className="dial-coordinate"><span>AH / RED THREAD</span><span>DECISION CALIBRATION</span></div>
        </div>
      </div>

      <nav className="instrument-selector" aria-label="Explore the Red Thread movements">
        {movements.map((item, index) => (
          <button
            type="button"
            aria-pressed={active === index}
            aria-controls="movement-panel"
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") setActive((active + 1) % movements.length);
              if (event.key === "ArrowLeft") setActive((active - 1 + movements.length) % movements.length);
            }}
            key={item.code}
          >
            <span>{item.code}</span><strong>{item.title}</strong><i />
          </button>
        ))}
      </nav>

      <footer className="instrument-evidence">
        <blockquote>“{quote}”</blockquote>
        <p><strong>{client}</strong><span>{role}</span></p>
        <div><strong>20+</strong><span>Years across Europe,<br />the Middle East and the UK</span></div>
        <div><strong>04</strong><span>English · French<br />Italian · Farsi</span></div>
      </footer>
    </section>
  );
}
