import React, { Component } from "react";
import { Button, Col, Row, FormGroup } from "reactstrap";
import CardLayout from "../../components/Cards/CardLayout";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

export default class VideoContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 2000);
  }
  render() {
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Video"
        buttonName="Add video"
        buttonLink={`${this.props.match.url}/videoUpload`}
      >
        <Row />
      </CardLayout>
    );
  }
}
