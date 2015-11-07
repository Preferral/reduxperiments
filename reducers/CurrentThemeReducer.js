import { CHANGE_THEME } from '../actions'

export function currentTheme(state = 'theme-green', action) {
  switch (action.type) {
    case CHANGE_THEME:
      return state == 'theme-green' ? 'theme-blue' : 'theme-green';
    default:
      return state
  }
}
