import React, { useMemo, useRef } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ChartLine = ({ list }) => {
    const temperatureList = useRef();

    const data = useMemo(() => {
        temperatureList.current = [];
        list.map((item, index) => {
            temperatureList.current.push(item.main.temp.toFixed());
        });

        return {
            datasets: [
                {
                    data: temperatureList.current,
                    label: 'º',
                    format: (value, label) => `${value}${label}`,
                },
            ],
        };
    }, [list]);

    return (
        <View>
            <LineChart
                data={data}
                width={100 * list.length + 64} // cần phải thay thế chỗ này
                height={110}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={false}
                withVerticalLabels={false}
                withHorizontalLabels={false}
                showBarTops={true}
                chartConfig={{
                    backgroundGradientFrom: 'transparent',
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: 'transparent',
                    backgroundGradientToOpacity: 0,
                    fillShadowGradientFrom: 'white',
                    fillShadowGradientFromOpacity: 0.1,
                    fillShadowGradientTo: '#08130D',
                    fillShadowGradientToOpacity: 0,
                    barPercentage: 20,

                    color: (opacity = 0.1) => `rgba(255, 255, 255, ${opacity})`,

                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '3',
                        strokeWidth: '3',
                        stroke: 'white',
                    },
                }}
                bezier
                style={{
                    marginVertical: 4,
                    borderRadius: 8,
                    marginLeft: -15,
                }}
                renderDotContent={({ x, y, index, indexData }) => {
                    return (
                        <Text
                            key={index}
                            style={{
                                position: 'absolute',
                                top: y - 32,
                                left: x - 16,
                                // backgroundColor: "white",
                                borderRadius: 8,
                                padding: 4,
                                color: 'white',
                            }}
                        >
                            {data.datasets[0].format(indexData, data.datasets[0].label)}
                        </Text>
                    );
                }}
            ></LineChart>
        </View>
    );
};
export default React.memo(ChartLine);
