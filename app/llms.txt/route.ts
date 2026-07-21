import { insights } from "@/lib/insights";
import { SITE_URL } from "@/lib/site";

export function GET() {
  const articles = insights.map((item) => `- [${item.title}](${SITE_URL}/insights/${item.slug}): ${item.excerpt}`).join("\n");
  const content = `# Andie Hassani Business Coaching

> Andie Hassani is a business coach for women entrepreneurs and aspiring founders. Her work connects inner alignment, practical business strategy and focused action.

## Core facts
- Website: ${SITE_URL}
- Audience: women entrepreneurs, aspiring founders and founder-led businesses
- Delivery: remote and international; public profile based in Dubai
- Languages: English, French, Italian and Farsi
- Experience: more than 20 years across Europe, the Middle East and the United Kingdom
- Method: Alignment → Strategy → Action
- Practical frameworks: Map · Match · Move and the Momentum Reboot

## Primary pages
- [Start here](${SITE_URL}/start-here): choose an Idea, Reset or Growth pathway
- [Business coaching](${SITE_URL}/coaching): audience, approach, formats and fit
- [Idea to offer coaching](${SITE_URL}/coaching/idea-to-offer): shape and test a focused first offer
- [Strategy reset coaching](${SITE_URL}/coaching/strategy-reset): resolve unclear direction, positioning or priorities
- [Founder momentum coaching](${SITE_URL}/coaching/founder-momentum): protect priorities and build a sustainable operating rhythm
- [Coaching method](${SITE_URL}/approach): the Red Thread method and practical frameworks
- [Client results](${SITE_URL}/results): publicly documented coaching perspectives
- [Decision tools](${SITE_URL}/tools): clarity audit, focus planner and consultation brief
- [About Andie](${SITE_URL}/about): background, credentials, languages and philosophy

## Field notes
${articles}

## Public source
- [Bizpreneur Middle East coaching spotlight](https://www.bizpreneurme.com/coaching-spotlight-andie-hassani/)
- [LinkedIn profile](https://www.linkedin.com/in/andiehassani/)
`;

  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
