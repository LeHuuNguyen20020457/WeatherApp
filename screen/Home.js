import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';

import { WeatherKeyInfo } from '../module/weatherKeyInfo';
import { HourlyForecast } from '../module/hourlyForecast';
import { ForecastByDay } from '../module/forecastByDay';
import { scrollHorizontalContext } from '../config/ThemeContext';
import { OtherParameters } from '../module/otherParameters';
import { WindAndPressure } from '../module/windAndPressure';

function Home() {
    const { refreshing, setRefreshing } = useContext(scrollHorizontalContext);

    const handleRefresh = () => {
        setRefreshing(true);
    };

    return (
        <ScrollView
            decelerationRate={'fast'}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl>}
        >
            <View style={{ marginBottom: 100 }}>
                <WeatherKeyInfo></WeatherKeyInfo>
                <HourlyForecast></HourlyForecast>
                <ForecastByDay></ForecastByDay>
                <OtherParameters></OtherParameters>
                <WindAndPressure></WindAndPressure>
            </View>
        </ScrollView>
    );
}

export default React.memo(Home);
