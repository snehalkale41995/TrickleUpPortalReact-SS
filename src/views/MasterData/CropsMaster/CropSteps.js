import React, { Component } from "react";
import { FormGroup, Col, Button, Label, Row } from "reactstrap";
import InputElement from "../../../components/InputElement/InputElement";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import CropStepLayout from "./CropStepLayout";
import CropMaterialLayout from "./CropMaterialLayout";
import { AppSwitch } from "@coreui/react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

let cropStepLayout;

class CropSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Crop: this.props.Crop,
      cropStatus: "Active",
      renderURL: "",
      filePath: ""
    };
  }
  componentDidMount (){
    if(this.props.updateFlag){
      this.setState({
        Crop : this.props.currentCropData
      })
    }
  }
  onChangeName(event) {
    let crop = { ...this.state.Crop };
    crop[event.target.name] = event.target.value;
    crop[event.target.name + "Required"] = false;
    this.setState({
      Crop: crop
    });
  }
  onSwitch(event) {
    let crop = { ...this.state.Crop };
    crop.Ready = event.target.checked;
    crop.Ready
      ? this.setState({
          Crop: crop,
          cropStatus: "Active"
        })
      : this.setState({
          Crop: crop,
          cropStatus: "Inactive"
        });
  }
  handleUploadFile = event => {
    if (event.target.files.length !== 0) {
      let data = event.target.files[0];
      let crop = { ...this.state.Crop };
      let data1 = new FormData();
      data1.append("FileName", data.name);
      let fileData = {};
      fileData.FileName = data.name;
      fileData.FileSize = data.size;
      fileData.MediaType = data.type;
      crop.FilePath = fileData;
      crop.FilePathRequired = false;

      let renderURL = URL.createObjectURL(event.target.files[0]);
      crop.renderURL = URL.createObjectURL(event.target.files[0]);
      this.setState({
        Crop: crop,
        renderURL: renderURL
      });
    } else {
      let crop = { ...this.state.Crop };
      this.setState({ filePath: "", Crop: crop, renderURL: "" });
    }
  };
  displayCropSteps() {
    if (this.state.Crop.Cultivation_Steps) {
      cropStepLayout = this.state.Crop.Cultivation_Steps.map((step, id) => {
        return (
          <div key={id}>
            <CropStepLayout
              id={id}
              onAddRequiredMaterial={event => this.onAddRequiredMaterial(id)}
              displayRequiredMaterial={this.displayRequiredMaterial(step)}
              onChangeStepValues={event => this.onChangeStepValues(event)}
              onDeleteStep={event => this.onDeleteStep(id)}
              step={step}
            />
          </div>
        );
      });
    }
    return cropStepLayout;
  }

  displayRequiredMaterial(step) {
    let cropMaterialList = step.CropSteps_Material.map((material, id) => {
      return (
        <div key={id}>
          <CropMaterialLayout
            id={id}
            onRepeatMaterial={event => this.onRepeatMaterial(step.Id, material)}
            onChangeMaterialValues={event =>
              this.onChangeMaterialValues(step.Id, event)}
            onDeleteMaterial={event => this.onDeleteMaterial(step.Id, id)}
            material={material}
          />
        </div>
      );
    });
    return cropMaterialList;
  }
  onChangeMaterialValues(stepId, event) {
    let cultivationStep = [...this.state.Crop.Cultivation_Steps];
    let material = cultivationStep[stepId].CropSteps_Material[event.target.id];
    material[event.target.name] = event.target.value;
    material[event.target.name + "Required"] = false;
    this.setState({
      ...this.state.Crop.Cultivation_Steps,
      cultivationStep
    });
  }
  onRepeatMaterial(stepId, material) {
    let crop = { ...this.state.Crop };
    let CropMaterialList = crop.Cultivation_Steps[stepId].CropSteps_Material;
    CropMaterialList.push(material);
    this.setState({
      Crop: crop
    });
  }
  onDeleteMaterial(stepId, materialId) {
    let crop = { ...this.state.Crop };
    let cropMaterial = crop.Cultivation_Steps[stepId].CropSteps_Material;
    cropMaterial = cropMaterial.filter((_, id) => id !== materialId);
    crop.Cultivation_Steps[stepId].CropSteps_Material = cropMaterial;
    this.setState({
      Crop: crop
    });
  }
  onAddCropStep() {
    let crop = { ...this.state.Crop };
    let stepId = crop.Cultivation_Steps.length;
    let cropStep = {
      Id: stepId,
      Step_Name: "",
      MediaURL: "",
      Step_Description: "",
      Description_Audio: "",
      Step_NameRequired: false,
      MediaURLRequired: false,
      Step_DescriptionRequired: false,
      Description_AudioRequired: false,
      CropSteps_Material: []
    };
    crop.Cultivation_Steps.push(cropStep);
    this.setState({
      Crop: crop
    });
  }
  onChangeStepValues(event) {
    let cultivationStep = { ...this.state.Crop.Cultivation_Steps };
    let id = parseInt(event.target.id);
    cultivationStep[id][event.target.name] = event.target.value;
    cultivationStep[id][event.target.name + "Required"] = false;
    this.setState({
      ...this.state.Crop.Cultivation_Steps,
      cultivationStep
    });
  }
  onAddRequiredMaterial(stepId) {
    let crop = { ...this.state.Crop };
    let requiredMaterial = {
      Step_Id: stepId,
      Material_Name: "",
      Material_Transaction: "",
      Per_Decimal_Price: "",
      Quantity: "",
      Image_Path: "",
      Audio_Path: "",
      Material_NameRequired: false,
      Material_TransactionRequired: false,
      Per_Decimal_PriceRequired: false,
      QuantityRequired: false,
      Image_PathRequired: false,
      Audio_PathRequired: false
    };
    crop.Cultivation_Steps[stepId].CropSteps_Material.push(requiredMaterial);
    this.setState({
      Crop: crop
    });
  }
  onDeleteStep(stepId) {
    let crop = { ...this.state.Crop };
    let cultivationStep = crop.Cultivation_Steps.filter(
      (step, index) => index !== stepId
    );
    cultivationStep.forEach((step, idx) => {
      step.Id = idx;
      step.CropSteps_Material.forEach(material => {
        material.Step_Id = idx;
      });
    });
    crop.Cultivation_Steps = cultivationStep;
    this.setState({
      Crop: crop
    });
  }
  onSubmitCropData() {
    let crop = { ...this.state.Crop };
    let validCrop = true;
    let validSteps = true;
    let validMaterial = true;
    if (!crop.CropName || !crop.FilePath) {
      validCrop = false;
      if (!crop.CropName) crop.CropNameRequired = true;
      if (!crop.FilePath) crop.FilePathRequired = true;
    }
    crop.Cultivation_Steps.forEach((step, id) => {
      if (
        !step.Step_Name ||
        !step.Step_Description ||
        !step.MediaURL ||
        !step.Description_Audio
      ) {
        validSteps = false;
        if (!step.Step_Name) step.Step_NameRequired = true;
        if (!step.Step_Description) step.Step_DescriptionRequired = true;
        if (!step.MediaURL) step.MediaURLRequired = true;
        if (!step.Description_Audio) step.Description_AudioRequired = true;
      }

      step.CropSteps_Material.forEach((material, id) => {
        if (
          !material.Material_Name ||
          !material.Material_Transaction ||
          !material.Per_Decimal_Price ||
          !material.Quantity ||
          !material.Audio_Path ||
          !material.Image_Path
        ) {
          validMaterial = false;
          if (!material.Material_Name) material.Material_NameRequired = true;
          if (!material.Material_Transaction)
            material.Material_TransactionRequired = true;
          if (!material.Per_Decimal_Price)
            material.Per_Decimal_PriceRequired = true;
          if (!material.Quantity) material.QuantityRequired = true;
          if (!material.Audio_Path) material.Audio_PathRequired = true;
          if (!material.Image_Path) material.Image_PathRequired = true;
        }
      });
    });
    this.setState({
      Crop: crop
    });
    if (validMaterial && validSteps && validCrop) {
      //alert("Valid")
      console.log("Valid", crop);
    }
    //this.props.onSubmit(this.state.Crop)
  }
  render() {
    return (
      <div style={{ marginLeft: 15 }}>
        <FormGroup row>
          <Col xs="12" md="6">
            <FormGroup row>
              <Col xs="12" md="10">
                <InputElement
                  type="text"
                  name="CropName"
                  label="Crop Name"
                  placeholder="Crop name"
                  value={this.state.Crop.CropName}
                  required={this.state.Crop.CropNameRequired}
                  onChange={event => this.onChangeName(event)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="10">
                <InputElement
                  type="file"
                  name="File Path"
                  label="Crop Image"
                  accept="image/*"
                  // value={this.state.Crop.FilePath.FileName}
                  required={this.state.Crop.FilePathRequired}
                  onChange={event => this.handleUploadFile(event)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="10">
                <Label />
                <Label>
                  {" "}
                  Crop status :
                  <AppSwitch
                    className={"mx-2"}
                    variant={"pill"}
                    color={"primary"}
                    checked={this.state.Crop.Ready}
                    onChange={this.onSwitch.bind(this)}
                  />
                  {this.state.cropStatus}{" "}
                </Label>
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            {this.state.Crop.renderURL !== "" ? (
              <img
                src={this.state.Crop.renderURL}
                style={{ height: 300, width: 350 }}
                alt=""
              />
            ) : null}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="2">
          <h4>Crop Steps:</h4>
          </Col>
          <Col  md="2">
          <Button
            type="button"
            size="md"
            color="success"
            onClick={this.onAddCropStep.bind(this)}
          >
            Add Crop Step
          </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          {/* <Button
            type="button"
            size="md"
            color="success"
            onClick={this.onAddCropStep.bind(this)}
          >
            Add Crop Step
          </Button> */}
        </FormGroup>
        {this.displayCropSteps()}

        {this.props.updateFlag ? (
          <FormGroup row style={{ marginLeft: -30 }}>
            <Col xs="12" md="1">
              <Button
                className="theme-positive-btn"
                onClick={() => this.onSubmitCropData()}
              >
                Save
              </Button>
            </Col>
          </FormGroup>
        ) : (
          <FormGroup row style={{ marginLeft: -30 }}>
            <Col xs="12" md="1">
              <Button
                className="theme-positive-btn"
                onClick={() => this.onSubmitCropData()}
              >
                Submit
              </Button>
            </Col>
            <Col md="1">
              <Button className="theme-reset-btn"> Reset</Button>
            </Col>
          </FormGroup>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    //cropsList: state.cropsReducer.cropsList,
    currentCropData: state.cropsReducer.currentCropData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //getCropsList: () => dispatch(actions.getCropsList()),
    //CropsCultivationSteps: (id) => dispatch(actions.getCropCultivationSteps(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropSteps);
