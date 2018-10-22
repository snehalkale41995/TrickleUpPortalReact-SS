import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import InputElement from "../../../components/InputElement/InputElement";
import GrampanchayatList from "./GrampanchayatList";
class GrampanchayatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grampanchayat: {
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
          grampanchayat: this.state.villageToEdit
        });
      }
    }
  }
  onChangeHandler(event) {
    let grampanchayat = { ...this.state.grampanchayat }
    grampanchayat[event.target.name] = event.target.value;
    grampanchayat[event.target.name + "Required"] = false;
    this.setState({
      grampanchayat: grampanchayat
    });
  }
  onStateValueChange(value) {
    let grampanchayat = { ...this.state.grampanchayat }
    grampanchayat.State = value;
    grampanchayat.StateRequired = false;
    this.setState({
      grampanchayat: grampanchayat
    });
  }
  onDistrictValueChange(value) {
    let grampanchayat = { ...this.state.grampanchayat }
    grampanchayat.District = value;
    grampanchayat.DistrictRequired = false;
    this.setState({
      grampanchayat: grampanchayat
    });
  }
  onSubmit() {
    let grampanchayat = { ...this.state.grampanchayat };
    if (this.valid(grampanchayat)) {
      if (this.state.updateFlag) {
        //TODO update grampanchayat
      } else {
        //TODO create grampanchayat
      }
    }
  }
  valid(grampanchayat) {
    if (grampanchayat.VillageName && grampanchayat.District && grampanchayat.State) {
      return true;
    } else {
      !grampanchayat.VillageName ? grampanchayat.VillageNameRequired = true : null;
      !grampanchayat.District ? grampanchayat.DistrictRequired = true : null;
      !grampanchayat.State ? grampanchayat.StateRequired = true : null;

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
      Active: 1,
      VillageNameRequired: false,
      DistrictRequired: false,
      StateRequired: false,
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
          <CardLayout name="Grampanchayat Form" buttonNavigation={true}
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
                    value={grampanchayat.State}
                    required={grampanchayat.StateRequired}
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
                    label="Village"
                    name="VillageName"
                    placeholder="Please enter grampanchayat name"
                    value={grampanchayat.VillageName}
                    required={grampanchayat.VillageNameRequired}
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
export default connect(mapStateToProps, mapDispatchToProps)(GrampanchayatForm);
