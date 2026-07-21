"use client";

import Link from "next/link";
import { useState } from "react";

const paths = [
  {
    id: "shape",
    label: "Shape an idea",
    code: "01",
    signal: "Possibility is louder than priority.",
    diagnosis:
      "You do not need a complete business plan yet. You need one audience, one meaningful problem and one honest way to test the fit.",
    move: "Write the assumption that must be true, then design a seven-day evidence test.",
    href: "/clarity-audit",
    cta: "Find your clarity lever",
  },
  {
    id: "unstick",
    label: "Find the block",
    code: "02",
    signal: "Activity is no longer producing direction.",
    diagnosis:
      "The business may not need more ideas. It may need a clean outside view of the offer, the decision pattern or the constraint hiding beneath the noise.",
    move: "Name the decision you keep circling and what it is costing you not to make it.",
    href: "/coaching",
    cta: "Explore focused coaching",
  },
  {
    id: "scale",
    label: "Scale without sprawl",
    code: "03",
    signal: "Opportunity is outrunning capacity.",
    diagnosis:
      "Growth is asking for a stronger operating rhythm: fewer priorities, cleaner boundaries and work matched to the energy required to do it well.",
    move: "Map every commitment into revenue, operations or growth, then protect the one outcome that changes the week.",
    href: "/tools/focus-planner",
    cta: "Build a focused week",
  },
];

export function Pathfinder() {
  const [activeId, setActiveId] = useState(paths[0].id);
  const active = paths.find((path) => path.id === activeId) ?? paths[0];

  return (
    <section className="pathfinder" data-reveal>
      <div className="pathfinder-heading">
        <p className="eyebrow">Decision room / live</p>
        <h2>What kind of clarity do you need <em>today?</em></h2>
        <p>Choose the truest starting point. The site reorganises around the decision in front of you.</p>
      </div>

      <div className="pathfinder-console" data-spotlight data-tilt>
        <div className="pathfinder-tabs" role="tablist" aria-label="Choose your current business state">
          {paths.map((path) => (
            <button
              type="button"
              role="tab"
              aria-selected={active.id === path.id}
              aria-controls="pathfinder-panel"
              className={active.id === path.id ? "is-active" : ""}
              key={path.id}
              onClick={() => setActiveId(path.id)}
            >
              <span>{path.code}</span>
              <strong>{path.label}</strong>
            </button>
          ))}
        </div>

        <div className="pathfinder-panel" id="pathfinder-panel" role="tabpanel" aria-live="polite" key={active.id}>
          <div className="pathfinder-signal">
            <small>Signal detected</small>
            <strong>{active.signal}</strong>
          </div>
          <p>{active.diagnosis}</p>
          <div className="pathfinder-move">
            <span>One useful move</span>
            <p>{active.move}</p>
          </div>
          <Link className="action-link" href={active.href}>
            {active.cta}<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
