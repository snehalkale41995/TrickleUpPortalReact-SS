import React, { Component } from "react";
import { connect } from "react-redux";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../../components/InputElement/InputElement";
import AppConfig from "../../../constants/AppConfig";
import Loader from "../../../components/Loader/Loader";
import * as actions from "../../../store/actions";
import _ from "lodash";
import AudioPlayer from "../../../components/AudioPlayer/AudioPlayer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
import CollapseCards from "../../../components/Cards/CollapseCards";
import AudioAllocationGrid from "../AudioAllocationGrid";
import DropdownSelect from "../../../components/InputElement/Dropdown";

class CropStepsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      cropNameDisabled: false,
      cropStep: {
        Crop_Id: "",
        MediaURL: "",
        Step_Name: "",
        Step_Description: "",
        Crop_IdRequired: false,
        Step_NameRequired: false,
        Step_DescriptionRequired: false,
        CreatedBy: "",
        CreatedOn: "",
        UpdatedBy: "",
        UpdatedOn: "",
        renderURL: ""
      },
      cropStepAudioAllocation: [],
      loading: true,
      audioGridOpen: false
    };
  }
  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      if (this.props.cropSteps.length !== 0) {
        let id = this.props.match.params.id;
        this.props.getCropStepsAudioAllocation(id);
        let currentCropStep = _.find(this.props.cropSteps, function(cropStep) {
          return cropStep.Id == id;
        });
        currentCropStep.renderURL = `${AppConfig.serverURL}/${currentCropStep.MediaURL}`;
        setTimeout(() => {
          this.setState({
            updateFlag: true,
            cropStep: currentCropStep,
            loading: false,
            cropNameDisabled: true,
            cropStepAudioAllocation: this.props.cropStepAudioAllocation,
            audioGridOpen: true
            //videoGridOpen: true,
            //imageGridOpen: true
          });
        }, 1000);
      }
    } else {
      this.props.clearAudioAllocations();
      this.setState({
        loading: false
      });
    }
    if (this.props.cropStepError) {
      Toaster.Toaster("Something went wrong !", this.props.cropStepError);
    }
  }
  onChangeName(event) {
    let cropStep = { ...this.state.cropStep };
    cropStep[event.target.name] = event.target.value;
    cropStep[event.target.name + "Required"] = false;
    this.setState({
      cropStep: cropStep
    });
  }
  onCropChange(value) {
    let cropStep = { ...this.state.cropStep };
    cropStep.Crop_Id = value;
    cropStep.Crop_IdRequired = false;
    this.setState({
      cropStep: cropStep
    });
  }
  // onImageChange(event) {
  //   if (event.target.files.length !== 0) {
  //     let file = event.target.files[0];
  //     let cropStep = { ...this.state.cropStep };
  //     let data = new FormData();
  //     data.append("FileName", file.name);
  //     data.append("FileSize", file.size);
  //     data.append("MediaType", file.type);
  //     cropStep.FilePath = data;
  //     cropStep.CropImageRequired = false;
  //     cropStep.renderURL = URL.createObjectURL(event.target.files[0]);
  //     this.setState({
  //       cropStep: cropStep
  //     });
  //   } else {
  //     let cropStep = { ...this.state.cropStep };
  //     cropStep.FilePath = "";
  //     cropStep.renderURL = "";
  //     this.setState({ cropStep: cropStep });
  //   }
  // }

  onSubmit() {
    let cropStepData = { ...this.state.cropStep };
    if (this.validCropStep(cropStepData)) {
      cropStepData.CreatedBy = localStorage.getItem("user");
      cropStepData.CreatedOn = new Date();
      cropStepData.UpdatedBy = localStorage.getItem("user");
      cropStepData.UpdatedOn = new Date();
      let cropStep = _.pick(cropStepData, [
        "Crop_Id",
        "Step_Name",
        "Step_Description",
        "CreatedBy",
        "CreatedOn",
        "Active"
      ]);
      let cropStepUpdate = _.pick(cropStepData, [
        "Id",
        "Crop_Id",
        "Step_Name",
        "Step_Description",
        "UpdatedBy",
        "UpdatedOn",
        "Active"
      ]);
      if (this.state.updateFlag) {
        this.props.updateCropStep(cropStepUpdate.Id, cropStepUpdate);
      } else {
        cropStep.Active = true;
        this.props.createCropStep(cropStep);
      }
      this.setState({ loading: true });
      let message = "";
      let compRef = this;
      setTimeout(() => {
        compRef.props.cropStepError
          ? (message = "Something went wrong !")
          : compRef.state.updateFlag
            ? (message = "Crop step updated successfully")
            : (message = "Crop step created successfully");
        compRef.onReset();
        compRef.setState({ loading: false });
        Toaster.Toaster(message, compRef.props.cropStepError);
        setTimeout(() => {
          if (!compRef.props.cropStepError) {
            compRef.props.history.push("/cropCultivations/CropSteps");
          }
        }, 1000);
      }, 1000);
    } else {
      if (!cropStepData.Crop_Id) cropStepData.Crop_IdRequired = true;
      if (!cropStepData.Step_Name || cropStepData.Step_Name.trim().length <= 0)
        cropStepData.Step_NameRequired = true;
      if (
        !cropStepData.Step_Description ||
        cropStepData.Step_Description.trim().length <= 0
      )
        cropStepData.Step_DescriptionRequired = true;
      this.setState({
        cropStep: cropStepData
      });
    }
  }
  validCropStep(cropStep) {
    if (
      cropStep.Crop_Id &&
      cropStep.Step_Name &&
      cropStep.Step_Name.trim().length > 0 &&
      cropStep.Step_Description &&
      cropStep.Step_Description.trim().length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  playAudio(cell, row) {
    return <AudioPlayer autoPlay={false} source={row.FilePath} />;
  }
  audioToggleCollapse() {
    this.setState({
      audioGridOpen: !this.state.audioGridOpen
    });
  }
  onAddAudio() {
    if (this.props.match.params.id !== undefined) {
      this.props.history.push(
        `/cropCultivations/audioAllocation/${"cropStep"}/${this.props.match
          .params.id}`
      );
    } else {
      this.props.history.push(
        `/cropCultivations/audioAllocation/${"cropStep"}`
      );
    }
  }
  onReset() {
    this.setState({
      cropStep: {
        Crop_Id: "",
        MediaURL: "",
        Step_Name: "",
        Step_Description: "",
        Crop_IdRequired: false,
        Step_NameRequired: false,
        Step_DescriptionRequired: false,
        CreatedBy: "",
        CreatedOn: "",
        UpdatedBy: "",
        UpdatedOn: "",
        renderURL: ""
      }
    });
  }
  render() {
    let cropStep = { ...this.state.cropStep };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Crop Step Form"
        navigation={true}
        navigationRoute="/cropCultivations/CropSteps"
      >
        <div className="div-padding">
          <FormGroup row>
            <Col xs="12" md="6">
              <FormGroup row>
                <Col xs="10" md="8">
                  <Label>Crop name</Label>
                  <DropdownSelect
                    label="Crop_Id"
                    name="Crop name"
                    options={this.props.cropsList}
                    value={cropStep.Crop_Id}
                    onChange={this.onCropChange.bind(this)}
                    required={cropStep.Crop_IdRequired}
                    simpleValue
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="10" md="8">
                  <InputElement
                    type="text"
                    name="Step_Name"
                    label="Step name"
                    placeholder="Step name"
                    value={cropStep.Step_Name}
                    required={cropStep.Step_NameRequired}
                    onChange={event => this.onChangeName(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="10" md="8">
                  <InputElement
                    type="textarea"
                    name="Step_Description"
                    label="Step description"
                    placeholder="Step description"
                    value={cropStep.Step_Description}
                    required={cropStep.Step_DescriptionRequired}
                    onChange={event => this.onChangeName(event)}
                  />
                </Col>
              </FormGroup>
              {/* <FormGroup row>
                <Col xs="10" md="8">
                  {/* <InputElement
                    type="file"
                    name="MediaURL"
                    label="Upload media"
                    //placeholder="MediaURL"
                    //value={cropStep.Step_Description}
                    //required={cropStep.Crop_IdRequired}
                    onChange={event => this.onImageChange(event)}
                  /> 
                </Col>
              </FormGroup> */}
            </Col>
            <Col md="6">
              {/* {this.state.cropStep.renderURL !== "" ? ( */}
              <img
                src={this.state.cropStep.renderURL}
                height={300}
                width={350}
                alt=""
              />
              {/* ) : null} */}
            </Col>
          </FormGroup>

          {this.state.updateFlag ? (
            <div>
              <div style={{ marginTop: 0 }}>
                <CollapseCards
                  subName="Audio Allocation"
                  buttonName="Add Audio"
                  buttonLink={this}
                  buttonClick={this.onAddAudio.bind(this)}
                  isOpen={this.state.audioGridOpen}
                  toggleCollapse={this.audioToggleCollapse.bind(this)}
                >
                  <FormGroup row>
                    <Col xs="12" style={{ marginTop: -10 }}>
                      <AudioAllocationGrid
                        audioAllocation={this.props.cropStepAudioAllocation}
                        playAudio={this.playAudio.bind(this)}
                      />
                    </Col>
                  </FormGroup>
                </CollapseCards>
              </div>
            </div>
          ) : null}
          {this.state.updateFlag ? (
            <FormGroup row>
              <Col xs="12" md="1">
                <Button
                  className="theme-positive-btn"
                  onClick={() => this.onSubmit()}
                >
                  Save
                </Button>
              </Col>
            </FormGroup>
          ) : (
            <FormGroup row>
              <Col xs="12" md="1">
                <Button
                  className="theme-positive-btn"
                  onClick={() => this.onSubmit()}
                >
                  Create
                </Button>
              </Col>
              <Col xs="12" md="1">
                <Button
                  className="theme-reset-btn"
                  onClick={() => this.onReset()}
                >
                  Reset
                </Button>
              </Col>
            </FormGroup>
          )}
        </div>
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    cropsList: state.cropsReducer.cropsList,
    cropSteps: state.cropsReducer.cropSteps,
    cropStepAudioAllocation: state.cropsReducer.currentCropStepAudioAllocation,
    cropStepError: state.cropsReducer.cropStepError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropStepsAudioAllocation: id =>
      dispatch(actions.getCropStepsAudioAllocation(id)),
    clearAudioAllocations: () => dispatch(actions.clearAudioAllocations()),
    createCropStep: cropStep => dispatch(actions.createCropStep(cropStep)),
    updateCropStep: (id, cropStep) =>
      dispatch(actions.updateCropStep(id, cropStep))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropStepsForm);
