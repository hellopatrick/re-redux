// Re-redux

function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  const dispatch = action => {
    state = reducer({ state, action });

    listeners.forEach(l => l());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

function combineReducers(reducers = {}) {
  return ({ state = {}, action }) => {
    const newState = {};

    for (let key in reducers) {
      const reducer = reducers[key];
      const keyState = state[key];

      newState[key] = reducer({ state: keyState, action });
    }

    return newState;
  };
}

module.exports = { createStore, combineReducers };
