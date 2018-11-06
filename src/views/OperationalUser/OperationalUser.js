import React, { Component } from "react";
import { Route } from "react-router-dom";
import OperationalUserForm from "./OperationalUserForm";
import OperationalUserList from "./OperationalUserList";

export default class OperationalUser extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path={`${this.props.match.path}`}
          component={OperationalUserList}
        />
        <Route
          path={`${this.props.match.path}/operationalUser/:id?`}
          component={OperationalUserForm}
        />
      </div>
    );
  }
}
