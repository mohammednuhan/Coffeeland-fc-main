import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught UI error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            textAlign: "center",
            padding: "3rem 1.5rem",
          }}
        >
          <div style={{ fontSize: "3rem" }}>⚽</div>
          <h2 style={{ margin: 0 }}>Something went wrong</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "28rem" }}>
            We hit an unexpected error while loading this page. Please try again, or call us on the
            number below and we will help you directly.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
              Reload Page
            </button>
            <a href="/contact" className="btn-outline">
              Contact Us
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}