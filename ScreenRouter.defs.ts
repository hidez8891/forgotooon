import { NavigationStackProp } from 'react-navigation-stack';

export type RouterProps = {
    navigation: NavigationStackProp<{}>;
};

export enum Route {
    Home = "Home",
    Edit = "Edit"
}
