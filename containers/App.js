import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setPaneVisibilityFilter, changeTheme, VisibilityFilters, updatePaneSearch, addPane } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'
import { memoize, createMemoizedFunction } from '../memoize'
import { createSelector, createStructuredSelector } from 'reselect';

class Pane extends Component {

  render() {
    const { dispatch, updateSearch, setVisibilityFilter, searchTerm, visibilityFilter, matchingVisibleTodos } = this.props;

    return (
      <div>
        Search: <input type="text" value={searchTerm} onChange={updateSearch}/><br/>
        <AddTodo
          onAddClick={text => dispatch(addTodo(text)) } />
        <TodoList
          todos={matchingVisibleTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={setVisibilityFilter}
        />
        </div>
    );
  }
}


class App extends Component {

  render() {
    console.log(this.props);
    const { dispatch, panes, currentTheme, matchingVisibleTodos } = this.props

    var createUpdatePaneSearch = function(paneIdx) {
      return (e) => {
        dispatch(updatePaneSearch(paneIdx, e.target.value));
      };
    }

    var createSetVisibilityFilter = function(paneIdx) {
      return (filter) => {
        dispatch(setPaneVisibilityFilter(paneIdx, filter));
      }
    }

    let paneComponents = panes.map((pane, idx) =>
      <Pane
        dispatch={dispatch}
        updateSearch={createUpdatePaneSearch(idx)}
        setVisibilityFilter={createSetVisibilityFilter(idx)}
        searchTerm={pane.searchTerm}
        visibilityFilter={pane.visibilityFilter}
        matchingVisibleTodos={matchingVisibleTodos[idx]}
      />
    );

    // console.log("Pane components are:");
    // console.log(paneComponents);

    return (
      <div className={currentTheme}>
        {paneComponents}
        <button onClick={() => dispatch(addPane())}>Add Pane</button>
        <button onClick={() => dispatch(changeTheme())}>Change Theme</button>
      </div>
    )
  }
}

Pane.propTypes = {
  matchingVisibleTodos: PropTypes.arrayOf(PropTypes.shape({
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
// const visibilityFilterSelector = state => state.visibilityFilter;
const currentThemeSelector = state => state.currentTheme;
// const searchTermSelector = state => state.searchTerm;
const panesSelector = state => state.panes;

// const visibleTodosSelector = createSelector(
//   [todosSelector, visibilityFilterSelector],
//   selectVisibleTodos
// );

// const matchingVisibleTodosSelector = createSelector(
//   [visibleTodosSelector, searchTermSelector],
//   selectMatchingTodos
// );

const matchingVisibleTodosSelector = createSelector(
  [state => state.panes, state => state.todos],
  (panes, todos) => panes.map( (pane) => selectMatchingTodos(selectVisibleTodos(todos, pane.visibilityFilter), pane.searchTerm) )
);

const select = createStructuredSelector({
  panes: panesSelector,
  matchingVisibleTodos: matchingVisibleTodosSelector,
  currentTheme: currentThemeSelector,
});

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
