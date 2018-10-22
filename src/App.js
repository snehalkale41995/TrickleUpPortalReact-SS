import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
// Styles
// CoreUI Icons Set
import "@coreui/icons/css/coreui-icons.min.css";
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
//import './scss/style.css'
import "./customStyles.css";
//Redux
import { Provider } from "react-redux";
import store from "./store";

// Container
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
