import { useEffect } from "react";
import { Link } from "react-router-dom";

const COACHES = [
    {
        name: "Loyston Andrade",
        avatar: "⚽",
        badge: "C-License Certified",
        role: "Technical Director & Head Coach",
        stats: [
            { num: "5+", label: "Years Experience" },
            { num: "C", label: "License Level" },
            { num: "400+", label: "Players Coached" },
        ],
        bio: "Loyston Andrade is a C-License certified football coach with over 5 years of dedicated coaching experience. As the Technical Director and Head Coach at Coffeeland FC, he leads the academy's technical development program with a deep passion for grassroots football. His expertise spans across all age groups — from nurturing beginners in the U8 Grassroots program to preparing senior players for KSFA C-Division and Super Division competition. Under his guidance, Coffeeland FC has grown from a small initiative into one of Chikmagalur's most respected football academies with over 400 active students and multiple tournament victories.",
        tags: ["Grassroots Development", "KSFA C-Division", "Youth Training", "Match Strategy"],
    },
    {
        name: "Nithin",
        avatar: "🥋",
        badge: "B-License Certified",
        role: "Youth Development Coach",
        stats: [
            { num: "3+", label: "Years Experience" },
            { num: "B", label: "License Level" },
            { num: "150+", label: "Players Coached" },
        ],
        bio: "Nithin is a B-License certified coach who leads our youth development program for the U8 to U12 age groups. He focuses on building strong fundamentals — ball mastery, movement, and a genuine love for the game — in a fun and encouraging environment where every child gets plenty of touches on the ball.",
        tags: ["U8 – U12", "Ball Mastery", "Fun & Engagement", "Player Assessment"],
    },
    {
        name: "Rajesh",
        avatar: "💪",
        badge: "Certified Trainer",
        role: "Fitness & Goalkeeping Coach",
        stats: [
            { num: "4+", label: "Years Experience" },
            { num: "GK", label: "Specialism" },
            { num: "120+", label: "Players Coached" },
        ],
        bio: "Rajesh handles fitness conditioning and goalkeeping across the academy. He designs the warm-ups, strength and agility work, and match-preparation routines that keep our players injury-free and ready for competition, while personally mentoring our goalkeepers.",
        tags: ["Fitness & Agility", "Goalkeeping", "Injury Prevention", "Match Prep"],
    },
];

export default function About() {
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
                        About <span className="accent">Us</span>
                    </h1>
                    <p className="fade-in-up-delay-1">The story behind Chikmagalur&apos;s most passionate football club</p>
                </div>
            </div>

            <section className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Our <span className="accent">Story</span>
                    </h2>
                    <p className="section-subtitle">
                        From humble beginnings to a 400+ player academy — here&apos;s our journey.
                    </p>
                    <div className="timeline">
                        {[
                            { year: "2010", text: "Coffeeland FC was founded with a vision to nurture football talent in Chikmagalur. Training began on public grounds with a handful of passionate young players." },
                            { year: "2016", text: "Officially registered as a football club. Started structured coaching programs and competitive participation in district-level tournaments." },
                            { year: "2018", text: "Launched the Football Academy with age-specific training groups. Achieved KSFA affiliation and began competing in the C-Division League." },
                            { year: "2020–2024", text: "Grew to 400+ active students. Became consistent Dasara tournament champions. Players promoted to Super Division exposure matches." },
                            { year: "2025+", text: "Expanding training centers, hosting district tournaments, and building pathways for players to advance into elite football divisions." },
                        ].map((item, i) => (
                            <div className="timeline-item" key={i}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <div className="timeline-year">{item.year}</div>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ background: "var(--bg-alt)" }} className="animate-on-scroll">
                <div className="container">
                    <div className="content-grid">
                        <div>
                            <h2>
                                Our <span className="accent">Mission</span>
                            </h2>
                            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "2rem" }}>
                                To build disciplined, skilled, and confident footballers through structured
                                grassroots development. We believe every child deserves access to quality coaching
                                and a pathway to achieve their full potential.
                            </p>
                            <ul className="content-list">
                                <li>Structured grassroots development programs</li>
                                <li>Character building through sport</li>
                                <li>Discipline, teamwork, and sportsmanship</li>
                                <li>Equal opportunity for all age groups</li>
                            </ul>
                        </div>
                        <div>
                            <h2>
                                Our <span className="accent">Vision</span>
                            </h2>
                            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "2rem" }}>
                                To represent Chikmagalur at higher competitive levels including professional
                                leagues, and to become the premier football development center in Karnataka.
                            </p>
                            <ul className="content-list">
                                <li>Compete in Super Division and beyond</li>
                                <li>Produce professional-level players</li>
                                <li>Establish a state-of-the-art training facility</li>
                                <li>Create a sustainable football ecosystem in the region</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="animate-on-scroll" id="coaches">
                <div className="container">
                    <h2 className="section-title">
                        Our <span className="accent">Coaches</span>
                    </h2>
                    <p className="section-subtitle">
                        Guided by experienced professionals passionate about developing the next generation.
                    </p>

                    {/* Main Coach Card - COACHES[0] */}
                    <div className="coach-main-card">
                        <div className="coach-main-left">
                            <div className="coach-main-avatar">
                                <span>{COACHES[0].avatar}</span>
                            </div>
                            <div className="coach-main-cert-badge">{COACHES[0].badge}</div>
                        </div>
                        <div className="coach-main-right">
                            <h3 className="coach-main-name">{COACHES[0].name}</h3>
                            <p className="coach-main-role">{COACHES[0].role}</p>
                            <div className="coach-main-stats">
                                {COACHES[0].stats.map((stat) => (
                                    <div className="coach-stat-item" key={stat.label}>
                                        <span className="coach-stat-num">{stat.num}</span>
                                        <span className="coach-stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="coach-main-bio">{COACHES[0].bio}</p>
                            <div className="coach-main-tags">
                                {COACHES[0].tags.map((tag) => (
                                    <span className="coach-tag" key={tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Full list of coaches */}
                    <h3 className="coach-staff-title">Our <span className="accent">Coaching Staff</span></h3>
                    <p className="coach-staff-sub">
                        The full team behind every training session, match day and tournament campaign.
                    </p>
                    <div className="coach-staff-grid">
                        {COACHES.map((coach) => (
                            <div className="card gold-border coach-staff-card" key={coach.name}>
                                <div className="coach-staff-avatar">{coach.avatar}</div>
                                <h4 className="coach-staff-name">{coach.name}</h4>
                                <p className="coach-staff-role">{coach.role}</p>
                                <p className="coach-staff-badge">{coach.badge}</p>
                                <p className="coach-staff-bio">{coach.bio}</p>
                                <div className="coach-staff-tags">
                                    {coach.tags.map((tag) => (
                                        <span className="coach-tag" key={tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Supporting Team */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
                        <div className="card" style={{ textAlign: "center" }}>
                            <div style={{
                                width: "100px", height: "100px", borderRadius: "50%",
                                background: "var(--gradient-green)", margin: "0 auto 1.5rem",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "2.5rem", transition: "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(360deg) scale(1.1)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0) scale(1)"}
                            >
                                🏆
                            </div>
                            <h3 style={{ marginBottom: "0.5rem" }}>Core Management Team</h3>
                            <p style={{ color: "var(--accent)", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>
                                Operations & Strategy
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                A dedicated team managing operations, events, partnerships, and ensuring the academy runs at the highest standards.
                            </p>
                        </div>
                        <div className="card" style={{ textAlign: "center" }}>
                            <div style={{
                                width: "100px", height: "100px", borderRadius: "50%",
                                background: "var(--gradient-green)", margin: "0 auto 1.5rem",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "2.5rem", transition: "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(360deg) scale(1.1)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0) scale(1)"}
                            >
                                👥
                            </div>
                            <h3 style={{ marginBottom: "0.5rem" }}>Assistant Coaches</h3>
                            <p style={{ color: "var(--accent)", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>
                                Training & Development
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                Supporting the head coach with day-to-day training sessions, fitness programs, and player assessment across all age categories.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <h2 className="fade-in-up">
                        Want to be part of <span className="accent">our story?</span>
                    </h2>
                    <p className="fade-in-up-delay-1">Join the fastest-growing football academy in Chikmagalur.</p>
                    <Link to="/contact" className="btn-primary fade-in-up-delay-2" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
                        Join Coffeeland FC ⚽
                    </Link>
                </div>
            </section>
        </>
    );
}