# Rep Rumble API Documentation

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "displayName": "Alex"
}
```

**Response (200):**
```json
{
  "userId": "uid123",
  "message": "User registered successfully"
}
```

**Error (400):**
```json
{
  "error": "Email already exists"
}
```

---

### Get User Profile
**GET** `/users/:userId`

Fetch user profile and stats.

**Response (200):**
```json
{
  "uid": "uid123",
  "email": "user@example.com",
  "displayName": "Alex",
  "createdAt": "2025-01-15T10:30:00Z",
  "streak": 5,
  "totalXP": 450,
  "buddyList": ["uid456", "uid789"],
  "preferences": {
    "language": "en",
    "notifications": true
  }
}
```

---

## 🍽️ Meal Endpoints

### Log Meal
**POST** `/meals/log`

Log a meal with photo recognition data.

**Request Body:**
```json
{
  "userId": "uid123",
  "imageUrl": "https://storage.firebase.com/...",
  "recognizedFood": "Biryani",
  "calories": 450,
  "macros": {
    "protein": 15,
    "carbs": 60,
    "fat": 15
  },
  "timestamp": "2025-01-15T14:30:00Z"
}
```

**Response (200):**
```json
{
  "mealId": "meal_123",
  "message": "Meal logged successfully"
}
```

---

### Get Meal History
**GET** `/meals/:userId`

Fetch user's meal history (last 30 meals).

**Query Parameters:**
- `limit` (optional): Number of meals to return (default: 30)
- `offset` (optional): Pagination offset (default: 0)

**Response (200):**
```json
[
  {
    "id": "meal_123",
    "userId": "uid123",
    "recognizedFood": "Biryani",
    "calories": 450,
    "macros": { "protein": 15, "carbs": 60, "fat": 15 },
    "imageUrl": "https://...",
    "timestamp": "2025-01-15T14:30:00Z"
  }
]
```

---

### Get Daily Summary
**GET** `/meals/daily/:userId`

Get meal summary for a specific day.

**Query Parameters:**
- `date`: Date in format YYYY-MM-DD

**Response (200):**
```json
{
  "date": "2025-01-15",
  "totalCalories": 1850,
  "totalMacros": {
    "protein": 65,
    "carbs": 200,
    "fat": 55
  },
  "mealCount": 3,
  "meals": [...]
}
```

---

## 💪 Workout Endpoints

### Log Workout
**POST** `/workouts/log`

Log a workout session.

**Request Body:**
```json
{
  "userId": "uid123",
  "exerciseType": "push-ups",
  "reps": 20,
  "sets": 3,
  "duration": 15,
  "timestamp": "2025-01-15T07:00:00Z"
}
```

**Response (200):**
```json
{
  "workoutId": "workout_123",
  "message": "Workout logged successfully"
}
```

---

### Get Workout History
**GET** `/workouts/:userId`

Fetch user's workout history (last 30 workouts).

**Response (200):**
```json
[
  {
    "id": "workout_123",
    "userId": "uid123",
    "exerciseType": "push-ups",
    "reps": 20,
    "sets": 3,
    "duration": 15,
    "timestamp": "2025-01-15T07:00:00Z"
  }
]
```

---

### Get Streak Status
**GET** `/users/:userId/streak`

Get current streak and milestone data.

**Response (200):**
```json
{
  "userId": "uid123",
  "currentStreak": 5,
  "longestStreak": 12,
  "lastWorkoutDate": "2025-01-15T07:00:00Z",
  "nextMilestone": 7,
  "milestonesReached": [1, 3]
}
```

---

## ⚡ Challenge Endpoints

### Create Challenge
**POST** `/challenges/create`

Create a new buddy challenge.

**Request Body:**
```json
{
  "creatorId": "uid123",
  "buddyId": "uid456",
  "challengeName": "3-day plank streak",
  "durationDays": 3,
  "targetValue": 90
}
```

**Response (200):**
```json
{
  "challengeId": "challenge_123",
  "message": "Challenge created"
}
```

---

### Get Active Challenges
**GET** `/challenges/:userId`

Get all active challenges for a user.

**Query Parameters:**
- `status` (optional): Filter by status (active, completed, failed)

**Response (200):**
```json
[
  {
    "id": "challenge_123",
    "creatorId": "uid123",
    "buddyId": "uid456",
    "challengeName": "3-day plank streak",
    "durationDays": 3,
    "status": "active",
    "createdAt": "2025-01-15T10:00:00Z",
    "creatorProgress": 2,
    "buddyProgress": 1
  }
]
```

---

### Update Challenge Progress
**PATCH** `/challenges/:challengeId/progress`

Update user's progress in a challenge.

**Request Body:**
```json
{
  "userId": "uid123",
  "progress": 1
}
```

**Response (200):**
```json
{
  "message": "Progress updated",
  "newProgress": 2
}
```

---

### Complete Challenge
**POST** `/challenges/:challengeId/complete`

Mark a challenge as completed.

**Request Body:**
```json
{
  "userId": "uid123",
  "status": "won"
}
```

**Response (200):**
```json
{
  "message": "Challenge completed!",
  "xpRewarded": 100,
  "badgeUnlocked": "3-day warrior"
}
```

---

## 👥 Buddy / Social Endpoints

### Add Buddy
**POST** `/buddies/add`

Add a new buddy to your buddy list.

**Request Body:**
```json
{
  "userId": "uid123",
  "buddyEmail": "friend@example.com"
}
```

**Response (200):**
```json
{
  "message": "Buddy added successfully",
  "buddyId": "uid456"
}
```

---

### Get Buddies
**GET** `/buddies/:userId`

Get list of all buddies.

**Response (200):**
```json
[
  {
    "uid": "uid456",
    "displayName": "Priya",
    "currentStreak": 8,
    "totalXP": 850,
    "lastActive": "2025-01-15T15:30:00Z"
  }
]
```

---

### Get Buddy Leaderboard
**GET** `/leaderboard/:userId`

Get leaderboard for user's buddy group.

**Query Parameters:**
- `period` (optional): weekly, monthly (default: weekly)
- `limit` (optional): Number of users (default: 10)

**Response (200):**
```json
[
  {
    "rank": 1,
    "userId": "uid123",
    "displayName": "You",
    "streak": 12,
    "xp": 1250
  },
  {
    "rank": 2,
    "userId": "uid456",
    "displayName": "Priya",
    "streak": 8,
    "xp": 850
  }
]
```

---

## 🏆 Gamification Endpoints

### Get User Stats
**GET** `/gamification/stats/:userId`

Get comprehensive user stats and achievements.

**Response (200):**
```json
{
  "userId": "uid123",
  "totalWorkouts": 45,
  "totalMealsLogged": 120,
  "totalXP": 1250,
  "level": 5,
  "badges": [
    { "id": "3-day-warrior", "name": "3-Day Warrior", "unlockedAt": "2025-01-10T10:00:00Z" }
  ],
  "achievements": {
    "first_meal": true,
    "first_workout": true,
    "7_day_streak": true
  }
}
```

---

### Get Leaderboard
**GET** `/gamification/leaderboard`

Get global or group leaderboard.

**Query Parameters:**
- `type` (optional): global, group (default: group)
- `period` (optional): weekly, monthly, alltime (default: weekly)
- `limit` (optional): 10, 50, 100 (default: 10)

**Response (200):**
```json
{
  "period": "weekly",
  "users": [
    { "rank": 1, "userId": "uid123", "displayName": "Alex", "xp": 1250 },
    { "rank": 2, "userId": "uid456", "displayName": "Priya", "xp": 950 }
  ]
}
```

---

## 📊 Analytics Endpoints

### Get Weekly Summary
**GET** `/analytics/weekly/:userId`

Get summary of meals and workouts for the current week.

**Response (200):**
```json
{
  "week": "2025-W03",
  "meals": {
    "total": 18,
    "avgCaloriesPerDay": 1850,
    "favoriteFood": "Biryani"
  },
  "workouts": {
    "total": 5,
    "avgDuration": 35,
    "favoriteExercise": "push-ups"
  },
  "streak": 5,
  "xpEarned": 250
}
```

---

## ❌ Error Responses

All error responses follow this format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

### Common Error Codes
- `INVALID_REQUEST`: Missing or invalid parameters
- `UNAUTHORIZED`: User not authenticated
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource already exists
- `INTERNAL_ERROR`: Server error

---

## 🔄 Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

---

## 📝 Rate Limiting

- 100 requests per minute per user
- 1000 requests per hour per IP

---

## 🔐 Authentication

All protected endpoints require Firebase JWT token in header:

```
Authorization: Bearer <firebase_token>
```

Obtain token from Firebase Authentication SDK on mobile/web client.

---

## 📌 Notes

- All timestamps are in ISO 8601 format
- IDs are Firebase UIDs or document IDs
- Meal recognition is AI-powered (with manual fallback)
- XP calculations: 1 workout = 50 XP, 1 meal = 10 XP, Challenge = 100 XP bonus

