import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Row } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";

import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import VillageForm from "./VillageForm";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import * as constants from "../../../constants/StatusConstants";
import ActiveVillageTable from "./ActiveVillageTable";
import InActiveVillageTable from "./InActiveVillageTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
class VillageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
  componentDidMount() {
    if (this.props.villageMasterError) {
      Toaster.Toaster("Something went wrong !", this.props.villageMasterError);
    }
  }
  onDeleteVillage(cell, row) {
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
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
  //   let displayMessage = this.state.tableStatus
  //   ? "Village deactivated successfully"
  //   : "Village activated successfully";
  // setTimeout(() => {
  //   let message = "";
  //   this.props.villageMasterError
  //     ? (message = "Something went wrong !")
  //     : (message = displayMessage);
  //   Toaster.Toaster(message, this.props.villageMasterError);
  // }, 1000);
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
    const sortingOptionsActive = {
      defaultSortName: "VillageName",
      noDataText: "No records found for active village",
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
    const sortingOptionsInActive = {
      defaultSortName: "VillageName",
      noDataText: "No records found for inactive village",
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
          value: this.props.inActiveVillages.length
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
                search={false}
                simpleValue
              />
            </Col>
          </Row>
          <FormGroup row>
            <Col xs="12">
              {this.state.tableStatus ? (
                <ActiveVillageTable
                  villages={this.props.villages}
                  sortingOptions={sortingOptionsActive}
                  onEditVillage={this.onEditVillage.bind(this)}
                  onDeleteVillage={this.onDeleteVillage.bind(this)}
                />
              ) : (
                <InActiveVillageTable
                  villages={this.props.inActiveVillages}
                  sortingOptions={sortingOptionsInActive}
                  onActivateVillage={this.onActivateVillage.bind(this)}
                />
              )}
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
        {/* <ToastContainer autoClose={1000} /> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    villages: state.villageReducer.villages,
    inActiveVillages: state.villageReducer.inActiveVillages,
    villageMasterError: state.villageReducer.villageMasterError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteVillage: (id, village) => dispatch(actions.deleteVillage(id, village))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VillageList);
