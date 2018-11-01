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
import VillageForm from "./VillageForm";
import ConfirmModal from "../../../components/Modal/ConfirmModal";


class VillageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      showForm : false,
      villageToEdit  :{},
      villageToDelete : {},
      modalStatus: false,
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

  onDeleteState(cell, row) {
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
    village.Active  = false;
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
  onEditState(cell, row) {
    return (
      <Link to={this}  onClick={() => this.onEdit(row)}>
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
          value: this.props.villages.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.showForm ? (
      <VillageForm {...this.props} edit={this.state.villageToEdit} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
        
        <CardLayout name="Villages"
         buttonName="Add village"
        buttonLink={this}
        buttonClick={() => {
          this.setState({ showForm: true });
        }}>
          <FormGroup row>
            <Col xs="12" >
            <BootstrapTable
              ref="table"
              data={this.props.villages}
              pagination={true}
              search={true}
              options={sortingOptions}
              //exportCSV={true}
              hover={true}
              csvFileName="VillagesList.csv"
            >
              <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
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
                Deactivate
              </TableHeaderColumn>
            </BootstrapTable>
            </Col>
          </FormGroup>
          <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title="Deactivate"
          message="Are you sure you want to deactivate this village record ?"
        />
        </CardLayout>
      )
     
  }
}
 const mapStateToProps = state => {
  return {
      villages : state.villageReducer.villages
  };
};

 const mapDispatchToProps = dispatch => {
  return {
    deleteVillage : (id,village) => dispatch(actions.deleteVillage(id,village))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VillageList);
