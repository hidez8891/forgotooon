import React, { Component } from 'react';
import Memos from './Memos';

import {
    Toolbar,
    ActionButton
} from 'react-native-material-ui';

import {
    StyleSheet,
    View
} from 'react-native';

import { NavigationScreenProps } from 'react-navigation';

export default class HomeView extends Component<NavigationScreenProps> {
    render() {
        return (
            <View style={styles.body}>
                <Toolbar key="top" centerElement="Memo" />
                <Memos />
                <ActionButton
                    icon="add"
                    onPress={() => this.props.navigation.navigate("Edit")} />
            </View>
        );
    }
}

//--------------------------------
// Styles
//--------------------------------
const styles = StyleSheet.create({
    body: {
        flex: 1,
        marginTop: 24
    }
});