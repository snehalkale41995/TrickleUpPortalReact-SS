import React, { Component } from "react";
import { connect } from "react-redux";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../../components/InputElement/InputElement";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import Loader from "../../../components/Loader/Loader";
import _ from "lodash";
import AudioPlayer from "../../../components/AudioPlayer/AudioPlayer";
import * as actions from "../../../store/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
import CollapseCards from "../../../components/Cards/CollapseCards";
import AudioAllocationGrid from "../AudioAllocationGrid";
import { Link } from "react-router-dom";
import ImageAllocationGrid from "../ImageAllocationGrid";
import AppConfig from "../../../constants/AppConfig";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
class CropMaterialForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      cropNameDisabled: false,
      itemToDelete: "",
      audioToDelete: {},
      cropMaterial: {
        Step_Id: "",
        Material_Name: "",
        Material_Transaction: "Debit",
        Per_Decimal_Price: "",
        Quantity: "",
        Step_IdRequired: false,
        Material_NameRequired: false,
        Material_TransactionRequired: false,
        Per_Decimal_PriceRequired: false,
        Per_Decimal_PriceInValid: false,
        QuantityRequired: false,
        CreatedBy: "",
        UpdatedBy: "",
        CreatedOn: "",
        UpdatedOn: "",
        Active: true,
        renderURL : ""
      },
      activeAudioAllocation: [],
      inActiveAudioAllocation: [],
      cropMaterialAudioAllocation: [],
      imageAllocation: [],
      loading: true,
      audioGridOpen: false
    };
  }
  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      if (this.props.activeCropMaterial.length !== 0) {
        let id = this.props.match.params.id;
        this.setCurrentMaterialToState(id);
      }
    } else {
      this.props.clearAudioAllocations();
      this.setState({
        loading: false
      });
    }
    if (this.props.cropMaterialError) {
      Toaster.Toaster("Something went wrong !", this.props.cropMaterialError);
    }
  }
  setCurrentMaterialToState(id) {
    let compRef = this;
    this.props.getCropMaterialAudioAllocation(id);
    let currentCropMaterial = _.find(this.props.activeCropMaterial, function(
      cropMaterial
    ) {
      return cropMaterial.Id == id;
    });
    if (currentCropMaterial !== undefined) {
      currentCropMaterial.renderURL = `${AppConfig.serverURL}/${currentCropMaterial.Image_Path}`;
      let imageAllocation = _.filter(this.props.imageFiles, {
        FilePath: currentCropMaterial.renderURL
      });
      setTimeout(() => {
        let activeAudioAllocation = _.filter(
          compRef.props.cropMaterialAudioAllocation,
          { Active: true }
        );
        let inActiveAudioAllocation = _.filter(
          compRef.props.cropMaterialAudioAllocation,
          { Active: false }
        );
        compRef.setState({
          updateFlag: true,
          cropMaterial: currentCropMaterial,
          loading: false,
          cropNameDisabled: true,
          cropMaterialAudioAllocation:
            compRef.props.cropMaterialAudioAllocation,
          activeAudioAllocation: activeAudioAllocation,
          inActiveAudioAllocation: inActiveAudioAllocation,
          audioGridOpen: true,
          imageAllocation: imageAllocation
          // videoGridOpen: true,
          //imageGridOpen: true
        });
      }, 1000);
    } else {
      this.props.history.push("/cropCultivations/CropsMaterial");
    }
  }
  onChangeHandler(event) {
    let cropMaterial = { ...this.state.cropMaterial };
    cropMaterial[event.target.name] = event.target.value;
    cropMaterial[event.target.name + "Required"] = false;
    cropMaterial[event.target.name + "InValid"] = false;
    this.setState({
      cropMaterial: cropMaterial
    });
  }
  onChangeStep(value) {
    let cropMaterial = { ...this.state.cropMaterial };
    cropMaterial.Step_Id = value;
    cropMaterial.Step_IdRequired = false;
    this.setState({
      cropMaterial: cropMaterial
    });
  }

  onSubmit() {
    let cropMaterial = { ...this.state.cropMaterial };
    if (this.validCropMaterial(cropMaterial)) {
      let cropMaterialData = _.pick(cropMaterial, [
        "Step_Id",
        "Material_Name",
        "Material_Transaction",
        "Per_Decimal_Price",
        "Quantity",
        "CreatedBy",
        "CreatedOn",
        "Active"
      ]);
      let cropMaterialUpdatedData = _.pick(cropMaterial, [
        "Id",
        "Step_Id",
        "Material_Name",
        "Material_Transaction",
        "Per_Decimal_Price",
        "Quantity",
        "UpdatedBy",
        "UpdatedOn",
        "Active"
      ]);
      if (this.state.updateFlag) {
        cropMaterialUpdatedData.UpdatedBy = localStorage.getItem("user");
        cropMaterialUpdatedData.UpdatedOn = new Date();
        this.props.updateCropMaterial(
          cropMaterialUpdatedData.Id,
          cropMaterialUpdatedData
        );
      } else {
        cropMaterialData.CreatedBy = localStorage.getItem("user");
        cropMaterialData.CreatedOn = new Date();
        this.props.createCropMaterial(cropMaterialData);
      }
      this.setState({ loading: true });
      let message = "";
      let compRef = this;
      setTimeout(() => {
        compRef.props.cropMaterialError
          ? (message = "Something went wrong !")
          : compRef.state.updateFlag
            ? (message = "Crop material updated successfully")
            : (message = "Crop material created successfully");
        compRef.onReset();
        compRef.setState({ loading: false });
        Toaster.Toaster(message, compRef.props.cropMaterialError);
        setTimeout(() => {
          if (!compRef.props.cropMaterialError) {
            compRef.props.history.push("/cropCultivations/CropsMaterial");
          }
        }, 1000);
      }, 1000);
    } else {
      let validPrice = /^\d+$/.test(cropMaterial.Per_Decimal_Price.toString())
      if (
        !cropMaterial.Material_Name ||
        cropMaterial.Material_Name.trim().length <= 0
      )
        cropMaterial.Material_NameRequired = true;
      if (
        !cropMaterial.Material_Transaction ||
        cropMaterial.Material_Transaction.trim().length <= 0
      )
        cropMaterial.Material_TransactionRequired = true;
      if (
        !cropMaterial.Per_Decimal_Price ||
        cropMaterial.Per_Decimal_Price.toString().trim().length <= 0
      )
        cropMaterial.Per_Decimal_PriceRequired = true;
        if(!validPrice){
          cropMaterial.Per_Decimal_PriceInValid = true;
        }
      if (!cropMaterial.Quantity || cropMaterial.Quantity.trim().length <= 0)
        cropMaterial.QuantityRequired = true;
      if (!cropMaterial.Step_Id) cropMaterial.Step_IdRequired = true;
      this.setState({
        cropMaterial: cropMaterial
      });
    }
  }

  validCropMaterial(cropMaterial) {
    let validPrice = /^\d+$/.test(cropMaterial.Per_Decimal_Price.toString())
    if (
      cropMaterial.Material_Name &&
      cropMaterial.Material_Name.trim().length > 0 &&
      cropMaterial.Material_Transaction &&
      cropMaterial.Material_Transaction.trim().length > 0 &&
      cropMaterial.Per_Decimal_Price &&
      cropMaterial.Per_Decimal_Price.toString().trim().length > 0 &&
      validPrice &&
      cropMaterial.Quantity &&
      cropMaterial.Quantity.trim().length > 0 &&
      cropMaterial.Step_Id
    ) {
      return true;
    } else {
      return false;
    }
  }
  onReset() {
    this.setState({
      cropMaterial: {
        Step_Id: "",
        Material_Name: "",
        Material_Transaction: "",
        Per_Decimal_Price: "",
        Quantity: "",
        Step_IdRequired: false,
        Material_NameRequired: false,
        Material_TransactionRequired: false,
        Per_Decimal_PriceRequired: false,
        Per_Decimal_PriceInValid :false,
        QuantityRequired: false
      }
    });
  }
  // Method for set only Numeric
  setInputToNumeric(e) {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  /**----------------------Audio Allocation functions- ------------------------------ */
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
        `/cropCultivations/audioAllocation/${"cropMaterial"}/${this.props.match
          .params.id}`
      );
    } else {
      this.props.history.push(
        `/cropCultivations/audioAllocation/${"cropMaterial"}`
      );
    }
  }
  onEditAudio(cell, row) {
    return (
      <Link to={this} onClick={() => this.onEditAudioFile(row)}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  onEditAudioFile(row) {
    if (this.props.match.params.id !== undefined) {
      this.props.history.push(
        `/cropCultivations/audioAllocation/${"cropMaterial"}/${this.props.match
          .params.id}/${row.AudioId}`
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
    this.props.deleteCropMaterialAudioAllocation(audioToDelete.Id, audioToDelete);
    let displayMessage = "Crop material audio removed successfully";
    setTimeout(() => {
      let message = "";
      compRef.props.cropMaterialError
        ? (message = "Something went wrong !")
        : (message = displayMessage);
      Toaster.Toaster(message, compRef.props.cropMaterialError);
      compRef.setCurrentMaterialToState(this.props.match.params.id);
    }, 1000);
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  /***------------------Image Allocation functions -------------------------------------- */
  // imageToggleCollapse() {
  //   this.setState({
  //     imageGridOpen: !this.state.imageGridOpen
  //   });
  // }
  // showImage(cell, row) {
  //   return <img src={row.FilePath} style={{ height: 50, width: 50 }} alt="" />;
  // }
  // onAddImage() {
  //   if (this.props.match.params.id !== undefined) {
  //     this.props.history.push(
  //       `/cropCultivations/imageAllocation/${"cropMaterial"}/${this.props.match
  //         .params.id}`
  //     );
  //   }
  // }

  render() {
    let cropMaterial = { ...this.state.cropMaterial };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Crops Material Form"
        navigation={true}
        navigationRoute="/cropCultivations/CropsMaterial"
      >
        <div className="div-padding">
          <FormGroup row>
            <Col xs="12" md="8">
              <FormGroup row>
                <Col xs="12" md="5">
                  <InputElement
                    type="text"
                    name="Material_Name"
                    label="Material Name"
                    maxLength={250}
                    placeholder="Material Name"
                    value={cropMaterial.Material_Name}
                    required={cropMaterial.Material_NameRequired}
                    onChange={event => this.onChangeHandler(event)}
                  />
                </Col>
                <Col md="5">
                  <Label> Step name</Label>
                  <DropdownSelect
                    name="Step name"
                    label="Step name"
                    maxLength={250}
                    placeholder="Step name"
                    options={this.props.cropStepList}
                    value={cropMaterial.Step_Id}
                    required={cropMaterial.Step_IdRequired}
                    onChange={this.onChangeStep.bind(this)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12" md="5">
                  <InputElement
                    type="text"
                    name="Material_Transaction"
                    label="Material Transaction"
                    maxLength={250}
                    placeholder="Material_Transaction"
                    value={cropMaterial.Material_Transaction}
                    required={cropMaterial.Material_TransactionRequired}
                    onChange={event => this.onChangeHandler(event)}
                  />
                </Col>
                <Col md="5">
                  <InputElement
                    type="text"
                    name="Quantity"
                    label="Quantity"
                    maxLength={250}
                    placeholder="Quantity"
                    value={cropMaterial.Quantity}
                    required={cropMaterial.QuantityRequired}
                    onChange={event => this.onChangeHandler(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12" md="5">
                  <InputElement
                    type="text"
                    name="Per_Decimal_Price"
                    maxLength={3}
                    onKeyPress={e => this.setInputToNumeric(e)}
                    label="Per Decimal Price"
                    placeholder="Per_Decimal_Price"
                    value={cropMaterial.Per_Decimal_Price}
                    required={cropMaterial.Per_Decimal_PriceRequired}
                    invalid= {cropMaterial.Per_Decimal_PriceInValid}
                    onChange={event => this.onChangeHandler(event)}
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="4">
            {
              this.state.cropMaterial.renderURL ?  <img
                src={this.state.cropMaterial.renderURL}
                height={300}
                width={350}
                alt=""
              /> : null
            }
             
            </Col>
          </FormGroup>

          
            {this.state.updateFlag ? (
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
                          audioAllocation={
                            this.state.activeAudioAllocation
                          }
                          playAudio={this.playAudio.bind(this)}
                          onEdit={this.onEditAudio.bind(this)}
                          onDelete={this.onDeleteAudio.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                  </CollapseCards>
                
                {/* <div style={{ marginTop: -30 }}>
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
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    activeCropMaterial: state.cropsReducer.activeCropMaterial,
    inActiveCropMaterial: state.cropsReducer.inActiveCropMaterial,
    cropMaterialAudioAllocation:
      state.cropsReducer.currentCropMaterialAudioAllocation,
    cropMaterialError: state.cropsReducer.cropMaterialError,
    cropStepList: state.cropsReducer.cropStepList,
    cropMaterialError: state.cropsReducer.cropMaterialError,
    imageFiles: state.mediaReducer.imageFiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropMaterialAudioAllocation: id =>
      dispatch(actions.getCropMaterialAudioAllocation(id)),
    clearAudioAllocations: () => dispatch(actions.clearAudioAllocations()),
    createCropMaterial: cropMaterial =>
      dispatch(actions.createCropMaterial(cropMaterial)),
    updateCropMaterial: (id, cropMaterial) =>
      dispatch(actions.updateCropMaterial(id, cropMaterial)),
    deleteCropMaterialAudioAllocation: (id, audio) =>
      dispatch(actions.deleteCropMaterialAudioAllocation(id, audio))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropMaterialForm);
