import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
const CardLayout = props => (
  <div className="animated fadeIn" >
    <Row className="justify-content-left">
      <Col md="12">
        <Card className="mx-12">
          <CardBody className="p-8">
            <Row style={{margin :10}}>
              {props.navigation ? (
                <Link to={props.navigationRoute}>
                  <i
                    className="fa fa-chevron-circle-left"
                    style={{ fontSize: 30, margin: 8 }}
                  />
                </Link>
              ) : null}
              {props.buttonNavigation ? (
                  <i
                    onClick={props.navigationCondition}
                    className="fa fa-chevron-circle-left btn-link"
                    style={{ fontSize: 30, margin: 8 }}
                  />
                
              ) : null}
              &nbsp;&nbsp;
              <h1>{props.name}</h1>
            </Row>
            {props.children}
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
);

export default CardLayout;
