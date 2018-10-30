import React from "react";
import { Row, Card, CardBody,FormGroup } from "reactstrap";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
const AudioCards = props => (
  <Card className="mx-8" style={{backgroundColor : "#F7A359"}}>
    <CardBody className="p-4" id={props.id} onClick={props.onClick}>
      <Row style={{ margin: 10 }}>
        <h6> {props.audioName}</h6>
      </Row>
      <FormGroup style={{ padding: 9 }} row>
        <AudioPlayer
          source={props.source}
          muted={props.muted}
          autoPlay={props.autoPlay}
        />
      </FormGroup>
    </CardBody>
  </Card>
);

export default AudioCards;
