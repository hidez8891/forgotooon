import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { MemoState, deleteMemo, addMemo } from '../modules/memos';
import Memo from '../components/Memo';

import {
    View,
    ScrollView,
    StyleSheet,
    TextInput
} from 'react-native';

import {
    ActionButton
} from 'react-native-material-ui';

type MemosViewProps = MemoState & {
    onAddMemo: (text: string) => void
    onDeleteMemo: (id: string) => void
}

type MemosViewState = {
    text: string
}

class MemosView extends Component<MemosViewProps, MemosViewState> {
    constructor(props: MemosViewProps) {
        super(props);

        this.state = {
            text: ""
        }
    }

    render() {
        const memoViews = this.props.memos.map((memo) => {
            return (
                <Memo
                    key={memo.id}
                    id={memo.id}
                    text={memo.text}
                    deleter={() => this.onDeleteMemo(memo.id)}
                />
            );
        });

        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollContainer}>
                    {memoViews}
                </ScrollView>

                <TextInput
                    style={styles.textInput}
                    placeholder=">"
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent" />

                <ActionButton
                    icon="add"
                    onPress={this.onAddMemo.bind(this)} />
            </View>
        );
    }

    // add memo
    onAddMemo() {
        const { text } = this.state;
        this.props.onAddMemo(text);
        this.setState({ text: '' });
    }

    // delete memo
    onDeleteMemo(id: string) {
        this.props.onDeleteMemo(id);
    }
}

//--------------------------------
// redux map functions
//--------------------------------

const mapStateToProps = (state: MemoState) => {
    return {
        memos: state.memos,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onAddMemo: (text: string) => dispatch(addMemo(text)),
        onDeleteMemo: (id: string) => dispatch(deleteMemo(id)),
    };
};

//--------------------------------
// export
//--------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(MemosView);


//--------------------------------
// Styles
//--------------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        flex: 1,
    },
    textInput: {
        alignSelf: "stretch",
        color: "#fff",
        padding: 20,
        backgroundColor: "#252525",
        borderTopWidth: 2,
        borderTopColor: "#ededed",
    },
});