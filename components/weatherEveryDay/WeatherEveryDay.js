import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const WeatherEveryDay = ({ item }) => {
    const day = useRef('');
    const date = useRef('');
    useMemo(() => {
        const time = new Date(item.dt_txt);
        if (time.getDay() === 0) {
            day.current = 'CN';
        } else {
            const thu = time.getDay() + 1;
            day.current = 'T.' + thu;
        }
        let month = time.getMonth() + 1;
        date.current = time.getDate() + '/' + month;
    }, [item]);
    return (
        <TouchableOpacity>
            <View style={styles.containerEveryDay}>
                <View style={styles.times}>
                    <Text style={styles.timeText}>{day.current}</Text>
                    <Text style={styles.timeText}>{date.current}</Text>
                </View>
                <View style={styles.phenomena}>
                    <Image
                        style={styles.phenomenaIcon}
                        source={{
                            uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                        }}
                    ></Image>
                    <Text style={styles.phenomenaText}>{item.weather[0].description}</Text>
                </View>
                <View style={styles.temperature}>
                    <Text style={[styles.temperatureText, { color: '#3399ff' }]}>
                        {item.main.temp_min.toFixed(0)}&ordm;
                    </Text>
                    <Text style={[styles.temperatureText, { color: 'orange' }]}>
                        {item.main.temp_max.toFixed(0)}&ordm;
                    </Text>
                    <AntDesign name="right" size={14} color="white" />
                </View>
            </View>
        </TouchableOpacity>
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
    phenomenaIcon: {
        width: 50,
        height: 50,
        flex: 1,
    },
    phenomenaText: {
        fontSize: 20,
        color: 'white',
        marginLeft: 15,
        flex: 3,
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
