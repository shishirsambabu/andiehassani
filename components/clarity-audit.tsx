"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const questions = [
  {
    pillar: "Direction",
    prompt: "I can explain the specific problem my business solves in one clear sentence.",
    move: "Write one sentence that names the person, the costly problem and the change you help create.",
  },
  {
    pillar: "Offer",
    prompt: "My offer is focused enough that the right client quickly understands why it is for them.",
    move: "Remove one audience, promise or feature that makes the offer harder to recognise.",
  },
  {
    pillar: "Evidence",
    prompt: "I regularly use real conversations, sales signals or client feedback to guide decisions.",
    move: "Choose one assumption and test it in five real customer conversations this week.",
  },
  {
    pillar: "Alignment",
    prompt: "The way I am building the business fits my values, strengths and definition of success.",
    move: "Name the one success condition the business must protect, even as it grows.",
  },
  {
    pillar: "Focus",
    prompt: "My calendar protects the few priorities that matter instead of reacting to everything.",
    move: "Turn the most commercially meaningful outcome into protected time before the week fills up.",
  },
  {
    pillar: "Momentum",
    prompt: "I know the next meaningful move and can make it within the next seven days.",
    move: "Reduce the next move until it can be completed, observed and learned from within seven days.",
  },
];

const labels = ["Not yet", "Rarely", "Sometimes", "Mostly", "Clearly"];

export function ClarityAudit() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [complete, setComplete] = useState(false);

  const score = useMemo(() => answers.reduce((total, answer) => total + answer, 0), [answers]);
  const weakest = useMemo(() => {
    if (!complete) return null;
    const minimum = Math.min(...answers);
    return questions[answers.indexOf(minimum)];
  }, [answers, complete]);

  const result = score <= 14
    ? {
        band: "The signal is buried",
        copy: "You do not need more pressure. You need fewer competing priorities and a clearer definition of the business you are building.",
        move: "Choose one audience, one problem and one useful test for the next seven days.",
      }
    : score <= 22
      ? {
          band: "Clarity is emerging",
          copy: "There is a viable direction here, but decisions and execution are not yet reinforcing each other consistently.",
          move: "Turn the strongest idea into one protected weekly outcome and remove one source of noise.",
        }
      : {
          band: "You are ready to build momentum",
          copy: "The foundations are strong. The opportunity is to make your rhythm more deliberate and scale without losing alignment.",
          move: "Identify the constraint that would make everything else easier, then give it focused attention.",
        };

  function choose(value: number) {
    const nextAnswers = [...answers];
    nextAnswers[step] = value;
    setAnswers(nextAnswers);

    if (step === questions.length - 1) {
      setComplete(true);
    } else {
      setStep((current) => current + 1);
    }
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setComplete(false);
  }

  if (complete) {
    const percentage = Math.round((score / (questions.length * 5)) * 100);
    const pathway = ["Direction", "Offer", "Evidence"].includes(weakest?.pillar ?? "")
      ? { href: "/coaching", label: "Explore the matched coaching path" }
      : ["Focus", "Momentum"].includes(weakest?.pillar ?? "")
        ? { href: "/tools/focus-planner", label: "Build your focus map" }
        : { href: "/approach", label: "Explore the Red Thread method" };
    return (
      <section className="audit audit-result" aria-live="polite">
        <div className="audit-score">
          <span>{percentage}</span>
          <small>CLARITY INDEX / 100</small>
        </div>
        <div className="audit-result-copy">
          <p className="kicker">Your result</p>
          <h2>{result.band}</h2>
          <p>{result.copy}</p>
          <div className="result-focus">
            <small>YOUR LEVER</small>
            <strong>{weakest?.pillar}</strong>
            <p>{weakest?.move ?? result.move}</p>
          </div>
          <div className="audit-focus-map" aria-label="Your clarity map">
            {questions.map((item, index) => (
              <div key={item.pillar}>
                <span>{item.pillar}</span>
                <i><b style={{ width: `${((answers[index] ?? 0) / 5) * 100}%` }} /></i>
                <small>{answers[index]}/5</small>
              </div>
            ))}
          </div>
          <div className="audit-actions">
            <Link className="button button-dark" href={pathway.href}>{pathway.label} <span aria-hidden="true">↗</span></Link>
            <Link className="text-button" href="/contact">Prepare a consultation brief</Link>
            <button className="text-button" type="button" onClick={restart}>Retake the audit</button>
          </div>
        </div>
      </section>
    );
  }

  const question = questions[step];
  return (
    <section className="audit">
      <div className="audit-progress" aria-label={"Question " + (step + 1) + " of " + questions.length}>
        <div><span>{String(step + 1).padStart(2, "0")}</span><small>OF {String(questions.length).padStart(2, "0")}</small></div>
        <div className="progress-track"><span style={{ width: ((step + 1) / questions.length) * 100 + "%" }} /></div>
        <strong>{question.pillar}</strong>
      </div>
      <div className="audit-question" key={step}>
        <p className="kicker">Choose the answer that is true today</p>
        <h2>{question.prompt}</h2>
        <div className="answer-scale">
          {labels.map((label, index) => (
            <button type="button" key={label} onClick={() => choose(index + 1)}>
              <span>{index + 1}</span>
              <strong>{label}</strong>
            </button>
          ))}
        </div>
        {step > 0 ? <button className="audit-back" type="button" onClick={() => setStep((current) => current - 1)}>← Previous question</button> : null}
      </div>
    </section>
  );
}
