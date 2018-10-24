import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Button } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from '../../../components/Loader/Loader';
import InputElement from "../../../components/InputElement/InputElement";
import Modal from "../../../components/Modal/MasterModal";

class RolesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      modalFlag: false,
      RoleName :""
    };
  }
  componentWillMount() {
    let compRef =this;
    setTimeout(() => {
      compRef.setState({
        loading : false
      })
    },2000)
  }

  onDelete(cell, row) {
    let componentRef = this;
    return (
      <Link to={this} style={{ pointerEvents: 'none' }} >
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
    //onClick={() => componentRef.deleteConfirm(row._id)}
  }

  onEdit(cell, row) {
    return (
      <Link to={this} style={{ pointerEvents: 'none' }} onClick={() => this.onEditRole(row)}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  onEditRole(row){
    this.setState({RoleName : row.RoleName});
  ///  setTimeout(() => {
      this.setState({
          modalFlag: !this.state.modalFlag
        });
  ///  } ,1000)
}

onToggleModal() {
  this.setState({
    modalFlag: !this.state.modalFlag
  });
}
onSubmitModal() {
  this.setState({
    modalFlag: !this.state.modalFlag
  });
}
onChangeValue(event){
  this.setState({
      RoleName : event.target.value
  })
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
          value: this.props.rolesList.length
        }
      ],
      sizePerPage: 5
    };
    return (
      this.state.loading ? <Loader loading={this.state.loading} /> :
      (
        <div style={{marginTop : 30}}>
        <CardLayout name="Roles">
        <FormGroup row>
        <Col xs="12" md="10" />
          <Col md="1" style={{ marginTop: -55, marginLeft: 45 }} >      
            <Button style={{ pointerEvents: 'none' }} className="theme-positive-btn" onClick={this.onToggleModal.bind(this)}>Add role</Button>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12" >
            <BootstrapTable
              ref="table"
              data={this.props.rolesList}
              pagination={true}
              search={true}
              options={sortingOptions}
              //exportCSV={true}
              hover={true}
              //csvFileName="Roles List"
            >
              <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
                Id
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="RoleName"
                headerAlign="left"
                width="40"
                csvHeader="State Name"
                dataSort={true}
              >
                Role Name
              </TableHeaderColumn>
              <TableHeaderColumn
              dataField="edit"
              dataFormat={this.onEdit.bind(this)}
              headerAlign="left"
              width="20"
              export={false}
              >
                Edit
              </TableHeaderColumn>
              <TableHeaderColumn
              dataField="delete"
              dataFormat={this.onDelete.bind(this)}
              headerAlign="left"
              width="20"
              export={false}
              >
                Delete
              </TableHeaderColumn>
            </BootstrapTable>
            </Col>
          </FormGroup>
        </CardLayout>
        <Modal
          openFlag={this.state.modalFlag}
          toggleFunction={this.onToggleModal.bind(this)}
          confirmFunction={this.onSubmitModal.bind(this)}
          name="RoleName"
          label="Role"
          header="Add role"
          value={this.state.RoleName}
          onChange={this.onChangeValue.bind(this)}
        />
        </div>
      )
     
    );
  }
}
 const mapStateToProps = state => {
  return {
    rolesList: state.rolesReducer.roles,
  };
};

 const mapDispatchToProps = dispatch => {
  return {
    getRolesList: () => dispatch(actions.getRolesList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RolesList);
