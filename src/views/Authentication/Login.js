import React, { Component } from "react";
import {
  Button,
  Card,
  FormGroup,
  CardBody,
  CardGroup,
  Col,
  Container,
  Row
} from "reactstrap";
import { AppHeader, AppFooter } from "@coreui/react";
import InputElement from "../../components/InputElement/InputElement";
import LoginHeader from "../../components/LoginHeader";
import LoginFooter from "../../components/LoginFooter";
import * as actions from "../../store/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userName: "",
        password: ""
      },
      userNameRequired: false,
      passwordRequired: false,
      inCorrect: false,
      showPassword: false,
      passwordType: "password"
    };
  }

  onSubmit = () => {
    let compRef = this;
    let user = this.state.user;
    if (user.userName && user.password) {
      this.props.loginUser(user);
      setTimeout(() => {
        localStorage.clear();
      }, 900000);
      setTimeout(() => {
        let loginError = compRef.props.loginError;
        let loginErrorMsg = compRef.props.loginErrorMsg;
        compRef.Toaster(loginError, "Login", loginErrorMsg);
      }, 1000);
    } else {
      !user.userName ? this.setState({userNameRequired : true}) : null;
      !user.password ? this.setState({passwordRequired : true}) : null;
    }
  };

  Toaster(loginError, actionName, loginErrorMsg) {
    let compRef = this;
    if (!loginError) {
      let loggedInUserDetails = JSON.stringify(
        compRef.props.loggedInUserDetails
      );
      localStorage.setItem("user", compRef.props.loggedInUserId);
      localStorage.setItem("userDetails", loggedInUserDetails);
      setTimeout(() => {
        localStorage.clear();
      }, 3600000);
      toast.success(actionName + " Successfull...", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      setTimeout(() => {
        compRef.props.history.push("/dashboard");
      }, 1000);
    } else {
      toast.error(loginErrorMsg, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  onChangeHandler(event) {
    let user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({
      user: user,
      userNameRequired: false,
      passwordRequired: false,
      inCorrect: false
    });
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <LoginHeader />
        </AppHeader>
        <div className="app-body" style={{ backgroundColor: "#d3ecec" }}>
          <main className="main">
            <Container>
              <div className="login-padding">
                <Row className="justify-content-center">
                  <Col md="6">
                    <CardGroup>
                      <Card
                        className="p-4"
                        style={{ backgroundColor: "#2C3A5D" }}
                      >
                        <CardBody>
                          <h1 className="text-white-50 ">Login</h1>
                          <p
                            className="text-white-50 "
                            style={{ color: "#ffffff" }}
                          >
                            Sign In to your account
                          </p>
                          <FormGroup row className="text-white-50 b">
                            <Col xs="12" md="10">
                              <InputElement
                                type="text"
                                label="User name"
                                name="userName"
                                placeholder="Please enter your user name"
                                required={this.state.userNameRequired}
                                onChange={event => this.onChangeHandler(event)}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row className="text-white-50 b">
                            <Col xs="12" md="10">
                              <InputElement
                                type={this.state.passwordType}
                                label="Password"
                                name="password"
                                isPassword={true}
                                showPassword={this.state.showPassword}
                                onEyeToggle={() => {
                                  this.setState({
                                    showPassword: !this.state.showPassword,
                                    passwordType:
                                      this.state.passwordType === "password"
                                        ? "input"
                                        : "password"
                                  });
                                }}
                                placeholder="Please enter your password"
                                required={this.state.passwordRequired}
                                onChange={event => this.onChangeHandler(event)}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="6" xs="12">
                              <Button
                                className="theme-positive-btn"
                                onClick={this.onSubmit}
                              >
                                Login
                              </Button>
                            </Col>
                            {this.state.inCorrect ? (
                              <div
                                style={{ color: "red" }}
                                className="help-block"
                              >
                                Username/Password is invalid
                              </div>
                            ) : null}
                          </FormGroup>
                        </CardBody>
                      </Card>
                    </CardGroup>
                  </Col>
                </Row>
                <ToastContainer autoClose={2000} />
              </div>
            </Container>
          </main>
        </div>
        <AppFooter>
          <LoginFooter />
        </AppFooter>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedInUserId: state.loginReducer.loggedInUserId,
    loggedInUserDetails: state.loginReducer.loggedInUserDetails,
    loginError: state.loginReducer.loginError,
    loginErrorMsg: state.loginReducer.loginErrorMsg
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(actions.loginUser(user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
