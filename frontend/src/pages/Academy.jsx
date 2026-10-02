import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Academy() {
    const [showFees, setShowFees] = useState(false);

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
            <div className="page-header">
                <div className="container">
                    <h1 className="fade-in-up">
                        The <span className="accent">Academy</span>
                    </h1>
                    <p className="fade-in-up-delay-1">Where champions are made — structured training for every age group</p>
                </div>
            </div>

            <section className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Why Choose <span className="accent">Coffeeland FC?</span>
                    </h2>
                    <p className="section-subtitle">
                        We provide a professional, nurturing environment for aspiring footballers.
                    </p>
                    <div className="programs-grid stagger-children">
                        {[
                            { icon: "🎯", title: "Qualified Coaches", desc: "Certified and experienced coaching staff focused on player development." },
                            { icon: "📋", title: "Structured Sessions", desc: "Age-appropriate training plans with progressive skill development." },
                            { icon: "💪", title: "Discipline & Fitness", desc: "Building physical endurance, mental strength, and healthy habits." },
                            { icon: "🌟", title: "Character Building", desc: "Teamwork, sportsmanship, and leadership skills on and off the field." },
                        ].map((item, i) => (
                            <div className="card" key={i} style={{ textAlign: "center" }}>
                                <div style={{
                                    fontSize: "2.5rem", marginBottom: "1rem",
                                    transition: "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.3) rotate(-10deg)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) rotate(0)"}
                                >{item.icon}</div>
                                <h3 style={{ marginBottom: "0.5rem" }}>{item.title}</h3>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ background: "var(--bg-alt)" }} className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Age <span className="accent">Groups</span>
                    </h2>
                    <p className="section-subtitle">
                        We accept players from age 6 and above. Each group has tailored programs for maximum development.
                    </p>

                    {/* Age Group Cards */}
                    <div className="age-cards-grid">
                        <div className="age-card">
                            <div className="age-card-icon">👶</div>
                            <div className="age-card-age">6 – 8</div>
                            <h3 className="age-card-title">U8 Grassroots</h3>
                            <p className="age-card-desc">Introduction to football through fun activities, basic ball skills, and coordination games.</p>
                            <div className="age-card-schedule">Mon – Sat | Morning & Evening</div>
                            <div className="age-card-schedule">6:00 AM – 7:30 AM &amp; 5:00 PM – 6:30 PM</div>
                            <div className="age-card-schedule">📍 District Field / Kalyan Nagar</div>
                            <div className="age-card-schedule">🤝 Friendly match every session</div>
                        </div>
                        <div className="age-card">
                            <div className="age-card-icon">⚽</div>
                            <div className="age-card-age">9 – 12</div>
                            <h3 className="age-card-title">U12 Development</h3>
                            <p className="age-card-desc">Building technique, game sense, and introducing competitive small-sided matches.</p>
                            <div className="age-card-schedule">Mon – Sat | Morning & Evening</div>
                            <div className="age-card-schedule">6:00 AM – 7:30 AM &amp; 5:00 PM – 6:30 PM</div>
                            <div className="age-card-schedule">📍 District Field / Kalyan Nagar</div>
                            <div className="age-card-schedule">🤝 Friendly match every session</div>
                        </div>
                        <div className="age-card">
                            <div className="age-card-icon">🔥</div>
                            <div className="age-card-age">13 – 15</div>
                            <h3 className="age-card-title">U15 Competitive</h3>
                            <p className="age-card-desc">Advanced tactical play, match simulation, and tournament preparation at district level.</p>
                            <div className="age-card-schedule">Mon – Sat | Morning & Evening</div>
                            <div className="age-card-schedule">6:00 AM – 7:30 AM &amp; 5:00 PM – 6:30 PM</div>
                            <div className="age-card-schedule">📍 District Field / Kalyan Nagar</div>
                            <div className="age-card-schedule">🤝 Friendly match every session</div>
                        </div>
                        <div className="age-card">
                            <div className="age-card-icon">🏆</div>
                            <div className="age-card-age">16+</div>
                            <h3 className="age-card-title">Senior Elite</h3>
                            <p className="age-card-desc">KSFA C-Division &amp; Super Division competition. Full match preparation and league exposure.</p>
                            <div className="age-card-schedule">Daily | All Sessions</div>
                            <div className="age-card-schedule">6:00 AM – 7:30 AM &amp; 5:00 PM – 6:30 PM</div>
                            <div className="age-card-schedule">📍 District Field / Kalyan Nagar</div>
                            <div className="age-card-schedule">🤝 Friendly match every session</div>
                        </div>
                    </div>

                    {/* Detailed Table */}
                    <h2 className="section-title" style={{ marginTop: "4rem" }}>
                        Detailed <span className="accent">Program Info</span>
                    </h2>
                    <div className="table-wrapper">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Age Group</th>
                                    <th>Focus Area</th>
                                    <th>Batch &amp; Timing</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { icon: "👶", cat: "U8 — Grassroots", age: "6 – 8 years", focus: "Ball mastery, coordination, and fun-based learning", sched: "Morning 6:00 AM – 7:30 AM\nEvening 5:00 PM – 6:30 PM", loc: "District Field / Kalyan Nagar" },
                                    { icon: "⚽", cat: "U12 — Development", age: "9 – 12 years", focus: "Technique, game sense, and small-sided games", sched: "Morning 6:00 AM – 7:30 AM\nEvening 5:00 PM – 6:30 PM", loc: "District Field / Kalyan Nagar" },
                                    { icon: "🔥", cat: "U15 — Competitive", age: "13 – 15 years", focus: "Tactical play, match simulation, and tournament prep", sched: "Morning 6:00 AM – 7:30 AM\nEvening 5:00 PM – 6:30 PM", loc: "District Field / Kalyan Nagar" },
                                    { icon: "🏆", cat: "Senior — Elite", age: "16+ years", focus: "KSFA competition, C-Division & Super Division exposure", sched: "Morning 6:00 AM – 7:30 AM\nEvening 5:00 PM – 6:30 PM", loc: "District Field / Kalyan Nagar" },
                                ].map((row, i) => (
                                    <tr key={i}>
                                        <td>
                                            <span className="table-category-pill">
                                                <span className="pill-icon">{row.icon}</span>
                                                {row.cat}
                                            </span>
                                        </td>
                                        <td><strong style={{ color: "var(--text)" }}>{row.age}</strong></td>
                                        <td><span className="table-focus">{row.focus}</span></td>
                                        <td>
                                            <span className="table-schedule">🗓️ {row.sched.split("\n").map((line, j) => (
                                                <React.Fragment key={j}>{j > 0 && <br />}{line}</React.Fragment>
                                            ))}</span>
                                            <span className="table-schedule">🤝 Friendly match every session</span>
                                        </td>
                                        <td><span className="table-focus">📍 {row.loc}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ===== TRAINING GROUNDS SECTION ===== */}
            <section className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Training <span className="accent">Grounds</span>
                    </h2>
                    <p className="section-subtitle">
                        We train on two types of grounds to give our players diverse playing experience.
                    </p>
                    <div className="grounds-grid">
                        <div className="ground-card">
                            <div className="ground-card-header turf-header">
                                <span className="ground-icon">🟢</span>
                                <h3>Turf Ground</h3>
                            </div>
                            <div className="ground-card-body">
                                <p className="ground-desc">
                                    Our premium artificial turf ground provides a consistent, professional playing surface
                                    for focused training and competitive match practice.
                                </p>
                                <ul className="ground-features">
                                    <li><span className="ground-feature-icon">⚽</span> Artificial turf with FIFA-standard grass blades</li>
                                    <li><span className="ground-feature-icon">🌟</span> Floodlit for evening training sessions</li>
                                    <li><span className="ground-feature-icon">📐</span> Full-size and half-size pitch options</li>
                                    <li><span className="ground-feature-icon">✅</span> All-weather playing surface — no mud or waterlogging</li>
                                    <li><span className="ground-feature-icon">🎯</span> Ideal for tactical drills, small-sided games & match simulation</li>
                                </ul>
                                <div className="ground-timing">
                                    <span className="ground-timing-label">Training Hours</span>
                                    <span className="ground-timing-time">Morning 6:00 AM – 7:30 AM</span>
                                    <span className="ground-timing-time">Evening 5:00 PM – 6:30 PM</span>
                                </div>
                            </div>
                        </div>
                        <div className="ground-card">
                            <div className="ground-card-header mud-header">
                                <span className="ground-icon">🟤</span>
                                <h3>Mud / Clay Ground</h3>
                            </div>
                            <div className="ground-card-body">
                                <p className="ground-desc">
                                    Our traditional mud and clay ground provides authentic playing conditions that build
                                    strength, balance, and adaptability in young players.
                                </p>
                                <ul className="ground-features">
                                    <li><span className="ground-feature-icon">⚽</span> Natural mud/clay surface for real-world conditions</li>
                                    <li><span className="ground-feature-icon">💪</span> Builds core strength and footwork on uneven terrain</li>
                                    <li><span className="ground-feature-icon">👶</span> Perfect for U8 and U12 grassroots training</li>
                                    <li><span className="ground-feature-icon">🌧️</span> Morning sessions with optimal ground conditions</li>
                                    <li><span className="ground-feature-icon">🏃</span> Ideal for conditioning, endurance & ball control drills</li>
                                </ul>
                                <div className="ground-timing">
                                    <span className="ground-timing-label">Training Hours</span>
                                    <span className="ground-timing-time">Morning 6:00 AM – 7:30 AM</span>
                                    <span className="ground-timing-time">Evening 5:00 PM – 6:30 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Training <span className="accent">Locations</span>
                    </h2>
                    <p className="section-subtitle">
                        Our training centers in Chikmagalur — Morning Batch 6:00 AM – 7:30 AM &amp; Evening Batch 5:00 PM – 6:30 PM (1 hour 30 minutes each).
                    </p>
                    <div className="programs-grid">
                        <div className="card gold-border">
                            <h3 style={{ marginBottom: "0.8rem" }}>🏟️ District Field</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                                <strong style={{ color: "var(--text)" }}>Morning Batch:</strong> 6:00 AM – 7:30 AM
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                                <strong style={{ color: "var(--text)" }}>Evening Batch:</strong> 5:00 PM – 6:30 PM
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                                <strong style={{ color: "var(--text)" }}>Friendly Match:</strong> Conducted at the end of every session
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                Main training ground for all age groups. Natural mud/clay surface with ample space for drills and match play.
                            </p>
                        </div>
                        <div className="card gold-border">
                            <h3 style={{ marginBottom: "0.8rem" }}>⚽ Kalyan Nagar Turf</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                                <strong style={{ color: "var(--text)" }}>Morning Batch:</strong> 6:00 AM – 7:30 AM
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                                <strong style={{ color: "var(--text)" }}>Evening Batch:</strong> 5:00 PM – 6:30 PM
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                                <strong style={{ color: "var(--text)" }}>Friendly Match:</strong> Conducted at the end of every session
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                Dedicated artificial turf facility for focused training, match practice, and competitive play.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ background: "var(--bg-alt)" }} className="animate-on-scroll">
                <div className="container" style={{ textAlign: "center" }}>
                    <h2 className="section-title">
                        Fee <span className="accent">Structure</span>
                    </h2>
                    <p className="section-subtitle">
                        Affordable plans to make football accessible to everyone.
                    </p>
                    {!showFees ? (
                        <div>
                            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                                Click below to view our fee structure.
                            </p>
                            <button className="btn-primary" onClick={() => setShowFees(true)}>
                                View Fee Structure
                            </button>
                        </div>
                    ) : (
                        <div className="packages-grid stagger-children">
                            <div className="package-card">
                                <h3>Monthly</h3>
                                <div className="package-price">₹1,000<small>/mo</small></div>
                                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Perfect for beginners testing their skills.</p>
                                <Link to="/contact" className="btn-outline full-width">Enroll Now</Link>
                            </div>
                            <div className="package-card featured" style={{ position: "relative" }}>
                                <span className="badge">Most Popular</span>
                                <h3>Quarterly</h3>
                                <div className="package-price">₹4,000<small>/3mo</small></div>
                                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Consistent training with discounted rate.</p>
                                <Link to="/contact" className="btn-primary full-width">Enroll Now</Link>
                            </div>
                            <div className="package-card">
                                <h3>Annual</h3>
                                <div className="package-price">₹10,000<small>/yr</small></div>
                                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Full commitment with elite perks.</p>
                                <Link to="/contact" className="btn-outline full-width">Enroll Now</Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Training <span className="accent">Gallery</span>
                    </h2>
                    <p className="section-subtitle">Snapshots from the field — action, dedication, and teamwork.</p>
                    <div className="gallery-grid stagger-children">
                        {[
                            { src: "/team-photo.jpeg", alt: "Team Photo" },
                            { src: "/dasara-champions.jpeg", alt: "Dasara Champions" },
                            { src: "/tournament-winners.jpeg", alt: "Tournament Winners" },
                            { src: "/c-division-prize.jpeg", alt: "C-Division" },
                            { src: "/ksfa-stadium.jpeg", alt: "KSFA Stadium" },
                        ].map((img, i) => (
                            <div className="gallery-item" key={i}>
                                <img src={img.src} alt={img.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <h2 className="fade-in-up">Ready to <span className="accent">Join the Academy?</span></h2>
                    <p className="fade-in-up-delay-1">Take the first step towards your football career with Coffeeland FC.</p>
                    <Link to="/contact" className="btn-primary fade-in-up-delay-2" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
                        Register Now ⚽
                    </Link>
                </div>
            </section>
        </>
    );
}