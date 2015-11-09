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

    console.log("Rendering pane: ")
    console.log(pane);

    const visibleTodos = matchingVisibleTodosForPaneFactory(visibilityFilter, searchTerm);

    return (
      <div>
        {pane.key}
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

export default Pane;
