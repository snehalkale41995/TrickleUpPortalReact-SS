import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import Loader from "../../components/Loader/Loader";
import _ from "lodash";
import "../../../node_modules/video-react/dist/video-react.css"; // import css
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

class VideoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      videoFile: null,
      uploadedFile: null,
      renderURL: "",
      videoTitle: "",
      videoRequired: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }
  handleUploadFile = event => {
    if (event.target.files.length !== 0) {
      let video = event.target.files[0];
      this.setState({
        videoFile: video,
        renderURL: URL.createObjectURL(video),
        videoTitle: video.name,
        videoRequired: false
      });
    } else {
      this.setState({
        videoFile: null,
        renderURL: "",
        videoTitle: "",
        videoRequired: true
      });
    }
  };

  onSubmitMedia() {
    let videoFile = this.state.videoFile;
    if (videoFile) {
      let videoData = new FormData();
      videoData.append("video", videoFile);
      this.setState({ loading: true });
      this.props.history.push("/mediaContent/videoContent");
    } else {
      this.setState({ videoRequired: true });
    }
  }
  render() {
    const { videoTitle, renderURL, videoRequired } = this.state;
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Video Upload"
        navigation={true}
        navigationRoute="/mediaContent/videoContent"
      >
        <div className="div-padding">
          <FormGroup row />
          <FormGroup row>
            <Col xs="12" md="6">
              <InputElement
                type="file"
                label="Video file"
                name="Video file"
                accept="video/*"
                required={videoRequired}
                onChange={event => this.handleUploadFile(event)}
              />
            </Col>
            {renderURL ? (
              <Col md="4">
                <Label> {videoTitle}</Label>
                <VideoPlayer source={renderURL} />
              </Col>
            ) : null}
            <Col md="2" />
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Button
                className="theme-positive-btn"
                onClick={this.onSubmitMedia.bind(this)}
              >
                Create
              </Button>
            </Col>
          </FormGroup>
        </div>
      </CardLayout>
    );
  }
}
export const mapStateToProps = state => {
  return {};
};

export const mapDispatchToProps = dispatch => {
  return {
    //storeMedia: fileData => dispatch(actions.postMediaContent(fileData))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoForm);
