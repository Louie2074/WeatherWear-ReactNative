import { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WeatherAPITools from '../weatherTools';
import WeatherDataContext from '../context/WeatherDataContext';
import { useNavigation } from '@react-navigation/native';
export default function WeatherPage() {
  const weatherData = useContext(WeatherDataContext);
  const weatherTools = new WeatherAPITools(weatherData);
  
  const navigation = useNavigation();
  const handleButtonPress = () => {
     navigation.navigate('OutfitRecommendation');
  };

  if (!weatherData) {
    return <Text>Loading weather data...</Text>; 
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleButtonPress} // Updated to handle navigation
      >
        <Text style={styles.buttonText}>Enter</Text>
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