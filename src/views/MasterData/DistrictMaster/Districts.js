import React, { Component } from "react";
import { Route } from "react-router-dom";
import DistrictsList from "./DistrictsList";
import DistrictForm from "./DistrictForm";

export default class Districts extends Component {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={DistrictsList} />
        <Route
          path={`${this.props.match.path}/districtForm/:id?`}
          component={DistrictForm}
        />
      </div>
    );
  }
}
//