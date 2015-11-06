import React, { Component, PropTypes } from 'react'
import Todo from './Todo'
import { VisibilityFilters } from '../actions'

export default class TodoList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.filter !== this.props.filter || nextProps.todos !== this.props.todos;
  }

  visibleTodos() {
    return function(todos, filter) {
      console.log("Recalculating visibleTodos");
      switch (filter) {
        case VisibilityFilters.SHOW_ALL:
          return todos;
        case VisibilityFilters.SHOW_COMPLETED:
          return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
          return todos.filter(todo => !todo.completed)
      }
    }(this.props.todos, this.props.filter);
  }

  render() {
    return (
      <ul>
        {this.visibleTodos().map((todo, index) =>
          <Todo {...todo}
                key={index}
              onClick={() => this.props.onTodoClick(index)} />
        )}
      </ul>
    )
  }
}

TodoList.propTypes = {
  filter: PropTypes.string.isRequired,
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}
