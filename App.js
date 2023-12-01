
import { StyleSheet, Text, View, Button, Image, ImageBackground } from 'react-native';
import StartPage from './pages/StartPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherPage from './pages/WeatherPage';
import WeatherDataContext from './context/WeatherDataContext';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import OutfitRecommendation from './pages/OutfitRecommendation';
import LocationDataContext from './context/LocationDataContext';

const Stack = createStackNavigator();

export default function App() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
  }, [location]);

  return (
    <LocationDataContext.Provider value={{location,setLocation}}>
    <WeatherDataContext.Provider value={weather}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Start" component={StartPage} />
          <Stack.Screen name="WeatherPage" component={WeatherPage} />
          <Stack.Screen name="OutfitRecommendation" component={OutfitRecommendation} />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherDataContext.Provider>
    </LocationDataContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
