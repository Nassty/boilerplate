import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import menu from 'reducers/menu';

export default combineReducers({
  routing: routerReducer,
  menu
});
