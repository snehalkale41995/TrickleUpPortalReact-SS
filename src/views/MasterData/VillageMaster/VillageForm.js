import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import InputElement from "../../../components/InputElement/InputElement";
import VillageList from "./VillageList";
import _ from "lodash";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";

class VillageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      village: {
        VillageName: "",
        District: "",
        State: "",
        Grampanchayat: "",
        CreatedOn: "",
        CreatedBy: "",
        UpdatedOn: "",
        UpdatedBy: "",
        Active: true,
        VillageNameRequired: false,
        DistrictRequired: false,
        StateRequired: false,
        GrampanchayatRequired: false
      },
      showList: false,
      villageToEdit: this.props.edit,
      updateFlag: false,
      districtOptions: this.props.districtsList,
      grampanchayatOptions: this.props.grampanchayatsList,
      districtDisabled: true,
      grampanchayatDisabled: true
    };
  }
  componentDidMount() {
    if (Object.keys(this.state.villageToEdit).length !== 0) {
      let compRef = this;
      let districtOptions = _.filter(this.props.districtsList, function(
        district
      ) {
        return district.stateId === compRef.state.villageToEdit.State;
      });
      let grampanchayatOptions = _.filter(
        this.props.grampanchayatsList,
        function(grampanchayat) {
          return (
            grampanchayat.districtId === compRef.state.villageToEdit.District
          );
        }
      );
      this.setState({
        updateFlag: true,
        village: this.state.villageToEdit,
        districtOptions: districtOptions,
        grampanchayatOptions: grampanchayatOptions,
        districtDisabled: false,
        grampanchayatDisabled: false
      });
    }
  }
  onChangeHandler(event) {
    let village = { ...this.state.village };
    village[event.target.name] = event.target.value;
    village[event.target.name + "Required"] = false;
    this.setState({
      village: village
    });
  }
  onStateValueChange(value) {
    let village = { ...this.state.village };
    village.State = value;
    village.StateRequired = false;
    village.District = "";
    village.Grampanchayat = "";
    let districtOptions = _.filter(this.props.districtsList, function(
      district
    ) {
      return district.stateId === value;
    });
    this.setState({
      village: village,
      districtOptions: districtOptions,
      districtDisabled: false,
      grampanchayatOptions: []
    });
  }
  onDistrictValueChange(value) {
    let village = { ...this.state.village };
    village.District = value;
    village.DistrictRequired = false;
    village.Grampanchayat = "";
    let grampanchayatOptions = _.filter(this.props.grampanchayatsList, function(
      grampanchayat
    ) {
      return grampanchayat.districtId === value;
    });

    this.setState({
      village: village,
      grampanchayatOptions: grampanchayatOptions,
      grampanchayatDisabled: false
    });
  }
  onGrampanchayatValueChange(value) {
    let village = { ...this.state.village };
    village.Grampanchayat = value;
    village.GrampanchayatRequired = false;
    this.setState({
      village: village
    });
  }
  onSubmit() {
    let village = { ...this.state.village };
    let compRef = this;
    if (this.valid(village)) {
      let villageUpdate = _.pick(village, [
        "Id",
        "VillageName",
        "Grampanchayat",
        "District",
        "State",
        "UpdatedOn",
        "UpdatedBy",
        "Active"
      ]);
      villageUpdate.UpdatedBy = localStorage.getItem("user");
      villageUpdate.UpdatedOn = new Date();
      villageUpdate.Active = true;
      let villageCreate = _.pick(this.state.village, [
        "VillageName",
        "Grampanchayat",
        "District",
        "State",
        "CreatedOn",
        "CreatedBy",
        "Active"
      ]);
      villageCreate.CreatedBy = localStorage.getItem("user");
      villageCreate.CreatedOn = new Date();
      villageCreate.Active = true;
      this.state.updateFlag
        ? this.props.updateVillage(villageUpdate.Id, villageUpdate)
        : this.props.createVillage(villageUpdate);
      this.setState({ loading: true });
      setTimeout(() => {
        let message = "";
        compRef.props.villageMasterError
          ? (message = "Something went wrong !")
          : compRef.state.updateFlag
            ? (message = "Village updated successfully")
            : (message = "Village created successfully");
        compRef.setState({ loading: false });
        Toaster.Toaster(message, compRef.props.villageMasterError);
        setTimeout(() => {
          if (!compRef.props.villageMasterError) {
            compRef.onReset();
            compRef.setState({ showList: true });
          }
        }, 1000);
      }, 1000);
    }
  }
  valid(village) {
    if (
      village.VillageName &&
      village.District &&
      village.State &&
      village.Grampanchayat
    ) {
      return true;
    } else {
      !village.VillageName ? (village.VillageNameRequired = true) : null;
      !village.District ? (village.DistrictRequired = true) : null;
      !village.State ? (village.StateRequired = true) : null;
      !village.Grampanchayat ? (village.GrampanchayatRequired = true) : null;
      this.setState({
        village: village
      });
      return false;
    }
  }
  onReset() {
    let village = {
      VillageName: "",
      District: "",
      State: "",
      Grampanchayat: "",
      CreatedOn: "",
      CreatedBy: "",
      UpdatedOn: "",
      UpdatedBy: "",
      Active: true,
      VillageNameRequired: false,
      DistrictRequired: false,
      StateRequired: false,
      GrampanchayatRequired: false
    };
    this.setState({
      village: village
    });
  }
  render() {
    let village = { ...this.state.village };

    return this.state.showList ? (
      <VillageList {...this.props} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Village Form"
        navigation={true}
        navigationRoute={this}
        onClick={() => {
          this.setState({ showList: true });
        }}
      >
        <div className="div-padding">
          <FormGroup row />
          <FormGroup row>
            <Col xs="10" md="5">
              <Label>State</Label>
              <DropdownSelect
                name="States"
                placeholder="Select State..."
                options={this.props.statesList}
                value={village.State}
                required={village.StateRequired}
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
                value={village.District}
                disabled={this.state.districtDisabled}
                required={village.DistrictRequired}
                onChange={this.onDistrictValueChange.bind(this)}
                simpleValue
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="10" md="5">
              <Label>Grampanchayat</Label>
              <DropdownSelect
                name="Grampanchayat"
                placeholder="Select grampanchayat..."
                options={this.state.grampanchayatOptions}
                value={village.Grampanchayat}
                disabled={this.state.grampanchayatDisabled}
                required={village.GrampanchayatRequired}
                onChange={this.onGrampanchayatValueChange.bind(this)}
                simpleValue
              />
            </Col>
            <Col md="5">
              <InputElement
                type="text"
                label="Village"
                name="VillageName"
                maxLength={255}
                placeholder="Please enter village name"
                value={village.VillageName}
                required={village.VillageNameRequired}
                onChange={event => this.onChangeHandler(event)}
              />
            </Col>
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
            </FormGroup>
          ) : (
            <FormGroup row>
              <Col md="1">
                <Button
                  className="theme-positive-btn"
                  onClick={this.onSubmit.bind(this)}
                >
                  Create
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
        <ToastContainer autoClose={2000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    statesList: state.stateReducer.statesList,
    grampanchayatsList: state.grampanchayatReducer.grampanchayatsList,
    districtsList: state.districtReducer.districtsList,
    villageMasterError: state.villageReducer.villageMasterError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createVillage: village => dispatch(actions.createVillage(village)),
    updateVillage: (id, village) => dispatch(actions.updateVillage(id, village))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VillageForm);
