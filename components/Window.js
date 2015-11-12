import React, { Component } from 'react'

import Pane from './Pane.js'


class EditorWindow extends Component {

  render() {
    const { panes } = this.props;

    const paneComponents = panes.map((pane) => {
      return <Pane
        addTab={() => this.props.addTabToPane(pane.key)}
        tabIds={pane.tabIds}
        key={pane.key}
      />
    });

    return (
      <div className="window">
        <button onClick={this.props.addPane}>Add Pane</button>
        <br/>
        {paneComponents}
      </div>
    );

  }

}

export default EditorWindow
