import * as React from "react";
import { NativeModules } from "react-native";
import { getTheme, ThemeContext } from "react-native-material-ui";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { memoReducer } from "./modules/memos";
import Router from "./Router";
import { theme } from "./theme";

const store = createStore(memoReducer);

const UIManager = NativeModules.UIManager;

export default class App extends React.Component {
  componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <ThemeContext.Provider value={getTheme(theme)}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ThemeContext.Provider>
    );
  }
}
