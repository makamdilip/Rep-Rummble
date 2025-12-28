# Rep Rumble - Project Structure

## Overview
Rep Rumble is a fitness + nutrition mobile app with social gamification for Gen Z.

## Directory Structure
```
rep-rumble/
├── mobile/                    # React Native mobile app (iOS + Android)
│   ├── app/
│   ├── components/
│   ├── screens/
│   ├── utils/
│   ├── assets/
│   └── app.json
├── backend/                   # Node.js API server
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── app.js
│   ├── .env.example
│   └── package.json
├── web/                       # Web dashboard (React + Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
└── docs/
    ├── API.md
    ├── SETUP.md
    └── ROADMAP.md
```

## Tech Stack
- **Mobile**: React Native (Expo)
- **Backend**: Node.js (Express)
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Storage**: Firebase Storage
- **Frontend**: React + Vite (web dashboard)
- **AI Food Recognition**: TensorFlow Lite (on-device) + API fallback

## Key Features
1. 📸 Snap & Log (meal photo → AI recognition)
2. 💪 Rep Tracker (workout logging)
3. 👯 Buddy Challenges (social streaks)
4. 🏆 Gamification (XP, badges, leaderboard)
5. 🌐 Localization (English + Hindi)

## Development Phases
- **Phase 1 (Week 1-3)**: User validation + design
- **Phase 2 (Week 4-7)**: Core MVP build
- **Phase 3 (Week 8-10)**: Beta testing
- **Phase 4 (Week 11-12)**: Polish & soft launch
