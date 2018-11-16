import React, { Component } from "react";
import { Col, Row, FormGroup } from "reactstrap";
import CardLayout from "../../components/Cards/CardLayout";
import Loader from "../../components/Loader/Loader";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import VideoCards from "../../components/Cards/VideoCards";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
import VideoGrid from "./VideoGrid";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
class VideoContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showGridView: false
    };
  }
  componentDidMount() {
    this.props.getVideoFiles();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({ loading: false });
      if (compRef.props.videoError) {
        Toaster.Toaster("Something went wrong !", compRef.props.videoError);
      }
    }, 1000);
  }
  toggleView() {
    this.setState({
      showGridView: !this.state.showGridView
    });
  }
  playVideo(cell, row) {
    return (
      <div style={{ height: 100, width: 100 }}>
        <VideoPlayer
          dimensions="video-grid-dimens"
          autoPlay={false}
          source={row.FilePath}
          mute={true}
        />
      </div>
    );
  }
  render() {
    const sortingOptions = {
      defaultSortName: "VideoName",
      noDataText: "No records found for Audios",
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
          value: this.props.videoFiles.length
        }
      ],
      sizePerPage: 5
    };
    let videoCards = this.props.videoFiles.map((media, idx) => {
      return (
        <Col xs="12" md="4" key={idx}>
          <VideoCards
            videoName={media.VideoName}
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
        name="Videos"
        buttonName="Add video"
        buttonLink={`${this.props.match.url}/videoUpload`}
        //buttonLink={this}
        //active="none"
        gridIcon={!this.state.showGridView ? "fa fa-th" : "fa fa-list"}
        toggleView={this.toggleView.bind(this)}
        gridIconTitle ={!this.state.showGridView ? "Show list view" : "Show grid view"}
      >
        {this.state.showGridView ? (
          <FormGroup row>
            <Col xs="12">
              <VideoGrid
                videoFiles={this.props.videoFiles}
                sortingOptions={sortingOptions}
                playVideo={this.playVideo.bind(this)}
              />
            </Col>
          </FormGroup>
        ) : (
          <Row>{videoCards}</Row>
        )}
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    videoFiles: state.mediaReducer.videoFiles,
    videoError: state.mediaReducer.videoError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getVideoFiles: () => dispatch(actions.getVideoFiles())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoContent);
