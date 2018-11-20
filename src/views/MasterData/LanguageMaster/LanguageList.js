import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Row } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
import * as constants from "../../../constants/StatusConstants";
import ActiveLanguageTable from "./ActiveLanguageTable";
import InActiveLanguageTable from "./InActiveLanguageTable";
class LanguageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFlag: false,
      loading: true,
      modalStatus: false,
      stateToDelete: {},
      tableStatus: true
    };
  }

  componentWillMount() {
    this.props.getLanguageList();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }
  componentDidMount() {
    if (this.props.languageMasterError) {
      Toaster.Toaster("Something went wrong !", this.props.languageMasterError);
    }
  }
  onDeleteState(cell, row) {
    if (this.state.tableStatus) {
      return (
        <Link to={this} onClick={() => this.onDelete(row)}>
          <i className="fa fa-trash" title="Deactivate" />
        </Link>
      );
    } else {
      return (
        <Link to={this} onClick={() => this.onDelete(row)}>
          <i class="fa fa-check-square-o" aria-hidden="true" title="Activate" />
        </Link>
      );
    }
  }

  onTablestatusChange(value) {
    if (value != null) {
      this.setState({
        tableStatus: value
      });
    }
  }

  onDelete(row) {
    this.setState({
      stateToDelete: row
    });
    this.onModalToggle();
  }

  onConfirmDelete() {
    let compRef = this;
    let language = { ...this.state.stateToDelete };
    if (this.state.tableStatus) {
      language.Active = false;
      this.props.deleteLanguage(language.Id, language);
    } else {
      language.Active = true;
      this.props.deleteLanguage(language.Id, language);
    }
    setTimeout(() => {
      let message = "";
      let displayMessage = compRef.state.tableStatus
        ? "Language deactivated successfully"
        : "Language activated successfully";
      compRef.props.languageMasterError
        ? (message = "Something went wrong !")
        : (message = displayMessage);
      Toaster.Toaster(message, compRef.props.languageMasterError);
    }, 1000);
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  onModalToggle() {
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }

  onEditState(cell, row) {
    let componentRef = this;
    return (
      <Link to={`${componentRef.props.match.url}/LanguageForm/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }

  render() {
    const sortingOptionsActive = {
      defaultSortName: "LanguageName",
      noDataText: "No records found for active language",
      defaultSortOrder: "asc",
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "20",
          value: 20
        },
        {
          text: "All",
          value: this.props.languages.length
        }
      ],
      sizePerPage: 5
    };
    const sortingOptionsInActive = {
      defaultSortName: "LanguageName",
      noDataText: "No records found for inactive language",
      defaultSortOrder: "asc",
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "20",
          value: 20
        },
        {
          text: "All",
          value: this.props.inactiveLanguages.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Languages"
        buttonName="Add language"
        buttonLink={`${this.props.match.url}/LanguageForm`}
      >
        <Row className="address-drop-margin">
          <Col xs="12" md="10" />
          <Col md="2">
            <DropdownSelect
              label="Status"
              options={constants.tableStatus}
              value={this.state.tableStatus}
              onChange={this.onTablestatusChange.bind(this)}
              search={false}
              simpleValue
            />
          </Col>
        </Row>
        <FormGroup row>
          <Col xs="12">
            {this.state.tableStatus ? (
              <ActiveLanguageTable
                languages={this.props.languages}
                sortingOptions={sortingOptionsActive}
                onEditState={this.onEditState.bind(this)}
                onDeleteState={this.onDeleteState.bind(this)}
              />
            ) : (
              <InActiveLanguageTable
                languages={this.props.inactiveLanguages}
                sortingOptions={sortingOptionsInActive}
                onEditState={this.onEditState.bind(this)}
                onDeleteState={this.onDeleteState.bind(this)}
              />
            )}
            {/* <BootstrapTable
              ref="table"
              data={
                this.state.tableStatus
                  ? this.props.languages
                  : this.props.inactiveLanguages
              }
              pagination={true}
              search={true}
              options={sortingOptions}
              //exportCSV={true}
              hover={true}
              csvFileName="Language List"
            >
              <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
                Id
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="LanguageCode"
                headerAlign="left"
                width="30"
                csvHeader="Language Code"
                dataSort={true}
              >
                Language Code
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="LanguageName"
                headerAlign="left"
                width="30"
                csvHeader="Language Name"
                dataSort={true}
              >
                Language Name
              </TableHeaderColumn>
              {this.state.tableStatus ? (
                <TableHeaderColumn
                  dataField="edit"
                  dataFormat={this.onEditState.bind(this)}
                  headerAlign="left"
                  width="20"
                  export={false}
                >
                  Edit
                </TableHeaderColumn>
              ) : null}
              {this.state.tableStatus ? (
                <TableHeaderColumn
                  dataField="delete"
                  dataFormat={this.onDeleteState.bind(this)}
                  headerAlign="left"
                  width="20"
                  export={false}
                >
                  Deactivate
                </TableHeaderColumn>
              ) : (
                <TableHeaderColumn
                  dataField="delete"
                  dataFormat={this.onDeleteState.bind(this)}
                  headerAlign="left"
                  width="20"
                  export={false}
                >
                  Activate
                </TableHeaderColumn>
              )}
            </BootstrapTable> */}
          </Col>
          <ToastContainer autoClose={1000} />
        </FormGroup>
        <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title={this.state.tableStatus ? "Deactivate" : "Activate"}
          message={
            this.state.tableStatus
              ? "Are you sure you want to deactivate this language record ?"
              : "Are you sure you want to activate this language record ?"
          }
        />
      </CardLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    languages: state.languagesReducer.languages,
    inactiveLanguages: state.languagesReducer.inactiveLanguages,
    languageMasterError: state.languagesReducer.languageMasterError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLanguageList: () => dispatch(actions.getLanguageList()),
    deleteLanguage: (id, language) =>
      dispatch(actions.deleteLanguage(id, language))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LanguageList);
