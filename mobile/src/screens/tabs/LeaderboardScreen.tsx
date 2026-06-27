import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../../config/api';
import { useAuth } from '../../context/AuthContext';
import { LeaderboardEntry } from '../../types';

export default function LeaderboardScreen() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get('/leaderboard');
      setLeaderboard(response.data.data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLeaderboard();
    setRefreshing(false);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return { icon: 'trophy', color: '#ffd700' };
      case 2:
        return { icon: 'medal', color: '#c0c0c0' };
      case 3:
        return { icon: 'medal', color: '#cd7f32' };
      default:
        return null;
    }
  };

  const renderItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => {
    const rank = index + 1;
    const rankIcon = getRankIcon(rank);
    const isCurrentUser = item.email === user?.email;

    return (
      <View style={[styles.rankItem, isCurrentUser && styles.rankItemCurrent]}>
        <View style={styles.rankPosition}>
          {rankIcon ? (
            <Ionicons
              name={rankIcon.icon as any}
              size={24}
              color={rankIcon.color}
            />
          ) : (
            <Text style={styles.rankNumber}>{rank}</Text>
          )}
        </View>

        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(item.userName || item.email)[0].toUpperCase()}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={[styles.userName, isCurrentUser && styles.userNameCurrent]}>
              {item.userName || item.email.split('@')[0]}
              {isCurrentUser && ' (You)'}
            </Text>
            <Text style={styles.userLevel}>Level {item.level}</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={16} color="#f97316" />
            <Text style={styles.statValue}>{item.streak}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="star" size={16} color="#eab308" />
            <Text style={styles.statValue}>{item.xp}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>Top players this week</Text>
      </View>

      {/* Top 3 Podium */}
      {leaderboard.length >= 3 && (
        <View style={styles.podium}>
          {/* Second Place */}
          <View style={styles.podiumItem}>
            <View style={[styles.podiumAvatar, styles.podiumSecond]}>
              <Text style={styles.podiumAvatarText}>
                {(leaderboard[1].userName || leaderboard[1].email)[0].toUpperCase()}
              </Text>
            </View>
            <Ionicons name="medal" size={24} color="#c0c0c0" />
            <Text style={styles.podiumName} numberOfLines={1}>
              {leaderboard[1].userName || leaderboard[1].email.split('@')[0]}
            </Text>
            <Text style={styles.podiumXp}>{leaderboard[1].xp} XP</Text>
          </View>

          {/* First Place */}
          <View style={[styles.podiumItem, styles.podiumFirst]}>
            <View style={[styles.podiumAvatar, styles.podiumAvatarFirst]}>
              <Text style={styles.podiumAvatarText}>
                {(leaderboard[0].userName || leaderboard[0].email)[0].toUpperCase()}
              </Text>
            </View>
            <Ionicons name="trophy" size={32} color="#ffd700" />
            <Text style={styles.podiumName} numberOfLines={1}>
              {leaderboard[0].userName || leaderboard[0].email.split('@')[0]}
            </Text>
            <Text style={styles.podiumXp}>{leaderboard[0].xp} XP</Text>
          </View>

          {/* Third Place */}
          <View style={styles.podiumItem}>
            <View style={[styles.podiumAvatar, styles.podiumThird]}>
              <Text style={styles.podiumAvatarText}>
                {(leaderboard[2].userName || leaderboard[2].email)[0].toUpperCase()}
              </Text>
            </View>
            <Ionicons name="medal" size={24} color="#cd7f32" />
            <Text style={styles.podiumName} numberOfLines={1}>
              {leaderboard[2].userName || leaderboard[2].email.split('@')[0]}
            </Text>
            <Text style={styles.podiumXp}>{leaderboard[2].xp} XP</Text>
          </View>
        </View>
      )}

      {/* Full List */}
      <FlatList
        data={leaderboard}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.oderId || index.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#22c55e"
          />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyState}>
              <Ionicons name="trophy-outline" size={64} color="#4d4d4d" />
              <Text style={styles.emptyText}>No rankings yet</Text>
              <Text style={styles.emptyHint}>
                Start working out to climb the leaderboard!
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  podiumItem: {
    alignItems: 'center',
    width: 100,
  },
  podiumFirst: {
    marginBottom: 20,
  },
  podiumAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3d3d3d',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  podiumAvatarFirst: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: '#ffd700',
  },
  podiumSecond: {
    borderWidth: 2,
    borderColor: '#c0c0c0',
  },
  podiumThird: {
    borderWidth: 2,
    borderColor: '#cd7f32',
  },
  podiumAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
  },
  podiumXp: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  rankItemCurrent: {
    backgroundColor: '#22c55e20',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  rankPosition: {
    width: 40,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3d3d3d',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  userNameCurrent: {
    color: '#22c55e',
  },
  userLevel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 16,
  },
  emptyHint: {
    fontSize: 14,
    color: '#4d4d4d',
    marginTop: 8,
    textAlign: 'center',
  },
});
