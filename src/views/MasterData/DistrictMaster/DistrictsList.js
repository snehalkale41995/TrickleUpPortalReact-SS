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
import DistrictForm from "./DistrictForm";

class DistrictsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDistrict: "",
      modalFlag: false,
      stateToEdit: {},
      loading: true,
      showForm: false
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
      <Link to={this}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
    //onClick={() => componentRef.deleteConfirm(row._id)}
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
          value: this.props.districts.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.showForm ? (
      <DistrictForm {...this.props} editDistrict={this.state.editDistrict} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout name="Districts">
          <FormGroup row>
          <Col xs="12" md="10" />
          <Col md="1" style={{ marginTop: -55, marginLeft: 45 }} >      
              {/* <Link to={`${this.props.match.url}/districtForm`}> */}
              <Button
                type="button"
                className="theme-positive-btn"
                onClick={() => {
                  this.setState({ showForm: true });
                }}
              >
                <i className="fa fa-plus" />&nbsp; Add district
              </Button>
              {/* </Link> */}
              &nbsp;&nbsp;
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12">
              <BootstrapTable
                ref="table"
                data={this.props.districts}
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
                <TableHeaderColumn
                  dataField="edit"
                  dataFormat={this.onEditDistrict.bind(this)}
                  headerAlign="left"
                  width="20"
                  export={false}
                >
                  Edit
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="delete"
                  dataFormat={this.onDeleteDistrict.bind(this)}
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
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    districtsList: state.districtReducer.districtsList,
    districts: state.districtReducer.districts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDistrictsList: () => dispatch(actions.getDistrictsList())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DistrictsList);
