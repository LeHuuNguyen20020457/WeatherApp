import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TitleContext } from '../../config/ThemeContext';
// import { navigate } from '../../utils/RootNavigation';
import { useNavigation } from '@react-navigation/native';

const HeaderTiNa = () => {
    const title = useContext(TitleContext);
    const { navigate, goBack } = useNavigation();
    return (
        <View style={styles.headerTiNa}>
            <TouchableOpacity onPress={() => goBack()}>
                <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTiNaText}>{title ? title : ''}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerTiNa: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
    },
    headerTiNaText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 500,
        marginLeft: 30,
    },
});

export default React.memo(HeaderTiNa);
