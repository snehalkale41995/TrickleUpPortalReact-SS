import React, { Component } from "react";
import { connect } from "react-redux";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import Loader from "../../components/Loader/Loader";
class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imageFile: null,
      uploadedFile: null,
      renderURL: "",
      imageTitle: "",
      imageRequired: false
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
    if (imageFile) {
      let imageData = new FormData();
      imageData.append("image", imageFile);
      this.setState({ loading: true });
      this.props.history.push("/mediaContent/imageContent");
    } else {
      this.setState({ imageRequired: true });
    }
  }
  render() {
    const { imageTitle, renderURL, imageRequired } = this.state;
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Image Upload"
        navigation={true}
        navigationRoute="/mediaContent/imageContent"
      >
        <div className="div-padding">
          <FormGroup row />
          <FormGroup row>
            <Col xs="12" md="6">
              <InputElement
                type="file"
                label="Image file"
                name="Image file"
                accept="image/*"
                required={imageRequired}
                onChange={event => this.handleUploadFile(event)}
              />
            </Col>
            {renderURL ? (
              <Col md="3" className="image-display">
                <Label> {imageTitle}</Label>
                <img src={renderURL} height={300} width={450} alt="" />
              </Col>
            ) : null}
            <Col md="3" />
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Button
                className="theme-positive-btn"
                onClick={this.onSubmitMedia.bind(this)}
              >
                Create
              </Button>
            </Col>
          </FormGroup>
        </div>
      </CardLayout>
    );
  }
}
export const mapStateToProps = state => {
  return {};
};

export const mapDispatchToProps = dispatch => {
  return {
    //storeMedia: fileData => dispatch(actions.postMediaContent(fileData))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ImageForm);
