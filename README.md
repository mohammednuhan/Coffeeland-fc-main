# Coffeeland FC ⚽

Football Academy website for **Coffeeland FC**, Chikkamagaluru's premier KSFA-affiliated football club.

A clean, modern app with a **Vite + React frontend** and a **Bun backend** (SQLite), themed around the club logo (green `#1B5E20` + gold `#D4AF37`).

## Project Structure

```
coffeelandfc/
├── frontend/               # Vite + React 19 UI
│   ├── index.html          # Entry HTML (fonts, favicon)
│   ├── vite.config.js      # Proxies /api/* -> backend
│   ├── src/
│   │   ├── main.jsx        # React entry
│   │   ├── App.jsx         # Router + layout (Navbar + Footer + logo background)
│   │   ├── globals.css     # Design system (logo colors, animations)
│   │   ├── components/     # Navbar + Footer
│   │   └── pages/          # Home, About, Academy, Contact, Events, News, Sponsors
│   └── public/             # Static assets (logo, images)
│
├── backend/                # Bun server (SQLite)
│   ├── src/index.ts        # API: /api/register, /api/contact, /api/students
│   ├── package.json
│   └── data/               # SQLite database
│
└── package.json            # Root scripts to run both
```

## Requirements

- **Node.js** 18+
- **Bun** (latest) — for the backend

## Getting Started

```bash
# 1. Install all dependencies
bun run install:all

# 2. Run both frontend + backend together
bun run dev
```

- Frontend: http://localhost:3001
- Backend:  http://localhost:4000

Or run them separately:

```bash
bun run dev:backend    # Backend on :4000
bun run dev:frontend   # Frontend on :3001
```

> **Note:** The frontend proxies `/api/*` to the backend on `:4000`, so the app can reach the API at `http://localhost:3001/api/*`.

## API Endpoints

| Method | Endpoint          | Description                    |
|--------|-------------------|--------------------------------|
| GET    | `/api/health`     | Health check                   |
| POST   | `/api/register`   | Register a student             |
| POST   | `/api/contact`    | Submit a contact form message  |
| GET    | `/api/students`   | List registered students       |

## Build

```bash
bun run build   # Production build of the frontend
```