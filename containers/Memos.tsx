import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Memo from "../components/Memo";
import { deleteMemo, MemoState } from "../modules/memos";

//--------------------------------
// redux map functions
//--------------------------------
const mapStateToProps = (state: MemoState) => {
  return {
    memos: state.memos
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onDeleteMemo: (id: string) => dispatch(deleteMemo(id))
  };
};

//--------------------------------
// view component definition
//--------------------------------
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    onUpdateMemo: (id: string) => void;
  };

// Memo List View Component
class MemosView extends Component<Props> {
  // constructor
  constructor(props: Props) {
    super(props);
  }

  // rendering
  render() {
    const memoViews = this.props.memos.map(memo => {
      return (
        <Memo
          key={memo.id}
          id={memo.id}
          text={memo.text}
          deleter={() => this.onDeleteMemo(memo.id)}
          updater={() => this.onUpdateMemo(memo.id)}
        />
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>{memoViews}</ScrollView>
      </View>
    );
  }

  // delete memo
  onDeleteMemo(id: string) {
    this.props.onDeleteMemo(id);
  }

  // update memo
  onUpdateMemo(id: string) {
    this.props.onUpdateMemo(id);
  }
}

//--------------------------------
// export
//--------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemosView);

//--------------------------------
// Styles
//--------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flex: 1
  }
});
