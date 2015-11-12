import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';
import configureStore, {USE_DEV_TOOLS} from './store/configureStore'

let store = configureStore()
let rootElement = document.getElementById('root')

let debugPannel = USE_DEV_TOOLS ? (
  <DebugPanel top right bottom>
    <DevTools store={store} monitor={LogMonitor} />
  </DebugPanel>) : null;


render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
    {debugPannel}

  </div>,
  rootElement
)
