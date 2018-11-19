import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col,Row } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
import * as constants from "../../../constants/StatusConstants";
import ActiveGenderTable from "./ActiveGenderTable";
import InActiveGenderTable from "./InActiveGenderTable";
class GenderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFlag: false,
      loading: true,
      modalStatus: false,
      genderToDelete: {},
      tableStatus: true
    };
  }

  componentWillMount() {
    this.props.getGendersList();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }
  componentDidMount() {
    if (this.props.genderMasterError) {
      Toaster.Toaster("Something went wrong !", this.props.genderMasterError);
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
      genderToDelete: row
    });
    this.onModalToggle();
  }

  onConfirmDelete() {
    let gender = { ...this.state.genderToDelete };
    let compRef = this;
    if (this.state.tableStatus) {
      gender.Active = false;
      this.props.deleteGender(gender.Id, gender);
    } else {
      gender.Active = true;
      this.props.deleteGender(gender.Id, gender);
    }
    // this.setState({ loading: true });
    let displayMessage = compRef.state.tableStatus
      ? "Gender deactivated successfully"
      : "Gender activated successfully";
    setTimeout(() => {
      let message = "";
      compRef.props.genderMasterError
        ? (message = "Something went wrong !")
        : (message = displayMessage);
      //  compRef.setState({ loading: false });
      Toaster.Toaster(message, compRef.props.genderMasterError);
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
      <Link to={`${componentRef.props.match.url}/GenderForm/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }

  render() {
    const sortingOptionsActive = {
      defaultSortName: "GenderName",
      defaultSortOrder: "asc",
      noDataText: 'No records found for active gender' ,
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
          value: this.props.genders.length
        }
      ],
      sizePerPage: 5
    };
    const sortingOptionsInActive = {
      defaultSortName: "GenderName",
      defaultSortOrder: "asc",
      noDataText: 'No records found for inactive gender' ,
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
          value: this.props.inactiveGenders.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Gender"
        buttonName="Add Gender"
        buttonLink={`${this.props.match.url}/GenderForm`}
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
              <ActiveGenderTable
                genders={this.props.genders}
                sortingOptions={sortingOptionsActive}
                onEditState={this.onEditState.bind(this)}
                onDeleteState={this.onDeleteState.bind(this)}
              />
            ) : (
              <InActiveGenderTable
                genders={this.props.inactiveGenders}
                sortingOptions={sortingOptionsInActive}
                onEditState={this.onEditState.bind(this)}
                onDeleteState={this.onDeleteState.bind(this)}
              />
            )}
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
              ? "Are you sure you want to deactivate this gender record ?"
              : "Are you sure you want to activate this gender record ?"
          }
        />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    genders: state.gendersReducer.genders,
    inactiveGenders: state.gendersReducer.inactiveGenders,
    genderMasterError: state.gendersReducer.genderMasterError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGendersList: () => dispatch(actions.getGendersList()),
    deleteGender: (id, state) => dispatch(actions.deleteGender(id, state))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GenderList);
