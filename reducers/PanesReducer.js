import { combineReducers } from 'redux'
import { ADD_PANE, SET_PANE_VISIBILITY_FILTER, VisibilityFilters, UPDATE_PANE_SEARCH } from '../actions'
import combineCollectionReducers from './combineCollectionReducers'

const { SHOW_ALL } = VisibilityFilters

function searchTerm(state = '', action) {
  switch (action.type) {
    case UPDATE_PANE_SEARCH:
      return action.searchTerm;
    default:
      return state;
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_PANE_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
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

export const panes = combineCollectionReducers(paneCollectionReducer, paneElementReducer);
