import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormGroup, Col, Button, Row } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
import DropdownSelect from "../../components/InputElement/Dropdown";
import * as constants from "../../constants/StatusConstants";
import ActiveOperationalUserTable from "./ActiveOperationalUserTable";
import InActiveOperationalUserTable from "./InActiveOperationalUserTable";
class OperationalUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modalStatus: false,
      userToDelete: {},
      tableStatus: true
    };
  }

  componentWillMount() {
    this.props.getBeneficiaryList();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }

  onDeleteBeneficiary(cell, row) {
    let componentRef = this;
    if (this.state.tableStatus) {
      return (
        <Link to={this} onClick={() => this.onDelete(row)}>
          <i className="fa fa-trash" title="Dactivate" />
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
      userToDelete: row
    });
    this.onModalToggle();
  }

  onEditBeneficiary(cell, row) {
    return (
      <Link to={`${this.props.match.url}/operationalUser/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }

  onConfirmDelete() {
    let compRef = this;
    let user = { ...this.state.userToDelete };
    if (this.state.tableStatus) {
      user.Active = false;
      this.props.deleteBeneficiary(user.Id, user);
    } else {
      user.Active = true;
      this.props.deleteBeneficiary(user.Id, user);
    }
    setTimeout(() => {
      let message = "";
      let displayMessage = compRef.state.tableStatus
        ? "User deactivated successfully"
        : "User activated successfully";
      compRef.props.beneficiaryError
        ? (message = "Something went wrong !")
        : (message = displayMessage);
      //compRef.setState({ loading: false });
      Toaster.Toaster(message, compRef.props.beneficiaryError);
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

  render() {
    const sortingOptionsActive = {
      defaultSortName: "Name",
      defaultSortOrder: "asc",
      noDataText: 'No records found for active operational users' ,
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
          value: this.props.activeOperationalUsers.length
        }
      ],
      sizePerPage: 5
    };
    const sortingOptionsInActive = {
      defaultSortName: "Name",
      defaultSortOrder: "asc",
      noDataText: 'No records found for inactive operational users' ,
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
          value: this.props.inActiveOperationalUsers.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Operational Users"
        buttonName="Add User"
        buttonLink={`${this.props.match.url}/operationalUser`}
      >
        <Row className="address-drop-margin">
          <Col xs="12" md="10" />
          <Col md="2">
            <DropdownSelect
              label="Status"
              options={constants.tableStatus}
              value={this.state.tableStatus}
              onChange={this.onTablestatusChange.bind(this)}
              simpleValue
            />
          </Col>
        </Row>
        <FormGroup row>
          <Col xs="12" md="12">
            {this.state.tableStatus ? (
              <ActiveOperationalUserTable
                operationalUsers={this.props.activeOperationalUsers}
                sortingOptions={sortingOptionsActive}
                onEditBeneficiary={this.onEditBeneficiary.bind(this)}
                onDeleteBeneficiary={this.onDeleteBeneficiary.bind(this)}
              />
            ) : (
              <InActiveOperationalUserTable
                operationalUsers={this.props.inActiveOperationalUsers}
                sortingOptions={sortingOptionsInActive}
                onDeleteBeneficiary={this.onDeleteBeneficiary.bind(this)}
              />
            )}
          </Col>
          <ToastContainer autoClose={2000} />
        </FormGroup>
        <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title={this.state.tableStatus ? "Deactivate" : "Activate"}
          message={
            this.state.tableStatus
              ? "Are you sure you want to deactivate this user record ?"
              : "Are you sure you want to activate this user record ?"
          }
        />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    beneficiaryList: state.beneficiaryReducer.beneficiaryList,
    activeOperationalUsers: state.beneficiaryReducer.activeOperationalUsers,
    inActiveOperationalUsers: state.beneficiaryReducer.inActiveOperationalUsers,
    beneficiaryError: state.beneficiaryReducer.beneficiaryError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBeneficiaryList: () => dispatch(actions.getBeneficiaryList()),
    deleteBeneficiary: (id, beneficiary) =>
      dispatch(actions.deleteBeneficiary(id, beneficiary))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  OperationalUserList
);
