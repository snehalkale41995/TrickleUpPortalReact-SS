import React, { Component } from 'react';
import {  DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../assets/img/brand/trickleUpLogo.png'
import smallLogo from '../assets/img/brand/Tup.jpg'
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  onLogout = () => {
      localStorage.clear();
      window.location.reload();
  }
  render() {
    return (
      <React.Fragment>
        <div style ={{backgroundColor : "#ffffff"}}>
        <AppSidebarToggler className="d-lg-none" display="md" mobile  />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'Trickle Up Logo' }}
          minimized={{ src: smallLogo, width: 30, height: 30, alt: 'Trickle Up Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg"  />
</div>
  
        <Nav className="ml-auto" navbar>
      
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'http://192.168.101.20:1826/Images/Users/UserImageMale.jpg'} className="img-avatar" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={this.onLogout}><i className="fa fa-lock" ></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
