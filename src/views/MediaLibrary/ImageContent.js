import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import CardLayout from "../../components/Cards/CardLayout";
import Loader from "../../components/Loader/Loader";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import ImageCards from "../../components/Cards/ImageCards";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
class ImageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    this.props.getImageFiles();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({ loading: false });
      if (compRef.props.imageError) {
        Toaster.Toaster("Something went wrong !", compRef.props.imageError);
      }
    }, 1000);
  }
  render() {
    let imageCards = this.props.imageFiles.map((media, idx) => {
      return (
        <Col xs="12" md="4" key={idx}>
          <ImageCards
            imageName={media.ImageName}
            id={idx}
            source={media.FilePath}
          />
        </Col>
      );
    });
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Images"
        buttonName="Add image"
        //buttonLink={`${this.props.match.url}/imageUpload`}
        buttonLink={this}
        active="none"
      >
        <Row>{imageCards}</Row>
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    imageFiles: state.mediaReducer.imageFiles,
    imageError: state.mediaReducer.imageError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getImageFiles: () => dispatch(actions.getImageFiles())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ImageContent);
