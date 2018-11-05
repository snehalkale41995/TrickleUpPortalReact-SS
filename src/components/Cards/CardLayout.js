import React from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
const CardLayout = props => (
  <div className="card-marginTop">
    <div className="animated fadeIn">
      <Row className="justify-content-left">
        <Col md="12">
          <Card className="mx-12">
            <CardBody className="p-8">
              <Row className="card-row-padding">
                {props.navigation ? (
                  <Link
                    to={props.navigationRoute}
                    onClick={props.onClick}
                    className="back-arrow-icon"
                  >
                    <i className="fa fa-chevron-circle-left back-arrow-icon" />
                  </Link>
                ) : null}
                <Col xs="12" md="6">
              {
                props.name ? 
                <h1>{props.name}</h1> : 
                <h3>{props.subName}</h3>
              }
                  
                </Col>
                <Col md="4" />
                {props.buttonName ? (
                  <Col md="2">
                    <Link to={props.buttonLink} onClick={props.buttonClick}>
                      <Button
                        type="button"
                        className="theme-positive-btn card-btn"
                      >
                        <i className="fa fa-plus" />&nbsp; {props.buttonName}
                      </Button>
                    </Link>
                  </Col>
                ) : null}
              </Row>
              {props.children}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
);

export default CardLayout;
