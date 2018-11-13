import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import InputElement from "../../../components/InputElement/InputElement";
import DistrictsList from "./DistrictsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
import _ from "lodash";
import Loader from "../../../components/Loader/Loader";
class DistrictForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      updateFlag: false,
      district: {
        Id: "",
        DistrictName: "",
        State: "",
        UpdatedBy: "",
        UpdatedOn: "",
        CreatedBy: "",
        CreatedOn: "",
        Active: true,
        DistrictNameRequired: false,
        StateRequired: false
      },
      showList: false,
      editDistrict: this.props.editDistrict
    };
  }
  componentDidMount() {
    if (this.state.editDistrict) {
      this.setState({
        updateFlag: true,
        district: this.state.editDistrict
      });
    }
  }
  onStateSelect(value) {
    let district = { ...this.state.district };
    district.State = value;
    district.StateRequired = false;
    this.setState({
      district: district
    });
  }
  onChangeDistrict(event) {
    let district = { ...this.state.district };
    district[event.target.name] = event.target.value;
    district.DistrictNameRequired = false;
    this.setState({
      district: district
    });
  }
  onSubmit() {
    let district = { ...this.state.district };
    let compRef = this;
    let message = "";
    if (this.valid(district)) {
      if (this.state.updateFlag) {
        let updateDistrict = _.pick(district, [
          "Id",
          "DistrictName",
          "State",
          "UpdatedBy",
          "UpdatedOn",
          "CreatedBy",
          "CreatedOn",
          "Active"
        ]);
        updateDistrict.UpdatedBy = 1;
        updateDistrict.UpdatedOn = new Date();
        this.props.updateDistrict(updateDistrict.Id, updateDistrict);
        this.setState({ loading: true });
        setTimeout(() => {
          compRef.props.districtMasterError
            ? (message = "Something went wrong !")
            : (message = "District updated successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.districtMasterError);
          setTimeout(() => {
            if (!compRef.props.districtMasterError) {
              compRef.onReset();
              compRef.setState({ showList: true });
            }
          }, 1000);
        }, 1000);
      } else {
        district = _.pick(district, [
          "DistrictName",
          "State",
          "UpdatedBy",
          "UpdatedOn",
          "CreatedBy",
          "CreatedOn",
          "Active"
        ]);
        district.CreatedBy = 1;
        district.CreatedOn = new Date();
        this.props.createDistrict(district);
        this.setState({ loading: true });
        setTimeout(() => {
          compRef.props.districtMasterError
            ? (message = "Something went wrong !")
            : (message = "District created successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.districtMasterError);
          setTimeout(() => {
            if (!compRef.props.districtMasterError) {
              compRef.onReset();
              compRef.setState({ showList: true });
            }
          }, 1000);
        }, 1000);
      }
    }
  }
  valid(district) {
    if (district.DistrictName.trim().length > 0 && district.State) {
      return true;
    } else {
      if (!district.DistrictName || district.DistrictName.trim().length === 0)
        district.DistrictNameRequired = true;
      if (!district.State) district.StateRequired = true;
      this.setState({
        district: district
      });
      return false;
    }
  }
  onReset() {
    let district = {
      Id: "",
      DistrictName: "",
      State: "",
      UpdatedBy: "",
      UpdatedOn: "",
      CreatedBy: "",
      CreatedOn: "",
      Active: 1,
      DistrictNameRequired: false,
      StateRequired: false
    };
    this.setState({ district: district });
  }
  render() {
    const district = { ...this.state.district };

    return this.state.showList ? (
      <DistrictsList {...this.props} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="District Form"
        navigation={true}
        navigationRoute={this}
        onClick={() => {
          this.setState({ showList: true });
        }}
      >
        <FormGroup row />
        <div className="div-padding">
          <FormGroup row>
            <Col xs="10" md="5">
              <Label>State</Label>
              <DropdownSelect
                name="State name"
                placeholder="Please select state"
                required={district.StateRequired}
                options={this.props.statesList}
                onChange={this.onStateSelect.bind(this)}
                value={district.State}
              />
            </Col>
            <Col xs="10" md="5">
              <InputElement
                type="text"
                placeholder="Please enter district"
                name="DistrictName"
                label="District name"
                maxLength={255}
                required={district.DistrictNameRequired}
                value={district.DistrictName}
                onChange={event => this.onChangeDistrict(event)}
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
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    districtMasterError: state.districtReducer.districtMasterError,
    statesList: state.stateReducer.statesList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDistrict: (Id, district) =>
      dispatch(actions.updateDistrict(Id, district)),
    createDistrict: district => dispatch(actions.createDistrict(district))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DistrictForm);
