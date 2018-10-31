import React from "react";
import { Row, Card, CardBody } from "reactstrap";

const VideoCards = props => (
 
    <Card className="mx-12" >
       <div >
      <CardBody className="p-8"id={props.id} onClick={props.onClick} >
        <Row >
          {/* Row = style={{ margin: 10 }} */}
          <h6> {props.category} > </h6>
          <h6> {props.subCategory}</h6>
        </Row>
        {props.children}
      </CardBody>
      </div>
    </Card>
   
);

export default VideoCards;
