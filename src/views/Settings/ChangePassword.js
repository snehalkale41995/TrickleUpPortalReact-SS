import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button } from "reactstrap";
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
        UserId: "",
        OldPassword: "",
        NewPassword: "",
        ConfirmPassword: "",
        OldPasswordRequired: false,
        NewPasswordRequired: false,
        ConfirmPasswordRequired: false,
        InvalidPassword: false
      },
      showNewPassword: false,
      showConfirmPassword: false,
      newPasswordType: "password",
      confirmPasswordType: "password"
    };
  }

  componentWillMount() {
    let userCredential = this.state.userCredential;
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    let userId = localStorage.getItem("user");
    userCredential.UserId = userId;
    this.setState({ userCredential: userCredential });
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
      let user = _.pick(userCredential, [
        "UserId",
        "OldPassword",
        "NewPassword"
      ]);
      this.props.changePassword(user);
      setTimeout(() => {
        let changePasswordError = compRef.props.changePasswordError;
        let changePasswordErrorMsg = compRef.props.changePasswordErrorMsg;
        compRef.Toaster(
          changePasswordError,
          "Password Change",
          changePasswordErrorMsg
        );
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
    let validPassword =
      userCredential.NewPassword === userCredential.ConfirmPassword;
    if (
      userCredential.OldPassword.trim().length > 0 &&
      userCredential.NewPassword.trim().length > 0 &&
      userCredential.ConfirmPassword.trim().length > 0 &&
      validPassword
    ) {
      return true;
    } else {
      if (
        !userCredential.OldPassword ||
        userCredential.OldPassword.trim().length === 0
      )
        userCredential.OldPasswordRequired = true;
      if (
        !userCredential.NewPassword ||
        userCredential.NewPassword.trim().length === 0
      )
        userCredential.NewPasswordRequired = true;
      if (userCredential.ConfirmPassword && !validPassword)
        userCredential.InvalidPassword = true;
      if (
        !userCredential.ConfirmPassword ||
        userCredential.ConfirmPassword.trim().length === 0
      )
        userCredential.ConfirmPasswordRequired = true;
      this.setState({
        userCredential: userCredential
      });
      return false;
    }
  }

  onReset() {
    let userCredential = {
      UserId: "",
      OldPassword: "",
      NewPassword: "",
      ConfirmPassword: "",
      OldPasswordRequired: false,
      NewPasswordRequired: false,
      ConfirmPasswordRequired: false,
      InvalidPassword: false
    };
    this.setState({
      userCredential: userCredential
    });
  }

  render() {
    let userCredential = { ...this.state.userCredential };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout name="Change Password">
        <FormGroup row />
        <div className="div-padding">
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
                type={this.state.newPasswordType}
                label="New Password"
                name="NewPassword"
                isPassword={true}
                showPassword={this.state.showNewPassword}
                onEyeToggle={() => {
                  this.setState({
                    showNewPassword: !this.state.showNewPassword,
                    newPasswordType:
                      this.state.newPasswordType === "password"
                        ? "input"
                        : "password"
                  });
                }}
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
                type={this.state.confirmPasswordType}
                label="Confirm Password"
                name="ConfirmPassword"
                placeholder="Confirm Password"
                isPassword={true}
                showPassword={this.state.showConfirmPassword}
                onEyeToggle={() => {
                  this.setState({
                    showConfirmPassword: !this.state.showConfirmPassword,
                    confirmPasswordType:
                      this.state.confirmPasswordType === "password"
                        ? "input"
                        : "password"
                  });
                }}
                value={userCredential.ConfirmPassword}
                required={userCredential.ConfirmPasswordRequired}
                onChange={event => this.onChangeInput(event)}
              />
              {userCredential.InvalidPassword ? (
                <div
                  style={{ color: "red", fontSize: "12px", marginTop: -12 }}
                  className="help-block"
                >
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
                Save
              </Button>
            </Col>
            {/* <Col md="1">
                  <Button
                    className="theme-reset-btn"
                    onClick={this.onReset.bind(this)}
                  >
                    Reset
                </Button>
                </Col> */}
          </FormGroup>
          <ToastContainer autoClose={1000} />
        </div>
      </CardLayout>
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
    changePassword: userCredential =>
      dispatch(actions.changePassword(userCredential))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
