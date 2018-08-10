import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
    COLOR
} from 'react-native-material-ui';

import {
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
    deleter: (event: GestureResponderEvent) => void
};

class MemoView extends Component<MemoViewProps> {
    render() {
        const { primaryLightColor } = (this.props as any).theme.palette;

        return (
            <ListItem
                divider={true}
                centerElement={
                    <Text>
                        {this.props.text}
                    </Text>
                }
                rightElement={
                    <TouchableOpacity
                        style={[styles.memoDelete, { backgroundColor: primaryLightColor }]}
                        onPress={this.props.deleter}>

                        <Icon name="delete" color="white" />
                    </TouchableOpacity>
                }
                style={{
                    rightElementContainer: { paddingRight: 0 },
                }}
            />
        );
    }
}

export default withTheme(MemoView);

//--------------------------------
// Styles
//--------------------------------
const styles = StyleSheet.create({
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