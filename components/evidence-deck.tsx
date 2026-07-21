"use client";

import { useRef, useState } from "react";
import { proofStories } from "@/lib/proof";

export function EvidenceDeck() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);
  const drag = useRef(0);

  function move(direction: number) {
    setActive((current) => (current + direction + proofStories.length) % proofStories.length);
    drag.current = 0;
    stageRef.current?.style.setProperty("--deck-drag", "0px");
  }

  function pointerDown(event: React.PointerEvent<HTMLDivElement>) {
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
  }

  function pointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerStart.current === null) return;
    drag.current = event.clientX - pointerStart.current;
    stageRef.current?.style.setProperty("--deck-drag", `${drag.current}px`);
  }

  function pointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerStart.current === null) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    event.currentTarget.classList.remove("is-dragging");
    pointerStart.current = null;
    if (Math.abs(drag.current) > 70) move(drag.current < 0 ? 1 : -1);
    else {
      drag.current = 0;
      stageRef.current?.style.setProperty("--deck-drag", "0px");
    }
  }

  return (
    <section className="evidence-deck" data-reveal data-thread-label="Evidence deck">
      <header>
        <div><p className="eyebrow">The evidence desk / interactive</p><h2>Open the client <em>case files.</em></h2></div>
        <p>Drag the dossier or use the controls. Every story is tied to a public source—no invented metrics, anonymous praise or decorative proof.</p>
      </header>

      <div
        className="evidence-deck-stage"
        ref={stageRef}
        role="group"
        aria-label="Client case file carousel"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerUp}
      >
        {proofStories.map((story, index) => {
          let offset = index - active;
          if (offset > proofStories.length / 2) offset -= proofStories.length;
          if (offset < -proofStories.length / 2) offset += proofStories.length;
          const depth = Math.abs(offset);
          const isActive = offset === 0;
          const style = {
            "--card-x": `${offset * 74}px`,
            "--card-y": `${depth * 28}px`,
            "--card-z": `${depth * -110}px`,
            "--card-r": `${offset * 4.5}deg`,
            "--card-scale": String(1 - depth * 0.055),
            zIndex: proofStories.length - depth,
          } as React.CSSProperties;
          return (
            <article className={isActive ? "evidence-file is-active" : "evidence-file"} style={style} aria-hidden={!isActive} key={story.slug}>
              <div className="evidence-file-tab"><span>CASE / {story.index}</span><small>VERIFIED SOURCE</small></div>
              <div className="evidence-file-heading"><div><small>CLIENT</small><h3>{story.name}</h3><p>{story.role}</p></div><span>{story.index}</span></div>
              <div className="evidence-file-grid">
                <div><small>01 / SITUATION</small><p>{story.situation}</p></div>
                <div><small>02 / WHAT BECAME VISIBLE</small><p>{story.observation}</p></div>
                <div><small>03 / SHIFT</small><p>{story.shift}</p></div>
              </div>
              <blockquote>“{story.quote}”</blockquote>
              <a href={story.source} target="_blank" rel="noreferrer" tabIndex={isActive ? 0 : -1}>{story.sourceLabel} <span>↗</span></a>
            </article>
          );
        })}
      </div>

      <div className="evidence-deck-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous case file">←</button>
        <div><span>{String(active + 1).padStart(2, "0")}</span><i><b style={{ width: `${((active + 1) / proofStories.length) * 100}%` }} /></i><small>{String(proofStories.length).padStart(2, "0")}</small></div>
        <button type="button" onClick={() => move(1)} aria-label="Next case file">→</button>
      </div>
    </section>
  );
}
