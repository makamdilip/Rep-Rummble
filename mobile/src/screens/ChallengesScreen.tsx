import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  challengeService,
  Challenge,
  ChallengeProgress,
} from "../services/challengeService";

const ChallengesScreen = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [myChallenges, setMyChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"browse" | "my">("browse");
  const [challengeProgress, setChallengeProgress] = useState<{
    [key: string]: ChallengeProgress;
  }>({});

  useEffect(() => {
    loadChallenges();
    loadMyChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      const response = await challengeService.getChallenges({
        status: "active",
      });
      if (response.success) {
        setChallenges(response.challenges);
      }
    } catch (error) {
      console.error("Error loading challenges:", error);
      Alert.alert("Error", "Failed to load challenges");
    }
  };

  const loadMyChallenges = async () => {
    try {
      const response = await challengeService.getMyChallenges();
      if (response.success) {
        setMyChallenges(response.challenges);
        // Load progress for each challenge
        for (const challenge of response.challenges) {
          loadChallengeProgress(challenge._id);
        }
      }
    } catch (error) {
      console.error("Error loading my challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadChallengeProgress = async (challengeId: string) => {
    try {
      const response = await challengeService.getChallengeProgress(challengeId);
      if (response.success) {
        setChallengeProgress((prev) => ({
          ...prev,
          [challengeId]: response.progress,
        }));
      }
    } catch (error) {
      console.error("Error loading challenge progress:", error);
    }
  };

  const handleJoinChallenge = async (challengeId: string) => {
    try {
      const response = await challengeService.joinChallenge(challengeId);
      if (response.success) {
        Alert.alert("Success", "Joined challenge successfully!");
        loadChallenges();
        loadMyChallenges();
      }
    } catch (error) {
      console.error("Error joining challenge:", error);
      Alert.alert(
        "Error",
        error.response?.data?.error || "Failed to join challenge",
      );
    }
  };

  const getChallengeTypeIcon = (type: string) => {
    switch (type) {
      case "workout":
        return "💪";
      case "calories":
        return "🔥";
      case "steps":
        return "🚶";
      default:
        return "🏆";
    }
  };

  const getChallengeTypeLabel = (type: string) => {
    switch (type) {
      case "workout":
        return "Workouts";
      case "calories":
        return "Calories";
      case "steps":
        return "Steps";
      default:
        return type;
    }
  };

  const renderChallenge = ({ item }: { item: Challenge }) => {
    const isJoined = myChallenges.some((c) => c._id === item._id);
    const progress = challengeProgress[item._id];

    return (
      <View style={styles.challengeCard}>
        <View style={styles.challengeHeader}>
          <Text style={styles.challengeIcon}>
            {getChallengeTypeIcon(item.challengeType)}
          </Text>
          <View style={styles.challengeInfo}>
            <Text style={styles.challengeTitle}>{item.title}</Text>
            <Text style={styles.challengeMeta}>
              {getChallengeTypeLabel(item.challengeType)} • {item.targetValue}{" "}
              {item.targetUnit}
            </Text>
          </View>
        </View>

        {item.description && (
          <Text style={styles.challengeDescription}>{item.description}</Text>
        )}

        <View style={styles.challengeDetails}>
          <Text style={styles.challengeDetail}>
            Duration: {item.duration} days
          </Text>
          <Text style={styles.challengeDetail}>
            Participants: {item.participants.length}
            {item.maxParticipants && `/${item.maxParticipants}`}
          </Text>
        </View>

        {isJoined && progress && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min(progress.percentage, 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {progress.current} / {progress.target} (
              {progress.percentage.toFixed(1)}%)
            </Text>
          </View>
        )}

        <View style={styles.challengeFooter}>
          <Text style={styles.challengeCreator}>
            by {item.creator.displayName || item.creator.email}
          </Text>
          {!isJoined && (
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => handleJoinChallenge(item._id)}
            >
              <Text style={styles.joinButtonText}>Join Challenge</Text>
            </TouchableOpacity>
          )}
          {isJoined && (
            <View style={styles.joinedBadge}>
              <Text style={styles.joinedBadgeText}>Joined</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Challenges</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "browse" && styles.activeTab]}
          onPress={() => setActiveTab("browse")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "browse" && styles.activeTabText,
            ]}
          >
            Browse
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "my" && styles.activeTab]}
          onPress={() => setActiveTab("my")}
        >
          <Text
            style={[styles.tabText, activeTab === "my" && styles.activeTabText]}
          >
            My Challenges ({myChallenges.length})
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "browse" && (
        <FlatList
          data={challenges}
          renderItem={renderChallenge}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No active challenges</Text>
              <Text style={styles.emptySubtext}>
                Check back later for new challenges!
              </Text>
            </View>
          }
        />
      )}

      {activeTab === "my" && (
        <FlatList
          data={myChallenges}
          renderItem={renderChallenge}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No active challenges</Text>
              <Text style={styles.emptySubtext}>
                Join a challenge to start competing!
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  listContainer: {
    padding: 10,
  },
  challengeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  challengeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  challengeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  challengeMeta: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  challengeDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
    lineHeight: 20,
  },
  challengeDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  challengeDetail: {
    fontSize: 12,
    color: "#777",
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#34c759",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  challengeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  challengeCreator: {
    fontSize: 12,
    color: "#999",
    flex: 1,
  },
  joinButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  joinedBadge: {
    backgroundColor: "#34c759",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  joinedBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 10,
  },
});

export default ChallengesScreen;
