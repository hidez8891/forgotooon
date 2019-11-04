import { createAppContainer } from 'react-navigation';
import { createStackNavigator, NavigationStackProp } from 'react-navigation-stack';
import HomeScreen from "./HomeScreen";
import EditScreen from "./EditScreen";
import * as defs from "./ScreenRouter.defs";

export default createAppContainer(createStackNavigator(
    {
        [defs.Route.Home]: { screen: HomeScreen },
        [defs.Route.Edit]: { screen: EditScreen },
    },
    {
        initialRouteName: defs.Route.Home,
        headerMode: "none"
    }
));