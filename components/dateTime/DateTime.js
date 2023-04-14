import React, { useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateTime = ({ tg }) => {
    const day = useRef('');
    const date = useRef('');
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
        <View style={styles.containerDay}>
            <View style={styles.eachDay}>
                <Text style={styles.dateText}>{day.current}</Text>
                <Text style={styles.dateText}>{date.current}</Text>
            </View>
        </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
