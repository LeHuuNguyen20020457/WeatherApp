import React, { lazy, Suspense } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WithTheme from '../../config/WithTheme';
import { navigationRef } from '../../utils/RootNavigation';

import { DashboardHeader } from '../../module/dashboard';
import Home from '../../screen/Home';
import SearchNavigation from '../searchStack/SearchNavigation';
// import DailyWeather from '../../screen/DailyWeather';
const DailyWeather = lazy(() => import('../../screen/DailyWeather'));
import { HeaderTiNa } from '../../components/headerTiNa';
import { TitleContext } from '../../config/ThemeContext';

function DrawerNavigator() {
    const Drawer = createDrawerNavigator();
    const ThemeDashboardHeader = WithTheme(DashboardHeader);

    return (
        <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator
                initialRouteName="Thời tiết"
                useLegacyImplementation
                screenOptions={{
                    headerTitle: '',
                    drawerStyle: {
                        backgroundColor: '#201E1F',
                        width: 260,
                    },
                    drawerActiveBackgroundColor: 'transparent',
                    drawerLabelStyle: {
                        color: 'white',
                        fontSize: 18,
                    },
                    overlayColor: 'rgba(0,0,0,0.6)',
                }}
            >
                <Drawer.Screen
                    name="Thời tiết"
                    component={Home}
                    options={{
                        headerStyle: {
                            backgroundColor: 'transparent',
                            borderBottomColor: 'transparent',
                            shadowColor: 'transparent',
                        },
                        sceneContainerStyle: {
                            backgroundColor: 'transparent',
                        },
                        headerTintColor: '#fff',
                        headerTitle: (props) => <ThemeDashboardHeader {...props} />,
                    }}
                />
                <Drawer.Screen
                    name="Tìm kiếm"
                    component={SearchNavigation}
                    options={{
                        headerShown: false,
                    }}
                />

                <Drawer.Screen
                    name="Thời tiết hàng ngày"
                    component={DailyWeather}
                    options={{
                        headerStyle: {
                            backgroundColor: 'rgba(0, 105, 105, 1)',
                            borderBottomColor: 'rgba(0, 105, 105, 1)',
                            shadowColor: 'rgba(0, 105, 105, 1)',
                        },
                        sceneContainerStyle: {
                            backgroundColor: 'rgba(0, 105, 105, 1)',
                        },
                        headerTintColor: '#fff',

                        headerLeft: (props) => (
                            <TitleContext.Provider value={'Chi tiết hằng ngày'} {...props}>
                                <View style={{ marginLeft: 20 }}>
                                    <HeaderTiNa />
                                </View>
                            </TitleContext.Provider>
                        ),
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
export default React.memo(DrawerNavigator);
