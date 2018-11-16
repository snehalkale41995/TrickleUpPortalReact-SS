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
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";
class ExceptionPage extends Component {

  onClick(){
    window.location.reload();
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
                  <Col>
                    <div>
                      <p style={{ fontSize: 70 }}>Sorry !!!</p>
                      <p style={{ fontSize: 50 }}>
                        We are facing some Internal Server Error
                      </p>
                      <br/>
                      <Button
                        type="button"
                        className="theme-positive-btn"
                        onClick={this.onClick.bind(this)}
                      >
                      <i class="fa fa-repeat" ></i> &nbsp; Try Again
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </main>
        </div>
        {/* <AppFooter>
          <LoginFooter />
        </AppFooter> */}
      </div>
    );
  }
}

export default ExceptionPage;
