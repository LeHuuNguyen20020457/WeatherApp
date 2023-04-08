import React, { useContext, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderTable } from '../../components/headerTable';
import { MeasureOfPhenomenon } from '../../components/measureOfPhenomenon';
import { Feather, FontAwesome, AntDesign, EvilIcons, Ionicons } from '@expo/vector-icons';

import { DataContext } from '../../config/ThemeContext';

const OtherParameters = () => {
    const { list } = useContext(DataContext);
    const icons = useMemo(() => {
        const icons = [
            {
                icon: Feather,
                name: 'umbrella',
                size: 24,
                data: {
                    title: 'Xác xuất kết tủa',
                    measure: list[0].pop,
                    unit: '%',
                },
            },
            {
                icon: Feather,
                name: 'sun',
                size: 24,
                data: {
                    title: 'UV',
                    measure: 1,
                    unit: '',
                },
            },
            {
                icon: FontAwesome,
                name: 'thermometer-4',
                size: 24,
                data: {
                    title: 'điểm sương',
                    measure: 16,
                    unit: '°',
                },
            },
            {
                icon: AntDesign,
                name: 'cloudo',
                size: 24,
                data: {
                    title: 'Mây che phủ',
                    measure: list[0].clouds.all,
                    unit: '°',
                },
            },
            {
                icon: EvilIcons,
                name: 'eye',
                size: 24,
                data: {
                    title: 'Khả năng hiển thị',
                    measure: (list[0].visibility / 1000).toFixed(2),
                    unit: 'km',
                },
            },
            {
                icon: Ionicons,
                name: 'water-outline',
                size: 24,
                data: {
                    title: 'Độ ẩm',
                    measure: list[0].main.humidity,
                    unit: '%',
                },
            },
        ];
        return icons;
    }, [list]);

    return (
        <View>
            <HeaderTable titleLeft={'Chi tiết'} titleRigtht={'Hơn'} height={276}>
                <View style={styles.bodyTable}>
                    <View>
                        <MeasureOfPhenomenon fontSize={18} longEdge={44} icon={icons[0]}></MeasureOfPhenomenon>
                        <MeasureOfPhenomenon fontSize={18} longEdge={44} icon={icons[1]}></MeasureOfPhenomenon>
                        <MeasureOfPhenomenon fontSize={18} longEdge={44} icon={icons[2]}></MeasureOfPhenomenon>
                    </View>
                    <View>
                        <MeasureOfPhenomenon fontSize={18} longEdge={44} icon={icons[3]}></MeasureOfPhenomenon>
                        <MeasureOfPhenomenon fontSize={18} longEdge={44} icon={icons[4]}></MeasureOfPhenomenon>
                        <MeasureOfPhenomenon fontSize={18} longEdge={44} icon={icons[5]}></MeasureOfPhenomenon>
                    </View>
                </View>
            </HeaderTable>
        </View>
    );
};

const styles = StyleSheet.create({
    bodyTable: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default React.memo(OtherParameters);
