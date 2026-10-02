import { useEffect } from "react";
import { Link } from "react-router-dom";

const PARTNERS = [
    {
        name: "Kanasu Convention Hall",
        icon: "🏛️",
        category: "Venue Partner",
        badge: "Our Sponsor",
        blurb: "Home venue partner — hosting our league matches, district tournaments and academy events.",
    },
];

const OPEN_PARTNER_SLOTS = 5;

export default function Sponsors() {
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
                        Our <span className="accent">Sponsors</span>
                    </h1>
                    <p className="fade-in-up-delay-1">Partnering with local businesses to fuel Chikmagalur&apos;s football dreams</p>
                </div>
            </div>

            <section className="animate-on-scroll">
                <div className="container">
                    <div className="content-grid" style={{ alignItems: "center" }}>
                        <div>
                            <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
                                Why Sponsor <span className="accent">CFC?</span>
                            </h2>
                            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "1.5rem" }}>
                                By sponsoring Coffeeland FC, you are directly investing in the youth of Chikmagalur. You provide them with
                                better equipment, facility access, exposure trips, and professional coaching.
                            </p>
                            <ul className="content-list">
                                <li><strong>Grassroots Impact:</strong> Keep football accessible for all children.</li>
                                <li><strong>Community Visibility:</strong> Reach over 400+ families and thousands of local spectators.</li>
                                <li><strong>Jersey Branding:</strong> Your logo on our matchdays and training kits.</li>
                                <li><strong>Tournament Branding:</strong> High visibility during the district tournaments we host.</li>
                            </ul>
                        </div>
                        <div className="card gold-border" style={{ padding: "3rem", background: "var(--surface-accent)", textAlign: "center" }}>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--white)" }}>Join Our Legacy</h3>
                            <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                                Looking to support the community and boost your local brand presence? Let&apos;s team up.
                            </p>
                            <Link to="/contact" className="btn-primary full-width">
                                Inquire About Sponsorship
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ background: "var(--bg-alt)" }} className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Sponsorship <span className="accent">Packages</span>
                    </h2>
                    <p className="section-subtitle">
                        Choose a tier that aligns with your brand&apos;s community goals.
                    </p>

                    <div className="packages-grid stagger-children">
                        <div className="package-card">
                            <h3>Jersey Sponsor</h3>
                            <div className="package-price">₹5,000<small>/yr</small></div>
                            <ul className="package-features">
                                <li>Small logo on training kits</li>
                                <li>Website acknowledgment</li>
                                <li>Social media mention</li>
                            </ul>
                        </div>

                        <div className="package-card featured" style={{ position: "relative" }}>
                            <span className="badge">Best Value</span>
                            <h3>Event Sponsor</h3>
                            <div className="package-price">₹6,000<small>/event</small></div>
                            <ul className="package-features">
                                <li>Prominent banners at the tournament</li>
                                <li>Logo on marketing materials</li>
                                <li>Exclusive pre-match announcements</li>
                            </ul>
                        </div>

                        <div className="package-card" style={{ borderColor: "var(--accent)" }}>
                            <h3 style={{ color: "var(--accent)" }}>Title Sponsor</h3>
                            <div className="package-price">Custom</div>
                            <ul className="package-features">
                                <li>Front center of match jersey</li>
                                <li>Premium web placement</li>
                                <li>Maximum brand exposure</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Our Current <span className="accent">Partners</span>
                    </h2>
                    <p className="section-subtitle">
                        The amazing businesses that help us keep the dream alive.
                    </p>

                    <div className="sponsors-grid stagger-children">
                        {PARTNERS.map((partner) => (
                            <div className="sponsor-card" key={partner.name}>
                                <span className="sponsor-card-badge">{partner.badge}</span>
                                <div className="sponsor-card-icon">{partner.icon}</div>
                                <h3 className="sponsor-card-name">{partner.name}</h3>
                                <p className="sponsor-card-category">{partner.category}</p>
                                <p className="sponsor-card-blurb">{partner.blurb}</p>
                            </div>
                        ))}

                        {Array.from({ length: OPEN_PARTNER_SLOTS }, (_, i) => (
                            <div className="sponsor-placeholder" style={{ width: "200px", height: "100px", fontSize: "1rem" }} key={i}>
                                Partner {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}