import React from 'react';
import { Animated, Easing } from 'react-native';
import {
    Container, Content, Header,
    Left, Right, Body, Title,
    Button, Text
} from "native-base";
import { useSafeArea } from 'react-native-safe-area-context';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, NavigationStackProp } from 'react-navigation-stack';

import HomeScreen from "./HomeScreen";
import EditScreen from "./EditScreen";

enum Route {
    Home = "Home",
    Edit = "Edit"
}

interface RouterProps {
    navigation: NavigationStackProp<{}>;
};

const HomeScreenView: React.FC<RouterProps> = (props) => {
    const insets = useSafeArea();
    const { navigation } = props;

    return (
        <Container style={{ paddingTop: insets.top }} >
            <Header>
                <Left />
                <Body>
                    <Title>Task List</Title>
                </Body>
                <Right />
            </Header>
            <Content padder contentContainerStyle={{ flexGrow: 1 }}>
                <HomeScreen
                    onCallEditor={() => navigation.navigate(Route.Edit)}
                />
            </Content>
        </Container>
    );
}

const EditScreenView: React.FC<RouterProps> = (props) => {
    const insets = useSafeArea();
    const { navigation } = props;

    return (
        <Container style={{ paddingTop: insets.top }} >
            <Header>
                <Left />
                <Body>
                    <Title>Add New Task</Title>
                </Body>
                <Right>
                    <Button
                        transparent
                        onPress={() => navigation.goBack()}
                    >
                        <Text>Cancel</Text>
                    </Button>
                </Right>
            </Header>
            <Content padder contentContainerStyle={{ flexGrow: 1 }}>
                <EditScreen
                    onFinished={() => navigation.goBack()}
                />
            </Content>
        </Container >
    );
}

export default createAppContainer(createStackNavigator(
    {
        [Route.Home]: { screen: HomeScreenView },
        [Route.Edit]: { screen: EditScreenView },
    },
    {
        initialRouteName: Route.Home,
        headerMode: "none",
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;
                const width = layout.initWidth;

                return {
                    opacity: position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [1, 1, 1],
                    }),
                    transform: [{
                        translateX: position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [width, 0, -width],
                        }),
                    }]
                };
            },
            headerTitleInterpolator: sceneProps => {
                const { position, scene } = sceneProps;
                const { index } = scene;

                return {
                    opacity: position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0, 1, 0],
                    }),
                    transform: [{
                        translateX: position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [50, 0, -50],
                        }),
                    }]
                };
            },
        })
    }
));