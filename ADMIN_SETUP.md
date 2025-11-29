# 🔐 Admin Authentication Setup

## Overview

Your app is now secured with **admin-only access**. Only users with the correct admin credentials can log in.

---

## Current Admin Credentials

The default admin credentials are set in your [.env](.env) file:

```bash
VITE_ADMIN_EMAIL=admin@reprumble.com
VITE_ADMIN_PASSWORD=admin123456
```

---

## How to Login

1. Go to http://localhost:5174/login (or your deployed URL)
2. Enter the admin email and password
3. Click "Sign in"

**Default Login:**
- **Email:** `admin@reprumble.com`
- **Password:** `admin123456`

---

## 🔒 Security Features

### 1. Admin-Only Access
- ✅ Sign up is **disabled**
- ✅ Only admin credentials work for login
- ✅ Invalid credentials show error message
- ✅ No one else can create an account

### 2. Password Confirmation on Signup Page
- ✅ Signup page requires password confirmation
- ✅ Validates that passwords match
- ✅ Shows error if passwords don't match
- ✅ Minimum 6 character password requirement

**Note:** Even though signup has these validations, it will always fail with the message: _"Sign up is disabled. Please contact admin for access."_

### 3. Protected Routes
- ✅ Unauthenticated users redirected to `/login`
- ✅ All dashboard features require authentication
- ✅ Session persists in localStorage

---

## 🔧 How to Change Admin Credentials

### For Development (Local)

Edit your [.env](.env) file:

```bash
# Change these values
VITE_ADMIN_EMAIL=your.email@example.com
VITE_ADMIN_PASSWORD=YourSecurePassword123
```

Then restart the dev server:
```bash
# Kill current server (Ctrl+C)
npm run dev
```

### For Production (GitHub Pages)

**IMPORTANT:** Do NOT commit real credentials to GitHub!

**Option 1: Use GitHub Secrets (Recommended)**

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add repository secrets:
   - `VITE_ADMIN_EMAIL`
   - `VITE_ADMIN_PASSWORD`

4. Update `.github/workflows/deploy.yml` to use secrets:
```yaml
- name: Build
  run: npm run build
  env:
    VITE_ADMIN_EMAIL: ${{ secrets.VITE_ADMIN_EMAIL }}
    VITE_ADMIN_PASSWORD: ${{ secrets.VITE_ADMIN_PASSWORD }}
```

**Option 2: Environment Variables at Build Time**

Set environment variables when building:
```bash
VITE_ADMIN_EMAIL=admin@example.com VITE_ADMIN_PASSWORD=secure123 npm run build
```

---

## ⚠️ Security Warnings

### Client-Side Authentication Limitations

Since this is a static site (GitHub Pages), authentication is **client-side only**:

❌ **Not Truly Secure:**
- Admin credentials are embedded in the JavaScript bundle
- Anyone can view the source code and extract credentials
- This is NOT suitable for protecting sensitive data

✅ **Good For:**
- Personal portfolio projects
- Demo applications
- Preventing casual visitors
- Discouraging unauthorized access

### Recommendations for Better Security

If you need real security:

1. **Use a backend** with proper authentication (Firebase, Supabase, etc.)
2. **Use OAuth** (Google, GitHub login)
3. **Deploy to a server** with server-side authentication
4. **Use environment variables** at build time (not committed to Git)

---

## 🧪 Testing

### Test Admin Login
1. Go to http://localhost:5174/login
2. Enter: `admin@reprumble.com` / `admin123456`
3. Should successfully log in to dashboard

### Test Invalid Login
1. Go to http://localhost:5174/login
2. Enter: `wrong@email.com` / `wrongpassword`
3. Should show error: "Invalid email or password"

### Test Signup Disabled
1. Go to http://localhost:5174/signup
2. Fill in all fields (including matching passwords)
3. Click "Create account"
4. Should show error: "Sign up is disabled. Please contact admin for access."

### Test Password Confirmation
1. Go to http://localhost:5174/signup
2. Enter email and password
3. Enter different password in "Confirm password"
4. Click submit
5. Should show error: "Passwords do not match"

---

## 📝 How It Works

### Authentication Flow

1. **Login Request**
   - User enters email and password
   - App checks against `VITE_ADMIN_EMAIL` and `VITE_ADMIN_PASSWORD`
   - If match: logs in and saves to localStorage
   - If no match: shows error

2. **Session Persistence**
   - User object stored in `localStorage.rep_rumble_user`
   - Survives page refreshes
   - Cleared on logout

3. **Signup Disabled**
   - Signup form displays but always fails
   - Shows password confirmation for UI completeness
   - Validates password match before attempting signup
   - Returns error message about admin access

### Code Locations

- **Auth Logic:** [src/context/AuthContext.tsx](src/context/AuthContext.tsx:58-84)
- **Login Screen:** [src/App.tsx](src/App.tsx:60-115)
- **Signup Screen:** [src/App.tsx](src/App.tsx:117-194)
- **Credentials:** [.env](.env:1-3)

---

## 🚀 Deployment Checklist

Before deploying to GitHub Pages:

- [ ] Change default admin credentials in `.env`
- [ ] Add credentials to GitHub Secrets (if using)
- [ ] Update GitHub Actions workflow (if using secrets)
- [ ] Test login with new credentials locally
- [ ] Build and deploy
- [ ] Test login on deployed site
- [ ] **DO NOT** commit `.env` file to Git (it's in `.gitignore`)

---

## 🔓 How to Remove Authentication (Optional)

If you want to remove authentication entirely:

1. Edit [src/App.tsx](src/App.tsx):
```typescript
// Remove the login check
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
```

2. Remove AuthProvider from [src/main.tsx](src/main.tsx)

---

## Summary

✅ **Admin credentials:** Set in `.env`
✅ **Login only:** Email + password must match admin credentials
✅ **Signup disabled:** No one can create accounts
✅ **Password confirmation:** Validates matching passwords on signup form
✅ **Session management:** Uses localStorage
✅ **Protected routes:** Redirects unauthenticated users

**Next step:** Change your admin credentials before deploying! 🔐
