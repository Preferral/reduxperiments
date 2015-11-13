import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addTabToPane} from '../actions.js'

import Tab from './Tab.js';

class Pane extends Component {
  render() {
    console.log("Rendering a Pane component");
    const { dispatch, pane, paneId } = this.props;
    const tabComponents = pane.tabIds.map((tabId) => {
      return <Tab tabId={tabId}/>
    });

    return (
      <div className="pane">
        <button onClick={() => dispatch(addTabToPane(paneId))}>Add Tab</button>
        <br/>
        {tabComponents}
      </div>
    )
  }
}

const mapStateToProps = function(state, existingProps) {
  return {
    pane: state.panes[existingProps.paneId]
  }
}

export default connect(mapStateToProps)(Pane);
