import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';

import { addWindow } from '../actions.js'
import EditorWindow from '../components/Window.js'
import { addPaneToWindow, addTabToPane } from '../actions.js'

class App extends Component {

  render() {
    const { windows, dispatch } = this.props;
    const windowComponents = windows.map((window) => {
      return <EditorWindow
        key={window.key}
        panes={window.panes}
        addPane={() => dispatch(addPaneToWindow(window.key))}
        addTabToPane={(paneId) => dispatch(addTabToPane(paneId))}
      />
    });

    return (
      <div className="app">
        <button onClick={()=>dispatch(addWindow())}>Add Window</button>
        <br/>
        {windowComponents}
      </div>
    )
  }
}

const appSelector = (state) => state.app;
const panesSelector = (state) => state.panes;
const windowsSelector = (state) => state.windows;

const mapStateToProps = createSelector(
  [appSelector, panesSelector, windowsSelector],
  (app, panes, windows) => {
    console.log("Mapping state to props");
    const unflattened =  {
      windows: app.windowIds.map((id) => {
        const oldWindow = windows[id];
        const mappedWindow = Object.assign({}, oldWindow);
        mappedWindow.key = id;
        mappedWindow.panes = oldWindow.paneIds.map((paneId) => {
          const oldPane = panes[paneId];
          const mappedPane = Object.assign({}, oldPane);
          mappedPane.key = paneId;
          return mappedPane;
        });
        return mappedWindow;
      })
    }
    console.log(unflattened);
    return unflattened;
  }
);

export default connect(mapStateToProps)(App);
