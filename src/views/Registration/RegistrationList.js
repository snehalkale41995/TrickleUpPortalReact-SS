import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormGroup, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import DropdownSelect from "../../components/InputElement/Dropdown";
import ActiveBeneficiaryTable from "./ActiveBeneficiaryTable";
import InActiveBeneficiaryTable from "./InActiveBeneficiaryTable";
import * as constants from "../../constants/StatusConstants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
class RegistrationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableStatus: true,
      loading: true,
      modalStatus: false,
      userToDelete: {}
    };
  }

  componentWillMount() {
    this.props.getBeneficiaryList();
    setTimeout(() => {
       this.setState({
      loading: false
    });
    }, 2000);
  }
  componentDidMount() {
    if (this.props.beneficiaryError) {
      Toaster.Toaster("Something went wrong !", this.props.beneficiaryError);
    }
  }

  onDeleteBeneficiary(cell, row) {
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Deactivate" />
      </Link>
    );
  }

  onDelete(row) {
    this.setState({
      userToDelete: row
    });
    this.onModalToggle();
  }

  onEditBeneficiary(cell, row) {
    return (
      <Link to={`${this.props.match.url}/registration/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }

  onConfirmDelete() {
    let user = { ...this.state.userToDelete };
    this.state.tableStatus ? (user.Active = false) : (user.Active = true);
    this.props.deleteBeneficiary(user.Id, user);
    let displayMessage = this.state.tableStatus
    ? "Beneficiary deactivated successfully"
    : "Beneficiary activated successfully";
  setTimeout(() => {
    let message = "";
    this.props.beneficiaryError
      ? (message = "Something went wrong !")
      : (message = displayMessage);
    Toaster.Toaster(message, this.props.beneficiaryError);
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
  onTablestatusChange(value) {
    if (value != null) {
      this.setState({
        tableStatus: value
      });
    }
  }
  onActivateBeneficiary(cell, row) {
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i class="fa fa-check-square-o" aria-hidden="true" title="Activate" />
      </Link>
    );
  }

  render() {
    const sortingOptionsActive = {
      defaultSortName: "Name",
      defaultSortOrder: "asc",
      noDataText: 'No records found for active beneficiaries' ,
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
          value: this.props.activeBeneficiaryList.length
        }
      ],
      sizePerPage: 5
    };
    const sortingOptionsInActive = {
      defaultSortName: "Name",
      defaultSortOrder: "asc",
      noDataText: 'No records found for inactive beneficiaries' ,
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
          value: this.props.inActiveBeneficiaryList.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Beneficiary List"
        buttonName="Add Beneficiary"
        buttonLink={`${this.props.match.url}/registration`}
      >
        <Row className="address-drop-margin">
          <Col xs="12" md="10" />
          <Col md="2">
            <DropdownSelect
              label="Status"
              options={constants.tableStatus}
              value={this.state.tableStatus}
              onChange={this.onTablestatusChange.bind(this)}
              search ={false}
              simpleValue
            />
          </Col>
        </Row>
        <FormGroup row>
          <Col xs="12" md="12">
            {this.state.tableStatus ? (
              <ActiveBeneficiaryTable
                beneficiaryList={this.props.activeBeneficiaryList}
                sortingOptions={sortingOptionsActive}
                onEditBeneficiary={this.onEditBeneficiary.bind(this)}
                onDeleteBeneficiary={this.onDeleteBeneficiary.bind(this)}
              />
            ) : (
              <InActiveBeneficiaryTable
                beneficiaryList={this.props.inActiveBeneficiaryList}
                sortingOptions={sortingOptionsInActive}
                onActivateBeneficiary={this.onActivateBeneficiary.bind(this)}
              />
            )}
          </Col>
        </FormGroup>
        <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title={this.state.tableStatus ? "Deactivate" : "Activate"}
          message={
            this.state.tableStatus
              ? "Are you sure you want to deactivate this beneficiary record ?"
              : "Are you sure you want to activate this beneficiary record ?"
          }
        />
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    activeBeneficiaryList: state.beneficiaryReducer.activeBeneficiaryList,
    inActiveBeneficiaryList: state.beneficiaryReducer.inActiveBeneficiaryList,
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
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationList);
