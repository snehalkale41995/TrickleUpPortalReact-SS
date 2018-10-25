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
class LanguagesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      updateFlag: false,
      currentLanguage: {
        Id: "",
        LanguageName: "",
        LanguageCode: "",
        LanguageNameRequired: false,
        LanguageCodeRequired: false,
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
      let currentLanguage = this.props.languageList.find(
        language => language.Id == this.props.match.params.id
      );
      if (currentLanguage) {
        this.setState({
          currentLanguage: currentLanguage
        });
      }
    }
  }

  onChangeHandler(event) {
    let state = { ...this.state.currentLanguage };
    state[event.target.name] = event.target.value;
    state[event.target.name + "Required"] = false;
    this.setState({
      currentLanguage: state
    });
  }

  onSubmitState() {
    let currentLanguage = { ...this.state.currentLanguage };
    let compRef = this;
    if (this.valid(currentLanguage)) {
      if (this.state.updateFlag) {
        let state = _.pick(currentLanguage, [
          "Id",
          "LanguageName",
          "LanguageCode",
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
        let language = _.pick(currentLanguage, [
          "LanguageName",
          "LanguageCode",
          "CreatedOn",
          "CreatedBy",
          "Active"
        ]);
        language.CreatedOn = new Date();
        language.CreatedBy = 1;
        this.props.createLanguage(language);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.createRoleError
            ? (message = "Something went wrong !")
            : (message = "State created successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.createLanguageError);
          setTimeout(() => {
            if (!compRef.props.createRoleError) {
              compRef.onReset();
            }
          }, 1000);
        }, 1000);
      }
    }
  }
  valid(currentLanguage) {
    if (currentLanguage.LanguageName && currentLanguage.LanguageCode) {
      return true;
    } else {
      if (!currentLanguage.LanguageName) currentLanguage.LanguageNameRequired = true;
      if (!currentLanguage.LanguageCode) currentLanguage.LanguageCodeRequired = true;
      this.setState({
        currentLanguage: currentLanguage
      });
      return false;
    }
  }
  onReset() {
    let currentLanguage = {
      Id: "",
      LanguageName: "",
      LanguageCode: "",
      LanguageNameRequired: false,
      LanguageCodeRequired: false,
      CreatedOn: "",
      CreatedBy: "",
      UpdatedOn: "",
      UpdatedBy: "",
      Active: 1
    };
    this.setState({
      currentLanguage: currentLanguage
    });
  }
  render() {
    const { currentLanguage } = this.state;
    return  this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout
          name="Language Form"
          navigation={true}
          navigationRoute="/master/languages"
        >
          <div style={{ margin: 20 }}>
            <FormGroup row />
            <FormGroup row>
              <Col xs="8" md="4">
                <InputElement
                  type="text"
                  label="Language Name"
                  placeholder="Language Name"
                  name="LanguageName"
                  required={currentLanguage.LanguageNameRequired}
                  value={currentLanguage.LanguageName}
                  onChange={event => this.onChangeHandler(event)}
                />
              </Col>
              <Col md="4">
                <InputElement
                  type="text"
                  label="Language Id"
                  placeholder="Language Id"
                  name="LanguageCode"
                  required={currentLanguage.LanguageCodeRequired}
                  value={currentLanguage.LanguageCode}
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
    createLanguageError: state.languageReducer.createLanguageError,
    languageList : state.rolesReducer.languages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLanguage: language => dispatch(actions.createLanguage(language)),
   // getRoleById: (id) => dispatch(actions.getRoleById(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LanguagesForm);
