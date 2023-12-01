import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';


const defaultClothingItems = {
  footwear: [
    { name: 'Sneakers', temperature: { min: 30, max: Infinity } },
    { name: 'Sandals', temperature: { min: 60, max: Infinity } },
    { name: 'Boots', temperature: { min: -Infinity, max: 30 } },
  ],
  legs: [
    { name: 'Jeans', temperature: { min: 30, max: Infinity } },
    { name: 'Shorts', temperature: { min: 60, max: Infinity } },
    { name: 'Sweatpants', temperature: { min: 30, max: Infinity } },
  ],
  upperBody: [
    { name: 'T-shirt', temperature: { min: 60, max: Infinity } },
    { name: 'Sweatshirt', temperature: { min: 30, max: 60 } },
    { name: 'Tanktop', temperature: { min: 60, max: Infinity } },
    { name: 'Winter Jacket', temperature: { min: -Infinity, max: 30 } },
  ],
};

const OutfitRecommendation = () => {
  const [clothingItem, setClothingItem] = useState('');
  const [preferredTemperature, setPreferredTemperature] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('footwear');
  const [recommendedItems, setRecommendedItems] = useState({});

  const handleRecommendation = () => {
    const temperature = parseFloat(preferredTemperature);

    if (isNaN(temperature)) {
      Alert.alert('Error', 'Please enter a valid temperature.');
      return;
    }

    const categoryItems = defaultClothingItems[selectedCategory];
    const matchedItem = categoryItems.find(
      (item) => temperature >= item.temperature.min && temperature <= item.temperature.max
    );

    if (matchedItem) {
      setRecommendedItems({ ...recommendedItems, [selectedCategory]: matchedItem });
    } else {
      Alert.alert('No Recommendation', `No ${selectedCategory} found for the entered temperature.`);
      setRecommendedItems({});
    }
  };

  const handleNewOutfit = () => {
    setPreferredTemperature('');
    setClothingItem('');
    setRecommendedItems({});
  };

  return (
    <View style={styles.container}>
      <Text>Enter your preferred temperature (°F):</Text>
      <TextInput
        style={styles.input}
        placeholder="Preferred Temperature"
        keyboardType="numeric"
        value={preferredTemperature}
        onChangeText={(text) => setPreferredTemperature(text)}
      />
      <Picker
        selectedValue={selectedCategory}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="Footwear" value="footwear" />
        <Picker.Item label="Legs" value="legs" />
        <Picker.Item label="Upper Body" value="upperBody" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Clothing Item"
        value={clothingItem}
        onChangeText={(text) => setClothingItem(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRecommendation}>
        <Text style={styles.buttonText}>Get Recommendation</Text>
      </TouchableOpacity>

      {Object.keys(recommendedItems).length > 0 && (
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationText}>Outfit Recommendation:</Text>
          {Object.keys(recommendedItems).map((category) => (
            <Text key={category}>
              {category}: {recommendedItems[category].name}
            </Text>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleNewOutfit}>
            <Text style={styles.buttonText}>Request New Outfit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: 200,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  recommendationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  recommendationText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 150,
    borderWidth: 1,
    margin: 10,
  },
});

export default OutfitRecommendation;
