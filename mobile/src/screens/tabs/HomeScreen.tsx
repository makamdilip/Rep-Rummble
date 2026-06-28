import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';
import { Meal, Workout, RootStackParamList } from '../../types';
import ChatFAB from '../../components/chat/ChatFAB';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { fetchData(); }, []);

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

  const today = new Date().toDateString();
  const todayMeals = meals.filter(m => new Date(m.timestamp).toDateString() === today);
  const todayWorkouts = workouts.filter(w => new Date(w.timestamp).toDateString() === today);
  const totalCalories = todayMeals.reduce((s, m) => s + m.calories, 0);
  const totalProtein = todayMeals.reduce((s, m) => s + (m.protein || 0), 0);
  const totalCarbs = todayMeals.reduce((s, m) => s + (m.carbs || 0), 0);
  const totalFat = todayMeals.reduce((s, m) => s + (m.fat || 0), 0);

  const name = user?.displayName || user?.email?.split('@')[0] || 'Champ';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const STATS = [
    { icon: 'flame', color: '#f97316', value: user?.streak || 0, label: 'Streak', bg: ['#f9731630', '#f9731608'] as const },
    { icon: 'star', color: '#eab308', value: user?.xp || 0, label: 'XP', bg: ['#eab30830', '#eab30808'] as const },
    { icon: 'restaurant', color: '#22c55e', value: todayMeals.length, label: 'Meals', bg: ['#22c55e30', '#22c55e08'] as const },
    { icon: 'barbell', color: '#7c3aed', value: todayWorkouts.length, label: 'Workouts', bg: ['#7c3aed30', '#7c3aed08'] as const },
  ];

  return (
    <View style={styles.root}>
      {/* Full-screen background gradient */}
      <LinearGradient
        colors={['#1a0533', '#0d0f1a', '#080b14']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#7c3aed" />}
        >
          {/* ── Hero Header ── */}
          <View style={styles.hero}>
            <View style={styles.heroLeft}>
              <Text style={styles.greeting}>{greeting},</Text>
              <Text style={styles.heroName}>{name} 👋</Text>
            </View>
            <LinearGradient colors={['#7c3aed', '#4f1d9a']} style={styles.levelPill}>
              <Ionicons name="trophy" size={14} color="#ffd700" />
              <Text style={styles.levelText}>Lvl {user?.level || 1}</Text>
            </LinearGradient>
          </View>

          {/* ── Calorie Hero Card ── */}
          <LinearGradient
            colors={['#3b0d6b', '#1e0545', '#0d0f1a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.calorieHero}
          >
            {/* Glow orb */}
            <View style={styles.glowOrb} />
            <View style={styles.calorieHeroContent}>
              <View>
                <Text style={styles.calorieBig}>{totalCalories}</Text>
                <Text style={styles.calorieUnit}>kcal consumed today</Text>
              </View>
              <View style={styles.macroColumn}>
                {[
                  { label: 'Protein', value: `${totalProtein}g`, color: '#22c55e' },
                  { label: 'Carbs', value: `${totalCarbs}g`, color: '#eab308' },
                  { label: 'Fat', value: `${totalFat}g`, color: '#f97316' },
                ].map(m => (
                  <View key={m.label} style={styles.macroRow}>
                    <View style={[styles.macroDot, { backgroundColor: m.color }]} />
                    <Text style={styles.macroLabel}>{m.label}</Text>
                    <Text style={[styles.macroVal, { color: m.color }]}>{m.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>

          {/* ── Stat Pills ── */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll} contentContainerStyle={styles.statsContent}>
            {STATS.map(s => (
              <LinearGradient key={s.label} colors={s.bg} style={styles.statPill}>
                <Ionicons name={s.icon as any} size={22} color={s.color} />
                <Text style={[styles.statPillValue, { color: s.color }]}>{s.value}</Text>
                <Text style={styles.statPillLabel}>{s.label}</Text>
              </LinearGradient>
            ))}
          </ScrollView>

          {/* ── Recent Meals ── */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionDot, { backgroundColor: '#22c55e' }]} />
              <Text style={styles.sectionTitle}>Recent Meals</Text>
              <Text style={styles.sectionCount}>{todayMeals.length} today</Text>
            </View>

            {todayMeals.length > 0 ? (
              todayMeals.slice(0, 3).map((meal, i) => (
                <View key={meal._id || i} style={styles.itemCard}>
                  <LinearGradient colors={['#22c55e40', '#22c55e00']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.itemGradientBar} />
                  <View style={styles.itemIconWrap}>
                    <Text style={styles.itemEmoji}>🍽️</Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{meal.foodName}</Text>
                    <Text style={styles.itemMeta}>{meal.calories} kcal · {meal.protein}g protein</Text>
                  </View>
                  {meal.isAIGenerated && (
                    <View style={styles.aiBadge}>
                      <Ionicons name="sparkles" size={11} color="#7c3aed" />
                      <Text style={styles.aiText}>AI</Text>
                    </View>
                  )}
                </View>
              ))
            ) : (
              <View style={styles.emptyCard}>
                <Ionicons name="restaurant-outline" size={36} color="#2d3561" />
                <Text style={styles.emptyText}>No meals logged yet</Text>
                <Text style={styles.emptyHint}>Tap Snap to add your first meal</Text>
              </View>
            )}
          </View>

          {/* ── Recent Workouts ── */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionDot, { backgroundColor: '#7c3aed' }]} />
              <Text style={styles.sectionTitle}>Recent Workouts</Text>
              <Text style={styles.sectionCount}>{todayWorkouts.length} today</Text>
            </View>

            {todayWorkouts.length > 0 ? (
              todayWorkouts.slice(0, 3).map((w, i) => (
                <View key={w._id || i} style={styles.itemCard}>
                  <LinearGradient colors={['#7c3aed40', '#7c3aed00']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.itemGradientBar} />
                  <View style={styles.itemIconWrap}>
                    <Text style={styles.itemEmoji}>💪</Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{w.exercise}</Text>
                    <Text style={styles.itemMeta}>{w.duration} min{w.calories ? ` · ${w.calories} kcal` : ''}</Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                </View>
              ))
            ) : (
              <View style={styles.emptyCard}>
                <Ionicons name="barbell-outline" size={36} color="#2d3561" />
                <Text style={styles.emptyText}>No workouts yet today</Text>
                <Text style={styles.emptyHint}>Head to Workout tab to get moving</Text>
              </View>
            )}
          </View>

          <View style={{ height: 110 }} />
        </ScrollView>
      </SafeAreaView>

      <ChatFAB onPress={() => navigation.navigate('Chat')} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1 },

  // Hero
  hero: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 },
  heroLeft: {},
  greeting: { fontSize: 14, color: '#94a3b8', fontWeight: '400' },
  heroName: { fontSize: 26, fontWeight: '800', color: '#fff', marginTop: 2, letterSpacing: -0.5 },
  levelPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  levelText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  // Calorie hero card
  calorieHero: { marginHorizontal: 20, borderRadius: 24, padding: 24, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#3b1e6b' },
  glowOrb: { position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: '#7c3aed', opacity: 0.15, top: -40, right: -40 },
  calorieHeroContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  calorieBig: { fontSize: 56, fontWeight: '900', color: '#fff', letterSpacing: -2 },
  calorieUnit: { fontSize: 13, color: '#94a3b8', marginTop: 2 },
  macroColumn: { gap: 8 },
  macroRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  macroDot: { width: 8, height: 8, borderRadius: 4 },
  macroLabel: { fontSize: 12, color: '#94a3b8', width: 44 },
  macroVal: { fontSize: 13, fontWeight: '700' },

  // Stat pills
  statsScroll: { marginBottom: 24 },
  statsContent: { paddingHorizontal: 20, gap: 12 },
  statPill: { alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 18, borderWidth: 1, borderColor: '#2d3561', minWidth: 90 },
  statPillValue: { fontSize: 22, fontWeight: '800', marginTop: 6 },
  statPillLabel: { fontSize: 11, color: '#94a3b8', marginTop: 2, fontWeight: '500' },

  // Sections
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  sectionDot: { width: 10, height: 10, borderRadius: 5 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#fff', flex: 1 },
  sectionCount: { fontSize: 13, color: '#6b7280' },

  // Item cards
  itemCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#161b2e', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#2d356180', overflow: 'hidden' },
  itemGradientBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderRadius: 2 },
  itemIconWrap: { width: 42, height: 42, backgroundColor: '#1e2a4a', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  itemEmoji: { fontSize: 20 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '600', color: '#f1f5f9' },
  itemMeta: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  aiBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7c3aed20', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  aiText: { fontSize: 10, fontWeight: '700', color: '#7c3aed' },

  // Empty
  emptyCard: { backgroundColor: '#161b2e', borderRadius: 14, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: '#2d356140', borderStyle: 'dashed' },
  emptyText: { fontSize: 15, color: '#6b7280', marginTop: 12, fontWeight: '500' },
  emptyHint: { fontSize: 12, color: '#2d3561', marginTop: 4 },
});
