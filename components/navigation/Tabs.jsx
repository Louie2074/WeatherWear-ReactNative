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
            <Ionicons name="newspaper-outline" color={'red'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Outfits"
        component={OutfitRecommendation}
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="newspaper-outline" color={'red'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="settings-outline" color={'red'} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
