import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import CardLayout from "../../components/Cards/CardLayout";
import Loader from "../../components/Loader/Loader";
import AudioCards from "../../components/Cards/AudioCards";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
class AudioContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      renderURL: ""
    };
  }
  componentDidMount() {
    this.props.getAudioFiles();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({ loading: false });
      if (compRef.props.audioError) {
        Toaster.Toaster("Something went wrong !", compRef.props.audioError);
      }
    }, 1000);
  }

  render() {
    let audioCards = this.props.audioFiles.map((media, idx) => {
      return (
        <Col xs="12" md="4" key={idx}>
          <AudioCards
            audioName={media.FileName}
            autoPlay={false}
            mute={true}
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
        name="Audios"
        buttonName="Add audio"
        //buttonLink={`${this.props.match.url}/audioUpload`}
        buttonLink={this}
        active="none"
      >
        <Row>{audioCards}</Row>
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    audioFiles: state.mediaReducer.audioFiles,
    audioError: state.mediaReducer.audioError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAudioFiles: () => dispatch(actions.getAudioFiles())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AudioContent);
