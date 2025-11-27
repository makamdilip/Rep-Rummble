# 🚀 Next Steps - Quick Guide

## Immediate Actions Required

### 1. Set Up Environment Variables (5 minutes)

#### Frontend
```bash
# Copy template
cp .env.example .env

# Edit .env and add your keys:
# - VITE_GEMINI_API_KEY (get from https://makersuite.google.com/app/apikey)
# - VITE_FIREBASE_* (get from Firebase Console)
# - VITE_USDA_API_KEY (optional)
```

#### Backend
```bash
# Copy template
cp server/.env.example server/.env

# Edit server/.env and add:
# - MONGODB_URI (MongoDB Atlas or local)
# - JWT_SECRET (generate with: openssl rand -base64 32)
# - PORT=5000
# - NODE_ENV=development
# - CLIENT_URL=http://localhost:5173
```

### 2. Install Backend Dependencies (2 minutes)

```bash
cd server
npm install
cd ..
```

### 3. Set Up Database (10 minutes)

Choose one:

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account & cluster
3. Get connection string
4. Add to `server/.env` as `MONGODB_URI`

**Option B: Local MongoDB**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Set in server/.env
MONGODB_URI=mongodb://localhost:27017/rep-rummble
```

### 4. Test Everything Locally (5 minutes)

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server:dev

# Visit http://localhost:5173
# Test signup, login, meal logging, workout tracking
```

---

## Deployment to Production

### Step 1: Push to GitHub (2 minutes)

```bash
git add .
git commit -m "feat: complete project reorganization with MERN stack"
git push origin master
```

### Step 2: Enable GitHub Pages (2 minutes)

1. Go to repository **Settings**
2. Navigate to **Pages**
3. Set Source to **GitHub Actions**
4. Wait for deployment (3-5 minutes)

Your frontend will be live at:
`https://yourusername.github.io/Rep-Rummble/`

### Step 3: Deploy Backend (15 minutes)

Choose a platform:

**Option A: Heroku (Easiest)**
```bash
cd server
heroku create rep-rumble-api
heroku addons:create mongolab:sandbox
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=https://yourusername.github.io/Rep-Rummble
git push heroku master
```

**Option B: Railway (Modern)**
1. Visit https://railway.app
2. Connect GitHub repository
3. Set root directory to `server/`
4. Add environment variables
5. Deploy

**Option C: Render (Free Tier)**
1. Visit https://render.com
2. New Web Service
3. Connect repo, set root to `server/`
4. Add environment variables
5. Deploy

### Step 4: Update Frontend API URL (5 minutes)

After backend is deployed:

1. Get your backend URL (e.g., `https://rep-rumble-api.herokuapp.com`)
2. Create `src/services/api/config.ts`:

```typescript
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://your-backend-url.com/api'
```

3. Rebuild and redeploy:
```bash
npm run build
git add .
git commit -m "feat: add production API URL"
git push origin master
```

---

## Testing Checklist

### Local Testing
- [ ] Frontend runs without errors (`npm run dev`)
- [ ] Backend runs without errors (`npm run server:dev`)
- [ ] Can register new user
- [ ] Can login
- [ ] Can log a meal
- [ ] Can log a workout
- [ ] Can view leaderboard
- [ ] Data persists after refresh

### Production Testing
- [ ] Frontend deployed successfully
- [ ] Backend API accessible
- [ ] Authentication works
- [ ] Meal logging works
- [ ] Workout tracking works
- [ ] Images upload correctly
- [ ] All features functional

---

## Common Issues & Solutions

### "MongoDB connection failed"
```bash
# Solution 1: Check connection string format
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rep-rumble

# Solution 2: Whitelist IP in MongoDB Atlas
# Go to Network Access > Add IP Address > Allow from Anywhere
```

### "Cannot find module" errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install

# For backend
cd server
rm -rf node_modules package-lock.json
npm install
```

### "Build failed" on GitHub Actions
```bash
# Check if .env.example exists (not .env)
# Verify all imports are correct
# Test build locally first: npm run build
```

### CORS errors in production
```bash
# In server/.env, set:
CLIENT_URL=https://yourusername.github.io/Rep-Rummble
# (exact URL, no trailing slash)
```

---

## Performance Optimization (Optional)

### Frontend
- [ ] Enable lazy loading for routes
- [ ] Optimize images (WebP format)
- [ ] Enable service worker for PWA
- [ ] Add CDN for static assets

### Backend
- [ ] Add Redis caching
- [ ] Enable response compression (already done)
- [ ] Set up rate limiting
- [ ] Database indexing (already done)

---

## Security Checklist

Before going live:

- [ ] All API keys in environment variables
- [ ] `.env` files not committed
- [ ] Strong JWT secret generated
- [ ] CORS properly configured
- [ ] HTTPS enabled (automatic on most hosts)
- [ ] Input validation on all endpoints
- [ ] Password requirements enforced
- [ ] Rate limiting implemented (optional but recommended)

---

## Monitoring & Analytics (Optional)

### Frontend Monitoring
```bash
# Add Google Analytics
# Add Sentry for error tracking
# Add Hotjar for user behavior
```

### Backend Monitoring
```bash
# Use platform-specific logging (Heroku logs, etc.)
# Set up uptime monitoring (UptimeRobot)
# Configure error alerts
```

---

## Custom Domain Setup (Optional)

### Frontend (GitHub Pages)
1. Buy domain (Namecheap, Google Domains)
2. GitHub Settings > Pages > Custom domain
3. Add DNS records:
   - Type: A, Host: @, Value: GitHub IPs
   - Type: CNAME, Host: www, Value: username.github.io

### Backend
1. In hosting platform settings
2. Add custom domain (api.yourdomain.com)
3. Add CNAME record in DNS

---

## Getting Help

1. **Read Documentation**
   - [SETUP.md](./SETUP.md) - Installation guide
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
   - [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - What was changed

2. **Common Resources**
   - MongoDB Docs: https://docs.mongodb.com/
   - Express Docs: https://expressjs.com/
   - React Docs: https://react.dev/
   - Vite Docs: https://vitejs.dev/

3. **Report Issues**
   - GitHub Issues: Create detailed bug reports
   - Include error messages, steps to reproduce

---

## Success Criteria

✅ Local development works
✅ Tests pass
✅ Build succeeds
✅ Frontend deployed to GitHub Pages
✅ Backend deployed and accessible
✅ Database connected
✅ All features working end-to-end

---

## Timeline Estimate

| Task | Time |
|------|------|
| Environment setup | 15 min |
| Backend dependencies | 5 min |
| Database setup | 10 min |
| Local testing | 10 min |
| Frontend deployment | 5 min |
| Backend deployment | 15 min |
| Production testing | 15 min |
| **Total** | **~75 min** |

---

## Quick Commands Reference

```bash
# Development
npm run dev                  # Start frontend
npm run server:dev          # Start backend

# Building
npm run build               # Build frontend
npm run server:build        # Build backend

# Deployment
git push origin master      # Auto-deploy frontend
npm run deploy              # Manual deploy frontend

# Testing
npm run lint                # Check code quality
npm run test                # Run tests (when added)

# Backend
cd server && npm run dev    # Start backend dev server
cd server && npm start      # Start backend production
```

---

## After Successful Deployment

1. **Share your app!**
   - Add screenshots to README
   - Share on social media
   - Show to friends and get feedback

2. **Plan next features**
   - Check [ROADMAP section in README](./README.md#-roadmap)
   - Create GitHub issues for features
   - Prioritize based on user feedback

3. **Maintain your app**
   - Monitor error logs
   - Update dependencies regularly
   - Fix bugs as reported
   - Add new features iteratively

---

**You're all set! 🎉**

Your Rep Rumble app is ready to:
- Run locally ✅
- Deploy to production ✅
- Scale with users ✅

Good luck! 💪🔥
