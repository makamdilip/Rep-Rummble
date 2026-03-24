import { api } from "../config/api";

export interface Challenge {
  _id: string;
  title: string;
  description?: string;
  challengeType: "workout" | "calories" | "steps";
  targetValue: number;
  targetUnit: string;
  duration: number; // in days
  startDate: string;
  endDate: string;
  isPublic: boolean;
  maxParticipants?: number;
  participants: string[];
  creator: {
    _id: string;
    displayName?: string;
    email: string;
  };
  status: "active" | "completed" | "cancelled";
  createdAt: string;
}

export interface ChallengeProgress {
  current: number;
  target: number;
  percentage: number;
  completed: boolean;
  challenge: {
    id: string;
    title: string;
    type: string;
    unit: string;
    endDate: string;
  };
}

export interface ChallengeParticipant {
  rank: number;
  user: {
    id: string;
    displayName: string;
    email: string;
  };
  progress: number;
  target: number;
  percentage: number;
  completed: boolean;
}

export const challengeService = {
  // Create a new challenge
  createChallenge: async (challengeData: {
    title: string;
    description?: string;
    challengeType: "workout" | "calories" | "steps";
    targetValue: number;
    targetUnit: string;
    duration: number;
    isPublic?: boolean;
    maxParticipants?: number;
  }): Promise<{ success: boolean; challenge: Challenge }> => {
    const response = await api.post("/challenges", challengeData);
    return response.data;
  },

  // Get challenges with filtering
  getChallenges: async (params?: {
    type?: "workout" | "calories" | "steps" | "all";
    status?: "active" | "completed" | "all";
    page?: number;
    limit?: number;
  }): Promise<{
    success: boolean;
    challenges: Challenge[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> => {
    const queryParams = new URLSearchParams();
    if (params?.type && params.type !== "all")
      queryParams.append("type", params.type);
    if (params?.status && params.status !== "all")
      queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const response = await api.get(`/challenges?${queryParams.toString()}`);
    return response.data;
  },

  // Join a challenge
  joinChallenge: async (
    challengeId: string,
  ): Promise<{
    success: boolean;
    message: string;
    challenge: Challenge;
    participant: any;
  }> => {
    const response = await api.post(`/challenges/${challengeId}/join`);
    return response.data;
  },

  // Get personal challenge progress
  getChallengeProgress: async (
    challengeId: string,
  ): Promise<{
    success: boolean;
    progress: ChallengeProgress;
  }> => {
    const response = await api.get(`/challenges/${challengeId}/progress`);
    return response.data;
  },

  // Get challenge leaderboard
  getChallengeLeaderboard: async (
    challengeId: string,
  ): Promise<{
    success: boolean;
    challenge: {
      id: string;
      title: string;
      type: string;
      unit: string;
    };
    leaderboard: ChallengeParticipant[];
  }> => {
    const response = await api.get(`/challenges/${challengeId}/leaderboard`);
    return response.data;
  },

  // Get user's active challenges
  getMyChallenges: async (): Promise<{
    success: boolean;
    challenges: Challenge[];
  }> => {
    const response = await api.get("/challenges?status=active");
    return response.data;
  },
};
