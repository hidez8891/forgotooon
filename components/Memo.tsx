import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';

import {
    COLOR
} from 'react-native-material-ui';

import {
    View,
    Text,
    TouchableOpacity,
    GestureResponderEvent
} from 'react-native';

import {
    ListItem,
    Icon,
    ThemeProps,
    withTheme
} from 'react-native-material-ui';

type MemoViewProps = {
    id: string
    text: string
    deleter: () => void
};

class MemoView extends Component<MemoViewProps> {
    render() {
        const { primaryLightColor } = (this.props as any).theme.palette;

        const leftButtons = [
            {
                backgroundColor: COLOR.red300,
                text: (<Icon name="create" />)
            }
        ];

        const rightButtons = [
            {
                backgroundColor: COLOR.blue300,
                text: (<Icon name="delete" />),
                onPress: this.props.deleter
            }
        ];

        return (
            <Swipeout
                autoClose={true}
                left={leftButtons}
                right={rightButtons}>
                <View style={styles.container}>
                    <Text>
                        {this.props.text}
                    </Text>
                </View>
            </Swipeout>
        );
    }
}

export default withTheme(MemoView);

//--------------------------------
// Styles
//--------------------------------
const styles = StyleSheet.create({
    container: {
        height: 48,
        paddingHorizontal: 24,
        backgroundColor: "#eee",
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        justifyContent: "center"
    },
    memoDelete: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    memoDeleteIcon: {
        color: "white"
    }
});