import { useEffect, useState } from "react";
import {
  AGE_GROUPS,
  PLAYING_POSITIONS,
  TRAINING_BATCHES,
  TRAINING_LOCATIONS,
  contactPhoneDisplay,
  contactPhoneHref,
} from "../config";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [delivered, setDelivered] = useState(false);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSending(true);
        const form = e.target;

        const value = (name) => String(form.elements[name]?.value ?? "").trim();

        const data = {
            name: `${value("firstName")} ${value("lastName")}`.trim(),
            guardianName: value("guardianName"),
            email: value("email").toLowerCase(),
            phone: value("phone"),
            dob: value("dob"),
            ageGroup: value("ageGroup"),
            position: value("position"),
            location: value("location"),
            batch: value("batch"),
            experience: value("experience"),
            message: value("message"),
            inquiry: "academy",
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const body = await res.json().catch(() => null);

            if (!res.ok) {
                setError(body?.error || "Something went wrong. Please try again.");
                return;
            }

            form.reset();
            setDelivered(Boolean(body?.telegramSent));
            setSubmitted(true);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <div className="page-header">
                <div className="container" style={{ textAlign: "center" }}>
                    <h1 className="fade-in-up">
                        Academy <span className="accent">Registration</span>
                    </h1>
                    <p className="fade-in-up-delay-1">
                        Fill the registration form below. Our team will call you within 24 hours.
                    </p>
                </div>
            </div>

            <section className="animate-on-scroll">
                <div
                    className="container"
                    style={{
                        maxWidth: "760px",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div className="form-container" style={{ width: "100%", maxWidth: "100%", margin: "0 auto" }}>
                        <h2 style={{ marginBottom: "0.5rem", fontSize: "1.8rem", textAlign: "center" }}>
                            <span className="accent">Registration Form</span>
                        </h2>
                        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", textAlign: "center" }}>
                            Fields marked * are mandatory. Every session ends with a friendly match.
                        </p>

                        {submitted ? (
                            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                                <h3 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>
                                    {delivered ? "Registration Received!" : "Registration Saved"}
                                </h3>
                                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                                    {delivered
                                        ? "Thank you. Our coaching team has your details and will call you shortly to confirm your batch."
                                        : "Thank you. Our coaching team will call you shortly to confirm your batch."}
                                </p>
                                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                                    <a href={contactPhoneHref} className="btn-primary">
                                        📞 Call {contactPhoneDisplay}
                                    </a>
                                    <button type="button" className="btn-outline" onClick={() => setSubmitted(false)}>
                                        Register Another Player
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="reg-section">
                                    <div className="reg-section-title">1 · Player Details</div>

                                    <div className="form-group">
                                        <div>
                                            <label htmlFor="firstName">First Name *</label>
                                            <input type="text" id="firstName" name="firstName" required placeholder="John" />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text" id="lastName" name="lastName" placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div>
                                            <label htmlFor="dob">Date of Birth</label>
                                            <input type="date" id="dob" name="dob" />
                                        </div>
                                        <div>
                                            <label htmlFor="ageGroup">Age Group *</label>
                                            <select id="ageGroup" name="ageGroup" required defaultValue="">
                                                <option value="" disabled>Select age group...</option>
                                                {AGE_GROUPS.map((group) => (
                                                    <option key={group} value={group}>{group}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group full">
                                        <label htmlFor="position">Preferred Position</label>
                                        <select id="position" name="position" defaultValue="">
                                            <option value="">Select position...</option>
                                            {PLAYING_POSITIONS.map((pos) => (
                                                <option key={pos} value={pos}>{pos}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="reg-section">
                                    <div className="reg-section-title">2 · Parent / Guardian Details</div>

                                    <div className="form-group full">
                                        <label htmlFor="guardianName">Parent / Guardian Name *</label>
                                        <input type="text" id="guardianName" name="guardianName" required placeholder="Full name" />
                                    </div>

                                    <div className="form-group">
                                        <div>
                                            <label htmlFor="phone">Phone Number *</label>
                                            <input type="tel" id="phone" name="phone" required placeholder="+91 98765 43210" />
                                        </div>
                                        <div>
                                            <label htmlFor="email">Email Address *</label>
                                            <input type="email" id="email" name="email" required placeholder="john@example.com" />
                                        </div>
                                    </div>
                                </div>

                                <div className="reg-section">
                                    <div className="reg-section-title">3 · Batch &amp; Location</div>

                                    <div className="form-group">
                                        <div>
                                            <label htmlFor="batch">Preferred Batch *</label>
                                            <select id="batch" name="batch" required defaultValue="">
                                                <option value="" disabled>Select batch timing...</option>
                                                {TRAINING_BATCHES.map((batch) => (
                                                    <option key={batch} value={batch}>{batch}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="location">Preferred Location *</label>
                                            <select id="location" name="location" required defaultValue="">
                                                <option value="" disabled>Select location...</option>
                                                {TRAINING_LOCATIONS.map((loc) => (
                                                    <option key={loc} value={loc}>{loc}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group full">
                                        <label htmlFor="experience">Previous Club / Experience</label>
                                        <input type="text" id="experience" name="experience" placeholder="e.g. 2 years at a local academy" />
                                    </div>
                                </div>

                                <div className="reg-section">
                                    <div className="reg-section-title">4 · Any Questions?</div>
                                    <div className="form-group full" style={{ marginBottom: "0" }}>
                                        <label htmlFor="message">Message / Doubts</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Ask us anything about training, fees, trials or batch timings..."
                                        ></textarea>
                                    </div>
                                </div>

                                {error && (
                                    <p style={{ color: "#ff6b6b", marginTop: "1rem", fontSize: "0.9rem" }}>{error}</p>
                                )}

                                <button
                                    type="submit"
                                    className="btn-primary full-width"
                                    style={{ marginTop: "1.5rem", fontSize: "1.05rem" }}
                                    disabled={sending}
                                >
                                    {sending ? "Submitting…" : "Submit Registration"}
                                </button>

                                <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.6rem" }}>
                                        If you have any query or doubt, call us
                                    </p>
                                    <a href={contactPhoneHref} className="btn-green" style={{ display: "inline-block" }}>
                                        📞 {contactPhoneDisplay}
                                    </a>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}