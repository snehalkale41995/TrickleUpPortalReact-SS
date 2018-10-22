import React, { Component } from "react";
import { Route } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import RegistrationList from "./RegistrationList";

export default class Registration extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path={this.props.match.path}
          component={RegistrationList}
        />
        <Route
          path={`${this.props.match.path}/registration/:id?`}
          component={RegistrationForm}
        />
      </div>
    );
  }
}
