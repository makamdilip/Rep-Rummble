import api from '../config/api';
import { LeaderboardEntry } from '../types';

/**
 * Get the global leaderboard
 */
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const response = await api.get('/leaderboard');
  return response.data.data;
};

/**
 * Get user's rank in the leaderboard
 */
export const getUserRank = async (userId: string): Promise<number | null> => {
  const leaderboard = await getLeaderboard();
  const index = leaderboard.findIndex((entry) => entry.oderId === userId);
  return index >= 0 ? index + 1 : null;
};

export default {
  getLeaderboard,
  getUserRank,
};
