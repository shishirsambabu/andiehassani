"use client";

import { FormEvent, useMemo, useState } from "react";
import { DISCOVERY_URL, LINKEDIN_URL } from "@/lib/site";

export function ConsultationBrief() {
  const [name, setName] = useState("");
  const [stage, setStage] = useState("I have an idea I want to shape");
  const [priority, setPriority] = useState("Clarify my direction");
  const [constraint, setConstraint] = useState("");
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const summary = useMemo(
    () =>
      [
        "CONSULTATION BRIEF",
        "Name: " + (name || "Not provided"),
        "Current stage: " + stage,
        "Primary priority: " + priority,
        "What feels most difficult: " + (constraint || "Not provided"),
      ].join("\n"),
    [constraint, name, priority, stage],
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrepared(true);
    setCopied(false);
  }

  async function copySummary() {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
  }

  return (
    <div className="brief-builder">
      <form onSubmit={submit}>
        <div className="form-folio">YOUR STARTING POINT</div>
        <label>
          <span>Your first name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="First name" />
        </label>
        <label>
          <span>Where are you now?</span>
          <select value={stage} onChange={(event) => setStage(event.target.value)}>
            <option>I have an idea I want to shape</option>
            <option>I am preparing to launch</option>
            <option>I am already trading but feel stuck</option>
            <option>I am growing and need a clearer rhythm</option>
          </select>
        </label>
        <label>
          <span>What would make the biggest difference?</span>
          <select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option>Clarify my direction</option>
            <option>Strengthen my offer</option>
            <option>Make a difficult decision</option>
            <option>Reduce overwhelm and focus</option>
            <option>Build sustainable momentum</option>
          </select>
        </label>
        <label>
          <span>What feels most difficult right now?</span>
          <textarea
            value={constraint}
            onChange={(event) => setConstraint(event.target.value)}
            placeholder="A few honest lines are enough."
            rows={5}
          />
        </label>
        <button className="button button-red" type="submit">Prepare my brief <span aria-hidden="true">NE</span></button>
        <small className="privacy-note">Nothing entered here is stored or sent. This tool prepares your thoughts locally.</small>
      </form>

      <aside className={prepared ? "brief-output is-ready" : "brief-output"} aria-live="polite">
        <p className="kicker">Prepared for your conversation</p>
        {prepared ? (
          <>
            <h2>{name ? name + ", your" : "Your"} starting point is ready.</h2>
            <pre>{summary}</pre>
            <div className="brief-actions">
              <button className="button button-dark" type="button" onClick={copySummary}>
                {copied ? "Copied" : "Copy the brief"} <span aria-hidden="true">+</span>
              </button>
              <a className="text-link" href={DISCOVERY_URL} target="_blank" rel="noreferrer">Book the discovery call</a>
              <a className="text-link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">Message Andie on LinkedIn</a>
            </div>
          </>
        ) : (
          <>
            <span className="brief-placeholder-number">01</span>
            <h2>A better first conversation starts with a clearer question.</h2>
            <p>Use the prompts to organise what is happening in the business and what you most want to change.</p>
          </>
        )}
      </aside>
    </div>
  );
}
