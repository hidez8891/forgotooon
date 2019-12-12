import { Animated, Easing } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './HomeScreen';
import EditScreen from './EditScreen';
import { Route } from './types';

export default createAppContainer(
    createStackNavigator(
        {
            [Route.Home]: { screen: HomeScreen },
            [Route.Edit]: { screen: EditScreen }
        },
        {
            initialRouteName: Route.Home,
            headerMode: 'none',
            transitionConfig: () => ({
                transitionSpec: {
                    duration: 300,
                    easing: Easing.out(Easing.poly(4)),
                    timing: Animated.timing
                },
                screenInterpolator: sceneProps => {
                    const { layout, position, scene } = sceneProps;
                    const { index } = scene;
                    const width = layout.initWidth;

                    return {
                        opacity: position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [1, 1, 1]
                        }),
                        transform: [
                            {
                                translateX: position.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [width, 0, -width]
                                })
                            }
                        ]
                    };
                },
                headerTitleInterpolator: sceneProps => {
                    const { position, scene } = sceneProps;
                    const { index } = scene;

                    return {
                        opacity: position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0, 1, 0]
                        }),
                        transform: [
                            {
                                translateX: position.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [50, 0, -50]
                                })
                            }
                        ]
                    };
                }
            })
        }
    )
);
