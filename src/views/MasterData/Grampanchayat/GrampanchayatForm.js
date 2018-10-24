import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import InputElement from "../../../components/InputElement/InputElement";
import GrampanchayatList from "./GrampanchayatList";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
class GrampanchayatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grampanchayat: {
        GrampanchayatName: "",
        District: "",
        State: "",
        CreatedOn: "",
        CreatedBy: "",
        UpdatedOn: "",
        UpdatedBy: "",
        Active: true,
        GrampanchayatNameRequired: false,
        DistrictRequired: false,
        StateRequired: false
      },
      showList: false,
      grampanchayatToEdit: this.props.edit,
      updateFlag: false,
      districtOptions: this.props.districtsList
    };
  }
  componentDidMount() {
    if (Object.keys(this.state.grampanchayatToEdit).length !== 0) {
      this.setState({
        updateFlag: true,
        grampanchayat: this.state.grampanchayatToEdit
      });
    }
  }
  onChangeHandler(event) {
    let grampanchayat = { ...this.state.grampanchayat };
    grampanchayat[event.target.name] = event.target.value;
    grampanchayat[event.target.name + "Required"] = false;
    this.setState({
      grampanchayat: grampanchayat
    });
  }
  onStateValueChange(value) {
    let grampanchayat = { ...this.state.grampanchayat };
    grampanchayat.State = value;
    //grampanchayat.District = "";
    grampanchayat.StateRequired = false;
    let districtOptions = _.filter(this.props.districtsList, function(
      district
    ) {
      return district.stateId === value;
    });
    this.setState({
      grampanchayat: grampanchayat,
      districtOptions: districtOptions
    });
  }
  onDistrictValueChange(value) {
    let grampanchayat = { ...this.state.grampanchayat };
    grampanchayat.District = value;
    grampanchayat.DistrictRequired = false;
    this.setState({
      grampanchayat: grampanchayat
    });
  }
  onSubmit() {
    let compRef = this;
    let grampanchayat = { ...this.state.grampanchayat };
    if (this.valid(grampanchayat)) {
      let grampanchayatUpdate = _.pick(grampanchayat, [
        "Id",
        "GrampanchayatName",
        "District",
        "State",
        "UpdatedOn",
        "UpdatedBy",
        "Active"
      ]);
      grampanchayatUpdate.UpdatedBy = localStorage.getItem("user");
      grampanchayatUpdate.UpdatedOn = new Date();
      grampanchayatUpdate.Active = true;
      let grampanchayatCreate = _.pick(this.state.grampanchayat, [
        "GrampanchayatName",
        "District",
        "State",
        "CreatedOn",
        "CreatedBy",
        "Active"
      ]);
      grampanchayatCreate.CreatedBy = localStorage.getItem("user");
      grampanchayatCreate.CreatedOn = new Date();
      grampanchayatCreate.Active = true;
      this.state.updateFlag
        ? this.props.updateGrampanchayat(grampanchayatUpdate.Id , grampanchayatUpdate)
        : this.props.createGrampanchayat(grampanchayatCreate);
      this.setState({ loading: true });
      setTimeout(() => {
        let message = "";
        compRef.props.stateMasterError
          ? (message = "Something went wrong !")
          : compRef.state.updateFlag
            ? (message = "Grampanchayat updated successfully")
            : (message = "Grampanchayat created successfully");
        compRef.setState({ loading: false });
        Toaster.Toaster(message, compRef.props.grampanchayatMasterError);
        setTimeout(() => {
          if (!compRef.props.grampanchayatMasterError) {
            compRef.onReset();
            compRef.setState({ showList: true });
          }
        }, 1000);
      }, 1000);
    }
  }
  valid(grampanchayat) {
    if (
      grampanchayat.GrampanchayatName &&
      grampanchayat.District &&
      grampanchayat.State
    ) {
      return true;
    } else {
      !grampanchayat.GrampanchayatName
        ? (grampanchayat.GrampanchayatNameRequired = true)
        : null;
      !grampanchayat.District ? (grampanchayat.DistrictRequired = true) : null;
      !grampanchayat.State ? (grampanchayat.StateRequired = true) : null;

      this.setState({
        grampanchayat: grampanchayat
      });
      return false;
    }
  }
  onReset() {
    let grampanchayat = {
      VillageName: "",
      District: "",
      State: "",
      CreatedOn: "",
      CreatedBy: "",
      UpdatedOn: "",
      UpdatedBy: "",
      Active: true,
      VillageNameRequired: false,
      DistrictRequired: false,
      StateRequired: false
    };
    this.setState({
      grampanchayat: grampanchayat
    });
  }
  render() {
    let grampanchayat = { ...this.state.grampanchayat };
    return this.state.showList ? (
      <GrampanchayatList {...this.props} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout
          name="Grampanchayat Form"
          buttonNavigation={true}
          navigationCondition={() => {
            this.setState({ showList: true });
          }}
        >
          <div style={{ margin: 20 }}>
            <FormGroup row />
            <FormGroup row>
              <Col xs="10" md="5">
                <Label>State</Label>
                <DropdownSelect
                  name="States"
                  placeholder="Select State..."
                  options={this.props.statesList}
                  value={grampanchayat.State}
                  required={grampanchayat.StateRequired}
                  onChange={this.onStateValueChange.bind(this)}
                  simpleValue
                />
              </Col>
              <Col md="5">
                <Label>District</Label>
                <DropdownSelect
                  name="District"
                  placeholder="Select district..."
                  options={this.state.districtOptions}
                  value={grampanchayat.District}
                  required={grampanchayat.DistrictRequired}
                  onChange={this.onDistrictValueChange.bind(this)}
                  simpleValue
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="10" md="5">
                <InputElement
                  type="text"
                  label="Grampanchayat"
                  name="GrampanchayatName"
                  placeholder="Grampanchayat name"
                  value={grampanchayat.GrampanchayatName}
                  required={grampanchayat.GrampanchayatNameRequired}
                  onChange={event => this.onChangeHandler(event)}
                />
              </Col>
              <Col md="5" />
            </FormGroup>

            {this.state.updateFlag ? (
              <FormGroup row>
                <Col md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmit.bind(this)}
                  >
                    Save
                  </Button>
                </Col>
                {/* <Col md="1">
                  <Button
                    className="theme-reset-btn"
                    onClick={this.onReset.bind(this)}
                  >
                    Reset
                  </Button>
                </Col> */}
              </FormGroup>
            ) : (
              <FormGroup row>
              <Col md="1">
                <Button
                  className="theme-positive-btn"
                  onClick={this.onSubmit.bind(this)}
                >
                  Submit
                </Button>
              </Col>
              <Col md="1">
                <Button
                  className="theme-reset-btn"
                  onClick={this.onReset.bind(this)}
                >
                  Reset
                </Button>
              </Col>
            </FormGroup>
            )}
          </div>
        </CardLayout>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    statesList: state.stateReducer.statesList,
    statesData: state.stateReducer.states,
    districtsList: state.districtReducer.districtsList,
    grampanchayatMasterError:
      state.grampanchayatReducer.grampanchayatMasterError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createGrampanchayat: grampanchayat =>
      dispatch(actions.createGrampanchayat(grampanchayat)),
    updateGrampanchayat : (id ,grampanchayat) => dispatch(actions.updateGrampanchayat(id, grampanchayat))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GrampanchayatForm);
