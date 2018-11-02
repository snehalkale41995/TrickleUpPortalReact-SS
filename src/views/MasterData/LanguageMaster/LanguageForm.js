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
      loggedinUserId: "",
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
      }
    };
  }
  componentWillMount() {
    let loggedinUserId = localStorage.getItem("user");
    this.setState({ loggedinUserId: loggedinUserId });
    if (this.props.match.params.id !== undefined) {
      let currentLanguage = this.props.languageList.find(
        language => language.Id == this.props.match.params.id
      );
      if (currentLanguage) {
        this.setState({
          currentLanguage: currentLanguage,
          updateFlag: true
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
        let language = _.pick(currentLanguage, [
          "Id",
          "LanguageName",
          "LanguageCode",
          "UpdatedOn",
          "UpdatedBy",
          "Active"
        ]);
        language.UpdatedOn = new Date();
        language.UpdatedBy = this.state.loggedinUserId;
        this.props.updateLanguage(language.Id, language);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.languageMasterError
            ? (message = "Something went wrong !")
            : (message = "Language updated successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.languageMasterError);
          setTimeout(() => {
            if (!compRef.props.languageMasterError) {
              compRef.onReset();
              compRef.props.history.push("/master/languages");
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
        language.CreatedBy = this.state.loggedinUserId;
        this.props.createLanguage(language);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.languageMasterError
            ? (message = "Something went wrong !")
            : (message = "Language created successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.languageMasterError);
          setTimeout(() => {
            if (!compRef.props.languageMasterError) {
              compRef.onReset();
              compRef.props.history.push("/master/languages");
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
      if (!currentLanguage.LanguageName)
        currentLanguage.LanguageNameRequired = true;
      if (!currentLanguage.LanguageCode)
        currentLanguage.LanguageCodeRequired = true;
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
      Active: true
    };
    this.setState({
      currentLanguage: currentLanguage
    });
  }
  render() {
    const { currentLanguage } = this.state;
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Language Form"
        navigation={true}
        navigationRoute="/master/languages"
      >
        <div className="div-padding">
          <FormGroup row />
          <FormGroup row>
            <Col xs="8" md="4">
              <InputElement
                type="text"
                label="Language name"
                placeholder="Language name"
                maxLength = {255}
                name="LanguageName"
                required={currentLanguage.LanguageNameRequired}
                value={currentLanguage.LanguageName}
                onChange={event => this.onChangeHandler(event)}
              />
            </Col>
            <Col md="4">
              <InputElement
                type="text"
                label="Language code"
                placeholder="Language code"
                 maxLength = {255}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    languageMasterError: state.languagesReducer.languageMasterError,
    languageList: state.languagesReducer.languages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLanguage: language => dispatch(actions.createLanguage(language)),
    updateLanguage: (id, language) =>
      dispatch(actions.updateLanguage(id, language))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LanguagesForm);
