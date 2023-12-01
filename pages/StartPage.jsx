import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';

export default function StartPage() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weather, setWeather] = useState(null);

  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        let response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=47eeeb8c91c44b9a8d4162810230411&q=${location.coords.latitude},${location.coords.longitude}&days=1`
        );
        if (!response.ok) {
          throw new Error('Weather data fetch failed');
        }
        let data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching location or weather data: ', error);
      }
    })();
  }, []);

  const handleButtonPress = () => {
    console.log(location);
    navigation.navigate('WeatherPage');
  };

  return (
    <ImageBackground
      source={require('../assets/weatherwearlogo.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.emptySpace}></View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleButtonPress}
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginTop: 250,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
