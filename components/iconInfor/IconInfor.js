import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IconInfor = ({ icon }) => {
    const Icon = icon.icon;
    return (
        <View style={[styles.containerIconInfor, { paddingVertical: 6 }]}>
            <View style={styles.containerIconInfor}>
                <Icon name={icon.name} size={icon.size} color="rgba(255,255,255,0.5)" />
                <Text style={{ marginLeft: 10, color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>{icon.data.title}</Text>
            </View>
            <Text style={{ color: 'white', fontSize: 16 }}>
                {icon.data.measure} {icon.data.unit}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    containerIconInfor: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default React.memo(IconInfor);
