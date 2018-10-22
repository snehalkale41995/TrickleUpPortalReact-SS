import React, { Component } from "react";
import { Route } from "react-router-dom";
import VillageForm from "./VillageForm";
import VillageList from "./VillageList";

export default class Villages extends Component {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={VillageList} />
        <Route
          path={`${this.props.match.path}/villageForm/:id?`}
          component={VillageForm}
        />
      </div>
    );
  }
}
