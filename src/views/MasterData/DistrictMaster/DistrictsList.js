import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Row } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import DistrictForm from "./DistrictForm";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import * as constants from "../../../constants/StatusConstants";
import ActiveDistrictTable from "./ActiveDistrictTable";
import InActiveDistrictTable from "./InActiveDistrictTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";

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
  componentDidMount() {
    if (this.props.districtMasterError) {
      Toaster.Toaster("Something went wrong !", this.props.districtMasterError);
    }
  }
  onDistrictValueChange(value) {
    this.setState({
      selectedDistrict: value.value
    });
  }

  onDeleteDistrict(cell, row) {
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
    this.state.tableStatus
      ? (district.Active = false)
      : (district.Active = true);
    this.props.deleteDistrict(district.Id, district);
    let displayMessage = this.state.tableStatus
      ? "District deactivated successfully"
      : "District activated successfully";
    setTimeout(() => {
      let message = "";
      this.props.districtMasterError
        ? (message = "Something went wrong !")
        : (message = displayMessage);
      Toaster.Toaster(message, this.props.districtMasterError);
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
    const sortingOptionsActive = {
      defaultSortName: "DistrictName",
      noDataText: "No records found for active district",
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
    const sortingOptionsInActive = {
      defaultSortName: "DistrictName",
      noDataText: "No records found for inactive district",
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
          value: this.props.inactiveDistrict.length
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
          buttonName="Add District"
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
                <ActiveDistrictTable
                  districts={this.props.districts}
                  sortingOptions={sortingOptionsActive}
                  onEditDistrict={this.onEditDistrict.bind(this)}
                  onDeleteDistrict={this.onDeleteDistrict.bind(this)}
                />
              ) : (
                <InActiveDistrictTable
                  districts={this.props.inactiveDistrict}
                  sortingOptions={sortingOptionsInActive}
                  onActivateDistrict={this.onActivateDistrict.bind(this)}
                />
              )}
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
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    districtsList: state.districtReducer.districtsList,
    districts: state.districtReducer.districts,
    inactiveDistrict: state.districtReducer.inactiveDistrict,
    districtMasterError: state.districtReducer.districtMasterError
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
