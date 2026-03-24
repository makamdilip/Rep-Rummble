import * as Health from "expo-health";
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

class WearableService {
  private readonly STORAGE_KEY = "wearable_permissions";
  private readonly API_BASE_URL = "http://localhost:5001/api"; // Update for production

  async requestPermissions(): Promise<WearablePermissions> {
    try {
      const permissions = await Health.requestPermissionsAsync([
        {
          kind: Health.PermissionKind.Steps,
          access: Health.PermissionAccess.Read,
        },
        {
          kind: Health.PermissionKind.Calories,
          access: Health.PermissionAccess.Read,
        },
        {
          kind: Health.PermissionKind.HeartRate,
          access: Health.PermissionAccess.Read,
        },
        {
          kind: Health.PermissionKind.SleepAnalysis,
          access: Health.PermissionAccess.Read,
        },
        {
          kind: Health.PermissionKind.Weight,
          access: Health.PermissionAccess.Read,
        },
        {
          kind: Health.PermissionKind.BodyFatPercentage,
          access: Health.PermissionAccess.Read,
        },
      ]);

      const permissionStatus: WearablePermissions = {
        steps:
          permissions.find((p) => p.kind === Health.PermissionKind.Steps)
            ?.granted || false,
        calories:
          permissions.find((p) => p.kind === Health.PermissionKind.Calories)
            ?.granted || false,
        heartRate:
          permissions.find((p) => p.kind === Health.PermissionKind.HeartRate)
            ?.granted || false,
        sleep:
          permissions.find(
            (p) => p.kind === Health.PermissionKind.SleepAnalysis,
          )?.granted || false,
        weight:
          permissions.find((p) => p.kind === Health.PermissionKind.Weight)
            ?.granted || false,
      };

      await AsyncStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(permissionStatus),
      );
      return permissionStatus;
    } catch (error) {
      console.error("Error requesting health permissions:", error);
      return {
        steps: false,
        calories: false,
        heartRate: false,
        sleep: false,
        weight: false,
      };
    }
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
      const permissions = await this.getPermissions();
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
      );

      const healthData: HealthData = {
        steps: 0,
        calories: 0,
        heartRate: 0,
        sleepHours: 0,
      };

      // Get steps
      if (permissions.steps) {
        const steps = await Health.getStatisticTotalForToday(
          Health.Statistic.Steps,
        );
        healthData.steps = steps || 0;
      }

      // Get calories
      if (permissions.calories) {
        const calories = await Health.getStatisticTotalForToday(
          Health.Statistic.Calories,
        );
        healthData.calories = calories || 0;
      }

      // Get heart rate (most recent)
      if (permissions.heartRate) {
        const heartRateData = await Health.getHeartRateSamples({
          startDate: startOfDay,
          endDate: endOfDay,
          limit: 1,
        });
        if (heartRateData.length > 0) {
          healthData.heartRate = heartRateData[0].value;
        }
      }

      // Get sleep data
      if (permissions.sleep) {
        const sleepData = await Health.getSleepSamples({
          startDate: startOfDay,
          endDate: endOfDay,
        });
        const totalSleepMinutes = sleepData.reduce((total, sample) => {
          if (sample.stage === Health.SleepStage.Asleep) {
            return (
              total +
              (sample.endDate.getTime() - sample.startDate.getTime()) /
                (1000 * 60)
            );
          }
          return total;
        }, 0);
        healthData.sleepHours = totalSleepMinutes / 60;
      }

      // Get weight (most recent)
      if (permissions.weight) {
        const weightData = await Health.getWeightSamples({
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          endDate: endOfDay,
          limit: 1,
        });
        if (weightData.length > 0) {
          healthData.weight = weightData[0].value;
        }
      }

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
    // Implementation for historical data
    const history: HealthData[] = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // This would need more complex implementation to get historical data
      // For now, return empty array
    }

    return history;
  }
}

export const wearableService = new WearableService();
