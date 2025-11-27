# 🔥 Rep Rumble - Modern Fitness & Nutrition Tracker

> **Track meals. Crush reps. Win with friends.**

A stunning, modern fitness application for Gen Z combining meal logging, workout tracking, and gamification with a beautiful UI built with React, TypeScript, Tailwind CSS, and Framer Motion.

![Rep Rumble](https://img.shields.io/badge/version-1.0.0-brightgreen)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

---

## ✨ Features

### 🍽️ **Meal Logging**
- Quick meal logging with visual food cards
- Real-time calorie tracking
- Beautiful animations and transitions
- Today's meals history with timestamps

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

### 🎨 **Modern UI Design**
- **Dark theme** with neon accent colors (Green, Orange, Purple)
- **Smooth animations** powered by Framer Motion
- **Responsive design** for all screen sizes
- **Glass morphism** effects and modern cards
- **Lucide React icons** for crisp visuals
- **Tailwind CSS** for utility-first styling

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

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🏗️ Tech Stack

### **Frontend**
- **React 19** - Latest React with improved hooks
- **TypeScript 5.9** - Type-safe development
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icon set
- **Vite 7** - Lightning-fast build tool

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
│   │   ├── HomeTab.tsx            # Dashboard home view
│   │   ├── SnapTab.tsx            # Meal logging view
│   │   ├── StreakTab.tsx          # Workout tracking view
│   │   └── LeaderboardTab.tsx     # Leaderboard & achievements
│   ├── pages/
│   │   └── Dashboard.tsx          # Main dashboard layout
│   ├── context/
│   │   └── AuthContext.tsx        # Authentication context
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # App entry point
│   └── index.css                  # Global styles & Tailwind
├── public/                        # Static assets
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies

```

---

## 🎨 Design System

### Color Palette
```css
Primary (Neon Green):   #00FF00
Secondary (Orange):     #FF6B00
Accent (Purple):        #9D4EDD
Background:             #0a0a0a
Surface:                #1a1a1a
Border:                 #333333
```

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

### 3. **Snap Meal Tab**
- Grid of food options with emojis
- One-click meal logging
- Today's total calories
- Success notifications

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

### Planned Features
- [ ] Backend API integration (Firebase/Supabase)
- [ ] Real-time multiplayer challenges
- [ ] Mobile app (React Native/Expo)
- [ ] Social features (friends, sharing)
- [ ] AI-powered meal recognition
- [ ] Push notifications
- [ ] Dark/Light theme toggle
- [ ] Custom workout creation
- [ ] Progress charts and analytics
- [ ] Export data to CSV/PDF

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
