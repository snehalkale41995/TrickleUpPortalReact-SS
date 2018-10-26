import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../../components/InputElement/InputElement";
import StatesList from "./RolesList";
import _ from "lodash";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
class RolesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      updateFlag: false,
      currentRole: {
        Id: "",
        RoleName: "",
        RoleId: "",
        RoleNameRequired: false,
        RoleIdRequired: false,
        CreatedOn: "",
        CreatedBy: "",
        UpdatedOn: "",
        UpdatedBy: "",
        Active: true
      },
    };
  }
  
  componentWillMount() {
    if (this.props.match.params.id !== undefined) {
      let currentRole = this.props.roleList.find(
        role => role.Id == this.props.match.params.id
      );
      if (currentRole) {
        this.setState({
          currentRole: currentRole,
          updateFlag: true
        });
      }
    }
  }

  onChangeHandler(event) {
    let state = { ...this.state.currentRole };
    state[event.target.name] = event.target.value;
    state[event.target.name + "Required"] = false;
    this.setState({
      currentRole: state
    });
  }

  onSubmitState() {
    let currentRole = { ...this.state.currentRole };
    let compRef = this;
    if (this.valid(currentRole)) {
      if (this.state.updateFlag) {
        let role = _.pick(currentRole, [
          "Id",
          "RoleName",
          "RoleId",
          "UpdatedOn",
          "UpdatedBy",
          "Active"
        ]);
        role.UpdatedOn = new Date();
        role.UpdatedBy = 1;
        this.props.updateRole(role.Id, role);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.roleMasterError
            ? (message = "Something went wrong !")
            : (message = "State updated successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.roleMasterError);
          setTimeout(() => {
            if (!compRef.props.roleMasterError) {
              compRef.onReset();
              compRef.props.history.push('/master/roles');
            }
          }, 1000);
        }, 1000);
      } else {
        let role = _.pick(currentRole, [
          "RoleName",
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
          compRef.props.roleMasterError
            ? (message = "Something went wrong !")
            : (message = "State created successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.roleMasterError);
          setTimeout(() => {
            if (!compRef.props.roleMasterError) {
              compRef.onReset();
             compRef.props.history.push('/master/roles');
            }
          }, 1000);
        }, 1000);
      }
    }
  }

  valid(currentRole) {
    if (currentRole.RoleName && currentRole.RoleId) {
      return true;
    } else {
      if (!currentRole.RoleName) currentRole.RoleNameRequired = true;
      if (!currentRole.RoleId) currentRole.RoleIdRequired = true;
      this.setState({
        currentRole: currentRole
      });
      return false;
    }
  }
  onReset() {
    let currentRole = {
      Id: "",
      RoleName: "",
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
      currentRole: currentRole
    });
  }
  render() {
    const { currentRole } = this.state;
    return  this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout
          name="Role Form"
          navigation={true}
          navigationRoute="/master/roles"
        >
          <div style={{ margin: 20 }}>
            <FormGroup row />
            <FormGroup row>
              <Col xs="8" md="4">
                <InputElement
                  type="text"
                  label="Role Id"
                  placeholder="Role Id"
                  name="RoleId"
                  required={currentRole.RoleIdRequired}
                  value={currentRole.RoleId}
                  onChange={event => this.onChangeHandler(event)}
                />
              </Col>
              <Col md="4">
                <InputElement
                  type="text"
                  label="Role Name"
                  placeholder="Role Name"
                  name="RoleName"
                  required={currentRole.RoleNameRequired}
                  value={currentRole.RoleName}
                  onChange={event => this.onChangeHandler(event)}
                />
              </Col>
            </FormGroup>
            {this.state.updateFlag ? (
              <FormGroup row>
                <Col md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmitState.bind(this)}>
                    Save
                  </Button>
                </Col>
              </FormGroup>
            ) : (
              <FormGroup row>
                <Col md="1">
                  <Button
                    className="theme-positive-btn"
                    //style={{ pointerEvents: 'none' }}
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
    roleMasterError: state.rolesReducer.roleMasterError,
    roleList : state.rolesReducer.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createRole: role => dispatch(actions.createRole(role)),
    updateRole: (id,role) => dispatch(actions.updateRole(id,role)),
   // getRoleById: (id) => dispatch(actions.getRoleById(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RolesForm);
