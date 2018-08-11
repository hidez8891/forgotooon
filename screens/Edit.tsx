import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Toolbar } from "react-native-material-ui";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { MemoState, updateMemo } from "../modules/memos";

//--------------------------------
// redux map functions
//--------------------------------
const mapStateToProps = (state: MemoState) => {
  return state.memos.find(v => v.id === state.select);
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updater: (id: string, text: string) => dispatch(updateMemo(id, text))
  };
};

//--------------------------------
// Screen definition
//--------------------------------

// Screen Props
type Props = NavigationScreenProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

// Screen States
type States = {
  text: string;
};

// Edit Screen Component
class EditScreen extends Component<Props, States> {
  // constructor
  constructor(props: Props) {
    super(props);

    this.state = {
      text: props.text
    };
  }

  // rendering
  render() {
    return (
      <View style={styles.body}>
        {/* header */}
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="Update Memo"
        />

        {/* input area */}
        <View style={styles.textArea}>
          <Text style={styles.textLabel}>memo</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            underlineColorAndroid="transparent"
          />
        </View>

        {/* submit button */}
        <View style={styles.buttonArea}>
          <Button
            accent={true}
            raised={true}
            text="Update"
            icon="create"
            onPress={this.onUpdateMemo.bind(this)}
          />
        </View>
      </View>
    );
  }

  // update memo text
  onUpdateMemo() {
    const { id } = this.props;
    const { text } = this.state;
    this.props.updater(id, text);
    this.props.navigation.goBack();
  }
}

//--------------------------------
// export
//--------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditScreen);

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
  },
  buttonArea: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-start"
  }
});
