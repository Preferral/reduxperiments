import { compose, createStore } from 'redux';
import rootReducer from '../reducers'
import { devTools } from 'redux-devtools';

export default function configureStore(initialState) {

  const finalCreateStore = compose(devTools())(createStore);

  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
