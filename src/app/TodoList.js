import React from "react";
import PropTypes from "prop-types";

import "./TodoList.css";

class Todo extends React.Component {
  render() {
    const completeClass = this.props.complete ? "complete" : "incomplete";

    return (
      <div className={`${completeClass} item`}>
        <span onClick={this.props.onToggleClick}>{this.props.text}</span>
      </div>
    );
  }
}

Todo.propTypes = {
  complete: PropTypes.bool.isRequired,
  onToggleClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    const text = e.target.value;

    this.setState({ text });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state);

    this.setState({ text: "" });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo">
        <input
          type="text"
          placeholder="Read a book?"
          value={this.state.text}
          onChange={this.onChange}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

Input.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function TodoList(props) {
  const todos = props.todos.map((todo, index) => (
    <Todo
      key={todo.id}
      text={todo.text}
      complete={todo.complete}
      onToggleClick={e => props.onToggleTodo(todo)}
      onRemoveClick={e => props.onRemoveTodo(todo)}
    />
  ));

  return (
    <div className="todos">
      {todos}
      <Input onSubmit={props.onNewTodo} />
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onNewTodo: PropTypes.func.isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
