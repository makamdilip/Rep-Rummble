# Rep Rumble - Fitness + Nutrition for Gen Z/Alpha

> Track meals. Crush reps. Win with friends.

Rep Rumble is a multi-platform fitness app with AI-powered meal logging, workout tracking, and social gamification.
The stack is built around Supabase Auth, Oracle Autonomous Database (ATP), Gemini AI, a Node/Express backend on an
Oracle VM, and a React + Vite web frontend deployed to Vercel.

---

## Key Features

### Snap & Log Meals
- Take a photo of your meal
- Gemini recognizes the food and estimates macros
- Automatic calorie & macro calculation
- Suggests healthier alternatives
- Works offline and syncs when online

### Workout Tracking
- Quick-log 50+ exercises
- AI-generated personalized plans
- Real-time form feedback (MediaPipe pose detection)
- Track sets, reps, weight
- Progress visualization & charts

### Gamification System
- XP points for workouts & meals
- Level system (Novice -> Pro)
- Streaks and weekly leaderboards
- Badges and achievements

### Social & Challenges
- Buddy challenges (3-7 days)
- Compete with friends
- Share achievements
- Community feed (in progress)

### Multi-Platform
- Web: marketing + subscription
- Mobile: React Native (Expo)
- Offline-first with background sync

---

## Tech Stack

```
Frontend (Web)
- React + TypeScript + Vite

Frontend (Mobile)
- React Native + Expo

Backend
- Node.js + Express
- Supabase Auth
- Oracle Autonomous Database (ATP)
- Gemini AI (meal analysis)

Deployment
- Web: Vercel
- API: Oracle Cloud VM
- Mobile: TBD (EAS or store releases)
```

---

## Quick Start

### Prerequisites
- Node.js 18+ (20 recommended)
- Git
- Accounts: Supabase, Oracle Cloud (ATP + VM), Google AI Studio (Gemini), Vercel

### Installation

```bash
# 1. Clone repository
git clone https://github.com/makamdilip/Rep-Rummble.git
cd Rep-Rummble

# 2. Install dependencies
npm run setup

# 3. Configure environment
cp server/.env.example server/.env
cp web/.env.example web/.env.local
# Edit both files with your keys

# 4. Start development servers
npm run dev
```

See `docs/SETUP.md` for detailed instructions.

---

## Documentation

- `docs/SETUP.md` - Installation, configuration, and local dev
- `docs/DEPLOYMENT.md` - Production deployment (Vercel + Oracle VM)
- `docs/POLICIES.md` - Security, privacy, and data policies

---

## Project Structure

```
Rep-Rummble/
- server/       Backend API (Node.js + Express)
- web/          Web frontend (React + Vite)
- mobile/       Mobile app (React Native + Expo)
- docs/         Setup & deployment docs
- package.json  Root workspace config
- README.md     This file
```

---

## Deployment

- Web: Vercel
- API: Oracle Cloud VM
- Database: Oracle ATP
- Auth: Supabase
- AI: Gemini

See `docs/DEPLOYMENT.md` for full steps.

---

## Security

- Use Supabase auth tokens; keep service-role keys server-only
- Store secrets in Vercel env vars and VM `.env`, not in git
- Rotate keys immediately if exposed
- Limit API access with CORS and rate limiting

---

## Development

```bash
# Lint
npm run lint

# Type check
npm run type-check

# Format
npm run format
```

---

*Last Updated: January 31, 2026*
