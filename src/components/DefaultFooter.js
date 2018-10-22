import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    return (
      <React.Fragment>
        <span><a href="https://trickleup.org/">Trickle Up</a> &copy; 2018</span>
        <span className="ml-auto">Powered by <a href="https://www.eternussolutions.com/">Eternus Solutions Pvt. Ltd.</a></span>
      </React.Fragment>
    );
  }
}


export default DefaultFooter;
