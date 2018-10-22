import React, { Component } from "react";
import { Route } from "react-router-dom";
import ContactsFrom from "./ContactsForm";
import ContactsList from "./ContactsList";

export default class Crops extends Component {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={ContactsList} />
        <Route
          path={`${this.props.match.path}/contactsForm/:id?`}
          component={ContactsFrom}
        />
      </div>
    );
  }
}