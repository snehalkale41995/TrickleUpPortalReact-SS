import React, { Component } from "react";
import { connect } from "react-redux";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import Loader from "../../components/Loader/Loader";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import _ from "lodash";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import * as actions from "../../store/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
class CropStepsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      cropNameDisabled: false,
      cropMaterial: {
        Material_Name: "",
        Material_Transaction: "",
        Per_Decimal_Price: "",
        Step_Name: "",
        Quantity: ""
      },
      cropMaterialAudioAllocation: [],
      loading: true
    };
  }
  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      if (this.props.cropStepsMaterial.length !== 0) {
        let id = this.props.match.params.id;
        this.props.getCropMaterialAudioAllocation(id);
        let currentCropMaterial = _.find(this.props.cropStepsMaterial, function(
          cropMaterial
        ) {
          return cropMaterial.Id == id;
        });
        setTimeout(() => {
          this.setState({
            updateFlag: true,
            cropMaterial: currentCropMaterial,
            loading: false,
            cropNameDisabled: true,
            cropMaterialAudioAllocation: this.props.cropMaterialAudioAllocation
          });
        }, 1000);
      }
    } else {
      this.setState({
        loading: false
      });
    }
    if (this.props.cropMaterialError) {
      Toaster.Toaster("Something went wrong !", this.props.cropMaterialError);
    }
  }
  onChangeHandler(event) {
    let cropMaterial = { ...this.state.cropMaterial };
    cropMaterial[event.target.name] = event.target.value;
    cropMaterial[event.target.name + "Required"] = false;
    this.setState({
      cropMaterial: cropMaterial
    });
  }
  playAudio(cell, row) {
    return <AudioPlayer autoPlay={false} source={row.FilePath} />;
  }
  onSubmit() {
    this.props.history.push("/cropCultivations/CropsMaterial");
  }
  render() {
    let cropMaterial = { ...this.state.cropMaterial };
    const sortingOptions = {
      defaultSortName: "FieldType",
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
          value: this.props.cropMaterialAudioAllocation.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Crops Material Form"
        navigation={true}
        navigationRoute="/cropCultivations/CropsMaterial"
      >
        <div className="div-padding">
          <FormGroup row>
            <Col xs="12" md="5">
              <InputElement
                type="text"
                name="Material_Name"
                label="Material Name"
                disabled={true}
                placeholder="Material Name"
                value={cropMaterial.Material_Name}
                required={cropMaterial.Material_NameRequired}
                onChange={event => this.onChangeHandler(event)}
              />
            </Col>
            <Col md="5">
              <InputElement
                type="text"
                name="Step_Name"
                label="Step Name"
                disabled={true}
                placeholder="Step Name"
                value={cropMaterial.Step_Name}
                required={cropMaterial.Step_NameRequired}
                onChange={event => this.onChangeHandler(event)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12" md="5">
              <InputElement
                type="text"
                name="Material_Transaction"
                label="Material Transaction"
                disabled={true}
                placeholder="Material_Transaction"
                value={cropMaterial.Material_Transaction}
                required={cropMaterial.Material_TransactionRequired}
                onChange={event => this.onChangeHandler(event)}
              />
            </Col>
            <Col md="5">
              <InputElement
                type="text"
                name="Quantity"
                label="Quantity"
                disabled={true}
                placeholder="Quantity"
                value={cropMaterial.Quantity}
                required={cropMaterial.QuantityRequired}
                onChange={event => this.onChangeHandler(event)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12" md="5">
              <InputElement
                type="text"
                name="Per_Decimal_Price"
                label="Per Decimal Price"
                disabled={true}
                placeholder="Per_Decimal_Price"
                value={cropMaterial.Per_Decimal_Price}
                required={cropMaterial.Per_Decimal_PriceRequired}
                onChange={event => this.onChangeHandler(event)}
              />
            </Col>
          </FormGroup>
        </div>
        {this.props.cropMaterialAudioAllocation.length > 0 ? (
          <div style={{ marginTop: -50 }}>
            <CardLayout
              subName="Audio Allocation"
              buttonName="Add Audio"
              buttonLink={this}
              active="none"
            >
              <FormGroup row>
                <Col xs="12" style={{ marginTop: -10 }}>
                  <BootstrapTable
                    ref="table"
                    data={this.props.cropMaterialAudioAllocation}
                    pagination={true}
                    search={true}
                    options={sortingOptions}
                    hover={true}
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
                      dataField="FieldType"
                      headerAlign="left"
                      width="15"
                      dataSort={true}
                    >
                      Field Type
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="LanguageName"
                      headerAlign="left"
                      width="30"
                      dataSort={true}
                    >
                      Language
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="FileName"
                      headerAlign="left"
                      width="30"
                      dataSort={true}
                    >
                      File Name
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="Audio"
                      headerAlign="left"
                      width="60"
                      dataFormat={this.playAudio.bind(this)}
                    >
                      Audio
                    </TableHeaderColumn>
                  </BootstrapTable>
                </Col>
              </FormGroup>
            </CardLayout>
          </div>
        ) : null}

        {this.state.updateFlag ? (
          <FormGroup row>
            <Col xs="3" md="1">
              <Button
                className="theme-positive-btn"
                onClick={() => this.onSubmit()}
                style={{ pointerEvents: "none", opacity: 0.5 }}
              >
                Save
              </Button>
            </Col>
          </FormGroup>
        ) : (
          <FormGroup row>
            <Col xs="5" md="1">
              <Button
                className="theme-positive-btn"
                onClick={() => this.onSubmit()}
                style={{ pointerEvents: "none", opacity: 0.5 }}
              >
                Create
              </Button>
            </Col>
            <Col md="1">
              <Button
                className="theme-reset-btn"
                style={{ pointerEvents: "none" }}
              >
                {" "}
                Reset
              </Button>
            </Col>
          </FormGroup>
        )}
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    cropStepsMaterial: state.cropsReducer.cropStepsMaterial,
    cropMaterialAudioAllocation:
      state.cropsReducer.currentCropMaterialAudioAllocation,
    cropMaterialError: state.cropsReducer.cropMaterialError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropMaterialAudioAllocation: id =>
      dispatch(actions.getCropMaterialAudioAllocation(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropStepsForm);
