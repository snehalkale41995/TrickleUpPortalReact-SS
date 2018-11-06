import React from "react";
import { Row, Card, CardBody, FormGroup } from "reactstrap";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const VideoCards = props => (
  <Card className="mx-8 bg-gray-200">
    <div>
      <CardBody className="p-4" id={props.id} onClick={props.onClick}>
        <Row className="m-1">
          <h6> {props.videoName} </h6>
        </Row>
        <FormGroup className="align-self-xl-center py-1 my-0" row>
          <VideoPlayer
            category={props.category}
            subCategory={props.subCategory}
            autoPlay={false}
            mute={false}
            source={props.source}
          />
        </FormGroup>
      </CardBody>
    </div>
  </Card>
);

export default VideoCards;
