import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sun } from '../sun';

const SunAnimated = ({ city, sunrise, sunset }) => {
    return (
        <View style={styles.containerDetailsWeather}>
            <Text style={styles.sunText}>Mặt trời</Text>
            <View style={[{ height: 100 }]}>
                <Sun
                    radius={100}
                    iconSize={20}
                    icon="https://www.transparentpng.com/thumb/sun/the-sms-holdings-way-sun-png-3.png"
                    sunrise={city.sunrise}
                    sunset={city.sunset}
                ></Sun>
            </View>
            <View style={styles.lineSun}></View>
            <View style={styles.timeSun}>
                <Text style={{ color: 'white', fontSize: 16 }}>{sunrise}</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{sunset}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerDetailsWeather: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    sunText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 10,
    },

    lineSun: {
        width: 220,
        height: 1,
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 1,
    },
    timeSun: {
        width: 220,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default SunAnimated;
