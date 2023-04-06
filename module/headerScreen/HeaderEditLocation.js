import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { HeaderTiNa } from '../../components/headerTiNa';
const HeaderEditLocation = () => {
    return (
        <View style={styles.headerEditLocation}>
            <HeaderTiNa></HeaderTiNa>
            <View style={{ marginLeft: 120 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Chỉnh sửa</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerEditLocation: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default React.memo(HeaderEditLocation);
