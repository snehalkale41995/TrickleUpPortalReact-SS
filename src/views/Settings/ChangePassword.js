import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../components/InputElement/Dropdown";
import InputElement from "../../components/InputElement/InputElement";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Loader from "../../components/Loader/Loader";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userCredential: {
        UserId:"",
	    OldPassword:"",
        NewPassword:"",
        ConfirmPassword:"",    
        OldPasswordRequired: false,
        NewPasswordRequired: false,
        ConfirmPasswordRequired: false,
        InvalidPassword : false
      }
    };
  }

  componentWillMount() {
    let  userCredential  = this.state.userCredential;
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000);
    let userId = localStorage.getItem("user");
    userCredential.UserId = userId
    this.setState({userCredential : userCredential})
  }

  onChangeInput(event) {
    let userCredential = { ...this.state.userCredential };
    userCredential[event.target.name] = event.target.value;
    userCredential[event.target.name + "Required"] = false;
    userCredential.InvalidPassword = false;
    this.setState({
      userCredential: userCredential
    });
  }
 
  onSubmit() {
    let userCredential = { ...this.state.userCredential };
    let compRef = this;
    if (this.validUser(userCredential)) {
     let  user = _.pick(userCredential, [
        "UserId",
        "OldPassword",
        "NewPassword",
     ]);
      this.props.changePassword(user);
      setTimeout(() => {
        let changePasswordError = compRef.props.changePasswordError;
        let changePasswordErrorMsg = compRef.props.changePasswordErrorMsg;
        compRef.Toaster(changePasswordError, "Password Change", changePasswordErrorMsg);
      }, 1000);
    } 
  }

    Toaster(changePasswordError, actionName, changePasswordErrorMsg) {
    let compRef = this;
    if (!changePasswordError) {
        compRef.onReset();
      toast.success(actionName + " Successfully...", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      toast.error(changePasswordErrorMsg, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  validUser(userCredential) {
    let validPassword = userCredential.NewPassword === userCredential.ConfirmPassword;
    if (userCredential.OldPassword && userCredential.NewPassword && userCredential.ConfirmPassword && validPassword) {
      return true;
    } else {
      !userCredential.OldPassword ? userCredential.OldPasswordRequired = true : null;
      !userCredential.NewPassword ? userCredential.NewPasswordRequired = true : null;
       userCredential.ConfirmPassword && !validPassword ? userCredential.InvalidPassword = true : null;
      !userCredential.ConfirmPassword ? userCredential.ConfirmPasswordRequired = true : null;
      this.setState({
        userCredential: userCredential
      });
      return false;
    }
  }

  onReset() {
    let userCredential = {
       UserId:"",
	    OldPassword:"",
        NewPassword:"",
        ConfirmPassword:"",    
        OldPasswordRequired: false,
        NewPasswordRequired: false,
        ConfirmPasswordRequired: false,
        InvalidPassword : false
    }
    this.setState({
      userCredential: userCredential
    });
  }

  render() {
    let userCredential = { ...this.state.userCredential };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
        <div style={{ marginTop: 30 }}>
          <CardLayout
            name="Change Password"
          >
            <FormGroup row />
            <div style={{ margin: 20 }}>
              <FormGroup row>
                <Col xs="12" md="5">
                  <InputElement
                    type="text"
                    label="Old Password"
                    name="OldPassword"
                    maxLength={10}
                    placeholder="Old Password"
                    value={userCredential.OldPassword}
                    required={userCredential.OldPasswordRequired}
                    onChange={event => this.onChangeInput(event)}
                  />
                </Col>
                <Col md="5">
                  <InputElement
                    type="password"
                    label="New Password"
                    name="NewPassword"
                    maxLength={10}
                    placeholder="New Password"
                    value={userCredential.NewPassword}
                    required={userCredential.NewPasswordRequired}
                    onChange={event => this.onChangeInput(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12" md="5">
                  <InputElement
                    type="password"
                    label="Confirm Password"
                    name="ConfirmPassword"
                    placeholder="Confirm Password"
                    value={userCredential.ConfirmPassword}
                    required={userCredential.ConfirmPasswordRequired}
                    onChange={event => this.onChangeInput(event)}
                  />
              {userCredential.InvalidPassword ? (
              <div style={{ color: "red", fontSize: "12px", marginTop : -12 }} className="help-block">
                *New Password and Confirm Password do not Match
                 </div>
              ) : null}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="3" md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmit.bind(this)}
                  >
                    Submit
                </Button>
                </Col>
                <Col md="1">
                  <Button
                    className="theme-reset-btn"
                    onClick={this.onReset.bind(this)}
                  >
                    Reset
                </Button>
                </Col>
              </FormGroup>
               <ToastContainer autoClose={2000} />
            </div>
          </CardLayout>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    changePasswordError: state.loginReducer.changePasswordError,
    changePasswordErrorMsg: state.loginReducer.changePasswordErrorMsg
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changePassword: userCredential => dispatch(actions.changePassword(userCredential))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);