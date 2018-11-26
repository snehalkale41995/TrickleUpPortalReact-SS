import React from "react";
import { Row, Card, CardBody, FormGroup, Col, CardHeader } from "reactstrap";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { Link } from "react-router-dom";

const AudioCards = props => (
  <Card className="mx-8 bg-gray-200">
    <CardHeader>
      <Row >
        <Col xs="12" md="10">
       <h6>{props.audioName}</h6>
       </Col>
       <Col  md="2">
       <Link to={props.link} onClick={props.onDelete}>
        <i className="fa fa-trash delete-btn" title="Deactivate" />
        </Link>
     </Col>
      </Row>
    </CardHeader>
    <CardBody className="p-4 audio-card" id={props.id} onClick={props.onClick}>
      <FormGroup className="align-self-xl-center py-1 my-0" row>
        <AudioPlayer
          title={props.audioName}
          source={props.source}
          muted={props.muted}
          autoPlay={props.autoPlay}
        />
      </FormGroup>
    </CardBody>
  </Card>
);

export default AudioCards;
