import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';

const AddClothes = ({ onAddClothes, onFinish }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Tops'); 
    const [minTemperature, setMinTemperature] = useState('');
    const [maxTemperature, setMaxTemperature] = useState('');
    const [color, setColor] = useState('');

    const categories = ['Tops', 'Bottoms', 'Footwear'];

    const handleAdd = () => {
        const minTemp = Number(minTemperature);
        const maxTemp = Number(maxTemperature);

        if (!name.trim() || !minTemperature.trim() || !maxTemperature.trim() || !color.trim()) {
            alert('All fields must be filled out.');
            return;
        }
        if (minTemp >= maxTemp) {
            alert('Minimum temperature must be less than maximum temperature.');
            return;
        }

        onAddClothes({
            name,
            category,
            temperature: { min: minTemp, max: maxTemp },
            color
        });

        setName('');
        setCategory('Tops');
        setMinTemperature('');
        setMaxTemperature('');
        setColor('');
        onFinish();
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
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
            <View style={styles.temperatureInputContainer}>
                <TextInput
                    style={[styles.input, styles.temperatureInput]}
                    value={minTemperature}
                    onChangeText={setMinTemperature}
                    placeholder="Min Temp"
                    keyboardType="numeric"
                />
                <Text style={styles.hyphen}>-</Text>
                <TextInput
                    style={[styles.input, styles.temperatureInput]}
                    value={maxTemperature}
                    onChangeText={setMaxTemperature}
                    placeholder="Max Temp"
                    keyboardType="numeric"
                />
            </View>

            <Text style={styles.label}>Color:</Text>
            <TextInput
                style={styles.input}
                value={color}
                onChangeText={setColor}
                placeholder="Enter color"
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addButtonText}>Add to Wardrobe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={onFinish}>
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40, 
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
    temperatureInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    temperatureInput: {
        width: '40%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginRight: 5,
        textAlign: 'center',
    },
    hyphen: {
        marginHorizontal: 5,
    },
    backButton: {
        position: 'absolute',
        top: 10,             
        right: 1,            
        backgroundColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    backButtonText: {
        color: 'white',
    },
});

export default AddClothes;
