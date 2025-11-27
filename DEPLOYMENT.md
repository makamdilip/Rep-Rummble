# Rep Rumble - Deployment Guide

This guide covers deploying Rep Rumble to production using GitHub Pages for the frontend and various options for the backend.

## Table of Contents

- [Frontend Deployment (GitHub Pages)](#frontend-deployment-github-pages)
- [Backend Deployment Options](#backend-deployment-options)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Post-Deployment](#post-deployment)

---

## Frontend Deployment (GitHub Pages)

### Prerequisites

- GitHub account
- Git installed locally
- Node.js 20+ installed

### Automatic Deployment (Recommended)

The project is configured with GitHub Actions for automatic deployment.

#### Step 1: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** > **Pages**
3. Under **Build and deployment**:
   - Source: **GitHub Actions**
4. Save the settings

#### Step 2: Push to Master Branch

```bash
git add .
git commit -m "Deploy to production"
git push origin master
```

The GitHub Action will automatically:
- Build the project
- Run tests
- Deploy to GitHub Pages

Your site will be available at: `https://yourusername.github.io/Rep-Rummble/`

#### Step 3: Check Deployment Status

1. Go to **Actions** tab in your repository
2. View the latest workflow run
3. Wait for the deployment to complete (usually 2-3 minutes)

### Manual Deployment

If you prefer manual deployment:

```bash
# Install gh-pages package (if not already installed)
npm install --save-dev gh-pages

# Build and deploy
npm run deploy
```

---

## Backend Deployment Options

### Option 1: Heroku (Recommended for Beginners)

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Steps

```bash
# Navigate to server directory
cd server

# Login to Heroku
heroku login

# Create a new Heroku app
heroku create rep-rumble-api

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=https://yourusername.github.io/Rep-Rummble

# Deploy
git init
git add .
git commit -m "Initial backend deployment"
heroku git:remote -a rep-rumble-api
git push heroku master

# View logs
heroku logs --tail
```

Your API will be available at: `https://rep-rumble-api.herokuapp.com/api`

### Option 2: Railway

#### Steps

1. Go to [Railway.app](https://railway.app)
2. Click **New Project** > **Deploy from GitHub repo**
3. Select your `Rep-Rummble` repository
4. Set the root directory to `server/`
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `CLIENT_URL=https://yourusername.github.io/Rep-Rummble`
6. Deploy

### Option 3: Render

#### Steps

1. Go to [Render.com](https://render.com)
2. Click **New** > **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: rep-rumble-api
   - **Root Directory**: server
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add environment variables (see below)
6. Create Web Service

### Option 4: DigitalOcean App Platform

#### Steps

1. Go to [DigitalOcean](https://cloud.digitalocean.com/apps)
2. Click **Create App**
3. Select your GitHub repository
4. Configure component:
   - **Type**: Web Service
   - **Source Directory**: /server
   - **Build Command**: npm run build
   - **Run Command**: npm start
5. Add environment variables
6. Deploy

### Option 5: AWS (Advanced)

See [AWS_DEPLOYMENT.md](./docs/AWS_DEPLOYMENT.md) for detailed AWS deployment guide.

---

## Environment Variables

### Frontend (.env)

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
# Google Gemini AI API Key
VITE_GEMINI_API_KEY=your_gemini_api_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend API URL (update after backend deployment)
VITE_API_URL=https://your-api-url.com/api
```

### Backend (server/.env)

Create a `server/.env` file (copy from `server/.env.example`):

```bash
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# CORS
CLIENT_URL=https://yourusername.github.io/Rep-Rummble

# Optional: AI Services
GEMINI_API_KEY=your_gemini_api_key
USDA_API_KEY=your_usda_api_key
```

### Generating Secure Secrets

```bash
# Generate JWT_SECRET
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Database Setup

### Option 1: MongoDB Atlas (Recommended)

#### Steps

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Wait for cluster to be created (2-5 minutes)
5. Click **Connect** > **Connect your application**
6. Copy the connection string
7. Replace `<password>` with your database password
8. Add to your backend `.env` file as `MONGODB_URI`

#### Network Access

1. Go to **Network Access** in MongoDB Atlas
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (for development)
4. For production, whitelist specific IPs

### Option 2: Local MongoDB

```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB
mongod --dbpath ~/data/db

# In server/.env
MONGODB_URI=mongodb://localhost:27017/rep-rumble
```

---

## Post-Deployment

### Update Frontend API URL

After deploying the backend, update the frontend to use the production API:

1. Edit `src/services/api/config.ts`:

```typescript
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://your-deployed-api.herokuapp.com/api'
```

2. Rebuild and redeploy frontend:

```bash
npm run build
git add .
git commit -m "Update API URL"
git push origin master
```

### Test the Deployment

1. Visit your GitHub Pages URL
2. Create a test account
3. Test all features:
   - Sign up / Login
   - Snap a meal
   - Log a workout
   - Check leaderboard

### Configure Custom Domain (Optional)

#### Frontend

1. Buy a domain (e.g., Namecheap, Google Domains)
2. In GitHub repository: **Settings** > **Pages** > **Custom domain**
3. Enter your domain (e.g., reprumble.com)
4. Add DNS records:
   - Type: A
   - Host: @
   - Value: GitHub Pages IPs (see GitHub docs)
   - Type: CNAME
   - Host: www
   - Value: yourusername.github.io

#### Backend

1. In your deployment platform (Heroku/Railway/Render)
2. Go to settings > **Custom Domains**
3. Add your domain (e.g., api.reprumble.com)
4. Add DNS CNAME record:
   - Host: api
   - Value: provided by platform

### Monitor Your Application

#### Frontend Monitoring

- Use Google Analytics
- Set up error tracking with Sentry

#### Backend Monitoring

- Check platform logs (Heroku logs, Railway logs, etc.)
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure error tracking

### Security Checklist

- [ ] All API keys in environment variables (not in code)
- [ ] `.env` files in `.gitignore`
- [ ] CORS configured correctly
- [ ] HTTPS enabled
- [ ] JWT secrets are strong and random
- [ ] MongoDB password is strong
- [ ] Rate limiting enabled (for production)
- [ ] Input validation on all endpoints

---

## Troubleshooting

### Frontend Issues

**404 on refresh**
- GitHub Pages doesn't support client-side routing by default
- Add a `404.html` that redirects to `index.html`

**Assets not loading**
- Check `base` URL in `vite.config.ts`
- Should be `/Rep-Rummble/` for GitHub Pages

### Backend Issues

**Database connection failed**
- Check MongoDB URI format
- Verify network access in MongoDB Atlas
- Ensure password doesn't contain special characters

**CORS errors**
- Verify `CLIENT_URL` matches your frontend URL
- Check CORS middleware configuration

**Authentication not working**
- Verify `JWT_SECRET` is set
- Check token format in requests

### Performance Issues

**Slow load times**
- Enable compression
- Optimize images
- Use code splitting
- Enable CDN

---

## Rollback Procedure

### Frontend

```bash
# Revert to previous commit
git revert HEAD
git push origin master

# Or deploy a specific commit
git checkout <commit-hash>
npm run build
git checkout master
```

### Backend

Platform-specific rollback options available in dashboards.

---

## Support

For issues and questions:
- GitHub Issues: https://github.com/yourusername/Rep-Rummble/issues
- Email: support@reprumble.com

---

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
