import React, { Component } from "react";
import { Col, Row, FormGroup } from "reactstrap";
import CardLayout from "../../components/Cards/CardLayout";
import Loader from "../../components/Loader/Loader";
import AudioCards from "../../components/Cards/AudioCards";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
import AudioGrid from "./AudioGrid";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
class AudioContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      renderURL: "",
      showGridView: false
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
  playAudio(cell, row) {
    return <AudioPlayer autoPlay={false} source={row.FilePath} />;
  }
  toggleView() {
    this.setState({
      showGridView: !this.state.showGridView
    });
  }
  render() {
    const sortingOptions = {
      defaultSortName: "FileName",
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
          value: this.props.audioFiles.length
        }
      ],
      sizePerPage: 5
    };
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
        buttonLink={`${this.props.match.url}/audioUpload`}
        //buttonLink={this}
        //active="none"
        gridIcon={this.state.showGridView ? "fa fa-th" : "fa fa-list"}
        toggleView={this.toggleView.bind(this)}
        gridIconTitle ={this.state.showGridView ? "Show list view" : "Show grid view"}
      >
        {this.state.showGridView ? (
          <FormGroup row>
            <Col xs="12">
              <AudioGrid
                audioFiles={this.props.audioFiles}
                sortingOptions={sortingOptions}
                playAudio={this.playAudio.bind(this)}
              />
            </Col>
          </FormGroup>
        ) : (
          <FormGroup row>{audioCards}</FormGroup>
        )}
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
