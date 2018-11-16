import React, { Component } from "react";
import { connect } from "react-redux";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Loader from "../../components/Loader/Loader";
import DropdownSelect from "../../components/InputElement/Dropdown";
import _ from "lodash";
import { Async } from "react-select";
import "react-select/dist/react-select.css";
class AudioAllocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      audioCategory: "",
      id: "",
      audioId: "",
      renderURL: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
        audioCategory: this.props.match.params.audioCategory,
        id: this.props.match.params.id
      });
    }, 2000);
  }
  goBack() {
    this.props.history.goBack();
  }
  handleInputChange = newValue => {
    if (newValue !== null) {
      let audioId = newValue;
      let audio = _.find(this.props.audioFiles, { Id: audioId.value });
      let renderURL = audio.FilePath;
      this.setState({ audioId, renderURL });
    } else {
      this.setState({ audioId: "", renderURL: "" });
    }
  };
  onSubmitMedia() {}
  render() {
    const options = this.props.audioOptions;
    const getOptions = (input, callback) => {
      let filterOpt = [];
      if (input) {
        filterOpt = _.filter(options, function(audio) {
          if (
            _.includes(audio.label.toLowerCase(), input.toLowerCase()) ||
            audio.label.toLowerCase() == input.toLowerCase()
          ) {
            return audio;
          }
        });
      }
      setTimeout(() => {
        callback(null, {
          options: filterOpt,
          complete: true
        });
      }, 500);
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Audio Allocation Form"
        navigation={true}
        navigationRoute={this}
        onClick={this.goBack.bind(this)}
      >
        <div className="div-padding">
          <FormGroup row />
          <FormGroup row>
            <Col xs="12" md="5">
              <Label>Audio category</Label>
              <DropdownSelect placeholder="Select audio category " />
            </Col>
            <Col md="5">
              <Label>Language</Label>
              <DropdownSelect placeholder="Select audio category " />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12" md="5">
              <Label>Audio</Label>
              <Async
                name="form-field-name"
                cacheOptions
                value={this.state.audioId}
                defaultOptions
                onChange={this.handleInputChange.bind(this)}
                loadOptions={getOptions}
              />
            </Col>
            <Col md="5">
              <Label />
              <AudioPlayer source={this.state.renderURL} autoPlay={false} />
            </Col>
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
  return {
    audioOptions: state.mediaReducer.audioOptions,
    audioFiles: state.mediaReducer.audioFiles
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    //storeMedia: fileData => dispatch(actions.postMediaContent(fileData))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  AudioAllocationForm
);
