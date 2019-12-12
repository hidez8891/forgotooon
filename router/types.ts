import { NavigationStackProp } from 'react-navigation-stack';

export enum Route {
    Home = 'Home',
    Edit = 'Edit'
}

export interface RouterProps {
    navigation: NavigationStackProp<{}>;
}
