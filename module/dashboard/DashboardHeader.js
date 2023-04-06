import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { DataContext } from '../../config/ThemeContext';

function DashboardHeader({ theme, ...props }) {
    const [presentTime, setPresentTime] = useState();

    const weatherForEachLocation = useContext(DataContext);
    const { city } = weatherForEachLocation;

    useEffect(() => {
        const handleTime = () => {
            const time = new Date();

            const day = time.getDay();
            const minutes = time.getMinutes();
            const hours = time.getHours();

            if (day === 0) {
                setPresentTime(`CN  ${hours}:${minutes}`);
            } else {
                setPresentTime(`T.${day + 1}  ${hours}:${minutes}`);
            }
        };
        handleTime();
        const timerInterval = setInterval(() => {
            handleTime();
        }, 50000);

        return () => clearInterval(timerInterval);
    }, []);

    return (
        <View style={styles.dashboard}>
            <View>
                <View style={styles.TimeAndAdress}>
                    <View>
                        <Text style={[styles.address, { color: theme.color }]}>{city.name}</Text>
                        <Text style={[styles.timeHeader, { color: theme.color }]}>{presentTime}</Text>
                    </View>
                    <AntDesign style={{ marginBottom: 10, marginLeft: 5 }} name="down" size={12} color="white" />
                </View>
            </View>
            <View style={styles.appstore}>
                <AntDesign name="appstore-o" size={24} color="white" />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
        flexDirection: 'row',
        width: 300,
        justifyContent: 'center',
        position: 'relative',
    },
    TimeAndAdress: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
    },
    address: {
        fontSize: 16,
        fontWeight: 'bold',
        // color: 'white'
    },
    timeHeader: {
        fontSize: 12,
        // color: 'white',
        textAlign: 'center',
    },
    appstore: {
        position: 'absolute',
        right: 5,
        top: 15,
    },
});

export default React.memo(DashboardHeader);
