import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('ChangeLocation')}
      >
        <Text style={styles.buttonText}>Change Location</Text>
      </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: '#4383f9',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginTop: 25,
    width: '80%',
    alignSelf: 'center',
    marginHorizontal: '10%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Settings;
