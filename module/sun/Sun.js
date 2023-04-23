import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Image } from 'react-native-svg';

const Sun = ({
    radius = 10,
    iconSize = 10,
    icon = 'https://reactnative.dev/img/tiny_logo.png',
    sunrise = '',
    sunset = '',
}) => {
    const [progress, setProgress] = useState(0.275);
    const x = radius + Math.sin(progress * Math.PI * 2) * radius;
    const y = -10 - Math.cos(progress * Math.PI * 2) * radius;
    const pivotX = iconSize / 2;
    const pivotY = iconSize / 2;
    const angle = progress * 360;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress((progress) => {
                if (progress >= 0.725) {
                    return 0.275;
                } else {
                    return progress + 0.00045;
                }
            });
        }, 1000);
    }, []);

    return (
        <View style={[styles.container]}>
            <Svg width={radius * 2} height={radius}>
                <Circle cx={radius} cy={-10} r={radius} stroke="yellow" strokeWidth="2" fill="none" />

                <Image
                    x={x - pivotX}
                    y={y - pivotY}
                    width={iconSize}
                    height={iconSize}
                    href={icon}
                    origin={`${pivotX} ${pivotY}`}
                    transform={`rotate(${angle} ${x} ${y})`}
                />
            </Svg>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        transform: [
            {
                rotate: '180deg',
            },
        ],
    },
});

export default Sun;
