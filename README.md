# Wavelen

AI-powered music discovery platform that helps users discover music through personalized recommendations, conversational interactions, and a dynamic music profile.

Built with a product-oriented mindset inspired by Spotify's development process — including sprint-based development, public backlog, documented technical decisions, and incremental feature delivery.

**[Live demo → wavelen.vercel.app](https://wavelen.vercel.app)**

---

## Design reference

The initial visual direction was prototyped with [v0](https://v0.app) to explore layout and UI patterns quickly:

**[Live design reference →](https://wavelen.vercel.app)**

This reference defines the visual direction Wavelen is being built towards:

- Chat-first music assistant
- Music Stories experience
- Personalized recommendations
- Dynamic music profile
- Modern streaming-platform inspired interface

The reference is **not the production codebase**. Every feature is being implemented manually inside this repository, with focus on understanding architecture, state management, API integration, and scalability.

![Wavelen design reference](docs/disignReference.png)

---

## Tech stack

### Frontend

- React + TypeScript + Vite
- Tailwind CSS
- Lucide Icons

### Backend / Services

- Firebase Authentication
- Firebase Firestore
- Firebase Functions
- Vercel Serverless Functions (CORS proxy for Deezer)

### APIs

- **Deezer API** — artist search, track search, cover images, audio previews
- **Last.fm API** — track metadata, tags and genres, similar artists, artist information

### Development tools

- Git + GitHub
- GitHub Projects (sprint-based backlog)
- ESLint + Prettier
- Vercel CLI

---

### API flow
```js
React Components
│
Custom Hooks
│
Music Services
│
API Integrations
│
Deezer / Last.fm
```

This keeps API logic separated from UI components and makes future integrations easier.

---

## Music API integration

### Deezer

Deezer is responsible for music-related data: artist search, track search, album information, cover images and preview URLs.

Because Deezer blocks direct browser requests due to CORS restrictions, all requests are proxied through Vercel Serverless Functions:
```bash
Frontend
│
/api/deezer/search
/api/deezer/artist
│
Deezer API
```
---

### Last.fm

Last.fm provides additional metadata: artist tags, genres, similar artists and track information. All responses are normalized before reaching the application layer.

---

## Development setup

### Prerequisites

- Node.js 20+
- Vercel CLI (`npm i -g vercel`)
- Firebase project with Auth and Firestore enabled
- Last.fm API key ([get one here](https://www.last.fm/api/account/create))

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env.local` file in the root:
```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_LASTFM_API_KEY=
```

### Running the project

**Frontend only** (no API proxy):

```bash
npm run dev
```

**Full development environment** (recommended):

```bash
npm run dev:full
```

This starts the Vercel development server together with Vite, enabling the serverless API routes required for Deezer integration:
```bash
React App
│
Vercel Dev Server
│
Serverless API Routes (/api/deezer/*)
│
External APIs

```

---

## Onboarding flow

The onboarding experience collects user preferences to create a personalized music profile.
```bash
Genre Selection
│
Artist Selection
│
User Music Profile (saved to Firestore)
```

Features:
- Genre selection from a curated list
- Artist discovery powered by Deezer
- Popular artists loaded on first access
- Artist search with debounce
- Loading and error states
- Image fallback handling
- Minimum selection validation (3 genres + 3 artists)

---

## Project management

Development follows a sprint-based workflow tracked on [GitHub Projects](https://github.com/users/gabrieldiasmenezes/projects/4).

Each feature is organized with issues, acceptance criteria, technical decisions and sprint goals.

| Sprint | Focus | Status |
|---|---|---|
| Sprint 1 | Foundation, auth, onboarding, Firebase setup | ✅ Done |
| Sprint 2 | Home page, AI assistant, music player, API integrations | 🚧 In progress |
| Sprint 3 | Semantic search, recommendation engine, Stories polish | 🔜 Planned |
| Sprint 4 | Analytics, QA, final deploy, case study | 🔜 Planned |

---

## Development principles

- Separation of concerns
- Reusable components
- Typed API responses
- Service-based architecture
- Incremental feature delivery
- Production-oriented decisions

---

## Status

🚧 Active development — Sprint 2 in progress.

Current focus:
- Music API integrations (Deezer + Last.fm)
- Personalized onboarding with real data
- Music profile creation
- Recommendation engine foundation

---

## Planned features

- AI conversational music assistant
- Personalized recommendations
- Music Stories
- Audio previews with global player
- Recommendation explanations
- User taste evolution tracking