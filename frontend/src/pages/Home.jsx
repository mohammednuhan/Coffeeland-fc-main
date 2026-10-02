import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import GalleryLightbox from "../components/GalleryLightbox";
import TestimonialCarousel from "../components/TestimonialCarousel";

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(current);
    }, 30);
    return () => clearInterval(timer);
  }, [started, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function HeroSlides() {
  const [index, setIndex] = useState(0);
  const slides = [
    { image: "/team-photo.jpeg", label: "First Team in Action" },
    { image: "/dasara-champions.jpeg", label: "Champions of Dasara Cup" },
    { image: "/ksfa-stadium.jpeg", label: "Competing at KSFA Stadium" },
    { image: "/tournament-winners.jpeg", label: "Tournament Winners" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="hero-slider">
      {slides.map((slide, i) => (
        <div key={i} className={`hero-slide ${i === index ? "active" : ""}`}>
          <img src={slide.image} alt={slide.label} />
          <div className="hero-slide-caption">{slide.label}</div>
        </div>
      ))}
      <div className="hero-slider-dots">
        {slides.map((_, i) => (
          <span key={i} className={`dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)}></span>
        ))}
      </div>
    </div>
  );
}

function HomeMarquee() {
  const items = [
    "⚽ Grassroots (U8)",
    "⚽ Youth (U12–U15)",
    "⚽ Senior Team",
    "⚽ Summer Camps",
    "🏆 KSFA C-Division",
    "⚽ Match Exposure",
    "🥇 District Tournaments",
  ];
  return (
    <div className="home-marquee">
      <div className="home-marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="home-marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-eyebrow fade-in-up">⚽ KSFA Affiliated Football Club</span>
              <h1 className="fade-in-up">
                COFFEELAND <span className="accent">FC</span>
              </h1>
              <p className="hero-tagline fade-in-up-delay-1">Together Towards Tomorrow</p>
              <p className="hero-sub fade-in-up-delay-2">
                Chikkamagaluru&apos;s premier academy developing football talent since 2010.
                From grassroots beginners to KSFA C-Division competitors — build your football future with us.
              </p>
              <div className="hero-feature-row fade-in-up-delay-2">
                <div className="hero-feature">
                  <span className="hero-feature-icon">🏅</span>
                  <div>
                    <strong>KSFA</strong>
                    <small>Registered Club</small>
                  </div>
                </div>
                <div className="hero-feature">
                  <span className="hero-feature-icon">🧑‍🏫</span>
                  <div>
                    <strong>Elite</strong>
                    <small>Coaching Staff</small>
                  </div>
                </div>
                <div className="hero-feature">
                  <span className="hero-feature-icon">🏟️</span>
                  <div>
                    <strong>League</strong>
                    <small>Match Exposure</small>
                  </div>
                </div>
              </div>
              <div className="hero-stats-inline fade-in-up-delay-2">
                <span className="stat-badge">🏆 <AnimatedCounter target={25} suffix="+" /> Trophies</span>
                <span className="stat-badge">👥 <AnimatedCounter target={400} suffix="+" /> Players</span>
                <span className="stat-badge">⭐ 5.0 Rating</span>
              </div>
              <div className="hero-btns fade-in-up-delay-2">
                <Link to="/contact" className="btn-primary hero-cta">⚽ Join Academy</Link>
                <Link to="/events" className="btn-outline">📅 View Events</Link>
              </div>
            </div>
            <div className="hero-visual fade-in-up-delay-1">
              <div className="hero-slider-ring">
                <HeroSlides />
                <div className="hero-float-chip chip-tl">⭐ 5.0 Rated</div>
                <div className="hero-float-chip chip-br">🏆 25+ Trophies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <HomeMarquee />

      {/* ===== QUICK STATS ===== */}
      <div className="quick-stats">
        <div className="container">
          <div className="quick-stats-grid">
            <div className="quick-stat">
              <span className="quick-stat-icon">🏫</span>
              <span className="quick-stat-num"><AnimatedCounter target={14} suffix="+" /></span>
              <span className="quick-stat-label">Years of Football</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-icon">👨‍👩‍👧‍👦</span>
              <span className="quick-stat-num"><AnimatedCounter target={400} suffix="+" /></span>
              <span className="quick-stat-label">Active Students</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-icon">⚽</span>
              <span className="quick-stat-num">6+</span>
              <span className="quick-stat-label">Age Groups</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-icon">🏆</span>
              <span className="quick-stat-num">100%</span>
              <span className="quick-stat-label">KSFA Recognized</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="home-about animate-on-scroll">
        <div className="container">
          <div className="home-about-grid">
            <div className="home-about-text">
              <span className="section-eyebrow">About The Club</span>
              <h2>
                Building Champions <span className="accent">Since 2010</span>
              </h2>
              <p>
                Coffeeland FC was founded with a vision to nurture football talent in Chikmagalur.
                What started with a handful of passionate players has grown into one of the region&apos;s
                most respected football academies with over 400 active students.
              </p>
              <div className="home-about-highlights">
                <div className="home-highlight-item">
                  <span className="highlight-check">✓</span>
                  <span>KSFA Affiliated & Recognized</span>
                </div>
                <div className="home-highlight-item">
                  <span className="highlight-check">✓</span>
                  <span>C-Division League Competitors</span>
                </div>
                <div className="home-highlight-item">
                  <span className="highlight-check">✓</span>
                  <span>Multiple Tournament Champions</span>
                </div>
                <div className="home-highlight-item">
                  <span className="highlight-check">✓</span>
                  <span>Professional Coaching Staff</span>
                </div>
              </div>
              <Link to="/about" className="btn-primary" style={{ marginTop: "1.5rem" }}>
                Learn More About Us
              </Link>
            </div>
            <div className="home-about-visual">
              <div className="home-about-image-stack">
                <img src="/team-photo.jpeg" alt="Coffeeland FC Team" className="home-about-img home-about-img-1" />
                <img src="/dasara-champions.jpeg" alt="Dasara Champions" className="home-about-img home-about-img-2" />
                <div className="home-about-badge">
                  <span className="badge-year">14+</span>
                  <span className="badge-label">Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS PREVIEW ===== */}
      <section className="home-programs animate-on-scroll">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">What We Offer</span>
            <h2>Our <span className="accent">Programs</span></h2>
            <p className="section-subtitle">
              From grassroots to competitive football — we have programs for every age and skill level.
            </p>
          </div>
          <div className="home-programs-grid">
            <div className="home-program-card">
              <div className="home-program-icon">👶</div>
              <h3>Grassroots (U8)</h3>
              <p>Fun-based learning for ages 6–8. Ball mastery, coordination, and building love for the game.</p>
              <Link to="/academy" className="home-program-link">Explore →</Link>
            </div>
            <div className="home-program-card">
              <div className="home-program-icon">⚽</div>
              <h3>Development (U12)</h3>
              <p>Technique and game sense for ages 9–12. Small-sided games and progressive skill building.</p>
              <Link to="/academy" className="home-program-link">Explore →</Link>
            </div>
            <div className="home-program-card">
              <div className="home-program-icon">🔥</div>
              <h3>Competitive (U15)</h3>
              <p>Tactical play and match simulation for ages 13–15. Tournament preparation and strategy.</p>
              <Link to="/academy" className="home-program-link">Explore →</Link>
            </div>
            <div className="home-program-card">
              <div className="home-program-icon">🏆</div>
              <h3>Senior Elite</h3>
              <p>KSFA competition preparation for 16+ players. C-Division and Super Division exposure.</p>
              <Link to="/academy" className="home-program-link">Explore →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COACHES PREVIEW ===== */}
      <section className="home-coaches animate-on-scroll">
        <div className="container">
          <div className="home-coaches-grid">
            <div className="home-coaches-text">
              <span className="section-eyebrow">Meet Our Team</span>
              <h2>Expert <span className="accent">Coaches</span></h2>
              <p>
                Our coaching staff brings professional experience and certifications to develop
                every player to their full potential. Led by Loyston Andrade, a C-License certified
                coach with 5+ years of dedicated coaching experience.
              </p>
              <Link to="/about#coaches" className="btn-outline" style={{ marginTop: "1rem" }}>
                Meet The Team
              </Link>
            </div>
            <div className="home-coaches-cards">
              <div className="home-coach-card">
                <div className="home-coach-avatar">⚽</div>
                <h4>Loyston Andrade</h4>
                <p className="home-coach-role">Technical Director & Head Coach</p>
                <p className="home-coach-badge">C-License Certified</p>
              </div>
              <div className="home-coach-card">
                <div className="home-coach-avatar">🏆</div>
                <h4>Core Team</h4>
                <p className="home-coach-role">Operations & Strategy</p>
                <p className="home-coach-badge">Professional Staff</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="home-gallery animate-on-scroll">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">From The Field</span>
            <h2>Training <span className="accent">Gallery</span></h2>
            <p className="section-subtitle">Click any photo to view it full-screen.</p>
          </div>
          <GalleryLightbox />
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="home-testimonials animate-on-scroll">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Player & Parent Reviews</span>
            <h2>What Our <span className="accent">Family Says</span></h2>
            <p className="section-subtitle">Real experiences from the Coffeeland FC community.</p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta-section animate-on-scroll">
        <div className="container">
          <h2 className="fade-in-up">
            Ready to Start Your <span className="accent">Football Journey?</span>
          </h2>
          <p className="fade-in-up-delay-1">
            Join Coffeeland FC today and become part of Chikmagalur&apos;s fastest-growing football family.
          </p>
          <div className="cta-btns fade-in-up-delay-2">
            <Link to="/contact" className="btn-primary" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
              Join Academy ⚽
            </Link>
            <Link to="/academy" className="btn-outline" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}