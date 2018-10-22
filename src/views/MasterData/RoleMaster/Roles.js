import React, { Component } from "react";
import { Route } from "react-router-dom";
import RoleForm from './RoleForm';
import RolesList from './RolesList';

export default class Roles extends Component {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={RolesList} />
        <Route
          path={`${this.props.match.path}/roleForm/:id?`}
          component={RoleForm}
        />
      </div>
    );
  }
}
