import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { socialService, SocialPost } from "../services/socialService";

const SocialFeedScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async (page = 1) => {
    try {
      const response = await socialService.getFeed({ page, limit: 20 });
      if (response.success) {
        if (page === 1) {
          setPosts(response.posts);
        } else {
          setPosts((prev) => [...prev, ...response.posts]);
        }
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error("Error loading feed:", error);
      Alert.alert("Error", "Failed to load feed");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadFeed(1);
  };

  const handleLoadMore = () => {
    if (pagination.page < pagination.pages) {
      loadFeed(pagination.page + 1);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      Alert.alert("Error", "Please enter some content for your post");
      return;
    }

    try {
      const response = await socialService.createPost({
        content: newPostContent.trim(),
        postType: "general",
      });

      if (response.success) {
        setPosts((prev) => [response.post, ...prev]);
        setNewPostContent("");
        setShowCreatePost(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post");
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      const response = await socialService.likePost(postId);
      if (response.success) {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: response.liked
                    ? [...post.likes, "currentUser"] // Placeholder for current user
                    : post.likes.filter((id) => id !== "currentUser"),
                }
              : post,
          ),
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
      Alert.alert("Error", "Failed to like post");
    }
  };

  const handleAddComment = async () => {
    if (!selectedPost || !newComment.trim()) return;

    try {
      const response = await socialService.addComment(
        selectedPost._id,
        newComment.trim(),
      );
      if (response.success) {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === selectedPost._id
              ? { ...post, comments: [...post.comments, response.comment] }
              : post,
          ),
        );
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      Alert.alert("Error", "Failed to add comment");
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return "🏆";
      case "workout":
        return "💪";
      case "meal":
        return "🍎";
      case "challenge":
        return "🎯";
      case "milestone":
        return "🎉";
      default:
        return "📝";
    }
  };

  const renderPost = ({ item }: { item: SocialPost }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Text style={styles.postIcon}>{getPostTypeIcon(item.postType)}</Text>
        <View style={styles.postAuthor}>
          <Text style={styles.authorName}>
            {item.author.displayName || item.author.email}
          </Text>
          <Text style={styles.postTime}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      {item.tags && item.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              #{tag}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLikePost(item._id)}
        >
          <Text style={styles.actionText}>❤️ {item.likes.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            setSelectedPost(item);
            setShowComments(true);
          }}
        >
          <Text style={styles.actionText}>💬 {item.comments.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderComment = (comment: SocialPost["comments"][0]) => (
    <View key={comment._id} style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentAuthor}>
          {comment.author.displayName || comment.author.email}
        </Text>
        <Text style={styles.commentTime}>
          {new Date(comment.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.commentContent}>{comment.content}</Text>
    </View>
  );

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
        <Text style={styles.title}>Social Feed</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("Friends" as never)}
          >
            <Text style={styles.headerButtonText}>👥</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("Challenges" as never)}
          >
            <Text style={styles.headerButtonText}>🏆</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setShowCreatePost(true)}
          >
            <Text style={styles.createButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.feedContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No posts yet</Text>
            <Text style={styles.emptySubtext}>
              Be the first to share your fitness journey!
            </Text>
          </View>
        }
      />

      {/* Create Post Modal */}
      <Modal
        visible={showCreatePost}
        animationType="slide"
        onRequestClose={() => setShowCreatePost(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCreatePost(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Create Post</Text>
            <TouchableOpacity onPress={handleCreatePost}>
              <Text style={styles.postButton}>Post</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.postInput}
            placeholder="Share your fitness journey..."
            multiline
            value={newPostContent}
            onChangeText={setNewPostContent}
            maxLength={1000}
          />

          <Text style={styles.charCount}>{newPostContent.length}/1000</Text>
        </SafeAreaView>
      </Modal>

      {/* Comments Modal */}
      <Modal
        visible={showComments}
        animationType="slide"
        onRequestClose={() => {
          setShowComments(false);
          setSelectedPost(null);
          setNewComment("");
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setShowComments(false);
                setSelectedPost(null);
                setNewComment("");
              }}
            >
              <Text style={styles.cancelButton}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Comments</Text>
            <View style={{ width: 50 }} />
          </View>

          {selectedPost && (
            <>
              <View style={styles.selectedPost}>
                <Text style={styles.selectedPostContent}>
                  {selectedPost.content}
                </Text>
              </View>

              <FlatList
                data={selectedPost.comments}
                renderItem={({ item }) => renderComment(item)}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.commentsList}
                ListEmptyComponent={
                  <Text style={styles.noComments}>No comments yet</Text>
                }
              />

              <View style={styles.commentInputContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChangeText={setNewComment}
                  maxLength={500}
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleAddComment}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerButtonText: {
    fontSize: 18,
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  feedContainer: {
    padding: 10,
  },
  postCard: {
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
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  postIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  postAuthor: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postTime: {
    fontSize: 12,
    color: "#999",
  },
  postContent: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    color: "#007AFF",
    fontSize: 14,
    marginRight: 8,
    marginBottom: 4,
  },
  postActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  actionButton: {
    marginRight: 20,
  },
  actionText: {
    fontSize: 14,
    color: "#666",
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
  modalContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  cancelButton: {
    color: "#007AFF",
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  postButton: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  postInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 12,
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 120,
  },
  charCount: {
    textAlign: "right",
    marginRight: 20,
    marginBottom: 20,
    color: "#999",
    fontSize: 12,
  },
  selectedPost: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 10,
    borderRadius: 12,
  },
  selectedPostContent: {
    fontSize: 16,
    color: "#333",
  },
  commentsList: {
    padding: 10,
  },
  commentItem: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  commentTime: {
    fontSize: 12,
    color: "#999",
  },
  commentContent: {
    fontSize: 14,
    color: "#555",
    lineHeight: 18,
  },
  noComments: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    marginTop: 20,
  },
  commentInputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 20,
    marginRight: 10,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SocialFeedScreen;
