# Setup guide

Full configuration reference for all three sub-projects.

---

## Web app (`web/`)

### Environment variables

Copy `web/.env.example` to `web/.env.local` and fill in:

```env
# Supabase (required for auth)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Firebase (client-side config — from Firebase Console → Project Settings → Web app)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend URL (used for API calls from the browser)
VITE_API_URL=http://localhost:4000

# Site URL (used for OAuth redirects)
VITE_SITE_URL=http://localhost:5173
```

### Scripts

```bash
npm run dev        # start dev server
npm run build      # production build → web/dist
npm run typecheck  # TypeScript check only
npm run lint       # ESLint
npm run preview    # preview the production build locally
```

---

## Backend server (`server/`)

### Environment variables

Copy `server/.env.example` to `server/.env` (the file is in `server/` — do not put it at the root):

```env
PORT=4000
NODE_ENV=development

# Supabase (service-role key — server only, never expose to the browser)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Oracle DB (optional — only needed for analytics features)
ORACLE_USER=your_user
ORACLE_PASSWORD=your_password
ORACLE_CONNECTION_STRING=your_connection_string

# Google Gemini AI
GEMINI_API_KEY=your_gemini_key

# JWT
JWT_SECRET=a_long_random_string
JWT_EXPIRES_IN=7d
```

> **Security:** Never commit `.env` files. They are excluded by `.gitignore`.
> Firebase Admin SDK JSON keys must also never be committed — store them as env vars or secrets in your deployment platform.

### Scripts

```bash
npm run dev    # start with ts-node / nodemon
npm run build  # compile TypeScript → server/dist
npm start      # run compiled output
```

---

## Mobile app (`mobile/`)

### Environment variables

React Native / Expo reads env vars from `app.json` `extra` or an `.env` file via a Babel plugin. Update `mobile/src/config/api.ts` with your server URL.

### Scripts

```bash
npx expo start          # interactive menu (QR code)
npx expo start --ios    # iOS simulator
npx expo start --android # Android emulator
npx expo start --web    # web preview
```

---

## Troubleshooting

### Web app shows blank page after login
Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set correctly in `web/.env.local`.

### OAuth redirect fails
Set `VITE_SITE_URL` and add `http://localhost:5173/auth/callback` to your Supabase project's allowed redirect URLs.

### Backend crashes on startup
Check the `server/.env` file has all required variables. Missing `SUPABASE_SERVICE_ROLE_KEY` or `GEMINI_API_KEY` will cause immediate failure.

### Expo Expo Go can't connect
Make sure your phone and development machine are on the same Wi-Fi network. Use `npx expo start --tunnel` if they can't reach each other directly.
