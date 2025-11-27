# 🔥 Rep Rumble - Fitness + Nutrition Social App

> "Track meals. Crush reps. Win with friends."

A modern fitness app for Gen Z combining meal logging, workout tracking, and buddy challenges with gamification.

---

## 🌟 Key Features

- 📸 **Snap & Log**: Take a photo of your meal → AI recognizes the dish → logs calories & macros
- 💪 **Workout Tracker**: Log exercises, build streaks, earn XP
- 👯 **Buddy Challenges**: Create challenges with friends (3-day plank streak, 10k steps, etc.)
- 🏆 **Gamification**: Badges, XP points, leaderboards, level system
- 🌐 **Localization**: English + Hindi (expandable to more languages)
- 🔒 **Privacy-First**: Local storage by default, cloud sync opt-in

---

## 🚀 Quick Start (5 Minutes)

See [`QUICKSTART.md`](./QUICKSTART.md) for detailed instructions.

### TL;DR
```bash
# 1. Install dependencies
npm install

# 2. Create .env file with Firebase credentials
cp .env.example .env

# 3. Start backend (Terminal 1)
node backend-starter.js

# 4. Start frontend (Terminal 2)
npm run dev

# 5. Test mobile app (Terminal 3)
npm run mobile:web
```

---

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** — Get running in 5 minutes
- **[SETUP.md](./SETUP.md)** — Detailed setup & configuration guide
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** — Complete API reference (50+ endpoints)
- **[ROADMAP_AND_TECH_DECISIONS.md](./ROADMAP_AND_TECH_DECISIONS.md)** — Product roadmap + architecture
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** — File organization

---

## 🏗️ Architecture

### Tech Stack
- **Mobile**: React Native (Expo) — iOS, Android, Web
- **Backend**: Node.js + Express — API server
- **Database**: Firebase Firestore — Realtime, serverless
- **Auth**: Firebase Authentication — Google, Apple, Email sign-in
- **Storage**: Firebase Storage — Image uploads
- **AI**: TensorFlow Lite (on-device) + API fallback — Food recognition
- **Frontend**: React + Vite — Web dashboard

### Project Structure
```
rep-rumble/
├── backend-starter.js          # Express API server
├── HomeScreen.tsx              # Home/Dashboard
├── SnapMealScreen.tsx          # Meal logging
├── StreakDashboardScreen.tsx   # Workout + challenges
├── .env.example                # Configuration template
├── QUICKSTART.md               # 5-min setup guide
├── SETUP.md                    # Full setup instructions
├── API_DOCUMENTATION.md        # API reference
└── ROADMAP_AND_TECH_DECISIONS.md  # Product roadmap
```

---

## 🎯 Development Phases

### Phase 1 (Week 1-3): Discovery & Design ✅
- User interviews
- Wireframes
- Design system

### Phase 2 (Week 4-7): MVP Build 🔄
- Authentication
- Meal logging + AI recognition
- Workout tracking
- Buddy challenges
- Gamification basics

### Phase 3 (Week 8-10): Closed Beta ⏳
- 30-50 early users
- Feedback collection
- UX refinement

### Phase 4 (Week 11-12): Soft Launch ⏳
- Badges & rewards
- App Store + Play Store
- Marketing campaign

---

## 🔐 Authentication

**Supported Sign-In Methods**:
- ✅ Google sign-in
- ✅ Apple sign-in (iOS)
- ✅ Email & password
- ⏳ WhatsApp (future)

**Session Management**:
- JWT tokens via Firebase
- 24-hour expiry
- Automatic refresh

---

## 📊 Core Endpoints

### Meals
- `POST /api/meals/log` — Log a meal with photo
- `GET /api/meals/:userId` — Get meal history
- `GET /api/meals/daily/:userId` — Daily summary

### Workouts
- `POST /api/workouts/log` — Log a workout
- `GET /api/workouts/:userId` — Get workout history
- `GET /api/users/:userId/streak` — Get current streak

### Challenges
- `POST /api/challenges/create` — Create buddy challenge
- `GET /api/challenges/:userId` — Get active challenges
- `PATCH /api/challenges/:challengeId/progress` — Update progress

See [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) for complete reference.

---

## 🎨 Design System

### Color Palette
- 🟢 **Primary**: #00FF00 (Neon Green) — Action, success
- 🟠 **Secondary**: #FF6B00 (Neon Orange) — Emphasis
- 🟣 **Accent**: #9D4EDD (Neon Purple) — Highlights
- ⚫ **Background**: #0a0a0a (Dark Black)
- ⚪ **Surface**: #1a1a1a (Dark Grey)

### Typography
- Headlines: Bold, 24-28px
- Subheadings: SemiBold, 16-20px
- Body: Regular, 12-14px

---

## 🎮 Gamification System

### XP & Levels
- 1 meal log = 10 XP
- 1 workout = 50 XP
- Challenge win = 100 XP bonus
- Level up every 500 XP

### Badges
- 🎯 3-Day Warrior (3-day streak)
- ⭐ Meal Master (50+ meals logged)
- 👑 Gym Legend (20+ workouts)
- 🚀 Challenge Champion (10 challenges completed)

### Streaks
- Daily workout streak
- Weekly meal logging streak
- Challenge streaks with buddies

---

## 🔄 API Workflow

### Sign Up & Onboarding
```
1. User clicks "Sign Up"
2. Firebase Authentication handles sign-in
3. Create user profile in Firestore
4. Set preferences (language, notifications)
5. Show home screen
```

### Log a Meal
```
1. User taps "Snap" button
2. Open camera (React Native camera API)
3. Capture photo
4. Send to AI recognition API
5. Display recognized food + calories + macros
6. Save to Firestore under user's meals collection
7. Update daily totals
```

### Create Challenge
```
1. User selects buddy from contact list
2. Choose challenge type (duration + name)
3. API creates challenge doc in Firestore
4. Send push notification to buddy
5. Both see challenge on their Streak dashboard
6. Log workouts to increase progress
7. Winner determined on day completion
8. XP awarded to participants
```

---

## 🌐 Deployment

### Backend
- **Platform**: Railway.app or Render
- **Database**: Firebase Firestore (managed)
- **Monitoring**: Sentry

### Mobile
- **iOS**: TestFlight → App Store
- **Android**: Firebase App Distribution → Play Store

### Web
- **Platform**: Vercel or Netlify
- **Auto-deploys**: On push to main branch

---

## 💰 Cost Estimate (Monthly for 10k DAU)

| Service | Cost |
|---------|------|
| Firebase Firestore + Storage | $50 |
| Image Recognition API | $50 |
| Backend Hosting | $5 |
| **Total** | ~$105 |

---

## 🏃 Getting Started

### 1. Read the Docs
- [QUICKSTART.md](./QUICKSTART.md) — 5-minute setup
- [SETUP.md](./SETUP.md) — Detailed guide
- [ROADMAP_AND_TECH_DECISIONS.md](./ROADMAP_AND_TECH_DECISIONS.md) — Product strategy

### 2. Set Up Environment
```bash
cp .env.example .env
# Fill in Firebase credentials
```

### 3. Start Development
```bash
# Terminal 1: Backend
node backend-starter.js

# Terminal 2: Frontend
npm run dev

# Terminal 3: Mobile (optional)
npm run mobile:web
```

### 4. Build a Feature
- Pick an endpoint from `API_DOCUMENTATION.md`
- Implement in `backend-starter.js`
- Test with `curl` or Postman
- Add UI component in screen files

---

## 🐛 Troubleshooting

**Backend won't start?**
```bash
lsof -ti:5000 | xargs kill -9  # Kill existing process
node backend-starter.js
```

**Firebase auth failing?**
1. Check `.env` has all credentials
2. Verify auth methods enabled in Firebase Console
3. Check Firestore rules

**React Native issues?**
```bash
npm cache clean --force
rm -rf node_modules
npm install
npm run mobile:web
```

See [SETUP.md](./SETUP.md#troubleshooting) for more.

---

## 📊 Success Metrics

| Metric | Target |
|--------|--------|
| DAU | > 50% of registered users |
| Meal logs | > 2 per day (average) |
| Challenge participation | > 60% |
| 7-day retention | > 40% |
| AI accuracy | > 85% |
| NPS | > 50 |

---

## 🤝 Contributing

**Interested in helping build Rep Rumble?** Contact us:
- GitHub Issues (coming soon)
- Email: team@reprumble.com

---

## 📝 License

Rep Rumble © 2025 - All Rights Reserved

---

## 🎯 Next Steps

1. ✅ Read [QUICKSTART.md](./QUICKSTART.md)
2. ⏳ Set up Firebase project
3. ⏳ Start backend + frontend
4. ⏳ Implement first feature
5. ⏳ Deploy MVP

**Ready to build? Let's go! 🚀**
