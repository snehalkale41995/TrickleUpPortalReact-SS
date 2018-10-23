import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../../components/InputElement/InputElement";
import StatesList from "./StatesList";
import _ from "lodash";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
class StatesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      updateFlag: false,
      currentState: {
        Id: "",
        StateName: "",
        StateCode: "",
        StateNameRequired: false,
        StateCodeRequired: false,
        CreatedOn: "",
        CreatedBy: "",
        UpdatedOn: "",
        UpdatedBy: "",
        Active: true
      },
      showList: false,
      stateToEdit: this.props.edit
    };
  }
  componentDidMount() {
    if (this.state.stateToEdit) {
      this.setState({
        updateFlag: true,
        currentState: this.state.stateToEdit
      });
    }
  }
  onChangeHandler(event) {
    let state = { ...this.state.currentState };
    state[event.target.name] = event.target.value;
    state[event.target.name + "Required"] = false;
    this.setState({
      currentState: state
    });
  }
  onSubmitState() {
    let currentState = { ...this.state.currentState };
    let compRef = this;
    if (this.valid(currentState)) {
      if (this.state.updateFlag) {
        let state = _.pick(currentState, [
          "Id",
          "StateName",
          "StateCode",
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
              compRef.setState({ showList: true });
            }
          }, 1000);
        }, 1000);
      } else {
        let state = _.pick(currentState, [
          "StateName",
          "StateCode",
          "CreatedOn",
          "CreatedBy",
          "Active"
        ]);
        state.CreatedOn = new Date();
        state.CreatedBy = 1;
        this.props.createState(state);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.stateMasterError
            ? (message = "Something went wrong !")
            : (message = "State created successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.stateMasterError);
          setTimeout(() => {
            if (!compRef.props.stateMasterError) {
              compRef.onReset();
              compRef.setState({ showList: true });
            }
          }, 1000);
        }, 1000);
      }
    }
  }
  valid(currentState) {
    if (currentState.StateName && currentState.StateCode) {
      return true;
    } else {
      if (!currentState.StateName) currentState.StateNameRequired = true;
      if (!currentState.StateCode) currentState.StateCodeRequired = true;
      this.setState({
        currentState: currentState
      });
      return false;
    }
  }
  onReset() {
    let currentState = {
      Id: "",
      StateName: "",
      StateCode: "",
      StateNameRequired: false,
      StateCodeRequired: false,
      CreatedOn: "",
      CreatedBy: "",
      UpdatedOn: "",
      UpdatedBy: "",
      Active: 1
    };
    this.setState({
      currentState: currentState
    });
  }
  render() {
    const { currentState } = this.state;
    return this.state.showList ? (
      <StatesList {...this.props} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout
          name="State Form"
          buttonNavigation={true}
          navigationCondition={() => {
            this.setState({ showList: true });
          }}
        >
          <div style={{ margin: 20 }}>
            <FormGroup row />
            <FormGroup row>
              <Col xs="8" md="4">
                <InputElement
                  type="text"
                  label="State name"
                  placeholder="State name"
                  name="StateName"
                  required={currentState.StateNameRequired}
                  value={currentState.StateName}
                  onChange={event => this.onChangeHandler(event)}
                />
              </Col>
              <Col md="4">
                <InputElement
                  type="text"
                  label="State code"
                  placeholder="State code"
                  name="StateCode"
                  required={currentState.StateNameRequired}
                  value={currentState.StateCode}
                  onChange={event => this.onChangeHandler(event)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              {this.state.updateFlag ? (
                <Col md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmitState.bind(this)}
                  >
                    Edit
                  </Button>
                </Col>
              ) : (
                <Col md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmitState.bind(this)}
                  >
                    Submit
                  </Button>
                </Col>
              )}

              <Col md="1">
                <Button
                  className="theme-reset-btn"
                  onClick={this.onReset.bind(this)}
                >
                  Reset
                </Button>
              </Col>
            </FormGroup>
            <ToastContainer autoClose={2000} />
          </div>
        </CardLayout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    statesList: state.stateReducer.statesList,
    statesData: state.stateReducer.states,
    stateMasterError: state.stateReducer.stateMasterError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createState: state => dispatch(actions.createState(state)),
    updateState: (id, state) => dispatch(actions.updateState(id, state))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StatesForm);
