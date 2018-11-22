import React, { Component } from "react";
import { Col, Row, FormGroup } from "reactstrap";
import CardLayout from "../../components/Cards/CardLayout";
import Loader from "../../components/Loader/Loader";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import ImageCards from "../../components/Cards/ImageCards";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
import ImageGrid from "./ImageGrid";
import AppConfig from "../../constants/AppConfig";

class ImageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showGridView: false
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
  showImage(cell, row) {
    return (
      <img
        src={row.FilePath}
        style={{ height: 50, width: 50 }}
        alt=""
      />
    );
  }
  toggleView() {
    this.setState({
      showGridView: !this.state.showGridView
    });
  }
  render() {
    const sortingOptions = {
      defaultSortName: "ImageName",
      noDataText: "No records found for Images",
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
          value: this.props.imageFiles.length
        }
      ],
      sizePerPage: 5
    };
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
        buttonName="Add Image"
        buttonLink={`${this.props.match.url}/imageUpload`}
        //buttonLink={this}
        //active="none"
        gridIcon={!this.state.showGridView ? "fa fa-th" : "fa fa-list"}
        toggleView={this.toggleView.bind(this)}
        gridIconTitle ={!this.state.showGridView ? "Show list view" : "Show grid view"}
      >
        {this.state.showGridView ? (
          <FormGroup row>
            <Col xs="12">
              <ImageGrid
                imageFiles={this.props.imageFiles}
                sortingOptions={sortingOptions}
                showImage={this.showImage.bind(this)}
              />
            </Col>
          </FormGroup>
        ) : (
          <FormGroup row>{imageCards}</FormGroup>
        )}

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
