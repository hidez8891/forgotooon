import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { MemoState, deleteMemo, addMemo } from '../modules/memos';
import Memo from '../components/Memo';

import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native';

type MemosViewProps = MemoState & {
    onDeleteMemo: (id: string) => void
}

class MemosView extends Component<MemosViewProps> {
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
            </View>
        );
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
    }
});