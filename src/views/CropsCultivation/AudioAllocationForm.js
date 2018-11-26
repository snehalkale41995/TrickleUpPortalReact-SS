import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Loader from "../../components/Loader/Loader";
import DropdownSelect from "../../components/InputElement/Dropdown";
import _ from "lodash";
import { Async } from "react-select";
import "react-select/dist/react-select.css";
import * as options from "../../constants/StatusConstants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
class AudioAllocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      updateFlag: false,
      audioAllocation: {
        Id: "",
        StepId: "",
        CropId: "",
        MaterialId: "",
        LangId: "",
        LangIdRequired: false,
        FieldType: "",
        FieldTypeRequired: false,
        AudioId: "",
        AudioIdRequired: false,
        CreatedBy: "",
        CreatedOn: "",
        UpdatedBy: "",
        UpdatedOn: "",
        Active: true
      },
      fieldTypeOptions: [],
      audioCategory: "",
      id: "",
      audioValue: "",
      renderURL: "",
      error : ""
    };
  }
  componentWillMount() {
    let audioCategory = this.props.match.params.audioCategory;
    let id = this.props.match.params.id;
    if (audioCategory === "crop") {
      this.props.getCropAudioAllocation(id);
    } else if (audioCategory === "cropStep") {
      this.props.getCropStepsAudioAllocation(id);
    } else {
      this.props.getCropMaterialAudioAllocation(id);
    }
  }
  componentDidMount() {
    setTimeout(() => {
      let audioAllocation = { ...this.state.audioAllocation };
      let id = parseInt(this.props.match.params.id);
      let audioCategory = this.props.match.params.audioCategory;
      if (
        this.props.match.params.id !== undefined &&
        this.props.match.params.audioCategory !== undefined &&
        this.props.match.params.audioId !== undefined
      ) {
        let audioId = parseInt(this.props.match.params.audioId);
        let audioFile = _.find(this.props.audioFiles, { Id: audioId });
        let audioValue = _.find(this.props.audioOptions, {
          value: audioId
        });
        let audio = [];
        let fieldTypeOptions = [];
        let renderURL = "";
        if (audioCategory === "crop") {
          audio = _.find(this.props.cropAudioAllocation, {
            CropId: id,
            AudioId: audioId
          });
          fieldTypeOptions = options.cropFieldOptions;
        } else if (audioCategory === "cropStep") {
          audio = _.find(this.props.cropStepAudioAllocation, {
            StepId: id,
            AudioId: audioId
          });
          fieldTypeOptions = options.cropStepFieldOptions;
        } else {
          audio = _.find(this.props.cropMaterialAudioAllocation, {
            MaterialId: id,
            AudioId: audioId
          });
          fieldTypeOptions = options.cropMaterialFieldOptions;
        }
        this.setState({
          audioAllocation: audio,
          fieldTypeOptions: fieldTypeOptions,
          loading: false,
          renderURL: audioFile.FilePath,
          audioValue: audioValue,
          updateFlag: true,
          audioCategory: audioCategory
        });
      } else {
        let fieldTypeOptions = [];
        if (audioCategory === "crop") {
          audioAllocation.CropId = id;
          fieldTypeOptions = options.cropFieldOptions;
        } else if (audioCategory === "cropStep") {
          audioAllocation.StepId = id;
          fieldTypeOptions = options.cropStepFieldOptions;
        } else {
          audioAllocation.MaterialId = id;
          fieldTypeOptions = options.cropMaterialFieldOptions;
        }
        this.setState({
          audioAllocation,
          fieldTypeOptions: fieldTypeOptions,
          loading: false,
          audioCategory: audioCategory
        });
      }
    }, 1000);
  }
  goBack() {
    this.props.history.goBack();
  }
  handleAudioChange = audioSelected => {
    let audioAllocation = { ...this.state.audioAllocation };
    if (audioSelected !== null) {
      audioAllocation.AudioId = audioSelected.value;
      audioAllocation.AudioIdRequired = false;
      let audioValue = audioSelected;
      let audio = _.find(this.props.audioFiles, { Id: audioSelected.value });
      let renderURL = audio.FilePath;
      this.setState({ audioAllocation, renderURL, audioValue });
    } else {
      audioAllocation.AudioId = "";
      //audioAllocation.AudioIdRequired = true;
      this.setState({ audioAllocation, renderURL: "", audioValue: "" });
    }
  };
  handleFieldValueChange(fieldValue) {
    let audioAllocation = { ...this.state.audioAllocation };
    audioAllocation.FieldType = fieldValue;
    audioAllocation.FieldTypeRequired = false;
    this.setState({ audioAllocation });
  }
  handleLanguageChange(languageValue) {
    let audioAllocation = { ...this.state.audioAllocation };
    audioAllocation.LangId = languageValue;
    audioAllocation.LangIdRequired = false;
    this.setState({ audioAllocation });
  }
  onSubmit() {
    let audioAllocation = { ...this.state.audioAllocation };
    if (this.validAllocation(audioAllocation)) {
      if (this.state.updateFlag) {
        audioAllocation.UpdatedBy = localStorage.getItem("user");
        audioAllocation.UpdatedOn = new Date();
        if (this.state.audioCategory === "crop") {
          // this.props.deleteCropAudioAllocation(
          //   audioAllocation.Id,
          //   audioAllocation
          // );
        } else if (this.state.audioCategory === "cropStep") {
          // this.props.updateCropStepsAudioAllocation(
          //   audioAllocation.Id,
          //   audioAllocation
          // );
        } else {
          // this.props.deleteCropMaterialAudioAllocation(
          //   audioAllocation.Id,
          //   audioAllocation
          // );
        }
      } else {
        audioAllocation.CreatedBy = localStorage.getItem("user");
        audioAllocation.CreatedOn = new Date();
        if (this.state.audioCategory === "crop") {
          this.props.createCropAudioAllocation(audioAllocation);
        } else if (this.state.audioCategory === "cropStep") {
          this.props.createCropStepsAudioAllocation(audioAllocation);
        } else {
          this.props.createCropMaterialAudioAllocation(audioAllocation);
        }
      }
      let message= "";
      let compRef = this;
      this.setState({ loading: true });
      if (this.state.audioCategory === "crop") {
        if(this.props.cropError){
          this.setState({error : this.props.cropError });
        }else{
          this.setState({error : "" });
        }
      } else if (this.state.audioCategory === "cropStep") {
        if(this.props.cropStepError){
          this.setState({error : this.props.cropStepError });
        }else{
          this.setState({error : "" });
        }
      } else {
        if(this.props.cropMaterialError){
          this.setState({error : this.props.cropMaterialError });
        }else{
          this.setState({error : "" });
        }
      }

      setTimeout(() => {
        compRef.state.error
          ? (message = "Something went wrong !")
          : compRef.state.updateFlag
            ? (message = "Audio allocation updated successfully")
            : (message = "Audio allocation created successfully");
        compRef.onReset();
        compRef.setState({ loading: false });
        Toaster.Toaster(message,compRef.state.error);
        setTimeout(() => {
          if (!compRef.state.error) {
            compRef.goBack();
          }
        }, 1000);
      }, 1000);
    } else {
      if (!audioAllocation.FieldType) audioAllocation.FieldTypeRequired = true;
      if (!audioAllocation.LangId) audioAllocation.LangIdRequired = true;
      if (!audioAllocation.AudioId) audioAllocation.AudioIdRequired = true;
      this.setState({
        audioAllocation
      });
    }
  }
  validAllocation(audioAllocation) {
    if (
      audioAllocation.FieldType &&
      audioAllocation.LangId &&
      audioAllocation.AudioId &&
      (audioAllocation.CropId ||
        audioAllocation.StepId ||
        audioAllocation.MaterialId)
    ) {
      return true;
    } else {
      return false;
    }
  }
  onReset(){
    this.setState({
      audioAllocation: {
        Id: "",
        LangId: "",
        LangIdRequired: false,
        FieldType: "",
        FieldTypeRequired: false,
        AudioId: "",
        AudioIdRequired: false,
        CreatedBy: "",
        CreatedOn: "",
        UpdatedBy: "",
        UpdatedOn: "",
        Active: true
      },
      audioValue: "",
      renderURL: "",
      error : ""
    })
  }
  render() {
    const { audioAllocation } = this.state;
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
              <Label>Field Type</Label>
              <DropdownSelect
                name="Field type"
                placeholder="Select field type"
                options={this.state.fieldTypeOptions}
                value={audioAllocation.FieldType}
                required={audioAllocation.FieldTypeRequired}
                onChange={this.handleFieldValueChange.bind(this)}
              />
            </Col>
            <Col md="5">
              <Label>Language</Label>
              <DropdownSelect
                name="Language"
                placeholder="Select language "
                options={this.props.languagesList}
                value={audioAllocation.LangId}
                required={audioAllocation.LangIdRequired}
                onChange={this.handleLanguageChange.bind(this)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12" md="5">
              <Label>Audio</Label>
              <Async
                name="form-field-name"
                cacheOptions
                value={this.state.audioValue}
                defaultOptions
                onChange={this.handleAudioChange.bind(this)}
                loadOptions={getOptions}
              />
              {audioAllocation.AudioIdRequired ? (
                <div className="help-block">*Audio is required</div>
              ) : null}
            </Col>
            {this.state.renderURL ? <Col md="5">
              <Label />
              <AudioPlayer source={this.state.renderURL} autoPlay={false} />
            </Col> : null}
          </FormGroup>
          
            {this.state.updateFlag ? (
              <FormGroup row>
              <Col xs="12" md="2">
                <Button
                  className="theme-positive-btn"
                  onClick={this.onSubmit.bind(this)}
                >
                  Save
                </Button>
              </Col>
              </FormGroup>
            ) : (
              <FormGroup row>
              <Col xs="12"  md="1">
                <Button
                  className="theme-positive-btn"
                  onClick={this.onSubmit.bind(this)}
                >
                  Create
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
            )}
            {/* <Col md="3">
              <Button
                className="theme-positive-btn"
                onClick={this.onSubmit.bind(this)}
              >
                Create
              </Button>
            </Col> */}
          
        </div>
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
export const mapStateToProps = state => {
  return {
    audioOptions: state.mediaReducer.audioOptions,
    audioFiles: state.mediaReducer.audioFiles,
    cropAudioAllocation: state.cropsReducer.currentCropAudioAllocation,
    cropStepAudioAllocation: state.cropsReducer.currentCropStepAudioAllocation,
    cropMaterialAudioAllocation:
      state.cropsReducer.currentCropMaterialAudioAllocation,
    languagesList: state.languagesReducer.languagesList,
    cropMaterialError: state.cropsReducer.cropMaterialError,
    cropError: state.cropsReducer.cropError,
    cropStepError: state.cropsReducer.cropStepError
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getCropAudioAllocation: id => dispatch(actions.getCropAudioAllocation(id)),
    getCropStepsAudioAllocation: id =>
      dispatch(actions.getCropStepsAudioAllocation(id)),
    getCropMaterialAudioAllocation: id =>
      dispatch(actions.getCropMaterialAudioAllocation(id)),
    createCropAudioAllocation: audioAllocation =>
      dispatch(actions.createCropAudioAllocation(audioAllocation)),
    // deleteCropAudioAllocation: (id, audioAllocation) =>
    //   dispatch(actions.deleteCropAudioAllocation(id, audioAllocation)),
    createCropStepsAudioAllocation: audioAllocation =>
      dispatch(actions.createCropStepsAudioAllocation(audioAllocation)),
    // updateCropStepsAudioAllocation: (id, audioAllocation) =>
    //   dispatch(actions.updateCropStepsAudioAllocation(id, audioAllocation)),
    createCropMaterialAudioAllocation: audioAllocation =>
      dispatch(actions.createCropMaterialAudioAllocation(audioAllocation)),
    // deleteCropMaterialAudioAllocation: (id, audioAllocation) =>
    //   dispatch(actions.deleteCropMaterialAudioAllocation(id, audioAllocation))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  AudioAllocationForm
);
