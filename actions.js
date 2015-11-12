/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const SET_PANE_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const CHANGE_THEME = 'CHANGE_THEME'
export const UPDATE_PANE_SEARCH = 'UPDATE_SEARCH';
export const ADD_PANE = 'ADD_PANE'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addPane() {
  return { type: ADD_PANE };
}

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }
}

export function setPaneVisibilityFilter(paneIdx, filter) {
  return { type: SET_PANE_VISIBILITY_FILTER, index: paneIdx, filter }
}

export function changeTheme() {
  return { type: CHANGE_THEME };
}

export function updatePaneSearch(paneIdx, searchTerm) {
  return {
    type: UPDATE_PANE_SEARCH,
    index: paneIdx,
    searchTerm
  };
}
