/**
 * expo-health mock module
 * expo-health (v0.0.0) is not a real package and has no native implementation.
 * This mock returns safe defaults so the app bundles and runs on the Simulator.
 * On a real device with HealthKit/Google Fit, replace this with the real SDK.
 */

export enum PermissionKind {
  Steps = 'Steps',
  Calories = 'Calories',
  HeartRate = 'HeartRate',
  SleepAnalysis = 'SleepAnalysis',
  Weight = 'Weight',
  BodyFatPercentage = 'BodyFatPercentage',
}

export enum PermissionAccess {
  Read = 'Read',
  Write = 'Write',
}

export enum Statistic {
  Steps = 'Steps',
  Calories = 'Calories',
}

export enum SleepStage {
  Asleep = 'Asleep',
  Awake = 'Awake',
}

export async function requestPermissionsAsync(permissions: any[]): Promise<any[]> {
  console.log('[expo-health mock] requestPermissionsAsync called — returning denied');
  return permissions.map((p) => ({ ...p, granted: false }));
}

export async function getStatisticTotalForToday(_statistic: Statistic): Promise<number> {
  console.log('[expo-health mock] getStatisticTotalForToday — returning 0');
  return 0;
}

export async function getHeartRateSamples(_options: any): Promise<any[]> {
  console.log('[expo-health mock] getHeartRateSamples — returning []');
  return [];
}

export async function getSleepSamples(_options: any): Promise<any[]> {
  console.log('[expo-health mock] getSleepSamples — returning []');
  return [];
}

export async function getWeightSamples(_options: any): Promise<any[]> {
  console.log('[expo-health mock] getWeightSamples — returning []');
  return [];
}
