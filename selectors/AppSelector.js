import { createSelector, createStructuredSelector } from 'reselect';
import { VisibilityFilters } from '../actions';
import { memoize } from 'lodash';

const todosSelector = state => state.todos;
const currentThemeSelector = state => state.currentTheme;
const panesSelector = state => state.panes;

const visibleTodosForFilterFactorySelector = createSelector(
  todosSelector,
  (todos) => _.memoize((visibilityFilter) => {
    return _.filter(todos, (todo) => {
      switch (visibilityFilter) {
        case VisibilityFilters.SHOW_ALL:
          return todos
        case VisibilityFilters.SHOW_COMPLETED:
          return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
          return todos.filter(todo => !todo.completed)
      }
    });
  })
)

const matchingVisibleTodosForPaneFactorySelector = createSelector(
  visibleTodosForFilterFactorySelector,
  (visibleTodosForFilterFactory) => _.memoize((args) => {
    const filter = pane.visibilityFilter;
    const visibleTodos = visibleTodosForFilterFactory(filter)
    const searchTerm = pane.searchTerm;

    return visibleTodos.filter((todo) => {
      return todo.text.search(searchTerm) >= 0;
    });
  })
);

export const appSelector = createStructuredSelector({
  panes: panesSelector,
  matchingVisibleTodosForPaneFactory: matchingVisibleTodosForPaneFactorySelector,
  currentTheme: currentThemeSelector
});
