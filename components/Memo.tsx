import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, withTheme } from "react-native-material-ui";
import Swipeout from "react-native-swipeout";
import { ThemeTypes } from "../theme";

type MemoViewProps = {
  id: string;
  text: string;
  deleter: () => void;
  updater: () => void;
  theme: ThemeTypes;
};

class MemoView extends Component<MemoViewProps> {
  render() {
    const {
      palette: { primaryLightColor, accentLightColor }
    } = this.props.theme;

    const leftButtons = [
      {
        backgroundColor: primaryLightColor,
        text: <Icon name="create" />,
        onPress: this.props.updater
      }
    ];

    const rightButtons = [
      {
        backgroundColor: accentLightColor,
        text: <Icon name="delete" />,
        onPress: this.props.deleter
      }
    ];

    return (
      <Swipeout autoClose={true} left={leftButtons} right={rightButtons}>
        <View style={styles.container}>
          <Text>{this.props.text}</Text>
        </View>
      </Swipeout>
    );
  }
}

export default withTheme(MemoView);

//--------------------------------
// Styles
//--------------------------------
const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 24,
    backgroundColor: "#eee",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    justifyContent: "center"
  },
  memoDelete: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  memoDeleteIcon: {
    color: "white"
  }
});
