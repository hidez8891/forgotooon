import { createStackNavigator } from "react-navigation";
import EditView from "./containers/Edit";
import HomeView from "./containers/Home";

const RouterContainer = createStackNavigator(
  {
    Home: HomeView,
    Edit: EditView
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default RouterContainer;
