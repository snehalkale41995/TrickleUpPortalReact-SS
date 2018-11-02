import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Button ,Row} from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import VillageForm from "./VillageForm";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import * as constants from "../../../constants/StatusConstants";
class VillageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showForm: false,
      villageToEdit: {},
      villageToDelete: {},
      modalStatus: false,
      tableStatus: true
    };
  }
  componentWillMount() {
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }

  onDeleteVillage(cell, row) {
    let componentRef = this;
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
    //onClick={() => componentRef.deleteConfirm(row._id)}
  }
  onDelete(row) {
    this.setState({
      villageToDelete: row
    });
    this.onModalToggle();
  }
  onConfirmDelete() {
    let village = { ...this.state.villageToDelete };
    this.state.tableStatus ? (village.Active = false) : (village.Active = true);
    this.props.deleteVillage(village.Id, village);
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  onModalToggle() {
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  onEditVillage(cell, row) {
    return (
      <Link to={this} onClick={() => this.onEdit(row)}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  onEdit(row) {
    this.setState({
      villageToEdit: row,
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
  onActivateVillage(cell, row) {
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i class="fa fa-check-square-o" aria-hidden="true" title="Activate" />
      </Link>
    );
  }
  render() {
    const sortingOptions = {
      defaultSortName: "VillageName",
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
          value: this.state.tableStatus ? this.props.villages.length : this.props.inActiveVillages.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.showForm ? (
      <VillageForm {...this.props} edit={this.state.villageToEdit} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div className="address-tabs-margin">
        <CardLayout
          name="Villages"
          buttonName="Add Village"
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
                data={this.state.tableStatus ? this.props.villages : this.props.inActiveVillages}
                pagination={true}
                search={true}
                options={sortingOptions}
                //exportCSV={true}
                hover={true}
                csvFileName="VillagesList.csv"
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
                  dataField="VillageName"
                  headerAlign="left"
                  width="40"
                  csvHeader="Village Name"
                  dataSort={true}
                >
                  Village Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="GrampanchayatName"
                  headerAlign="left"
                  width="40"
                  csvHeader="Grampanchayat"
                  dataSort={true}
                >
                  Grampanchayat
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="DistrictName"
                  headerAlign="left"
                  width="40"
                  csvHeader="District"
                  dataSort={true}
                >
                  District
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="StateName"
                  headerAlign="left"
                  width="40"
                  csvHeader="State"
                  dataSort={true}
                >
                  State
                </TableHeaderColumn>
                {this.state.tableStatus ? (
                  <TableHeaderColumn
                    dataField="edit"
                    dataFormat={this.onEditVillage.bind(this)}
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
                    dataFormat={this.onDeleteVillage.bind(this)}
                    headerAlign="left"
                    width="20"
                    export={false}
                  >
                    Deactivate
                  </TableHeaderColumn>
                ) : (
                  <TableHeaderColumn
                    dataField="delete"
                    dataFormat={this.onActivateVillage.bind(this)}
                    headerAlign="left"
                    width="20"
                    export={false}
                  >
                    Activate
                  </TableHeaderColumn>
                )}
              </BootstrapTable>
            </Col>
          </FormGroup>
          <ConfirmModal
            isOpen={this.state.modalStatus}
            onModalToggle={this.onModalToggle.bind(this)}
            onConfirmDelete={this.onConfirmDelete.bind(this)}
            title={this.state.tableStatus ? "Deactivate" : "Activate"}
            message={
              this.state.tableStatus
                ? "Are you sure you want to deactivate this village record ?"
                : "Are you sure you want to activate this village record ?"
            }
          />
        </CardLayout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    villages: state.villageReducer.villages,
    inActiveVillages : state.villageReducer.inActiveVillages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteVillage: (id, village) => dispatch(actions.deleteVillage(id, village))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VillageList);
