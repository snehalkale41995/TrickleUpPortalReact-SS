import React, { Component } from "react";
import { Route } from "react-router-dom";
import CropsForm from "./CropsForm";
import CropsList from "./CropsList";

export default class Crops extends Component {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={CropsList} />
        <Route
          path={`${this.props.match.path}/cropsForm/:id?`}
          component={CropsForm}
        />
      </div>
    );
  }
}