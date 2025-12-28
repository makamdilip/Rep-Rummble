import '../styles/Tabs.css';

const SAMPLE_LEADERBOARD = [
  { rank: 1, name: 'Alex (You)', streak: 12, xp: 1250, badge: '👑' },
  { rank: 2, name: 'Priya', streak: 8, xp: 850, badge: '⭐' },
  { rank: 3, name: 'Rohan', streak: 5, xp: 650, badge: '🥉' },
  { rank: 4, name: 'Sophia', streak: 3, xp: 450, badge: '' },
  { rank: 5, name: 'Dev', streak: 2, xp: 300, badge: '' },
];

export default function LeaderboardTab() {
  return (
    <div className="tab-content">
      <h2>🏆 Weekly Leaderboard</h2>

      <div className="leaderboard-container">
        {SAMPLE_LEADERBOARD.map((user) => (
          <div key={user.rank} className="leaderboard-item">
            <div className="rank-position">{user.badge || `#${user.rank}`}</div>
            <div className="rank-info">
              <div className="rank-name">{user.name}</div>
              <div className="rank-meta">🔥 {user.streak} day streak</div>
            </div>
            <div className="rank-xp">{user.xp} XP</div>
          </div>
        ))}
      </div>

      <div className="content-section">
        <h3>🎯 Achievements Unlocked</h3>
        <div className="badges-grid">
          <div className="badge-item unlocked">
            <div className="badge-emoji">🎯</div>
            <div className="badge-name">3-Day Warrior</div>
          </div>
          <div className="badge-item unlocked">
            <div className="badge-emoji">⭐</div>
            <div className="badge-name">Meal Master</div>
          </div>
          <div className="badge-item">
            <div className="badge-emoji">👑</div>
            <div className="badge-name">Gym Legend</div>
          </div>
          <div className="badge-item">
            <div className="badge-emoji">🚀</div>
            <div className="badge-name">Challenge Champion</div>
          </div>
        </div>
      </div>
    </div>
  );
}
