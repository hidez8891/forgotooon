import React from 'react';
import { useSafeArea } from 'react-native-safe-area-context';
import {
    Body,
    Button,
    Container,
    Header,
    Left,
    Right,
    Text,
    Title
} from 'native-base';

import EditScreen from '../presentator/EditScreen';
import { RouterProps } from './types';

const EditScreenView: React.FC<RouterProps> = props => {
    const insets = useSafeArea();
    const { navigation } = props;

    return (
        <Container style={{ paddingTop: insets.top }}>
            <Header>
                <Left />
                <Body>
                    <Title>Add New Task</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Text>Cancel</Text>
                    </Button>
                </Right>
            </Header>
            <EditScreen onFinished={() => navigation.goBack()} />
        </Container>
    );
};

export default EditScreenView;
