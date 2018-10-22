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
class RegistrationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modalStatus: false,
      userToDelete: {}
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
  componentDidMount() {
    this.props.getBeneficiaryList();
  }
  onDeleteBeneficiary(cell, row) {
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
    //onClick={() => componentRef.deleteConfirm(row._id)}
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
    user.Active  = false;
    this.props.deleteBeneficiary(user.Id, user);
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
          value: this.props.beneficiaryList.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout name="User List">
          <FormGroup row>
            <Col xs="12" md="10" />
            <Col md="2" style={{ marginTop: -55 }}>
              <Link to={`${this.props.match.url}/registration`}>
                <Button type="button" className="theme-positive-btn">
                  <i className="fa fa-plus" />
                  &nbsp; Add beneficiary
                </Button>
              </Link>
              &nbsp;&nbsp;
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12" md="12">
              <BootstrapTable
                style={{ marginTop: -18 }}
                ref="table"
                data={this.props.beneficiaryList}
                pagination={true}
                search={true}
                options={sortingOptions}
                exportCSV={true}
                csvFileName="BeneficiaryList.csv"
                hover={true}
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
                  dataField="Name"
                  headerAlign="left"
                  width="60"
                  csvHeader="Name"
                  dataSort={true}
                >
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="PhoneNumber"
                  headerAlign="left"
                  width="40"
                  csvHeader="PhoneNumber"
                  dataSort={true}
                >
                  Phone Number
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="RoleName"
                  headerAlign="left"
                  width="40"
                  csvHeader="RoleName"
                  dataSort={true}
                >
                  Role
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="StateName"
                  csvHeader="State"
                  export={true}
                  hidden
                />
                {/* <TableHeaderColumn
                  dataField="DistrictName"
                  csvHeader="District"
                  export={true}
                  hidden
                />
                <TableHeaderColumn
                  dataField="VillageName"
                  csvHeader="Village"
                  export={true}
                  hidden
                /> */}
                <TableHeaderColumn
                  dataField="GenderName"
                  csvHeader="Gender"
                  export={true}
                  hidden
                />
                <TableHeaderColumn
                  dataField="edit"
                  dataFormat={this.onEditBeneficiary.bind(this)}
                  headerAlign="left"
                  width="20"
                  export={false}
                >
                  Edit
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="delete"
                  dataFormat={this.onDeleteBeneficiary.bind(this)}
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
          message="Are you sure you want to deactivate this beneficiary ?"
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    beneficiaryList: state.beneficiaryReducer.beneficiaryList
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
