import React, { useContext, useMemo } from 'react';
import { View, Text } from 'react-native';
import { DataContext } from '../../config/ThemeContext';

import { HeaderTable } from '../../components/headerTable';
import WeatherEveryDay from '../../components/weatherEveryDay/WeatherEveryDay';

const ForecastByDay = () => {
    const { list } = useContext(DataContext);
    const data = useMemo(() => {
        let date = 0;
        let count = 0;
        const data = [];
        list.map((item, index) => {
            const newDate = new Date(item.dt_txt);
            if (date === 0 && count === 0) {
                data.push(item);
                date = newDate.getDate();
                ++count;
            } else if (date !== newDate.getDate() && count < 5 && newDate.getHours() == 12) {
                data.push(item);
                date = newDate.getDate();
                ++count;
            }
        });
        return data;
    }, [list]);

    return (
        <View>
            <HeaderTable titleLeft={'Dự báo hàng ngày'} titleRigtht={'7 ngày'} height={450}>
                <View>
                    {data.map((item, index) => {
                        return <WeatherEveryDay item={item} key={index}></WeatherEveryDay>;
                    })}
                </View>
            </HeaderTable>
        </View>
    );
};
export default React.memo(ForecastByDay);
