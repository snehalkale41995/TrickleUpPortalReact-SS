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
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import ActiveCropsTable from "./ActiveCropsTable";
import InActiveCropsTable from "./InActiveCropsTable";
import * as constants from "../../../constants/StatusConstants";
import DropdownSelect from "../../../components/InputElement/Dropdown";

class Crops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFlag: false,
      loading: true,
      modalStatus: false,
      cropToDelete: {},
      tableStatus: true
    };
  }
  componentWillMount() {
    this.props.getCropsList();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }
  componentDidMount() {
    if (this.props.cropError) {
      Toaster.Toaster("Something went wrong !", this.props.cropError);
    }
  }
  onDeactiveCrop(cell, row) {
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
      cropToDelete: row
    });
    this.onModalToggle();
  }

  onConfirmDelete() {
    let crop = { ...this.state.cropToDelete };
    let compRef = this;
    crop.ActiveBy = localStorage.getItem("user");
    crop.ActiveOn = new Date();
    if (this.state.tableStatus) {
      crop.Active = false;
      this.props.deactivateCrop(crop.Id, crop);
    } else {
      crop.Active = true;
      this.props.deactivateCrop(crop.Id, crop);
    }
    let displayMessage = compRef.state.tableStatus
      ? "Crop deactivated successfully"
      : "Crop activated successfully";
    setTimeout(() => {
      let message = "";
      compRef.props.cropError
        ? (message = "Something went wrong !")
        : (message = displayMessage);
      Toaster.Toaster(message, compRef.props.cropError);
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

  onEditState(cell, row) {
    return (
      <Link to={`${this.props.match.url}/CropForm/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  showImage(cell, row) {
    return (
      <img
        src={`${AppConfig.serverURL}/${row.FilePath}`}
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
        name="Crops"
        buttonName="Add crop"
        // buttonLink={this}
        //active="none"
        buttonLink={`${this.props.match.url}/CropForm`}
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
              <ActiveCropsTable
                cropList={this.props.activeCrops}
                showImage={this.showImage.bind(this)}
                onEditState={this.onEditState.bind(this)}
                onDeactiveCrop={this.onDeactiveCrop.bind(this)}
              />
            ) : (
              <InActiveCropsTable
                cropList={this.props.inActiveCrops}
                showImage={this.showImage.bind(this)}
                onActiveCrop={this.onDeactiveCrop.bind(this)}
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
              ? "Are you sure you want to deactivate this crop record ?"
              : "Are you sure you want to activate this crop record ?"
          }
        />
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    cropsList: state.cropsReducer.cropsList,
    activeCrops: state.cropsReducer.activeCrops,
    inActiveCrops: state.cropsReducer.inActiveCrops,
    cropError: state.cropsReducer.cropError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropsList: () => dispatch(actions.getCropsList()),
    deactivateCrop: (id, crop) => dispatch(actions.deactivateCrop(id, crop))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Crops);
