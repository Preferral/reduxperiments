import { combineReducers } from 'redux'
import { currentTheme } from './CurrentThemeReducer';
import { todos } from './TodosReducer';
import { panes } from './PanesReducer';

export default combineReducers({
  panes,
  todos,
  currentTheme,
});
