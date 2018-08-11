import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Toolbar, withTheme } from "react-native-material-ui";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addMemo, selectMemo } from "../modules/memos";
import { ThemeTypes } from "../theme";
import Memos from "./Memos";

//--------------------------------
// redux map functions
//--------------------------------
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAddMemo: (text: string) => dispatch(addMemo(text)),
    onSelectMemo: (id: string) => dispatch(selectMemo(id))
  };
};

//--------------------------------
// Screen definition
//--------------------------------

// Screen Props
type Props = NavigationScreenProps &
  ReturnType<typeof mapDispatchToProps> & {
    theme: ThemeTypes;
  };

// Screen States
type States = {
  text: string;
};

// Home Screen Component
class HomeScreen extends Component<Props, States> {
  // constructor
  constructor(props: Props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  // rendering
  render() {
    const {
      palette: { primaryLightColor, accentLightColor }
    } = this.props.theme;

    return (
      <KeyboardAvoidingView style={styles.body} behavior="padding">
        {/* header */}
        <Toolbar key="top" centerElement="Memo" />

        {/* memo list */}
        <Memos onUpdateMemo={id => this.onUpdateMemo(id)} />

        {/* footer: text input */}
        <View style={styles.inputArea}>
          {/* right: input button*/}
          <TouchableOpacity
            style={[styles.inputButton, { backgroundColor: accentLightColor }]}
            onPress={this.onAddMemo.bind(this)}
          >
            <Text style={styles.inputButtonText}>+</Text>
          </TouchableOpacity>

          {/* left: input area*/}
          <TextInput
            style={[styles.textInput, { backgroundColor: primaryLightColor }]}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            underlineColorAndroid="transparent"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  // add memo text
  onAddMemo() {
    const { text } = this.state;
    this.props.onAddMemo(text);
    this.setState({ text: "" });
  }

  // update memo text
  onUpdateMemo(id: string) {
    this.props.onSelectMemo(id);
    this.props.navigation.navigate("Edit");
  }
}

//--------------------------------
// export
//--------------------------------
export default connect(
  null,
  mapDispatchToProps
)(withTheme(HomeScreen));

//--------------------------------
// Styles
//--------------------------------
const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 24
  },
  inputArea: {
    flexDirection: "row-reverse"
  },
  textInput: {
    flexGrow: 1,
    alignSelf: "stretch",
    color: "#333",
    height: 48,
    paddingHorizontal: 24,
    backgroundColor: "#ccc"
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
