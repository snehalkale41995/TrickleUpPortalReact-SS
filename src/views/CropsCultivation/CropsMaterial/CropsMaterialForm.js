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
class CropMaterialForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      cropNameDisabled: false,
      cropMaterial: {
        Step_Id: "",
        Material_Name: "",
        Material_Transaction: "",
        Per_Decimal_Price: "",
        Quantity: "",
        Step_IdRequired: false,
        Material_NameRequired:false,
        Material_TransactionRequired: false,
        Per_Decimal_PriceRequired: false,
        QuantityRequired: false,
        CreatedBy : "",
        UpdatedBy : "",
        CreatedOn : "",
        UpdatedOn : "",
        Active : true
      },
      cropMaterialAudioAllocation: [],
      loading: true,
      audioGridOpen: false
    };
  }
  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      if (this.props.activeCropMaterial.length !== 0) {
        let id = this.props.match.params.id;
        this.props.getCropMaterialAudioAllocation(id);
        let currentCropMaterial = _.find(this.props.activeCropMaterial, function(
          cropMaterial
        ) {
          return cropMaterial.Id == id;
        });
        setTimeout(() => {
          this.setState({
            updateFlag: true,
            cropMaterial: currentCropMaterial,
            loading: false,
            cropNameDisabled: true,
            cropMaterialAudioAllocation: this.props.cropMaterialAudioAllocation,
            audioGridOpen: true
            // videoGridOpen: true,
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
    if (this.props.cropMaterialError) {
      Toaster.Toaster("Something went wrong !", this.props.cropMaterialError);
    }
  }
  onChangeHandler(event) {
    let cropMaterial = { ...this.state.cropMaterial };
    cropMaterial[event.target.name] = event.target.value;
    cropMaterial[event.target.name + "Required"] = false;
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
  playAudio(cell, row) {
    return <AudioPlayer autoPlay={false} source={row.FilePath} />;
  }
  onSubmit() {
    let cropMaterial = { ...this.state.cropMaterial };
    if(this.validCropMaterial(cropMaterial)){
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
      if(this.state.updateFlag){
        cropMaterialUpdatedData.UpdatedBy = localStorage.getItem("user");
        cropMaterialUpdatedData.UpdatedOn = new Date();
        this.props.updateCropMaterial(cropMaterialUpdatedData.Id, cropMaterialUpdatedData);
      }else{
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
    }else{
      if(!cropMaterial.Material_Name || cropMaterial.Material_Name.trim().length <= 0) cropMaterial.Material_NameRequired = true;
      if(!cropMaterial.Material_Transaction || cropMaterial.Material_Transaction.trim().length <= 0) cropMaterial.Material_TransactionRequired = true;
      if(!cropMaterial.Per_Decimal_Price || cropMaterial.Per_Decimal_Price.toString().trim().length <= 0) cropMaterial.Per_Decimal_PriceRequired = true;
      if(!cropMaterial.Quantity || cropMaterial.Quantity.trim().length <= 0) cropMaterial.QuantityRequired = true;
      if(!cropMaterial.Step_Id) cropMaterial.Step_IdRequired = true;
      this.setState({
        cropMaterial : cropMaterial
      })
    }
    
  }
  validCropMaterial(cropMaterial){
    if(cropMaterial.Material_Name && cropMaterial.Material_Name.trim().length > 0 &&
    cropMaterial.Material_Transaction && cropMaterial.Material_Transaction.trim().length > 0 &&
    cropMaterial.Per_Decimal_Price && cropMaterial.Per_Decimal_Price.toString().trim().length > 0 &&
    cropMaterial.Quantity  && cropMaterial.Quantity.trim().length > 0 &&
    cropMaterial.Step_Id
  ){
    return true;
  }else{
    return false;
  }
  }
  onReset(){
    this.setState({
      cropMaterial: {
        Step_Id: "",
        Material_Name: "",
        Material_Transaction: "",
        Per_Decimal_Price: "",
        Quantity: "",
        Step_IdRequired: false,
        Material_NameRequired:false,
        Material_TransactionRequired: false,
        Per_Decimal_PriceRequired: false,
        QuantityRequired: false
      }
    })
  }
  audioToggleCollapse() {
    this.setState({
      audioGridOpen: !this.state.audioGridOpen
    });
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
        `/cropCultivations/audioAllocation/${"cropMaterial"}/${this.props.match.params
          .id}/${row.AudioId}`
      );
    } 
  }
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
            <Col xs="12" md="5">
              <InputElement
                type="text"
                name="Material_Name"
                label="Material Name"
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
                label="Per Decimal Price"
                placeholder="Per_Decimal_Price"
                value={cropMaterial.Per_Decimal_Price}
                required={cropMaterial.Per_Decimal_PriceRequired}
                onChange={event => this.onChangeHandler(event)}
              />
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
                  <Col xs="12" style={{ marginTop: -10 }}>
                    <AudioAllocationGrid
                      audioAllocation={this.props.cropMaterialAudioAllocation}
                      playAudio={this.playAudio.bind(this)}
                      onEdit = {this.onEditAudio.bind(this)}
                    />
                  </Col>
                </FormGroup>
              </CollapseCards>
            </div>
          ) : null}

          {this.state.updateFlag ? (
            <FormGroup row>
              <Col xs="3" md="1">
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
              <Col xs="5" md="1">
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
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    activeCropMaterial :state.cropsReducer.activeCropMaterial,
    inActiveCropMaterial : state.cropsReducer.inActiveCropMaterial,
    cropMaterialAudioAllocation:
      state.cropsReducer.currentCropMaterialAudioAllocation,
    cropMaterialError: state.cropsReducer.cropMaterialError,
    cropStepList: state.cropsReducer.cropStepList,
    cropMaterialError: state.cropsReducer.cropMaterialError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropMaterialAudioAllocation: id =>
      dispatch(actions.getCropMaterialAudioAllocation(id)),
    clearAudioAllocations: () => dispatch(actions.clearAudioAllocations()),
    createCropMaterial : (cropMaterial) => dispatch(actions.createCropMaterial(cropMaterial)),
    updateCropMaterial : (id, cropMaterial) => dispatch(actions.updateCropMaterial(id,cropMaterial))
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropMaterialForm);
