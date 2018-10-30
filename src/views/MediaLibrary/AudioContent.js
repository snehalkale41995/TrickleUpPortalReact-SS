import React, { Component } from "react";
import { Button, Col, Row, FormGroup } from "reactstrap";
import CardLayout from "../../components/Cards/CardLayout";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import InputElement from "../../components/InputElement/InputElement";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import AudioCards from "../../components/Cards/AudioCards";
export default class AudioContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      renderURL: ""
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout name="Audio">
          <FormGroup row>
            <Col xs="12" md="11" />
            <Col md="1" style={{ marginLeft: -50, marginTop: -55 }}>
              <Link to={`${this.props.match.url}/audioUpload`}>
                <Button type="button" className="theme-positive-btn">
                  <i className="fa fa-plus" />&nbsp; Add audio
                </Button>
              </Link>
              &nbsp;&nbsp;
            </Col>
          </FormGroup>
          <Row>
            <Col xs="12" md="4">
              <AudioCards
                category="Snehal"
                subCategory="Patil"
                autoPlay={false}
                mute={true}
                id={0}
                source={this.state.renderURL}
              />
            </Col>
          </Row>
        </CardLayout>
      </div>
    );
  }
}
