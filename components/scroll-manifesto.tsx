"use client";

import { useEffect, useRef } from "react";

const acts = [
  {
    index: "01",
    label: "The noise",
    title: <>You do not need more <em>information.</em></>,
    copy: "More inputs rarely solve a decision that has not been named clearly enough.",
    word: "SIGNAL",
  },
  {
    index: "02",
    label: "The connection",
    title: <>You need the <em>red thread.</em></>,
    copy: "The connection between what is true for you, what the evidence says and what the business needs now.",
    word: "ALIGN",
  },
  {
    index: "03",
    label: "The movement",
    title: <>Then one clear <em>next move.</em></>,
    copy: "Not a performance of progress. A decision you can make, observe and learn from.",
    word: "MOVE",
  },
];

export function ScrollManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRefs = useRef<Array<HTMLElement | null>>([]);
  const wordRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    function update() {
      frame = 0;
      const bounds = section!.getBoundingClientRect();
      const travel = Math.max(1, bounds.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / travel));
      section!.style.setProperty("--manifesto-progress", progress.toFixed(4));

      let strongest = 0;
      let strongestOpacity = 0;
      frameRefs.current.forEach((element, index) => {
        if (!element) return;
        const centre = index / (acts.length - 1);
        const distance = Math.abs(progress - centre);
        const opacity = Math.max(0, 1 - distance * 3.25);
        const direction = centre - progress;
        element.style.opacity = opacity.toFixed(3);
        element.style.transform = `translate3d(0, ${direction * 150}px, 0) scale(${0.9 + opacity * 0.1})`;
        element.style.filter = `blur(${Math.max(0, (1 - opacity) * 10)}px)`;
        element.style.pointerEvents = opacity > 0.7 ? "auto" : "none";
        if (opacity > strongestOpacity) {
          strongest = index;
          strongestOpacity = opacity;
        }
      });

      if (wordRef.current) wordRef.current.textContent = acts[strongest].word;
      if (counterRef.current) counterRef.current.textContent = acts[strongest].index;
    }

    function requestUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    if (reduceMotion) {
      frameRefs.current.forEach((element) => {
        if (!element) return;
        element.style.opacity = "1";
        element.style.transform = "none";
        element.style.filter = "none";
      });
    } else {
      update();
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="scroll-manifesto" ref={sectionRef} id="manifesto" data-atmosphere="ink" data-thread-label="The thesis">
      <div className="manifesto-sticky">
        <div className="manifesto-meta">
          <span ref={counterRef}>01</span>
          <p>THE RED THREAD<br />A THREE-ACT THESIS</p>
        </div>
        <div className="manifesto-stage">
          {acts.map((act, index) => (
            <article ref={(element) => { frameRefs.current[index] = element; }} key={act.index}>
              <small>{act.index} / {act.label}</small>
              <h2>{act.title}</h2>
              <p>{act.copy}</p>
            </article>
          ))}
        </div>
        <span className="manifesto-kinetic" ref={wordRef} aria-hidden="true">SIGNAL</span>
        <div className="manifesto-thread" aria-hidden="true"><span /><i /></div>
        <div className="manifesto-progress" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
