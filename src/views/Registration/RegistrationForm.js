import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../components/InputElement/Dropdown";
import InputElement from "../../components/InputElement/InputElement";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Loader from "../../components/Loader/Loader";
import _ from "lodash";
import { ToastContainer } from "react-toastify";
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
        UserId: "",
        UserIdRequired: false,
        UserIdInvalid: false,
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
    if (this.props.match.params.id !== undefined) {
      let currentUser = this.props.activeBeneficiaryList.find(
        user => user.Id === parseInt(this.props.match.params.id)
      );
      if (currentUser) {
        this.setState({
          user: currentUser,
          updateFlag: true,
          loading: false
        });
      }
    } else {
      this.setState({
        districtDisabled: true,
        grampanchayatDisabled: true,
        villageDisabled: true,
        loading: false
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
        user.Role = 3;
        this.props.updateBeneficiary(user.Id, user);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.beneficiaryError
            ? (message = compRef.props.beneficiaryError)
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
        user.Role = 3;
        this.props.createBeneficiary(user);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.beneficiaryError
            ? (message = compRef.props.beneficiaryError)
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
    var emailTest =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let validEmail = emailTest.test(String(user.UserId).toLowerCase());
    user.PhoneNumber = user.PhoneNumber.trim();
    if (user.Aadhaar) {
      user.Aadhaar.length !== 12 ? (InvalidAdhaar = true) : null;
    }
    if (
      user.Name.trim().length > 0 &&
      user.PhoneNumber &&
      user.PhoneNumber.length === 10 &&
      user.Age &&
      user.Age > 0 &&
      user.Gender &&
      validEmail &&
      user.UserId &&
      user.UserId.trim().length > 0 &&
      user.State &&
      user.District &&
      user.Village &&
      user.Grampanchayat &&
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
      /^\d+$/.test(user.PhoneNumber.trim()) &&
      user.PhoneNumber.trim().length === 10;
    var emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let validEmail = emailTest.test(String(user.UserId).toLowerCase());
    if (user.UserId && !validEmail) {
      user.UserIdInvalid = true;
    }
    if (!user.Name || user.Name.trim().length === 0) user.NameRequired = true;
    if (
      user.PhoneNumber.trim() &&
      !validPhone &&
      user.PhoneNumber.trim().length > 0
    )
      user.PhoneNumberInvalid = true;

    if (!user.PhoneNumber.trim() || user.PhoneNumber.trim().length === 0) {
      user.PhoneNumberRequired = true;
      user.PhoneNumberInvalid = false;
    }
    if (!user.UserId || user.UserId.trim().length === 0) {
      user.UserIdRequired = true;
      user.UserIdInvalid = false;
    }

    if (user.Age && user.Age <= 0) user.AgeInvalid = true;
    if (!user.Age) {
      user.AgeRequired = true;
      user.AgeInvalid = false;
    }
    if (!user.Gender) this.setState({ genderRequired: true });
    if (!user.State) this.setState({ stateRequired: true });
    if (!user.District) this.setState({ districtRequired: true });
    if (!user.Village) this.setState({ villageRequired: true });
    if (!user.Grampanchayat) this.setState({ grampanchayatRequired: true });
    if (!user.Role) this.setState({ roleRequired: true });
    if (user.Aadhaar && user.Aadhaar.trim().length !== 12)
      user.AadhaarInvalid = true;
    if (!user.Language) this.setState({ languageRequired: true });
    this.setState({
      user: user
    });
  }

  // Method for set only Numeric
  setInputToNumeric(e) {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  // Method for age validation
  setAgeToNumeric(e) {
    let user = { ...this.state.user };
    let re; 
    if(user.Age.length==0)
    re = /[1-9]+/g;
    else re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  onReset() {
    let userObj = {
      ...this.state.user,
      Name: "",
      NameRequired: false,
      PhoneNumber: "", //no
      PhoneNumberRequired: false,
      PhoneNumberInvalid: false,
      UserIdRequired: false,
      UserIdInvalid: false,
      Age: "", //no
      AgeRequired: false,
      AgeInvalid: false,
      Gender: "", //id
      State: "", //id
      District: "", //id
      Village: "", //id
      Grampanchayat: "", //id
      Aadhaar: "",
      AadhaarInvalid: false,
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
          name="Beneficiary Form"
          navigation={true}
          navigationRoute="/beneficiary/beneficiaryList"
        >
          <FormGroup row />
          <div className="div-padding">
            <FormGroup row>
              <Col xs="12" md="5">
                <InputElement
                  type="text"
                  label="Name"
                  name="Name"
                  maxLength={255}
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
                  placeholder="Please enter phone number"
                  value={user.PhoneNumber}
                  required={user.PhoneNumberRequired}
                  onKeyPress={e => this.setInputToNumeric(e)}
                  invalid={user.PhoneNumberInvalid}
                  onChange={event => this.onChangeInput(event)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <InputElement
                  type="text"
                  label="Email"
                  name="UserId"
                  placeholder="Please enter Email"
                  value={user.UserId}
                  required={user.UserIdRequired}
                  invalid={user.UserIdInvalid}
                  onChange={event => this.onChangeInput(event)}
                />
              </Col>
              <Col md="5">
                <InputElement
                  type="text"
                  label="Age"
                  name="Age"
                  maxLength={2}
                  placeholder="Please enter age"
                  value={user.Age}
                  required={user.AgeRequired}
                  onKeyPress={e => this.setAgeToNumeric(e)}
                  invalid={user.AgeInvalid}
                  onChange={event => this.onChangeInput(event)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <Label>Gender</Label>
                <DropdownSelect
                  id="1"
                  name="Gender"
                  placeholder="Select gender "
                  options={this.props.gendersList}
                  value={user.Gender}
                  required={this.state.genderRequired}
                  onChange={this.onGenderSelection.bind(this)}
                  search={true}
                />
              </Col>
              <Col md="5">
                <Label>State</Label>
                <DropdownSelect
                  name="State"
                  placeholder="Select state"
                  options={this.props.statesList}
                  value={user.State}
                  required={this.state.stateRequired}
                  onChange={this.onStateSelection.bind(this)}
                  search={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <Label>District</Label>
                <DropdownSelect
                  name="District"
                  placeholder="Select district "
                  options={this.state.districtOptions}
                  value={user.District}
                  disabled={this.state.districtDisabled}
                  required={this.state.districtRequired}
                  onChange={this.onDistrictSelection.bind(this)}
                  search={true}
                />
              </Col>
              <Col md="5">
                <Label>Grampanchayat</Label>
                <DropdownSelect
                  name="Grampanchayat"
                  placeholder="Select grampanchayat "
                  value={user.Grampanchayat}
                  options={this.state.grampanchayatOptions}
                  disabled={this.state.grampanchayatDisabled}
                  required={this.state.grampanchayatRequired}
                  onChange={this.onGrampanchayatSelection.bind(this)}
                  search={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <Label>Village</Label>
                <DropdownSelect
                  name="Village"
                  placeholder="Select village "
                  value={user.Village}
                  disabled={this.state.villageDisabled}
                  options={this.state.villageOptions}
                  required={this.state.villageRequired}
                  onChange={this.onVillageSelection.bind(this)}
                  search={true}
                />
              </Col>
              <Col md="5">
                <InputElement
                  type="text"
                  label="Aadhaar number"
                  name="Aadhaar"
                  maxLength={12}
                  placeholder="Please enter aadhaar number "
                  value={user.Aadhaar}
                  onKeyPress={e => this.setInputToNumeric(e)}
                  invalid={user.AadhaarInvalid}
                  onChange={event => this.onChangeInput(event)}
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
                  search={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
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
                    Create
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
        <ToastContainer autoClose={1000} />
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
    activeBeneficiaryList: state.beneficiaryReducer.activeBeneficiaryList,
    rolesList: state.rolesReducer.rolesList,
    gendersList: state.gendersReducer.gendersList,
    languagesList: state.languagesReducer.languagesList,
    beneficiaryError: state.beneficiaryReducer.beneficiaryError,
    currentBeneficiary: state.beneficiaryReducer.currentBeneficiary
    //beneficiaryList: state.beneficiaryReducer.beneficiaryList
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
