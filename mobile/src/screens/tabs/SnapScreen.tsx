import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SnapScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI Food Scanner</Text>
          <Text style={styles.subtitle}>
            Take a photo of your meal and let AI analyze the nutrition
          </Text>
        </View>

        {/* Main Action */}
        <View style={styles.mainAction}>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => navigation.navigate('FoodScanner')}
            activeOpacity={0.8}
          >
            <View style={styles.scanButtonInner}>
              <Ionicons name="camera" size={48} color="#fff" />
              <Text style={styles.scanButtonText}>Scan Your Meal</Text>
              <Text style={styles.scanButtonHint}>
                Point your camera at any food
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.secondaryAction}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => navigation.navigate('FoodSearch')}
          >
            <Ionicons name="search" size={22} color="#0a0f14" />
            <View style={styles.searchText}>
              <Text style={styles.searchTitle}>Search Food Database</Text>
              <Text style={styles.searchSubtitle}>
                Log meals by quantity with USDA nutrition
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="sparkles" size={24} color="#8b5cf6" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>AI-Powered</Text>
              <Text style={styles.featureDesc}>
                GPT-4 Vision recognizes food instantly
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="nutrition" size={24} color="#22c55e" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Detailed Nutrition</Text>
              <Text style={styles.featureDesc}>
                Calories, macros & micronutrients
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="restaurant" size={24} color="#f97316" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Regional Foods</Text>
              <Text style={styles.featureDesc}>
                Recognizes Indian & local cuisines
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="bulb" size={24} color="#eab308" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Smart Suggestions</Text>
              <Text style={styles.featureDesc}>
                Get healthier alternatives & tips
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
  mainAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  secondaryAction: {
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22c55e',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  searchText: {
    flex: 1,
  },
  searchTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a0f14',
  },
  searchSubtitle: {
    fontSize: 12,
    color: '#0a0f14',
    marginTop: 4,
  },
  scanButton: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#22c55e',
    padding: 8,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  scanButtonInner: {
    flex: 1,
    backgroundColor: '#16a34a',
    borderRadius: 102,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#22c55e',
    borderStyle: 'dashed',
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  scanButtonHint: {
    fontSize: 12,
    color: '#bbf7d0',
    marginTop: 4,
  },
  features: {
    paddingBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#3d3d3d',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  featureDesc: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
});
