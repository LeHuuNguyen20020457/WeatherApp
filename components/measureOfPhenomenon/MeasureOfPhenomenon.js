import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconBlock } from '../iconBlock';

const MeasureOfPhenomenon = ({ fontSize, icon, longEdge }) => {
    return (
        <View style={styles.containerMeasureOfPhenomenon}>
            <IconBlock longEdge={longEdge} icon={icon}></IconBlock>
            <View style={{ marginLeft: 12 }}>
                <Text style={[styles.measure, { fontSize: fontSize }]}>
                    {icon.data.measure} {icon.data?.unit}
                </Text>
                <Text style={styles.phenomenon}>{icon.data.title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerMeasureOfPhenomenon: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 16,
    },
    measure: {
        fontWeight: 'bold',
        color: 'white',
    },
    phenomenon: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.5)',
    },
});
export default React.memo(MeasureOfPhenomenon);
