import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateFileBufferText, loadFileBufferInTab } from '../actions.js';

class Tab extends Component {

  render() {
    console.log("Rendering a tab component");
    const { dispatch, fileBufferId, fileBuffer, fileBufferKeys, tabId } = this.props;
    let textarea = null;
    if(fileBufferId) {
      textarea = (
        <textarea
          rows="4"
          cols="26"
          onChange={(e) => {
            let action = updateFileBufferText(fileBufferId, e.target.value);
            dispatch(action);
          }}
          value={fileBuffer.text}
        />
      )
    }

    return (
      <div className="tab">
        <select onChange={(e) => dispatch(loadFileBufferInTab(tabId, e.target.value))}>
          <option>Select a FileBuffer</option>
          { fileBufferKeys.map((key) => <option value={key}>{key}</option>) }
        </select>
        {textarea}
      </div>
    );
  }
}

function mapStateToProps(state, existingProps) {
  const tab = state.tabs[existingProps.tabId];
  const fileBufferKeys =  Object.keys(state.fileBuffers);
  if(tab.fileBufferId) {
    return {
      fileBuffer: state.fileBuffers[tab.fileBufferId],
      fileBufferId: tab.fileBufferId,
      fileBufferKeys: fileBufferKeys
    }
  }
  else {
    return {
      fileBufferKeys: fileBufferKeys
    }
  }
}

export default connect(mapStateToProps)(Tab);
