import React, { Component } from "react";
import { Route } from "react-router-dom";
import GenderForm from './GenderForm';
import GenderList from './GenderList';

export default class Genders extends Component {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={GenderList}/>
        <Route
          path={`${this.props.match.path}/genderForm/:id?`}
          component={GenderForm}
        />
      </div>
    );
  }
}


