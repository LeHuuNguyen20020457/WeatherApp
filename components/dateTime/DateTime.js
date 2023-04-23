import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { scrollHorizontalContext } from '../../config/ThemeContext';
const DateTime = ({ tg, index, scrollToDay }) => {
    const day = useRef('');
    const date = useRef('');
    const { setScrollToDay } = useContext(scrollHorizontalContext);
    const [backgroundColor, setBackgroundColor] = useState({});

    useEffect(() => {
        scrollToDay == index ? setBackgroundColor({ backgroundColor: 'rgba(0, 0, 0, 0.3)' }) : setBackgroundColor({});
    }, [scrollToDay]);

    useMemo(() => {
        const time = new Date(tg);
        try {
            if (time.getDay() === 0) {
                day.current = 'CN';
            } else {
                const thu = time.getDay() + 1;
                day.current = 'T.' + thu;
            }
            let month = time.getMonth() + 1;
            date.current = time.getDate() + '/' + month;
        } catch (err) {
            console.error(err);
        }
    }, [tg]);

    return (
        <TouchableOpacity
            onPress={() => {
                setScrollToDay(index);
            }}
            style={styles.containerDay}
        >
            <View style={[styles.eachDay, backgroundColor]}>
                <Text style={styles.dateText}>{day.current}</Text>
                <Text style={styles.dateText}>{date.current}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerDay: {
        width: '20%',
        height: 64,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    eachDay: {
        width: '70%',
        // backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    dateText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
    },
});

export default React.memo(DateTime);
