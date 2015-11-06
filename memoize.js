// This memoizes a function by remembering its last args and its last result
// and returning the last result if the args are the same as the last call.
export function memoize(func) {
  var lastArgs = null;
  var lastResult;

  function argsDifferent(args) {
    return lastArgs === null ||
           lastArgs.length != args.length ||
           args.some((arg, idx) => { return arg !== lastArgs[idx] });
  }

  return function(...args) {
    if(argsDifferent(args)) {
      lastArgs = args;
      lastResult = func(...args);
    }
    return lastResult
  }
}

// This memoizes `func` and returns a function that calls
// the memoized `func` with the arguments returned by `argFunc`
export function createMemoizedFunction(argFunc, func) {
  var memoized = memoize(func);
  return function() {
    return memoized(...argFunc());
  }
}
