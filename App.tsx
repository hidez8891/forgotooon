import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Memos from './containers/Memos';
import { memoReducer } from './modules/memos';

const store = createStore(memoReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Memos />
      </Provider>
    );
  }
}