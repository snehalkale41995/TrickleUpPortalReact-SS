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
import ImageAllocationGrid from "../ImageAllocationGrid";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
class CropForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      modalFlag: false,
      cropStatus: "Active",
      itemToDelete: "",
      audioToDelete: {},
      crop: {
        CropName: "",
        FilePath: "",
        CropNameRequired: false,
        CropImageRequired: false,
        Active: true,
        Ready: true,
        Cultivation_Steps: [],
        renderURL: ""
      },
      inActiveAudioAllocation: [],
      activeAudioAllocation: [],
      audioAllocation: [],
      imageAllocation: [],
      loading: true,
      audioGridOpen: false,
      videoGridOpen: false,
      imageGridOpen: false
    };
  }
  /**------------------------Component functions--------------------------- */
  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      if (this.props.activeCrops.length !== 0) {
        let id = this.props.match.params.id;
        this.setCurrentCropToState(id);
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
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.activeCrops !== this.props.activeCrops || nextProps.currentCropAudioAllocation !== this.props.currentCropAudioAllocation) {
  //     setTimeout(() => {
  //       this.setCurrentCropToState(this.props.match.params.id);
  //     }, 1000);
  //   }
  // }
  setCurrentCropToState(id) {
    this.props.getCropAudioAllocation(id);
    let currentCrop = _.find(this.props.activeCrops, function(crop) {
      return crop.Id == id;
    });
    if (currentCrop !== undefined) {
      if (currentCrop.Ready) {
        currentCrop.Active = true;
      } else {
        currentCrop.Active = false;
      }
      currentCrop.renderURL = `${AppConfig.serverURL}/${currentCrop.FilePath}`;
      let imageAllocation = _.filter(this.props.imageFiles, {
        FilePath: currentCrop.renderURL
      });
      setTimeout(() => {
        let activeAudioAllocation = _.filter(
          this.props.currentCropAudioAllocation,
          { Active: true }
        );
        let inActiveAudioAllocation = _.filter(
          this.props.currentCropAudioAllocation,
          { Active: false }
        );
        this.setState({
          updateFlag: true,
          crop: currentCrop,
          loading: false,
          activeAudioAllocation: activeAudioAllocation,
          inActiveAudioAllocation: inActiveAudioAllocation,
          audioAllocation: this.props.currentCropAudioAllocation,
          audioGridOpen: true,
          videoGridOpen: true,
          imageGridOpen: true,
          imageAllocation: imageAllocation
        });
      }, 1000);
    } else {
      this.props.history.push("/cropCultivations/crops");
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
        "Active",
        "Ready"
      ]);
      let cropData = _.pick(crop, [
        "CropName",
        "FilePath",
        "CreatedBy",
        "CreatedOn",
        "Active",
        "Ready"
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

        compRef.setState({ loading: false });
        Toaster.Toaster(message, compRef.props.cropError);
        setTimeout(() => {
          if (!compRef.props.cropError) {
            compRef.onReset();
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
  /**-----------Audio allocation functions------------------- */
  audioToggleCollapse() {
    this.setState({
      audioGridOpen: !this.state.audioGridOpen
    });
  }

  playAudio(cell, row) {
    return <AudioPlayer autoPlay={false} source={row.FilePath} />;
  }

  onAddAudio() {
    if (this.props.match.params.id !== undefined) {
      this.props.history.push(
        `/cropCultivations/audioAllocation/${"crop"}/${this.props.match.params
          .id}`
      );
    }
  }
  onEditAudio(cell, row) {
    return (
      <Link to={this} onClick={() => this.onEditAudioFile(row).bind(this)}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  onEditAudioFile(row) {
    if (this.props.match.params.id !== undefined) {
      this.props.history.push(
        `/cropCultivations/audioAllocation/${"crop"}/${this.props.match.params
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
  onConfirmDeleteAudio() {
    let audioToDelete = { ...this.state.audioToDelete };
    let compRef = this;
    audioToDelete.Active = false;
    audioToDelete.ActiveBy = localStorage.getItem("user");
    audioToDelete.ActiveOn = new Date();
    this.props.deleteAudioAllocation(audioToDelete.Id, audioToDelete);
    let displayMessage = "Crop audio removed successfully";
    setTimeout(() => {
      let message = "";
      compRef.props.cropError
        ? (message = "Something went wrong !")
        : (message = displayMessage);
      Toaster.Toaster(message, compRef.props.cropError);
      compRef.setCurrentCropToState(this.props.match.params.id);
    }, 1000);
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  /**------------------------Image Allocation functions ---------------------*/
  imageToggleCollapse() {
    this.setState({
      imageGridOpen: !this.state.imageGridOpen
    });
  }

  onAddImage() {
    if (this.props.match.params.id !== undefined) {
      this.props.history.push(
        `/cropCultivations/imageAllocation/${"crop"}/${this.props.match.params
          .id}`
      );
    }
  }
  showImage(cell, row) {
    return <img src={row.FilePath} style={{ height: 50, width: 50 }} alt="" />;
  }
  onDeleteCropImage(cell, row) {
    return (
      <Link to={this} onClick={() => this.onModalToggle("image")}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
  }
  onModalToggle(itemToDelete) {
    this.setState({
      itemToDelete: itemToDelete,
      modalStatus: !this.state.modalStatus
    });
  }
  onConfirmDeleteImage() {
    let crop = { ...this.state.crop };
    let compRef = this;
    crop.UpdatedBy = localStorage.getItem("user");
    crop.UpdatedOn = new Date();
    crop.FilePath = null;
    let cropUpdateData = _.pick(crop, [
      "Id",
      "FilePath",
      "UpdatedBy",
      "UpdatedOn"
    ]);
    this.props.updateCropImage(cropUpdateData.Id, cropUpdateData);
    let displayMessage = "Crop image removed successfully";
    setTimeout(() => {
      let message = "";
      compRef.props.cropError
        ? (message = "Something went wrong !")
        : (message = displayMessage);
      Toaster.Toaster(message, compRef.props.cropError);
      compRef.setCurrentCropToState(this.props.match.params.id);
    }, 1000);
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  /**---------------------------------------------------------*/
  // videoToggleCollapse() {
  //   this.setState({
  //     videoGridOpen: !this.state.videoGridOpen
  //   });
  // }

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
                      maxLength={250}
                      placeholder="Crop name"
                      value={crop.CropName}
                      required={crop.CropNameRequired}
                      onChange={event => this.onChangeName(event)}
                    />
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
                      <Col xs="12">
                        <AudioAllocationGrid
                          audioAllocation={this.state.activeAudioAllocation}
                          playAudio={this.playAudio.bind(this)}
                          onEdit={this.onEditAudio.bind(this)}
                          onDelete={this.onDeleteAudio.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                  </CollapseCards>
                </div>
                <div style={{ marginTop: -30 }}>
                  <CollapseCards
                    subName="Image Allocation"
                    buttonName={
                      this.state.imageAllocation.length === 0
                        ? "Add Image"
                        : null
                    }
                    buttonLink={this}
                    buttonClick={this.onAddImage.bind(this)}
                    isOpen={this.state.imageGridOpen}
                    toggleCollapse={this.imageToggleCollapse.bind(this)}
                  >
                    <FormGroup row>
                      <Col xs="12">
                        <ImageAllocationGrid
                          imageAllocation={this.state.imageAllocation}
                          showImage={this.showImage.bind(this)}
                          onDelete={this.onDeleteCropImage.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                  </CollapseCards>
                </div>
                {/*  <div style={{ marginTop: -30 }}>
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
                </div> */}
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
    inActiveCrops: state.cropsReducer.inActiveCrops,
    imageFiles: state.mediaReducer.imageFiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeCropImage: image => dispatch(actions.storeCropImage(image)),
    getCropAudioAllocation: id => dispatch(actions.getCropAudioAllocation(id)),
    clearAudioAllocations: () => dispatch(actions.clearAudioAllocations()),
    createCrop: crop => dispatch(actions.createCrop(crop)),
    updateCrop: (id, crop) => dispatch(actions.updateCrop(id, crop)),
    updateCropImage: (id, imageAllocate) =>
      dispatch(actions.updateCropImage(id, imageAllocate)),
    deleteAudioAllocation: (id, audioAllocation) =>
      dispatch(actions.deleteCropAudioAllocation(id, audioAllocation))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropForm);
