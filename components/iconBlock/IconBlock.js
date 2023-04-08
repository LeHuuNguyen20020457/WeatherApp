import React from 'react';
import { View, StyleSheet } from 'react-native';

const IconBlock = ({ longEdge, icon }) => {
    const Icon = icon.icon;
    return (
        <View style={[styles.blockIcon, { width: longEdge, height: longEdge }]}>
            <Icon name={icon.name} size={icon.size} color="white" />
        </View>
    );
};

const styles = StyleSheet.create({
    blockIcon: {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default React.memo(IconBlock);
