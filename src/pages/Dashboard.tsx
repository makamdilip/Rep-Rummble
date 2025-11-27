import { useState, useEffect } from 'react';
import HomeTab from '../components/HomeTab';
import SnapTab from '../components/SnapTab';
import StreakTab from '../components/StreakTab';
import LeaderboardTab from '../components/LeaderboardTab';
import '../styles/Dashboard.css';

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export default function Dashboard({ userEmail, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // Load user data from localStorage on mount
    localStorage.getItem('rep_rumble_user');
  }, []);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="app-logo">🔥 Rep Rumble</h1>
          <p className="user-info">{userEmail}</p>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button
          className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          🏠 Home
        </button>
        <button
          className={`tab-btn ${activeTab === 'snap' ? 'active' : ''}`}
          onClick={() => setActiveTab('snap')}
        >
          📸 Snap Meal
        </button>
        <button
          className={`tab-btn ${activeTab === 'streak' ? 'active' : ''}`}
          onClick={() => setActiveTab('streak')}
        >
          🔥 Streak
        </button>
        <button
          className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          🏆 Leaderboard
        </button>
      </nav>

      {/* Content Area */}
      <main className="dashboard-content">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'snap' && <SnapTab />}
        {activeTab === 'streak' && <StreakTab />}
        {activeTab === 'leaderboard' && <LeaderboardTab />}
      </main>
    </div>
  );
}
