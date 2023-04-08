import React, { useCallback, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { HeaderTable } from '../../components/headerTable';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import { DataContext } from '../../config/ThemeContext';
import { MeasureOfPhenomenon } from '../../components/measureOfPhenomenon';

const WindAndPressure = () => {
    function degreesToDirection(degrees) {
        const directions = [
            'Bắc',
            'Bắc Đông Bắc',
            'Đông Bắc',
            'Đông Đông Bắc',
            'Đông',
            'Đông Đông Nam',
            'Đông Nam',
            'Nam Đông Nam',
            'Nam',
            'Nam Tây Nam',
            'Tây Nam',
            'Tây Tây Nam',
            'Tây',
            'Tây Tây Bắc',
            'Tây Bắc',
            'Bắc Đông Bắc',
        ];
        const index = Math.round(degrees / 22.5);
        return directions[index % 16];
    }

    const { list } = useContext(DataContext);

    const icons = [
        {
            icon: MaterialCommunityIcons,
            name: 'wind-turbine',
            size: 40,
            data: {
                title: '1 Cấp gió',
                measure: (list[0].wind.speed * 1.6).toFixed(1),
                unit: 'km/h',
            },
        },
        {
            icon: MaterialCommunityIcons,
            name: 'car-brake-low-pressure',
            size: 24,
            data: {
                title: 'Áp suất',
                measure: list[0].main.grnd_level,
                unit: 'hPa',
            },
        },
        {
            icon: Entypo,
            name: 'direction',
            size: 24,
            data: {
                title: 'Hướng gió',
                measure: degreesToDirection(list[0].wind.deg),
                unit: '',
            },
        },
    ];

    return (
        <HeaderTable titleLeft="Gió & áp suất" titleRigtht="Hơn" height={250}>
            <View style={styles.windAndPressure}>
                <View>
                    <MeasureOfPhenomenon fontSize={36} longEdge={80} icon={icons[0]}></MeasureOfPhenomenon>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MeasureOfPhenomenon fontSize={18} longEdge={44} icon={icons[1]}></MeasureOfPhenomenon>
                    <View style={{ marginRight: 20 }}>
                        <MeasureOfPhenomenon fontSize={18} longEdge={44} icon={icons[2]}></MeasureOfPhenomenon>
                    </View>
                </View>
            </View>
        </HeaderTable>
    );
};

const styles = StyleSheet.create({
    windAndPressure: {
        marginLeft: 10,
    },
});

export default React.memo(WindAndPressure);
