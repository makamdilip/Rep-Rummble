# Rep Rumble - Implementation Roadmap & Tech Decisions

## 📋 Project Overview

**Rep Rumble** is a fitness + nutrition social app for Gen Z combining:
- 📸 AI-powered meal photo recognition with nutrition tracking
- 💪 Workout logging with streak gamification
- 👯 Buddy challenges with leaderboards
- 🏆 XP system, badges, and rewards

**Target Users**: Gen Z (18-30), college students, young professionals, India-first

**MVP Timeline**: 90 days to market

---

## 🏗️ Architecture

### Tech Stack Decision Matrix

| Layer | Option | Choice | Reason |
|-------|--------|--------|--------|
| **Mobile** | React Native vs Flutter | React Native (Expo) | ✅ Faster iteration, JS/TS ecosystem, iOS/Android/Web |
| **Backend** | Node.js vs Spring Boot | Node.js (Express) | ✅ Lightweight, same JS stack, easy deployment |
| **Database** | Firebase vs PostgreSQL | Firebase Firestore | ✅ Realtime, no DevOps, free tier, scalable |
| **Auth** | Firebase vs Auth0 | Firebase Auth | ✅ Integrated, Google/Apple sign-in, no extra cost |
| **Storage** | Firebase vs AWS S3 | Firebase Storage | ✅ Same ecosystem, auto CDN, permission rules |
| **AI Recognition** | TensorFlow Lite vs API | Hybrid | ✅ On-device for privacy + API fallback for accuracy |
| **Frontend Dashboard** | React vs Vue | React (Vite) | ✅ Largest ecosystem, component reusability |

---

## 📁 Repository Structure

```
rep-rumble/
├── mobile/                       # React Native Mobile App
│   ├── app/
│   │   ├── screens/
│   │   │   ├── AuthScreen.tsx
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── SnapMealScreen.tsx
│   │   │   ├── StreakDashboardScreen.tsx
│   │   │   ├── ChallengesScreen.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   └── LeaderboardScreen.tsx
│   │   ├── components/
│   │   │   ├── MealCard.tsx
│   │   │   ├── StreakBadge.tsx
│   │   │   ├── ChallengeCard.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── foodRecognition.ts
│   │   │   └── firebase.ts
│   │   ├── utils/
│   │   │   ├── validation.ts
│   │   │   └── formatting.ts
│   │   ├── app.json
│   │   └── App.tsx
│   ├── package.json
│   └── eas.json
│
├── backend/                      # Node.js Express API
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── meals.js
│   │   │   ├── workouts.js
│   │   │   ├── challenges.js
│   │   │   ├── users.js
│   │   │   └── gamification.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Meal.js
│   │   │   ├── Workout.js
│   │   │   └── Challenge.js
│   │   ├── services/
│   │   │   ├── foodDb.js
│   │   │   ├── streakCalculator.js
│   │   │   └── aiRecognition.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── validation.js
│   │   └── app.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── web/                         # React Web Dashboard
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── Settings.tsx
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
└── docs/
    ├── API_DOCUMENTATION.md
    ├── SETUP.md
    ├── ARCHITECTURE.md
    ├── ROADMAP.md
    └── DESIGN_SYSTEM.md
```

---

## 🔄 Development Phases

### Phase 1: Discovery & Design (Week 1-3)

**Goal**: Validate product-market fit and design

**Deliverables**:
- [ ] 25 user interviews (Gen Z, 18-30)
- [ ] Market research: fitness app trends, competitor analysis
- [ ] Wireframes for 3 key screens (Snap, Streak, Challenges)
- [ ] Design system (colors, typography, components)
- [ ] Technical spike: Firebase setup, AI API selection

**Key Decisions**:
- Target cuisine: Indian food first (Biryani, Dosa, etc.)
- Streak logic: consecutive workout days
- Challenge types: duration-based (3, 7, 14 days)

---

### Phase 2: MVP Build (Week 4-7)

**Goal**: Build and deploy core features

**Week 4-5: Backend Foundation**
- [ ] Firebase project setup (Auth, Firestore, Storage)
- [ ] API scaffolding (auth, meals, workouts endpoints)
- [ ] Food database (100 Indian dishes with nutrition)
- [ ] Streak calculation logic
- [ ] Challenge matching system

**Week 5-6: Mobile App**
- [ ] React Native setup (Expo)
- [ ] Navigation structure (tabs + stacks)
- [ ] Auth screens (signup, login, onboarding)
- [ ] Home screen (daily summary)
- [ ] Snap meal screen (camera + recognition)
- [ ] Streak dashboard (counter + challenges)
- [ ] Firebase integration

**Week 6-7: Polish & Testing**
- [ ] UI refinement (neon theme)
- [ ] Offline functionality (local SQLite cache)
- [ ] Bilingual onboarding (English + Hindi)
- [ ] Push notifications setup
- [ ] Internal QA testing

**Deliverables**:
- [ ] Android APK + iOS build (TestFlight)
- [ ] Backend API running on Railway/Heroku
- [ ] Firebase Firestore + Storage configured
- [ ] Basic food recognition working

---

### Phase 3: Closed Beta (Week 8-10)

**Goal**: Real-world testing with early users

**Activities**:
- [ ] Recruit 30-50 early users (college/young professionals)
- [ ] Distribute beta builds via TestFlight/Firebase App Distribution
- [ ] Collect feedback (Google Forms + in-app feedback)
- [ ] Monitor: AI accuracy, app crashes, engagement metrics
- [ ] Iterate on UX based on feedback

**Metrics to Track**:
- AI recognition accuracy (target: 85%)
- Daily active users
- Meal logs per user per day (target: 2)
- Workout logs per user per week (target: 3)
- Challenge completion rate
- User retention (Day 1, Day 7, Day 30)

**Fixes & Improvements**:
- Improve food recognition accuracy
- Optimize camera performance
- Enhance UX for quick meal logging
- Add more food categories

---

### Phase 4: Launch Prep (Week 11-12)

**Goal**: Polish, marketing, and soft launch

**Week 11: Feature Completion**
- [ ] Add gamification: badges, level system
- [ ] Implement tips/rewards system (UPI integration)
- [ ] Add social sharing (Twitter/Instagram)
- [ ] Implement analytics tracking
- [ ] Write comprehensive in-app help

**Week 12: Soft Launch**
- [ ] Beta waitlist website (landing page)
- [ ] Social media campaign (TikTok, Instagram, LinkedIn)
- [ ] Influencer partnerships (fitness creators)
- [ ] Press kit + tech blog launch
- [ ] Prepare for App Store/Play Store submission

**Deliverables**:
- [ ] iOS App Store + Android Play Store listings
- [ ] Landing page (conversion > 20%)
- [ ] Social media kit (TikTok, Instagram)
- [ ] Beta launch with 500+ waitlist users

---

## 🎯 Feature Priority Matrix

### Must-Have (MVP)
1. User authentication (Google/Apple sign-in)
2. Photo-based meal logging with AI recognition
3. Workout logging with streak counter
4. Buddy challenges (create + track)
5. Offline support (last 7 days)
6. Push notifications for challenges
7. Leaderboard (private group)

### Should-Have (Phase 2)
1. Badges and XP system
2. Better AI recognition accuracy
3. Meal history calendar view
4. Personalized notifications
5. Hindi language support
6. Share achievements on social

### Nice-to-Have (Phase 3+)
1. UPI rewards system
2. Partner discounts (café, gym)
3. Voice-based logging
4. AI nutrition recommendations
5. Live workout coaching
6. Video challenges

---

## 🔐 Security & Privacy

### Authentication
- Firebase Authentication (email + Google + Apple sign-in)
- JWT tokens for API calls
- Session timeout: 24 hours

### Data Privacy
- **Default**: Local storage only (no cloud sync)
- **Opt-in**: Users can enable cloud backup
- **Image Processing**: On-device first, upload only if needed
- **GDPR Compliant**: Delete account → purge all data in 30 days

### Firestore Security Rules
```javascript
// Users can only read/write their own data
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}

// Meals are private to user
match /meals/{docId} {
  allow read, write: if request.auth.uid == resource.data.userId;
}

// Challenges visible to participating users
match /challenges/{docId} {
  allow read: if request.auth.uid in [resource.data.creatorId, resource.data.buddyId];
  allow write: if request.auth.uid == resource.data.creatorId;
}
```

---

## 💰 Cost Estimate (Monthly)

| Service | MVP Cost | Usage |
|---------|----------|-------|
| Firebase (Firestore + Storage) | ~$50 | 10k DAU, 100k documents |
| Firebase Authentication | Free | 10k auth events |
| Hosting (Railway/Vercel) | ~$5 | Node.js backend |
| Image Recognition API | ~$50 | 10k API calls/month |
| Push Notifications | Free | Firebase Cloud Messaging |
| **Total** | **~$105** | For 10k DAU |

---

## 🎨 Design System

### Color Palette (Neon Dark Mode)
- **Primary**: #00FF00 (neon green)
- **Secondary**: #FF6B00 (neon orange)
- **Accent**: #9D4EDD (neon purple)
- **Background**: #0a0a0a (dark black)
- **Surface**: #1a1a1a (dark grey)
- **Text**: #FFFFFF (white) / #999999 (grey)

### Typography
- **Headlines**: Bold, 24-28px
- **Subheadings**: SemiBold, 16-20px
- **Body**: Regular, 12-14px
- **Labels**: Regular, 10-12px

### Component Sizing
- **Card Radius**: 12px
- **Button Height**: 44px (touch target)
- **Padding**: 16px (standard)
- **Gap**: 8-12px

---

## 📊 Success Metrics

### User Acquisition
- Week 4: 100 beta users
- Week 8: 500 beta users
- Week 12: 1000 waitlist users

### Engagement
- DAU > 50% of registered users
- Meal logs > 2 per day (average)
- Challenge participation > 60%
- Streak retention > 40% (7-day+)

### Quality
- App crash rate < 0.1%
- AI accuracy > 85%
- Load time < 2 seconds
- NPS > 50

---

## 🚀 Deployment Strategy

### Mobile
- **iOS**: Xcode builds + TestFlight (beta) → App Store
- **Android**: Android Studio builds + Firebase App Distribution (beta) → Play Store
- **Build Tool**: Expo EAS for CI/CD automation

### Backend
- **Hosting**: Railway.app or Render
- **Database**: Firebase Firestore (managed)
- **Storage**: Firebase Storage (managed)
- **Monitoring**: Sentry (error tracking)

### Web Dashboard
- **Hosting**: Vercel or Netlify
- **Build**: npm run build → automated deploys
- **CDN**: Automatic (Vercel/Netlify)

---

## 📝 Next Steps

1. ✅ **Validate concept** with 5-10 Gen Z users (this week)
2. ✅ **Design 2 key wireframes** (Snap meal, Streak dashboard)
3. ✅ **Set up Firebase project** and create .env
4. ✅ **Initialize mobile project** (Expo) and backend (Node.js)
5. ⏳ **Build authentication flow** (Week 1)
6. ⏳ **Integrate AI food recognition** (Week 2)
7. ⏳ **Deploy MVP** (Week 4)
8. ⏳ **Beta launch** (Week 8)

---

## 📞 Support & Questions

- **Project Lead**: You
- **Tech Stack Owner**: Node.js + Firebase
- **Design Owner**: (TBD)
- **Marketing Owner**: (TBD)

---

## 📜 License

Rep Rumble © 2025 - All Rights Reserved (For Now)

