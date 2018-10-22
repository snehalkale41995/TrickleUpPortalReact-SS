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
import { AppHeader ,AppFooter} from "@coreui/react";
import InputElement from "../../components/InputElement/InputElement";
import LoginHeader from "../../components/LoginHeader";
import LoginFooter from "../../components/LoginFooter";
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
      inCorrect:false
    };
  }
  
  onSubmit = () => {
    const { userName, password } = { ...this.state.user };
    if (userName && password) {
      if (userName === "chandan.mishra@gmail.com" && password == 12345) {
        //post reqeuest
        //store Id in loastoryage
        localStorage.setItem("user" ,userName);
        setTimeout(()=>{
          localStorage.clear();
        },3600000);
       this.props.history.push('/dashboard');
      } else{
          this.setState({inCorrect :true})
      }
    } else {
      this.setState({
        userNameRequired: true,
        passwordRequired: true
      });
    }
  };
  onChangeHandler(event) {
    let user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({
      user: user,
      userNameRequired: false,
      passwordRequired: false,
      inCorrect :false
    });
  }
  render() {
    return <div className="app">
        <AppHeader fixed>
          <LoginHeader />
        </AppHeader>
        
        
        {/*  style={{ backgroundSize: "cover",backgroundImage : `url(${"../../assets/img/backgroundImage.jpg"})`}}*/}
        <div className="app-body" style={{backgroundColor : "#d3ecec"}}>
          <main className="main">
            {/* <div className="app flex-row" style={{ margin: 40 }}> */}
              <Container >
                <div style={{padding : 40}}> 
                  <Row className="justify-content-center">
                    <Col md="6">
                      <CardGroup>
                        <Card className="p-4" style={{ backgroundColor: "#2C3A5D" }}>
                          <CardBody>
                            <h1 className="text-white-50 ">Login</h1>
                            <p className="text-white-50 " style={{ color: "#ffffff" }}>
                              Sign In to your account
                            </p>
                            <FormGroup row className="text-white-50 b">
                              <Col xs="12" md="10">
                                <InputElement type="text" label="User name" name="userName" placeholder="Please enter your user name" required={this.state.userNameRequired} onChange={event => this.onChangeHandler(event)} />
                              </Col>
                            </FormGroup>
                            <FormGroup row className="text-white-50 b">
                              <Col xs="12" md="10">
                                <InputElement type="password" label="Password" name="password" placeholder="Please enter your password" required={this.state.passwordRequired} onChange={event => this.onChangeHandler(event)} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6" xs="12">
                                <Button className="theme-positive-btn" onClick={this.onSubmit}>
                                  Submit
                                </Button>
                              </Col>
                              {this.state.inCorrect ? <div style={{ color: "red" }} className="help-block">
                                  Username/Password is invalid
                                </div> : null}
                            </FormGroup>
                          </CardBody>
                        </Card>
                      </CardGroup>
                    </Col>
                  </Row>
                </div>
              </Container>
            {/* </div> */}
          </main>
        </div>
        <AppFooter>
            <LoginFooter />
          </AppFooter>
      </div>;
  }
}
export default Login;
