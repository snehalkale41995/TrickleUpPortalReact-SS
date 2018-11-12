import React, { Component } from "react";
import {Col, Row} from "reactstrap";
import CardLayout from "../../components/Cards/CardLayout";
import Loader from "../../components/Loader/Loader";
import AudioCards from "../../components/Cards/AudioCards";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
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
    setTimeout(() => {
      this.setState({ loading: false });
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
        active = "none"
      >
        <Row>{audioCards}</Row>
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    audioFiles: state.mediaReducer.audioFiles
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAudioFiles: () => dispatch(actions.getAudioFiles())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AudioContent);
