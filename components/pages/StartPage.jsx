import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import FirstLaunchContext from '../../context/FirstLaunchContext';

export default function StartPage() {
  const { isFirstLaunch, setIsFirstLaunch } = useContext(FirstLaunchContext);

  const handleButtonPress = () => {
    setIsFirstLaunch(false);
  };

  return (
    <ImageBackground
      source={require('../../assets/weatherwearlogo.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.emptySpace}></View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleButtonPress}
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
