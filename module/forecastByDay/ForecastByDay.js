import React from 'react';
import { View, Text } from 'react-native';

import { HeaderTable } from '../../components/headerTable';
import WeatherEveryDay from '../../components/weatherEveryDay/WeatherEveryDay';
const ForecastByDay = () => {
    return (
        <View>
            <HeaderTable titleLeft={'Dự báo hàng ngày'} titleRigtht={'7 ngày'} height={600}>
                <View>
                    <WeatherEveryDay></WeatherEveryDay>
                    <WeatherEveryDay></WeatherEveryDay>
                    <WeatherEveryDay></WeatherEveryDay>
                    <WeatherEveryDay></WeatherEveryDay>
                    <WeatherEveryDay></WeatherEveryDay>
                    <WeatherEveryDay></WeatherEveryDay>
                    <WeatherEveryDay></WeatherEveryDay>
                </View>
            </HeaderTable>
        </View>
    );
};
export default React.memo(ForecastByDay);
