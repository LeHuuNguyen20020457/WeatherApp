import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { WeatherPhenomenonOfTheDay } from '../../module/weatherPhenomenonOfTheDay';
import { SunAnimated } from '../sunAnimated';

const DetailsEveryDay = ({ item, city }) => {
    const sunrise = useRef('');
    const sunset = useRef('');

    useMemo(() => {
        const dateSunrise = new Date(city.sunrise * 1000);
        const hoursSunrise = dateSunrise.getHours();
        const minutesSunrise = dateSunrise.getMinutes();
        sunrise.current = hoursSunrise + ':' + minutesSunrise;

        const dateSunset = new Date(city.sunset * 1000);

        const hoursSunset = dateSunset.getHours();
        const minutesSunset = dateSunset.getMinutes();

        sunset.current = hoursSunset + ':' + minutesSunset;
    }, [city]);

    return (
        <View style={styles.containerWeatherPhenomenonOfTheDay}>
            <View style={styles.underlined}>
                <WeatherPhenomenonOfTheDay item={item}></WeatherPhenomenonOfTheDay>
            </View>
            <SunAnimated city={city} sunrise={sunrise.current} sunset={sunset.current}></SunAnimated>
        </View>
    );
};

const styles = StyleSheet.create({
    containerWeatherPhenomenonOfTheDay: {
        marginLeft: 10,
        width: 390,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20,
    },
    underlined: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        width: '90%',
    },
});

export default React.memo(DetailsEveryDay);
