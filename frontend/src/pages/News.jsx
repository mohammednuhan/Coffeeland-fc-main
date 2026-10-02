import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function News() {
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
                        Club <span className="accent">News</span>
                    </h1>
                    <p className="fade-in-up-delay-1">Stay updated with the latest match results, player achievements, and announcements</p>
                </div>
            </div>

            <section className="animate-on-scroll" style={{ background: "var(--bg)" }}>
                <div className="container" style={{ maxWidth: "900px" }}>

                    <article className="card gold-border" style={{ marginBottom: "2rem" }}>
                        <div className="news-meta">
                            <span className="news-tag" style={{ background: "var(--primary)", color: "var(--white)" }}>
                                Match Result
                            </span>
                            <span className="news-date">March 8, 2026</span>
                        </div>
                        <h2 className="news-title">CFC Senior Team Secures Crucial 2-1 Victory</h2>
                        <img src="/c-division-prize.jpeg" alt="Match Details" className="news-article-img" />
                        <p className="news-body">
                            In a thrilling encounter at the District Field, Coffeeland FC&apos;s Senior Team produced a magnificent comeback to win 2-1 against rivals. After conceding an early penalty, two second-half goals from our academy graduates secured all three points in the C-Division League.
                        </p>
                        <Link to="/contact" className="btn-outline" style={{ display: "inline-block", marginTop: "1.5rem" }}>
                            Read Full Report
                        </Link>
                    </article>

                    <article className="card" style={{ marginBottom: "2rem" }}>
                        <div className="news-meta">
                            <span className="news-tag" style={{ background: "var(--accent)", color: "var(--bg)" }}>
                                Announcement
                            </span>
                            <span className="news-date">February 28, 2026</span>
                        </div>
                        <h2 className="news-title">Registration Open for Summer Football Camp 2026</h2>
                        <p className="news-body">
                            We are excited to announce our annual Summer Football Camp for boys and girls aged 6 to 15. The camp will focus on intensive skill development, small-sided games, and fostering a deep love for the sport. Spaces are limited, so early booking is highly recommended!
                        </p>
                        <Link to="/events" className="btn-outline" style={{ display: "inline-block", marginTop: "1.5rem" }}>
                            View Camp Details
                        </Link>
                    </article>

                    <article className="card" style={{ marginBottom: "2rem" }}>
                        <div className="news-meta">
                            <span className="news-tag" style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--text)" }}>
                                Player Achievement
                            </span>
                            <span className="news-date">February 15, 2026</span>
                        </div>
                        <h2 className="news-title">Three CFC Youth Players Selected for State Trials</h2>
                        <img src="/tournament-winners.jpeg" alt="Youth Players" className="news-article-img" />
                        <p className="news-body">
                            Massive congratulations to Rohan, Aarav, and Karthik from our U15 squad for being shortlisted for the Karnataka State team trials. This is a testament to their hard work, dedication, and the structured pathway provided by the Coffeeland FC coaching staff.
                        </p>
                    </article>

                    <div style={{ textAlign: "center", marginTop: "3rem" }}>
                        <Link to="/contact" className="btn-secondary">
                            Get the latest updates on WhatsApp
                        </Link>
                    </div>

                </div>
            </section>
        </>
    );
}