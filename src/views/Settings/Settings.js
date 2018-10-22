import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../components/InputElement/Dropdown";
import InputElement from "../../components/InputElement/InputElement";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Loader from "../../components/Loader/Loader";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profile: {
        ContactName: "",
        PhoneNumber: "",
        GroupName: "",
        Village: "",
        ContactNameRequired: false,
        PhoneNumberRequired: false,
        PhoneNumberInvalid: false,
        GroupNameRequired: false,
        VillageRequired: false
      }
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000);
  }
  onChangeInput(event) {
   
  }
  
  onSubmit() {
    let contact = { ...this.state.contact };
    if (this.validContact(contact)) {
      if (this.state.updateFlag) {
        //TODO : Update contact
      } else {
        //TODO : Create contact
      }
    }
  }
  validContact(contact) {
    // let isValidPhone = /^\d+$/.test(contact.PhoneNumber) && contact.PhoneNumber.length === 10;
    // if (contact.ContactName && contact.PhoneNumber && isValidPhone && contact.Village && contact.GroupName) {
    //   return true;
    // } else {
    //   !contact.ContactName ? contact.ContactNameRequired = true : null;
    //   !isValidPhone ? contact.PhoneNumberInvalid = true : null;
    //   !contact.PhoneNumber ? (contact.PhoneNumberRequired = true, contact.PhoneNumberInvalid = false) : null;
    //   !contact.GroupName ? contact.GroupNameRequired = true : null;
    //   !contact.Village ? contact.VillageRequired = true : null;
    //   this.setState({
    //     contact: contact
    //   });
    //   return false;
    // }
  return true;
  }

  onReset() {
  
  }
  render() {
    //let contact = { ...this.state.contact };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
        <div style={{ marginTop: 30 }}>
          <CardLayout
            name="Profile Settings"
            // navigation={true}
            // navigationRoute="/master/contacts"
          >
            <FormGroup row />
            <div style={{ margin: 20 }}>
              <FormGroup row>
                <Col xs="12" md="5">
                  <InputElement
                    type="text"
                    label="Contact name"
                    name="ContactName"
                    placeholder="Contact name"
                   // value={contact.ContactName}
                    // required={contact.ContactNameRequired}
                    // onChange={event => this.onChangeInput(event)}
                  />
                </Col>
                <Col md="5">
                  <InputElement
                    type="text"
                    label="Phone number"
                    name="PhoneNumber"
                    maxLength={10}
                    placeholder="Please enter phone number "
                    // value={contact.PhoneNumber}
                    // required={contact.PhoneNumberRequired}
                    // invalid={contact.PhoneNumberInvalid}
                    // onChange={event => this.onChangeInput(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12" md="5">
                  <InputElement
                    type="text"
                    label="Group name"
                    name="GroupName"
                    placeholder="Group name"
                    // value={contact.GroupName}
                    // required={contact.GroupNameRequired}
                    // onChange={event => this.onChangeInput(event)}
                  />
                </Col>
                <Col md="5">
                  <Label>Village</Label>
                  <DropdownSelect
                    id="1"
                    name="Village"
                    placeholder="Select village "
                    // options={villageList}
                    // value={contact.Village}
                    // required={contact.VillageRequired}
                    // onChange={this.onVillageSelection.bind(this)}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs="3" md="1">
                  <Button
                    className="theme-positive-btn"
                    //onClick={this.onSubmit.bind(this)}
                  >
                    Submit
                </Button>
                </Col>
                <Col md="1">
                  <Button
                    className="theme-reset-btn"
                   // onClick={this.onReset.bind(this)}
                  >
                    Reset
                </Button>
                </Col>
              </FormGroup>
            </div>
          </CardLayout>
        </div>
      );
  }
}
const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
