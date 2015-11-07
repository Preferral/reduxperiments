import { combineReducers } from 'redux'
import { ADD_PANE, ADD_TODO, COMPLETE_TODO, SET_PANE_VISIBILITY_FILTER, CHANGE_THEME, VisibilityFilters, UPDATE_PANE_SEARCH } from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_PANE_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

function currentTheme(state = 'theme-green', action) {
  switch (action.type) {
    case CHANGE_THEME:
      return state == 'theme-green' ? 'theme-blue' : 'theme-green';
    default:
      return state
  }
}

function searchTerm(state = '', action) {
  switch (action.type) {
    case UPDATE_PANE_SEARCH:
      return action.searchTerm;
    default:
      return state;
  }
}

const paneReducer = combineReducers({
  visibilityFilter,
  searchTerm
});

function panes(state = [], action) {
  console.log("running panes reducer for action: ");
  console.log(action);
  switch(action.type) {
    case ADD_PANE:
      console.log("adding pane");
      return state.concat(paneReducer(undefined, {type: null}));
    case SET_PANE_VISIBILITY_FILTER:
    case UPDATE_PANE_SEARCH:
      return state.map((pane, idx) => idx === action.index ? paneReducer(pane, action) : pane);
    default:
      return state;
  }
}

const todoApp = combineReducers({
  panes,
  todos,
  currentTheme,
})

export default todoApp
