import React from 'react';
import { Container, Content, Header, Left, Right, Body, Title } from "native-base";
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
                <Right />
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
    }
));