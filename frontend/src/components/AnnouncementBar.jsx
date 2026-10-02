import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "coffeeland-announcement-dismissed";

export default function AnnouncementBar({
  message = "Registration Open: CFC Summer Cup 2026 5-a-side tournament — May 15–16",
  link = "/events",
  linkLabel = "Register Now",
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(STORAGE_KEY) !== "1");
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  if (!visible) return null;

  return (
    <div className="announcement-bar" role="banner">
      <div className="announcement-bar-inner">
        <span className="announcement-bar-icon">🏆</span>
        <p className="announcement-bar-message">{message}</p>
        <Link to={link} className="announcement-bar-link">
          {linkLabel} <span aria-hidden="true">→</span>
        </Link>
        <button
          type="button"
          className="announcement-bar-close"
          aria-label="Dismiss announcement"
          onClick={dismiss}
        >
          ×
        </button>
      </div>
    </div>
  );
}