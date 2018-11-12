import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button } from "reactstrap";
import InputElement from "../../../components/InputElement/InputElement";
import _ from "lodash";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
class GenderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      updateFlag: false,
      loggedinUserId: "",
      currentGender: {
        Id: "",
        GenderName: "",
        GenderNameRequired: false,
        CreatedOn: "",
        CreatedBy: "",
        UpdatedOn: "",
        UpdatedBy: "",
        Active: true
      }
    };
  }

  componentWillMount() {
    let loggedinUserId = localStorage.getItem("user");
    this.setState({ loggedinUserId: loggedinUserId });
    this.setState({ loggedinUserId: loggedinUserId });
    if (this.props.match.params.id !== undefined) {
      let currentGender = this.props.genderList.find(
        gender => gender.Id == this.props.match.params.id
      );
      if (currentGender) {
        this.setState({
          currentGender: currentGender,
          updateFlag: true
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
        let gender = _.pick(currentGender, [
          "Id",
          "GenderName",
          "UpdatedOn",
          "UpdatedBy",
          "Active"
        ]);
        gender.UpdatedOn = new Date();
        gender.UpdatedBy = this.state.loggedinUserId;
        this.props.updateGender(gender.Id, gender);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.genderMasterError
            ? (message = "Something went wrong !")
            : (message = "Gender updated successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.genderMasterError);
          setTimeout(() => {
            if (!compRef.props.genderMasterError) {
              compRef.onReset();
              compRef.props.history.push("/master/genders");
            }
          }, 1000);
        }, 1000);
      } else {
        let gender = _.pick(currentGender, [
          "GenderName",
          "CreatedOn",
          "CreatedBy",
          "Active"
        ]);
        gender.CreatedOn = new Date();
        gender.CreatedBy = this.state.loggedinUserId;
        this.props.createGender(gender);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.genderMasterError
            ? (message = "Something went wrong !")
            : (message = "Gender created successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.genderMasterError);
          setTimeout(() => {
            if (!compRef.props.genderMasterError) {
              compRef.onReset();
              compRef.props.history.push("/master/genders");
            }
          }, 1000);
        }, 1000);
      }
    }
  }
  valid(currentGender) {
    if (currentGender.GenderName.trim().length > 0) {
      return true;
    } else {
      if (
        !currentGender.GenderName ||
        currentGender.GenderName.trim().length === 0
      )
        currentGender.GenderNameRequired = true;
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
      GenderNameRequired: false,
      CreatedOn: "",
      CreatedBy: "",
      UpdatedOn: "",
      UpdatedBy: "",
      Active: true
    };
    this.setState({
      currentGender: currentGender
    });
  }
  render() {
    const { currentGender } = this.state;
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Gender Form"
        navigation={true}
        navigationRoute="/master/genders"
      >
        <div className="div-padding">
          <FormGroup row />
          <FormGroup row>
            <Col xs="8" md="4">
              <InputElement
                type="text"
                label="Gender name"
                placeholder="Gender name"
                maxLength={255}
                name="GenderName"
                required={currentGender.GenderNameRequired}
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
                  onClick={this.onSubmitState.bind(this)}
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
          <ToastContainer autoClose={2000} />
        </div>
      </CardLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    genderMasterError: state.rolesReducer.genderMasterError,
    genderList: state.gendersReducer.genders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createGender: gender => dispatch(actions.createGender(gender)),
    updateGender: (id, gender) => dispatch(actions.updateGender(id, gender))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GenderForm);
