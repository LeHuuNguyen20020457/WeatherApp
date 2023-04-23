import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { ChartLine } from '../../components/chartLine';
import { HeaderTable } from '../../components/headerTable';
import { Humidity } from '../../components/humidity';
import { WeatherEveryHour } from '../../components/weatherEveryHour';
import { scrollHorizontalContext, DataContext } from '../../config/ThemeContext';

const HourlyForecast = () => {
    const { setScrollHorizontal } = useContext(scrollHorizontalContext);

    const weatherForEachLocation = useContext(DataContext);
    const { list } = weatherForEachLocation;

    return (
        <View>
            <HeaderTable titleLeft={'Dự báo 24h'} titleRigtht={'72 giờ'} height={350}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        // zIndex: 2,
                    }}
                    decelerationRate={'normal'}
                    nestedScrollEnabled={true}
                    onTouchStart={(e) => setScrollHorizontal(false)}
                    onScrollEndDrag={(e) => setScrollHorizontal(true)}
                    onMomentumScrollEnd={(e) => setScrollHorizontal(true)}
                >
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        {list.map((item, index) => {
                            const time = new Date(item.dt_txt);
                            const hours = time.getHours() + ':00';

                            return (
                                <WeatherEveryHour
                                    key={index}
                                    hours={hours}
                                    icon={item.weather[0].icon}
                                ></WeatherEveryHour>
                            );
                        })}
                    </View>
                    <View>
                        <ChartLine list={list}></ChartLine>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        {list.map((item, index) => {
                            const humidity = item.main.humidity;
                            return <Humidity key={index} humidity={humidity}></Humidity>;
                        })}
                    </View>
                </ScrollView>
            </HeaderTable>
        </View>
    );
};

export default React.memo(HourlyForecast);
