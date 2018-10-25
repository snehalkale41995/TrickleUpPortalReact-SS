import React, { Component } from "react";
import { Route } from "react-router-dom";
import LanguageForm from './LanguageForm';
import LanguageList from './LanguageList';

export default class Languages extends Component {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={LanguageList}/>
        <Route
          path={`${this.props.match.path}/languageForm/:id?`}
          component={LanguageForm}
        />
      </div>
    );
  }
}


