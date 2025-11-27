# 🍽️💪✨ Rep Rumble - AI-Powered Fitness & Nutrition Tracker

> **AI-powered food tracking. Smart nutrition analysis. Achieve your fitness goals faster.**

A modern **MERN stack** fitness application combining AI-powered meal recognition, automatic nutrition analysis, workout tracking, and gamification with a beautiful glassmorphism UI.

![Rep Rumble](https://img.shields.io/badge/version-1.0.0-brightgreen)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)
![Tailwind](https://img.shields.io/badge/Tailwind-4.x-38bdf8)

[Live Demo](https://yourusername.github.io/Rep-Rummble/) • [Documentation](./SETUP.md) • [API Docs](./server/API.md) • [Report Bug](https://github.com/yourusername/Rep-Rummble/issues)

---

## 📸 Screenshots

[Add screenshots here]

---

## ✨ Features

### 🤖 AI-Powered Food Recognition
- **Smart Image Analysis**: Upload or capture photos of meals
- **Automatic Nutrition Detection**: AI identifies food and calculates macros
- **Confidence Scoring**: Accuracy indicators for AI predictions
- **Real-time Processing**: Instant nutrition breakdowns
- **Meal History**: Review logged meals with photos and timestamps

### 💪 Comprehensive Fitness Tracking
- **Workout Logging**: Multiple exercise types with duration tracking
- **Streak Counter**: Stay motivated with daily streaks
- **Progress Visualization**: Charts and graphs for progress
- **XP & Leveling System**: Gamified experience

### 🏆 Social & Competitive Features
- **Global Leaderboard**: Compete with friends and community
- **Achievement System**: Unlock badges and rewards
- **User Rankings**: XP-based competitive rankings

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effects
- **Dark Theme**: Eye-friendly dark mode
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Works on all devices
- **Accessibility**: WCAG 2.1 AA compliant

### 🔐 Authentication & Security
- **Email/Password Auth**: Secure user authentication
- **JWT Tokens**: Stateless authentication
- **Protected Routes**: Role-based access control
- **Password Hashing**: BCrypt encryption

---

## 🏗️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Firebase** - Authentication (alternative)
- **Recharts** - Data visualization

### Backend
- **Node.js 20+** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **BCrypt** - Password hashing

### AI & External Services
- **Google Gemini AI** - Food recognition
- **USDA FoodData Central** - Nutrition database (optional)

### DevOps
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Frontend hosting
- **Heroku/Railway/Render** - Backend hosting options

---

## 📁 Project Structure

```
Rep-Rummble/
├── src/                         # Frontend source
│   ├── components/
│   │   ├── features/           # Feature-specific components
│   │   │   ├── auth/           # Authentication
│   │   │   ├── dashboard/      # Dashboard/Home
│   │   │   ├── nutrition/      # Meal tracking & AI
│   │   │   ├── workout/        # Workout tracking
│   │   │   └── leaderboard/    # Rankings & achievements
│   │   ├── ui/                 # Reusable UI components
│   │   └── common/             # Shared components
│   ├── context/                # React Context
│   ├── hooks/                  # Custom hooks
│   ├── services/               # API services
│   │   ├── api/                # Backend API
│   │   └── external/           # External APIs
│   ├── types/                  # TypeScript types
│   ├── pages/                  # Page components
│   └── utils/                  # Helpers
├── server/                      # Backend source
│   └── src/
│       ├── controllers/        # Request handlers
│       ├── models/             # Mongoose models
│       ├── routes/             # API routes
│       ├── middleware/         # Express middleware
│       ├── services/           # Business logic
│       └── config/             # Configuration
├── .github/workflows/          # CI/CD pipelines
├── public/                     # Static assets
├── SETUP.md                    # Setup guide
├── DEPLOYMENT.md               # Deployment guide
└── README.md                   # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm 10+
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Rep-Rummble.git
cd Rep-Rummble
```

### 2. Install Dependencies

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
cd ..
```

### 3. Configure Environment Variables

```bash
# Frontend
cp .env.example .env
# Edit .env and add your API keys

# Backend
cp server/.env.example server/.env
# Edit server/.env and add your configuration
```

### 4. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or set up MongoDB Atlas (see SETUP.md)
```

### 5. Run the Application

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server:dev
```

Visit:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000/api

---

## 📖 Documentation

- **[Setup Guide](./SETUP.md)** - Complete installation instructions
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment
- **[API Documentation](./server/API.md)** - Backend API reference
- **[AI Setup Guide](./AI_SETUP_GUIDE.md)** - Configure AI services
- **[Contributing Guide](./CONTRIBUTING.md)** - Contribution guidelines

---

## 🔑 Environment Variables

### Frontend (`.env`)

```bash
VITE_GEMINI_API_KEY=          # Google Gemini AI API key
VITE_FIREBASE_API_KEY=        # Firebase configuration
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_USDA_API_KEY=            # USDA nutrition database (optional)
VITE_API_URL=                 # Backend API URL (production)
```

### Backend (`server/.env`)

```bash
PORT=5000                      # Server port
NODE_ENV=development           # Environment
MONGODB_URI=                   # MongoDB connection string
JWT_SECRET=                    # JWT secret key
JWT_EXPIRE=7d                  # Token expiration
CLIENT_URL=                    # Frontend URL (for CORS)
```

See [.env.example](./.env.example) and [server/.env.example](./server/.env.example) for complete templates.

---

## 🧪 Testing

```bash
# Frontend tests
npm run test

# Backend tests
cd server
npm run test

# E2E tests
npm run test:e2e
```

---

## 📦 Building for Production

### Frontend

```bash
npm run build
npm run preview  # Preview build
```

### Backend

```bash
cd server
npm run build
npm start
```

---

## 🚢 Deployment

### Automatic Deployment (GitHub Actions)

Push to the `master` branch to automatically deploy:

```bash
git push origin master
```

### Manual Deployment

```bash
# Deploy frontend to GitHub Pages
npm run deploy

# Deploy backend (Heroku example)
cd server
heroku create
git push heroku master
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

---

## 🛠️ Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run deploy       # Deploy to GitHub Pages
```

### Backend

```bash
npm run server:dev   # Start backend dev server
npm run server:build # Build backend
npm run server:start # Start production server
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) first.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 API Endpoints

### Authentication
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
GET    /api/auth/me          # Get current user
```

### Meals
```
GET    /api/meals            # Get all user meals
POST   /api/meals            # Create meal
GET    /api/meals/:id        # Get single meal
DELETE /api/meals/:id        # Delete meal
```

### Workouts
```
GET    /api/workouts         # Get all user workouts
POST   /api/workouts         # Create workout
GET    /api/workouts/:id     # Get single workout
DELETE /api/workouts/:id     # Delete workout
```

### Leaderboard
```
GET    /api/leaderboard      # Get global leaderboard
```

See full [API Documentation](./server/API.md)

---

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Social features (friend challenges)
- [ ] Recipe suggestions based on goals
- [ ] Integration with fitness trackers
- [ ] Meal planning & grocery lists
- [ ] Barcode scanning
- [ ] Voice input for meal logging
- [ ] Apple Health / Google Fit integration
- [ ] Premium features & subscriptions

---

## 🐛 Known Issues

See [GitHub Issues](https://github.com/yourusername/Rep-Rummble/issues) for current bugs and feature requests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 👏 Acknowledgments

- Google Gemini AI for food recognition
- Firebase for authentication
- MongoDB Atlas for database hosting
- Tailwind CSS for styling
- Framer Motion for animations
- All open-source contributors

---

## 📧 Contact

- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Email**: your.email@example.com
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/Rep-Rummble&type=Date)](https://star-history.com/#yourusername/Rep-Rummble&Date)

---

**Built with ❤️ for fitness enthusiasts**

[⬆ Back to Top](#-rep-rumble---ai-powered-fitness--nutrition-tracker)
