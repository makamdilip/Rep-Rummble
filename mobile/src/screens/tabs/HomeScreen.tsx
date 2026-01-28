import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';
import { Meal, Workout } from '../../types';

export default function HomeScreen() {
  const { user } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [mealsRes, workoutsRes] = await Promise.all([
        api.get('/meals'),
        api.get('/workouts'),
      ]);
      setMeals(mealsRes.data.data || []);
      setWorkouts(workoutsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  // Calculate today's stats
  const today = new Date().toDateString();
  const todayMeals = meals.filter(
    (m) => new Date(m.timestamp).toDateString() === today
  );
  const todayWorkouts = workouts.filter(
    (w) => new Date(w.timestamp).toDateString() === today
  );
  const totalCalories = todayMeals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#22c55e"
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>
              {user?.displayName || user?.email?.split('@')[0] || 'Champ'}
            </Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Lvl {user?.level || 1}</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.streakCard]}>
            <Ionicons name="flame" size={32} color="#f97316" />
            <Text style={styles.statValue}>{user?.streak || 0}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>

          <View style={[styles.statCard, styles.xpCard]}>
            <Ionicons name="star" size={32} color="#eab308" />
            <Text style={styles.statValue}>{user?.xp || 0}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>

          <View style={[styles.statCard, styles.mealsCard]}>
            <Ionicons name="restaurant" size={32} color="#22c55e" />
            <Text style={styles.statValue}>{todayMeals.length}</Text>
            <Text style={styles.statLabel}>Meals Today</Text>
          </View>

          <View style={[styles.statCard, styles.workoutsCard]}>
            <Ionicons name="barbell" size={32} color="#8b5cf6" />
            <Text style={styles.statValue}>{todayWorkouts.length}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
        </View>

        {/* Calories Summary */}
        <View style={styles.caloriesCard}>
          <View style={styles.caloriesHeader}>
            <Text style={styles.caloriesTitle}>Today's Nutrition</Text>
            <Ionicons name="nutrition" size={24} color="#22c55e" />
          </View>
          <Text style={styles.caloriesValue}>{totalCalories}</Text>
          <Text style={styles.caloriesLabel}>Calories consumed</Text>

          {/* Macro breakdown */}
          <View style={styles.macroRow}>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>
                {todayMeals.reduce((sum, m) => sum + (m.protein || 0), 0)}g
              </Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>
                {todayMeals.reduce((sum, m) => sum + (m.carbs || 0), 0)}g
              </Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>
                {todayMeals.reduce((sum, m) => sum + (m.fat || 0), 0)}g
              </Text>
              <Text style={styles.macroLabel}>Fat</Text>
            </View>
          </View>
        </View>

        {/* Recent Meals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Meals</Text>
          {todayMeals.length > 0 ? (
            todayMeals.slice(0, 3).map((meal, index) => (
              <View key={meal._id || index} style={styles.itemCard}>
                <View style={styles.itemIcon}>
                  <Text style={styles.itemEmoji}>🍽️</Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{meal.foodName}</Text>
                  <Text style={styles.itemMeta}>
                    {meal.calories} cal • {meal.protein}g protein
                  </Text>
                </View>
                {meal.isAIGenerated && (
                  <View style={styles.aiBadge}>
                    <Ionicons name="sparkles" size={12} color="#8b5cf6" />
                    <Text style={styles.aiText}>AI</Text>
                  </View>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No meals logged today. Tap Snap to add one!</Text>
          )}
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          {todayWorkouts.length > 0 ? (
            todayWorkouts.slice(0, 3).map((workout, index) => (
              <View key={workout._id || index} style={styles.itemCard}>
                <View style={styles.itemIcon}>
                  <Text style={styles.itemEmoji}>💪</Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{workout.exercise}</Text>
                  <Text style={styles.itemMeta}>
                    {workout.duration} min {workout.calories ? `• ${workout.calories} cal` : ''}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No workouts today. Time to get moving!</Text>
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
  greeting: {
    fontSize: 16,
    color: '#9ca3af',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  levelBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  levelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#2d2d2d',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  streakCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#f97316',
  },
  xpCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#eab308',
  },
  mealsCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#22c55e',
  },
  workoutsCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#8b5cf6',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  caloriesCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  caloriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  caloriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  caloriesValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  caloriesLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#3d3d3d',
    paddingTop: 16,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  macroLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
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
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  itemIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#3d3d3d',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemEmoji: {
    fontSize: 20,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  itemMeta: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b5cf620',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  aiText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8b5cf6',
  },
  emptyText: {
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 20,
  },
});
