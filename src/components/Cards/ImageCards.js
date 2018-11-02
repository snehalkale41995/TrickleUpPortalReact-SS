import React from "react";
import { Row, Card, CardBody, FormGroup } from "reactstrap";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
const ImageCards = props => (
  <Card className="mx-8 bg-gray-200">
    <CardBody className="p-4" id={props.id} onClick={props.onClick}>
      <Row className="m-1">
        <h6> {props.imageName}</h6>
      </Row>
      <FormGroup className="justify-content-xl-center py-1 my-0" row>
        <img src={props.source} width={300} height={200}/>
      </FormGroup>
    </CardBody>
  </Card>
);

export default ImageCards;
