import React from "react";
import { View } from "react-native";
import { useSafeArea } from 'react-native-safe-area-context';
import TodoList from "./TodoList";
import OverlayButtonView from "./OverlayButtonView";
import { Route, RouterProps } from "./ScreenRouter.defs";

type Props = RouterProps;

const HomeScreen: React.FC<Props> = (props) => {
    const insets = useSafeArea();
    const { navigation } = props;

    return (
        <>
            <View style={{ paddingTop: insets.top }} />
            <OverlayButtonView onPress={() => navigation.navigate(Route.Edit)} >
                <TodoList />
            </OverlayButtonView>
        </>
    );
}

export default HomeScreen;
