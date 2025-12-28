// Rep Rumble Backend - Express API Starter
// This is the core API server for handling auth, food DB, streak tracking, and buddy challenges

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize Firebase Admin SDK
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

const db = admin.firestore();

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Rep Rumble API is running' });
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    // Create user profile in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      displayName,
      createdAt: new Date(),
      streak: 0,
      totalXP: 0,
      buddyList: [],
      preferences: {
        language: 'en',
        notifications: true,
      },
    });

    res.json({ userId: userRecord.uid, message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get User Profile
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Log Meal (Food Recognition)
app.post('/api/meals/log', async (req, res) => {
  try {
    const { userId, imageUrl, recognizedFood, calories, macros, timestamp } = req.body;

    const mealDoc = {
      userId,
      imageUrl,
      recognizedFood,
      calories,
      macros, // { protein, carbs, fat }
      timestamp: timestamp || new Date(),
      mealType: 'custom', // breakfast, lunch, dinner
    };

    const docRef = await db.collection('meals').add(mealDoc);
    res.json({ mealId: docRef.id, message: 'Meal logged successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Meal History
app.get('/api/meals/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection('meals')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(30)
      .get();

    const meals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Log Workout (Rep Tracker)
app.post('/api/workouts/log', async (req, res) => {
  try {
    const { userId, exerciseType, reps, sets, duration, timestamp } = req.body;

    const workoutDoc = {
      userId,
      exerciseType, // push-ups, running, gym, etc.
      reps,
      sets,
      duration, // in minutes
      timestamp: timestamp || new Date(),
    };

    const docRef = await db.collection('workouts').add(workoutDoc);

    // Update user streak
    await updateUserStreak(userId);

    res.json({ workoutId: docRef.id, message: 'Workout logged successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Workout History
app.get('/api/workouts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection('workouts')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(30)
      .get();

    const workouts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Buddy Challenge
app.post('/api/challenges/create', async (req, res) => {
  try {
    const { creatorId, buddyId, challengeName, durationDays, targetValue } = req.body;

    const challengeDoc = {
      creatorId,
      buddyId,
      challengeName, // "3-day plank streak", "10k steps", etc.
      durationDays,
      targetValue,
      status: 'active',
      createdAt: new Date(),
      creatorProgress: 0,
      buddyProgress: 0,
    };

    const docRef = await db.collection('challenges').add(challengeDoc);
    res.json({ challengeId: docRef.id, message: 'Challenge created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Challenges
app.get('/api/challenges/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection('challenges')
      .where('status', '==', 'active')
      .get();

    const challenges = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(c => c.creatorId === userId || c.buddyId === userId);

    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper: Update User Streak
async function updateUserStreak(userId) {
  const userDoc = await db.collection('users').doc(userId).get();
  const today = new Date().toDateString();
  const lastWorkoutDate = userDoc.data().lastWorkoutDate?.toDate?.()?.toDateString?.();

  if (lastWorkoutDate === today) {
    return; // Already logged today
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastWorkoutDate === yesterday.toDateString()) {
    // Streak continues
    await db.collection('users').doc(userId).update({
      streak: userDoc.data().streak + 1,
      lastWorkoutDate: new Date(),
    });
  } else {
    // Streak breaks, reset to 1
    await db.collection('users').doc(userId).update({
      streak: 1,
      lastWorkoutDate: new Date(),
    });
  }
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Rep Rumble Backend running on http://localhost:${PORT}`);
});

export default app;
