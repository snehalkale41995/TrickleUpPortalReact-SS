import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Button, Row } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import DistrictForm from "./DistrictForm";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import * as constants from "../../../constants/StatusConstants";

class DistrictsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDistrict: "",
      modalFlag: false,
      stateToEdit: {},
      loading: true,
      showForm: false,
      modalStatus: false,
      districtToDelete: {},
      tableStatus: true
    };
  }
  componentWillMount() {
    this.props.getDistrictsList();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }
  onDistrictValueChange(value) {
    this.setState({
      selectedDistrict: value.value
    });
  }

  onDeleteDistrict(cell, row) {
    let componentRef = this;
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
  }
  onDelete(row) {
    this.setState({
      districtToDelete: row
    });
    this.onModalToggle();
  }
  onConfirmDelete() {
    let district = { ...this.state.districtToDelete };
    this.state.tableStatus ?  district.Active = false :  district.Active = true;
    this.props.deleteDistrict(district.Id, district);
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  onModalToggle() {
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }

  onEditDistrict(cell, row) {
    return (
      <Link to={this} onClick={() => this.editDistrict(row)}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  editDistrict(row) {
    this.setState({
      editDistrict: row,
      showForm: true
    });
  }
  onStatusChange(value) {
    if (value !== null) {
      this.setState({ tableStatus: value });
    } else {
      this.setState({ tableStatus: true });
    }
  }
  onActivateDistrict(cell, row) {
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i class="fa fa-check-square-o" aria-hidden="true" title="Activate" />
      </Link>
    );
  }
  render() {
    const sortingOptions = {
      defaultSortName: "DistrictName",
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
          value: this.state.tableStatus ? this.props.districts.length : this.props.inactiveDistrict.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.showForm ? (
      <DistrictForm {...this.props} editDistrict={this.state.editDistrict} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div className="address-tabs-margin">
        <CardLayout
          name="Districts"
          buttonName="Add district"
          buttonLink={this}
          buttonClick={() => {
            this.setState({ showForm: true });
          }}
        >
          <Row className="address-drop-margin">
            <Col xs="12" md="10" />
            <Col md="2">
              <DropdownSelect
                label="Status"
                options={constants.tableStatus}
                value={this.state.tableStatus}
                onChange={this.onStatusChange.bind(this)}
                simpleValue
              />
            </Col>
          </Row>
          <FormGroup row>
            <Col xs="12">
              <BootstrapTable
                ref="table"
                data={this.state.tableStatus ? this.props.districts : this.props.inactiveDistrict}
                pagination={true}
                search={true}
                options={sortingOptions}
                // exportCSV={true}
                hover={true}
                csvFileName="Districts List"
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
                  dataField="DistrictName"
                  headerAlign="left"
                  width="60"
                  csvHeader="District Name"
                  dataSort={true}
                >
                  District Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="StateName"
                  headerAlign="left"
                  width="40"
                  csvHeader="State Name"
                  dataSort={true}
                >
                  State Name
                </TableHeaderColumn>
                {this.state.tableStatus ? (
                  <TableHeaderColumn
                    dataField="edit"
                    dataFormat={this.onEditDistrict.bind(this)}
                    headerAlign="left"
                    width="20"
                    export={false}
                  >
                    Edit
                  </TableHeaderColumn>
                ) : null}
                {
                  this.state.tableStatus ?  <TableHeaderColumn
                  dataField="delete"
                  dataFormat={this.onDeleteDistrict.bind(this)}
                  headerAlign="left"
                  width="20"
                  export={false}
                >
                  Deactivate
                </TableHeaderColumn> :  <TableHeaderColumn
                  dataField="delete"
                  dataFormat={this.onActivateDistrict.bind(this)}
                  headerAlign="left"
                  width="20"
                  export={false}
                >
                  Activate
                </TableHeaderColumn>
                }
               
              </BootstrapTable>
            </Col>
          </FormGroup>
        </CardLayout>
        <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title={this.state.tableStatus ? "Deactivate" : "Activate"}
          message={
            this.state.tableStatus
              ? "Are you sure you want to deactivate this district record ?"
              : "Are you sure you want to activate this district record ?"
          }
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    districtsList: state.districtReducer.districtsList,
    districts: state.districtReducer.districts,
    inactiveDistrict : state.districtReducer.inactiveDistrict
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDistrictsList: () => dispatch(actions.getDistrictsList()),
    deleteDistrict: (id, district) =>
      dispatch(actions.deleteDistrict(id, district))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DistrictsList);
