// HomeStackNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import StartPage from '../pages/StartPage';
import WeatherPage from '../pages/WeatherPage';
import OutfitRecommendation from '../pages/OutfitRecommendation';

const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Start" component={StartPage} />
      <Stack.Screen name="WeatherPage" component={WeatherPage} />
      <Stack.Screen
        name="OutfitRecommendation"
        component={OutfitRecommendation}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
