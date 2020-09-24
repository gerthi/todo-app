import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import TodoItems from "./TodoItems";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import Spinner from "./Spinner";

class TodoApp extends React.Component {
  state = {
    todoItems: [],
    hideDone: false,
    isLoading: true,
  };

  getTodoItems = () => {
    try {
      axios
        .get("/api/v1/todo_items")
        .then((response) => {
          this.setState({ isLoading: true });
          return response.data;
        })
        .then((todoItems) => {
          this.setState({ todoItems });
          this.setState({ isLoading: false });
        });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getTodoItems();
  }

  handleCreate = (todoItem) => {
    const todoItems = [todoItem, ...this.state.todoItems];
    this.setState({ todoItems });
  };

  handleToggle = () => {
    document.querySelector(".toggleOn").classList.toggle("d-none");
    document.querySelector(".toggleOff").classList.toggle("d-none");
    this.setState({ hideDone: !this.state.hideDone });
  };

  toggleItems = () => {
    const todoItems = this.state.todoItems;
    const results = todoItems.filter((todoItem) => todoItem.complete != false);
    this.setState({ todoItems: results });
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.isLoading && (
          <>
            <TodoForm createTodoItem={this.handleCreate} />
            <TodoItems toggleDone={this.handleToggle}>
              {this.state.todoItems.map((todoItem) => (
                <TodoItem
                  key={todoItem.id}
                  todoItem={todoItem}
                  getTodoItems={this.getTodoItems}
                  hideDone={this.state.hideDone}
                />
              ))}
            </TodoItems>
          </>
        )}
        {this.state.isLoading && <Spinner />}
      </React.Fragment>
    );
  }
}

document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("todo-app");
  app && ReactDOM.render(<TodoApp />, app);
});
