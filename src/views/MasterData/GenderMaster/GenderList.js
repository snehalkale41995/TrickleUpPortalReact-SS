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

class GenderList extends Component {
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
    this.props.getGendersList();
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
      <Link style={{ pointerEvents: 'none' }} to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Delete"  />
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
    let state = { ...this.state.stateToDelete };
    state.Active  = false;
    this.props.deleteState(state.Id, state);
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

  onEdit(row) {
   
  }
  render() {
    console.log("this.props.genders", this.props.genders)
    const sortingOptions = {
      defaultSortName: "GenderName",
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
          value: this.props.genders.length
        }
      ],
      sizePerPage: 5
    };
    return  this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout name="Genders">
          <FormGroup row>
          <Col xs="12" md="10" />
          <Col md="1" style={{ marginTop: -55, marginLeft: 25 }}> 
             <Link to={`${this.props.match.url}/GenderForm`} style={{ pointerEvents: 'none' }}> 
              <Button
                type="button"
                className="theme-positive-btn">
                <i className="fa fa-plus" /> &nbsp; Add Gender
              </Button>
               </Link> 
              &nbsp;&nbsp;
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12">
               <BootstrapTable
                ref="table"
                data={this.props.genders}
                pagination={true}
                search={true}
                options={sortingOptions}
                //exportCSV={true}
                hover={true}
                csvFileName="Language List"
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
                  dataField="GenderName"
                  headerAlign="left"
                  width="20"
                  csvHeader="State Name"
                  dataSort={true}
                >
                  Gender
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
          </FormGroup>
        </CardLayout>
        <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title="Deactivate"
          message="Are you sure you want to deactivate this language record ?"
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
     genders: state.rolesReducer.genders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGendersList : () => dispatch(actions.getGendersList())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GenderList);
