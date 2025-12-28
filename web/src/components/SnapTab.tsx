import { useState } from 'react';
import '../styles/Tabs.css';

const SAMPLE_FOODS = [
  { name: 'Biryani', calories: 450, image: '🍚' },
  { name: 'Dosa', calories: 300, image: '🥞' },
  { name: 'Paneer Butter Masala', calories: 350, image: '🍲' },
  { name: 'Chicken Tikka', calories: 280, image: '🍗' },
  { name: 'Samosa', calories: 200, image: '🥟' },
];

export default function SnapTab() {
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [meals, setMeals] = useState<any[]>(() => {
    const saved = localStorage.getItem('rep_rumble_meals');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSelectFood = (food: any) => {
    setSelectedFood(food);
    const newMeals = [...meals, { ...food, timestamp: new Date().toLocaleTimeString() }];
    setMeals(newMeals);
    localStorage.setItem('rep_rumble_meals', JSON.stringify(newMeals));
    setTimeout(() => setSelectedFood(null), 2000);
  };

  return (
    <div className="tab-content">
      <h2>📸 Snap & Log Meal</h2>

      {selectedFood && (
        <div className="success-message">
          ✅ {selectedFood.name} logged! ({selectedFood.calories} kcal)
        </div>
      )}

      <div className="food-grid">
        {SAMPLE_FOODS.map((food, idx) => (
          <div
            key={idx}
            className="food-card"
            onClick={() => handleSelectFood(food)}
          >
            <div className="food-emoji">{food.image}</div>
            <div className="food-name">{food.name}</div>
            <div className="food-calories">{food.calories} kcal</div>
          </div>
        ))}
      </div>

      <div className="content-section">
        <h3>📋 Today's Meals ({meals.length})</h3>
        {meals.length > 0 ? (
          <div className="items-list">
            {meals.map((meal, idx) => (
              <div key={idx} className="item-card">
                <div className="item-name">{meal.image} {meal.name}</div>
                <div className="item-meta">{meal.calories} kcal at {meal.timestamp}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">Click a food to log it!</p>
        )}
      </div>
    </div>
  );
}
