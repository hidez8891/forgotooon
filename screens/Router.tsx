import { createStackNavigator } from "react-navigation";
import EditView from "./Edit";
import HomeView from "./Home";

export enum RouteScreen {
  Home = "Home",
  Edit = "Edit"
}

export default createStackNavigator(
  {
    [RouteScreen.Home]: HomeView,
    [RouteScreen.Edit]: EditView
  },
  {
    initialRouteName: RouteScreen.Home,
    headerMode: "none"
  }
);
