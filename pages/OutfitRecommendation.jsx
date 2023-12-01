import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const defaultClothingItems = [
  { name: 'Sneakers', temperature: { min: 30, max: Infinity } },
  { name: 'Sandals', temperature: { min: 60, max: Infinity } },
  { name: 'Boots', temperature: { min: -Infinity, max: 30 } },
  { name: 'Jeans', temperature: { min: 30, max: Infinity } },
  { name: 'Shorts', temperature: { min: 60, max: Infinity } },
  { name: 'Sweatpants', temperature: { min: 30, max: Infinity } },
  { name: 'T-shirt', temperature: { min: 60, max: Infinity } },
  { name: 'Sweatshirt', temperature: { min: 30, max: 60 } },
  { name: 'Tanktop', temperature: { min: 60, max: Infinity } },
  { name: 'Winter Jacket', temperature: { min: -Infinity, max: 30 } },
];

const OutfitRecommendation = () => {
  const [clothingItem, setClothingItem] = useState('');
  const [preferredTemperature, setPreferredTemperature] = useState('');

  const handleRecommendation = () => {
    const temperature = parseFloat(preferredTemperature);

    if (isNaN(temperature)) {
      Alert.alert('Error', 'Please enter a valid temperature.');
      return;
    }

    const matchedItem = defaultClothingItems.find(
      (item) =>
        item.name.toLowerCase() === clothingItem.toLowerCase() &&
        temperature >= item.temperature.min &&
        temperature <= item.temperature.max
    );

    if (matchedItem) {
      Alert.alert(
        'Recommendation',
        `For ${matchedItem.name} at ${temperature}°F, we suggest wearing it when temperatures are between ${matchedItem.temperature.min}°F and ${matchedItem.temperature.max}°F.`,
        [
          {
            text: 'OK',
            onPress: () => console.log('Recommendation shown'),
          },
        ]
      );
    } else {
      Alert.alert('No Recommendation', 'No recommendation found for the entered clothing item and temperature.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter your clothing and preferred temperature (F):</Text>
      <TextInput
        style={styles.input}
        placeholder="Clothing Item"
        value={clothingItem}
        onChangeText={(text) => setClothingItem(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Preferred Temperature (°F)"
        keyboardType="numeric"
        value={preferredTemperature}
        onChangeText={(text) => setPreferredTemperature(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleRecommendation}>
        <Text style={styles.buttonText}>Get Recommendation</Text>
      </TouchableOpacity>
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
});

export default OutfitRecommendation;
