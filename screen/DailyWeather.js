import React, { useContext, useRef, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { DateTime } from '../components/dateTime';
import { DataContext } from '../config/ThemeContext';
import { DetailsEveryDay } from '../module/detailsEveryDay';
import { scrollHorizontalContext } from '../config/ThemeContext';

const DailyWeather = () => {
    const { city, list } = useContext(DataContext);
    const [data, setData] = useState([]);
    const [size, setSize] = useState({ width: 0, height: 0 });

    const { scrollToDay } = useContext(scrollHorizontalContext);
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollTo({ y: size.height * scrollToDay, animated: true });
    }, [scrollToDay]);

    useEffect(() => {
        let date = 0;
        let count = 0;
        let dulieu = [];
        try {
            list.map((item) => {
                const newDate = new Date(item.dt_txt);
                if (date === 0 && count === 0) {
                    dulieu.push(item);
                    date = newDate.getDate();
                    ++count;
                } else if (date !== newDate.getDate() && count < 5) {
                    dulieu.push(item);
                    date = newDate.getDate();
                    ++count;
                }
            });
            setData(dulieu);
        } catch (err) {
            console.log(err);
        }
    }, [list]);

    const onLayoutView = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setSize({ width, height });
    };

    return (
        <View>
            <View style={styles.containerDailyWeather}>
                {data?.map((item, index) => {
                    return <DateTime key={index} tg={item.dt_txt} index={index} scrollToDay={scrollToDay}></DateTime>;
                })}
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 200,
                }}
                ref={scrollRef}
            >
                <View>
                    {data?.map((item, index) => {
                        return (
                            <View key={index} onLayout={onLayoutView}>
                                <DetailsEveryDay item={item} city={city}></DetailsEveryDay>
                            </View>
                        );
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
