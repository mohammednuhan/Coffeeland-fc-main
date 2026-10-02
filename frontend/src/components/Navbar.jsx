import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const dropdownRef = useRef(null);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const closeDropdown = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: "🏠", desc: "Back to the homepage" },
    { href: "/about", label: "About", icon: "🏛️", desc: "Our story & mission" },
    { href: "/academy", label: "Academy", icon: "⚽", desc: "Training programs & camps" },
    { href: "/events", label: "Events", icon: "📅", desc: "Fixtures & summer camps" },
    { href: "/news", label: "News", icon: "📰", desc: "Latest club updates" },
    { href: "/sponsors", label: "Sponsors", icon: "🤝", desc: "Our partners" },
    { href: "/contact", label: "Contact", icon: "✉️", desc: "Get in touch with us" },
  ];

  return (
    <header style={scrolled ? { background: "rgba(10, 18, 12, 0.97)", borderBottom: "1px solid rgba(212, 175, 55, 0.2)" } : {}}>
      <nav>
        <Link to="/" className="logo-container" onClick={closeMenu}>
          <img src="/coffee-land-logo.jpeg" alt="Coffeeland FC Logo" className="nav-logo" />
          <div className="logo-text">
            COFFEELAND <span>FC</span>
          </div>
        </Link>

        <div className="nav-actions">
          <div className="nav-dropdown-wrapper" ref={dropdownRef}>
            <button
              className={`nav-menu-trigger ${isMenuOpen ? "open" : ""}`}
              aria-label="Open Menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className={`nav-dropdown ${isMenuOpen ? "show" : ""}`}>
              <div className="nav-dropdown-inner">
                <div className="nav-dropdown-header">Navigate</div>
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`nav-dropdown-item ${pathname === item.href ? "active" : ""}`}
                    onClick={closeDropdown}
                  >
                    <span className="nav-dropdown-item-label">
                      <span className="nav-dropdown-item-icon">{item.icon}</span>
                      {item.label}
                    </span>
                    <span className="nav-dropdown-item-desc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/contact" className="nav-join-btn" onClick={closeMenu}>
            <span className="nav-join-icon">⚽</span>
            <span className="nav-join-text">Join Now</span>
          </Link>
        </div>

        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? "open-menu" : ""}`}
          aria-label="Toggle Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {isMobileMenuOpen && (
          <div className="nav-backdrop" onClick={closeMenu} aria-hidden="true"></div>
        )}

        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          {navLinks.map((item) => (
            <li key={item.href} className="nav-item">
              <Link
                to={item.href}
                className={pathname === item.href ? "nav-active" : ""}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}