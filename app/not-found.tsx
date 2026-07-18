import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <span>404</span>
      <p className="kicker">This path has moved</p>
      <h1>The next useful direction is <i>back this way.</i></h1>
      <Link className="button button-red" href="/">Return home <span aria-hidden="true">NW</span></Link>
    </section>
  );
}
