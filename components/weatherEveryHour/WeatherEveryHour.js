import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WeatherEveryHour = ({ hours, icon }) => {
    return (
        <View style={styles.HourAndCloud}>
            <Text style={styles.hour}>{hours}</Text>
            <Image
                style={styles.cloud}
                source={{
                    uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    HourAndCloud: {
        width: 100,
        height: 100,
        display: 'flex',
    },

    hour: {
        textAlign: 'center',
        color: 'white',
        marginTop: 20,
        fontSize: 16,
    },
    cloud: {
        marginTop: 20,
        width: 50,
        height: 50,
        marginLeft: 24,
    },
});

export default React.memo(WeatherEveryHour);
