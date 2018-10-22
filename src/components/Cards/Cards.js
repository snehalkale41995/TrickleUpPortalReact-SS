import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

export default class Cards extends Component {
  render() {
    return (
      <Card className={this.props.className}>
        <CardBody>
          <Row>
            <Col xs="12" md="3">
              <h1 style={{ fontSize: 60 }}>
                <i className={this.props.icon} />
              </h1>
            </Col>
            <Col md="9">
              <p className="text-value" style={{ fontSize: 18 }}>
                {" "}
                {this.props.label}
              </p>
              <p style={{ fontSize: 25, marginTop: -20 }}>{this.props.value}</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
