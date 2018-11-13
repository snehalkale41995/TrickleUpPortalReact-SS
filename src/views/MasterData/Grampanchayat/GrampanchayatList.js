import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Row } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import GrampanchayatForm from "./GrampanchayatForm";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import * as constants from "../../../constants/StatusConstants";
import ActiveGrampanchayatTable from "./ActiveGrampanchayatTable";
import InActiveGrampanchayatTable from "./InActiveGrampanchayatTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";

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
  componentDidMount() {
    if (this.props.grampanchayatMasterError) {
      Toaster.Toaster("Something went wrong !", this.props.grampanchayatMasterError);
    }
  }
  onDeleteGrampanchayat(cell, row) {
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
    let displayMessage = this.state.tableStatus
    ? "Grampanchayat deactivated successfully"
    : "Grampanchayat activated successfully";
  setTimeout(() => {
    let message = "";
    this.props.grampanchayatMasterError
      ? (message = "Something went wrong !")
      : (message = displayMessage);
    Toaster.Toaster(message, this.props.grampanchayatMasterError);
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
      noDataText: "No records found for active grampanchayat",
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
      noDataText: "No records found for inactive grampanchayat",
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
          <ToastContainer autoClose={1000} />
        </CardLayout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    grampanchayats: state.grampanchayatReducer.grampanchayats,
    inActiveGrampanchayat: state.grampanchayatReducer.inActiveGrampanchayat,
    grampanchayatMasterError : state.grampanchayatReducer.grampanchayatMasterError
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
