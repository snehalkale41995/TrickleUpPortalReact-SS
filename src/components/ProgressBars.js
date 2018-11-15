import React from "react";
import { Progress, Col } from "reactstrap";
const ProgressBars = props => (
  //   <div className="progress-group">
  //     <div className="progress-group-header">
  //       <span className="title">{props.title}</span>
  //       <span className="ml-auto font-weight-bold">
  //         <span className="text-muted small">{props.value}</span>
  //       </span>
  //     </div>
  //     <div className="progress-group-bars" style={{height : 5}}>
  //       <Progress
  //         className="progress-xs"
  //         color={props.status}
  //         value={props.value/5 * 100}
  //       />
  //     </div>
  //   </div>
  <Col sm={12} md className="mb-sm-2 mb-0">
    <strong>{props.title}</strong>
    <Progress
      style={{ height: 5 }}
      className="progress-xs mt-2"
      color={props.status}
      value={props.value / 5 * 100}
    />
  </Col>
);

export default ProgressBars;
