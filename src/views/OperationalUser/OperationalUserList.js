import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormGroup, Col, Button } from "reactstrap";
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
class OperationalUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modalStatus: false,
      userToDelete: {},
      tableStatus : true
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
    if(this.state.tableStatus){
      return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Dactivate" />
      </Link>
    );
    }
   else{
       return (
         
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i class="fa fa-check-square-o" aria-hidden="true" title="Activate" />
      </Link>
    );
   }
  }
 
    onTablestatusChange(value) {
    if(value!=null){
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
    if(this.state.tableStatus){
     user.Active = false;
    this.props.deleteBeneficiary(user.Id, user);
    }
    else{
    user.Active = true;
    this.props.deleteBeneficiary(user.Id, user);
    }
   setTimeout(() => {
      let message = "";
      let displayMessage = compRef.state.tableStatus ? "User deactivated successfully": "User activated successfully"
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
    const sortingOptions = {
      defaultSortName: "Name",
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
          value: this.state.tableStatus ? this.props.operationalUsers.length : this.props.inactiveOperationalUsers.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Operational User"
        buttonName="Add User"
        buttonLink={`${this.props.match.url}/operationalUser`}
      >
      <br/>
       <FormGroup row>
            <Col xs="12" md="4">
              <DropdownSelect
                name="tableStatus"
                value = {this.state.tableStatus}
                options={constants.tableStatus}
                onChange={this.onTablestatusChange.bind(this)}
              />
            </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="12">
            <BootstrapTable
              ref="table"
              data={this.state.tableStatus ? this.props.operationalUsers : this.props.inactiveOperationalUsers}
              pagination={true}
              search={true}
              options={sortingOptions}
              exportCSV={true}
              csvFileName="OperationalUserList.csv"
              hover={true}
            >
              <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
                Id
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="Name"
                headerAlign="left"
                width="40"
                csvHeader="Name"
                dataSort={true}
              >
                Name
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="PhoneNumber"
                headerAlign="left"
                width="40"
                csvHeader="Phone Number"
                dataSort={true}
              >
                Phone Number
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="UserId"
                headerAlign="left"
                width="40"
                csvHeader="Email Id"
                dataSort={true}
              >
                Email Id
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="Age"
                csvHeader="Age"
                export={true}
                hidden
              />
              <TableHeaderColumn
                dataField="GenderName"
                csvHeader="Gender"
                export={true}
                hidden
              />
              <TableHeaderColumn
                dataField="StateName"
                csvHeader="State"
                export={true}
                hidden
              />
              <TableHeaderColumn
                dataField="DistrictName"
                csvHeader="District"
                export={true}
                hidden
              />
              <TableHeaderColumn
                dataField="GrampanchayatName"
                csvHeader="Grampanchayat"
                export={true}
                hidden
              />
              <TableHeaderColumn
                dataField="VillageName"
                csvHeader="Village"
                export={true}
                hidden
              />
              <TableHeaderColumn
                dataField="LanguageName"
                csvHeader="Language"
                export={true}
                hidden
              />
            {
              this.state.tableStatus ?     
              <TableHeaderColumn
                dataField="edit"
                dataFormat={this.onEditBeneficiary.bind(this)}
                headerAlign="left"
                width="20"
                export={false}
              >
                Edit
              </TableHeaderColumn>  : null
              }
             {
              this.state.tableStatus ?  <TableHeaderColumn
                dataField="delete"
                dataFormat={this.onDeleteBeneficiary.bind(this)}
                headerAlign="left"
                width="20"
                export={false}
              >
               Deactivate
              </TableHeaderColumn> :  <TableHeaderColumn
                dataField="delete"
                dataFormat={this.onDeleteBeneficiary.bind(this)}
                headerAlign="left"
                width="20"
                export={false}
              >
                Activate
              </TableHeaderColumn>
            }
            </BootstrapTable>
          </Col>
           <ToastContainer autoClose={2000} />
        </FormGroup>
        <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title= {this.state.tableStatus ? "Deactivate" : "Acivate"}
          message={this.state.tableStatus ? "Are you sure you want to deactivate this user record ?" : 
                  "Are you sure you want to activate this user record ?"}
        />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    beneficiaryList: state.beneficiaryReducer.beneficiaryList,
    operationalUsers : state.beneficiaryReducer.operationalUsers,
    inactiveOperationalUsers : state.beneficiaryReducer.inactiveOperationalUsers,
    beneficiaryError : state.beneficiaryReducer.beneficiaryError
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
