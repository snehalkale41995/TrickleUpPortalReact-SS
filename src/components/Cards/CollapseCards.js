import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardHeader,
  Collapse
} from "reactstrap";
import { Link } from "react-router-dom";
const CardLayout = props => (
  <div className="card-marginTop">
    <div className="animated fadeIn">
      <Row className="justify-content-left">
        <Col md="12">
          <Card className="mx-12">
            <CardHeader>
              <Row>
                <div className="card-header-actions">
                  <a
                    className="card-header-action btn btn-minimize collapse-arrow-icon"
                    data-target="#collapseExample"
                    onClick={props.toggleCollapse}
                  >
                    {props.isOpen ? (
                      <i className="fa fa-chevron-circle-up btn-link" />
                    ) : (
                      <i className="fa fa-chevron-circle-down btn-link" />
                    )}
                  </a>
                </div>

                <Col xs="12" md="6">
                  {props.name ? (
                    <h1>{props.name}</h1>
                  ) : (
                    <h3>{props.subName}</h3>
                  )}
                </Col>
                <Col md="3" />
                {props.buttonName ? (
                  <Col md="2">
                    <Link to={props.buttonLink} onClick={props.buttonClick}>
                      <Button
                        type="button"
                        className="theme-positive-btn card-btn"
                        style={{
                          pointerEvents: props.active,
                          opacity: props.active === "none" ? 0.5 : 1
                        }}
                      >
                        <i className="fa fa-plus" />&nbsp; {props.buttonName}
                      </Button>
                    </Link>
                  </Col>
                ) : null}
              </Row>
            </CardHeader>
            <Collapse isOpen={props.isOpen} id="collapseExample">
              <CardBody className="p-8">{props.children}</CardBody>
            </Collapse>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
);

export default CardLayout;
