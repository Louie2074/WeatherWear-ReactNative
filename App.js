import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Image, ImageBackground } from 'react-native';
import StartPage from './pages/StartPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherPage from './pages/WeatherPage';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Start" component={StartPage} />
        <Stack.Screen name="WeatherPage" component={WeatherPage} />
      </Stack.Navigator>
    </NavigationContainer>
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
