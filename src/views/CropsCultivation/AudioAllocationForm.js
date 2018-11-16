import React, { Component } from "react";
import { connect } from "react-redux";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Loader from "../../components/Loader/Loader";
import DropdownSelect from "../../components/InputElement/Dropdown";
import AsyncSelect from "react-select/lib/Async";
import _ from "lodash";

class AudioAllocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      audioCategory: "",
      id: "",
      inputValue: ""
    };
  }
  state = { inputValue: "" };
  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    return inputValue;
  };
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

  onSubmitMedia() {}
  render() {
    const filterColors = inputValue =>
      _.filter(this.props.audioOptions, function(o) {
        return o.label == inputValue.toLowerCase();
      });

    const loadOptions = (inputValue, callback) => {
      setTimeout(() => {
        callback(filterColors(inputValue));
      }, 1000);
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
              <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions
              onInputChange={this.handleInputChange}
              />
            </Col>
            <Col md="5">
              <Label />
              <AudioPlayer autoPlay={true} />
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
    audioOptions: state.mediaReducer.audioOptions
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
