import { ADD_PANE_TO_WINDOW, ADD_TAB_TO_PANE } from "../actions.js"


const initialPaneState = { tabIds: [] };

const paneReducer = function(state = initialPaneState, action) {
  switch(action.type) {
    case ADD_TAB_TO_PANE:
      return Object.assign({}, state, { tabIds: state.tabIds.concat(action.id) });
    default:
      return state;
  }
}

const panesReducer = function(state = {}, action) {
  switch(action.type) {
    case ADD_TAB_TO_PANE:
      // Delegate to element reducer
      return Object.assign({}, state, { [action.paneId]: paneReducer(state[action.paneId], action) });
    case ADD_PANE_TO_WINDOW:
      return Object.assign({}, state, { [action.id]: initialPaneState });
    default:
      return state;
  }
}

export default panesReducer;
