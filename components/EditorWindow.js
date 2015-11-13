import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pane from './Pane.js'
import { addPaneToWindow } from '../actions.js'

class EditorWindow extends Component {

  render() {
    console.log("Rendering an EditorWindow");
    const { dispatch, editorWindow, editorWindowId } = this.props;
    const paneComponents = editorWindow.paneIds.map((paneId) => {
      return <Pane paneId={paneId}/>
    });

    return (
      <div className="window">
        <button onClick={() => dispatch(addPaneToWindow(editorWindowId))}>Add Pane</button>
        <br/>
        {paneComponents}
      </div>
    );

  }

}

const mapStateToProps = function(state, existingProps) {
  return {
    editorWindow: state.windows[existingProps.editorWindowId]
  };
}

export default connect(mapStateToProps)(EditorWindow);
