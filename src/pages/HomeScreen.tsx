// Rep Rumble - Home Screen Component
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const fetchData = async () => {
    try {
      // Fetch today's meals
      const mealsRef = collection(db, 'meals');
      const mealsQuery = query(mealsRef, where('userId', '==', currentUser.uid));
      const mealsDocs = await getDocs(mealsQuery);
      const mealsData = mealsDocs.docs.map(doc => doc.data()).slice(0, 3);
      setMeals(mealsData);

      // Fetch today's workouts
      const workoutsRef = collection(db, 'workouts');
      const workoutsQuery = query(workoutsRef, where('userId', '==', currentUser.uid));
      const workoutsDocs = await getDocs(workoutsQuery);
      const workoutsData = workoutsDocs.docs.map(doc => doc.data()).slice(0, 3);
      setWorkouts(workoutsData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rep Rumble 💪</Text>
        <Text style={styles.subtitle}>Track meals. Crush reps. Win with friends.</Text>
      </View>

      <FlatList
        data={[{ type: 'stats' }, { type: 'meals' }, { type: 'workouts' }]}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          if (item.type === 'stats') {
            return (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Today's Summary</Text>
                <View style={styles.statsGrid}>
                  <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Meals Logged</Text>
                    <Text style={styles.statValue}>{meals.length}</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Workouts</Text>
                    <Text style={styles.statValue}>{workouts.length}</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Streak</Text>
                    <Text style={styles.statValue}>🔥 5</Text>
                  </View>
                </View>
              </View>
            );
          }

          if (item.type === 'meals') {
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Recent Meals 🍽️</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SnapMeal')}
                  >
                    <Text style={styles.link}>+ Log</Text>
                  </TouchableOpacity>
                </View>
                {meals.length > 0 ? (
                  meals.map((meal, index) => (
                    <View key={index} style={styles.mealItem}>
                      <Text style={styles.mealName}>{meal.recognizedFood}</Text>
                      <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>No meals logged today</Text>
                )}
              </View>
            );
          }

          if (item.type === 'workouts') {
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Recent Workouts 💪</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Streak')}
                  >
                    <Text style={styles.link}>+ Log</Text>
                  </TouchableOpacity>
                </View>
                {workouts.length > 0 ? (
                  workouts.map((workout, index) => (
                    <View key={index} style={styles.workoutItem}>
                      <Text style={styles.workoutName}>
                        {workout.exerciseType.toUpperCase()}
                      </Text>
                      <Text style={styles.workoutStats}>
                        {workout.sets ? `${workout.sets}x${workout.reps}` : `${workout.duration}min`}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>No workouts logged today</Text>
                )}
              </View>
            );
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 16,
  },
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00FF00',
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00FF00',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  link: {
    color: '#00FF00',
    fontSize: 12,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00FF00',
  },
  mealItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  mealName: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  mealCalories: {
    fontSize: 12,
    color: '#00FF00',
    marginTop: 2,
  },
  workoutItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workoutName: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  workoutStats: {
    fontSize: 12,
    color: '#00FF00',
  },
  emptyText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
