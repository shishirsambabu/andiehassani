"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type WorkType = "Revenue" | "Operations" | "Growth";
type Energy = "High" | "Medium" | "Low";

type FocusTask = {
  id: string;
  title: string;
  type: WorkType;
  energy: Energy;
};

const workTypes: WorkType[] = ["Revenue", "Operations", "Growth"];
const energyLevels: Energy[] = ["High", "Medium", "Low"];
const storageKey = "andie-hassani-focus-map";

const typePriority: Record<WorkType, number> = { Revenue: 0, Growth: 1, Operations: 2 };
const energyPriority: Record<Energy, number> = { High: 0, Medium: 1, Low: 2 };

export function FocusPlanner() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<WorkType>("Revenue");
  const [energy, setEnergy] = useState<Energy>("High");
  const [tasks, setTasks] = useState<FocusTask[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        try {
          setTasks(JSON.parse(saved) as FocusTask[]);
        } catch {
          window.localStorage.removeItem(storageKey);
        }
      }
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [loaded, tasks]);

  const sortedTasks = useMemo(
    () =>
      [...tasks].sort(
        (a, b) => energyPriority[a.energy] - energyPriority[b.energy] || typePriority[a.type] - typePriority[b.type],
      ),
    [tasks],
  );

  const counts = useMemo(
    () =>
      workTypes.reduce<Record<WorkType, number>>(
        (result, item) => ({ ...result, [item]: tasks.filter((task) => task.type === item).length }),
        { Revenue: 0, Operations: 0, Growth: 0 },
      ),
    [tasks],
  );

  const priority = sortedTasks[0];
  const imbalance = Math.max(...Object.values(counts)) - Math.min(...Object.values(counts));

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    setTasks((current) => [
      ...current,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, title: cleanTitle, type, energy },
    ]);
    setTitle("");
    setCopied(false);
  }

  function removeTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
    setCopied(false);
  }

  async function copyPlan() {
    if (!tasks.length) return;
    const plan = [
      "MY MAP · MATCH · MOVE PLAN",
      "",
      ...sortedTasks.map((task, index) => `${index + 1}. ${task.title} — ${task.type} / ${task.energy} energy`),
      "",
      `First protected outcome: ${priority?.title ?? "Choose one"}`,
    ].join("\n");
    await navigator.clipboard.writeText(plan);
    setCopied(true);
  }

  return (
    <section className="focus-planner" data-reveal>
      <div className="focus-planner-build">
        <div className="tool-status"><span /> Private tool · saved on this device</div>
        <p className="eyebrow">Step 01 / Map</p>
        <h2>Put the work where you can <em>see it.</em></h2>
        <p className="tool-intro">Add the commitments competing for your attention. Label the kind of work and the energy it genuinely needs.</p>

        <form onSubmit={addTask}>
          <label className="focus-task-input">
            <span>What is on your plate?</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Test the new offer with five clients" />
          </label>
          <div className="focus-select-row">
            <label>
              <span>Work type</span>
              <select value={type} onChange={(event) => setType(event.target.value as WorkType)}>
                {workTypes.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span>Energy needed</span>
              <select value={energy} onChange={(event) => setEnergy(event.target.value as Energy)}>
                {energyLevels.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <button className="action-button action-button-red" type="submit">Add to the map <span>+</span></button>
        </form>

        <div className="focus-task-list" aria-live="polite">
          {tasks.length ? tasks.map((task) => (
            <article key={task.id}>
              <span className={`task-type task-type-${task.type.toLowerCase()}`}>{task.type}</span>
              <strong>{task.title}</strong>
              <small>{task.energy} energy</small>
              <button type="button" onClick={() => removeTask(task.id)} aria-label={`Remove ${task.title}`}>×</button>
            </article>
          )) : (
            <div className="focus-empty"><span>00</span><p>Your focus map is empty. Add three to seven real commitments—not an idealised list.</p></div>
          )}
        </div>
      </div>

      <aside className="focus-planner-output" data-spotlight>
        <p className="eyebrow">Steps 02–03 / Match + Move</p>
        <div className="focus-counts">
          {workTypes.map((item) => (
            <div key={item}><span>{String(counts[item]).padStart(2, "0")}</span><small>{item}</small></div>
          ))}
        </div>

        {tasks.length ? (
          <>
            <div className="focus-readout">
              <small>What the map says</small>
              <h2>{imbalance >= 3 ? "Your week is carrying an imbalance." : "Your mix is workable. Now protect the sequence."}</h2>
              <p>
                {imbalance >= 3
                  ? "One category is consuming most of the map. Decide whether that is a deliberate season or a pattern pulling the business off course."
                  : "Do the demanding, commercially meaningful work when your attention is strongest. Let routine work use the lower-energy windows."}
              </p>
            </div>
            <div className="protected-outcome">
              <small>First protected outcome</small>
              <strong>{priority?.title}</strong>
              <span>{priority?.type} · {priority?.energy} energy</span>
            </div>
            <ol className="focus-sequence">
              {sortedTasks.slice(0, 5).map((task, index) => (
                <li key={task.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{task.title}</strong><small>{task.energy}</small></li>
              ))}
            </ol>
            <div className="focus-output-actions">
              <button className="action-button action-button-light" type="button" onClick={copyPlan}>{copied ? "Plan copied" : "Copy my focus plan"}<span>↗</span></button>
              <button className="quiet-button quiet-button-light" type="button" onClick={() => setTasks([])}>Clear the map</button>
            </div>
          </>
        ) : (
          <div className="focus-output-empty">
            <span className="focus-orbit" aria-hidden="true"><i /><b /></span>
            <h2>A calendar is not a list of hours. It is an energy landscape.</h2>
            <p>Your first protected outcome will appear here once the map has something real to work with.</p>
          </div>
        )}
      </aside>
    </section>
  );
}
