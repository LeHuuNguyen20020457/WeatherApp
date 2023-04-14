import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { IconInfor } from '../../components/iconInfor';

import { FontAwesome, Feather, Fontisto, Octicons, AntDesign } from '@expo/vector-icons';

const WeatherPhenomenonOfTheDay = ({ item }) => {
    const icons = React.useMemo(() => {
        const icons = [
            {
                icon: FontAwesome,
                name: 'thermometer',
                size: 24,
                data: {
                    title: 'Cảm thấy như(Tối đa)',
                    measure: item.main.feels_like.toFixed(0),
                    unit: '°',
                },
            },
            {
                icon: Feather,
                name: 'wind',
                size: 24,
                data: {
                    title: 'Gió',
                    measure: item.wind.speed,
                    unit: 'km/h',
                },
            },
            {
                icon: Fontisto,
                name: 'wind',
                size: 24,
                data: {
                    title: 'Cơn gió mạnh',
                    measure: item.wind.gust,
                    unit: 'km/h',
                },
            },
            {
                icon: Octicons,
                name: 'sun',
                size: 24,
                data: {
                    title: 'Chỉ số UV',
                    measure: '3 (Trung bình)',
                    unit: '',
                },
            },
            {
                icon: Feather,
                name: 'umbrella',
                size: 24,
                data: {
                    title: 'sự kết tủa',
                    measure: item.pop,
                    unit: '%',
                },
            },
            {
                icon: AntDesign,
                name: 'cloudo',
                size: 24,
                data: {
                    title: 'Mây che phủ',
                    measure: item.clouds.all,
                    unit: '%',
                },
            },
        ];
        return icons;
    }, []);
    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: 500, color: 'white', marginTop: 10 }}>Ngày</Text>
            <View style={{ display: 'flex', alignItems: 'center', marginTop: -30 }}>
                <Image
                    style={{ width: 80, height: 80 }}
                    source={{
                        uri: `https://openweathermap.org/img/wn/04d@2x.png`,
                    }}
                />
                <Text style={{ fontSize: 24, fontWeight: 600, color: 'white' }}>{item.main.temp.toFixed()} C</Text>
                <Text style={{ fontSize: 16, fontWeight: 400, color: 'white' }}>{item.weather[0].description}</Text>
            </View>

            <View style={{ marginVertical: 10 }}>
                {icons.map((icon, index) => (
                    <IconInfor key={index} icon={icon}></IconInfor>
                ))}
            </View>
        </View>
    );
};

export default React.memo(WeatherPhenomenonOfTheDay);
