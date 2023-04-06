import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const WeatherEveryDay = () => {
    return (
        <View style={styles.containerEveryDay}>
            <View style={styles.times}>
                <Text style={styles.timeText}>T2</Text>
                <Text style={styles.timeText}>20/3</Text>
            </View>
            <View style={styles.phenomena}>
                <Ionicons name="md-partly-sunny" size={44} color="yellow" />
                <Text style={styles.phenomenaText}>Mưa dông</Text>
            </View>
            <View style={styles.temperature}>
                <Text style={[styles.temperatureText, { color: '#3399ff' }]}>22&ordm;</Text>
                <Text style={[styles.temperatureText, { color: 'orange' }]}>28&ordm;</Text>
                <AntDesign name="right" size={14} color="white" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerEveryDay: {
        display: 'flex',
        flexDirection: 'row',
        height: 80,
    },
    times: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 16,
        color: 'white',
    },
    phenomena: {
        flex: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    phenomenaIcon: {},
    phenomenaText: {
        fontSize: 20,
        color: 'white',
        marginLeft: 15,
    },
    temperature: {
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    temperatureText: {
        fontSize: 16,
        fontWeight: 600,
    },
});

export default React.memo(WeatherEveryDay);
