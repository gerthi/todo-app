import React from "react";
import propTypes from "prop-types";
import axios from "axios";
import _ from "lodash";

import SetAxiosHeader from "./SetAxiosHeader";

class TodoItem extends React.Component {
  state = {
    complete: this.props.todoItem.complete,
    path: `/api/v1/todo_items/${this.props.todoItem.id}`,
  };

  handleDestroy = () => {
    SetAxiosHeader();
    const confirmation = confirm("Are you sure ?");
    if (confirmation) {
      axios
        .delete(this.state.path)
        .then((response) => {
          this.props.getTodoItems();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleChange = () => {
    const complete = document.getElementById(
      `checkbox-${this.props.todoItem.id}`
    ).checked;
    this.setState({ complete });
    this.updateTodoItem();
  };

  updateTodoItem = _.debounce(() => {
    SetAxiosHeader();
    const todoItem = {
      title: document.getElementById(
        `todoItem__title-${this.props.todoItem.id}`
      ).value,
      complete: this.state.complete,
    };
    axios
      .put(this.state.path, todoItem)
      .then()
      .catch((err) => console.log(err));
  }, 500);

  render() {
    return (
      <tr
        className={`table-light
          ${this.state.complete && this.props.hideDone ? "d-none" : ""}
        `}
      >
        <td>
          <svg
            className={`bi bi-check-circle ${
              this.state.complete ? `text-success` : `text-muted`
            }`}
            width="2em"
            height="2em"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
              clipRule="evenodd"
            />
          </svg>
        </td>
        <td>
          <input
            type="text"
            defaultValue={this.props.todoItem.title}
            disabled={this.state.complete}
            className="form-control"
            id={`todoItem__title-${this.props.todoItem.id}`}
            onChange={this.handleChange}
          />
        </td>
        <td className="text-right">
          <div className="form-check form-check-inline">
            <input
              type="boolean"
              defaultChecked={this.state.complete}
              type="checkbox"
              className="form-check-input mr-4"
              id={`checkbox-${this.props.todoItem.id}`}
              onChange={this.handleChange}
            />
            <label
              className="form-check-label"
              htmlFor={`checkbox-${this.props.todoItem.id}`}
            ></label>
          </div>
          <button
            className="btn btn-outline-danger ml-2"
            onClick={this.handleDestroy}
          >
            ✘
          </button>
        </td>
      </tr>
    );
  }
}

export default TodoItem;

TodoItem.propTypes = {
  todoItem: propTypes.object.isRequired,
  getTodoItems: propTypes.func.isRequired,
  hideDone: propTypes.bool.isRequired,
};
