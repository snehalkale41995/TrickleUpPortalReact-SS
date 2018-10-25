import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../../components/InputElement/InputElement";
import _ from "lodash";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
class GenderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      updateFlag: false,
      currentGender: {
        Id: "",
        GenderName: "",
        RoleId: "",
        RoleNameRequired: false,
        RoleIdRequired: false,
        CreatedOn: "",
        CreatedBy: "",
        UpdatedOn: "",
        UpdatedBy: "",
        Active: true
      },
      stateToEdit: this.props.edit
    };
  }
  
  componentWillMount() {
    if (this.props.match.params.id !== undefined) {
      let currentGender = this.props.genderList.find(
        gender => gender.Id == this.props.match.params.id
      );
      if (currentGender) {
        this.setState({
          currentGender: currentGender
        });
      }
    }
  }

  onChangeHandler(event) {
    let state = { ...this.state.currentGender };
    state[event.target.name] = event.target.value;
    state[event.target.name + "Required"] = false;
    this.setState({
      currentGender: state
    });
  }

  onSubmitState() {
    let currentGender = { ...this.state.currentGender };
    let compRef = this;
    if (this.valid(currentGender)) {
      if (this.state.updateFlag) {
        let state = _.pick(currentGender, [
          "Id",
          "GenderName",
          "RoleId",
          "UpdatedOn",
          "UpdatedBy",
          "Active"
        ]);
        state.UpdatedOn = new Date();
        state.UpdatedBy = 1;
        this.props.updateState(state.Id, state);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.stateMasterError
            ? (message = "Something went wrong !")
            : (message = "State updated successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.stateMasterError);
          setTimeout(() => {
            if (!compRef.props.stateMasterError) {
              compRef.onReset();
            }
          }, 1000);
        }, 1000);
      } else {
        let role = _.pick(currentGender, [
          "GenderName",
          "RoleId",
          "CreatedOn",
          "CreatedBy",
          "Active"
        ]);
        role.CreatedOn = new Date();
        role.CreatedBy = 1;
        this.props.createRole(role);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.createRoleError
            ? (message = "Something went wrong !")
            : (message = "State created successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.createRoleError);
          setTimeout(() => {
            if (!compRef.props.createRoleError) {
              compRef.onReset();
            }
          }, 1000);
        }, 1000);
      }
    }
  }
  valid(currentGender) {
    if (currentGender.GenderName && currentGender.RoleId) {
      return true;
    } else {
      if (!currentGender.GenderName) currentGender.RoleNameRequired = true;
      if (!currentGender.RoleId) currentGender.RoleIdRequired = true;
      this.setState({
        currentGender: currentGender
      });
      return false;
    }
  }
  onReset() {
    let currentGender = {
      Id: "",
      GenderName: "",
      RoleId: "",
      RoleNameRequired: false,
      RoleIdRequired: false,
      CreatedOn: "",
      CreatedBy: "",
      UpdatedOn: "",
      UpdatedBy: "",
      Active: 1
    };
    this.setState({
      currentGender: currentGender
    });
  }
  render() {
    const { currentGender } = this.state;
    return  this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout
          name="Role Form"
          navigation={true}
          navigationRoute="/master/genders"
        >
          <div style={{ margin: 20 }}>
            <FormGroup row />
            <FormGroup row>
              <Col xs="8" md="4">
                <InputElement
                  type="text"
                  label="Gender Name"
                  placeholder="Gender Name"
                  name="GenderName"
                  required={currentGender.RoleNameRequired}
                  value={currentGender.GenderName}
                  onChange={event => this.onChangeHandler(event)}
                />
              </Col>
            </FormGroup>

            {this.state.updateFlag ? (
              <FormGroup row>
                <Col md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmitState.bind(this)}
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
                    style={{ pointerEvents: 'none' }}
                    onClick={this.onSubmitState.bind(this)}
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

            <ToastContainer autoClose={2000} />
          </div>
        </CardLayout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    createRoleError: state.rolesReducer.createRoleError,
    genderList : state.rolesReducer.genders
  };
};


const mapDispatchToProps = dispatch => {
  return {
    createRole: role => dispatch(actions.createRole(role)),
   // getRoleById: (id) => dispatch(actions.getRoleById(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GenderForm);
