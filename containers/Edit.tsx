import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addMemo } from '../modules/memos';

import {
    Toolbar,
    Button
} from 'react-native-material-ui';

import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';

import { NavigationScreenProps } from 'react-navigation';

type EditViewProps = NavigationScreenProps & {
    onAddMemo: (text: string) => void
}

interface EditViewStates {
    text: string
}

class EditView extends Component<EditViewProps, EditViewStates> {
    constructor(props: EditViewProps) {
        super(props);

        this.state = {
            text: ""
        };
    }

    render() {
        return (
            <View style={styles.body}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.goBack()}
                    centerElement="Add Memo" />

                <View style={styles.textArea}>
                    <Text style={styles.textLabel}>
                        memo
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        underlineColorAndroid="transparent" />
                </View>

                <View style={{ flex: 1, justifyContent: "center", flexDirection: "row", alignItems: "flex-start" }}>
                    <Button
                        accent={true}
                        raised={true}
                        text="Add"
                        icon="add"
                        onPress={this.onAddMemo.bind(this)} />
                </View>
            </View>
        );
    }

    // add memo
    onAddMemo() {
        const { text } = this.state;
        this.props.onAddMemo(text);
        this.setState({ text: '' });
        this.props.navigation.goBack();
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
export default connect(null, mapDispatchToProps)(EditView);


//--------------------------------
// Styles
//--------------------------------
const styles = StyleSheet.create({
    body: {
        flex: 1,
        marginTop: 24
    },
    textArea: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10
    },
    textLabel: {
        fontSize: 12,
        color: "#333"
    },
    textInput: {
        alignSelf: "stretch",
        borderBottomWidth: 2,
        borderBottomColor: "#333"
    }
});