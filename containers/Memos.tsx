import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { MemoState, deleteMemo, addMemo } from '../modules/memos';
import Memo from '../components/Memo';

import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';

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
                <View style={styles.header}>
                    <Text style={styles.headerText}>- MEMO -</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {memoViews}
                </ScrollView>

                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder=">memo"
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        placeholderTextColor="white"
                        underlineColorAndroid="transparent" />
                </View>

                <TouchableOpacity
                    onPress={this.onAddMemo.bind(this)}
                    style={styles.addButton}>

                    <Text style={styles.addButtonText}>
                        +
                    </Text>
                </TouchableOpacity>
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
    header: {
        backgroundColor: "#E91E63",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 10,
        borderBottomColor: "#ddd"
    },
    headerText: {
        color: "white",
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textInput: {
        alignSelf: "stretch",
        color: "#fff",
        padding: 20,
        backgroundColor: "#252525",
        borderTopWidth: 2,
        borderTopColor: "#ededed",
    },
    addButton: {
        position: "absolute",
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: "#E91E63",
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        elevation: 8,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 24,
    },
});