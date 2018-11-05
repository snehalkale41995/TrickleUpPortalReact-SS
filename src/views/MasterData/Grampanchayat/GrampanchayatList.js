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
import GrampanchayatForm from "./GrampanchayatForm";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import * as constants from "../../../constants/StatusConstants";
import ActiveGrampanchayatTable from "./ActiveGrampanchayatTable";
import InActiveGrampanchayatTable from "./InActiveGrampanchayatTable";

class GrampanchayatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showForm: false,
      grampanchayatToEdit: {},
      grampanchayatToDelete: {},
      modalStatus: false,
      tableStatus: true
    };
  }
  componentWillMount() {
    this.props.getGrampanchayatsList();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }

  onDeleteGrampanchayat(cell, row) {
    let componentRef = this;
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
  }
  onDelete(row) {
    this.setState({
      grampanchayatToDelete: row
    });
    this.onModalToggle();
  }
  onConfirmDelete() {
    let grampanchayat = { ...this.state.grampanchayatToDelete };
    this.state.tableStatus
      ? (grampanchayat.Active = false)
      : (grampanchayat.Active = true);
    this.props.deleteGrampanchayat(grampanchayat.Id, grampanchayat);
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  onModalToggle() {
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }

  onEditGrampanchayat(cell, row) {
    return (
      <Link to={this} onClick={() => this.onEdit(row)}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  onEdit(row) {
    this.setState({
      grampanchayatToEdit: row,
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
  onActivateGrampanchayat(cell, row) {
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i class="fa fa-check-square-o" aria-hidden="true" title="Activate" />
      </Link>
    );
  }
  render() {
    const sortingOptionsActive = {
      defaultSortName: "GrampanchayatName",
      noDataText: 'No records found for active grampanchayat' ,
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
          value: this.props.grampanchayats.length
        }
      ],
      sizePerPage: 5
    };
    const sortingOptionsInActive = {
      defaultSortName: "GrampanchayatName",
      noDataText: 'No records found for inactive grampanchayat' ,
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
          value: this.props.inActiveGrampanchayat.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.showForm ? (
      <GrampanchayatForm
        {...this.props}
        edit={this.state.grampanchayatToEdit}
      />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div className="address-tabs-margin">
        <CardLayout
          name="Grampanchayats"
          buttonName="Add Grampanchayat"
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
              {this.state.tableStatus ? (
                <ActiveGrampanchayatTable
                  grampanchayats={this.props.grampanchayats}
                  sortingOptions={sortingOptionsActive}
                  onEditGrampanchayat={this.onEditGrampanchayat.bind(this)}
                  onDeleteGrampanchayat={this.onDeleteGrampanchayat.bind(this)}
                />
              ) : (
                <InActiveGrampanchayatTable
                  grampanchayats={this.props.inActiveGrampanchayat}
                  sortingOptions={sortingOptionsInActive}
                  onActivateGrampanchayat={this.onActivateGrampanchayat.bind(
                    this
                  )}
                />
              )}
              {/* <BootstrapTable
                ref="table"
                data={
                  this.state.tableStatus
                    ? this.props.grampanchayats
                    : this.props.inActiveGrampanchayat
                }
                pagination={true}
                search={true}
                options={sortingOptions}
                hover={true}
                csvFileName="grampanchayatList.csv"
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
                  dataField="GrampanchayatName"
                  headerAlign="left"
                  width="40"
                  dataSort={true}
                >
                  Grampanchayat
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="DistrictName"
                  headerAlign="left"
                  width="40"
                  dataSort={true}
                >
                  District
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="StateName"
                  headerAlign="left"
                  width="40"
                  dataSort={true}
                >
                  State
                </TableHeaderColumn>
                {this.state.tableStatus ? (
                  <TableHeaderColumn
                    dataField="edit"
                    dataFormat={this.onEditGrampanchayat.bind(this)}
                    headerAlign="left"
                    width="20"
                    export={false}
                  >
                    Edit
                  </TableHeaderColumn>
                ) : null}
                {this.state.tableStatus ? (
                  <TableHeaderColumn
                    dataField="delete"
                    dataFormat={this.onDeleteGrampanchayat.bind(this)}
                    headerAlign="left"
                    width="20"
                    export={false}
                  >
                    Deactivate
                  </TableHeaderColumn>
                ) : (
                  <TableHeaderColumn
                    dataField="delete"
                    dataFormat={this.onActivateGrampanchayat.bind(this)}
                    headerAlign="left"
                    width="20"
                    export={false}
                  >
                    Activate
                  </TableHeaderColumn>
                )}
              </BootstrapTable> */}
            </Col>
          </FormGroup>
          <ConfirmModal
            isOpen={this.state.modalStatus}
            onModalToggle={this.onModalToggle.bind(this)}
            onConfirmDelete={this.onConfirmDelete.bind(this)}
            title={this.state.tableStatus ? "Deactivate" : "Activate"}
            message={
              this.state.tableStatus
                ? "Are you sure you want to deactivate this grampanchayat record ?"
                : "Are you sure you want to activate this grampanchayat record ?"
            }
          />
        </CardLayout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    grampanchayats: state.grampanchayatReducer.grampanchayats,
    inActiveGrampanchayat: state.grampanchayatReducer.inActiveGrampanchayat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatesList: () => dispatch(actions.getStatesList()),
    getDistrictsList: () => dispatch(actions.getDistrictsList()),
    getGrampanchayatsList: () => dispatch(actions.getGrampanchayatsList()),
    deleteGrampanchayat: (id, grampanchayat) =>
      dispatch(actions.deleteGrampanchayat(id, grampanchayat))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GrampanchayatList);
