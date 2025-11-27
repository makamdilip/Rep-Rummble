# 🍽️💪✨ Rep Rumble - AI-Powered Fitness & Nutrition Tracker

> **AI-powered food tracking. Smart nutrition analysis. Achieve your fitness goals faster.**

A stunning, modern fitness application for Gen Z combining AI-powered meal recognition, automatic calorie & carb counting, workout tracking, and gamification with a beautiful glassmorphism UI built with React, TypeScript, Tailwind CSS, and Google Gemini AI.

![Rep Rumble](https://img.shields.io/badge/version-1.0.0-brightgreen)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

---

## ✨ Features

### 🤖 **AI Food Recognition** (NEW!)
- **Smart Image Analysis**: Upload or snap photos of your meals
- **Automatic Nutrition Detection**: AI identifies food and calculates:
  - Calories (kcal)
  - Carbohydrates (g)
  - Protein (g)
  - Fat (g)
  - Fiber (g)
- **Confidence Scoring**: See how accurate the AI's analysis is
- **Real-time Processing**: Get instant nutrition breakdowns
- **Meal History with Images**: Review all logged meals with photos

### 🍽️ **Advanced Meal Logging**
- Camera integration for instant photo capture
- Upload from device gallery
- Visual food cards for quick entry (demo mode)
- Real-time calorie and macro tracking
- Beautiful animations and transitions
- Today's meals history with timestamps and nutrition details

### 💪 **Workout Tracking**
- Multiple workout types (Push-ups, Running, Plank, Squats, etc.)
- Streak counter with fire animations
- Workout history with detailed metrics
- Gamified experience with XP and achievements

### 🏆 **Leaderboard & Achievements**
- Weekly leaderboard with rankings
- Achievement system with badges
- User stats dashboard
- Beautiful gradient effects and animations

### 🎨 **Modern Glassmorphism UI Design**
- **Advanced glassmorphism** with backdrop blur and transparency effects
- **Dark gradient theme** with animated background orbs
- **Neon accent colors**: Bright Green (#00FF88), Orange, Purple
- **Smooth animations** powered by Framer Motion
- **Responsive design** optimized for all screen sizes
- **Floating glass cards** with hover effects and glows
- **Lucide React icons** for crisp visuals
- **Custom animations**: glow, shimmer, float effects

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Rep-Rummble

# Install dependencies
npm install

# Set up AI (Optional - for real food recognition)
# Copy the environment template
cp .env.example .env

# Add your Google Gemini API key to .env
# Get your free API key: https://makersuite.google.com/app/apikey
# VITE_GEMINI_API_KEY=your_api_key_here

# Note: App works without API key using mock data!

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🏗️ Tech Stack

### **Frontend**
- **React 19** - Latest React with improved hooks
- **TypeScript 5.9** - Type-safe development
- **Tailwind CSS 4** - Latest utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icon set
- **Vite 7** - Lightning-fast build tool

### **AI & Services**
- **Google Gemini AI (gemini-1.5-flash)** - Food recognition and nutrition analysis
- **LocalStorage** - Data persistence
- **Mock Data System** - Works without API key for demos

### **UI Components**
- Custom component library built with:
  - Button component with variants
  - Card components with glass morphism
  - Input fields with validation
  - Badge components
  - Stat cards with animations

### **State Management**
- React Hooks (useState, useEffect)
- LocalStorage for data persistence
- Context API for authentication

### **Styling Architecture**
- Tailwind CSS utilities
- Custom design tokens
- Responsive breakpoints
- Dark theme by default

---

## 📁 Project Structure

```
Rep-Rummble/
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── index.ts
│   │   ├── HomeTab.tsx            # Enhanced dashboard with nutrition summary
│   │   ├── SnapTab.tsx            # AI food scanner with camera
│   │   ├── StreakTab.tsx          # Workout tracking view
│   │   ├── LeaderboardTab.tsx     # Leaderboard & achievements
│   │   └── NutritionCard.tsx      # Nutrition display components
│   ├── services/
│   │   └── aiVisionService.ts     # Google Gemini AI integration
│   ├── pages/
│   │   └── Dashboard.tsx          # Main dashboard layout with glassmorphism
│   ├── context/
│   │   └── AuthContext.tsx        # Authentication context
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   ├── App.tsx                    # Main app with enhanced login screen
│   ├── main.tsx                   # App entry point
│   └── index.css                  # Global styles with glassmorphism
├── public/                        # Static assets
├── .env.example                   # Environment variables template
├── tailwind.config.js             # Tailwind with glassmorphism config
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies

```

---

## 🎨 Design System

### Color Palette
```css
Primary (Bright Green): #00FF88 (with glow effects)
Secondary (Orange):     #FF6B00 (with glow effects)
Accent (Purple):        #9D4EDD (with glow effects)
Background:             #0a0a0a (gradient with animated orbs)
Glass Surface:          rgba(20, 20, 20, 0.7) with backdrop-blur
Border:                 rgba(255, 255, 255, 0.1) (semi-transparent)
```

### Glassmorphism Effects
- **Backdrop Blur**: 20-24px blur for frosted glass effect
- **Transparency**: 60-70% opacity on cards
- **Border Glow**: Animated borders with gradient transitions
- **Shadow Layers**: Multiple shadow layers for depth
- **Hover Effects**: Enhanced glow on interaction

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, 24-32px
- **Body**: Regular, 14-16px
- **Small Text**: 12-14px

### Components
All components are built with:
- Consistent padding and spacing
- Smooth hover/tap animations
- Accessible color contrasts
- Responsive design patterns

---

## 🔧 Available Scripts

### Development
```bash
# Start development server with hot reload
npm run dev
```

### Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run ESLint
npm run lint
```

---

## 📱 Features Walkthrough

### 1. **Login Screen**
- Modern gradient text logo
- Glass morphism card design
- Email login or demo mode
- Smooth entry animations

### 2. **Home Dashboard**
- Daily summary with 4 stat cards
- Recent meals and workouts
- Real-time data from localStorage
- Animated list items

### 3. **AI Food Scanner Tab**
- **Take Photo**: Direct camera access for instant capture
- **Upload Image**: Select from device gallery
- **AI Analysis**: Real-time food recognition with loading animation
- **Nutrition Breakdown**: Complete macro display with icons
- **Confidence Score**: AI accuracy percentage
- **Auto-save**: Meals automatically logged after analysis
- **Image Preview**: See your food with analysis overlay
- **Today's Summary**: Total nutrition at a glance
- **Meal History**: All logged meals with images and details

### 4. **Workout Tracker Tab**
- Workout cards with icons
- Streak counter
- Automatic XP calculation
- History tracking

### 5. **Leaderboard Tab**
- Weekly rankings with animations
- Achievement badges (locked/unlocked states)
- Personal stats dashboard
- Crown icon for #1 rank

---

## 🎯 Key Features Implementation

### **Animations**
All major UI elements use Framer Motion for:
- Page transitions
- List item stagger effects
- Button hover/tap animations
- Success notification slides

### **Responsive Design**
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Sticky header and navigation
- Touch-friendly buttons

### **Data Persistence**
Using browser localStorage:
```typescript
rep_rumble_user      // User profile
rep_rumble_meals     // Meal history
rep_rumble_workouts  // Workout history
```

---

## 🚧 Future Enhancements

### Completed Features ✅
- [x] AI-powered meal recognition
- [x] Automatic nutrition calculation
- [x] Camera integration
- [x] Glassmorphism UI design
- [x] Carbs, protein, fat tracking
- [x] Image-based meal logging

### Planned Features 🚀
- [ ] Backend API integration (Firebase/Supabase)
- [ ] User authentication system
- [ ] Real-time multiplayer challenges
- [ ] Mobile app (React Native/Expo)
- [ ] Social features (friends, sharing)
- [ ] Push notifications
- [ ] Light theme toggle
- [ ] Custom workout creation
- [ ] Progress charts and analytics
- [ ] Export data to CSV/PDF
- [ ] Weekly/monthly nutrition reports
- [ ] Food database for manual entry
- [ ] Barcode scanner
- [ ] Wearable device integration

---

## 🤝 Contributing

This is a personal/portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is created for educational and portfolio purposes.

---

## 👨‍💻 Author

Built with ❤️ for Gen Z fitness enthusiasts

---

## 🙏 Acknowledgments

- **Tailwind CSS** - Amazing utility-first framework
- **Framer Motion** - Buttery smooth animations
- **Lucide** - Beautiful open-source icons
- **React** - The best UI library
- **Vite** - Lightning-fast tooling

---

## 📸 Screenshots

### Login Screen
Beautiful gradient text with glass morphism card design

### Dashboard
Modern dark theme with neon accents and smooth animations

### Meal Logging
Quick snap and log with visual food cards

### Workout Tracking
Gamified experience with streak counter

### Leaderboard
Competitive rankings with achievement badges

---

## 🔥 Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview build
npm run lint             # Run linter

# Dependencies
npm install              # Install all packages
npm install <package>    # Add new package
npm update              # Update packages
```

---

## 💡 Tips for Development

1. **Component Creation**: Always use TypeScript interfaces
2. **Styling**: Prefer Tailwind utilities over custom CSS
3. **Animations**: Use Framer Motion for all transitions
4. **Icons**: Import from lucide-react for consistency
5. **Colors**: Use theme colors (primary, secondary, accent)
6. **Responsiveness**: Test on mobile breakpoints

---

## 🐛 Known Issues

None at the moment! This is a fresh, clean build.

---

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Happy Coding! 💪🔥**

Track meals. Crush reps. Win with friends.
