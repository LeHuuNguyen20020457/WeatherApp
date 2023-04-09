import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, AntDesign } from '@expo/vector-icons';

import { db } from '../../firebase/firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';
import { scrollHorizontalContext } from '../../config/ThemeContext';

const SearchResults = ({ weatherForEachLocation, index, isChangeWidth, showResultsSearch, setShowResultsSearch }) => {
    const [width, setWidth] = useState(390);

    const [currentTime, setCurrentTime] = useState('');

    const navigation = useNavigation();
    const { setIndex, reloadData, setReloadData } = useContext(scrollHorizontalContext);

    const scaleXRef = useRef(new Animated.Value(1)).current;
    const opacityRef = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        isChangeWidth
            ? Animated.parallel([
                  Animated.timing(opacityRef, {
                      toValue: 1,
                      delay: 900,
                      duration: 200,
                      useNativeDriver: true,
                  }).start(),
                  Animated.timing(scaleXRef, {
                      toValue: 0.8,
                      duration: 800,
                      useNativeDriver: true,
                  }).start(() => {
                      setWidth(390 * 0.8);
                  }),
              ])
            : Animated.parallel([
                  Animated.timing(opacityRef, {
                      toValue: 0,
                      duration: 500,
                      useNativeDriver: true,
                  }).start(),
                  Animated.timing(scaleXRef, {
                      toValue: 1,
                      duration: 800,
                      useNativeDriver: true,
                  }).start(() => {
                      setWidth(390);
                  }),
              ]);
    }, [isChangeWidth]);

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

    async function handleClose() {
        const docRefDelete = doc(db, 'weatherLocation', weatherForEachLocation.id);
        await deleteDoc(docRefDelete);
        setShowResultsSearch(!showResultsSearch);
        setReloadData(!reloadData);
    }

    return (
        <View style={styles.widthChange}>
            <TouchableOpacity style={styles.iconD}>
                <Animated.View style={{ opacity: opacityRef }}>
                    <Entypo name="home" size={24} color="black" />
                </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Thời tiết');
                    setIndex(index);
                }}
                style={{
                    width: width,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Animated.View style={[styles.containerSearchResults, { transform: [{ scaleX: scaleXRef }] }]}>
                    <View style={styles.locationAndTime}>
                        <Text style={styles.address}>{weatherForEachLocation.city.name}</Text>
                        <Text style={styles.time}>{currentTime}</Text>
                    </View>
                    <View style={styles.phenomena}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
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
                </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconD} onPress={handleClose}>
                <Animated.View style={{ opacity: opacityRef }}>
                    <AntDesign name="closecircleo" size={24} color="white" />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    widthChange: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    containerSearchResults: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: 390,
        height: 120,
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
    iconD: {
        width: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default React.memo(SearchResults);
