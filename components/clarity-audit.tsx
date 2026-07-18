"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const questions = [
  {
    pillar: "Direction",
    prompt: "I can explain the specific problem my business solves in one clear sentence.",
  },
  {
    pillar: "Offer",
    prompt: "My offer is focused enough that the right client quickly understands why it is for them.",
  },
  {
    pillar: "Evidence",
    prompt: "I regularly use real conversations, sales signals or client feedback to guide decisions.",
  },
  {
    pillar: "Alignment",
    prompt: "The way I am building the business fits my values, strengths and definition of success.",
  },
  {
    pillar: "Focus",
    prompt: "My calendar protects the few priorities that matter instead of reacting to everything.",
  },
  {
    pillar: "Momentum",
    prompt: "I know the next meaningful move and can make it within the next seven days.",
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
            <p>{result.move}</p>
          </div>
          <div className="audit-actions">
            <Link className="button button-dark" href="/contact">Build your consultation brief <span aria-hidden="true">NE</span></Link>
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
      <div className="audit-question">
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
      </div>
    </section>
  );
}
