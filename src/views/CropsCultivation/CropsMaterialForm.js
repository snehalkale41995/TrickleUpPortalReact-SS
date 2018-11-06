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

//const cropData = require('./cropMaterial.json');
class CropStepsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      cropNameDisabled: false,
      cropMaterial: {
        Material_Name: "",
        Material_Transaction: "",
        Per_Decimal_Price: "",
        Step_Name: "",
        Quantity: ""
      },
      loading: true
    };
  }
  componentDidMount() {
    let compRef = this;
    if (this.props.match.params.id !== undefined) {
      if (this.props.cropStepsMaterial.length !== 0) {
        let id = this.props.match.params.id;
        let currentCropMaterial = _.find(this.props.cropStepsMaterial, function(
          cropMaterial
        ) {
          return cropMaterial.Id == id;
        });
        //currentCropMaterial.renderURL = `${AppConfig.serverURL}/${currentCropMaterial.MediaURL}`;
        this.setState({
          updateFlag: true,
          cropMaterial: currentCropMaterial,
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
  onChangeHandler(event) {
    let cropMaterial = { ...this.state.cropMaterial };
    cropMaterial[event.target.name] = event.target.value;
    cropMaterial[event.target.name + "Required"] = false;
    this.setState({
      cropMaterial: cropMaterial
    });
  }

  onSubmit() {
    this.props.history.push("/cropCultivations/CropsMaterial");
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
                  disabled={true}
                  placeholder="Material Name"
                  value={cropMaterial.Material_Name}
                  required={cropMaterial.Material_NameRequired}
                  onChange={event => this.onChangeHandler(event)}
                />
              </Col>
              <Col md="5">
                <InputElement
                  type="text"
                  name="Step_Name"
                  label="Step Name"
                  disabled={true}
                  placeholder="Step Name"
                  value={cropMaterial.Step_Name}
                  required={cropMaterial.Step_NameRequired}
                  onChange={event => this.onChangeHandler(event)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <InputElement
                  type="text"
                  name="Material_Transaction"
                  label="Material Transaction"
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
                  placeholder="Per_Decimal_Price"
                  value={cropMaterial.Per_Decimal_Price}
                  required={cropMaterial.Per_Decimal_PriceRequired}
                  onChange={event => this.onChangeHandler(event)}
                />
              </Col>
            </FormGroup>
            {this.state.updateFlag ? (
              <FormGroup row>
                <Col xs="3" md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={() => this.onSubmit()}
                    style={{ pointerEvents: "none" }}
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
                    style={{ pointerEvents: "none" }}
                  >
                    Create
                  </Button>
                </Col>
                <Col md="1">
                  <Button className="theme-reset-btn" style={{ pointerEvents: "none" }}> Reset</Button>
                </Col>
              </FormGroup>
            )}
          </div>
        </CardLayout>
    
    );
  }
}
const mapStateToProps = state => {
  return {
    //cropsList: state.cropsReducer.cropsList,
    cropStepsMaterial: state.cropsReducer.cropStepsMaterial
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CropStepsForm);
