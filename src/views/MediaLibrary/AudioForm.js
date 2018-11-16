import React, { Component } from "react";
import { connect } from "react-redux";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Loader from "../../components/Loader/Loader";
class AudioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      audioFile: null,
      uploadedFile: null,
      renderURL: "",
      audioTitle: "",
      audioRequired: false
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
        audioRequired: true
      });
    }
  };

  onSubmitMedia() {
    let audioFile = this.state.audioFile;
    if (audioFile) {
      let audioData = new FormData();
      audioData.append("audio", audioFile);
      this.setState({ loading: true });
      this.props.history.push("/mediaContent/audioContent");
    } else {
      this.setState({ audioRequired: true });
    }
  }
  render() {
    const { audioTitle, renderURL, audioRequired } = this.state;
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Audio Upload"
        navigation={true}
        navigationRoute="/mediaContent/audioContent"
      >
        <div className="div-padding">
          <FormGroup row />
          <FormGroup row>
            <Col xs="12" md="6">
              <InputElement
                type="file"
                label="Audio file"
                name="Audio file"
                accept="audio/*"
                required={audioRequired}
                onChange={event => this.handleUploadFile(event)}
              />
            </Col>
            {renderURL ? (
              <Col md="6">
                <Label> {audioTitle}</Label>
                <AudioPlayer
                  source={renderURL}
                  autoPlay={true}
                  title={audioTitle}
                />
              </Col>
            ) : null}
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Button
                className="theme-positive-btn"
                onClick={this.onSubmitMedia.bind(this)}
              >
                Upload
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
export default connect(mapStateToProps, mapDispatchToProps)(AudioForm);
