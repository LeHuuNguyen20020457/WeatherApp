import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Humidity = ({ humidity }) => {
    return (
        <View style={styles.humidityAndWater}>
            <Ionicons style={styles.water} name="md-water-sharp" size={24} color="#3399ff" />
            <Text style={styles.humidity}>{humidity}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    humidityAndWater: {
        width: 100,
        height: 100,
        display: 'flex',
    },

    water: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    humidity: {
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
        fontSize: 16,
    },
});

export default React.memo(Humidity);
