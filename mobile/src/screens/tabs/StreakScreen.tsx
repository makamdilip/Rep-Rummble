import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../../config/api';
import { useAuth } from '../../context/AuthContext';
import { Workout } from '../../types';

const WORKOUT_OPTIONS = [
  { name: 'Push-ups', icon: '💪', duration: 10, calories: 50, type: 'strength' },
  { name: 'Running', icon: '🏃', duration: 30, calories: 300, type: 'cardio' },
  { name: 'Plank', icon: '🧘', duration: 5, calories: 30, type: 'core' },
  { name: 'Squats', icon: '🦵', duration: 15, calories: 100, type: 'strength' },
  { name: 'Burpees', icon: '🔥', duration: 10, calories: 120, type: 'hiit' },
  { name: 'Jumping Jacks', icon: '⭐', duration: 10, calories: 80, type: 'cardio' },
  { name: 'Lunges', icon: '🚶', duration: 15, calories: 90, type: 'strength' },
  { name: 'Mountain Climbers', icon: '🏔️', duration: 10, calories: 100, type: 'hiit' },
];

export default function StreakScreen() {
  const { user, updateUser } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await api.get('/workouts');
      setWorkouts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleLogWorkout = async (workout: typeof WORKOUT_OPTIONS[0]) => {
    setLoading(workout.name);
    try {
      const response = await api.post('/workouts', {
        exercise: workout.name,
        duration: workout.duration,
        calories: workout.calories,
        completed: true,
      });

      // Update local state
      setWorkouts([response.data.data, ...workouts]);

      // Update user XP and streak
      if (user) {
        const newXp = (user.xp || 0) + 10;
        const newStreak = (user.streak || 0) + 1;
        updateUser({ xp: newXp, streak: newStreak });

        // Update on server
        await api.put('/users/profile', { xp: newXp, streak: newStreak });
      }

      Alert.alert(
        'Workout Logged! 💪',
        `${workout.name} completed! +10 XP earned.`,
        [{ text: 'Keep Going!' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to log workout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  // Today's workouts
  const today = new Date().toDateString();
  const todayWorkouts = workouts.filter(
    (w) => new Date(w.timestamp).toDateString() === today
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Workout Tracker</Text>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={20} color="#f97316" />
            <Text style={styles.streakText}>{user?.streak || 0} day streak</Text>
          </View>
        </View>

        {/* Today's Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Progress</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryValue}>{todayWorkouts.length}</Text>
              <Text style={styles.summaryLabel}>Workouts</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryStat}>
              <Text style={styles.summaryValue}>
                {todayWorkouts.reduce((sum, w) => sum + w.duration, 0)}
              </Text>
              <Text style={styles.summaryLabel}>Minutes</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryStat}>
              <Text style={styles.summaryValue}>
                {todayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0)}
              </Text>
              <Text style={styles.summaryLabel}>Calories</Text>
            </View>
          </View>
        </View>

        {/* Quick Log */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Log Workout</Text>
          <View style={styles.workoutGrid}>
            {WORKOUT_OPTIONS.map((workout, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.workoutCard,
                  loading === workout.name && styles.workoutCardLoading,
                ]}
                onPress={() => handleLogWorkout(workout)}
                disabled={loading !== null}
                activeOpacity={0.7}
              >
                <Text style={styles.workoutIcon}>{workout.icon}</Text>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutMeta}>
                  {workout.duration} min • {workout.calories} cal
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Today's Workouts ({todayWorkouts.length})
          </Text>
          {todayWorkouts.length > 0 ? (
            todayWorkouts.map((workout, index) => (
              <View key={workout._id || index} style={styles.workoutItem}>
                <View style={styles.workoutItemIcon}>
                  <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
                </View>
                <View style={styles.workoutItemInfo}>
                  <Text style={styles.workoutItemName}>{workout.exercise}</Text>
                  <Text style={styles.workoutItemMeta}>
                    {workout.duration} min • {workout.calories || 0} cal
                  </Text>
                </View>
                <Text style={styles.workoutItemTime}>
                  {new Date(workout.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="barbell-outline" size={48} color="#4d4d4d" />
              <Text style={styles.emptyText}>No workouts logged today</Text>
              <Text style={styles.emptyHint}>Tap a workout above to get started!</Text>
            </View>
          )}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9731620',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  streakText: {
    color: '#f97316',
    fontWeight: '600',
    fontSize: 14,
  },
  summaryCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#3d3d3d',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  workoutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  workoutCard: {
    width: '47%',
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  workoutCardLoading: {
    opacity: 0.5,
  },
  workoutIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  workoutMeta: {
    fontSize: 12,
    color: '#9ca3af',
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  workoutItemIcon: {
    marginRight: 12,
  },
  workoutItemInfo: {
    flex: 1,
  },
  workoutItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  workoutItemMeta: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
  workoutItemTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 12,
  },
  emptyHint: {
    fontSize: 14,
    color: '#4d4d4d',
    marginTop: 4,
  },
});
