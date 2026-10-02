import { Link } from "react-router-dom";
import { config, contactPhoneDisplay, contactPhoneHref, whatsappHref } from "../config";

const SOCIAL_LABELS = [
  { key: "facebook", icon: "📘", label: "Facebook" },
  { key: "instagram", icon: "📷", label: "Instagram" },
  { key: "twitter", icon: "🐦", label: "X" },
  { key: "youtube", icon: "🎬", label: "YouTube" },
];

export default function Footer() {
  const socials = SOCIAL_LABELS.filter((item) => config.socials[item.key]);

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-section">
            <div className="footer-brand">
              COFFEELAND <span>FC</span>
            </div>
            <p>Developing football talent in Chikmagalur since 2010. KSFA affiliated club committed to grassroots excellence.</p>
            {socials.length > 0 && (
              <div className="footer-social-icons">
                {socials.map((item) => (
                  <a
                    key={item.key}
                    href={config.socials[item.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon"
                    title={item.label}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="footer-links-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/academy">Academy</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/sponsors">Sponsors</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-contact-section">
            <h4>Contact</h4>
            <p>📍 District Field &amp; Kalyan Nagar Turf, Chikkamagaluru – 577101</p>
            <p>
              📞 <a href={contactPhoneHref}>{contactPhoneDisplay}</a>
            </p>
            <p>
              💬 <a href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
            </p>
            <p>🕒 Morning 6:00 AM – 7:30 AM &amp; Evening 5:00 PM – 6:30 PM</p>
            <p>✉️ <a href={`mailto:${config.email}`}>{config.email}</a></p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Coffeeland FC Academy, Chikmagalur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}