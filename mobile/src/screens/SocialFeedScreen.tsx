import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  Modal,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  RefreshControl,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { socialService, SocialPost } from "../services/socialService";
import { useAuth } from "../context/AuthContext";

const { width: SW } = Dimensions.get("window");

const POST_TYPES = [
  { key: "all", label: "All", icon: "apps", color: "#7c3aed" },
  { key: "workout", label: "Workout", icon: "barbell", color: "#22c55e" },
  { key: "meal", label: "Meal", icon: "restaurant", color: "#f97316" },
  { key: "achievement", label: "Win", icon: "trophy", color: "#eab308" },
  { key: "challenge", label: "Challenge", icon: "flash", color: "#ef4444" },
];

const TYPE_META: Record<string, { color: string; icon: string; label: string }> = {
  workout:     { color: "#22c55e", icon: "barbell",    label: "Workout" },
  meal:        { color: "#f97316", icon: "restaurant", label: "Meal" },
  achievement: { color: "#eab308", icon: "trophy",     label: "Achievement" },
  challenge:   { color: "#ef4444", icon: "flash",      label: "Challenge" },
  milestone:   { color: "#a78bfa", icon: "star",       label: "Milestone" },
  general:     { color: "#94a3b8", icon: "chatbubble", label: "Post" },
};

// Fake stories for the stories bar (uses friends from mock data)
const MOCK_STORIES = [
  { id: "s1", name: "Alex K", initial: "A", color: ["#7c3aed", "#4f1d9a"] as const, hasStory: true },
  { id: "s2", name: "Jordan", initial: "J", color: ["#22c55e", "#15803d"] as const, hasStory: true },
  { id: "s3", name: "Sam R", initial: "S", color: ["#f97316", "#c2410c"] as const, hasStory: true },
  { id: "s4", name: "Taylor", initial: "T", color: ["#eab308", "#92400e"] as const, hasStory: false },
  { id: "s5", name: "Morgan", initial: "M", color: ["#ef4444", "#b91c1c"] as const, hasStory: true },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function Avatar({ name, size = 40, colors = ["#7c3aed", "#4f1d9a"] as const }: { name: string; size?: number; colors?: readonly [string, string] }) {
  return (
    <LinearGradient colors={colors} style={{ width: size, height: size, borderRadius: size / 2, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#fff", fontWeight: "800", fontSize: size * 0.38 }}>{name[0].toUpperCase()}</Text>
    </LinearGradient>
  );
}

function LikeButton({ count, onPress }: { count: number; onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [liked, setLiked] = useState(false);

  const handlePress = () => {
    setLiked(l => !l);
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.4, useNativeDriver: true, speed: 40 }),
      Animated.spring(scale, { toValue: 1,   useNativeDriver: true, speed: 30 }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.actionBtn} activeOpacity={0.7}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons name={liked ? "heart" : "heart-outline"} size={22} color={liked ? "#ef4444" : "#94a3b8"} />
      </Animated.View>
      <Text style={[styles.actionCount, liked && { color: "#ef4444" }]}>{count + (liked ? 1 : 0)}</Text>
    </TouchableOpacity>
  );
}

export default function SocialFeedScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("all");
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentInputFor, setCommentInputFor] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [createContent, setCreateContent] = useState("");
  const [createType, setCreateType] = useState<string>("general");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => { loadFeed(); }, []);

  const loadFeed = async (page = 1) => {
    try {
      const res = await socialService.getFeed({ page, limit: 20 });
      if (res.success) {
        page === 1 ? setPosts(res.posts) : setPosts(p => [...p, ...res.posts]);
      }
    } catch (e) {
      console.error("Error loading feed:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Camera access is required to take photos.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Photo library access is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };

  const closeCreate = () => {
    setShowCreate(false);
    setCreateContent("");
    setCreateType("general");
    setSelectedImage(null);
  };

  const handleLike = async (postId: string) => {
    try {
      const res = await socialService.likePost(postId);
      if (res.success) {
        setPosts(prev => prev.map(p =>
          p._id === postId
            ? { ...p, likes: res.liked ? [...p.likes, user?._id || "me"] : p.likes.filter(id => id !== (user?._id || "me")) }
            : p
        ));
      }
    } catch {}
  };

  const handleComment = async (postId: string) => {
    if (!newComment.trim()) return;
    try {
      const res = await socialService.addComment(postId, newComment.trim());
      if (res.success) {
        setPosts(prev => prev.map(p =>
          p._id === postId ? { ...p, comments: [...p.comments, res.comment] } : p
        ));
        setNewComment("");
        setCommentInputFor(null);
      }
    } catch {}
  };

  const handleCreatePost = async () => {
    if (!createContent.trim() && !selectedImage) return;
    try {
      const res = await socialService.createPost({
        content: createContent.trim(),
        postType: createType as any,
        mediaUrls: selectedImage ? [selectedImage] : [],
      });
      if (res.success) {
        // Attach image to the returned post object for immediate display
        const postWithImage = selectedImage
          ? { ...res.post, mediaUrls: [selectedImage] }
          : res.post;
        setPosts(p => [postWithImage, ...p]);
        closeCreate();
      }
    } catch {
      Alert.alert("Error", "Failed to create post");
    }
  };

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  const filteredPosts = filter === "all" ? posts : posts.filter(p => p.postType === filter);

  const renderPost = ({ item }: { item: SocialPost }) => {
    const meta = TYPE_META[item.postType] || TYPE_META.general;
    const commentsOpen = expandedComments.has(item._id);
    const authorName = item.author.displayName || item.author.email.split("@")[0];

    return (
      <View style={styles.postCard}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.storyRing}>
            <Avatar name={authorName} size={42} />
          </View>
          <View style={styles.postAuthorInfo}>
            <Text style={styles.authorName}>{authorName}</Text>
            <View style={styles.postMeta}>
              <LinearGradient colors={[meta.color + "30", meta.color + "10"]} style={styles.typeBadge}>
                <Ionicons name={meta.icon as any} size={10} color={meta.color} />
                <Text style={[styles.typeBadgeText, { color: meta.color }]}>{meta.label}</Text>
              </LinearGradient>
              <Text style={styles.postTime}>{timeAgo(item.createdAt)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreBtn}>
            <Ionicons name="ellipsis-horizontal" size={18} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        {item.content ? <Text style={styles.postContent}>{item.content}</Text> : null}

        {/* Media image */}
        {item.mediaUrls && item.mediaUrls.length > 0 && (
          <View style={styles.postImageWrap}>
            <Image
              source={{ uri: item.mediaUrls[0] }}
              style={styles.postImage}
              resizeMode="cover"
            />
            {item.mediaUrls.length > 1 && (
              <View style={styles.moreImagesOverlay}>
                <Ionicons name="images" size={18} color="#fff" />
                <Text style={styles.moreImagesText}>+{item.mediaUrls.length - 1}</Text>
              </View>
            )}
          </View>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <View style={styles.tagsRow}>
            {item.tags.map((tag, i) => (
              <TouchableOpacity key={i} style={styles.tagPill}>
                <Text style={styles.tagText}>#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Divider */}
        <View style={styles.postDivider} />

        {/* Actions */}
        <View style={styles.actionsRow}>
          <LikeButton count={item.likes.length} onPress={() => handleLike(item._id)} />

          <TouchableOpacity style={styles.actionBtn} onPress={() => toggleComments(item._id)} activeOpacity={0.7}>
            <Ionicons name={commentsOpen ? "chatbubble" : "chatbubble-outline"} size={21} color={commentsOpen ? "#7c3aed" : "#94a3b8"} />
            <Text style={[styles.actionCount, commentsOpen && { color: "#7c3aed" }]}>{item.comments.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <Ionicons name="paper-plane-outline" size={21} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, { marginLeft: "auto" }]} activeOpacity={0.7}>
            <Ionicons name="bookmark-outline" size={21} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Comments section */}
        {commentsOpen && (
          <View style={styles.commentsSection}>
            {item.comments.slice(0, 3).map(c => (
              <View key={c._id} style={styles.commentRow}>
                <Avatar name={c.author.displayName || c.author.email} size={28} />
                <View style={styles.commentBubble}>
                  <Text style={styles.commentAuthor}>{c.author.displayName || c.author.email.split("@")[0]}</Text>
                  <Text style={styles.commentText}>{c.content}</Text>
                </View>
              </View>
            ))}
            {item.comments.length === 0 && (
              <Text style={styles.noCommentsText}>No comments yet. Be the first!</Text>
            )}
            {/* Comment input inline */}
            {commentInputFor === item._id ? (
              <View style={styles.inlineInput}>
                <TextInput
                  style={styles.inlineInputField}
                  placeholder="Add a comment..."
                  placeholderTextColor="#6b7280"
                  value={newComment}
                  onChangeText={setNewComment}
                  autoFocus
                />
                <TouchableOpacity onPress={() => handleComment(item._id)} style={styles.sendBtn}>
                  <LinearGradient colors={["#7c3aed", "#4f1d9a"]} style={styles.sendBtnGrad}>
                    <Ionicons name="paper-plane" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setCommentInputFor(item._id)} style={styles.addCommentTap}>
                <Avatar name={user?.displayName || user?.email || "Y"} size={28} />
                <Text style={styles.addCommentPlaceholder}>Add a comment...</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#1a0533", "#0d0f1a", "#080b14"]} locations={[0, 0.3, 1]} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Rep Rummble</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate("Friends" as never)} style={styles.headerIcon}>
              <Ionicons name="people-outline" size={24} color="#f1f5f9" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Challenges" as never)} style={styles.headerIcon}>
              <Ionicons name="trophy-outline" size={24} color="#f1f5f9" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowCreate(true)} style={styles.createBtn}>
              <LinearGradient colors={["#7c3aed", "#4f1d9a"]} style={styles.createBtnGrad}>
                <Ionicons name="add" size={22} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={filteredPosts}
          renderItem={renderPost}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadFeed(1); }} tintColor="#7c3aed" />}
          ListHeaderComponent={
            <>
              {/* Stories Bar */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesBar} contentContainerStyle={styles.storiesContent}>
                {/* Your story */}
                <TouchableOpacity style={styles.storyItem}>
                  <View style={styles.addStoryWrap}>
                    <Avatar name={user?.displayName || user?.email || "Y"} size={56} />
                    <View style={styles.addStoryPlus}>
                      <Ionicons name="add" size={14} color="#fff" />
                    </View>
                  </View>
                  <Text style={styles.storyName} numberOfLines={1}>Your Story</Text>
                </TouchableOpacity>

                {/* Friend stories */}
                {MOCK_STORIES.map(s => (
                  <TouchableOpacity key={s.id} style={styles.storyItem}>
                    <LinearGradient
                      colors={s.hasStory ? ["#7c3aed", "#f97316"] : ["#2d3561", "#1e2a4a"]}
                      style={styles.storyRingGrad}
                    >
                      <View style={styles.storyAvatarInner}>
                        <Avatar name={s.name} size={52} colors={s.color} />
                      </View>
                    </LinearGradient>
                    <Text style={styles.storyName} numberOfLines={1}>{s.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Filter Tabs */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar} contentContainerStyle={styles.filterContent}>
                {POST_TYPES.map(t => (
                  <TouchableOpacity
                    key={t.key}
                    onPress={() => setFilter(t.key)}
                    style={[styles.filterTab, filter === t.key && { borderColor: t.color }]}
                    activeOpacity={0.8}
                  >
                    {filter === t.key && (
                      <LinearGradient colors={[t.color + "30", t.color + "10"]} style={[StyleSheet.absoluteFill, { borderRadius: 20 }]} />
                    )}
                    <Ionicons name={t.icon as any} size={14} color={filter === t.key ? t.color : "#6b7280"} />
                    <Text style={[styles.filterTabText, filter === t.key && { color: t.color, fontWeight: "700" }]}>{t.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={56} color="#2d3561" />
              <Text style={styles.emptyTitle}>Nothing here yet</Text>
              <Text style={styles.emptyHint}>Share your fitness journey!</Text>
            </View>
          }
        />
      </SafeAreaView>

      {/* Create Post Modal */}
      <Modal visible={showCreate} animationType="slide" presentationStyle="pageSheet" onRequestClose={closeCreate}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <LinearGradient colors={["#1a0533", "#0d0f1a"]} style={styles.createModal}>
            {/* Modal Header */}
            <View style={styles.createHeader}>
              <TouchableOpacity onPress={closeCreate}>
                <Text style={styles.createCancel}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.createTitle}>New Post</Text>
              <TouchableOpacity onPress={handleCreatePost} disabled={!createContent.trim() && !selectedImage}>
                <LinearGradient
                  colors={(createContent.trim() || selectedImage) ? ["#7c3aed", "#4f1d9a"] : ["#2d3561", "#1e2a4a"]}
                  style={styles.createPostBtn}
                >
                  <Text style={styles.createPostBtnText}>Share</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Type picker */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typePickerRow} contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}>
              {POST_TYPES.filter(t => t.key !== "all").map(t => (
                <TouchableOpacity
                  key={t.key}
                  onPress={() => setCreateType(t.key)}
                  style={[styles.typePill, createType === t.key && { borderColor: t.color }]}
                >
                  {createType === t.key && <LinearGradient colors={[t.color + "40", t.color + "10"]} style={[StyleSheet.absoluteFill, { borderRadius: 20 }]} />}
                  <Ionicons name={t.icon as any} size={14} color={createType === t.key ? t.color : "#6b7280"} />
                  <Text style={[styles.typePillText, createType === t.key && { color: t.color }]}>{t.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
              {/* Input row */}
              <View style={styles.createInputWrap}>
                <Avatar name={user?.displayName || user?.email || "Y"} size={44} />
                <TextInput
                  style={styles.createInput}
                  placeholder="Share your fitness journey..."
                  placeholderTextColor="#6b7280"
                  multiline
                  value={createContent}
                  onChangeText={setCreateContent}
                  maxLength={1000}
                />
              </View>
              <Text style={styles.charCount}>{createContent.length}/1000</Text>

              {/* Selected image preview */}
              {selectedImage && (
                <View style={styles.previewWrap}>
                  <Image source={{ uri: selectedImage }} style={styles.previewImage} resizeMode="cover" />
                  <TouchableOpacity style={styles.previewRemove} onPress={() => setSelectedImage(null)}>
                    <LinearGradient colors={["#0d0f1a", "#0d0f1a"]} style={styles.previewRemoveGrad}>
                      <Ionicons name="close" size={16} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>

            {/* Media toolbar */}
            <View style={styles.mediaToolbar}>
              <TouchableOpacity style={styles.mediaBtn} onPress={openCamera} activeOpacity={0.7}>
                <LinearGradient colors={["#7c3aed30", "#7c3aed10"]} style={styles.mediaBtnGrad}>
                  <Ionicons name="camera" size={22} color="#a78bfa" />
                </LinearGradient>
                <Text style={styles.mediaBtnLabel}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.mediaBtn} onPress={openGallery} activeOpacity={0.7}>
                <LinearGradient colors={["#22c55e30", "#22c55e10"]} style={styles.mediaBtnGrad}>
                  <Ionicons name="images" size={22} color="#22c55e" />
                </LinearGradient>
                <Text style={styles.mediaBtnLabel}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.mediaBtn} activeOpacity={0.7}>
                <LinearGradient colors={["#f9731630", "#f9731610"]} style={styles.mediaBtnGrad}>
                  <Ionicons name="location" size={22} color="#f97316" />
                </LinearGradient>
                <Text style={styles.mediaBtnLabel}>Location</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.mediaBtn} activeOpacity={0.7}>
                <LinearGradient colors={["#eab30830", "#eab30810"]} style={styles.mediaBtnGrad}>
                  <Ionicons name="happy" size={22} color="#eab308" />
                </LinearGradient>
                <Text style={styles.mediaBtnLabel}>Feeling</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1 },

  // Header
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingTop: 4, paddingBottom: 10 },
  headerTitle: { fontSize: 22, fontWeight: "900", color: "#fff", letterSpacing: -0.5 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 4 },
  headerIcon: { padding: 8 },
  createBtn: { marginLeft: 4 },
  createBtnGrad: { width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center" },

  // Stories
  storiesBar: { borderBottomWidth: 1, borderBottomColor: "#2d356130" },
  storiesContent: { paddingHorizontal: 16, paddingVertical: 12, gap: 16 },
  storyItem: { alignItems: "center", width: 70 },
  storyRingGrad: { width: 62, height: 62, borderRadius: 31, justifyContent: "center", alignItems: "center", marginBottom: 6 },
  storyAvatarInner: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: "#0d0f1a", overflow: "hidden" },
  addStoryWrap: { width: 62, height: 62, borderRadius: 31, marginBottom: 6, position: "relative", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "#2d3561", borderStyle: "dashed" },
  addStoryPlus: { position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderRadius: 10, backgroundColor: "#7c3aed", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "#0d0f1a" },
  storyName: { fontSize: 11, color: "#94a3b8", textAlign: "center", fontWeight: "500" },
  storyRing: { marginRight: 10 },

  // Filter
  filterBar: { marginVertical: 10 },
  filterContent: { paddingHorizontal: 16, gap: 8 },
  filterTab: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "#2d3561", gap: 5, overflow: "hidden" },
  filterTabText: { fontSize: 13, color: "#6b7280", fontWeight: "500" },

  // Post card
  postCard: { backgroundColor: "#161b2e", marginHorizontal: 12, marginBottom: 12, borderRadius: 20, borderWidth: 1, borderColor: "#2d356150", overflow: "hidden" },
  postHeader: { flexDirection: "row", alignItems: "center", padding: 14, paddingBottom: 10 },
  postAuthorInfo: { flex: 1 },
  authorName: { fontSize: 15, fontWeight: "700", color: "#f1f5f9" },
  postMeta: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 3 },
  typeBadge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, gap: 4 },
  typeBadgeText: { fontSize: 11, fontWeight: "700" },
  postTime: { fontSize: 12, color: "#6b7280" },
  moreBtn: { padding: 4 },
  postContent: { fontSize: 15, color: "#e2e8f0", lineHeight: 22, paddingHorizontal: 14, paddingBottom: 12 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 14, gap: 6, paddingBottom: 12 },
  tagPill: { backgroundColor: "#7c3aed20", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: "#7c3aed40" },
  tagText: { color: "#a78bfa", fontSize: 13, fontWeight: "500" },
  postDivider: { height: 1, backgroundColor: "#2d356140", marginHorizontal: 14 },

  // Actions
  actionsRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 10 },
  actionBtn: { flexDirection: "row", alignItems: "center", gap: 5, marginRight: 20 },
  actionCount: { fontSize: 14, color: "#94a3b8", fontWeight: "600" },

  // Comments
  commentsSection: { paddingHorizontal: 14, paddingBottom: 14, borderTopWidth: 1, borderTopColor: "#2d356140" },
  commentRow: { flexDirection: "row", gap: 10, marginTop: 10, alignItems: "flex-start" },
  commentBubble: { flex: 1, backgroundColor: "#0d0f1a", borderRadius: 14, padding: 10, borderWidth: 1, borderColor: "#2d356140" },
  commentAuthor: { fontSize: 12, fontWeight: "700", color: "#a78bfa", marginBottom: 2 },
  commentText: { fontSize: 14, color: "#e2e8f0", lineHeight: 20 },
  noCommentsText: { fontSize: 13, color: "#6b7280", textAlign: "center", marginTop: 10 },
  addCommentTap: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 },
  addCommentPlaceholder: { fontSize: 14, color: "#6b7280" },
  inlineInput: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10 },
  inlineInputField: { flex: 1, backgroundColor: "#0d0f1a", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, color: "#fff", fontSize: 14, borderWidth: 1, borderColor: "#2d3561" },
  sendBtn: {},
  sendBtnGrad: { width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center" },

  // Empty
  emptyState: { alignItems: "center", paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: "#6b7280", marginTop: 14 },
  emptyHint: { fontSize: 13, color: "#2d3561", marginTop: 4 },

  // Create modal
  createModal: { flex: 1 },
  createHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#2d3561" },
  createCancel: { color: "#94a3b8", fontSize: 16 },
  createTitle: { fontSize: 18, fontWeight: "800", color: "#fff" },
  createPostBtn: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20 },
  createPostBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  typePickerRow: { marginVertical: 14 },
  typePill: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "#2d3561", gap: 6, overflow: "hidden" },
  typePillText: { fontSize: 13, color: "#6b7280", fontWeight: "500" },
  createInputWrap: { flexDirection: "row", gap: 12, padding: 16, alignItems: "flex-start" },
  createInput: { flex: 1, color: "#fff", fontSize: 16, lineHeight: 24, minHeight: 120, textAlignVertical: "top" },
  charCount: { textAlign: "right", paddingRight: 16, paddingBottom: 8, color: "#6b7280", fontSize: 12 },

  // Post image
  postImageWrap: { marginHorizontal: 0, marginBottom: 0, position: "relative" },
  postImage: { width: "100%", height: SW * 0.65, backgroundColor: "#0d0f1a" },
  moreImagesOverlay: { position: "absolute", bottom: 10, right: 10, flexDirection: "row", alignItems: "center", backgroundColor: "#00000080", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5, gap: 4 },
  moreImagesText: { color: "#fff", fontWeight: "700", fontSize: 13 },

  // Image preview in create modal
  previewWrap: { marginHorizontal: 16, marginBottom: 12, borderRadius: 16, overflow: "hidden", position: "relative" },
  previewImage: { width: "100%", height: 220, borderRadius: 16 },
  previewRemove: { position: "absolute", top: 10, right: 10 },
  previewRemoveGrad: { width: 30, height: 30, borderRadius: 15, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#ffffff40" },

  // Media toolbar
  mediaToolbar: { flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 16, paddingVertical: 14, borderTopWidth: 1, borderTopColor: "#2d3561" },
  mediaBtn: { alignItems: "center", gap: 6 },
  mediaBtnGrad: { width: 50, height: 50, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  mediaBtnLabel: { fontSize: 11, color: "#94a3b8", fontWeight: "500" },
});
