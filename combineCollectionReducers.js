// There is a common pattern where the state contains
// a collection of like objects, with some actions
// needing to affect an element of the collection (i.e. complete a given todo element)
// while other actions affect the collection as a whole (i.e. add a new todo element).
//
// Generally actions, that affect a given todo need to pass in an `index` so we know
// which todo the action should affect.
//
// This function takes two arguments: the first is a collectionReducer that knows how
// to handle actions against the collection as a whole.
// The second argument is an elementReducer that knows how to handle
// actions against a specific element.  
//
// The goal is to extract the "index-detection" and state reconstruction logic, so
// that you only have to focus on how to reduce collection actions and element actions.

export default function combineCollectionReducers(collectionReducer, elementReducer) {
  return function(state = collectionReducer(undefined, { type: null }), action) {
    if(action.index !== undefined) {
      return state.map((element, idx) => idx === action.index ? elementReducer(element, action) : element);
    }
    return collectionReducer(state, action);
  }
}
