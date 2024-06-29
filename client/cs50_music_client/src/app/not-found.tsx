import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not_found__block">
      <h2>404 Not Found</h2>
      <p className="not_found__text">
        The page with this address does not exist.
      </p>
      <Link className="not_found__link" href="/">
        Go to Home page
      </Link>
    </div>
  );
}
