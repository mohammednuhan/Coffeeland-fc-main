import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section style={{ minHeight: "70vh", display: "flex", alignItems: "center", paddingTop: "8rem" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(3rem, 10vw, 6rem)", marginBottom: "0.5rem" }}>404</h1>
        <h2 style={{ marginBottom: "1rem" }}>
          Page not <span className="accent">found</span>
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
          The page you are looking for has moved or no longer exists.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/academy" className="btn-outline">
            View Academy
          </Link>
        </div>
      </div>
    </section>
  );
}