import React, { Component } from "react";
import { Route } from "react-router-dom";
import AudioContent from "./AudioContent";
import AudioForm from "./AudioForm";
import VideoContent from "./VideoContent";
import ImageContent from "./ImageContent";
export default class Media extends Component {
  render() {
    return (
      <div>
        <Route exact path={`${this.props.match.path}/audioContent`} component={AudioContent} />
        <Route exact path={`${this.props.match.path}/audioContent/audioUpload/:id?`} component={AudioForm} />
        <Route exact path={`${this.props.match.path}/videoContent`} component={VideoContent} />
        <Route exact path={`${this.props.match.path}/imageContent`} component={ImageContent} />
      </div>
    );
  }
}
