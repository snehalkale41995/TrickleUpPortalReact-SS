import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import Loader from "../../components/Loader/Loader";
import _ from "lodash";
import { Async } from "react-select";
import "react-select/dist/react-select.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
import AppConfig from "../../constants/AppConfig";

class ImageAllocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      updateFlag: false,
      imageAllocation: {
        imageRequired: false
      },
      cardTitle: "",
      imageCategory: "",
      imageValue: "",
      renderURL: "",
      error: ""
    };
  }
  componentWillMount() {
    let imageCategory = this.props.match.params.imageCategory;
    if (imageCategory === "crop") {
      this.props.getCropsList();
    } else if (imageCategory === "cropStep") {
      this.props.getCropSteps();
    } else {
      this.props.getCropStepsMaterial();
    }
  }
  componentDidMount() {
    setTimeout(() => {
      let id = this.props.match.params.id;
      let imageCategory = this.props.match.params.imageCategory;
      let imageAllocation = {};
      if (imageCategory === "crop") {
        imageAllocation = _.find(this.props.activeCrops, function(crop) {
          return crop.Id === parseInt(id);
        });
      } else if (imageCategory === "cropStep") {
        imageAllocation = _.find(this.props.activeCropSteps, function(
          cropStep
        ) {
          return cropStep.Id === parseInt(id);
        });
      } else {
        imageAllocation = _.find(this.props.activeCropMaterial, function(
          cropMaterial
        ) {
          return cropMaterial.Id === parseInt(id);
        });
      }
      if (imageAllocation !== undefined) {
        imageAllocation.imageRequired = false;
        this.setState({
          loading: false,
          imageAllocation
        });
      } else {
        this.goBack();
      }
    }, 1000);
  }
  goBack() {
    this.props.history.goBack();
  }
  handleImageChange = imageSelected => {
    let imageAllocation = { ...this.state.imageAllocation };
    if (imageSelected !== null) {
      imageAllocation.FilePath = imageSelected.FilePath;
      imageAllocation.Image_Path = imageSelected.FilePath;
      imageAllocation.ImagePath = imageSelected.FilePath;
      imageAllocation.imageRequired = false;
      let imageValue = imageSelected;
      let renderURL = `${AppConfig.serverURL}/${imageSelected.FilePath}`;
      this.setState({ imageAllocation, renderURL, imageValue });
    } else {
      imageAllocation.FilePath = "";
      this.setState({ imageAllocation, renderURL: "", imageValue: "" });
    }
  };

  onSubmit() {
    let imageAllocation = { ...this.state.imageAllocation };
    if (imageAllocation.FilePath) {
      imageAllocation.UpdatedBy = localStorage.getItem("user");
      imageAllocation.UpdatedOn = new Date();
      let image = {};
      let imageCategory = this.props.match.params.imageCategory;
      if (imageCategory === "crop") {
        image = _.pick(imageAllocation, [
          "Id",
          "FilePath",
          "UpdatedBy",
          "UpdatedOn"
        ]);
        this.props.updateCropImage(image.Id, image);
      } else if (imageCategory === "cropStep") {
        image = _.pick(imageAllocation, [
          "Id",
          "ImagePath",
          "UpdatedBy",
          "UpdatedOn"
        ]);
        // update crop step image
        this.props.updateCropsStepsImage(image.Id, image);
      } else {
        image = _.pick(imageAllocation, [
          "Id",
          "Image_Path",
          "UpdatedBy",
          "UpdatedOn"
        ]);
        this.props.updateCropMaterialImage(image.Id, image);
        // update crop step image
      }
      let message = "";
      let compRef = this;
      this.setState({ loading: true });
      if (imageCategory === "crop") {
        if (this.props.cropError) {
          this.setState({ error: this.props.cropError });
        } else {
          this.setState({ error: "" });
        }
      } else if (imageCategory === "cropStep") {
        if (this.props.cropStepError) {
          this.setState({ error: this.props.cropStepError });
        } else {
          this.setState({ error: "" });
        }
      } else {
        if (this.props.cropMaterialError) {
          this.setState({ error: this.props.cropMaterialError });
        } else {
          this.setState({ error: "" });
        }
      }

      setTimeout(() => {
        compRef.state.error
          ? (message = "Something went wrong !")
          : (message = "Image allocation successfully");
        compRef.onReset();
        compRef.setState({ loading: false });
        Toaster.Toaster(message, compRef.state.error);
        setTimeout(() => {
          if (!compRef.state.error) {
            compRef.goBack();
          }
        }, 1000);
      }, 1000);
    } else {
      !imageAllocation.FilePath ? (imageAllocation.imageRequired = true) : null;
      this.setState({ imageAllocation });
    }
  }
  onReset() {
    let imageAllocation = { ...this.state.imageAllocation };
    imageAllocation.imageRequired = false;
    imageAllocation.FilePath = "";
    this.setState({
      //   audioAllocation: {
      //     Id: "",
      //     LangId: "",
      //     LangIdRequired: false,
      //     FieldType: "",
      //     FieldTypeRequired: false,
      //     AudioId: "",
      //     AudioIdRequired: false,
      //     CreatedBy: "",
      //     CreatedOn: "",
      //     UpdatedBy: "",
      //     UpdatedOn: "",
      //     Active: true
      //   },
      imageAllocation,
      imageValue: "",
      renderURL: ""
      //   error : ""
    });
  }
  render() {
    const options = this.props.imageOptions;
    const getOptions = (input, callback) => {
      let filterOpt = [];
      if (input) {
        filterOpt = _.filter(options, function(image) {
          if (
            _.includes(image.label.toLowerCase(), input.toLowerCase()) ||
            image.label.toLowerCase() == input.toLowerCase()
          ) {
            return image;
          }
        });
      }
      setTimeout(() => {
        callback(null, {
          options: filterOpt,
          complete: true
        });
      }, 500);
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Image Allocation Form"
        navigation={true}
        navigationRoute={this}
        onClick={this.goBack.bind(this)}
      >
        <div className="div-padding">
          <FormGroup row>
            <Col xs="12" md="6">
              <FormGroup row>
                <Col xs="12" md="10">
                  <Label>Image</Label>
                  <Async
                    name="form-field-name"
                    cacheOptions
                    value={this.state.imageValue}
                    defaultOptions
                    onChange={this.handleImageChange.bind(this)}
                    loadOptions={getOptions}
                  />
                  {this.state.imageAllocation.imageRequired ? (
                    <div className="help-block">*Image is required</div>
                  ) : null}
                </Col>
              </FormGroup>
              <FormGroup row />
              <FormGroup row>
                <Col xs="12" md="2">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmit.bind(this)}
                  >
                    Create
                  </Button>
                </Col>
                <Col md="2">
                  <Button
                    className="theme-reset-btn"
                    onClick={this.onReset.bind(this)}
                  >
                    Reset
                  </Button>
                </Col>
              </FormGroup>
            </Col>

            {this.state.renderURL ? (
              <Col md="6" className="image-display">
                <img
                  src={this.state.renderURL}
                  height={300}
                  width={450}
                  alt=""
                />
              </Col>
            ) : null}
          </FormGroup>
        </div>
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
export const mapStateToProps = state => {
  return {
    imageOptions: state.mediaReducer.imageOptions,
    imageFiles: state.mediaReducer.imageFiles,
    cropMaterialError: state.cropsReducer.cropMaterialError,
    cropError: state.cropsReducer.cropError,
    cropStepError: state.cropsReducer.cropStepError,

    activeCrops: state.cropsReducer.activeCrops,
    activeCropSteps: state.cropsReducer.activeCropSteps,
    activeCropMaterial: state.cropsReducer.activeCropMaterial
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getCropsList: () => dispatch(actions.getCropsList()),
    getCropSteps: () => dispatch(actions.getCropSteps()),
    getCropStepsMaterial: () => dispatch(actions.getCropStepsMaterial()),
    updateCropImage: (id, imageAllocate) =>
      dispatch(actions.updateCropImage(id, imageAllocate)),
    updateCropsStepsImage: (id, imageAllocate) =>
      dispatch(actions.updateCropStepImage(id, imageAllocate)),
    updateCropMaterialImage: (id, imageAllocate) =>
      dispatch(actions.updateCropMaterialImage(id, imageAllocate))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  ImageAllocationForm
);
