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

//const cropData = require('./cropStep.json');
class CropStepsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      cropNameDisabled: false,
      cropStep: {
        CropName: "",
        MediaURL: "",
        Step_Name: "",
        Step_Description: "",
        CropNameRequired: false,
        Step_DescriptionRequired: false,
        renderURL: ""
      },
      loading: true
    };
  }
  componentDidMount() {
    let compRef = this;
    if (this.props.match.params.id !== undefined) {
      if (this.props.cropSteps.length !== 0) {
        let id = this.props.match.params.id;
        let currentCropStep = _.find(this.props.cropSteps, function(cropStep) {
          return cropStep.Id == id;
        });
        currentCropStep.renderURL = `${AppConfig.serverURL}/${currentCropStep.MediaURL}`;
        this.setState({
          updateFlag: true,
          cropStep: currentCropStep,
          loading: false,
          cropNameDisabled: true
        });
      }
    } else {
      this.setState({
        loading: false
      });
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
  onImageChange(event) {
    if (event.target.files.length !== 0) {
      let file = event.target.files[0];
      let cropStep = { ...this.state.cropStep };
      let data = new FormData();
      data.append("FileName", file.name);
      data.append("FileSize", file.size);
      data.append("MediaType", file.type);
      cropStep.FilePath = data;
      cropStep.CropImageRequired = false;
      cropStep.renderURL = URL.createObjectURL(event.target.files[0]);
      this.setState({
        cropStep: cropStep
      });
    } else {
      let cropStep = { ...this.state.cropStep };
      cropStep.FilePath = "";
      cropStep.renderURL = "";
      this.setState({ cropStep: cropStep });
    }
  }
  onSwitch(event) {
    let cropStep = { ...this.state.cropStep };
    cropStep.Ready = event.target.checked;
    cropStep.Ready
      ? this.setState({
          cropStep: cropStep,
          cropStatus: "Active"
        })
      : this.setState({
          cropStep: cropStep,
          cropStatus: "Inactive"
        });
  }
  onSubmit() {
    this.props.history.push("/cropCultivations/CropSteps");
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
                  <InputElement
                    type="text"
                    name="CropName"
                    label="Crop name "
                    disabled={true}
                    placeholder="Crop name"
                    value={cropStep.CropName}
                    required={cropStep.CropNameRequired}
                    onChange={event => this.onChangeName(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="10" md="8">
                  <InputElement
                    type="text"
                    name="Step_Name"
                    label="Step Name"
                    placeholder="Step Name"
                    value={cropStep.Step_Name}
                    disabled={true}
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
                    label="Step Description"
                    placeholder="Step_Description"
                    value={cropStep.Step_Description}
                    disabled={true}
                    //required={cropStep.CropNameRequired}
                    onChange={event => this.onChangeName(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="10" md="8">
                  <InputElement
                    type="file"
                    name="MediaURL"
                    label="Upload media"
                    disabled={true}
                    //placeholder="MediaURL"
                    //value={cropStep.Step_Description}
                    //required={cropStep.CropNameRequired}
                    onChange={event => this.onImageChange(event)}
                  />
                </Col>
              </FormGroup>
              {this.state.updateFlag ? (
                <FormGroup row>
                  <Col md="1">
                    <Button
                      className="theme-positive-btn"
                      onClick={() => this.onSubmit()}
                      style={{ pointerEvents: "none", opacity :  0.50  }}
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
                      style={{ pointerEvents: "none", opacity :  0.50  }}
                    >
                      Create
                    </Button>
                  </Col>
                  <Col md="1">
                    <Button
                      className="theme-reset-btn"
                      style={{ pointerEvents: "none", opacity :  0.50  }}
                    >
                      {" "}
                      Reset
                    </Button>
                  </Col>
                </FormGroup>
              )}
            </Col>
            <Col md="6">
              {/* {this.state.cropStep.renderURL !== "" ? ( */}
              <img
                src={this.state.cropStep.renderURL}
                height ={300}
                width ={350}
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
    cropsList: state.cropsReducer.cropsList,
    cropSteps: state.cropsReducer.cropSteps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ///   getCropsList: () => dispatch(actions.getCropsList()),
    // CropsCultivationSteps: (id) => dispatch(actions.getCropCultivationSteps(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropStepsForm);
