import { createSelector, createStructuredSelector } from 'reselect';
import { VisibilityFilters } from '../actions';
import { memoize } from 'lodash';

const resolver = function() {
  var args = Array.prototype.slice.call(arguments);
  return args.join();
}

const todosSelector = state => state.todos;
const currentThemeSelector = state => state.currentTheme;
const panesSelector = state => state.panes;

const visibleTodosForFilterFactorySelector = createSelector(
  todosSelector,
  (todos) => {
    console.log("(reselect) Generating a new visibleTodosFilterFactory because todos changed");
    return _.memoize((visibilityFilter) => {
      console.log("Lodash calling visible function for new filter " + visibilityFilter);
      switch (visibilityFilter) {
        case VisibilityFilters.SHOW_ALL:
          return todos
        case VisibilityFilters.SHOW_COMPLETED:
          return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
          return todos.filter(todo => !todo.completed)
      }
    }, resolver);
  }
)

const matchingVisibleTodosForPaneFactorySelector = createSelector(
  visibleTodosForFilterFactorySelector,
  (visibleTodosForFilterFactory) => {
    console.log("(reselect) generating a new matchingVisibleTodosForPaneFactory because visibleTodosFilterFactory changed");
    return _.memoize((visibilityFilter, searchTerm) => {
      console.log("Lodash calling matching function for " + visibilityFilter + " and " + searchTerm);
      const visibleTodos = visibleTodosForFilterFactory(visibilityFilter)
      console.log("Calculating matchingTodos for " + searchTerm);
      return visibleTodos.filter((todo) => {
        return todo.text.search(searchTerm) >= 0;
      });
    }, resolver);
  }
);

export const appSelector = createStructuredSelector({
  panes: panesSelector,
  matchingVisibleTodosForPaneFactory: matchingVisibleTodosForPaneFactorySelector,
  currentTheme: currentThemeSelector
});
