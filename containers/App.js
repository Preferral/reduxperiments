import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

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

let mapStateToProps = function(state) {
  console.log("Mapping state to props");
  return {
    windows: state.app.windowIds.map((id) => {
      const oldWindow = state.windows[id];
      const mappedWindow = Object.assign({}, oldWindow);
      mappedWindow.key = id;
      mappedWindow.panes = oldWindow.paneIds.map((paneId) => {
        const oldPane = state.panes[paneId];
        const mappedPane = Object.assign({}, oldPane);
        mappedPane.key = paneId;
        mappedPane.tabs = oldPane.tabIds.map((tabId) => {
          const oldTab = state.tabs[tabId];
          return Object.assign({}, oldTab, { key: tabId, fileBuffer: Object.assign({}, state.fileBuffers[oldTab.fileBufferId], { id: oldTab.fileBufferId }) });
        });
        return mappedPane;
      });
      return mappedWindow;
    })
  }
}

export default connect(mapStateToProps)(App);
