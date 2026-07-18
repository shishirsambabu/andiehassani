type PageIntroProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  aside?: string;
  tone?: "cream" | "red" | "dark";
};

export function PageIntro({ index, eyebrow, title, description, aside, tone = "cream" }: PageIntroProps) {
  return (
    <section className={"page-intro page-intro-" + tone}>
      <div className="page-folio">{index}</div>
      <div>
        <p className="kicker">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      <div className="page-intro-copy">
        <p>{description}</p>
        {aside ? <small>{aside}</small> : null}
      </div>
    </section>
  );
}
