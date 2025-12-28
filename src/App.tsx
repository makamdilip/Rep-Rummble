import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('rep_rumble_user');
    if (savedUser) {
      setIsLoggedIn(true);
      setUserEmail(JSON.parse(savedUser).email);
    }
    setLoading(false);
  }, []);

  const handleLogin = (email: string) => {
    const userData = {
      uid: Math.random().toString(36).substr(2, 9),
      email,
      displayName: email.split('@')[0],
      createdAt: new Date().toISOString(),
      streak: 0,
      totalXP: 0,
    };
    localStorage.setItem('rep_rumble_user', JSON.stringify(userData));
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('rep_rumble_user');
    localStorage.removeItem('rep_rumble_meals');
    localStorage.removeItem('rep_rumble_workouts');
    localStorage.removeItem('rep_rumble_challenges');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  if (loading) {
    return <div className="loading">Loading Rep Rumble...</div>;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <AuthProvider>
      <div className="app">
        <Dashboard userEmail={userEmail} onLogout={handleLogout} />
      </div>
    </AuthProvider>
  );
}

function LoginScreen({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
    }
  };

  const demoLogin = () => {
    onLogin('demo@reprumble.com');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="app-title">🔥 Rep Rumble</h1>
        <p className="tagline">Track meals. Crush reps. Win with friends.</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>

        <div className="divider">OR</div>

        <button className="btn-demo" onClick={demoLogin}>
          🎯 Try Demo (No Setup Needed!)
        </button>

        <p className="login-note">✅ Demo data included - works immediately</p>
      </div>
    </div>
  );
}

export default App;
