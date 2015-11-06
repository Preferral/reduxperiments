import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, changeTheme, VisibilityFilters } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.lastFilter = null;
    this.lastTodos = null;
    this.memoizedVisibleTodos = null;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.todos !== this.props.todos || nextProps.visibilityFilter !== this.props.visibilityFilter) {
      this.memoizedVisibleTodos = null;
    }
  }

  visibleTodos() {
    // If this is expensive, let's memoize it manually first.
    this.memoizedVisibleTodos = this.memoizedVisibleTodos || function(todos, filter) {
      console.log("Recalculating visibleTodos");
      switch (filter) {
        case VisibilityFilters.SHOW_ALL:
          return todos;
        case VisibilityFilters.SHOW_COMPLETED:
          return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
          return todos.filter(todo => !todo.completed)
      }
    }(this.props.todos, this.props.visibilityFilter);
    return this.memoizedVisibleTodos;
  }

  render() {
    console.log(this.props);
    // Injected by connect() call:
    const { dispatch, visibleTodos, visibilityFilter, currentTheme } = this.props
    return (
      <div className={currentTheme}>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))
          } />
        <TodoList
          todos={this.visibleTodos()}
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

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    todos: state.todos,
    visibilityFilter: state.visibilityFilter,
    currentTheme: state.currentTheme
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
