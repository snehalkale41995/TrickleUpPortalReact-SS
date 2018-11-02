import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../components/InputElement/Dropdown";
import InputElement from "../../components/InputElement/InputElement";
import { AppSwitch } from "@coreui/react";
import AppConfig from "../../constants/AppConfig";
import CropSteps from "./CropSteps";
import Loader from "../../components/Loader/Loader";
import _ from "lodash";

//const cropData = require('./crop.json');
class CropForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      cropStatus: "Inactive",
      crop: {
        CropName: "",
        FilePath: "",
        CropNameRequired: false,
        CropImageRequired: false,
        Ready: false,
        Cultivation_Steps: [],
        renderURL: ""
      },
      loading: true
    };
  }
  componentDidMount() {
    let compRef = this;
    if (this.props.match.params.id !== undefined) {
      if (this.props.cropsList.length !== 0) {
        let id = this.props.match.params.id;
        let currentCrop = _.find(this.props.cropsList, function(crop) {
          return crop.Id == id;
        });
        currentCrop.renderURL = `${AppConfig.serverURL}/${currentCrop.FilePath}`;
        this.setState({
          updateFlag: true,
          crop: currentCrop,
          loading: false
        });
      }
    } else {
      this.setState({
        loading: false
      });
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
  onImageChange(event) {
    if (event.target.files.length !== 0) {
      let file = event.target.files[0];
      let crop = { ...this.state.Crop };
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      crop.FilePath = formData;
      crop.CropImageRequired = false;
      crop.renderURL = URL.createObjectURL(event.target.files[0]);
      this.setState({
        crop: crop
      });
    } else {
      let crop = { ...this.state.crop };
      crop.FilePath = "";
      crop.renderURL = "";
      this.setState({ crop: crop });
    }
  }
  onSwitch(event) {
    let crop = { ...this.state.crop };
    crop.Ready = event.target.checked;
    crop.Ready
      ? this.setState({
          crop: crop,
          cropStatus: "Active"
        })
      : this.setState({
          crop: crop,
          cropStatus: "Inactive"
        });
  }
  onSubmit() {
    let crop = { ...this.state.crop };
    let imagedata = crop.FilePath;
    this.props.storeCropImage(imagedata);
    //this.props.history.push("/cropCultivations/crops");
  }
  render() {
    let crop = { ...this.state.crop };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
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
              <FormGroup row>
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
              </FormGroup>
              <FormGroup row>
                <Col xs="10" md="8">
                  <Label />
                  <Label>
                    Crop status :
                    <AppSwitch
                      className={"mx-2"}
                      variant={"pill"}
                      color={"primary"}
                      checked={crop.Ready}
                      onChange={this.onSwitch.bind(this)}
                    />
                    {this.state.cropStatus}
                  </Label>
                </Col>
              </FormGroup>
              {this.state.updateFlag ? (
                <FormGroup row>
                  <Col md="1">
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
                  <Col md="2">
                    <Button
                      className="theme-positive-btn"
                      onClick={() => this.onSubmit()}
                    >
                      Create
                    </Button>
                  </Col>
                  <Col md="1">
                    <Button className="theme-reset-btn"> Reset</Button>
                  </Col>
                </FormGroup>
              )}
            </Col>
            <Col md="6">
              {/* {this.state.crop.renderURL !== "" ? ( */}
              <img
                src={this.state.crop.renderURL}
                className="image-display"
                alt=""
              />
              {/* ) : null} */}
            </Col>
          </FormGroup>
        </div>
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    cropsList: state.cropsReducer.cropsList
    // currentCropData: state.cropsReducer.currentCropData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeCropImage: image => dispatch(actions.storeCropImage(image))
    ///   getCropsList: () => dispatch(actions.getCropsList()),
    // CropsCultivationSteps: (id) => dispatch(actions.getCropCultivationSteps(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropForm);
