import React, { StrictMode } from "react";
import { ulid } from "ulid";

import { createStore, combineReducers } from "../store/store";
import todosReducer, {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
} from "../reducers/Todos";

import TodoList from "./TodoList";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    const store = createStore(todosReducer, [
      { id: ulid(), text: "learn to swim", complete: true },
      { id: ulid(), text: "learn to bike", complete: false },
      { id: ulid(), text: "learn to run", complete: false },
      { id: ulid(), text: "win ironman triathlon", complete: false },
    ]);

    this.state = {
      store,
    };

    store.subscribe(() => this.forceUpdate());

    this.onNewTodo = this.onNewTodo.bind(this);
    this.onToggleTodo = this.onToggleTodo.bind(this);
    this.onRemoveTodo = this.onRemoveTodo.bind(this);
  }

  onNewTodo({ text }) {
    this.state.store.dispatch({
      type: ADD_TODO,
      todo: {
        id: ulid(),
        text,
        complete: false,
      },
    });
  }

  onToggleTodo({ id }) {
    this.state.store.dispatch({
      type: TOGGLE_TODO,
      id,
    });
  }

  onRemoveTodo({ id }) {
    this.state.store.dispatch({
      type: REMOVE_TODO,
      id,
    });
  }

  render() {
    return (
      <StrictMode>
        <div className="container">
          <h1>Todo!</h1>
          <TodoList
            todos={this.state.store.getState()}
            onNewTodo={this.onNewTodo}
            onToggleTodo={this.onToggleTodo}
            onRemoveTodo={this.onRemoveTodo}
          />
        </div>
      </StrictMode>
    );
  }
}

export default App;
