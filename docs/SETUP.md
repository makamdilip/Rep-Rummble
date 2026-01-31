# Setup

This guide sets up local development for Rep Rummble using Supabase Auth, Oracle ATP, and Gemini AI.

## Prerequisites

- Node.js 18+ (20 recommended)
- Git
- Accounts:
  - Supabase (Auth)
  - Oracle Cloud (Autonomous Database + VM)
  - Google AI Studio (Gemini API key)
  - Vercel (web hosting)

## 1) Clone and install

```bash
git clone https://github.com/makamdilip/Rep-Rummble.git
cd Rep-Rummble
npm run setup
```

## 2) Create a Supabase project

1. Create a project in Supabase.
2. Go to Project Settings -> API.
3. Copy these values:
   - Project URL
   - anon key (public)
   - service role key (server-only)
4. In Supabase Auth settings, add redirect URLs:
   - http://localhost:5173
   - your Vercel domain (for production)

## 3) Create an Oracle Autonomous Database (ATP)

1. Create an ATP instance.
2. Create a database user (or use ADMIN).
3. Download the wallet zip.
4. Extract it on the machine running the API.
5. Use the connect string or TNS name from `tnsnames.ora`.

## 4) Create a Gemini API key

1. Create a key in Google AI Studio.
2. Save it as `GEMINI_API_KEY` in the server environment.

## 5) Configure environment variables

### Backend (`server/.env`)

```bash
cp server/.env.example server/.env
```

Fill in:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY` (server-only)
- `ORACLE_USER`
- `ORACLE_PASSWORD`
- `ORACLE_CONNECTION_STRING`
- `GEMINI_API_KEY`
- `JWT_SECRET`

If you are using the Oracle wallet, also set:
- `TNS_ADMIN` to the wallet folder path

### Web (`web/.env.local`)

```bash
cp web/.env.example web/.env.local
```

Fill in:
- `VITE_API_URL` (leave empty for local proxy, or set to http://localhost:5001)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 6) Run locally

```bash
npm run dev
```

Services:
- API: http://localhost:5001
- Web: http://localhost:5173

## Secrets checklist

- Never commit `.env` files or wallet zips.
- Only the Supabase anon key is allowed in web/mobile clients.
- Keep `SUPABASE_SERVICE_KEY`, DB passwords, and Gemini keys server-only.
- Use Vercel environment variables in production.
- Rotate keys immediately if exposed.
- Enable GitHub secret scanning on the repo.

