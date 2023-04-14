import React, { useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Sun } from '../../module/sun';
import { WeatherPhenomenonOfTheDay } from '../../module/weatherPhenomenonOfTheDay';

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
                    <Text style={{ color: 'white', fontSize: 16 }}>{sunrise.current}</Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>{sunset.current}</Text>
                </View>
            </View>
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

export default React.memo(DetailsEveryDay);
