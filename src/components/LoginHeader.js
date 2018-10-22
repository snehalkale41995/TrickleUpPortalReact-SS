import React, { Component } from "react";
import PropTypes from "prop-types";

import { AppNavbarBrand } from "@coreui/react";
import logo from "../assets/img/brand/trickleUpLogo.png";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class LoginHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: "Trickle Up Logo" }}
          style={{ backgroundColor: "#ffffff" }}
        />
      </React.Fragment>
    );
  }
}

LoginHeader.propTypes = propTypes;
LoginHeader.defaultProps = defaultProps;

export default LoginHeader;
