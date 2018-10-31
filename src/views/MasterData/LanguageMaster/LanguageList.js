import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Button } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
class LanguageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFlag: false,
      loading: true,
      modalStatus: false,
      stateToDelete: {}
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

  onDeleteState(cell, row) {
    let componentRef = this;
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
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
    language.Active = false;
    this.props.deleteLanguage(language.Id, language);
    this.setState({ loading: true });
    setTimeout(() => {
      let message = "";
      compRef.props.languageMasterError
        ? (message = "Something went wrong !")
        : (message = "Language deleted successfully");
      compRef.setState({ loading: false });
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
    const sortingOptions = {
      defaultSortName: "LanguageName",
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
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Languages"
        buttonName="Add language"
        buttonLink={`${this.props.match.url}/LanguageForm`}
      >
        <FormGroup row>
          <Col xs="12">
            <BootstrapTable
              ref="table"
              data={this.props.languages}
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
              <TableHeaderColumn
                dataField="edit"
                dataFormat={this.onEditState.bind(this)}
                headerAlign="left"
                width="20"
                export={false}
              >
                Edit
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="delete"
                dataFormat={this.onDeleteState.bind(this)}
                headerAlign="left"
                width="20"
                export={false}
              >
                Delete
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
          <ToastContainer autoClose={2000} />
        </FormGroup>
        <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title="Deactivate"
          message="Are you sure you want to deactivate this language record ?"
        />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    languages: state.languagesReducer.languages,
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
