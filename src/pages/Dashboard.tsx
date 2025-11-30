import { useState } from 'react'
import { motion } from 'framer-motion'
import { HomeTab } from '../components/features/dashboard'
import { SnapTab } from '../components/features/nutrition'
import { StreakTab } from '../components/features/workout'
import { LeaderboardTab } from '../components/features/leaderboard'
import { Home, Camera, Flame, Trophy, LogOut } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "snap", label: "Snap Meal", icon: Camera },
    { id: "streak", label: "Workout", icon: Flame },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-app relative">
      {/* Unified Navigation Bar */}
      <header className="sticky top-0 z-50 card-glass backdrop-blur-2xl border-b border-card shadow-glass">
        <div className="w-full mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo Section */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-lg sm:text-2xl md:text-3xl font-bold"
              >
                <span className="text-gradient">Rep Rumble</span>
              </motion.h1>
              <span className="text-base sm:text-xl md:text-2xl">💪🔥</span>
            </div>

            {/* Navigation Tabs - Center */}
            <nav className="flex gap-1 sm:gap-1.5 md:gap-2 overflow-x-auto flex-1 justify-center scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all whitespace-nowrap text-xs sm:text-sm md:text-base ${
                      activeTab === tab.id
                        ? "bg-primary/20 text-primary"
                        : "text-gray-400 hover:text-app hover:bg-card/50"
                    }`}
                  >
                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="hidden xs:inline">{tab.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* User Info & Logout - Right */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 shrink-0">
              <div className="text-right hidden lg:block">
                <p className="text-xs text-gray-400">Welcome back!</p>
                <p className="text-sm font-semibold text-primary truncate max-w-[150px]">
                  {user?.email}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
              >
                <LogOut size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="w-full mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "home" && <HomeTab />}
          {activeTab === "snap" && <SnapTab />}
          {activeTab === "streak" && <StreakTab />}
          {activeTab === "leaderboard" && <LeaderboardTab />}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-card mt-8 sm:mt-12 py-4 sm:py-6 card-glass backdrop-blur-xl">
        <div className="w-full mx-auto px-3 sm:px-4 text-center text-gray-500 text-xs sm:text-sm">
          <p className="mb-1 sm:mb-2">Built for Gen Z fitness enthusiasts 💪</p>
          <p className="text-[10px] sm:text-xs">
            © 2025 Rep Rumble - AI-Powered Nutrition Tracking
          </p>
        </div>
      </footer>
    </div>
  );
}
