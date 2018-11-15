import React, { Component } from "react";
import { connect } from "react-redux";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Loader from "../../components/Loader/Loader";
import DropdownSelect from "../../components/InputElement/Dropdown";
class AudioAllocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      audioCategory: "",
      id: ""
    };
  }
  componentDidMount() {
    console.log("this.props.match.params.id", this.props.match.params.id);
    console.log(
      "this.props.match.params.audioCategory",
      this.props.match.params.audioCategory
    );
    setTimeout(() => {
      this.setState({
        loading: false,
        audioCategory: this.props.match.params.audioCategory,
        id: this.props.match.params.id
      });
    }, 2000);
  }
  goBack() {
    this.props.history.goBack();
  }

  onSubmitMedia() {}
  render() {
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Audio Allocation Form"
        navigation={true}
        navigationRoute={this}
        onClick={this.goBack.bind(this)}
      >
        <div className="div-padding">
          <FormGroup row />
          <FormGroup row>
            <Col xs="12" md="5">
            <Label>Audio category</Label>
              <DropdownSelect 
                  placeholder="Select audio category "
                  //value={user.Village}
                  //disabled={this.state.villageDisabled}
                  //options={this.state.villageOptions}
                  //required={this.state.villageRequired}
                  //onChange={this.onVillageSelection.bind(this)}
              /> 
            </Col>
            <Col md="5">
            <Label>Language</Label>
              <DropdownSelect 
                  placeholder="Select audio category "
                  //value={user.Village}
                  //disabled={this.state.villageDisabled}
                  //options={this.state.villageOptions}
                  //required={this.state.villageRequired}
                  //onChange={this.onVillageSelection.bind(this)}
              /> 
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12" md="5">
            <Label>Audio</Label>
              <DropdownSelect 
                  placeholder="Select audio "
                  //value={user.Village}
                  //disabled={this.state.villageDisabled}
                  //options={this.state.villageOptions}
                  //required={this.state.villageRequired}
                  //onChange={this.onVillageSelection.bind(this)}
              /> 
            </Col>
            <Col md="5">
              <Label></Label>
              <AudioPlayer
                //source={renderURL}
                autoPlay={true}
                //title={audioTitle}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="3">
              <Button
                className="theme-positive-btn"
                onClick={this.onSubmitMedia.bind(this)}
              >
                Create
              </Button>
            </Col>
          </FormGroup>
        </div>
      </CardLayout>
    );
  }
}
export const mapStateToProps = state => {
  return {};
};

export const mapDispatchToProps = dispatch => {
  return {
    //storeMedia: fileData => dispatch(actions.postMediaContent(fileData))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  AudioAllocationForm
);
