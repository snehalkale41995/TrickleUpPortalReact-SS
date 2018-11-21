import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Row } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import AppConfig from "../../../constants/AppConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
import * as constants from "../../../constants/StatusConstants";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import ActiveCropStepTable from "./ActiveCropStepTable";
import InActiveCropStepTable from "./InActiveCropStepTable";

class CropSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFlag: false,
      loading: true,
      modalStatus: false,
      cropStepToDelete: {},
      tableStatus: true
    };
  }
  componentWillMount() {
    this.props.getCropSteps();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }
  componentDidMount() {
    if (this.props.cropStepError) {
      Toaster.Toaster("Something went wrong !", this.props.cropStepError);
    }
  }
  onDeleteCropStep(cell, row) {
    if (this.state.tableStatus) {
      return (
        <Link to={this} onClick={() => this.onDelete(row)}>
          <i className="fa fa-trash" title="Deactivate" />
        </Link>
      );
    } else {
      return (
        <Link to={this} onClick={() => this.onDelete(row)}>
          <i class="fa fa-check-square-o" aria-hidden="true" title="Activate" />
        </Link>
      );
    }
  }
  onDelete(row) {
    this.setState({
      cropStepToDelete: row
    });
    this.onModalToggle();
  }

  onConfirmDelete() {
    let cropStep = { ...this.state.cropStepToDelete };
    let compRef = this;
    cropStep.ActiveBy = localStorage.getItem("user");
    cropStep.ActiveOn = new Date();
    if (this.state.tableStatus) {
      cropStep.Active = false;
      this.props.deleteCropStep(cropStep.Id, cropStep);
    } else {
      cropStep.Active = true;
      this.props.deleteCropStep(cropStep.Id, cropStep);
    }
    let displayMessage = compRef.state.tableStatus
      ? "Crop deactivated successfully"
      : "Crop activated successfully";
    setTimeout(() => {
      let message = "";
      compRef.props.cropStepError
        ? (message = "Something went wrong !")
        : (message = displayMessage);
      Toaster.Toaster(message, compRef.props.cropStepError);
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

  onEditCropStep(cell, row) {
    return (
      <Link to={`${this.props.match.url}/CropStepForm/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  showImage(cell, row) {
    return (
      <img
        src={`${AppConfig.serverURL}/${row.MediaURL}`}
        style={{ height: 50, width: 50 }}
        alt=""
      />
    );
  }

  onTablestatusChange(value) {
    if (value != null) {
      this.setState({
        tableStatus: value
      });
    }
  }
  render() {
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Crop Steps"
        buttonName="Add crop step"
        buttonLink={`${this.props.match.url}/CropStepForm`}
      >
        <Row className="address-drop-margin">
          <Col xs="12" md="10" />
          <Col md="2">
            <DropdownSelect
              label="Status"
              options={constants.tableStatus}
              value={this.state.tableStatus}
              onChange={this.onTablestatusChange.bind(this)}
              search={false}
              simpleValue
            />
          </Col>
        </Row>
        <FormGroup row>
          <Col xs="12">
            {this.state.tableStatus ? (
              <ActiveCropStepTable
                cropSteps={this.props.activeCropSteps}
                showImage={this.showImage.bind(this)}
                onEdit={this.onEditCropStep.bind(this)}
                onDelete={this.onDeleteCropStep.bind(this)}
              />
            ) : (
              <InActiveCropStepTable
                cropSteps={this.props.InactiveCropSteps}
                showImage={this.showImage.bind(this)}
                onDelete={this.onDeleteCropStep.bind(this)}
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
              ? "Are you sure you want to deactivate this crop step record ?"
              : "Are you sure you want to activate this crop step record ?"
          }
        />
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    activeCropSteps :state.cropsReducer.activeCropSteps ,
    InactiveCropSteps: state.cropsReducer.InactiveCropSteps,
    cropStepError: state.cropsReducer.cropStepError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropSteps: () => dispatch(actions.getCropSteps()),
    deleteCropStep: (id, cropStep) =>
      dispatch(actions.deleteCropStep(id, cropStep))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropSteps);
