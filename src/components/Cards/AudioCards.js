import React from "react";
import { Row, Card, CardBody } from "reactstrap";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
const AudioCards = props => (
  <Card className="mx-12" style={{backgroundColor : "#F7A359"}}>
    <CardBody className="p-8" id={props.id} onClick={props.onClick}>
      <Row style={{ margin: 10 }}>
        <h6> {props.category} > </h6> <h6> {props.subCategory}</h6>
      </Row>
      <Row style={{ padding: 15 }}>
        <AudioPlayer
          source={props.source}
          muted={props.muted}
          autoPlay={props.autoPlay}
        />
      </Row>
    </CardBody>
  </Card>
);

export default AudioCards;
