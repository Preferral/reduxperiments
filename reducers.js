import { combineReducers } from 'redux'
import { ADD_PANE, ADD_TODO, COMPLETE_TODO, SET_PANE_VISIBILITY_FILTER, CHANGE_THEME, VisibilityFilters, UPDATE_PANE_SEARCH } from './actions'
import combineCollectionReducers from './combineCollectionReducers'

const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_PANE_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

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

const paneElementReducer = combineReducers({
  visibilityFilter,
  searchTerm
});

function paneCollectionReducer(state = [], action) {
  switch(action.type) {
    case ADD_PANE:
      return state.concat(paneElementReducer(undefined, {type: null}));
    default:
      return state;
  }
}

const panes = combineCollectionReducers(paneCollectionReducer, paneElementReducer);
const todos = combineCollectionReducers(todoCollectionReducer, todoElementReducer);

const todoApp = combineReducers({
  panes,
  todos,
  currentTheme,
})

export default todoApp
