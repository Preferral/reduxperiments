import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setPaneVisibilityFilter, changeTheme, VisibilityFilters, updatePaneSearch, addPane } from '../actions'
import { memoize, createMemoizedFunction } from '../memoize'
import { createSelector, createStructuredSelector } from 'reselect';
import { appSelector } from '../selectors/AppSelector';
import Pane from '../components/Pane';


class App extends Component {

  render() {
    const { dispatch, panes, currentTheme, ...props } = this.props

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
        key={pane.key}
        dispatch={dispatch}
        pane={pane}
        updateSearch={createUpdatePaneSearch(idx)}
        setVisibilityFilter={createSetVisibilityFilter(idx)}
        {...props}
      />
    );

    return (
      <div className={currentTheme}>
        {paneComponents}
        <button onClick={() => dispatch(addPane())}>Add Pane</button>
        <button onClick={() => dispatch(changeTheme())}>Change Theme</button>
      </div>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(appSelector)(App);
