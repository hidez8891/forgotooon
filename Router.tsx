import { createStackNavigator } from 'react-navigation';
import HomeView from './containers/Home';
import EditView from './containers/Edit';

const RouterContainer = createStackNavigator(
    {
        Home: HomeView,
        Edit: EditView
    },
    {
        initialRouteName: 'Home',
        headerMode: "none",
    }
);

export default RouterContainer;