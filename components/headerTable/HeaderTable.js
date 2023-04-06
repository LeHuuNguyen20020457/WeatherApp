import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderTable = ({ titleLeft, titleRigtht, height, children }) => {
    return (
        <View style={[styles.containerTable, { height: height }]}>
            <View style={styles.titleTable}>
                <Text style={styles.titleLeft}>{titleLeft}</Text>
                <Text style={styles.titleRigtht}>{titleRigtht}</Text>
            </View>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    containerTable: {
        width: 380,
        // height: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginLeft: 15,
        borderRadius: 20,
        marginTop: 50,
    },
    titleTable: {
        display: 'flex',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    titleLeft: {
        marginLeft: 10,
        color: 'white',
    },
    titleRigtht: {
        marginRight: 10,
        color: 'white',
    },
});

export default React.memo(HeaderTable);
