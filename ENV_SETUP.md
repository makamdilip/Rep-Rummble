# 🔧 Environment Variables Setup

## Single `.env.local` File

Your project uses **ONE SINGLE environment file** for everything:

```
/Users/makamdilip/Rep-Rummble/.env.local
```

---

## ✅ What Changed

### Before (Multiple Files - Confusing!)
```
❌ /.env                    # Frontend
❌ /.env.example            # Frontend template
❌ /server/.env             # Backend
❌ /server/.env.example     # Backend template
```

### After (One File - Simple!)
```
✓  /.env.local              # ONLY file for everything
✓  /server/.env             # Symlink → ../.env.local
```

**No .example files needed** - just edit `.env.local` directly!

---

## 📁 File Structure

### Root Directory
- **`.env.local`** - Single environment file (committed to Git)

### Server Directory
- **`server/.env`** - Symlink to `../.env.local` (auto-created)

---

## 🔐 Environment Variables

### Frontend Variables (VITE_ prefix)

```bash
# Admin Credentials
VITE_ADMIN_EMAIL=admin@reprumble.com
VITE_ADMIN_PASSWORD=admin123456

# AI Services
VITE_GEMINI_API_KEY=         # Google Gemini for food recognition
VITE_USDA_API_KEY=           # USDA nutrition data (optional)
```

### Backend Variables (No prefix)

```bash
# Server Config
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/rep-rumble

# Authentication
JWT_SECRET=8583d9733c827043b006c749c7f6e7d4
JWT_EXPIRE=365d

# CORS
CLIENT_URL=http://localhost:5173

# AI Services (server-side)
GEMINI_API_KEY=
USDA_API_KEY=
```

---

## 🚀 How It Works

### Frontend (Vite)
- Vite automatically loads `.env.local`
- Only variables with `VITE_` prefix are exposed to client
- Access via: `import.meta.env.VITE_ADMIN_EMAIL`

### Backend (Node.js/Express)
- Reads from `server/.env` (which is symlink to `../.env.local`)
- All non-VITE variables are available
- Access via: `process.env.PORT`

### Symlink Benefits
- ✅ One file to maintain
- ✅ Both frontend & backend stay in sync
- ✅ No duplicate variables
- ✅ Easier to manage

---

## 📝 How to Use

### 1. First Time Setup

The `.env.local` file already exists with default values. Just edit it:

```bash
# Edit the file
nano .env.local
```

### 2. Updating Variables

Just edit `.env.local` - both frontend and backend will use it:

```bash
# Edit the single file
nano .env.local

# Restart dev servers
npm run dev              # Frontend
npm run server:dev       # Backend (if using)
```

### 3. Check Current Values

```bash
# View all environment variables
cat .env.local

# Check symlink is working
ls -la server/.env
# Should show: server/.env -> ../.env.local
```

---

## 🔒 Security

### Git Tracking
`.env.local` is **committed to Git** for easy sharing with team members.

**Important:**
- Change default credentials before deploying
- Use GitHub Secrets for production
- Don't commit real API keys to public repos

### Best Practices
- ✅ Change admin password from default
- ✅ Use different values for production
- ✅ Rotate secrets regularly
- ✅ Use GitHub Secrets for deployment
- ❌ Don't commit real API keys to public repos

---

## 🧪 Verify Setup

### Check Files Exist
```bash
ls -la .env.local
ls -la server/.env
```

Expected output:
```
-rw------- .env.local                    # Single environment file
lrwxr-xr-x server/.env -> ../.env.local  # Symlink
```

### Test Frontend Loads
```bash
# Start dev server
npm run dev

# Should see environment variables loaded
# Visit http://localhost:5173/
# Login with admin credentials
```

### Test Backend Loads (if using)
```bash
# In server directory
cd server
npm run dev

# Server should start on PORT=5000
# Check it reads variables correctly
```

---

## 🔧 Troubleshooting

### Frontend Can't Read Variables

**Problem:** `import.meta.env.VITE_ADMIN_EMAIL` is undefined

**Solution:**
1. Make sure variable has `VITE_` prefix
2. Restart dev server (Ctrl+C, then `npm run dev`)
3. Verify `.env.local` exists in root directory

### Backend Can't Read Variables

**Problem:** `process.env.PORT` is undefined

**Solution:**
1. Check symlink: `ls -la server/.env`
2. Should point to `../.env.local`
3. Recreate if needed: `cd server && ln -sf ../.env.local .env`
4. Restart backend server

### Symlink Broken

**Problem:** `server/.env` doesn't point to parent `.env.local`

**Fix:**
```bash
cd server
rm .env
ln -sf ../.env.local .env
ls -la .env  # Verify symlink
```

---

## 📦 Deployment

### GitHub Pages (Frontend Only)

Since GitHub Pages is static hosting:
- `.env.local` is NOT uploaded (gitignored)
- Use GitHub Secrets for sensitive values
- Set in: Repository Settings → Secrets → Actions

### With Backend (Heroku/Railway/Render)

1. Set environment variables in hosting platform UI
2. Or use platform CLI:

```bash
# Heroku example
heroku config:set PORT=5000
heroku config:set MONGODB_URI=your_uri

# Railway example
railway variables set PORT=5000
```

---

## 📋 Quick Reference

| Task | Command |
|------|---------|
| View variables | `cat .env.local` |
| Edit variables | `nano .env.local` |
| Check symlink | `ls -la server/.env` |
| Restart frontend | `npm run dev` |
| Restart backend | `npm run server:dev` |

---

## ✅ Summary

- ✅ **ONE** `.env.local` file for everything
- ✅ Frontend uses `VITE_` prefixed variables
- ✅ Backend uses non-prefixed variables
- ✅ Symlink keeps server in sync
- ✅ Committed to Git (no .example needed)
- ✅ Simple and clean

**Current Active File:** `.env.local`
