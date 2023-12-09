import { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import WeatherAPITools from '../../utils/weatherTools';
import WeatherDataContext from '../../context/WeatherDataContext';
import Images from '../../utils/imgIndex';

export default function WeatherPage() {
  const weatherData = useContext(WeatherDataContext);
  const weatherTools = new WeatherAPITools(weatherData);

  if (!weatherData) {
    return <Text style={styles.centerAlignText}>Loading weather data...</Text>;
  }

  const locationDetails = weatherTools.getLocationDetails();
  const currentWeather = weatherTools.getCurrentWeather();
  const lowAndHigh = weatherTools.getMinMaxTemp();
  const hourlyForecast = weatherTools.getHourlyForecast();
  const sep = currentWeather[2].split('/');
  const iconImgPath = sep[5].substring(0, 1) + sep[6].substring(0, 3);

  const convertEpochTime = (epochTime) => {
    const time = new Date(Number(epochTime * 1000));
    return time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: 'true',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 28 }}>
        {locationDetails[0]}, {locationDetails[1]}
      </Text>
      <Text style={{ fontSize: 36, marginTop: 5 }}>{currentWeather[0]}°F</Text>
      <Image source={Images[iconImgPath]} style={{ height: 128, width: 128 }} />
      <Text style={{ fontSize: 18, marginVertical: 2 }}>
        {currentWeather[1]}
      </Text>
      <View style={styles.rowContainer}>
        <Text style={{ marginHorizontal: 5 }}>Low: {lowAndHigh[0]}°F</Text>
        <Text style={{ marginHorizontal: 5 }}>High: {lowAndHigh[1]}°F</Text>
      </View>
      <Text style={{ fontSize: 22, marginTop: 35 }}>Hourly Forecast:</Text>
      <View style={styles.hourlyForecastContainer}>
        {hourlyForecast.map((hour, index) => {
          return (
            <Text key={index} style={{ marginVertical: 2 }}>
              {convertEpochTime(hour.hourEpoch)}: {hour.temp}°F
            </Text>
          );
        })}
      </View>
    </View>
  );
}

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
    justifyContent: 'center',
    alignContent: 'center',
  },
});
