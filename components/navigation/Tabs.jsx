import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WeatherPage from '../pages/WeatherPage';
import Settings from '../pages/Settings';
import OutfitRecommendation from '../pages/OutfitRecommendation';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator sceneContainerStyle={{ marginTop: 10 }}>
      <Tab.Screen
        name="Weather"
        component={WeatherPage}
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="rainy-outline" color={'#4383f9'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Outfits"
        component={OutfitRecommendation}
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="shirt-outline" color={'#4383f9'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="settings-outline" color={'#4383f9'} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
