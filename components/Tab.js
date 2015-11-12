import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateFileBufferText } from '../actions.js';

class Tab extends Component {

  render() { // fileBuffer, scrollPosition
    const { dispatch, fileBufferId, fileBuffer } = this.props;
    return (
      <div className="tab">
        <textarea
          rows="4"
          cols="26"
          onChange={(e) => {
            let action = updateFileBufferText(fileBufferId, e.target.value);
            dispatch(action);
          }}
          value={fileBuffer.text}
        />
      </div>
    );
  }
}

function mapStateToProps(state, existingProps) {
  console.log("existing tab props are:");
  console.log(existingProps);
  const tab = state.tabs[existingProps.tabId];
  return {
    fileBuffer: state.fileBuffers[tab.fileBufferId],
    fileBufferId: tab.fileBufferId

  }
}

export default connect(mapStateToProps)(Tab);
