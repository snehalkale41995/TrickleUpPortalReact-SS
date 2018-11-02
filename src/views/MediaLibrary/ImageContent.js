import React, { Component } from "react";
import { Button, Col, Row, FormGroup } from "reactstrap";
import CardLayout from "../../components/Cards/CardLayout";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

export default class ImageContent extends Component {
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
        name="Image"
        buttonName="Add image"
        //buttonLink={`${this.props.match.url}/imageUpload`}
        buttonLink={this}
      >
        {/* <FormGroup row>
          <Col xs="12" md="11" />
            <Col md="1" style={{marginLeft: -50 ,marginTop: -55}}>
              <Link to={`${this.props.match.url}/imageUpload`}>
                <Button type="button" className="theme-positive-btn">
                  <i className="fa fa-plus" />&nbsp; Add Image
                </Button>
              </Link>
              &nbsp;&nbsp;
            </Col>
          </FormGroup> */}
        <Row />
      </CardLayout>
    );
  }
}
