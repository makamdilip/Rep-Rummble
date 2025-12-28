import React from 'react';

// Mobile Streak Dashboard removed — website uses the simpler streak display in the Dashboard.

export default function StreakDashboardScreen() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Mobile Streak Dashboard removed</h2>
      <p>Challenges and mobile-only streak features are not included in the website deliverable.</p>
    </div>
  );
}










  return (
    <ScrollView style={styles.container}>
      {/* Streak Header */}
      <View style={styles.streakHeader}>
        <View style={styles.streakCircle}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakNumber}>{streak}</Text>
          <Text style={styles.streakLabel}>Day Streak</Text>
        </View>
        <View style={styles.streakInfo}>
          <Text style={styles.streakTitle}>Keep It Going!</Text>
          <Text style={styles.streakSubtitle}>
            Your {streak}-day workout streak. Don't break it today! 💪
          </Text>
          <TouchableOpacity
            style={styles.logButton}
            onPress={logWorkout}
            disabled={loading}
          >
            <Text style={styles.logButtonText}>
              {loading ? 'Logging...' : '✅ Log Workout'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* XP & Badges */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🏆 Achievements</Text>
        <View style={styles.badgesGrid}>
          <View style={[styles.badge, styles.badgeLocked]}>
            <Text style={styles.badgeIcon}>🎯</Text>
            <Text style={styles.badgeLabel}>7-Day</Text>
          </View>
          <View style={[styles.badge, styles.badgeUnlocked]}>
            <Text style={styles.badgeIcon}>⭐</Text>
            <Text style={styles.badgeLabel}>3-Day</Text>
          </View>
          <View style={[styles.badge, styles.badgeLocked]}>
            <Text style={styles.badgeIcon}>👑</Text>
            <Text style={styles.badgeLabel}>14-Day</Text>
          </View>
          <View style={[styles.badge, styles.badgeLocked]}>
            <Text style={styles.badgeIcon}>🚀</Text>
            <Text style={styles.badgeLabel}>Challenge</Text>
          </View>
        </View>
        <View style={styles.xpBar}>
          <View style={[styles.xpFill, { width: '45%' }]} />
        </View>
        <Text style={styles.xpText}>450 / 1000 XP</Text>
      </View>

      {/* Active Challenges */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>⚡ Buddy Challenges</Text>
          <TouchableOpacity onPress={() => setShowNewChallenge(true)}>
            <Text style={styles.link}>+ New</Text>
          </TouchableOpacity>
        </View>

        {challenges.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={challenges}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }: { item: any }) => (
              <View style={styles.challengeCard}>
                <View style={styles.challengeHeader}>
                  <Text style={styles.challengeName}>{item.challengeName}</Text>
                  <Text style={styles.challengeTime}>
                    {item.durationDays} days
                  </Text>
                </View>
                <View style={styles.progressBars}>
                  <View style={styles.progressItem}>
                    <Text style={styles.progressLabel}>You</Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${(item.creatorProgress || 0) * 20}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressValue}>
                      {item.creatorProgress || 0}
                    </Text>
                  </View>
                  <View style={styles.progressItem}>
                    <Text style={styles.progressLabel}>Buddy</Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${(item.buddyProgress || 0) * 20}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressValue}>
                      {item.buddyProgress || 0}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyText}>
            No active challenges. Create one to get started! 🚀
          </Text>
        )}
      </View>

      {/* Leaderboard Preview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🏅 Weekly Leaderboard</Text>
        <View style={styles.leaderboardItem}>
          <Text style={styles.rank}>🥇</Text>
          <View style={styles.rankInfo}>
            <Text style={styles.rankName}>Alex (You)</Text>
            <Text style={styles.rankStreak}>12 day streak</Text>
          </View>
          <Text style={styles.rankXP}>1250 XP</Text>
        </View>
        <View style={styles.leaderboardItem}>
          <Text style={styles.rank}>🥈</Text>
          <View style={styles.rankInfo}>
            <Text style={styles.rankName}>Priya</Text>
            <Text style={styles.rankStreak}>8 day streak</Text>
          </View>
          <Text style={styles.rankXP}>850 XP</Text>
        </View>
        <View style={styles.leaderboardItem}>
          <Text style={styles.rank}>🥉</Text>
          <View style={styles.rankInfo}>
            <Text style={styles.rankName}>Rohan</Text>
            <Text style={styles.rankStreak}>5 day streak</Text>
          </View>
          <Text style={styles.rankXP}>650 XP</Text>
        </View>
      </View>

      {/* New Challenge Modal */}
      <Modal visible={showNewChallenge} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>⚡ Create Challenge</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Challenge Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 3-day plank streak"
                placeholderTextColor="#666"
                value={challengeName}
                onChangeText={setChallengeName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Duration (days)</Text>
              <TextInput
                style={styles.input}
                placeholder="3"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={challengeDays}
                onChangeText={setChallengeDays}
              />
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowNewChallenge(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.createButton]}
                onPress={createChallenge}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Creating...' : 'Create'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 16,
  },
  streakHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  streakCircle: {
    width: 120,
    height: 120,
    backgroundColor: '#FF6B00',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakIcon: {
    fontSize: 40,
    marginBottom: 5,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  streakLabel: {
    fontSize: 12,
    color: '#FFF',
  },
  streakInfo: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  streakSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  logButton: {
    backgroundColor: '#00FF00',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  logButtonText: {
    fontWeight: '600',
    color: '#0a0a0a',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  link: {
    color: '#00FF00',
    fontSize: 12,
    fontWeight: '600',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  badge: {
    width: '23%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  badgeUnlocked: {
    backgroundColor: '#00FF00',
  },
  badgeLocked: {
    backgroundColor: '#333',
  },
  badgeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  badgeLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0a0a0a',
  },
  xpBar: {
    height: 8,
    backgroundColor: '#0a0a0a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#00FF00',
  },
  xpText: {
    fontSize: 12,
    color: '#999',
  },
  challengeCard: {
    backgroundColor: '#0a0a0a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  challengeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  challengeTime: {
    fontSize: 12,
    color: '#FF6B00',
  },
  progressBars: {
    gap: 8,
  },
  progressItem: {
    flex: 1,
  },
  progressLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00FF00',
  },
  progressValue: {
    fontSize: 11,
    color: '#00FF00',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  rank: {
    fontSize: 20,
    marginRight: 12,
    width: 30,
  },
  rankInfo: {
    flex: 1,
  },
  rankName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  rankStreak: {
    fontSize: 11,
    color: '#999',
  },
  rankXP: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00FF00',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#0a0a0a',
    color: '#FFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333',
  },
  createButton: {
    backgroundColor: '#00FF00',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#0a0a0a',
  },
});

export default StreakDashboardScreen;
