import { ADD_WINDOW, ADD_PANE_TO_WINDOW } from "../actions.js"

const initialWindowState = { paneIds: [] };
const windowReducer = function(state = initialWindowState, action) {
  switch(action.type) {
    case ADD_PANE_TO_WINDOW:
      return Object.assign({}, state, { paneIds: state.paneIds.concat(action.id) });
    default:
      return state;
  }
}

const windowsReducer = function(state = {}, action) {
  switch(action.type) {
    case ADD_PANE_TO_WINDOW:
      // Delegate to element reducer
      return Object.assign({}, state, { [action.windowId]: windowReducer(state[action.windowId], action) });
    case ADD_WINDOW:
      return Object.assign({}, state, { [action.id]: initialWindowState });
    default:
      return state;
  }
}

export default windowsReducer;
