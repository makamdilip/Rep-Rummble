import React from 'react';

// Mobile Snap page removed — web app does not include camera-based image recognition.

export default function SnapMealScreen() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Mobile Snap Meal removed</h2>
      <p>Camera snapshot and AI recognition are not included in the website. Use manual logging instead.</p>
    </div>
  );
}
  // Mock AI food recognition (replace with real API call)
  const recognizeFood = async (imageUri: string) => {
    setLoading(true);
    try {
      // TODO: Integrate real AI food recognition API
      // For now, using mock data
      const foodOptions = [
        { name: 'Biryani', calories: 450, protein: 15, carbs: 60, fat: 15 },
        { name: 'Dosa', calories: 300, protein: 10, carbs: 45, fat: 8 },
        { name: 'Paneer Butter Masala', calories: 350, protein: 20, carbs: 25, fat: 18 },
        { name: 'Aloo Paratha', calories: 280, protein: 8, carbs: 35, fat: 12 },
      ];

      // Random selection for demo
      const detected = foodOptions[Math.floor(Math.random() * foodOptions.length)];
      
      setRecognizedFood(detected.name);
      setCalories(detected.calories);
      setMacros({
        protein: detected.protein,
        carbs: detected.carbs,
        fat: detected.fat,
      });

      Alert.alert('✅ Food Detected', `Found: ${detected.name}`);
    } catch (error) {
      Alert.alert('❌ Error', 'Failed to recognize food. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCapture = () => {
    // TODO: Integrate camera or image picker library
    // For now, using mock
    setImageUri('https://via.placeholder.com/200');
    recognizeFood('mock-uri');
  };

  const saveMeal = async () => {
    if (!currentUser || !recognizedFood) {
      Alert.alert('⚠️ Missing Info', 'Please capture and recognize a meal first.');
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, 'meals'), {
        userId: currentUser.uid,
        recognizedFood,
        calories,
        macros,
        imageUrl: imageUri,
        timestamp: new Date(),
      });

      Alert.alert('✅ Saved', `${recognizedFood} logged successfully!`);
      // Reset form
      setImageUri(null);
      setRecognizedFood(null);
      setCalories(null);
      setMacros({ protein: 0, carbs: 0, fat: 0 });
    } catch (error) {
      Alert.alert('❌ Error', 'Failed to save meal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📸 Snap & Log</Text>
      <Text style={styles.subtitle}>Take a photo of your meal</Text>

      {/* Camera Preview */}
      <View style={styles.cameraPreview}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.placeholderText}>Tap to capture</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.captureButton]}
          onPress={handleCapture}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0a0a0a" size="small" />
          ) : (
            <Text style={styles.buttonText}>📸 Capture Meal</Text>
          )}
        </TouchableOpacity>

        {imageUri && !recognizedFood && (
          <TouchableOpacity
            style={[styles.button, styles.recognizeButton]}
            onPress={() => recognizeFood(imageUri)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#0a0a0a" size="small" />
            ) : (
              <Text style={styles.buttonText}>🔍 Recognize</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Recognition Results */}
      {recognizedFood && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>✅ Recognized Food</Text>
          <Text style={styles.foodName}>{recognizedFood}</Text>

          <View style={styles.caloriesBox}>
            <Text style={styles.caloriesLabel}>Calories</Text>
            <Text style={styles.caloriesValue}>{calories} kcal</Text>
          </View>

          <View style={styles.macrosGrid}>
            <View style={styles.macroBox}>
              <Text style={styles.macroLabel}>Protein</Text>
              <Text style={styles.macroValue}>{macros.protein}g</Text>
            </View>
            <View style={styles.macroBox}>
              <Text style={styles.macroLabel}>Carbs</Text>
              <Text style={styles.macroValue}>{macros.carbs}g</Text>
            </View>
            <View style={styles.macroBox}>
              <Text style={styles.macroLabel}>Fat</Text>
              <Text style={styles.macroValue}>{macros.fat}g</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={saveMeal}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#0a0a0a" size="small" />
            ) : (
              <Text style={styles.buttonText}>💾 Save Meal</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Smart Suggestions (Future) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💡 Smart Suggestions</Text>
        <Text style={styles.suggestionText}>
          Try a lighter version of this meal for fewer calories.
        </Text>
        <View style={styles.suggestionCard}>
          <Text style={styles.suggestionName}>Grilled {recognizedFood || 'meal'}</Text>
          <Text style={styles.suggestionCalories}>~300 kcal</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  cameraPreview: {
    width: '100%',
    height: 300,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#00FF00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  placeholderText: {
    color: '#666',
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#00FF00',
  },
  recognizeButton: {
    backgroundColor: '#FF6B00',
  },
  saveButton: {
    backgroundColor: '#00FF00',
    marginTop: 12,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#0a0a0a',
  },
  resultCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00FF00',
  },
  resultTitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  foodName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  caloriesBox: {
    backgroundColor: '#0a0a0a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  caloriesLabel: {
    fontSize: 12,
    color: '#999',
  },
  caloriesValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  macroBox: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  macroLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  suggestionCard: {
    backgroundColor: '#0a0a0a',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  suggestionName: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  suggestionCalories: {
    fontSize: 14,
    color: '#00FF00',
    fontWeight: '600',
  },
});

export default SnapMealScreen;
