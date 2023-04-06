import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { scrollHorizontalContext } from '../../config/ThemeContext';

const SearchResults = ({ weatherForEachLocation, index }) => {
    const [currentTime, setCurrentTime] = useState('');
    const navigation = useNavigation();
    const [scrollHorizontal, setScrollHorizontal, setIndex] = useContext(scrollHorizontalContext);

    useEffect(() => {
        const handleTime = () => {
            const time = new Date();
            const day = time.getDate();
            const month = time.getMonth();
            const minutes = time.getMinutes();
            const hours = time.getHours();

            setCurrentTime(`${month}/${day}   ${hours}/${minutes}`);
        };
        handleTime();
        const timerInterval = setInterval(() => {
            handleTime();
        }, 10000);

        return () => clearInterval(timerInterval);
    }, []);
    return (
        <TouchableOpacity
            onPress={() => {
                setIndex(index);
                navigation.navigate('Thời tiết');
            }}
        >
            <View style={styles.containerSearchResults}>
                <View style={styles.locationAndTime}>
                    <Text style={styles.address}>{weatherForEachLocation.city.name}</Text>
                    <Text style={styles.time}>{currentTime}</Text>
                </View>
                <View style={styles.phenomena}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        {/* <AntDesign style={{ marginRight: 10 }} name="cloud" size={32} color="white" /> */}
                        <Image
                            style={{ marginRight: 10, width: 60, height: 60 }}
                            source={{
                                uri: `https://openweathermap.org/img/wn/${weatherForEachLocation.list[0].weather[0].icon}@2x.png`,
                            }}
                        ></Image>
                        <Text style={{ fontSize: 24, fontWeight: 600, color: 'white', paddingTop: 12 }}>
                            {weatherForEachLocation.list[0].main.temp.toFixed()}&ordm;C
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.time}>{weatherForEachLocation.list[0].weather[0].description}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerSearchResults: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: 390,
        height: 120,
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        marginTop: 10,
        padding: 5,
        paddingVertical: 16,
    },
    locationAndTime: {
        display: 'flex',
        justifyContent: 'space-around',
        marginLeft: 16,
    },
    address: {
        color: 'white',
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: 2,
    },
    time: {
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
    },
    phenomena: {
        display: 'flex',
        justifyContent: 'space-around',
        marginRight: 10,
    },
});
export default React.memo(SearchResults);
