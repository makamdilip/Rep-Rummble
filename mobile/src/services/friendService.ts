import { api } from "../config/api";

export interface Friend {
  id: string;
  displayName: string;
  email: string;
  friendshipId: string;
}

export interface FriendRequest {
  id: string;
  requester: {
    id: string;
    displayName: string;
    email: string;
  };
  createdAt: string;
}

export const friendService = {
  // Send a friend request
  sendFriendRequest: async (friendId: string) => {
    const response = await api.post("/friends/request", { friendId });
    return response.data;
  },

  // Accept a friend request
  acceptFriendRequest: async (requestId: string) => {
    const response = await api.post(`/friends/accept/${requestId}`);
    return response.data;
  },

  // Decline a friend request
  declineFriendRequest: async (requestId: string) => {
    const response = await api.post(`/friends/decline/${requestId}`);
    return response.data;
  },

  // Get friends list
  getFriends: async (): Promise<{ success: boolean; friends: Friend[] }> => {
    const response = await api.get("/friends");
    return response.data;
  },

  // Get pending friend requests
  getFriendRequests: async (): Promise<{
    success: boolean;
    requests: FriendRequest[];
  }> => {
    const response = await api.get("/friends/requests");
    return response.data;
  },

  // Remove a friend
  removeFriend: async (friendId: string) => {
    const response = await api.delete(`/friends/${friendId}`);
    return response.data;
  },

  // Search users (for finding friends to add)
  searchUsers: async (query: string) => {
    const response = await api.get(
      `/users/search?q=${encodeURIComponent(query)}`,
    );
    return response.data;
  },
};
