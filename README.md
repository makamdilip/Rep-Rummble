# Rep Rumble

Rep Rumble is a fitness and nutrition app concept that combines meal logging, workout tracking, and social challenges in one experience.

## What this project includes
- A Vite + React web app
- A Node.js starter backend
- A mobile app starter structure for Expo-style development
- Firebase-ready configuration for auth, storage, and database features

## Quick start
1. Install dependencies
   ```bash
   npm install
   ```
2. Start the web app
   ```bash
   npm run dev
   ```
3. Start the backend starter
   ```bash
   npm run backend:dev
   ```
4. Optional: preview the mobile starter
   ```bash
   npm run mobile:web
   ```

## Documentation
- [QUICKSTART.md](./QUICKSTART.md) — fastest way to run the project locally
- [SETUP.md](./SETUP.md) — environment setup and troubleshooting

## Project structure
- [src](./src) — frontend screens and components
- [public](./public) — static assets
- [backend-starter.js](./backend-starter.js) — starter backend server
- [mobile-app-starter.js](./mobile-app-starter.js) — mobile starter entry

## Next steps
- Review the quick start guide
- Configure Firebase environment variables if you want full backend features
- Extend the app with your own features and screens

### 2. Set Up Environment
```bash
cp .env.example .env
# Fill in Firebase credentials
```

### 3. Start Development
```bash
# Terminal 1: Backend
node backend-starter.js

# Terminal 2: Frontend
npm run dev

# Terminal 3: Mobile (optional)
npm run mobile:web
```

### 4. Build a Feature
- Pick an endpoint from `API_DOCUMENTATION.md`
- Implement in `backend-starter.js`
- Test with `curl` or Postman
- Add UI component in screen files

---

## 🐛 Troubleshooting

**Backend won't start?**
```bash
lsof -ti:5000 | xargs kill -9  # Kill existing process
node backend-starter.js
```

**Firebase auth failing?**
1. Check `.env` has all credentials
2. Verify auth methods enabled in Firebase Console
3. Check Firestore rules

**React Native issues?**
```bash
npm cache clean --force
rm -rf node_modules
npm install
npm run mobile:web
```

See [SETUP.md](./SETUP.md#troubleshooting) for more.

---

## 📊 Success Metrics

| Metric | Target |
|--------|--------|
| DAU | > 50% of registered users |
| Meal logs | > 2 per day (average) |
| Challenge participation | > 60% |
| 7-day retention | > 40% |
| AI accuracy | > 85% |
| NPS | > 50 |

---

## 🤝 Contributing

**Interested in helping build Rep Rumble?** Contact us:
- GitHub Issues (coming soon)
- Email: team@reprumble.com

---

## 📝 License

Rep Rumble © 2025 - All Rights Reserved

---

## 🎯 Next Steps

1. ✅ Read [QUICKSTART.md](./QUICKSTART.md)
2. ⏳ Set up Firebase project
3. ⏳ Start backend + frontend
4. ⏳ Implement first feature
5. ⏳ Deploy MVP

**Ready to build? Let's go! 🚀**
