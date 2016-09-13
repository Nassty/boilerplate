import {OPEN_MENU, CLOSE_MENU, TOGGLE_MENU} from 'actions/menu';

const reducer = (state=false, action) => {
  switch (action.type) {
    case OPEN_MENU:
      return true;
    case CLOSE_MENU:
      return false;
    case TOGGLE_MENU:
      return !state;
    default:
      return state;
  }
};

export default reducer;
