import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TitleContext } from '../../config/ThemeContext';

const Stack = createStackNavigator();

function StackNavigator(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: '#333',
                },
                presentation: 'modal',
                cardOverlayEnabled: true,
                headerStyle: {
                    backgroundColor: 'transparent',
                    borderBottomColor: 'transparent',
                    shadowColor: 'transparent',
                },
                // headerTintColor: '#fff',
            }}
        >
            {props.StackScreen.map((screen, index) => {
                const Header = screen.header;
                return (
                    <Stack.Screen
                        key={index}
                        options={{
                            headerTitle: (props) => (
                                <TitleContext.Provider value={screen.title}>
                                    <Header {...props}></Header>
                                </TitleContext.Provider>
                            ),
                        }}
                        name={screen.name}
                        component={screen.component}
                    ></Stack.Screen>
                );
            })}
        </Stack.Navigator>
    );
}

export default React.memo(StackNavigator);
