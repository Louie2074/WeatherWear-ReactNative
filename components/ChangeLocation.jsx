import React, { useContext } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { REACT_APP_PLACES_API_KEY } from '@env';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LocationDataContext from '../context/LocationDataContext';
import * as Location from 'expo-location';

const ChangeLocation = () => {
  const apiKey = REACT_APP_PLACES_API_KEY;
  const navigation = useNavigation();
  const { location, setLocation } = useContext(LocationDataContext);

  const handlePress = (data, details = null) => {
    setLocation([
      details.geometry.location['lat'],
      details.geometry.location['lng'],
    ]);
    navigation.navigate('Settings');
  };

  const useCurrent = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
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
      navigation.navigate('Settings');
    })();
  };
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails
        styles={{
          textInputContainer: styles.textInputContainer,
        }}
        onPress={handlePress}
        query={{
          key: apiKey,
          language: 'en',
        }}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={useCurrent}>
        <Text style={styles.buttonText}>Use My Current Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingTop: 70,
  },
  buttonContainer: {
    backgroundColor: '#4383f9',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    marginHorizontal: '10%',
    marginBottom:100
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ChangeLocation;
