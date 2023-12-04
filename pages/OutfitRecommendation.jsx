import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import WeatherDataContext from '../context/WeatherDataContext';
import WeatherAPITools from '../weatherTools';

const defaultClothingItems = {
  Tops: [
    { name: 'T-shirt', temperature: { min: 60, max: Infinity } },
    { name: 'Sweatshirt', temperature: { min: 35, max: 60 } },
    { name: 'Tanktop', temperature: { min: 60, max: Infinity } },
    { name: 'Puffer Jacket', temperature: { min: -Infinity, max: 35 } },
    { name: 'Parka', temperature: { min: -Infinity, max: 35 } },
  ],
  Bottoms: [
    { name: 'Jeans', temperature: { min: -Infinity, max: Infinity } },
    { name: 'Shorts', temperature: { min: 60, max: Infinity } },
    { name: 'Sweatpants', temperature: { min: 30, max: Infinity } },
    { name: 'Cargo Pants', temperature: { min: 30, max: Infinity } },
  ],
  Footwear: [
    { name: 'Sneakers', temperature: { min: 30, max: Infinity } },
    { name: 'Sandals', temperature: { min: 60, max: Infinity } },
    { name: 'Winter Boots', temperature: { min: -Infinity, max: 35 } },
    { name: 'Timbs', temperature: { min: 30, max: Infinity } },
  ],
};

const OutfitRecommendation = () => {
  const [recommendedItems, setRecommendedItems] = useState({});
  const [currentTemperature, setCurrentTemperature] = useState('');
  const [cityAndState, setCityAndState] = useState('');
  const weatherData = useContext(WeatherDataContext);

  const fetchWeatherDetailsAndRecommendOutfit = async () => {
    try {
      const tools = new WeatherAPITools(weatherData);
      const [temp] = tools.getCurrentWeather();
      setCurrentTemperature(temp);
      recommendOutfitBasedOnTemperature(parseFloat(temp));

      const [city, state] = tools.getLocationDetails();
      setCityAndState(`${city}, ${state}`);
    } catch (error) {
      Alert.alert('Error', `Failed to fetch weather data: ${error.message || error}`);
    }
  };

  useEffect(() => {
    fetchWeatherDetailsAndRecommendOutfit();
  }, [weatherData]);

  const recommendOutfitBasedOnTemperature = (temperature) => {
    let newRecommendedItems = {};

    Object.keys(defaultClothingItems).forEach(category => {
      const shuffledItems = [...defaultClothingItems[category]].sort(() => 0.5 - Math.random());
      const matchedItem = shuffledItems.find(
        (item) => temperature >= item.temperature.min && temperature <= item.temperature.max
      );

      if (matchedItem) {
        newRecommendedItems[category] = matchedItem;
      }
    });

    setRecommendedItems(newRecommendedItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>
        Location: {cityAndState}
      </Text>
      <Text style={styles.temperatureText}>
        Current Temperature: {currentTemperature}°F
      </Text>
      {Object.keys(recommendedItems).length > 0 && (
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationText}>Outfit Recommendation:</Text>
          {Object.keys(recommendedItems).map((category) => (
            <Text key={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}: {recommendedItems[category].name}
            </Text>
          ))}
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={fetchWeatherDetailsAndRecommendOutfit}>
        <Text style={styles.buttonText}>Generate New Outfit</Text>
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
    fontSize: 20,
    marginBottom: 10,
  },
  temperatureText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
});

export default OutfitRecommendation;
