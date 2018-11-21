import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../../components/InputElement/InputElement";
import { AppSwitch } from "@coreui/react";
import AppConfig from "../../../constants/AppConfig";
import Loader from "../../../components/Loader/Loader";
import _ from "lodash";
import AudioPlayer from "../../../components/AudioPlayer/AudioPlayer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
import CollapseCards from "../../../components/Cards/CollapseCards";
import AudioAllocationGrid from "../AudioAllocationGrid";
import { Link } from "react-router-dom";

class CropForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      cropStatus: "Active",
      crop: {
        CropName: "",
        FilePath: "",
        CropNameRequired: false,
        CropImageRequired: false,
        Active: true,
        Cultivation_Steps: [],
        renderURL: ""
      },
      audioAllocation: [],
      loading: true,
      audioGridOpen: false,
      videoGridOpen: false,
      imageGridOpen: false
    };
  }

  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      if (this.props.activeCrops.length !== 0) {
        let id = this.props.match.params.id;
        this.props.getCropAudioAllocation(id);
        let currentCrop = _.find(this.props.activeCrops, function(crop) {
          return crop.Id == id;
        });
        let cropStatus = "Inactive";
        if (currentCrop.Ready) {
          cropStatus = "Active";
          currentCrop.Active = true;
        }
        currentCrop.renderURL = `${AppConfig.serverURL}/${currentCrop.FilePath}`;
        setTimeout(() => {
          this.setState({
            updateFlag: true,
            crop: currentCrop,
            loading: false,
            audioAllocation: this.props.currentCropAudioAllocation,
            audioGridOpen: true,
            videoGridOpen: true,
            imageGridOpen: true,
            cropStatus: cropStatus
          });
        }, 1000);
      }
    } else {
      this.props.clearAudioAllocations();
      this.setState({
        loading: false
      });
    }
    if (this.props.cropError) {
      Toaster.Toaster("Something went wrong !", this.props.cropError);
    }
  }
  onChangeName(event) {
    let crop = { ...this.state.crop };
    crop[event.target.name] = event.target.value;
    crop[event.target.name + "Required"] = false;
    this.setState({
      crop: crop
    });
  }
  onSwitch(event) {
    let crop = { ...this.state.crop };
    crop.Active = event.target.checked;
    crop.Ready = event.target.checked;
    crop.Active
      ? this.setState({
          crop: crop,
          cropStatus: "Active"
        })
      : this.setState({
          crop: crop,
          cropStatus: "Inactive"
        });
  }
  playAudio(cell, row) {
    return <AudioPlayer autoPlay={false} source={row.FilePath} />;
  }
  onSubmit() {
    let crop = { ...this.state.crop };
    let imagedata = crop.FilePath;
    if (crop.CropName && crop.CropName.trim().length > 0) {
      crop.UpdatedBy = localStorage.getItem("user");
      crop.UpdatedOn = new Date();
      crop.CreatedBy = localStorage.getItem("user");
      crop.CreatedOn = new Date();
      let cropUpdateData = _.pick(crop, [
        "Id",
        "CropName",
        "FilePath",
        "UpdatedBy",
        "UpdatedOn",
        "Active"
      ]);
      let cropData = _.pick(crop, [
        "CropName",
        "FilePath",
        "CreatedBy",
        "CreatedOn",
        "Active"
      ]);
      if (this.state.updateFlag) {
        this.props.updateCrop(cropUpdateData.Id, cropUpdateData);
      } else {
        this.props.createCrop(cropData);
      }
      this.setState({ loading: true });
      let message = "";
      let compRef = this;
      setTimeout(() => {
        compRef.props.cropError
          ? (message = "Something went wrong !")
          : compRef.state.updateFlag
            ? (message = "Crop updated successfully")
            : (message = "Crop created successfully");
        compRef.onReset();
        //compRef.setState({ loading: false });
        Toaster.Toaster(message, compRef.props.cropError);
        setTimeout(() => {
          if (!compRef.props.cropError) {
            compRef.props.history.push("/cropCultivations/crops");
          }
        }, 1000);
      }, 1000);
    } else {
      if (!crop.CropName || crop.CropName.trim().length <= 0)
        crop.CropNameRequired = true;
      this.setState({
        crop: crop
      });
    }
  }
  audioToggleCollapse() {
    this.setState({
      audioGridOpen: !this.state.audioGridOpen
    });
  }
  videoToggleCollapse() {
    this.setState({
      videoGridOpen: !this.state.videoGridOpen
    });
  }
  imageToggleCollapse() {
    this.setState({
      imageGridOpen: !this.state.imageGridOpen
    });
  }
  onAddAudio() {
    if (this.props.match.params.id !== undefined) {
      this.props.history.push(
        `/cropCultivations/audioAllocation/${"crop"}/${this.props.match.params
          .id}`
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
        `/cropCultivations/audioAllocation/${"crop"}/${this.props.match.params
          .id}/${row.AudioId}`
      );
    } 
  }
  onReset() {
    this.setState({
      cropStatus: "Active",
      crop: {
        CropName: "",
        FilePath: "",
        CropNameRequired: false,
        CropImageRequired: false,
        Active: true,
        Cultivation_Steps: [],
        renderURL: ""
      }
    });
  }
  render() {
    let crop = { ...this.state.crop };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div>
        <CardLayout
          name="Crop Form"
          navigation={true}
          navigationRoute="/cropCultivations/crops"
        >
          <div className="div-padding">
            <FormGroup row>
              <Col xs="12" md="6">
                <FormGroup row>
                  <Col xs="10" md="8">
                    <InputElement
                      type="text"
                      name="CropName"
                      label="Crop name "
                      placeholder="Crop name"
                      value={crop.CropName}
                      required={crop.CropNameRequired}
                      onChange={event => this.onChangeName(event)}
                    />
                  </Col>
                </FormGroup>
                {/* <FormGroup row>
                  <Col xs="10" md="8">
                    <InputElement
                      type="file"
                      accept="image/*"
                      name="Crop Image"
                      label="Crop Image"
                      required={crop.CropImageRequired}
                      onChange={event => this.onImageChange(event)}
                    />
                  </Col>
                </FormGroup> */}
                <FormGroup row>
                  <Col xs="10" md="8">
                    <Label />
                    <Label>
                      Crop status :
                      <AppSwitch
                        className={"mx-2"}
                        variant={"pill"}
                        color={"primary"}
                        checked={crop.Active}
                        onChange={this.onSwitch.bind(this)}
                      />
                      {this.state.cropStatus}
                    </Label>
                  </Col>
                </FormGroup>
              </Col>
              <Col md="6">
                {/* {this.state.crop.renderURL !== "" ? ( */}
                <img
                  src={this.state.crop.renderURL}
                  // className="image-display"
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
                          audioAllocation={
                            this.props.currentCropAudioAllocation
                          }
                          playAudio={this.playAudio.bind(this)}
                          onEdit = {this.onEditAudio.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                  </CollapseCards>
                </div>
                <div style={{ marginTop: -30 }}>
                  <CollapseCards
                    subName="Image Allocation"
                    buttonName="Add Image"
                    buttonLink={this}
                    active="none"
                    //buttonClick={this.onAddAudio.bind(this)}
                    isOpen={this.state.imageGridOpen}
                    toggleCollapse={this.imageToggleCollapse.bind(this)}
                  >
                    <FormGroup row>
                      <Col xs="12" style={{ marginTop: -10 }} />
                    </FormGroup>
                  </CollapseCards>
                </div>
                <div style={{ marginTop: -30 }}>
                  <CollapseCards
                    subName="Video Allocation"
                    buttonName="Add Video"
                    buttonLink={this}
                    active="none"
                    //buttonClick={this.onAddAudio.bind(this)}
                    isOpen={this.state.videoGridOpen}
                    toggleCollapse={this.videoToggleCollapse.bind(this)}
                  >
                    <FormGroup row>
                      <Col xs="12" style={{ marginTop: -10 }} />
                    </FormGroup>
                  </CollapseCards>
                </div>
              </div>
            ) : null}

            {this.state.updateFlag ? (
              <FormGroup row>
                <Col md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={() => this.onSubmit()}
                    //style={{ pointerEvents: "none", opacity: 0.5 }}
                  >
                    Save
                  </Button>
                </Col>
              </FormGroup>
            ) : (
              <FormGroup row>
                <Col md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={() => this.onSubmit()}
                    //style={{ pointerEvents: "none" , opacity: 0.5}}
                  >
                    Create
                  </Button>
                </Col>
                <Col md="1">
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
        </CardLayout>
        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cropsList: state.cropsReducer.cropsList,
    currentCropAudioAllocation: state.cropsReducer.currentCropAudioAllocation,
    cropError: state.cropsReducer.cropError,
    activeCrops: state.cropsReducer.activeCrops,
    inActiveCrops: state.cropsReducer.inActiveCrops
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeCropImage: image => dispatch(actions.storeCropImage(image)),
    getCropAudioAllocation: id => dispatch(actions.getCropAudioAllocation(id)),
    clearAudioAllocations: () => dispatch(actions.clearAudioAllocations()),
    createCrop: crop => dispatch(actions.createCrop(crop)),
    updateCrop: (id, crop) => dispatch(actions.updateCrop(id, crop))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropForm);
