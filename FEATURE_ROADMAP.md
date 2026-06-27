# Feature roadmap

## Shipped

### Web app
- Marketing site with dark-glass UI (hero, features bento, testimonials, stats)
- Auth modal — email/password + Google, Apple, Facebook, Twitter OAuth via Supabase
- Pricing page — monthly/annual toggle, feature comparison table, FAQ
- Analytics dashboard — workout and meal stats with live API data
- Reports page
- Wearables page (UI layer — sync logic in progress)
- Referral and payment flows
- Profile and settings page
- Agent / AI support dashboard
- Chat widget with Socket.io

### Backend
- Auth routes (JWT + Supabase)
- Workout endpoints (create, log, stats)
- Meal endpoints (log, stats, USDA food search)
- Leaderboard
- Challenges and participants
- Social posts and feed
- Friend system
- Wearable data ingestion
- AI endpoints (Google Gemini — meal analysis, workout programming)
- Pose detection service
- Support AI agent (multi-turn conversation)
- Lead capture (waitlist)
- Contact form
- Oracle DB integration for analytics

### Mobile
- Authentication (login / register)
- Home, Leaderboard, Profile tabs
- Snap tab (food scanner)
- Streak screen
- Challenges screen
- Social feed and friends
- Food search and results
- Wearables screen
- Chat FAB with Socket.io

---

## In progress

- Wearable OAuth flows (Apple Health, Garmin Connect, Whoop)
- Recovery readiness score algorithm (HRV + sleep + resting HR)
- Body-composition scanning (Elite plan)
- Push notifications for challenge milestones

---

## Planned

### Phase 1 — Core completeness
- [ ] Wearable data sync (HealthKit / Google Fit live pull)
- [ ] Recovery score live calculation and display
- [ ] Mobile app store submission (iOS + Android)

### Phase 2 — Social and engagement
- [ ] Buddy challenges (1-on-1 direct challenge)
- [ ] Group workouts
- [ ] Achievement badges and XP system

### Phase 3 — AI and analytics
- [ ] Predictive progress analytics (ML model)
- [ ] Adaptive training plan — auto-adjusts based on recovery score
- [ ] AI-powered meal swap suggestions in real time

### Phase 4 — Scale and polish
- [ ] Offline mode (service worker caching for mobile)
- [ ] Performance optimisation (code splitting, lazy routes)
- [ ] End-to-end test suite (Playwright for web, Detox for mobile)
- [ ] Multi-language support (ES, PT, FR)

---

## Implementation priorities

1. Wearable sync — unlocks recovery score and health ecosystem features
2. Mobile app store release — biggest growth channel
3. Buddy challenges — core differentiator for Gen Z retention
4. Adaptive training AI — deepens daily engagement
