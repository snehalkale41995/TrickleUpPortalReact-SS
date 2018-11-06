import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import CardLayout from "../../components/Cards/CardLayout";
import Loader from "../../components/Loader/Loader";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import VideoCards from "../../components/Cards/VideoCards";
class VideoContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    this.props.getVideoFiles();
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 2000);
  }
  render() {
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
        //buttonLink={`${this.props.match.url}/videoUpload`}
        buttonLink={this}
      >
        <Row>{videoCards}</Row>
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    videoFiles: state.mediaReducer.videoFiles
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getVideoFiles: () => dispatch(actions.getVideoFiles())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoContent);
