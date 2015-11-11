import { ADD_TAB_TO_PANE } from "../actions.js"

const initialTabState = {
  fileBufferId: 'asdgasdg'
}
const tabsReducer = function(state = {}, action) {
  switch(action.type) {
    case ADD_TAB_TO_PANE:
      return Object.assign({}, state, { [action.id]: initialTabState });
    default:
      return state;
  }
}

export default tabsReducer;
