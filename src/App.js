import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "@coreui/icons/css/coreui-icons.min.css";
import "flag-icon-css/css/flag-icon.min.css";
import "font-awesome/css/font-awesome.min.css";
import "simple-line-icons/css/simple-line-icons.css";
import "./customStyles.css";
import { Provider } from "react-redux";
import store from "./store";
import Main from "./containers/Main";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path="/" name="Home" component={Main} />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
