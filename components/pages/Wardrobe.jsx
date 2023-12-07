import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Wardrobe = ({ wardrobe }) => {
    return (
        <View style={styles.container}>
            {Object.keys(wardrobe).map((category) => (
                <View key={category} style={styles.categoryContainer}>
                    <Text style={styles.categoryTitle}>
                        {category}
                    </Text>
                    {wardrobe[category].length > 0 ? (
                        wardrobe[category].map((item, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemDetails}>
                                    Color: {item.color || 'N/A'}, Temp: {item.temperature.min}°F to {item.temperature.max}°F
                                </Text>
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
    },
});

export default Wardrobe;
