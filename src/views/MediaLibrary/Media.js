import React, { Component } from "react";
import { Route } from "react-router-dom";
import AudioContent from "./AudioContent";
import AudioForm from "./AudioForm";
import VideoContent from "./VideoContent";
import VideoForm  from "./VideoForm";
import ImageContent from "./ImageContent";
import ImageForm from "./ImageForm";
export default class Media extends Component {
  render() {
    return (
      <div>
        <Route exact path={`${this.props.match.path}/audioContent`} component={AudioContent} />
        <Route exact path={`${this.props.match.path}/audioContent/audioUpload/:id?`} component={AudioForm} />
        <Route exact path={`${this.props.match.path}/videoContent`} component={VideoContent} />
        <Route exact path={`${this.props.match.path}/videoContent/videoUpload/:id?`} component={VideoForm} />
        <Route exact path={`${this.props.match.path}/imageContent`} component={ImageContent} />
        <Route exact path={`${this.props.match.path}/imageContent/imageUpload/:id?`} component={ImageForm} />
      </div>
    );
  }
}
