import React, { Component } from 'react';
import Memos from './Memos';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addMemo } from '../modules/memos';

import {
    Toolbar,
    withTheme
} from 'react-native-material-ui';

import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';

import { NavigationScreenProps } from 'react-navigation';

type Props = NavigationScreenProps & {
    onAddMemo: (text: string) => void
}

type States = {
    text: string
}

class HomeView extends Component<Props, States> {
    constructor(props: Props) {
        super(props);

        this.state = {
            text: ""
        };
    }

    render() {
        const { primaryLightColor, accentLightColor } = (this.props as any).theme.palette;

        return (
            <KeyboardAvoidingView style={styles.body} behavior='padding'>
                <Toolbar key="top" centerElement="Memo" />

                <Memos />

                <View style={styles.inputArea}>
                    <TouchableOpacity
                        style={[styles.inputButton, { backgroundColor: accentLightColor }]}
                        onPress={this.onAddMemo.bind(this)}>

                        <Text style={styles.inputButtonText}>
                            +
                        </Text>
                    </TouchableOpacity>

                    <TextInput
                        style={[styles.textInput, { backgroundColor: primaryLightColor }]}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        underlineColorAndroid="transparent" />
                </View>
            </KeyboardAvoidingView>
        );
    }

    // add memo
    onAddMemo() {
        const { text } = this.state;
        this.props.onAddMemo(text);
        this.setState({ text: '' });
    }
}

//--------------------------------
// redux map functions
//--------------------------------
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onAddMemo: (text: string) => dispatch(addMemo(text)),
    };
};

//--------------------------------
// export
//--------------------------------
export default connect(null, mapDispatchToProps)(withTheme(HomeView));


//--------------------------------
// Styles
//--------------------------------
const styles = StyleSheet.create({
    body: {
        flex: 1,
        marginTop: 24
    },
    inputArea: {
        flexDirection: "row-reverse",
    },
    textInput: {
        flexGrow: 1,
        alignSelf: "stretch",
        color: "#fff",
        height: 48,
        paddingHorizontal: 24,
        backgroundColor: "#ccc",
    },
    inputButton: {
        height: 48,
        width: 48,
        justifyContent: "center",
        alignItems: "center"
    },
    inputButtonText: {
        color: "white",
        fontSize: 24
    }
});