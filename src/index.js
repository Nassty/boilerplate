import React from 'react';
import ReactDOM from 'react-dom';
import Application from 'containers/Application';
import createStore from 'store';
import {Provider} from 'react-redux';

const element = document.getElementById('content');
const store = createStore();

ReactDOM.render(
  <Provider store={store} key={"provider"}>
    <Application />
  </Provider>,
  element
);
