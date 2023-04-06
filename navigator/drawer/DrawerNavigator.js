import React, { lazy, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WithTheme from '../../config/WithTheme';
import { navigationRef } from '../../utils/RootNavigation';

// const DashboardHeader = lazy(() => import('../../module/dashboard/DashboardHeader'));
// const SearchNavigation = lazy(() => import('../searchStack/SearchNavigation'));
// const Home = lazy(() => import('../../screen/Home'));
import { DashboardHeader } from '../../module/dashboard';
import Home from '../../screen/Home';
import SearchNavigation from '../searchStack/SearchNavigation';
function DrawerNavigator() {
    const Drawer = createDrawerNavigator();
    const ThemeDashboardHeader = WithTheme(DashboardHeader);

    return (
        <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator
                initialRouteName="Thời tiết"
                useLegacyImplementation
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent',
                        borderBottomColor: 'transparent',
                        shadowColor: 'transparent',
                    },
                    sceneContainerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTintColor: '#fff',
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
                    headerTitle: (props) => <ThemeDashboardHeader {...props} />,
                }}
            >
                <Drawer.Screen name="Thời tiết" component={Home} />
                <Drawer.Screen
                    name="Tìm kiếm"
                    component={SearchNavigation}
                    options={{
                        headerShown: false,
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
export default React.memo(DrawerNavigator);
