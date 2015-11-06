import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, changeTheme, VisibilityFilters, updateSearch } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'
import { memoize, createMemoizedFunction } from '../memoize'
import { createSelector, createStructuredSelector } from 'reselect';

class App extends Component {

  updateSearch = function(e) {
    const { dispatch } = this.props;
    dispatch(updateSearch(e.target.value));
  }

  render() {
    console.log(this.props);
    // Injected by connect() call:
    const { dispatch, matchingVisibleTodos, currentTheme, searchTerm, visibilityFilter } = this.props
    return (
      <div className={currentTheme}>
        Search: <input type="text" value={searchTerm} onChange={this.updateSearch.bind(this)}/><br/>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))
          } />
        <TodoList
          todos={matchingVisibleTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
        <button onClick={() => dispatch(changeTheme())}>Change Theme</button>
      </div>
    )
  }
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })),
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectVisibleTodos(todos, filter) {
  console.log("Recalculating selectTodos");
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

function selectMatchingTodos(todos, search) {
  console.log("Recalculating matchingTodos");
  return todos.filter((todo) => { return todo.text.search(search) >= 0; });
}

const todosSelector = state => state.todos;
const visibilityFilterSelector = state => state.visibilityFilter;
const currentThemeSelector = state => state.currentTheme;
const searchTermSelector = state => state.searchTerm;

const visibleTodosSelector = createSelector(
  [todosSelector, visibilityFilterSelector],
  selectVisibleTodos
);

const matchingVisibleTodosSelector = createSelector(
  [visibleTodosSelector, searchTermSelector],
  selectMatchingTodos
);

export const select = createStructuredSelector({
  matchingVisibleTodos: matchingVisibleTodosSelector,
  visibilityFilter: visibilityFilterSelector,
  currentTheme: currentThemeSelector,
  searchTerm: searchTermSelector
});

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
