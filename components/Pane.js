import React, { Component } from 'react';

import Tab from './Tab.js';

class Pane extends Component {
  render() {
    const { tabIds, addTab } = this.props;
    console.log("Rendering a Pane component");
    const tabComponents = tabIds.map((tabId) => {
      return <Tab tabId={tabId}/>
    });

    return (
      <div className="pane">
        <button onClick={addTab}>Add Tab</button>
        <br/>
        {tabComponents}
      </div>
    )
  }
}

export default Pane;
