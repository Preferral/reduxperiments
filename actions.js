import uid from 'uid'

export const ADD_WINDOW='ADD_WINDOW';
export const ADD_PANE_TO_WINDOW='ADD_PANE_TO_WINDOW';
export const ADD_TAB_TO_PANE='ADD_TAB_TO_PANE';
export const UPDATE_FILE_BUFFER_TEXT='UPDATE_FILE_BUFFER_TEXT';
export const ADD_FILE_BUFFER='ADD_FILE_BUFFER';
export const LOAD_FILE_BUFFER_IN_TAB='LOAD_FILE_BUFFER_IN_TAB';

export function addWindow() {
  return { type: ADD_WINDOW, id: uid() };
}

export function addPaneToWindow(windowId) {
  return { type: ADD_PANE_TO_WINDOW, id: uid(), windowId: windowId };
}

export function addTabToPane(paneId) {
  return { type: ADD_TAB_TO_PANE, id: uid(), paneId: paneId };
}

export function updateFileBufferText(fileBufferId, text) {
  return { type: UPDATE_FILE_BUFFER_TEXT, id: fileBufferId, newText: text };
}

export function addFileBuffer() {
  return { type: ADD_FILE_BUFFER, id: uid() };
}

export function loadFileBufferInTab(tabId, fileBufferKey) {
  return { type: LOAD_FILE_BUFFER_IN_TAB, tabId: tabId, fileBufferKey: fileBufferKey };
}
