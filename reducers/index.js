import { combineReducers } from 'redux'

import fileBuffersReducer from "./fileBuffers.js"
import windowsReducer from "./windows.js"
import panesReducer from "./panes.js"
import tabsReducer from "./tabs.js"
import appReducer from "./app.js"

export default combineReducers({
  app: appReducer,
  fileBuffers: fileBuffersReducer,
  windows: windowsReducer,
  panes: panesReducer,
  tabs: tabsReducer
})
