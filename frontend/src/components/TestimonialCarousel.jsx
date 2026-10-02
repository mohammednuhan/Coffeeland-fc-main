import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Rahul S.",
    role: "Parent, U12 Academy",
    quote:
      "My son has grown so much since joining Coffeeland FC. The coaches genuinely care about every kid's development, on and off the pitch.",
    avatar: "R",
  },
  {
    name: "Akil M.",
    role: "Senior Team Player",
    quote:
      "The competitive program pushed me to a new level. Representing the club in the KSFA C-Division was an unforgettable experience.",
    avatar: "A",
  },
  {
    name: "Suma K.",
    role: "Parent, Grassroots",
    quote:
      "Disciplined training, professional coaching and a real sense of community. Best decision we made for our daughter's love of football.",
    avatar: "S",
  },
  {
    name: "Dhanush P.",
    role: "U15 Academy Player",
    quote:
      "Tactics, fitness and match exposure — everything is covered here. I've improved more in one season than in years before.",
    avatar: "D",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const go = useCallback((next) => {
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const timer = setInterval(() => go(index + 1), 5000);
    return () => clearInterval(timer);
  }, [index, go]);

  return (
    <div className="testimonial-carousel">
      <div className="testimonial-slider" key={index}>
        <div className="testimonial-quote-mark" aria-hidden="true">"</div>
        <p className="testimonial-quote">{testimonials[index].quote}</p>
        <div className="testimonial-person">
          <span className="testimonial-avatar" aria-hidden="true">
            {testimonials[index].avatar}
          </span>
          <div>
            <div className="testimonial-name">{testimonials[index].name}</div>
            <div className="testimonial-role">{testimonials[index].role}</div>
          </div>
        </div>
      </div>

      <div className="testimonial-controls">
        <button type="button" className="testimonial-arrow" aria-label="Previous testimonial" onClick={prev}>
          ←
        </button>
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Testimonial ${i + 1}`}
              className={`testimonial-dot ${i === index ? "active" : ""}`}
              onClick={() => go(i)}
            ></button>
          ))}
        </div>
        <button type="button" className="testimonial-arrow" aria-label="Next testimonial" onClick={next}>
          →
        </button>
      </div>
    </div>
  );
}