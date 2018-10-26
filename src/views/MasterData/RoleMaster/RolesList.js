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
class RolesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFlag: false,
      loading: true,
      modalStatus: false,
      roleToDelete: {}
    };
  }

  componentWillMount() {
    this.props.getRolesList();
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
      <Link to={this}  onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Delete"  />
      </Link>
    );
  }

  onDelete(row) {
    this.setState({
      roleToDelete: row
    });
    this.onModalToggle();
  }

  onConfirmDelete() {
    let compRef = this;
    let role = { ...this.state.roleToDelete };
    role.Active  = false;
    this.props.deleteRole(role.Id, role);
      this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.roleMasterError
            ? (message = "Something went wrong !")
            : (message = "Role deleted successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.roleMasterError);
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
      <Link to={`${componentRef.props.match.url}/RoleForm/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  
  render() {
    const sortingOptions = {
      defaultSortName: "RoleName",
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
          value: this.props.Roles.length
        }
      ],
      sizePerPage: 5
    };
    return  this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout name="Roles">
          <FormGroup row>
          <Col xs="12" md="10" />
          <Col md="1" style={{ marginTop: -55, marginLeft: 45 }}> 
             <Link to={`${this.props.match.url}/RoleForm`}  > 
              <Button
                type="button"
                className="theme-positive-btn">
                <i className="fa fa-plus" /> &nbsp; Add Role
              </Button>
               </Link> 
              &nbsp;&nbsp;
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12">
              <BootstrapTable
                ref="table"
                data={this.props.Roles}
                pagination={true}
                search={true}
                options={sortingOptions}
                //exportCSV={true}
                hover={true}
                csvFileName="Roles List"
              >
                <TableHeaderColumn
                  dataField="Id"
                  headerAlign="left"
                  isKey
                  hidden
                >
                  Id
                </TableHeaderColumn>
                 <TableHeaderColumn
                  dataField="RoleId"
                  headerAlign="left"
                  width="30"
                  csvHeader="Role Id"
                  dataSort={true}
                >
                  Role Id
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="RoleName"
                  headerAlign="left"
                  width="30"
                  csvHeader="Role Name"
                  dataSort={true}
                >
                  Role Name
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
        </CardLayout>
        <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title="Deactivate"
          message="Are you sure you want to deactivate this role record ?"
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
     Roles: state.rolesReducer.roles,
     roleMasterError: state.rolesReducer.roleMasterError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRolesList: () => dispatch(actions.getRolesList()),
    deleteRole : (id,state) => dispatch(actions.deleteRole(id,state))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RolesList);
