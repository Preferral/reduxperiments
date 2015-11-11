import { ADD_WINDOW } from "../actions.js"

const appReducer = function(state = { windowIds: [] }, action) {
  switch(action.type) {
  case ADD_WINDOW:
    return Object.assign({}, state, { windowIds: state.windowIds.concat(action.id) });
  default:
    return state;
  }
}

export default appReducer;
