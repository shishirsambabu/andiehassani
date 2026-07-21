export const coachingPaths = [
  {
    slug: "idea-to-offer",
    index: "01",
    stage: "Idea",
    title: "Idea to offer",
    headline: "Turn possibility into an offer the market can answer.",
    description: "For aspiring founders with experience, ambition or several possible directions—but no single proposition they are ready to test.",
    tension: "You are not short of ideas. The difficulty is deciding which one deserves evidence, energy and a place in the real world.",
    outcomes: ["A focused audience and problem", "A clear first offer hypothesis", "A small evidence test", "A practical 30-day sequence"],
    process: [
      { title: "Separate the signal", copy: "Review strengths, lived experience, market friction and the ideas that continue to return." },
      { title: "Shape the offer", copy: "Define the person, problem, change and delivery shape clearly enough to be understood." },
      { title: "Meet the evidence", copy: "Replace the search for certainty with conversations, a pilot or another useful market test." },
    ],
  },
  {
    slug: "strategy-reset",
    index: "02",
    stage: "Reset",
    title: "Strategy reset",
    headline: "See what the business is telling you now.",
    description: "For founders whose business exists but whose offer, positioning, priorities or direction no longer feel clean.",
    tension: "Activity has continued, but the connection between effort and direction has weakened. More tactics would only add to the noise.",
    outcomes: ["A named core constraint", "A clearer strategic choice", "Decisions about what stops", "A focused 90-day horizon"],
    process: [
      { title: "Read the current reality", copy: "Look at clients, offers, economics, energy and the decisions repeatedly postponed." },
      { title: "Find the hidden choice", copy: "Identify the trade-off beneath the surface problem and make the criteria explicit." },
      { title: "Reset the sequence", copy: "Turn the new direction into priorities, communication and a 90-day operating rhythm." },
    ],
  },
  {
    slug: "founder-momentum",
    index: "03",
    stage: "Growth",
    title: "Founder momentum",
    headline: "Grow the business without disappearing inside it.",
    description: "For founders facing more opportunity, more decisions and more responsibility than their current rhythm can hold.",
    tension: "The business is moving, but everything is arriving at the same level of urgency. Growth is beginning to create sprawl instead of leverage.",
    outcomes: ["A protected priority system", "Cleaner decision boundaries", "Work matched to capacity", "Momentum that survives real life"],
    process: [
      { title: "Map the whole load", copy: "Make revenue, operations, growth and invisible leadership work visible in one place." },
      { title: "Match work to capacity", copy: "Design a rhythm around energy, leverage and the decisions only the founder can make." },
      { title: "Move with boundaries", copy: "Protect one to three outcomes and create enough buffer for the business to stay adaptive." },
    ],
  },
] as const;

export function getCoachingPath(slug: string) {
  return coachingPaths.find((path) => path.slug === slug);
}
