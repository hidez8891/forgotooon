import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { MemoState, updateMemo } from '../modules/memos';

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
    id: string
    text: string
    updater: (id: string, text: string) => void
}

interface EditViewStates {
    text: string
}

class EditView extends Component<EditViewProps, EditViewStates> {
    constructor(props: EditViewProps) {
        super(props);

        this.state = {
            text: props.text
        };
    }

    render() {
        return (
            <View style={styles.body}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.goBack()}
                    centerElement="Update Memo" />

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
                        text="Update"
                        icon="create"
                        onPress={this.onUpdateMemo.bind(this)} />
                </View>
            </View>
        );
    }

    // add memo
    onUpdateMemo() {
        const { id } = this.props;
        const { text } = this.state;
        this.props.updater(id, text);
        this.props.navigation.goBack();
    }
}

//--------------------------------
// redux map functions
//--------------------------------

const mapStateToProps = (state: MemoState) => {
    return state.memos.find((v) => v.id === state.select)
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updater: (id: string, text: string) => dispatch(updateMemo(id, text)),
    };
};

//--------------------------------
// export
//--------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(EditView);


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