import React, { Component } from "react";
import { Col, Row} from "reactstrap";
import CardLayout from "../../components/Cards/CardLayout";
import Loader from "../../components/Loader/Loader";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import ImageCards from "../../components/Cards/ImageCards";
class ImageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    this.props.getImageFiles();
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 2000);
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
      >
      <Row>{imageCards}</Row>
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    imageFiles: state.mediaReducer.imageFiles
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getImageFiles: () => dispatch(actions.getImageFiles())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ImageContent);

