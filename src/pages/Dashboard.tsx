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
      {/* Header */}
      <header className="sticky top-0 z-50 card-glass backdrop-blur-2xl border-b border-card shadow-glass">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold"
            >
              <span className="text-gradient">Rep Rumble</span>
            </motion.h1>
            <span className="text-2xl">💪🔥</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm text-gray-400">Welcome back!</p>
              <p className="text-sm font-semibold text-primary">
                {user?.email}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-[73px] z-40 card-glass backdrop-blur-2xl border-b border-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-400 hover:text-app border-b-2 border-transparent"
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
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
      <footer className="border-t border-card mt-12 py-6 card-glass backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-2">Built for Gen Z fitness enthusiasts 💪</p>
          <p className="text-xs">
            © 2025 Rep Rumble - AI-Powered Nutrition Tracking
          </p>
        </div>
      </footer>
    </div>
  );
}
