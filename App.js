import 'react-native-gesture-handler';

import React, { useEffect, useState, useRef, useLayoutEffect, Suspense, lazy, startTransition } from 'react';
import { View, Text, ImageBackground, StyleSheet, StatusBar, ScrollView, Dimensions } from 'react-native';
import { DataContext, scrollHorizontalContext } from './config/ThemeContext';
import { db } from './firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

import { DrawerNavigator } from './navigator/drawer/';
import ThemeProvider from './config/ThemeProvider';
import SplashScreen from './screen/SplashScreen';

export default function App() {
    const [dataWeather, setDataWeather] = useState('');
    const [scrollHorizontal, setScrollHorizontal] = useState(true);
    const [index, setIndex] = useState(0);
    const [reloadData, setReloadData] = useState(false);
    const [isRerender, setIsRerender] = useState(false);

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

    return dataWeather ? (
        <ThemeProvider>
            <scrollHorizontalContext.Provider
                value={[scrollHorizontal, setScrollHorizontal, setIndex, reloadData, setReloadData]}
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
