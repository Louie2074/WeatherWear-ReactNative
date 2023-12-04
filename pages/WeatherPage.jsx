import { useContext, useEffect } from 'react';
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
    return <Text style={styles.centerAlignText}>Loading weather data...</Text>; 
  }
  
  const locationDetails = weatherTools.getLocationDetails();
  const currentWeather = weatherTools.getCurrentWeather();
  const lowAndHigh = weatherTools.getMinMaxTemp();
  const hourlyForecast = weatherTools.getHourlyForecast();

  useEffect(() => console.log(hourlyForecast), [])

  const convertEpochTime = (epochTime) => {
    const time = new Date(Number(epochTime * 1000))
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: 'true'})
  }

  return (
    <View style={styles.container}>
      <Text>{locationDetails[0]}, {locationDetails[1]}</Text>
      <Text>{currentWeather[0]}°F</Text>
      <Text>{currentWeather[1]}</Text>
      <View style={styles.rowContainer}>
        <Text style={{marginHorizontal: 5}}>Low: {lowAndHigh[0]}</Text>
        <Text style={{marginHorizontal: 5}}>High: {lowAndHigh[1]}</Text>
      </View>
      <View style={styles.hourlyForecastContainer}>
        <Text>Hourly Forecast:</Text>
        {hourlyForecast.map((hour) => {
          return (
            <Text>{convertEpochTime(hour.hourEpoch)}: {hour.temp}°F</Text>
          )
        })}
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleButtonPress} 
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
    marginTop: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  centerAlignText: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  hourlyForecastContainer: {
    marginTop: 50,
  },
});