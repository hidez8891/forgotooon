import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NativeModules } from 'react-native';

import Memos from './containers/Memos';
import { memoReducer } from './modules/memos';

import {
  COLOR,
  Toolbar,
  ThemeContext,
  getTheme
} from 'react-native-material-ui';

import {
  StyleSheet,
  View,
} from 'react-native';

const store = createStore(memoReducer);

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
    primaryLightColor: COLOR.green300,
    accentColor: COLOR.red500,
  },
};

const UIManager = NativeModules.UIManager;

export default class App extends React.Component {
  componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Provider store={store}>
          <View style={styles.container}>
            <View style={styles.padding} />
            <Toolbar key="top" centerElement="Memo" />
            <Memos />
          </View>
        </Provider>
      </ThemeContext.Provider>
    );
  }
}

//--------------------------------
// Styles
//--------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    height: 24,
  },
});