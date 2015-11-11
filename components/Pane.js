import React, { Component } from 'react';

import Tab from './Tab.js';

class Pane extends Component {
  render() {
    const { tabs, addTab } = this.props;
    const tabComponents = tabs.map((tab) => {
      return <Tab
        key={tab.key}
        fileBuffer={tab.fileBuffer}
      />
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
