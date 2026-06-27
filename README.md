# Reprummble

Reprummble is an all-in-one fitness platform that connects your workouts, nutrition, sleep, and wearables into one adaptive plan. Built for Gen Z — fast, social, and data-driven.

## Monorepo structure

```
reprummble/
├── web/        React 19 + Vite — marketing site and web dashboard
├── mobile/     React Native + Expo — iOS and Android app
├── server/     Node.js + Express — REST API and Socket.io backend
└── docs/       Deployment guides and policy documents
```

## Quick start

Each sub-project runs independently. Start with the one you need:

```bash
# Web app (port 5173)
cd web && npm install && npm run dev

# Backend API (port 4000)
cd server && npm install && npm run dev

# Mobile app (Expo)
cd mobile && npm install && npx expo start
```

Or use the root shortcuts (requires sub-projects already installed):

```bash
npm run web      # starts the web app
npm run server   # starts the backend
npm run mobile   # starts Expo
```

## Tech stack

| Layer    | Stack |
|----------|-------|
| Web      | React 19, Vite, TypeScript, React Router v6 |
| Mobile   | React Native, Expo, TypeScript |
| Backend  | Node.js, Express, Socket.io, TypeScript |
| Auth     | Supabase Auth + Firebase (client) |
| Database | Supabase (Postgres) + Oracle |
| AI       | Google Gemini |

## Documentation

- [QUICKSTART.md](./QUICKSTART.md) — fastest way to run everything locally
- [SETUP.md](./SETUP.md) — environment variables and configuration
- [SECURITY.md](./SECURITY.md) — vulnerability reporting policy
- [FEATURE_ROADMAP.md](./FEATURE_ROADMAP.md) — planned and completed features
- [docs/](./docs/) — deployment guides, policies

## Contributing

Open an issue or email the team at team@reprummble.com.

## License

© 2025 Reprummble — All rights reserved.
