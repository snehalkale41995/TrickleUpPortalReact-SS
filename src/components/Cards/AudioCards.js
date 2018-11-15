import React from "react";
import { Row, Card, CardBody, FormGroup } from "reactstrap";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
const AudioCards = props => (
  <Card className="mx-8 bg-gray-200">
    <CardBody className="p-4 audio-card" id={props.id} onClick={props.onClick}>
      <Row className="m-1">
        <h6> {props.audioName}</h6>
      </Row>
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
