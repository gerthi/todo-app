import React from "react";
import propTypes from "prop-types";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

class TodoItems extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Status</th>
                <th scope="col">Item</th>
                <th scope="col" className="text-right">
                  <span>
                    <VisibilityIcon
                      className="toggleOn"
                      htmlColor="#28a745"
                      onClick={this.props.toggleDone}
                    />
                    <VisibilityOffIcon
                      className="toggleOff d-none"
                      htmlColor="#dc3545"
                      onClick={this.props.toggleDone}
                    />
                  </span>
                  &nbsp;- Actions
                </th>
              </tr>
            </thead>
            <tbody>{this.props.children}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default TodoItems;

TodoItems.propTypes = {
  toggleDone: propTypes.func.isRequired,
};
