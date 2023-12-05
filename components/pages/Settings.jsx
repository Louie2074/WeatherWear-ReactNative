import React, { useContext } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import LocationDataContext from '../../context/LocationDataContext';

const Settings = () => {
  const location = useContext(LocationDataContext);
  const handleButton = ()=>{
    console.log(location);
  }
  return (
    <View style={styles.container}>
      <Button
        onPress={handleButton}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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
