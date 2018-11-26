import React from "react";
import { Row, Card, CardBody, FormGroup,Col, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

const ImageCards = props => (
  <Card className="mx-8 bg-gray-200">
    <CardHeader>
      <Row >
        <Col xs="12" md="10">
        <h6> {props.imageName}</h6>
       </Col>
       <Col  md="2">
       <Link to={props.link} onClick={props.onDelete}>
        <i className="fa fa-trash delete-btn" title="Deactivate" />
        </Link>
     </Col>
      </Row>
    </CardHeader>
    <CardBody className="p-4" id={props.id} onClick={props.onClick}>
      <FormGroup className="justify-content-xl-center py-1 my-0" row>
        <img src={props.source} width={300} height={200} alt="" />
      </FormGroup>
    </CardBody>
  </Card>
);

export default ImageCards;
