import { Button, StyleSheet, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Change Location"
        onPress={() => navigation.navigate('ChangeLocation')}
      />
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
});

export default Settings;
