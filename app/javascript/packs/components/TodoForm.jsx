import React from "react";
import propTypes from "prop-types";
import axios from "axios";

import SetAxiosHeader from "./SetAxiosHeader";

class TodoForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    SetAxiosHeader();
    const title = document.getElementById("title").value;
    const newTodoItem = {
      todo_item: {
        title: title,
        completed: false,
      },
    };
    this.createNewTodo(newTodoItem);
    e.target.reset();
  };

  createNewTodo = async (todoItem) => {
    try {
      const resp = await axios.post("api/v1/todo_items", todoItem);
      const createdTodoItem = resp.data;
      this.props.createTodoItem(createdTodoItem);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <form className="my-3" onSubmit={this.handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-8">
            <input
              required
              type="text"
              name="title"
              id="title"
              placeholder="New thing to do"
              className="form-control"
            />
          </div>
          <div className="form-group col-md-4">
            <button className="btn btn-outline-success btn-block">+ Add</button>
          </div>
        </div>
      </form>
    );
  }
}

export default TodoForm;

TodoForm.propTypes = {
  createTodoItem: propTypes.func.isRequired,
};
