import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Wardrobe = ({ wardrobe, setWardrobe }) => {
    const [editMode, setEditMode] = useState(false);

    const handleRemoveItem = (category, index) => {
        setWardrobe(prev => {
            const newItems = [...prev[category]];
            newItems.splice(index, 1);
            return { ...prev, [category]: newItems };
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setEditMode(!editMode)} style={styles.editButton}>
                <Text>{editMode ? 'Done' : 'Edit'}</Text>
            </TouchableOpacity>

            {Object.keys(wardrobe).map((category) => (
                <View key={category} style={styles.categoryContainer}>
                    <Text style={styles.categoryTitle}>{category}</Text>
                    {wardrobe[category].length > 0 ? (
                        wardrobe[category].map((item, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemDetails}>
                                    Color: {item.color || 'N/A'}, Temp: {item.temperature.min}°F to {item.temperature.max}°F
                                </Text>
                                {editMode && (
                                    <TouchableOpacity
                                        onPress={() => handleRemoveItem(category, index)}
                                        style={styles.removeButton}
                                    >
                                        <Text>Remove</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noItems}>No items in this category</Text>
                    )}
                </View>
            ))}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#eaeaea',
        borderRadius: 5,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDetails: {
        fontSize: 16,
    },
    noItems: {
        fontSize: 16,
        fontStyle: 'italic',
    },    editButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    removeButton: {
        backgroundColor: 'pink',
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
    },
});

export default Wardrobe;
