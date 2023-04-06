import React, { lazy, Suspense } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

// const HeaderEditLocation = lazy(() => import('../../module/headerScreen/HeaderEditLocation'));
// const EditLocation = lazy(() => import('../../screen/EditLocation'));
// const StackNavigator = lazy(() => import('../stack/StackNavigator'));
import { StackNavigator } from '../stack';
import { HeaderEditLocation } from '../../module/headerScreen';
import EditLocation from '../../screen/EditLocation';
const StackScreen = [
    {
        name: 'EditLocation',
        component: EditLocation,
        title: 'Sửa địa điểm',
        header: HeaderEditLocation,
    },
];
const SearchNavigation = () => {
    return (
        <View style={styles.containerSearch}>
            <StackNavigator StackScreen={StackScreen}></StackNavigator>
        </View>
    );
};

const styles = StyleSheet.create({
    containerSearch: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('screen').height,
    },
});
export default React.memo(SearchNavigation);
