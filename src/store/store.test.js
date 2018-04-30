const { createStore, combineReducers } = require("./store");

function todos({ state = [], action }) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]);
    default:
      return state;
  }
}

test("expect to be able to get state", () => {
  const store = createStore(todos);

  const currentState = store.getState();

  expect(currentState).toBeUndefined();
});

test("expect reducer to be called", () => {
  const reducer = jest.fn();

  const store = createStore(reducer);

  store.dispatch({
    type: "DANCE",
  });

  expect(reducer).toBeCalledWith({
    action: {
      type: "DANCE",
    },
    state: undefined,
  });
});

test("expect to update state", () => {
  const store = createStore(todos);

  store.dispatch({
    type: "ADD_TODO",
    todo: {
      text: "Eat Pizza!",
    },
  });

  const state = store.getState();

  expect(state).toEqual([
    {
      text: "Eat Pizza!",
    },
  ]);
});

test("user can subscribe to state updates", () => {
  const store = createStore(todos);

  const listen = jest.fn();

  store.subscribe(listen);

  store.dispatch({
    type: "ADD_TODO",
    todo: {
      text: "Eat Pizza!",
    },
  });

  expect(listen).toBeCalled();
});

test("user can unsubscribe from state updates", () => {
  const store = createStore(todos);

  const listen = jest.fn();

  const unsubscribe = store.subscribe(listen);

  unsubscribe();

  store.dispatch({
    type: "ADD_TODO",
    todo: {
      text: "Eat Pizza!",
    },
  });

  expect(listen).not.toBeCalled();
});

function goals({ state = [], action }) {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    default:
      return state;
  }
}

test("to be able to combine reducers", () => {
  const reducer = combineReducers({ todos, goals });
  const store = createStore(reducer);

  store.dispatch({
    type: "ADD_TODO",
    todo: {
      text: "Eat Pizza!",
    },
  });

  store.dispatch({
    type: "ADD_GOAL",
    goal: {
      text: "Start Pizza Resteraunt!",
    },
  });

  const state = store.getState();

  expect(state.todos).toHaveLength(1);
  expect(state.goals).toHaveLength(1);
});
