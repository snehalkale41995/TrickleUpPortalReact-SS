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
import { Link } from "react-router-dom";
import ImageAllocationGrid from "../ImageAllocationGrid";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
class CropStepsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      cropNameDisabled: false,
      itemToDelete: "",
      audioToDelete: {},
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
      activeAudioAllocation: [],
      inActiveAudioAllocation :[],
      imageAllocation : [],
      loading: true,
      audioGridOpen: false,
      imageGridOpen : false,
    };
  }
  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      if (this.props.activeCropSteps.length !== 0) {
        let id = this.props.match.params.id;
        this.setCurrentStepToState(id);
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
  setCurrentStepToState(id){
    let compRef = this;
    this.props.getCropStepsAudioAllocation(id);
    let currentCropStep = _.find(this.props.activeCropSteps, function(cropStep) {
      return cropStep.Id == id;
    });
    if(currentCropStep !== undefined){
      currentCropStep.renderURL = `${AppConfig.serverURL}/${currentCropStep.MediaURL}`;
      let imageAllocation = _.filter(this.props.imageFiles, {
        FilePath: currentCropStep.renderURL
      });
      setTimeout(() => {
        let activeAudioAllocation = _.filter(
          compRef.props.cropStepAudioAllocation,
          { Active: true }
        );
        let inActiveAudioAllocation = _.filter(
          compRef.props.cropStepAudioAllocation,
          { Active: false }
        );
        compRef.setState({
          updateFlag: true,
          cropStep: currentCropStep,
          loading: false,
          cropNameDisabled: true,
          cropStepAudioAllocation: compRef.props.cropStepAudioAllocation,
          activeAudioAllocation: activeAudioAllocation,
          inActiveAudioAllocation :inActiveAudioAllocation,
          audioGridOpen: true,
          imageAllocation: imageAllocation,
          //videoGridOpen: true,
          imageGridOpen: true
        });
      }, 1000);
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
  /**--------------------------Audio allocation functions-------------------------------------- */
  playAudio(cell, row) {
    return <AudioPlayer autoPlay={false} source={row.FilePath} />;
  }
  showImage(cell, row){
    return (
      <img
        src={row.FilePath}
        style={{ height: 50, width: 50 }}
        alt=""
      />
    );
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
  onEditAudio(cell, row){
    return (
      <Link to={this} onClick={() => this.onEditAudioFile(row)}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
   
  }
  onEditAudioFile(row){
    if (this.props.match.params.id !== undefined) {
      this.props.history.push(
        `/cropCultivations/audioAllocation/${"cropStep"}/${this.props.match.params
          .id}/${row.AudioId}`
      );
    } 
  }
  
  onDeleteAudio(cell, row) {
    return (
      <Link to={this} onClick={() => this.deleteAudio(row)}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
  }
  deleteAudio(row) {
    this.setState({ audioToDelete: row });
    this.onModalToggle("audio");
  }
  onModalToggle(itemToDelete) {
    this.setState({
      itemToDelete: itemToDelete,
      modalStatus: !this.state.modalStatus
    });
  }
  onConfirmDeleteAudio() {
    let audioToDelete = { ...this.state.audioToDelete };
    let compRef = this;
    audioToDelete.Active = false;
    audioToDelete.ActiveBy = localStorage.getItem("user");
    audioToDelete.ActiveOn = new Date();
    this.props.deleteCropStepsAudioAllocation(audioToDelete.Id, audioToDelete);
    let displayMessage = "Crop step audio removed successfully";
    setTimeout(() => {
      let message = "";
      compRef.props.cropError
        ? (message = "Something went wrong !")
        : (message = displayMessage);
      Toaster.Toaster(message, compRef.props.cropError);
      compRef.setCurrentStepToState(this.props.match.params.id);
    }, 1000);
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  /**-------------------------------Image allocation functions----------------------------------- */
  imageToggleCollapse() {
    this.setState({
      imageGridOpen: !this.state.imageGridOpen
    });
  }
  onAddImage(){
    if (this.props.match.params.id !== undefined) {
      this.props.history.push(
        `/cropCultivations/imageAllocation/${"cropStep"}/${this.props.match.params
          .id}`
      );
    }
  }
  /**---------------------------------Render function=---------------------------------- */
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
                    maxLength={250}
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
                    maxLength={500}
                    label="Step description"
                    placeholder="Step description"
                    value={cropStep.Step_Description}
                    required={cropStep.Step_DescriptionRequired}
                    onChange={event => this.onChangeName(event)}
                  />
                </Col>
              </FormGroup>
              
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
                    <Col xs="12" >
                      <AudioAllocationGrid
                        audioAllocation={this.state.activeAudioAllocation}
                        playAudio={this.playAudio.bind(this)}
                        onEdit = {this.onEditAudio.bind(this)}
                        onDelete={this.onDeleteAudio.bind(this)}
                      />
                    </Col>
                  </FormGroup>
                </CollapseCards>
              </div>
              {/* <div style={{ marginTop: -30 }}>
                  <CollapseCards
                    subName="Image Allocation"
                    buttonName={this.state.imageAllocation.length === 0  ? "Add Image" : null}
                    buttonLink={this}
                    buttonClick={this.onAddImage.bind(this)}
                    isOpen={this.state.imageGridOpen}
                    toggleCollapse={this.imageToggleCollapse.bind(this)}
                  >
                    <FormGroup row>
                      <Col xs="12">
                        <ImageAllocationGrid
                            imageAllocation = {this.state.imageAllocation}
                            showImage ={this.showImage.bind(this)}
                        />
                      </Col>
                    </FormGroup> 
                  </CollapseCards>
                </div> */}
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
        {this.state.itemToDelete === "image" ? (
          <ConfirmModal
            isOpen={this.state.modalStatus}
            onModalToggle={this.onModalToggle.bind(this)}
            onConfirmDelete={this.onConfirmDeleteImage.bind(this)}
            title="Delete"
            message="Are you sure you want to remove this image ?"
          />
        ) : (
          <ConfirmModal
            isOpen={this.state.modalStatus}
            onModalToggle={this.onModalToggle.bind(this)}
            onConfirmDelete={this.onConfirmDeleteAudio.bind(this)}
            title="Delete"
            message="Are you sure you want to remove this audio ?"
          />
        )}

      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    cropsList: state.cropsReducer.cropsList,
    activeCropSteps :state.cropsReducer.activeCropSteps ,
    InactiveCropSteps: state.cropsReducer.InactiveCropSteps,
    cropStepAudioAllocation: state.cropsReducer.currentCropStepAudioAllocation,
    cropStepError: state.cropsReducer.cropStepError,
    imageFiles: state.mediaReducer.imageFiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropStepsAudioAllocation: id =>
      dispatch(actions.getCropStepsAudioAllocation(id)),
    clearAudioAllocations: () => dispatch(actions.clearAudioAllocations()),
    createCropStep: cropStep => dispatch(actions.createCropStep(cropStep)),
    updateCropStep: (id, cropStep) =>
      dispatch(actions.updateCropStep(id, cropStep)),
      deleteCropStepsAudioAllocation: (id, audioAllocation) =>
      dispatch(actions.deleteCropStepsAudioAllocation(id, audioAllocation)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropStepsForm);
