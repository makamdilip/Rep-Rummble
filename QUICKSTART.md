# 🚀 Rep Rumble - Quick Start Guide

Welcome to **Rep Rumble**! This guide gets you from zero to running the app in 15 minutes.

---

## ⚡ 5-Minute Setup

### 1. Clone & Install
```bash
# Navigate to project
cd /Users/makamdilip/Desktop/Rep\ Rummble/reprembble

# Install dependencies
npm install

# (Optional) Install Expo CLI
npm install -g expo-cli
```

### 2. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Create Project** → name it `rep-rumble`
3. Enable **Authentication** (Google, Apple, Email/Password)
4. Enable **Firestore Database** (Start in test mode)
5. Enable **Storage** (Create default bucket)
6. Copy your config and add to `.env` file (see `.env.example`)

### 3. Start Backend (API Server)
```bash
# Terminal 1
node backend-starter.js
```
✅ Server running on `http://localhost:5000`

### 4. Start Frontend (Web Dashboard)
```bash
# Terminal 2
npm run dev
```
✅ Opens on `http://localhost:5173`

---

## 📱 Testing the Mobile App (React Native)

### Option A: Expo Go (Fastest)
```bash
# Terminal 3
npm run mobile:web
```
Opens browser preview of mobile app.

### Option B: Android Emulator
```bash
npm run mobile:android
# (Requires Android Studio)
```

### Option C: iOS Simulator (Mac only)
```bash
npm run mobile:ios
# (Requires Xcode)
```

---

## 📋 Project Structure Overview

| Folder | Purpose |
|--------|---------|
| `backend-starter.js` | Express API server (meals, workouts, challenges) |
| `HomeScreen.tsx` | Home/Dashboard screen |
| `SnapMealScreen.tsx` | Meal logging with photo recognition |
| `StreakDashboardScreen.tsx` | Workout tracking + buddy challenges |
| `.env.example` | Configuration template |
| `SETUP.md` | Detailed setup instructions |
| `API_DOCUMENTATION.md` | Complete API reference |
| `ROADMAP_AND_TECH_DECISIONS.md` | Product roadmap + architecture |

---

## 🎯 First Things to Try

### 1. Test Backend Health
```bash
curl http://localhost:5000/api/health
```
Should return: `{ "status": "ok" }`

### 2. Create a Test User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "displayName": "Test User"
  }'
```

### 3. Explore the Web Dashboard
- Visit `http://localhost:5173`
- Sign in with your test user
- Log a meal, log a workout, create a challenge

---

## 🔑 Key Files to Edit

### Backend
- **Routes**: `backend-starter.js` (lines 50-180) — Add new endpoints here
- **Config**: `.env` — Firebase credentials
- **Models**: Firestore rules in Firebase Console

### Mobile
- **Home**: `HomeScreen.tsx` — Daily summary
- **Snap**: `SnapMealScreen.tsx` — Photo + recognition
- **Streak**: `StreakDashboardScreen.tsx` — Challenges + gamification

### Web Dashboard
- **Pages**: `src/pages/` — Main sections
- **Components**: `src/components/` — Reusable UI

---

## 🐛 Common Issues & Fixes

### "Cannot find module 'firebase'"
```bash
npm install firebase axios
```

### "Port 5000 already in use"
```bash
# Kill existing process
lsof -ti:5000 | xargs kill -9
# Then restart
node backend-starter.js
```

### Firebase auth errors
1. Check `.env` file has all Firebase credentials
2. Verify Firestore rules in Firebase Console
3. Check Authentication providers are enabled

### Expo issues
```bash
npm cache clean --force
rm -rf node_modules
npm install
npm run mobile:web
```

---

## 📚 Next Steps

1. **Read the Full Setup**: See `SETUP.md`
2. **Review API Docs**: See `API_DOCUMENTATION.md`
3. **Check Roadmap**: See `ROADMAP_AND_TECH_DECISIONS.md`
4. **Customize Theme**: Edit colors in component files
5. **Add Your First Feature**: Start with a simple API endpoint

---

## 💡 Pro Tips

- **Use Postman**: Test APIs without browser (`Postman.app` or `Thunder Client` VS Code extension)
- **Firebase Rules**: Update Firestore rules in console to test permissions
- **Hot Reload**: Save a file → changes appear instantly
- **Debug Logs**: Check terminal for errors and API responses

---

## 🎨 Brand Quick Reference

- **App Name**: Rep Rumble
- **Tagline**: "Track meals. Crush reps. Win with friends."
- **Primary Color**: Neon Green (#00FF00)
- **Secondary Color**: Neon Orange (#FF6B00)
- **Theme**: Dark mode + neon accents

---

## 📞 Need Help?

1. Check `SETUP.md` for detailed instructions
2. Review `API_DOCUMENTATION.md` for endpoint details
3. Look for TODO comments in code for features to implement
4. Check Firebase Console for Firestore errors

---

## 🎯 Your First Task

Try this to verify everything works:

```bash
# Terminal 1: Backend
cd /Users/makamdilip/Desktop/Rep\ Rummble/reprembble
node backend-starter.js

# Terminal 2: Frontend
npm run dev

# Terminal 3: Test API
curl http://localhost:5000/api/health
```

If all three work ✅, you're ready to build! 🚀

