import React, { Component } from "react";
import { connect } from "react-redux";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Loader from "../../components/Loader/Loader";
import * as actions from "../../store/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
class AudioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      audioFile: null,
      uploadedFile: null,
      renderURL: "",
      audioTitle: "",
      audioRequired: false,
      audioName : ""
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }
  handleUploadFile = event => {
    if (event.target.files.length !== 0) {
      let audio = event.target.files[0];
      this.setState({
        audioFile: audio,
        renderURL: URL.createObjectURL(audio),
        audioTitle: audio.name,
        audioRequired: false
      });
    } else {
      this.setState({
        audioFile: null,
        renderURL: "",
        audioTitle: "",
        audioRequired: true,
      });
    }
  };

  onSubmitMedia() {
    let audioFile = this.state.audioFile;
    let compRef = this;
    if (audioFile) {
      let audioData = new FormData();
      audioData.append("audio", audioFile);
      this.props.postAudioFile(audioData);
      this.setState({ loading: true });
      let message = "";
      setTimeout(() => {
        compRef.props.audioError
          ? (message = "Something went wrong !")
          : (message = "Audio uploaded successfully");
        compRef.onReset();
        compRef.setState({ loading: false });
        Toaster.Toaster(message, compRef.props.audioError);
        setTimeout(() => {
          if (!compRef.props.audioError) {
            compRef.onReset();
            compRef.props.history.push("/mediaContent/audioContent");
          }
        }, 1000);
      }, 1000);
    } else {
      this.setState({ audioRequired: true });
    }
  }
  onReset() {
    this.setState({
      audioFile: null,
      uploadedFile: null,
      renderURL: "",
      audioTitle: "",
      audioRequired: false,
      audioName : ""
    });
  }
  render() {
    const { audioTitle, audioFile ,renderURL, audioRequired } = this.state;
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Audio Upload"
        navigation={true}
        navigationRoute="/mediaContent/audioContent"
      >
        <div className="div-padding">
          <FormGroup row>
            <Col xs="12" md="6">
              <FormGroup row>
                <Col xs="12" md="10">
                  <InputElement
                    type="file"
                    label="Audio file"
                    name="Audio file"
                    accept="audio/*"
                    value = {audioFile === null ? "" : null}
                    required={audioRequired}
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
                <Col  md="1">
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
                    <Label> {audioTitle}</Label>
                    <AudioPlayer
                      source={renderURL}
                      autoPlay={false}
                      title={audioTitle}
                    />
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
    audioError: state.mediaReducer.audioError
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    postAudioFile: audioFile => dispatch(actions.postAudioFile(audioFile))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AudioForm);
