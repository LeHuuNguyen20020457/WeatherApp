import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, RefreshControl } from 'react-native';

import { WeatherKeyInfo } from '../module/weatherKeyInfo';
import { HourlyForecast } from '../module/hourlyForecast';
import { ForecastByDay } from '../module/forecastByDay';
import { scrollHorizontalContext } from '../config/ThemeContext';

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
            <WeatherKeyInfo></WeatherKeyInfo>
            <HourlyForecast></HourlyForecast>
            <ForecastByDay></ForecastByDay>
        </ScrollView>
    );
}

export default React.memo(Home);
