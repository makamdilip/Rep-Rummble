import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { wearableService } from '../services/wearableService';
import { HealthData, WearablePermissions } from '../types';

export default function WearablesScreen() {
  const [permissions, setPermissions] = useState<WearablePermissions | null>(null);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    loadPermissions();
    loadHealthData();
  }, []);

  const loadPermissions = async () => {
    try {
      const perms = await wearableService.getPermissions();
      setPermissions(perms);
    } catch (error) {
      console.error('Error loading permissions:', error);
    }
  };

  const loadHealthData = async () => {
    try {
      const data = await wearableService.getTodayHealthData();
      setHealthData(data);
    } catch (error) {
      console.error('Error loading health data:', error);
    }
  };

  const requestPermissions = async () => {
    setLoading(true);
    try {
      const perms = await wearableService.requestPermissions();
      setPermissions(perms);
      Alert.alert('Permissions Updated', 'Health permissions have been updated.');
    } catch (error) {
      Alert.alert('Error', 'Failed to request permissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const syncData = async () => {
    setSyncing(true);
    try {
      const success = await wearableService.syncHealthData();
      if (success) {
        Alert.alert('Success', 'Health data synced successfully!');
        loadHealthData(); // Refresh data
      } else {
        Alert.alert('Error', 'Failed to sync data. Please check your connection.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sync health data.');
    } finally {
      setSyncing(false);
    }
  };

  const renderPermissionItem = (label: string, granted: boolean) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
      <Text style={{ fontSize: 16, color: '#333' }}>{label}</Text>
      <View style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: granted ? '#4CAF50' : '#ccc'
      }} />
    </View>
  );

  const renderHealthMetric = (label: string, value: string | number, unit: string = '') => (
    <View style={{
      backgroundColor: '#f8f9fa',
      padding: 16,
      borderRadius: 12,
      marginVertical: 4
    }}>
      <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>{label}</Text>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>
        {value}{unit}
      </Text>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#333' }}>
          Wearables
        </Text>
        <Text style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>
          Connect your health devices to track your fitness data automatically.
        </Text>

        {/* Permissions Section */}
        <View style={{
          backgroundColor: '#f8f9fa',
          padding: 20,
          borderRadius: 16,
          marginBottom: 24
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333' }}>
            Health Permissions
          </Text>

          {permissions ? (
            <View>
              {renderPermissionItem('Steps', permissions.steps)}
              {renderPermissionItem('Calories', permissions.calories)}
              {renderPermissionItem('Heart Rate', permissions.heartRate)}
              {renderPermissionItem('Sleep', permissions.sleep)}
              {renderPermissionItem('Weight', permissions.weight)}

              <TouchableOpacity
                style={{
                  backgroundColor: '#007AFF',
                  padding: 12,
                  borderRadius: 8,
                  marginTop: 16,
                  alignItems: 'center'
                }}
                onPress={requestPermissions}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                    Update Permissions
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <ActivityIndicator size="large" color="#007AFF" />
          )}
        </View>

        {/* Today's Health Data */}
        <View style={{
          backgroundColor: '#f8f9fa',
          padding: 20,
          borderRadius: 16,
          marginBottom: 24
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333' }}>
            Today's Health Data
          </Text>

          {healthData ? (
            <View>
              {renderHealthMetric('Steps', healthData.steps)}
              {renderHealthMetric('Calories Burned', healthData.calories)}
              {renderHealthMetric('Heart Rate', healthData.heartRate || 'N/A', ' bpm')}
              {renderHealthMetric('Sleep Hours', healthData.sleepHours.toFixed(1), 'h')}
              {healthData.weight && renderHealthMetric('Weight', healthData.weight.toFixed(1), ' kg')}
              {healthData.bodyFat && renderHealthMetric('Body Fat', healthData.bodyFat.toFixed(1), '%')}

              <TouchableOpacity
                style={{
                  backgroundColor: '#28a745',
                  padding: 12,
                  borderRadius: 8,
                  marginTop: 16,
                  alignItems: 'center'
                }}
                onPress={syncData}
                disabled={syncing}
              >
                {syncing ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                    Sync to Server
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={{ textAlign: 'center', color: '#666', padding: 20 }}>
              No health data available. Please grant permissions and try again.
            </Text>
          )}
        </View>

        {/* Device Connections (Future) */}
        <View style={{
          backgroundColor: '#f8f9fa',
          padding: 20,
          borderRadius: 16
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333' }}>
            Connected Devices
          </Text>
          <Text style={{ color: '#666', textAlign: 'center', padding: 20 }}>
            Third-party device integrations coming soon!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}