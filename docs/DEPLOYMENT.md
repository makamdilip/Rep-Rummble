# Deployment

This project deploys the web frontend on Vercel and the API on an Oracle Cloud VM.
Oracle ATP is used for the database, and Supabase handles authentication.

## Overview

- Web: Vercel
- API: Oracle Cloud VM (Ubuntu)
- Database: Oracle Autonomous Database (ATP)
- Auth: Supabase
- AI: Gemini

## 1) Database setup (Oracle ATP)

1. Create the ATP instance.
2. Download the wallet and store it on the API server.
3. Use the SQL in `server/src/database/oracle-schema.sql` to create tables.

## 2) Deploy the API on Oracle VM

You can use the helper script:

```bash
# On the Oracle VM
bash server/scripts/oracle-setup.sh
```

Manual steps (summary):

1. Install Node.js 20 and PM2.
2. Clone the repo on the VM.
3. Install dependencies in `server/` and build.
4. Create `server/.env` and fill in production values.
5. Set `TNS_ADMIN` to the wallet folder if using a wallet.
6. Start the API with PM2.
7. Open ports 80/443/5001 and optionally add Nginx for SSL.

The API should be reachable at:

```
http://YOUR_VM_IP:5001
```

## 3) Deploy the web frontend on Vercel

1. Connect the GitHub repo to Vercel.
2. Set the project root to `web`.
3. Add environment variables:
   - `VITE_API_URL` (your VM public URL)
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Build command: `npm run build:web`
5. Output directory: `dist`

## 4) Supabase configuration

- Add your Vercel domain to Supabase Auth redirect URLs.
- Keep the service role key on the API server only.

## Post-deploy checklist

- API health check returns 200.
- Web app can sign in and call the API.
- Supabase Auth redirect URLs are correct.
- Oracle ATP wallet is stored securely and not committed.
- Secrets are set via Vercel env vars and VM `.env`.
