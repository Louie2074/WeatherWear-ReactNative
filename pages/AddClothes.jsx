import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddClothes = ({ onAddClothes, onFinish }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Top'); // Default category
  const [temperature, setTemperature] = useState('');

  const categories = ['Top', 'Bottom', 'Footwear'];

  const handleAdd = () => {
    onAddClothes({ name, category, temperature: parseTemperature(temperature) });
    setName('');
    setCategory('Top');
    setTemperature('');
    onFinish();
  };

  const parseTemperature = (tempRange) => {
    const [min, max] = tempRange.split('-').map(Number);
    return { min, max };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter clothing name"
      />

      <Text style={styles.label}>Category:</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, category === cat && styles.categoryButtonSelected]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.categoryButtonText, category === cat && styles.categoryButtonTextSelected]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Temperature Range:</Text>
      <TextInput
        style={styles.input}
        value={temperature}
        onChangeText={setTemperature}
        placeholder="Enter temperature range (e.g., 60-75)"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add to Wardrobe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
  },
  categoryButtonSelected: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  categoryButtonText: {
    color: 'black',
  },
  categoryButtonTextSelected: {
    color: 'white',
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
  },
});

export default AddClothes;
