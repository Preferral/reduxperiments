import { ADD_FILE_BUFFER, UPDATE_FILE_BUFFER_TEXT } from "../actions.js"

const initialFileBufferState = {
  text: "enter text here"
}
const fileBufferReducer = function(state, action) {
  switch(action.type) {
    case UPDATE_FILE_BUFFER_TEXT:
      return Object.assign({}, state, { text: action.newText });
    default:
      return state;
  }
}

const fileBuffersReducer = function(state = {}, action) {
  switch(action.type) {
    case ADD_FILE_BUFFER:
      return Object.assign({}, state, { [action.id]: initialFileBufferState });
    case UPDATE_FILE_BUFFER_TEXT:
      return Object.assign({}, state, { [action.id]: fileBufferReducer(state[action.id], action) });
    default:
      return state;
  }
}

export default fileBuffersReducer
