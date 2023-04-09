import 'react-native-gesture-handler';

import React, { useEffect, useState, useRef, useLayoutEffect, Suspense, lazy, startTransition } from 'react';
import { View, Text, ImageBackground, StyleSheet, StatusBar, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import { DataContext, scrollHorizontalContext } from './config/ThemeContext';
import { db } from './firebase/firebase-config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

import { DrawerNavigator } from './navigator/drawer/';
import ThemeProvider from './config/ThemeProvider';
import SplashScreen from './screen/SplashScreen';

export default function App() {
    const [dataWeather, setDataWeather] = useState('');
    const [scrollHorizontal, setScrollHorizontal] = useState(true);
    const [index, setIndex] = useState(0);
    const [reloadData, setReloadData] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const numberUpdate = useRef(0);

    const scrollViewRef = useRef();

    useEffect(() => {
        scrollViewRef.current?.scrollTo({ x: Dimensions.get('window').width * index, animated: false });
    }, [index]);

    useEffect(() => {
        async function getData() {
            await getDocs(collection(db, 'weatherLocation')).then((snapshot) => {
                let data = [];
                snapshot.docs.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setDataWeather(data);
            });
        }
        getData();
    }, [reloadData]);

    useEffect(() => {
        //update lại dữ liệu khi refreshing hoặc mới vào app
        async function updateWeather() {
            let citys = [];
            await getDocs(collection(db, 'weatherLocation')).then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    citys.push({
                        id: doc.id,
                        name: doc.data().city.name,
                    });
                });
            });

            citys.map((city, index) => {
                axios
                    .get(
                        `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=1f6ee6321c963bedf422d26c3ac3f1cd&units=metric&cnt=40&lang=vi`,
                    )
                    .then(async (weatherCity) => {
                        await updateDoc(doc(db, 'weatherLocation', city.id), {
                            list: weatherCity.data.list,
                            city: weatherCity.data.city,
                        })
                            .then(() => {
                                setReloadData(!reloadData);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
            setRefreshing(false);
        }
        if (refreshing === true || (numberUpdate.current === 0 && refreshing === false)) {
            updateWeather();
            numberUpdate.current = numberUpdate.current + 1;
        }

        const interval = setInterval(() => {
            updateWeather();
        }, 24 * 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, [refreshing]);

    return dataWeather ? (
        <ThemeProvider>
            <scrollHorizontalContext.Provider
                value={{
                    scrollHorizontal,
                    setScrollHorizontal,
                    setIndex,
                    reloadData,
                    setReloadData,
                    refreshing,
                    setRefreshing,
                }}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        width: Dimensions.get('window').width * dataWeather.length,
                        height: Dimensions.get('window').height + 100,
                        zIndex: 1,
                    }}
                    pagingEnabled={true}
                    decelerationRate={0.1}
                    scrollEnabled={scrollHorizontal}
                    nestedScrollEnabled={true}
                    ref={scrollViewRef}
                >
                    {dataWeather &&
                        dataWeather?.map((weatherForEachLocation, index) => {
                            return (
                                <DataContext.Provider key={index} value={weatherForEachLocation}>
                                    <View style={styles.container}>
                                        <StatusBar
                                            animated={true}
                                            barStyle={'light-content'}
                                            backgroundColor="transparent"
                                            translucent
                                        />
                                        <ImageBackground
                                            source={require('./assets/oto.jpg')}
                                            resizeMode="cover"
                                            style={styles.imageBg}
                                        >
                                            <DrawerNavigator></DrawerNavigator>
                                        </ImageBackground>
                                    </View>
                                </DataContext.Provider>
                            );
                        })}
                </ScrollView>
            </scrollHorizontalContext.Provider>
        </ThemeProvider>
    ) : (
        <SplashScreen></SplashScreen>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
});
