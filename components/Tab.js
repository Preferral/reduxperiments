import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateFileBufferText } from '../actions.js';

class Tab extends Component {

  render() { // fileBuffer, scrollPosition
    const { dispatch, fileBuffer } = this.props;
    return (
      <div className="tab">
        <textarea
          rows="4"
          cols="26"
          onChange={(e) => {
            let action = updateFileBufferText(fileBuffer.id, e.target.value);
            dispatch(action);
          }}
          value={fileBuffer.text}
        />
      </div>
    );
  }
}



export default connect()(Tab);
