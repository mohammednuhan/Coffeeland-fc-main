import { useEffect } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";

export default function Events() {
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
                        Events & <span className="accent">Tournaments</span>
                    </h1>
                    <p className="fade-in-up-delay-1">Celebrating victories, hosting competitions, and building community</p>
                </div>
            </div>

            <section className="animate-on-scroll">
                <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
                    <h2 className="section-title">
                        Upcoming <span className="accent">Events</span>
                    </h2>
                    <p className="section-subtitle">Register your team for our upcoming local tournaments.</p>

                    <CountdownTimer
                        target={new Date().getFullYear() + "-05-15T09:00:00"}
                        title="CFC Summer Cup 2026"
                        subtitle="Registration closes in"
                        eventDate="Tournament: May 15 – 16, 2026"
                    />

                    <div className="card gold-border event-register-card">
                        <span className="badge badge-inline" style={{ background: "var(--accent)", marginBottom: "1rem" }}>
                            REGISTRATION OPEN
                        </span>
                        <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>CFC Summer Cup 2026</h3>
                        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                            A high-intensity 5-a-side tournament for U15 and Open age categories. Cash prizes, trophies, and individual awards.
                        </p>
                        <div className="event-details">
                            <div>📅 May 15 - May 16, 2026</div>
                            <div>📍 District Field, Chikmagalur</div>
                            <div>💰 Entry Fee: ₹1,500/team</div>
                        </div>

                        <Link to="/contact" className="btn-primary" style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}>
                            Register Team Now
                        </Link>
                    </div>
                </div>
            </section>

            <section style={{ background: "var(--bg-alt)" }} className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Past <span className="accent">Glory</span>
                    </h2>
                    <p className="section-subtitle">
                        Highlights from tournaments we&apos;ve conquered and hosted.
                    </p>

                    <div className="programs-grid stagger-children">
                        <div className="card">
                            <img src="/dasara-champions.jpeg" alt="Dasara Cup" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px", marginBottom: "1rem", transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            />
                            <h3 style={{ marginBottom: "0.5rem" }}>Dasara Cup Champions</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                The Senior Team lifting the prestigious Dasara Cup after a thrilling final penalty shootout victory.
                            </p>
                        </div>
                        <div className="card">
                            <img src="/c-division-prize.jpeg" alt="C-Division Tournament" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px", marginBottom: "1rem", transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            />
                            <h3 style={{ marginBottom: "0.5rem" }}>C-Division League Runners-up</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                A phenomenal run in the KSFA C-Division League, earning a promotion spot to higher tiers.
                            </p>
                        </div>
                        <div className="card">
                            <img src="/tournament-winners.jpeg" alt="Youth Tournament" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px", marginBottom: "1rem", transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            />
                            <h3 style={{ marginBottom: "0.5rem" }}>U15 District Tournament Winners</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                Our youth squad dominated the local district tournament, showcasing the strength of our grassroots program.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}