import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
    View,
    Text,
    TouchableOpacity,
    GestureResponderEvent
} from 'react-native';

type MemoViewProps = {
    id: string
    text: string
    deleter: (event: GestureResponderEvent) => void
};

export default class MemoView extends Component<MemoViewProps> {
    render() {
        return (
            <View
                key={this.props.id}
                style={styles.memo}>

                <Text style={styles.text}>
                    {this.props.text}
                </Text>

                <TouchableOpacity
                    onPress={this.props.deleter}
                    style={styles.memoDelete}>

                    <Text style={styles.memoDeleteText}>
                        D
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

//--------------------------------
// Styles
//--------------------------------
const styles = StyleSheet.create({
    memo: {
        position: "relative",
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: "#ededed",
    },
    text: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: "#e91e63",
    },
    memoDelete: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2980b9",
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
    },
    memoDeleteText: {
        color: "white"
    }
});