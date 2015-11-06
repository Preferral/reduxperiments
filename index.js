import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';
import configureStore from './store/configureStore'


let store = configureStore()

let rootElement = document.getElementById('root')
render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  rootElement
)
