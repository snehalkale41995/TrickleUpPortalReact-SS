import React, { Component } from "react";
import { connect } from "react-redux";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import Loader from "../../components/Loader/Loader";
import "../../../node_modules/video-react/dist/video-react.css"; // import css
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import * as actions from "../../store/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
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
    let compRef = this;
    if (videoFile) {
      let videoData = new FormData();
      videoData.append("video", videoFile);
      this.props.postVideoFile(videoData);
      this.setState({ loading: true });
      let message = "";
      setTimeout(() => {
        compRef.props.videoError
          ? (message = "Something went wrong !")
          : (message = "Video uploaded successfully");
        compRef.onReset();
        compRef.setState({ loading: false });
        Toaster.Toaster(message, compRef.props.videoError);
        setTimeout(() => {
          if (!compRef.props.videoError) {
            compRef.onReset();
            compRef.props.history.push("/mediaContent/videoContent");
          }
        }, 1000);
      }, 1000);
    } else {
      this.setState({ videoRequired: true });
    }
  }
  onReset() {
    this.setState({
      videoFile: null,
      uploadedFile: null,
      renderURL: "",
      videoTitle: "",
      videoRequired: false
    });
  }
  render() {
    const { videoTitle, videoFile, renderURL, videoRequired } = this.state;
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Video Upload"
        navigation={true}
        navigationRoute="/mediaContent/videoContent"
      >
        <div className="div-padding">
          <FormGroup row>
            <Col xs="12" md="6">
              <FormGroup row>
                <Col xs="12" md="10">
                  <InputElement
                    type="file"
                    label="Video file"
                    name="Video file"
                    accept="video/*"
                    value={videoFile === null ? "" : null}
                    required={videoRequired}
                    onChange={event => this.handleUploadFile(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12" md="2">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmitMedia.bind(this)}
                  >
                    Upload
                  </Button>
                </Col>
                <Col md="1">
                  <Button
                    className="theme-reset-btn"
                    onClick={this.onReset.bind(this)}
                  >
                    Reset
                  </Button>
                </Col>
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup row>
                {renderURL ? (
                  <Col xs="12" md="10">
                    <Label> {videoTitle}</Label>
                    <VideoPlayer source={renderURL} />
                  </Col>
                ) : null}
              </FormGroup>
            </Col>
          </FormGroup>
        </div>
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
export const mapStateToProps = state => {
  return {
    videoError: state.mediaReducer.videoError
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    postVideoFile: videoFile => dispatch(actions.postVideoFile(videoFile))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoForm);
