import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card'
import { Badge } from '../../ui/Badge'
import { Trophy, Award, Crown } from 'lucide-react'

const SAMPLE_LEADERBOARD = [
  { rank: 1, name: 'Alex (You)', streak: 12, xp: 1250, badge: '👑' },
  { rank: 2, name: 'Priya', streak: 8, xp: 850, badge: '⭐' },
  { rank: 3, name: 'Rohan', streak: 5, xp: 650, badge: '🥉' },
  { rank: 4, name: 'Sophia', streak: 3, xp: 450, badge: '' },
  { rank: 5, name: 'Dev', streak: 2, xp: 300, badge: '' },
]

const ACHIEVEMENTS = [
  { id: 1, emoji: '🎯', name: '3-Day Warrior', unlocked: true, description: 'Complete 3-day streak' },
  { id: 2, emoji: '⭐', name: 'Meal Master', unlocked: true, description: 'Log 50+ meals' },
  { id: 3, emoji: '👑', name: 'Gym Legend', unlocked: false, description: 'Complete 20+ workouts' },
  { id: 4, emoji: '🚀', name: 'Challenge Champion', unlocked: false, description: 'Win 10 challenges' },
  { id: 5, emoji: '💎', name: 'Diamond Streak', unlocked: false, description: 'Maintain 30-day streak' },
  { id: 6, emoji: '🔥', name: 'Fire Starter', unlocked: true, description: 'Start your first workout' },
]

export default function LeaderboardTab() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-app flex items-center gap-2">
        <Trophy className="text-accent" size={24} />
        <span className="hidden xs:inline">Weekly Leaderboard</span>
        <span className="xs:hidden">Leaderboard</span>
      </h2>

      <Card variant="glass">
        <CardContent>
          <div className="space-y-2 sm:space-y-3">
            {SAMPLE_LEADERBOARD.map((user, idx) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg border transition-all ${
                  user.rank === 1
                    ? "bg-accent/20 border-accent shadow-accent/20"
                    : "surface border-card hover:border-primary"
                }`}
              >
                <div className="text-2xl sm:text-3xl font-bold w-8 sm:w-12 text-center shrink-0">
                  {user.rank === 1 ? (
                    <Crown className="text-accent inline" size={24} />
                  ) : user.badge ? (
                    user.badge
                  ) : (
                    <span className="text-gray-400">#{user.rank}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-semibold text-sm sm:text-base truncate ${
                      user.rank === 1 ? "text-accent" : "text-app"
                    }`}
                  >
                    {user.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
                    🔥 {user.streak} day streak
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className={`text-xl sm:text-2xl font-bold ${
                      user.rank === 1 ? "text-accent" : "text-primary"
                    }`}
                  >
                    {user.xp}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400">XP</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="text-primary" size={20} />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {ACHIEVEMENTS.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-3 sm:p-4 rounded-lg text-center transition-all ${
                  achievement.unlocked
                    ? "bg-primary/10 border-2 border-primary hover:bg-primary/20"
                    : "surface border-2 border-card opacity-50"
                }`}
              >
                <div
                  className={`text-4xl sm:text-5xl mb-1.5 sm:mb-2 ${
                    !achievement.unlocked && "grayscale"
                  }`}
                >
                  {achievement.emoji}
                </div>
                <p
                  className={`font-semibold text-xs sm:text-sm mb-1 ${
                    achievement.unlocked ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {achievement.name}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <Badge variant="success" className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs">
                    Unlocked
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">📊 Your Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 surface rounded-lg">
              <p className="text-gray-400 text-xs sm:text-sm mb-1">Total XP</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">1,250</p>
            </div>
            <div className="text-center p-3 sm:p-4 surface rounded-lg">
              <p className="text-gray-400 text-xs sm:text-sm mb-1">Rank</p>
              <p className="text-2xl sm:text-3xl font-bold text-accent">#1</p>
            </div>
            <div className="text-center p-3 sm:p-4 surface rounded-lg">
              <p className="text-gray-400 text-xs sm:text-sm mb-1">Achievements</p>
              <p className="text-2xl sm:text-3xl font-bold text-secondary">3/6</p>
            </div>
            <div className="text-center p-3 sm:p-4 surface rounded-lg">
              <p className="text-gray-400 text-xs sm:text-sm mb-1">Best Streak</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">12 🔥</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
