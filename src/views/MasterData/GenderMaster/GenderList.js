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
class GenderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFlag: false,
      loading: true,
      modalStatus: false,
      genderToDelete: {}
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
      <Link  to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Delete"  />
      </Link>
    );
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
    gender.Active  = false;
    this.props.deleteGender(gender.Id, gender);
    // this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.genderMasterError
            ? (message = "Something went wrong !")
            : (message = "Gender deleted successfully");
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
        <CardLayout name="Gender">
          <FormGroup row>
          <Col xs="12" md="10" />
          <Col md="1" style={{ marginTop: -55, marginLeft: 25 }}> 
             <Link to={`${this.props.match.url}/GenderForm`} > 
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
          <ToastContainer autoClose={2000} />
          </FormGroup>
        </CardLayout>
        <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title="Deactivate"
          message="Are you sure you want to deactivate this gender record ?"
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
     genders: state.gendersReducer.genders,
     genderMasterError: state.gendersReducer.genderMasterError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGendersList : () => dispatch(actions.getGendersList()),
    deleteGender : (id,state) => dispatch(actions.deleteGender(id,state))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GenderList);
