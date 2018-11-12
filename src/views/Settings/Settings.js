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

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {
        Id: "",
        Active: true,
        UserId: null,
        Name: "",
        NameRequired: false,
        AgeInvalid: false, 
        PhoneNumber: "", //no
        PhoneNumberRequired: false,
        PhoneNumberInvalid: false,
        UserIdRequired: false,
        UserIdInvalid: false,
        Age: "", //no
        AgeRequired: false,
        Gender: "", //id //no
        State: "", //id //no
        District: "", //id
        Village: "", //id
        Grampanchayat: "", //id
        Aadhaar: "",
        IMEI1: null,
        IMEI2: null,
        Role: "", //id
        Language: "",
        FCMToken: "",
        CreatedBy: "", //logged in user userid
        CreatedOn: "",
        UpdatedBy: "",
        UpdatedOn: "",
        DeletedBy: "",
        DeletedOn: "",
        file: "",
        ImagePath: "",
        BulkUploadId: "",
        imagePreviewUrl: ""
      },
      genderRequired: false,
      stateRequired: false,
      districtRequired: false,
      grampanchayatRequired: false,
      villageRequired: false,
      roleRequired: false,
      languageRequired: false,
      districtOptions: this.props.districtsList,
      grampanchayatOptions: this.props.grampanchayatsList,
      villageOptions: this.props.villagesList,
      districtDisabled: false,
      grampanchayatDisabled: false,
      villageDisabled: false
    };
  }

  componentWillMount() {
    let compRef = this;
    let userId = localStorage.getItem("user");
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    if (userId !== undefined) {
      this.props.getBeneficiaryById(userId);
      setTimeout(function() {
        let currentUser = compRef.props.currentBeneficiary;
        compRef.setState({
          user: currentUser
        });
      }, 2000);
    }
  }

  _handleImageChange(e) {
    e.preventDefault();
    let user = { ...this.state.user };
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      user.file = file;
      user.imagePreviewUrl = reader.result;
      this.setState({
        user: user
      });
    };
    reader.readAsDataURL(file);
  }

   // Method for set only Numeric
  setInputToNumeric(e) {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
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
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    let roleId = userDetails.role;
    let user = { ...this.state.user };
    let compRef = this;
    //this.showValidations(user);
    if (this.validData()) {
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
        "ImagePath",
        "BulkUploadId"
      ]);
      user.UpdatedBy = 1;
      user.UpdatedOn = new Date();
      user.Role = roleId;
      this.props.updateBeneficiary(user.Id, user);
      this.setState({ loading: true });
      setTimeout(() => {
        let message = "";
        compRef.props.beneficiaryError
          ? (message = compRef.props.beneficiaryError)
          : (message = "User updated successfully");
        compRef.setState({ loading: false });
        Toaster.Toaster(message, compRef.props.beneficiaryError);
      }, 1000);
    } else {
      this.showValidations(user);
    }
  }
  validData() {
    let user = { ...this.state.user };
    let InvalidAdhaar = false;
    var emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
      UserId: "",
      Age: "", //no
      AgeRequired: false,
      AgeInvalid: false,
      Gender: "", //id
      State: "", //id
      District: "", //id
      Village: "", //id
      Grampanchayat: "", //id
      Aadhaar: "",
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
    let imagePreviewUrl;
    if (user.ImagePath) {
      imagePreviewUrl = `${AppConfig.serverURL}/${user.ImagePath}`;
    }
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          style={{ borderColor: "white", width: "100%", height: "100%" }}
        />
      );
    }
    // else {
    //   $imagePreview = (<div style={{border:0}} className="previewText">Please select an Image for Preview</div>);
    // }
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout name="Profile Settings">
        <FormGroup row />
        <div className="div-padding">
          <FormGroup row>
            <Col xs="12" md="5">
              <InputElement
                type="text"
                label="Name"
                name="Name"
                placeholder="Please enter name "
                maxLength={255}
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
                onKeyPress={e => this.setAgeToNumeric(e)}
                required={user.AgeRequired}
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
              />
            </Col>
            <Col md="5">
              <Label>Grampanchayat</Label>
              <DropdownSelect
                name="Grampanchayat"
                placeholder="Select grampanchayat "
                value={user.Grampanchayat}
                disabled={this.state.grampanchayatDisabled}
                options={this.state.grampanchayatOptions}
                required={this.state.grampanchayatRequired}
                onChange={this.onGrampanchayatSelection.bind(this)}
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
                options={this.state.villageOptions}
                disabled={this.state.villageDisabled}
                required={this.state.villageRequired}
                onChange={this.onVillageSelection.bind(this)}
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
              />
            </Col>
            {user.ImagePath ? (
              <FormGroup row>
                <Col xs="6" md="4">
                  <Label>Profile Picture : </Label>
                </Col>
                <Col md="2">
                  <div
                    style={{
                      height: "100px",
                      width: "100px",
                      border: 0,
                      img: { width: "100px", height: "100px" }
                    }}
                  >
                    {$imagePreview}
                  </div>
                </Col>
              </FormGroup>
            ) : null}
          </FormGroup>
          <FormGroup row>
            <Col md="1">
              <Button
                className="theme-positive-btn"
                onClick={this.onSubmit.bind(this)}
              >
                Save
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
        </div>
        <ToastContainer autoClose={2000} />
      </CardLayout>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBeneficiaryList: () => dispatch(actions.getBeneficiaryList()),
    getBeneficiaryById: id => dispatch(actions.getBeneficiaryById(id)),
    updateBeneficiary: (id, beneficiary) =>
      dispatch(actions.updateBeneficiary(id, beneficiary))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
