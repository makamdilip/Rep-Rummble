# Rep Rumble - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- npm or yarn
- Expo CLI (for React Native mobile development)
- Firebase account (for backend services)

### Step 1: Install Dependencies

For the **Backend API**:
```bash
cd backend
npm install
```

For the **Mobile App** (React Native + Expo):
```bash
cd mobile
npm install
# or
expo install
```

For the **Web Dashboard** (React + Vite):
```bash
cd web
npm install
```

### Step 2: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project called "rep-rumble"
3. Add Firebase config to `.env.local` (backend) and app files (mobile/web)

Get your Firebase credentials and add to `.env`:

```bash
FIREBASE_API_KEY=your_key
FIREBASE_PROJECT_ID=your_project_id
# ... (see .env.example)
```

### Step 3: Start Development

**Backend API:**
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:5000`

**Mobile App (Expo):**
```bash
cd mobile
npm run android    # For Android
npm run ios        # For iOS
npm run web        # For Web preview
```

**Web Dashboard:**
```bash
cd web
npm run dev
```
Opens on `http://localhost:5173`

---

## 📁 Project Structure

```
rep-rumble/
├── mobile/          # React Native app (iOS/Android)
│   ├── screens/     # Main app screens
│   ├── components/  # Reusable UI components
│   ├── utils/       # API calls, helpers
│   └── App.tsx      # Main entry
├── backend/         # Node.js + Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── controllers/
│   │   └── app.js
│   └── .env
├── web/             # React + Vite dashboard
│   ├── src/
│   └── package.json
└── docs/            # Documentation
```

---

## 🔑 Key API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Sign in
- `GET /api/users/:userId` - Get user profile

### Meals
- `POST /api/meals/log` - Log a meal with photo
- `GET /api/meals/:userId` - Get user's meal history

### Workouts
- `POST /api/workouts/log` - Log a workout
- `GET /api/workouts/:userId` - Get user's workout history

### Challenges
- `POST /api/challenges/create` - Create a buddy challenge
- `GET /api/challenges/:userId` - Get user's active challenges

---

## 🎯 Development Phases

### Phase 1 (Week 1-3): Validation & Design
- [ ] User interviews (25 Gen Z users)
- [ ] Wireframe key screens
- [ ] Define food categories

### Phase 2 (Week 4-7): Core MVP
- [ ] Photo upload + AI recognition
- [ ] Streak counter
- [ ] Buddy invite system
- [ ] Offline cache
- [ ] Bilingual onboarding

### Phase 3 (Week 8-10): Closed Beta
- [ ] Pilot with 30-50 users
- [ ] Collect feedback
- [ ] Refine accuracy

### Phase 4 (Week 11-12): Polish & Launch
- [ ] Add badges/rewards
- [ ] Launch wait-list website
- [ ] Social media campaign

---

## 🔒 Environment Variables

Create a `.env` file at the project root:

```env
# Firebase
FIREBASE_API_KEY=xxx
FIREBASE_PROJECT_ID=xxx
FIREBASE_AUTH_DOMAIN=xxx
FIREBASE_STORAGE_BUCKET=xxx

# Server
PORT=5000
NODE_ENV=development

# Optional: AI Service
FOOD_RECOGNITION_API_KEY=xxx
```

---

## 📱 Mobile App Tech Stack

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation
- **State**: Context API / Redux (optional)
- **API**: Fetch / Axios
- **Firebase**: Firebase SDK

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
npm install
npm cache clean --force
rm -rf node_modules
npm install
```

### Firebase auth errors
- Verify `.env` variables
- Check Firebase project settings
- Ensure Firestore rules allow read/write

### Build errors (React Native)
```bash
expo prebuild --clean
npm run android  # or ios
```

---

## 🚢 Deployment

### Backend (API)
- Deploy to Heroku, Railway, or Vercel
- Set environment variables in platform settings
- Database: Firebase Firestore (auto-scaled)

### Mobile App
- iOS: Build and submit to App Store
- Android: Build and submit to Google Play
- Use EAS (Expo Application Services) for CI/CD

### Web Dashboard
- Deploy to Vercel, Netlify, or Firebase Hosting
- Connect to same Firebase backend

---

## 📞 Support & Contact

For issues or questions:
- GitHub Issues (coming soon)
- Email: support@reprumble.com

---

## 📝 License

Rep Rumble © 2025 - All rights reserved

