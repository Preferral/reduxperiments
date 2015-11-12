import { ADD_TODO, COMPLETE_TODO } from '../actions'
import combineCollectionReducers from './combineCollectionReducers'

function todoElementReducer(state, action) {
  switch(action.type) {
    case COMPLETE_TODO:
      return Object.assign({}, state, { completed: true });
    default:
      return state;
  }
}

function todoCollectionReducer(state = [], action) {
  switch(action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    default:
      return state;
  }
}

export const todos = combineCollectionReducers(todoCollectionReducer, todoElementReducer);
