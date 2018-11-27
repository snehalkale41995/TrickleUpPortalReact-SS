import React, { Component } from "react";
import { connect } from "react-redux";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import Loader from "../../components/Loader/Loader";
import * as actions from "../../store/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
import _ from "lodash";
class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imageFile: null,
      uploadedFile: null,
      renderURL: "",
      imageTitle: "",
      imageRequired: false,
      imageInvalid: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }
  handleUploadFile = event => {
    if (event.target.files.length !== 0) {
      let image = event.target.files[0];
      this.setState({
        imageFile: image,
        renderURL: URL.createObjectURL(image),
        imageTitle: image.name,
        imageRequired: false
      });
    } else {
      this.setState({
        imageFile: null,
        renderURL: "",
        imageTitle: "",
        imageRequired: true
      });
    }
  };

  onSubmitMedia() {
    let imageFile = this.state.imageFile;
    let compRef = this;
    if (this.validImage(imageFile)) {
      let imageData = new FormData();
      imageData.append("image", imageFile);
      this.props.postImageFile(imageData);
      this.setState({ loading: true });
      let message = "";
      setTimeout(() => {
        compRef.props.imageError
          ? (message = "Something went wrong !")
          : (message = "Image uploaded successfully");
        compRef.onReset();
        compRef.setState({ loading: false });
        Toaster.Toaster(message, compRef.props.imageError);
        setTimeout(() => {
          if (!compRef.props.imageError) {
            compRef.onReset();
            compRef.props.history.push("/mediaContent/imageContent");
          }
        }, 1000);
      }, 1000);
    }
  }
  validImage(image){
    if (image && image.type !== "" && _.includes(image.type , "image")) {
      this.setState({ isAudio: true });
      return true;
    } else {
      if (!image) {
        this.setState({ imageRequired: true });
      }
      if (image && (image.type === "" || !_.includes(image.type, "image"))) {
        this.setState({ imageInvalid: true });
      }
      return false;
    }
  }
  onReset() {
    this.setState({
      imageFile: null,
      uploadedFile: null,
      renderURL: "",
      imageTitle: "",
      imageRequired: false,
      imageInvalid: false
    });
  }
  render() {
    const { imageTitle, imageFile, renderURL, imageRequired, imageInvalid } = this.state;
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Image Upload"
        navigation={true}
        navigationRoute="/mediaContent/imageContent"
      >
        <div className="div-padding">
          <FormGroup row>
            <Col xs="12" md="6">
              <FormGroup row>
                <Col xs="12" md="10">
                  <InputElement
                    type="file"
                    label="Image file"
                    name="Image file"
                    accept="image/*"
                    value={imageFile === null ? "" : null}
                    required={imageRequired}
                    invalid={imageInvalid}
                    onChange={event => this.handleUploadFile(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12" md="2">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmitMedia.bind(this)}
                  >
                    Upload
                  </Button>
                </Col>
                <Col md="1">
                  <Button
                    className="theme-reset-btn"
                    onClick={this.onReset.bind(this)}
                  >
                    Reset
                  </Button>
                </Col>
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup row>
                {renderURL ? (
                  <Col xs="12" md="10" className="image-display">
                    <Label> {imageTitle}</Label>
                    <img src={renderURL} height={300} width={450} alt="" />
                  </Col>
                ) : null}
              </FormGroup>
            </Col>
          </FormGroup>
        </div>
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
export const mapStateToProps = state => {
  return {
    imageError: state.mediaReducer.imageError
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    postImageFile: imageFile => dispatch(actions.postImageFile(imageFile))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ImageForm);
