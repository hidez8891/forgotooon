import React, { useState } from 'react';
import { useSafeArea } from 'react-native-safe-area-context';
import {
    Body,
    Button,
    Container,
    Header,
    Icon,
    Left,
    Right,
    Title
} from 'native-base';

import SortMenu from '../presentator/SortMenu';
import HomeScreen from '../presentator/HomeScreen';
import { Route, RouterProps } from './types';

const HomeScreenView: React.FC<RouterProps> = props => {
    const insets = useSafeArea();
    const { navigation } = props;
    const [isShowMenu, setShowMenu] = useState(false);

    return (
        <Container style={{ paddingTop: insets.top }}>
            <Header>
                <Left />
                <Body>
                    <Title>Task List</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon
                            type="MaterialCommunityIcons"
                            name="sort-variant"
                            onPress={() => setShowMenu(!isShowMenu)}
                        />
                    </Button>
                </Right>
            </Header>
            <HomeScreen onCallEditor={() => navigation.navigate(Route.Edit)} />
            <SortMenu
                isVisible={isShowMenu}
                onClose={() => setShowMenu(false)}
            />
        </Container>
    );
};

export default HomeScreenView;
