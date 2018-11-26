import React from "react";
import { Row, Card, CardBody, FormGroup , Col, CardHeader} from "reactstrap";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { Link } from "react-router-dom";

const VideoCards = props => (
  <Card className="mx-8 bg-gray-200">
    <CardHeader>
      <Row >
        <Col xs="12" md="10">
       <h6>{props.videoName}</h6>
       </Col>
       <Col  md="2">
       <Link to={props.link} onClick={props.onDelete}>
        <i className="fa fa-trash delete-btn" title="Deactivate" />
        </Link>
     </Col>
      </Row>
    </CardHeader>
      <CardBody className="p-4" id={props.id} onClick={props.onClick}>
        {/* <Row className="m-1">
          <h6> {props.videoName} </h6>
        </Row> */}
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
  
  </Card>
);

export default VideoCards;
