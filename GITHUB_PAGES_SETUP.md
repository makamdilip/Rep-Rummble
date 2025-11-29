# 🚀 GitHub Pages Deployment Guide

## App Status: ✅ READY FOR GITHUB PAGES

Your app is now configured for **static hosting on GitHub Pages** with no backend dependencies!

---

## What Changed

### ✅ Firebase Removed
- Removed all Firebase dependencies (saves ~350KB in bundle size)
- App now uses **localStorage for authentication**
- No backend required - perfect for GitHub Pages

### ✅ Mock Authentication
- Sign up and login work locally using localStorage
- Data persists in browser storage
- All features work without a database

### ✅ Build Optimization
- Bundle size: **417KB** (down from 759KB)
- All data stored in browser (meals, workouts, streak, etc.)
- Fast static site deployment

---

## Deploy to GitHub Pages

### Option 1: Automatic Deployment (GitHub Actions)

The project already has GitHub Actions configured. Just push to `master`:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin master
```

**GitHub Actions will automatically:**
1. Build the app
2. Deploy to GitHub Pages
3. Make it live at: `https://yourusername.github.io/Rep-Rummble/`

### Option 2: Manual Deployment

```bash
# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Build and deploy
npm run build
npm run deploy
```

---

## Configure GitHub Repository

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

Your site will be live at: `https://yourusername.github.io/Rep-Rummble/`

---

## Update vite.config.ts for GitHub Pages

Make sure your `vite.config.ts` has the correct base path:

```typescript
export default defineConfig({
  base: '/Rep-Rummble/', // Your repo name
  // ... rest of config
})
```

---

## Test Locally

Before deploying, test the production build:

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

Visit http://localhost:4173/ to test the production build.

---

## How Authentication Works (No Backend)

### Sign Up
1. User enters email and password
2. Creates a user object stored in localStorage
3. User is "logged in" immediately

### Login
1. User enters email and password (any valid email + 6+ char password works)
2. Creates/retrieves user from localStorage
3. User is "logged in"

### Logout
1. Clears user from localStorage
2. Redirects to login page

### Data Persistence
- All data (meals, workouts, streak) stored in browser's localStorage
- Data persists across page refreshes
- Data is user-specific per browser/device

---

## Limitations of Static Hosting

Since there's no backend:

❌ **What doesn't work:**
- Real user accounts (anyone can "login" with any email)
- Data sync across devices
- Cloud storage
- Global leaderboard (requires backend)

✅ **What works perfectly:**
- All UI features
- Meal tracking with AI (if you add Gemini API key)
- Workout logging
- Streak tracking
- Dark mode
- All animations and interactions
- Data persists in browser

---

## Optional: Add Google Gemini AI

For AI food recognition, add your API key to `.env`:

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env`:
```bash
VITE_GEMINI_API_KEY=your_actual_api_key_here
```
3. Rebuild and redeploy

**Security Note:** The API key will be visible in the client-side code. For production, consider:
- Using API key restrictions in Google Cloud Console
- Limiting to your domain only
- Setting usage quotas

---

## Deployment Checklist

- [ ] Build succeeds (`npm run build`)
- [ ] Preview works (`npm run preview`)
- [ ] vite.config.ts has correct `base` path
- [ ] Commit all changes
- [ ] Push to GitHub
- [ ] GitHub Actions workflow runs successfully
- [ ] Site is live on GitHub Pages
- [ ] Test login/signup
- [ ] Test all features

---

## Troubleshooting

### 404 on GitHub Pages
**Problem:** Page shows 404 after deployment

**Solution:**
1. Check `base` in `vite.config.ts` matches your repo name
2. Make sure GitHub Pages source is set to `gh-pages` branch
3. Rebuild and redeploy

### Blank Page
**Problem:** Site loads but shows blank page

**Solution:**
1. Open browser DevTools → Console
2. Check for errors
3. Verify `base` path in `vite.config.ts`
4. Make sure all files are in `dist` folder after build

### Assets Not Loading
**Problem:** CSS/JS files don't load

**Solution:**
1. Check `base` path is `/Rep-Rummble/` (with slashes)
2. Rebuild with correct base path
3. Clear browser cache

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Next Steps

1. **Deploy to GitHub Pages** using the steps above
2. **Test all features** on the live site
3. **Optional:** Add Gemini AI key for food recognition
4. **Share your site!** 🎉

---

Your app is now **100% ready for GitHub Pages deployment!**

No Firebase, no backend, no configuration required - just build and deploy! 🚀
