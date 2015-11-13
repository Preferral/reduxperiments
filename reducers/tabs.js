import { LOAD_FILE_BUFFER_IN_TAB, ADD_TAB_TO_PANE } from "../actions.js"

const initialTabState = {
  fileBufferId: null
}

const tabReducer = function(state = initialTabState, action) {
  switch(action.type) {
    case LOAD_FILE_BUFFER_IN_TAB:
      return  Object.assign({}, state, { fileBufferId: action.fileBufferKey });
    default:
      return state;
  }
}

const tabsReducer = function(state = {}, action) {
  switch(action.type) {
    case LOAD_FILE_BUFFER_IN_TAB:
      return Object.assign({}, state, { [action.tabId]: tabReducer(state[action.id], action) });
    case ADD_TAB_TO_PANE:
      return Object.assign({}, state, { [action.id]: initialTabState });
    default:
      return state;
  }
}

export default tabsReducer;
