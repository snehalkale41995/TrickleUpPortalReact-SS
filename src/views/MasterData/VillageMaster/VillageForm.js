import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import InputElement from "../../../components/InputElement/InputElement";
import VillageList from "./VillageList";
class VillageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      village: {
        VillageName: "",
        District: "",
        State: "",
        CreatedOn: "",
        CreatedBy: "",
        UpdatedOn: "",
        UpdatedBy: "",
        Active: 1,
        VillageNameRequired: false,
        DistrictRequired: false,
        StateRequired: false,
      },
      showList: false,
      villageToEdit: this.props.edit,
      updateFlag: false,
    };
  }
  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      if (this.state.stateToEdit) {
        this.setState({
          updateFlag: true,
          village: this.state.villageToEdit
        });
      }
    }
  }
  onChangeHandler(event) {
    let village = { ...this.state.village }
    village[event.target.name] = event.target.value;
    village[event.target.name + "Required"] = false;
    this.setState({
      village: village
    });
  }
  onStateValueChange(value) {
    let village = { ...this.state.village }
    village.State = value;
    village.StateRequired = false;
    this.setState({
      village: village
    });
  }
  onDistrictValueChange(value) {
    let village = { ...this.state.village }
    village.District = value;
    village.DistrictRequired = false;
    this.setState({
      village: village
    });
  }
  onSubmit() {
    let village = { ...this.state.village };
    if (this.valid(village)) {
      if (this.state.updateFlag) {
        //TODO update village
      } else {
        //TODO create village
      }
    }
  }
  valid(village) {
    if (village.VillageName && village.District && village.State) {
      return true;
    } else {
      !village.VillageName ? village.VillageNameRequired = true : null;
      !village.District ? village.DistrictRequired = true : null;
      !village.State ? village.StateRequired = true : null;

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
      CreatedOn: "",
      CreatedBy: "",
      UpdatedOn: "",
      UpdatedBy: "",
      Active: 1,
      VillageNameRequired: false,
      DistrictRequired: false,
      StateRequired: false,
    };
    this.setState({
      village: village
    });
  }
  render() {
    let village = { ...this.state.village };
    return this.state.showList ? (
      <VillageList {...this.props} />
    ) : (
        <div style={{ marginTop: 30 }}>
          <CardLayout name="Village Form" buttonNavigation={true}
            navigationCondition={() => {
              this.setState({ showList: true });
            }}>
            <div style={{ margin: 20 }}>
              <FormGroup row />
              <FormGroup row>
                <Col xs="10" md="5">
                  <Label >State</Label>
                  <DropdownSelect
                    name="States"
                    placeholder="Select State..."
                    //options={this.props.statesList}
                    value={village.State}
                    required={village.StateRequired}
                    onChange={this.onStateValueChange.bind(this)}
                    simpleValue
                  />
                </Col>
                <Col md="5">
                  <Label >District</Label>
                  <DropdownSelect
                    name="District"
                    placeholder="Select district..."
                    // options={this.props.districtsList}
                    value={village.District}
                    required={village.DistrictRequired}
                    onChange={this.onDistrictValueChange.bind(this)}
                    simpleValue
                  />

                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="10" md="5">
                  <InputElement
                    type="text"
                    label="Village"
                    name="VillageName"
                    placeholder="Please enter village name"
                    value={village.VillageName}
                    required={village.VillageNameRequired}
                    onChange={(event) => this.onChangeHandler(event)}
                  />
                </Col>
                <Col md="5">

                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="1">
                  {this.state.updateFlag ? (
                    <Button
                      className="theme-positive-btn"
                      onClick={this.onSubmit.bind(this)}
                    >
                      Edit
                  </Button>
                  ) : (
                      <Button
                        className="theme-positive-btn"
                        onClick={this.onSubmit.bind(this)}
                      >
                        Submit
                  </Button>
                    )}
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
          </CardLayout>
        </div>
      );
  }
}
const mapStateToProps = state => {
  return {
    // statesList: state.stateReducer.statesList,
    // statesData: state.stateReducer.states,
    // districtsList: state.districtReducer.districtsList,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(VillageForm);
