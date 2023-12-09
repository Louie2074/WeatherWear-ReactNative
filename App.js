
import StartPage from './components/pages/StartPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherDataContext from './context/WeatherDataContext';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import LocationDataContext from './context/LocationDataContext';
import Tabs from './components/navigation/Tabs'
import ChangeLocation from './components/ChangeLocation';
import FirstLaunchContext from './context/FirstLaunchContext';


const Stack = createStackNavigator();

export default function App() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    (async () => {
      if (isFirstLaunch) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        try {
          let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Lowest,
          });
          setLocation([location.coords.latitude, location.coords.longitude]);
        } catch (error) {
          console.error('Error fetching location', error);
        }
      }
    })();
  }, [isFirstLaunch]);

  useEffect(() => {
    (async () => {
      if (location) {
        try {
          let response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=47eeeb8c91c44b9a8d4162810230411&q=${location[0]},${location[1]}&days=1`
          );
          if (!response.ok) {
            throw new Error('Weather data fetch failed');
          }
          let data = await response.json();
          setWeather(data);
        } catch (error) {
          console.error('Error fetching weather data: ', error);
        }
      }
    })();
  }, [location]); 



  return (
    <FirstLaunchContext.Provider value={{ isFirstLaunch, setIsFirstLaunch }}>
      <LocationDataContext.Provider value={{ location, setLocation }}>
        <WeatherDataContext.Provider value={weather}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ gestureEnabled: false, headerShown: false }}>
              {isFirstLaunch ? (
                <Stack.Screen name="Start" component={StartPage} />
              ) : (
                <Stack.Screen name="Main" component={Tabs} />
              )}
              <Stack.Screen name="ChangeLocation" component={ChangeLocation} />
            </Stack.Navigator>
          </NavigationContainer>
        </WeatherDataContext.Provider>
      </LocationDataContext.Provider>
    </FirstLaunchContext.Provider>
  );
}
