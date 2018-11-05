import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../components/InputElement/Dropdown";
import InputElement from "../../components/InputElement/InputElement";
import { AppSwitch } from "@coreui/react";
import AppConfig from "../../constants/AppConfig";
import CropSteps from "./CropSteps";
import Loader from "../../components/Loader/Loader";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import _ from "lodash";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";

//const cropData = require('./crop.json');
class CropForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      cropStatus: "Inactive",
      crop: {
        CropName: "",
        FilePath: "",
        CropNameRequired: false,
        CropImageRequired: false,
        Ready: false,
        Cultivation_Steps: [],
        renderURL: ""
      },
      audioAllocation: [],
      loading: true
    };
  }
  componentDidMount() {
    let compRef = this;
    if (this.props.match.params.id !== undefined) {
      if (this.props.cropsList.length !== 0) {
        let id = this.props.match.params.id;
        this.props.getCropAudioAllocation(id);
        let currentCrop = _.find(this.props.cropsList, function(crop) {
          return crop.Id == id;
        });
        currentCrop.renderURL = `${AppConfig.serverURL}/${currentCrop.FilePath}`;
        setTimeout(() => {
          this.setState({
            updateFlag: true,
            crop: currentCrop,
            loading: false,
            audioAllocation: this.props.currentCropAudioAllocation
          });
        }, 1000);
      }
    } else {
      this.setState({
        loading: false
      });
    }
  }
  onChangeName(event) {
    let crop = { ...this.state.crop };
    crop[event.target.name] = event.target.value;
    crop[event.target.name + "Required"] = false;
    this.setState({
      crop: crop
    });
  }
  onImageChange(event) {
    if (event.target.files.length !== 0) {
      let file = event.target.files[0];
      let crop = { ...this.state.Crop };
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      crop.FilePath = formData;
      crop.CropImageRequired = false;
      crop.renderURL = URL.createObjectURL(event.target.files[0]);
      this.setState({
        crop: crop
      });
    } else {
      let crop = { ...this.state.crop };
      crop.FilePath = "";
      crop.renderURL = "";
      this.setState({ crop: crop });
    }
  }
  onSwitch(event) {
    let crop = { ...this.state.crop };
    crop.Ready = event.target.checked;
    crop.Ready
      ? this.setState({
          crop: crop,
          cropStatus: "Active"
        })
      : this.setState({
          crop: crop,
          cropStatus: "Inactive"
        });
  }
  playAudio(cell, row) {
    return <AudioPlayer autoPlay={false} source={row.FilePath} />;
  }
  onSubmit() {
    let crop = { ...this.state.crop };
    let imagedata = crop.FilePath;
    this.props.storeCropImage(imagedata);
    //this.props.history.push("/cropCultivations/crops");
  }
  render() {
    let crop = { ...this.state.crop };
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
          value: this.props.currentCropAudioAllocation.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div>
        <CardLayout
          name="Crop Form"
          navigation={true}
          navigationRoute="/cropCultivations/crops"
        >
          <div className="div-padding">
            <FormGroup row>
              <Col xs="12" md="6">
                <FormGroup row>
                  <Col xs="10" md="8">
                    <InputElement
                      type="text"
                      name="CropName"
                      label="Crop name "
                      placeholder="Crop name"
                      value={crop.CropName}
                      required={crop.CropNameRequired}
                      onChange={event => this.onChangeName(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col xs="10" md="8">
                    <InputElement
                      type="file"
                      accept="image/*"
                      name="Crop Image"
                      label="Crop Image"
                      required={crop.CropImageRequired}
                      onChange={event => this.onImageChange(event)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col xs="10" md="8">
                    <Label />
                    <Label>
                      Crop status :
                      <AppSwitch
                        className={"mx-2"}
                        variant={"pill"}
                        color={"primary"}
                        checked={crop.Ready}
                        onChange={this.onSwitch.bind(this)}
                      />
                      {this.state.cropStatus}
                    </Label>
                  </Col>
                </FormGroup>
                
              </Col>
              <Col md="6">
                {/* {this.state.crop.renderURL !== "" ? ( */}
                <img
                  src={this.state.crop.renderURL}
                  className="image-display"
                  alt=""
                />
                {/* ) : null} */}
              </Col>
            </FormGroup>
          </div>
          <div style={{ marginTop: -70 }}>
            <CardLayout subName="Audio Allocation" buttonName = "Add Audio" buttonLink={this}>
              <FormGroup row>
                <Col xs="12" style={{marginTop : -10}}>
                  <BootstrapTable
                    ref="table"
                    data={this.props.currentCropAudioAllocation}
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
                    {/* <TableHeaderColumn
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
              </TableHeaderColumn> */}
                  </BootstrapTable>
                </Col>
              </FormGroup>
            </CardLayout>
          </div>
          {this.state.updateFlag ? (
                  <FormGroup row>
                    <Col md="1">
                      <Button
                        className="theme-positive-btn"
                        onClick={() => this.onSubmit()}
                      >
                        Save
                      </Button>
                    </Col>
                  </FormGroup>
                ) : (
                  <FormGroup row>
                    <Col md="2">
                      <Button
                        className="theme-positive-btn"
                        onClick={() => this.onSubmit()}
                      >
                        Create
                      </Button>
                    </Col>
                    <Col md="1">
                      <Button className="theme-reset-btn"> Reset</Button>
                    </Col>
                  </FormGroup>
                )}
        </CardLayout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cropsList: state.cropsReducer.cropsList,
    currentCropAudioAllocation: state.cropsReducer.currentCropAudioAllocation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeCropImage: image => dispatch(actions.storeCropImage(image)),
    getCropAudioAllocation: id => dispatch(actions.getCropAudioAllocation(id))
    // CropsCultivationSteps: (id) => dispatch(actions.getCropCultivationSteps(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropForm);
