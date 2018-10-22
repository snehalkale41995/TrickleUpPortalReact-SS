import React, { Component } from "react";
import { Route } from "react-router-dom";
import MediaForm from "./MediaForm";
import MediaList from "./MediaList";

export default class Media extends Component {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={MediaList} />
        <Route
          path={`${this.props.match.path}/media/:id?`}
          component={MediaForm}
        />
      </div>
    );
  }
}
