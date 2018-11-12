import React, { Component } from 'react';
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
