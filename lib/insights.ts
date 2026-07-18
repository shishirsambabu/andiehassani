export type InsightCategory = "Clarity" | "Mindset" | "Momentum" | "Strategy";

export type InsightSection = {
  heading: string;
  paragraphs: string[];
  pullQuote?: string;
};

export type Insight = {
  slug: string;
  number: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  readingTime: string;
  publishedAt: string;
  takeaway: string;
  sections: InsightSection[];
};

export const insights: Insight[] = [
  {
    slug: "certainty-is-not-a-strategy",
    number: "01",
    title: "Certainty is not a strategy",
    excerpt:
      "New founders often wait for confidence before moving. Evidence is a far better compass.",
    category: "Strategy",
    readingTime: "5 min",
    publishedAt: "2026-06-30",
    takeaway: "Replace the search for certainty with a small, useful test.",
    sections: [
      {
        heading: "The certainty trap",
        paragraphs: [
          "At the beginning, founders want to know whether the offer will work, whether the timing is right and whether they are making the correct decision. That desire is understandable. It is also impossible to fully satisfy before the business meets the market.",
          "Waiting can feel responsible, but it often disguises fear as preparation. The goal is not to remove uncertainty. The goal is to create enough evidence to make the next decision well.",
        ],
      },
      {
        heading: "Build evidence, not elaborate reassurance",
        paragraphs: [
          "A useful test is small enough to run now and clear enough to teach you something. Speak to five people with the problem. Offer a focused pilot. Ask what they tried before and what the problem is costing them.",
          "The answer does not have to validate your first idea. Good evidence may redirect you, narrow the audience or reveal a stronger problem. That is progress.",
        ],
        pullQuote: "Confidence often arrives after motion, not before it.",
      },
      {
        heading: "Your next move",
        paragraphs: [
          "Name the assumption that matters most. Design the smallest honest test. Decide in advance what you will learn from a yes, a no or an ambiguous result.",
          "Clarity grows when action and reflection work together.",
        ],
      },
    ],
  },
  {
    slug: "the-invisible-milestones",
    number: "02",
    title: "The milestones no one applauds",
    excerpt:
      "The most important signs of growth are often quieter than a launch, a client win or a revenue target.",
    category: "Mindset",
    readingTime: "4 min",
    publishedAt: "2026-05-20",
    takeaway: "Track how you respond, not only what you achieve.",
    sections: [
      {
        heading: "Growth changes your response first",
        paragraphs: [
          "A situation that once consumed three days now takes an hour. You send the message instead of rewriting it ten times. You recover from a disappointing conversation without making it mean the business is failing.",
          "These shifts are easy to overlook because they are not public. Yet they change the quality of every decision that follows.",
        ],
      },
      {
        heading: "A better progress review",
        paragraphs: [
          "Alongside commercial metrics, ask three human questions: What became easier? What did I handle differently? Where did I trust myself sooner?",
          "This is not a substitute for results. It is a way to notice the capacity that makes sustainable results possible.",
        ],
        pullQuote: "Not all progress announces itself.",
      },
      {
        heading: "Make the invisible visible",
        paragraphs: [
          "Keep a short decision log. Record the moment, the old pattern and the new response. Review it monthly.",
          "The record becomes evidence that you are not standing still, even in a season when the visible outcomes are still catching up.",
        ],
      },
    ],
  },
  {
    slug: "map-match-move",
    number: "03",
    title: "Map. Match. Move.",
    excerpt:
      "A practical focus framework for founders who are doing too much and moving too little.",
    category: "Momentum",
    readingTime: "6 min",
    publishedAt: "2026-04-15",
    takeaway: "Protect one to three outcomes instead of carrying an endless task list.",
    sections: [
      {
        heading: "Map what is actually on your plate",
        paragraphs: [
          "Overwhelm grows when every task appears equally urgent. Sort the work into three groups: revenue, operations and growth.",
          "The categories reveal imbalance quickly. You may be maintaining everything while creating nothing, or chasing growth while ignoring the operation that must support it.",
        ],
      },
      {
        heading: "Match the work to your energy",
        paragraphs: [
          "Your calendar is not only a collection of available hours. It is an energy landscape. Put strategy, creation and difficult decisions where your attention is strongest.",
          "Use lower-energy windows for routine administration. This simple change reduces the friction that often looks like procrastination.",
        ],
        pullQuote: "Working hard at the wrong time is still expensive.",
      },
      {
        heading: "Move the priority into protected time",
        paragraphs: [
          "Choose one to three outcomes for the week. Give each one a place in the calendar before meetings and requests consume the available space.",
          "Leave buffer. Founders do not need a perfect schedule; they need a rhythm that can survive contact with reality.",
        ],
      },
    ],
  },
  {
    slug: "alignment-before-acceleration",
    number: "04",
    title: "Alignment before acceleration",
    excerpt:
      "Speed amplifies the direction you already chose. Make sure it is a direction worth amplifying.",
    category: "Clarity",
    readingTime: "5 min",
    publishedAt: "2026-03-12",
    takeaway: "Define what success must protect before deciding how fast to grow.",
    sections: [
      {
        heading: "More is not always forward",
        paragraphs: [
          "A larger audience, more offers and a fuller calendar can create the appearance of progress. They can also move the business further from the life and values it was meant to support.",
          "Before accelerating, define the non-negotiables: the kind of work you want to be known for, the client experience you want to deliver and the space the business must leave for your life.",
        ],
      },
      {
        heading: "Use alignment as a decision filter",
        paragraphs: [
          "Ask whether an opportunity strengthens the core business, fits your way of working and creates a return worth the complexity it adds.",
          "A clear no is not a missed opportunity. It is capacity protected for the right one.",
        ],
        pullQuote: "Strategy is as much about what you protect as what you pursue.",
      },
      {
        heading: "Then move with conviction",
        paragraphs: [
          "Alignment is not an excuse to wait indefinitely. Once the direction is clear enough, choose the next visible action and give it a deadline.",
          "Purpose without movement becomes another form of avoidance. The work is to connect the two.",
        ],
      },
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
