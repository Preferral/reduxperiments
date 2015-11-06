import { expect } from 'chai';

import { select } from '../containers/App';

describe('App', () => {
  describe('select function', () => {

    describe('matchingVisibleTodos', () => {
      const allTodos = [
        { text: 'a', completed: false },
        { text: 'ab', completed: true },
        { text: 'b', completed: false },
        { text: 'bc', completed: true }
      ];

      it('returns all todos with empty search term and SHOW_ALL filter', () => {
        const state = {
          todos: allTodos,
          searchTerm: '',
          visibilityFilter: 'SHOW_ALL'
        };
        expect(select(state).matchingVisibleTodos).to.eql(allTodos);
      });

      it('applies visibilty filter', () => {
        const state = {
          todos: allTodos,
          searchTerm: '',
          visibilityFilter: 'SHOW_COMPLETED'
        };
        expect(select(state).matchingVisibleTodos).to.eql([
          { text: 'ab', completed: true },
          { text: 'bc', completed: true }
        ]);
      });

      it('applies the search term', () => {
        const state = {
          todos: allTodos,
          searchTerm: 'a',
          visibilityFilter: 'SHOW_ALL'
        };
        expect(select(state).matchingVisibleTodos).to.eql([
          { text: 'a', completed: false },
          { text: 'ab', completed: true }
        ]);
      });
    });
  });
});
