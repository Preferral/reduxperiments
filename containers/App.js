import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';

import { addWindow } from '../actions.js'
import EditorWindow from '../components/EditorWindow.js'
import { addPaneToWindow, addTabToPane,addFileBuffer } from '../actions.js'


class App extends Component {

  render() {
    console.log("Rendering AppComponent");
    const { windows, dispatch, fileBufferKeys } = this.props;
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
        <button onClick={()=>dispatch(addFileBuffer())}>Add FileBuffer</button>
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
    console.log("Recalculating main selector");
    const unflattened =  {
      windows: app.windowIds.map((id) => {
        const oldWindow = windows[id];
        const mappedWindow = Object.assign({}, oldWindow);
        mappedWindow.key = id;
        mappedWindow.panes = oldWindow.paneIds.map((paneId) => {
          return Object.assign({}, panes[paneId], { key: paneId });
        });
        return mappedWindow;
      })
    }
    console.log(unflattened);
    return unflattened;
  }
);

export default connect(mapStateToProps)(App);
