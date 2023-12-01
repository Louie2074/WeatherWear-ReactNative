import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LocationDataContext from '../context/LocationDataContext';

const Settings = () => {
  const [location, setLocation] = useContext(LocationDataContext);
  
  return (
    <View style={styles.container}>
      <Text>Your Component Content Goes Here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Settings;
