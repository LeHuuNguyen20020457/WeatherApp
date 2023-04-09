import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HeaderTiNa } from '../../components/headerTiNa';

const HeaderEditLocation = () => {
    const [isChangeWidth, setIsChangeWidth] = useState(false);
    const navigation = useNavigation();

    function handleWidth() {
        setIsChangeWidth(!isChangeWidth);
        navigation.setParams({ isChangeWidth });
    }

    return (
        <View style={styles.headerEditLocation}>
            <HeaderTiNa></HeaderTiNa>
            <View style={{ marginLeft: 120 }}>
                <Text style={{ color: 'white', fontSize: 16 }} onPress={handleWidth}>
                    Chỉnh sửa
                </Text>
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
