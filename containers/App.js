import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EditorWindow from '../components/EditorWindow.js'
import { addWindow, addPaneToWindow, addTabToPane,addFileBuffer } from '../actions.js'

class App extends Component {

  render() {
    console.log("Rendering AppComponent");
    const { editorWindowIds, dispatch } = this.props;
    const windowComponents = editorWindowIds.map((editorWindowId) => {
      return <EditorWindow editorWindowId={editorWindowId}/>
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

const mapStateToProps = function(state) {
  return {
    editorWindowIds: state.app.windowIds
  };
}

export default connect(mapStateToProps)(App);
