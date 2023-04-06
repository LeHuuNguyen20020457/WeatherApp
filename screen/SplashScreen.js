import React, { useState, useRef, useEffect, startTransition } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Image, ScrollView } from 'react-native';

const SplashScreen = () => {
    const numberImage = useRef(4);
    const scrollViewRef = useRef(null);
    const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
    const viewSizeRef = useRef(null);
    useEffect(() => {
        const interval = setInterval(() => {
            const nextPositionX =
                (currentPosition.x + viewSizeRef.current.width) % (viewSizeRef.current.width * numberImage.current);
            scrollViewRef.current?.scrollTo({ x: nextPositionX, animated: true });
            setCurrentPosition({ x: nextPositionX, y: 0 });
            console.log('vào');
        }, 1000);

        return () => clearInterval(interval);
    }, [currentPosition]);

    const onLayoutView = (event) => {
        const { width, height } = event.nativeEvent.layout;
        viewSizeRef.current = {
            width,
            height,
        };
    };

    return (
        <View style={styles.SplashScreenColor}>
            <StatusBar animated={true} barStyle={'light-content'} backgroundColor="#333" translucent></StatusBar>
            <View style={styles.circleCenter}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollViewRef}>
                    <View style={styles.contaiImage} onLayout={onLayoutView}>
                        <Image style={styles.image} source={require('../assets/cloud.png')} />
                    </View>
                    <View style={styles.contaiImage}>
                        <Image style={styles.image} source={require('../assets/sun.png')} />
                    </View>
                    <View style={styles.contaiImage}>
                        <Image style={styles.image} source={require('../assets/lighting.png')} />
                    </View>
                    <View style={styles.contaiImage}>
                        <Image style={styles.image} source={require('../assets/cloud-rain.png')} />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    SplashScreenColor: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 100,
        backgroundColor: '#333',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleCenter: {
        width: 200,
        height: 200,
        borderRadius: 200,
        backgroundColor: 'rgba(255, 255, 255,0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -100,
    },
    contaiImage: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 50,
    },
});

export default React.memo(SplashScreen);
