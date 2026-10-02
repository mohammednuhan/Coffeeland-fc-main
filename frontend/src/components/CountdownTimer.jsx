import { useState, useEffect } from "react";

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;

function getNextOccurrence(target) {
  const now = Date.now();
  const t = new Date(target).getTime();
  if (t > now) return t;
  return Math.ceil((now - t) / DAY_MS) * DAY_MS + t;
}

function timeUntil(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / DAY_MS),
    hours: Math.floor((diff % DAY_MS) / HOUR_MS),
    minutes: Math.floor((diff % HOUR_MS) / MINUTE_MS),
    seconds: Math.floor((diff % MINUTE_MS) / 1000),
  };
}

export default function CountdownTimer({
  target = new Date().getFullYear() + "-05-15T09:00:00",
  title = "CFC Summer Cup 2026",
  subtitle = "Registration closes in",
  eventDate = "May 15–16, 2026",
}) {
  const [targetTime, setTargetTime] = useState(() => getNextOccurrence(target));

  useEffect(() => {
    setTargetTime(getNextOccurrence(target));
  }, [target]);

  const [time, setTime] = useState(() => timeUntil(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      const t = timeUntil(targetTime);
      setTime(t);
      if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds <= 0) {
        setTargetTime(getNextOccurrence(targetTime));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="countdown-widget">
      <span className="countdown-badge">⏳ {subtitle}</span>
      <h3 className="countdown-title">{title}</h3>
      <div className="countdown-grid">
        {units.map((unit) => (
          <div key={unit.label} className="countdown-unit">
            <span className="countdown-value">{String(unit.value).padStart(2, "0")}</span>
            <span className="countdown-label">{unit.label}</span>
          </div>
        ))}
      </div>
      <p className="countdown-date">📅 {eventDate}</p>
    </div>
  );
}