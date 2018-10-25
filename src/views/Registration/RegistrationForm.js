import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../components/InputElement/Dropdown";
import InputElement from "../../components/InputElement/InputElement";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Loader from "../../components/Loader/Loader";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
import AppConfig from "../../constants/AppConfig";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {
        Id: "",
        UserName: "",
        Active: true,
        Name: "",
        NameRequired: false,
        PhoneNumber: "",
        PhoneNumberRequired: false,
        PhoneNumberInvalid: false,
        Age: "",
        AgeRequired: false,
        AgeInvalid: false,
        Gender: "",
        State: "",
        District: "",
        Village: "",
        Grampanchayat: "",
        Aadhaar: "",
        AadhaarInvalid: false,
        IMEI1: null,
        IMEI2: null,
        Role: "",
        Language: "",
        FCMToken: "",
        CreatedBy: "",
        CreatedOn: "",
        UpdatedBy: "",
        UpdatedOn: "",
        ActiveBy: "",
        ActiveOn: "",
        ImagePath: "",
        BulkUploadId: ""
      },
      genderRequired: false,
      stateRequired: false,
      districtRequired: false,
      grampanchayatRequired: false,
      villageRequired: false,
      roleRequired: false,
      languageRequired: false,
      updateFlag: false,
      districtOptions: this.props.districtsList,
      grampanchayatOptions: this.props.grampanchayatsList,
      villageOptions: this.props.villagesList,
      districtDisabled: false,
      grampanchayatDisabled: false,
      villageDisabled: false
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    if (this.props.match.params.id !== undefined) {
      let id = this.props.match.params.id;
      this.props.getBeneficiaryById(id);
      setTimeout(() => {
        if (this.props.currentBeneficiary) {
          this.setState({
            user: this.props.currentBeneficiary,
            updateFlag: true
          });
        }
      }, 1000);
    } else {
      this.setState({
        districtDisabled: true,
        grampanchayatDisabled: true,
        villageDisabled: true
      });
    }
  }
  onChangeInput(event) {
    let user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    user[event.target.name + "Required"] = false;
    user[event.target.name + "Invalid"] = false;
    this.setState({
      user: user
    });
  }
  onGenderSelection(value) {
    let user = { ...this.state.user };
    user.Gender = value;
    this.setState({
      user: user,
      genderRequired: false
    });
  }
  onStateSelection(value) {
    let user = { ...this.state.user };
    user.State = value;
    user.District = "";
    user.Grampanchayat = "";
    user.Village = "";
    let districtOptions = _.filter(this.props.districtsList, function(
      district
    ) {
      return district.stateId === value;
    });
    this.setState({
      user: user,
      stateRequired: false,
      districtOptions: districtOptions,
      grampanchayatOptions: [],
      villageOptions: [],
      districtDisabled: false
    });
  }
  onDistrictSelection(value) {
    let user = { ...this.state.user };
    user.District = value;
    let grampanchayatOptions = _.filter(this.props.grampanchayatsList, function(
      grampanchayat
    ) {
      return grampanchayat.districtId === value;
    });
    this.setState({
      user: user,
      districtRequired: false,
      grampanchayatOptions: grampanchayatOptions,
      grampanchayatDisabled: false
    });
  }
  onVillageSelection(value) {
    let user = { ...this.state.user };
    user.Village = value;
    this.setState({
      user: user,
      villageRequired: false
    });
  }
  onGrampanchayatSelection(value) {
    let user = { ...this.state.user };
    user.Grampanchayat = value;
    let villageOptions = _.filter(this.props.villagesList, function(village) {
      return village.grampanchayatId === value;
    });
    this.setState({
      user: user,
      grampanchayatRequired: false,
      villageOptions: villageOptions,
      villageDisabled: false
    });
  }
  onRoleSelection(value) {
    let user = { ...this.state.user };
    user.Role = value;
    this.setState({
      user: user,
      roleRequired: false
    });
  }
  onLanguageSelection(value) {
    let user = { ...this.state.user };
    user.Language = value;
    this.setState({
      user: user,
      languageRequired: false
    });
  }
  onSubmit() {
    let user = { ...this.state.user };
    let compRef = this;

    if (this.validData()) {
      if (this.state.updateFlag) {
        user = _.pick(user, [
          "Id",
          "Active",
          "UserId",
          "Name",
          "PhoneNumber",
          "Age",
          "Gender",
          "State",
          "District",
          "Village",
          "Grampanchayat",
          "Aadhaar",
          "IMEI1",
          "IMEI2",
          "Role",
          "Language",
          "FCMToken",
          "CreatedBy",
          "CreatedOn",
          "UpdatedBy",
          "UpdatedOn",
          "ActiveBy",
          "ActiveOn",
          "ImagePath",
          "BulkUploadId",
          "UserName"
        ]);
        user.UpdatedBy = localStorage.getItem("user");
        user.UpdatedOn = new Date();
        this.props.updateBeneficiary(user.Id, user);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.beneficiaryError
            ? (message = "Something went wrong !")
            : (message = `User updated successfully`);
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.beneficiaryError);
          setTimeout(() => {
            if (!compRef.props.beneficiaryError) {
              compRef.onReset();
              compRef.props.history.push("/beneficiary/beneficiaryList");
            }
          }, 1000);
        }, 1000);
      } else {
        user = _.pick(user, [
          "Active",
          "UserId",
          "Name",
          "PhoneNumber",
          "Age",
          "Gender",
          "State",
          "District",
          "Village",
          "Grampanchayat",
          "Aadhaar",
          "IMEI1",
          "IMEI2",
          "Role",
          "Language",
          "FCMToken",
          "CreatedBy",
          "CreatedOn",
          "UpdatedBy",
          "UpdatedOn",
          "ActiveBy",
          "ActiveOn",
          "ImagePath",
          "BulkUploadId",
          "UserName"
        ]);
        user.CreatedBy = localStorage.getItem("user");
        user.CreatedOn = new Date();
        this.props.createBeneficiary(user);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.beneficiaryError
            ? (message = "Something went wrong !")
            : (message = "User created successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.beneficiaryError);
          setTimeout(() => {
            if (!compRef.props.beneficiaryError) {
              compRef.onReset();
              compRef.props.history.push("/beneficiary/beneficiaryList");
            }
          }, 1000);
        }, 1000);
      }
    } else {
      this.showValidations(user);
    }
  }

  validData() {
    let user = { ...this.state.user };
    let InvalidAdhaar = false;
    if (user.Aadhaar) {
      user.Aadhaar.length !== 12 ? (InvalidAdhaar = true) : null;
    }
    if (
      user.Name &&
      user.PhoneNumber &&
      user.PhoneNumber.length === 10 &&
      user.Age &&
      user.Age > 0 &&
      user.Gender &&
      user.State &&
      user.District &&
      user.Village &&
      user.Grampanchayat &&
      user.Role &&
      user.Language &&
      !InvalidAdhaar
    ) {
      return true;
    } else {
      return false;
    }
  }
  showValidations(user) {
    let validPhone =
      /^\d+$/.test(user.PhoneNumber) && user.PhoneNumber.length === 10;
    !user.Name ? (user.NameRequired = true) : null;
    user.PhoneNumber && !validPhone ? (user.PhoneNumberInvalid = true) : null;
    !user.PhoneNumber
      ? ((user.PhoneNumberRequired = true), (user.PhoneNumberInvalid = false))
      : null;
    user.Age && user.Age < 0 ? (user.AgeInvalid = true) : null;
    !user.Age ? ((user.AgeRequired = true), (user.AgeInvalid = false)) : null;
    !user.Gender ? this.setState({ genderRequired: true }) : null;
    !user.State ? this.setState({ stateRequired: true }) : null;
    !user.District ? this.setState({ districtRequired: true }) : null;
    !user.Village ? this.setState({ villageRequired: true }) : null;
    !user.Grampanchayat ? this.setState({ grampanchayatRequired: true }) : null;
    !user.Role ? this.setState({ roleRequired: true }) : null;
    user.Aadhaar && user.Aadhaar.length !== 12
      ? (user.AadhaarInvalid = true)
      : null;
    !user.Language ? this.setState({ languageRequired: true }) : null;
    this.setState({
      user: user
    });
  }
  onReset() {
    let userObj = {
      ...this.state.user,
      Name: "",
      NameRequired: false,
      PhoneNumber: "", //no
      PhoneNumberRequired: false,
      PhoneNumberInvalid: false,
      Age: "", //no
      AgeRequired: false,
      AgeInvalid :false,
      Gender: "", //id
      State: "", //id
      District: "", //id
      Village: "", //id
      Grampanchayat: "", //id
      Aadhaar: "",
      AadhaarInvalid :false,
      Role: "",
      Language: ""
    };
    this.setState({
      user: userObj,
      genderRequired: false,
      stateRequired: false,
      districtRequired: false,
      grampanchayatRequired: false,
      villageRequired: false,
      roleRequired: false,
      languageRequired: false
    });
  }
  render() {
    let user = { ...this.state.user };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout
          name="User Form"
          navigation={true}
          navigationRoute="/beneficiary/beneficiaryList"
        >
          <FormGroup row />
          <div style={{ margin: 20 }}>
            <FormGroup row>
              <Col xs="12" md="5">
                <InputElement
                  type="text"
                  label="Name"
                  name="Name"
                  placeholder="Please enter name "
                  value={user.Name}
                  required={user.NameRequired}
                  onChange={event => this.onChangeInput(event)}
                />
              </Col>
              <Col md="5">
                <InputElement
                  type="text"
                  label="Phone number"
                  name="PhoneNumber"
                  maxLength={10}
                  placeholder="Please enter phone number "
                  value={user.PhoneNumber}
                  required={user.PhoneNumberRequired}
                  invalid={user.PhoneNumberInvalid}
                  onChange={event => this.onChangeInput(event)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <InputElement
                  type="number"
                  label="Age"
                  name="Age"
                  maxLength={3}
                  placeholder="Please enter age "
                  value={user.Age}
                  required={user.AgeRequired}
                  invalid={user.AgeInvalid}
                  onChange={event => this.onChangeInput(event)}
                />
              </Col>
              <Col md="5">
                <Label>Gender</Label>
                <DropdownSelect
                  id="1"
                  name="Gender"
                  placeholder="Select gender "
                  options={this.props.gendersList}
                  value={user.Gender}
                  required={this.state.genderRequired}
                  onChange={this.onGenderSelection.bind(this)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <Label>State</Label>
                <DropdownSelect
                  name="State"
                  placeholder="Select state"
                  options={this.props.statesList}
                  value={user.State}
                  required={this.state.stateRequired}
                  onChange={this.onStateSelection.bind(this)}
                />
              </Col>
              <Col md="5">
                <Label>District</Label>
                <DropdownSelect
                  name="District"
                  placeholder="Select district "
                  options={this.state.districtOptions}
                  value={user.District}
                  disabled={this.state.districtDisabled}
                  required={this.state.districtRequired}
                  onChange={this.onDistrictSelection.bind(this)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <Label>Grampanchayat</Label>
                <DropdownSelect
                  name="Grampanchayat"
                  placeholder="Select grampanchayat "
                  value={user.Grampanchayat}
                  options={this.state.grampanchayatOptions}
                  disabled={this.state.grampanchayatDisabled}
                  required={this.state.grampanchayatRequired}
                  onChange={this.onGrampanchayatSelection.bind(this)}
                />
              </Col>
              <Col md="5">
                <Label>Village</Label>
                <DropdownSelect
                  name="Village"
                  placeholder="Select village "
                  value={user.Village}
                  disabled={this.state.villageDisabled}
                  options={this.state.villageOptions}
                  required={this.state.villageRequired}
                  onChange={this.onVillageSelection.bind(this)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <InputElement
                  type="text"
                  label="Aadhaar number"
                  name="Aadhaar"
                  maxLength={12}
                  placeholder="Please enter aadhaar number "
                  value={user.Aadhaar}
                  invalid={user.AadhaarInvalid}
                  onChange={event => this.onChangeInput(event)}
                />
              </Col>
              <Col md="5">
                <Label>Role</Label>
                <DropdownSelect
                  name="Role"
                  placeholder="Select role "
                  options={this.props.rolesList}
                  value={user.Role}
                  required={this.state.roleRequired}
                  onChange={this.onRoleSelection.bind(this)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <Label>Language</Label>
                <DropdownSelect
                  name="Language"
                  placeholder="Select language "
                  options={this.props.languagesList}
                  value={user.Language}
                  required={this.state.languageRequired}
                  onChange={this.onLanguageSelection.bind(this)}
                />
              </Col>
              <Col md="5">
                {this.state.user.ImagePath ? (
                  <div>
                    <Label> Profile Image :</Label>
                    <img
                      src={`${AppConfig.serverURL}/${this.state.user
                        .ImagePath}`}
                      style={{ height: 90, width: 100, marginLeft: 20 }}
                      alt=""
                    />{" "}
                  </div>
                ) : null}
              </Col>
            </FormGroup>
            <FormGroup row>
              {this.state.updateFlag ? (
                <Col md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmit.bind(this)}
                  >
                    Save
                  </Button>
                </Col>
              ) : (
                <Col md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmit.bind(this)}
                  >
                    Submit
                  </Button>
                </Col>
              )}
              {this.state.updateFlag ? (
                <Col md="1">
                  <Button
                    className="theme-reset-btn"
                    onClick={() => {
                      this.props.history.push("/beneficiary/beneficiaryList");
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
              ) : (
                <Col md="1">
                  <Button
                    className="theme-reset-btn"
                    onClick={this.onReset.bind(this)}
                  >
                    Reset
                  </Button>
                </Col>
              )}
            </FormGroup>
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
    districtsList: state.districtReducer.districtsList,
    grampanchayatsList: state.grampanchayatReducer.grampanchayatsList,
    villagesList: state.villageReducer.villagesList,
    //beneficiaryList: state.beneficiaryReducer.beneficiaryList,
    rolesList: state.rolesReducer.rolesList,
    gendersList: state.rolesReducer.gendersList,
    languagesList: state.rolesReducer.languagesList,
    beneficiaryError: state.beneficiaryReducer.beneficiaryError,
    currentBeneficiary: state.beneficiaryReducer.currentBeneficiary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBeneficiaryList: () => dispatch(actions.getBeneficiaryList()),
    createBeneficiary: beneficiary =>
      dispatch(actions.createBeneficiary(beneficiary)),
    updateBeneficiary: (id, beneficiary) =>
      dispatch(actions.updateBeneficiary(id, beneficiary)),
    getBeneficiaryById: id => dispatch(actions.getBeneficiaryById(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
