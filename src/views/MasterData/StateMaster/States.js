import React, { Component } from "react";
import { Route } from "react-router-dom";
import StatesList from "./StatesList";
import StateForm from "./StateForm";

export default class States extends Component {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={StatesList} />
        <Route
          path={`${this.props.match.path}/stateForm/:id?`}
          component={StateForm}
        />
      </div>
    );
  }
}
