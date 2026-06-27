# Quick start

Get the project running locally in under 5 minutes.

## Prerequisites

- Node.js 18 or newer
- npm
- Expo CLI (for mobile only): `npm install -g expo-cli`

---

## Web app

```bash
cd web
npm install
cp .env.example .env.local   # fill in your env vars (see SETUP.md)
npm run dev
```

Opens on `http://localhost:5173`.

---

## Backend server

```bash
cd server
npm install
cp .env.example .env         # fill in your env vars (see SETUP.md)
npm run dev
```

Starts on `http://localhost:4000` (or the port in your `.env`).

---

## Mobile app

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with Expo Go on your phone, or press `w` for the web preview.

---

## Running everything together

Open three terminals and run each of the above in parallel. The web app calls the backend via `VITE_API_URL`, so start the server first.

---

## Common issues

| Problem | Fix |
|---------|-----|
| Port already in use | `lsof -ti:<port> \| xargs kill -9` |
| Missing packages | `npm install` inside the relevant sub-folder |
| Env vars not loading | Check the `.env.local` / `.env` file is in the right sub-folder, not the root |
| Expo won't start | `npx expo doctor` to diagnose, then re-run |
| TypeScript errors | `cd web && node_modules/.bin/tsc -b --noEmit` to see all errors |
