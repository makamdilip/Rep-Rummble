import { useState, useEffect } from 'react';
import '../styles/Tabs.css';

export default function HomeTab() {
  const [meals, setMeals] = useState<any[]>([]);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedMeals = localStorage.getItem('rep_rumble_meals');
    const savedWorkouts = localStorage.getItem('rep_rumble_workouts');
    const userStr = localStorage.getItem('rep_rumble_user');

    if (savedMeals) setMeals(JSON.parse(savedMeals));
    if (savedWorkouts) setWorkouts(JSON.parse(savedWorkouts));
    if (userStr) {
      const user = JSON.parse(userStr);
      setStreak(user.streak || 0);
    }
  }, []);

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="tab-content">
      <h2>📊 Daily Summary</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-info">
            <div className="stat-label">Current Streak</div>
            <div className="stat-value">{streak}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-info">
            <div className="stat-label">Meals Logged</div>
            <div className="stat-value">{meals.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-info">
            <div className="stat-label">Workouts</div>
            <div className="stat-value">{workouts.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <div className="stat-label">Total Calories</div>
            <div className="stat-value">{totalCalories}</div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h3>🍽️ Recent Meals</h3>
        {meals.length > 0 ? (
          <div className="items-list">
            {meals.slice(-3).reverse().map((meal, idx) => (
              <div key={idx} className="item-card">
                <div className="item-name">{meal.name}</div>
                <div className="item-meta">{meal.calories} kcal</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">No meals logged yet. Start by snapping a photo!</p>
        )}
      </div>

      <div className="content-section">
        <h3>💪 Recent Workouts</h3>
        {workouts.length > 0 ? (
          <div className="items-list">
            {workouts.slice(-3).reverse().map((workout, idx) => (
              <div key={idx} className="item-card">
                <div className="item-name">{workout.exercise}</div>
                <div className="item-meta">{workout.duration} min</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">No workouts logged yet. Start tracking!</p>
        )}
      </div>
    </div>
  );
}
