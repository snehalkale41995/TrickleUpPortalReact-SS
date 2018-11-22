import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Row } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
import * as constants from "../../../constants/StatusConstants";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import ActiveCropMaterialTable from "./ActiveCropMaterialTable";
import InActiveCropMaterialTable from "./InActiveCropMaterialTable";

class CropsMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFlag: false,
      loading: true,
      modalStatus: false,
      cropMaterialToDelete: {},
      tableStatus: true
    };
  }
  componentWillMount() {
    this.props.getCropStepsMaterial();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }
  componentDidMount() {
    if (this.props.cropMaterialError) {
      Toaster.Toaster("Something went wrong !", this.props.cropMaterialError);
    }
  }
  onDeleteMaterial(cell, row) {
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
      cropMaterialToDelete: row
    });
    this.onModalToggle();
  }

  onConfirmDelete() {
    let cropMaterial = { ...this.state.cropMaterialToDelete };
    let compRef = this;
    cropMaterial.ActiveBy = localStorage.getItem("user");
    cropMaterial.ActiveOn = new Date();
    if (this.state.tableStatus) {
      cropMaterial.Active = false;
      this.props.deleteCropMaterial(cropMaterial.Id, cropMaterial);
    } else {
      cropMaterial.Active = true;
      this.props.deleteCropMaterial(cropMaterial.Id, cropMaterial);
    }
    let displayMessage = compRef.state.tableStatus
      ? "Crop material deactivated successfully"
      : "Crop material activated successfully";
    setTimeout(() => {
      let message = "";
      compRef.props.cropMaterialError
        ? (message = "Something went wrong !")
        : (message = displayMessage);
      Toaster.Toaster(message, compRef.props.cropMaterialError);
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

  onEditMaterial(cell, row) {
    return (
      <Link to={`${this.props.match.url}/CropsMaterialForm/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
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
        name="Crop Materials"
        buttonName="Add Crop Material"
        buttonLink={`${this.props.match.url}/CropsMaterialForm`}
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
              <ActiveCropMaterialTable
                cropMaterial={this.props.activeCropMaterial}
                onEdit={this.onEditMaterial.bind(this)}
                onDelete={this.onDeleteMaterial.bind(this)}
              />
            ) : (
              <InActiveCropMaterialTable
                cropMaterial={this.props.inActiveCropMaterial}
                onDelete={this.onDeleteMaterial.bind(this)}
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
              ? "Are you sure you want to deactivate this crop material record ?"
              : "Are you sure you want to activate this crop material record ?"
          }
        />
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    activeCropMaterial: state.cropsReducer.activeCropMaterial,
    inActiveCropMaterial: state.cropsReducer.inActiveCropMaterial,
    cropMaterialError: state.cropsReducer.cropMaterialError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropStepsMaterial: () => dispatch(actions.getCropStepsMaterial()),
    deleteCropMaterial : (id,cropMaterial) => dispatch(actions.deleteCropMaterial(id,cropMaterial))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropsMaterial);
