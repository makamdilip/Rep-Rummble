import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export interface HealthData {
  steps: number;
  calories: number;
  heartRate: number;
  sleepHours: number;
  hrv?: number;
  restingHR?: number;
  weight?: number;
  bodyFat?: number;
}

export interface WearablePermissions {
  steps: boolean;
  calories: boolean;
  heartRate: boolean;
  sleep: boolean;
  weight: boolean;
}

/**
 * NOTE: expo-health (v0.0.0) is a non-functional placeholder package.
 * Health data is mocked here. To enable real HealthKit/Google Fit integration,
 * replace with a proper SDK (e.g. react-native-health or Health Connect).
 */
class WearableService {
  private readonly STORAGE_KEY = "wearable_permissions";
  private readonly API_BASE_URL = "http://localhost:5001/api";

  async requestPermissions(): Promise<WearablePermissions> {
    // On a real device with a real health SDK, request native permissions here.
    const permissionStatus: WearablePermissions = {
      steps: false,
      calories: false,
      heartRate: false,
      sleep: false,
      weight: false,
    };

    try {
      await AsyncStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(permissionStatus),
      );
    } catch (error) {
      console.error("Error saving permissions:", error);
    }

    return permissionStatus;
  }

  async getPermissions(): Promise<WearablePermissions> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : await this.requestPermissions();
    } catch (error) {
      console.error("Error getting permissions:", error);
      return {
        steps: false,
        calories: false,
        heartRate: false,
        sleep: false,
        weight: false,
      };
    }
  }

  async getTodayHealthData(): Promise<HealthData | null> {
    try {
      // Mock data — replace with real SDK calls when available
      const healthData: HealthData = {
        steps: 0,
        calories: 0,
        heartRate: 0,
        sleepHours: 0,
      };

      return healthData;
    } catch (error) {
      console.error("Error getting health data:", error);
      return null;
    }
  }

  async syncHealthData(): Promise<boolean> {
    try {
      const healthData = await this.getTodayHealthData();
      if (!healthData) return false;

      const token = await AsyncStorage.getItem("rep_rumble_token");
      if (!token) return false;

      await axios.post(`${this.API_BASE_URL}/wearables/sync`, healthData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return true;
    } catch (error) {
      console.error("Error syncing health data:", error);
      return false;
    }
  }

  async getHealthHistory(days: number = 7): Promise<HealthData[]> {
    // Returns empty history — replace with real SDK calls when available
    return [];
  }
}

export const wearableService = new WearableService();
