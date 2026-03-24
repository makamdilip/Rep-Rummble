import { api } from "../config/api";

export interface SocialPost {
  _id: string;
  author: {
    _id: string;
    displayName?: string;
    email: string;
  };
  postType:
    | "achievement"
    | "workout"
    | "meal"
    | "challenge"
    | "milestone"
    | "general";
  content: string;
  mediaUrls?: string[];
  workoutId?: string;
  challengeId?: string;
  isPublic?: boolean;
  likes: string[];
  comments: {
    _id: string;
    author: {
      _id: string;
      displayName?: string;
      email: string;
    };
    content: string;
    createdAt: string;
  }[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export const socialService = {
  // Create a new post
  createPost: async (postData: {
    content: string;
    postType?:
      | "achievement"
      | "workout"
      | "meal"
      | "challenge"
      | "milestone"
      | "general";
    mediaUrls?: string[];
    workoutId?: string;
    challengeId?: string;
    tags?: string[];
  }): Promise<{ success: boolean; post: SocialPost }> => {
    const response = await api.post("/social/posts", postData);
    return response.data;
  },

  // Get social feed
  getFeed: async (params?: {
    page?: number;
    limit?: number;
    type?:
      | "achievement"
      | "workout"
      | "meal"
      | "challenge"
      | "milestone"
      | "general"
      | "all";
  }): Promise<{
    success: boolean;
    posts: SocialPost[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.type && params.type !== "all")
      queryParams.append("type", params.type);

    const response = await api.get(`/social/feed?${queryParams.toString()}`);
    return response.data;
  },

  // Like or unlike a post
  likePost: async (
    postId: string,
  ): Promise<{
    success: boolean;
    liked: boolean;
    likesCount: number;
  }> => {
    const response = await api.post(`/social/posts/${postId}/like`);
    return response.data;
  },

  // Add a comment to a post
  addComment: async (
    postId: string,
    content: string,
  ): Promise<{
    success: boolean;
    comment: SocialPost["comments"][0];
  }> => {
    const response = await api.post(`/social/posts/${postId}/comments`, {
      content,
    });
    return response.data;
  },

  // Get comments for a post
  getPostComments: async (
    postId: string,
    params?: {
      page?: number;
      limit?: number;
    },
  ): Promise<{
    success: boolean;
    comments: SocialPost["comments"];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const response = await api.get(
      `/social/posts/${postId}/comments?${queryParams.toString()}`,
    );
    return response.data;
  },

  // Delete a post
  deletePost: async (
    postId: string,
  ): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete(`/social/posts/${postId}`);
    return response.data;
  },

  // Get user's own posts
  getMyPosts: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<{
    success: boolean;
    posts: SocialPost[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const response = await api.get(`/social/feed?${queryParams.toString()}`);
    return response.data;
  },
};
