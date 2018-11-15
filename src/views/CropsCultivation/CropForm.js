import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import { AppSwitch } from "@coreui/react";
import AppConfig from "../../constants/AppConfig";
import Loader from "../../components/Loader/Loader";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import _ from "lodash";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
import CollapseCards from "../../components/Cards/CollapseCards";
import AudioAllocationGrid from "./AudioAllocationGrid";
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
      loading: true,
      audioGridOpen: false
    };
  }

  componentDidMount() {
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
      this.props.clearAudioAllocations();
      this.setState({
        loading: false
      });
    }
    if (this.props.cropError) {
      Toaster.Toaster("Something went wrong !", this.props.cropError);
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
      //let file = event.target.files[0];
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
  audioToggleCollapse() {
    this.setState({
      audioGridOpen: !this.state.audioGridOpen
    });
  }
  onAddAudio() {
    if (this.props.match.params.id !== undefined) {
      this.props.history.push(
        `/cropCultivations/audioAllocation/${"crop"}/${this.props.match.params
          .id}`
      );
    } else {
      this.props.history.push(`/cropCultivations/audioAllocation/${"crop"}`);
    }
  }
  render() {
    let crop = { ...this.state.crop };
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
                  height={300}
                  width={350}
                  alt=""
                />
                {/* ) : null} */}
              </Col>
            </FormGroup>
          </div>

          <div style={{ marginTop: -50 }}>
            <CollapseCards
              subName="Audio Allocation"
              buttonName="Add Audio"
              buttonLink={this}
              buttonClick={this.onAddAudio.bind(this)}
              isOpen={this.state.audioGridOpen}
              toggleCollapse={this.audioToggleCollapse.bind(this)}
            >
              <FormGroup row>
                <Col xs="12" style={{ marginTop: -10 }}>
                  <AudioAllocationGrid
                    audioAllocation={this.props.currentCropAudioAllocation}
                    playAudio={this.playAudio.bind(this)}
                  />
                </Col>
              </FormGroup>
            </CollapseCards>
          </div>

          {this.state.updateFlag ? (
            <FormGroup row>
              <Col md="1">
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
              <Col md="1">
                <Button
                  className="theme-positive-btn"
                  onClick={() => this.onSubmit()}
                  style={{ pointerEvents: "none" }}
                >
                  Create
                </Button>
              </Col>
              <Col md="1">
                <Button
                  className="theme-reset-btn"
                  style={{ pointerEvents: "none", opacity: 0.5 }}
                >
                  {" "}
                  Reset
                </Button>
              </Col>
            </FormGroup>
          )}
        </CardLayout>
        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cropsList: state.cropsReducer.cropsList,
    currentCropAudioAllocation: state.cropsReducer.currentCropAudioAllocation,
    cropError: state.cropsReducer.cropError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeCropImage: image => dispatch(actions.storeCropImage(image)),
    getCropAudioAllocation: id => dispatch(actions.getCropAudioAllocation(id)),
    clearAudioAllocations: () => dispatch(actions.clearAudioAllocations())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropForm);
