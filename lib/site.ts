const productionHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;

export const SITE_URL = productionHost
  ? productionHost.startsWith("http")
    ? productionHost
    : `https://${productionHost}`
  : "http://localhost:3000";
export const LINKEDIN_URL = "https://www.linkedin.com/in/andiehassani/";
export const DISCOVERY_URL = "https://lnkd.in/eqRc4K86";

export const primaryNav = [
  { index: "01", label: "Story", href: "/about" },
  { index: "02", label: "Coaching", href: "/coaching" },
  { index: "03", label: "Method", href: "/approach" },
  { index: "04", label: "Insights", href: "/insights" },
];

export const serviceLines = [
  {
    number: "01",
    title: "Find the signal",
    label: "Strategy and direction",
    description:
      "Separate the meaningful opportunity from the noise, then shape an offer and direction that make commercial sense.",
    result: "A business you can explain, test and grow.",
  },
  {
    number: "02",
    title: "Lead from alignment",
    label: "Mindset and decisions",
    description:
      "Recognise the patterns behind hesitation, reconnect to your strengths and make decisions you can stand behind.",
    result: "Self-trust that holds up under pressure.",
  },
  {
    number: "03",
    title: "Create momentum",
    label: "Focus and execution",
    description:
      "Translate insight into priorities, protected time and a realistic rhythm that leaves room for life.",
    result: "Progress that is focused and sustainable.",
  },
];

export const faqs = [
  {
    question: "Who is Andie's coaching designed for?",
    answer:
      "Women entrepreneurs and aspiring founders who want clearer direction, stronger decisions and sustainable momentum in the business they are building.",
  },
  {
    question: "Do I need a finished business plan?",
    answer:
      "No. Coaching can help shape an early idea, refine an existing offer or find the next move in an established business.",
  },
  {
    question: "Is the work only about mindset?",
    answer:
      "No. The work combines personal alignment with practical business strategy, turning insight into decisions, priorities and action.",
  },
  {
    question: "Can we work together internationally?",
    answer:
      "Yes. Andie is based in Dubai and brings cross-cultural experience from Europe, the Middle East and the UK. Sessions can be held remotely.",
  },
];
