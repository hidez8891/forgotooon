import React from 'react';
import { View } from "react-native";
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
        <>
            <View style={{ paddingTop: insets.top }} />
            <HomeScreen
                onCallEditor={() => navigation.navigate(Route.Edit)}
            />
        </>
    );
}

const EditScreenView: React.FC<RouterProps> = (props) => {
    const insets = useSafeArea();
    const { navigation } = props;

    return (
        <>
            <View style={{ paddingTop: insets.top }} />
            <EditScreen
                onFinished={() => navigation.goBack()}
            />
        </>
    );
}

export default createAppContainer(createStackNavigator(
    {
        [Route.Home]: { screen: HomeScreenView },
        [Route.Edit]: { screen: EditScreenView },
    },
    {
        initialRouteName: Route.Home,
        headerMode: "none"
    }
));