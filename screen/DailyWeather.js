import React, { useContext, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { DateTime } from '../components/dateTime';
import { DataContext } from '../config/ThemeContext';
import { DetailsEveryDay } from '../module/detailsEveryDay';

const DailyWeather = () => {
    const { city, list } = useContext(DataContext);

    const data = useMemo(() => {
        let date = 0;
        let count = 0;
        const data = [];
        try {
            list.map((item) => {
                const newDate = new Date(item.dt_txt);
                if (date === 0 && count === 0) {
                    data.push(item);
                    date = newDate.getDate();
                    ++count;
                } else if (date !== newDate.getDate() && count < 5) {
                    data.push(item);
                    date = newDate.getDate();
                    ++count;
                }
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    }, [list]);

    return (
        <View>
            <View style={styles.containerDailyWeather}>
                {data.map((item, index) => {
                    return <DateTime key={index} tg={item.dt_txt}></DateTime>;
                })}
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                decelerationRate={'fast'}
                contentContainerStyle={{
                    paddingBottom: 200,
                }}
            >
                <View>
                    {data.map((item, index) => {
                        return <DetailsEveryDay key={index} item={item} city={city}></DetailsEveryDay>;
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    containerDailyWeather: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
    },
});

export default React.memo(DailyWeather);
