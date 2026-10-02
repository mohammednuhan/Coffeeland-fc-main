/**
 * Runtime configuration for the site. Override any value at build time with
 * a VITE_ prefixed variable, e.g. VITE_CONTACT_PHONE=9876543210 npm run build
 */
const rawPhone = import.meta.env.VITE_CONTACT_PHONE ?? "8876642269";
const rawTelegram = import.meta.env.VITE_TELEGRAM_PHONE ?? "7019536523";

function normalise(number: string): string {
  return number.replace(/\D/g, "");
}

export const config = {
  contactPhone: normalise(rawPhone),
  telegramPhone: normalise(rawTelegram),
  countryCode: import.meta.env.VITE_COUNTRY_CODE ?? "91",
  email: import.meta.env.VITE_CONTACT_EMAIL ?? "info@coffeelandfc.com",
  academyEmail: import.meta.env.VITE_ACADEMY_EMAIL ?? "academy@coffeelandfc.com",
  socials: {
    facebook: import.meta.env.VITE_SOCIAL_FACEBOOK ?? "",
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM ?? "",
    twitter: import.meta.env.VITE_SOCIAL_TWITTER ?? "",
    youtube: import.meta.env.VITE_SOCIAL_YOUTUBE ?? "",
  },
};

export const contactPhoneDisplay = `+${config.countryCode} ${config.contactPhone}`;
export const telegramDisplay = `+${config.countryCode} ${config.telegramPhone}`;
export const contactPhoneHref = `tel:+${config.countryCode}${config.contactPhone}`;
export const whatsappHref = `https://wa.me/${config.countryCode}${config.contactPhone}`;
export const telegramHref = `https://t.me/+${config.countryCode}${config.telegramPhone}`;

export const AGE_GROUPS = [
  "U8 — Grassroots (6 – 8 years)",
  "U12 — Development (9 – 12 years)",
  "U15 — Competitive (13 – 15 years)",
  "Senior — Elite (16+ years)",
];

export const TRAINING_LOCATIONS = ["District Field", "Kalyan Nagar Turf"];

export const TRAINING_BATCHES = [
  "Morning Batch — 6:00 AM – 7:30 AM",
  "Evening Batch — 5:00 PM – 6:30 PM",
];

export const PLAYING_POSITIONS = [
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Attacker",
  "Not decided yet",
];