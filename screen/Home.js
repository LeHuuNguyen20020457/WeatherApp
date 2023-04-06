import React from 'react';
import { ScrollView } from 'react-native';

import { WeatherKeyInfo } from '../module/weatherKeyInfo';
import { HourlyForecast } from '../module/hourlyForecast';
import { ForecastByDay } from '../module/forecastByDay';

function Home() {
    return (
        <ScrollView decelerationRate={'fast'}>
            <WeatherKeyInfo></WeatherKeyInfo>
            <HourlyForecast></HourlyForecast>
            <ForecastByDay></ForecastByDay>
        </ScrollView>
    );
}

export default React.memo(Home);
