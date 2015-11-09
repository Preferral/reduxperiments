import React, { PropTypes, Component } from 'react';
import { addTodo, completeTodo } from '../actions'
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';

class Pane extends Component {
  render() {
    const {
      dispatch,
      pane,
      matchingVisibleTodosForPaneFactory,
      updateSearch,
      setVisibilityFilter,
      ...props
    } = this.props;

    const { visibilityFilter, searchTerm } = pane;

    const visibleTodos = matchingVisibleTodosForPaneFactory(pane);

    return (
      <div>
        Search: <input type="text" value={searchTerm} onChange={updateSearch} />
        <br />
        <AddTodo onAddClick={ text => dispatch(addTodo(text)) } />
        <TodoList
          todos={visibleTodos}
          onTodoClick={ index => dispatch(completeTodo(index)) }
        />
        <Footer
          filter={visibilityFilter}
          onFilterChange={setVisibilityFilter}
        />
      </div>
    );
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
};

export default Pane;
