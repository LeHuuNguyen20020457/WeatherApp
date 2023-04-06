import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Input = ({ setKeySearch, keySearch }) => {
    return (
        <View style={stlyes.inputContainer}>
            <TextInput
                style={stlyes.input}
                placeholderTextColor="rgba(255,255,255,0.6)"
                selectionColor="white"
                color="white"
                placeholder="Nhập tên thành phố"
                onChangeText={(location) => {
                    setKeySearch(location);
                }}
                value={keySearch}
            ></TextInput>
            <View style={stlyes.iconView}>
                <Entypo style={stlyes.iconMap} name="map" size={20} color="black" />
            </View>
        </View>
    );
};

const stlyes = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: 380,
        marginLeft: 10,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: 340,
        paddingLeft: 10,
        paddingVertical: 7,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        fontSize: 16,
    },
    iconView: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
    iconMap: {
        color: 'white',
        backgroundColor: '#333',
        padding: 5,
        borderRadius: 20,
    },
});

export default React.memo(Input);
