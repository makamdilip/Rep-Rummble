import { useState } from 'react';
import '../styles/Tabs.css';

const SAMPLE_WORKOUTS = [
  { name: 'Push-ups', reps: 20, sets: 3, icon: '💪' },
  { name: 'Running', duration: 30, icon: '🏃' },
  { name: 'Plank', duration: 60, icon: '🧘' },
  { name: 'Squats', reps: 30, sets: 4, icon: '🦵' },
];

export default function StreakTab() {
  const [loggedWorkout, setLoggedWorkout] = useState<any>(null);
  const [workouts, setWorkouts] = useState<any[]>(() => {
    const saved = localStorage.getItem('rep_rumble_workouts');
    return saved ? JSON.parse(saved) : [];
  });

  const handleLogWorkout = (workout: any) => {
    setLoggedWorkout(workout);
    
    // Update streak
    const userStr = localStorage.getItem('rep_rumble_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      user.streak = (user.streak || 0) + 1;
      localStorage.setItem('rep_rumble_user', JSON.stringify(user));
    }

    const newWorkouts = [...workouts, { ...workout, timestamp: new Date().toLocaleTimeString() }];
    setWorkouts(newWorkouts);
    localStorage.setItem('rep_rumble_workouts', JSON.stringify(newWorkouts));
    setTimeout(() => setLoggedWorkout(null), 2000);
  };

  return (
    <div className="tab-content">
      <h2>🔥 Workout Tracker</h2>

      {loggedWorkout && (
        <div className="success-message">
          ✅ {loggedWorkout.name} logged! Streak increased! 🔥
        </div>
      )}

      <div className="workout-grid">
        {SAMPLE_WORKOUTS.map((workout, idx) => (
          <div
            key={idx}
            className="workout-card"
            onClick={() => handleLogWorkout(workout)}
          >
            <div className="workout-emoji">{workout.icon}</div>
            <div className="workout-name">{workout.name}</div>
            <div className="workout-meta">
              {workout.reps ? `${workout.reps} reps × ${workout.sets} sets` : `${workout.duration} min`}
            </div>
          </div>
        ))}
      </div>

      <div className="content-section">
        <h3>📋 Today's Workouts ({workouts.length})</h3>
        {workouts.length > 0 ? (
          <div className="items-list">
            {workouts.map((workout, idx) => (
              <div key={idx} className="item-card">
                <div className="item-name">{workout.icon} {workout.name}</div>
                <div className="item-meta">
                  {workout.reps ? `${workout.reps} reps × ${workout.sets} sets` : `${workout.duration} min`} at {workout.timestamp}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">Click a workout to log it!</p>
        )}
      </div>
    </div>
  );
}
