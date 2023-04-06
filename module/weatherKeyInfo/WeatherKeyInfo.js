import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { DataContext } from '../../config/ThemeContext';

const WeatherKeyInfo = () => {
    const weatherForEachLocation = useContext(DataContext);
    const { id, city, list } = weatherForEachLocation;
    return (
        <View style={[styles.containerInfo]}>
            <Text style={styles.phenomena}>{list[0].weather[0].description}</Text>
            <View style={styles.temperature}>
                <Text style={styles.temperatureNumber}>{list[0].main.temp.toFixed()}</Text>
                <Text style={styles.temperatureCharacter}>&#8451;</Text>
            </View>
            <View style={styles.temperatureOscillation}>
                <Text style={styles.temperatureLine}>Nhiệt độ&reg;: {list[0].main.temp.toFixed()}&ordm;</Text>
                <AntDesign style={styles.temperatureMin} name="caretdown" size={12} color="#3399FF">
                    {' '}
                    {list[0].main.temp_min.toFixed()}&ordm;{' '}
                </AntDesign>
                <AntDesign style={styles.temperatureMax} name="caretup" size={12} color="orange">
                    {' '}
                    {list[0].main.temp_max.toFixed()}&ordm;{' '}
                </AntDesign>
            </View>

            <Text style={styles.rainForecast}>
                Không có mưa trong vòng 120 ph
                <AntDesign style={{ color: 'white' }} name="right" size={14} color="black" />
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    containerInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 300,
        marginTop: 52,
    },
    phenomena: {
        color: 'white',
        fontSize: 32,
        fontWeight: 600,
    },
    temperature: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    temperatureNumber: {
        fontSize: 140,
        fontWeight: 600,
        color: 'white',
    },
    temperatureCharacter: {
        fontSize: 46,
        color: 'white',
        fontWeight: 600,
    },

    temperatureOscillation: {
        display: 'flex',
        marginBottom: 30,
        flexDirection: 'row',
        fontSize: 16,
        fontWeight: 400,
    },

    temperatureLine: {
        color: 'white',
        marginRight: 20,
    },
    temperatureMin: {
        fontSize: 16,
    },
    temperatureMax: {
        marginLeft: 20,
        fontSize: 16,
    },
    rainForecast: {
        color: 'white',
        fontSize: 18,
        fontWeight: 400,
    },
});

export default React.memo(WeatherKeyInfo);
