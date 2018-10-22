import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../components/InputElement/Dropdown";
import InputElement from "../../components/InputElement/InputElement";
import "../../../node_modules/video-react/dist/video-react.css"; // import css
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

class MediaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaCategory: [
        { label: "Image", value: "image" },
        { label: "Video", value: "video" },
        { label: "Audio", value: "audio" }
      ],
      category: [
        { label: "Crops", value: "Crops" },
        { label: "Live stock", value: "Live stock" }
      ],
      subCategoryCrops : [
        { label: "Chilli", value: "Chilli" },
        { label: "Bhendi", value: "Bhendi" },
      ],
      subCategoryLiveStock : [
        { label: "Goat", value: "Goat" },
        { label: "Cow", value: "Cow" },
      ],
      steps : [
        { label: "Plouging", value: "Plouging" },
        { label: "Weeding", value: "Weeding" },
      ],

      fileData: {
        LanguageId: "",
        Categrory: "",
        SubCategory: "",
        StepName:"",
        MediaType: "",
        MediaURL: "",
        FileName: "",
        FileSize: ""
      },
      renderURL: "",
      subCategory :[]
    };
  }

  handleUploadFile = event => {
    if(event.target.files.length !== 0){
      let data = event.target.files[0];
      let fileData = { ...this.state.fileData };
      fileData.FileName = data.name;
      fileData.FileSize = data.size;
      fileData.MediaType = data.type;
      let renderURL = URL.createObjectURL(event.target.files[0]);
      this.setState({
        fileData: fileData,
        renderURL: renderURL
      });
    }else{
      let fileData = { ...this.state.fileData };
      fileData.FileName = "";
      fileData.FileSize = "";
      fileData.MediaType = "";
      let renderURL = "";
      this.setState({
        fileData: fileData,
        renderURL: renderURL
      });
    }
  };
  onCategorySelect(value){
      let fileData = {...this.state.fileData};
      fileData.Categrory=value;
      let subCategory = [];
      if(value === "Crops") {
        subCategory = this.state.subCategoryCrops;
      }
      if(value === "Live stock") {
        subCategory = this.state.subCategoryLiveStock;
      }
      this.setState({
        fileData : fileData,
        subCategory :subCategory
      })
  }
  onSubCategorySelect(value) {
    let fileData = {...this.state.fileData};
    fileData.SubCategory=value;
    this.setState({
      fileData :fileData
    })
  }
  onStepSelect(value){
    let fileData = {...this.state.fileData};
    fileData.StepName=value;
    this.setState({
      fileData :fileData
    })
  }
  onSubmitMedia() {
    // let fileData = { ...this.state.fileData };
    // this.props.storeMedia(fileData);
    this.props.history.push("/mediaLibrary");
  }
  render() {
    const fileData = { ...this.state.fileData };
    return (
      <div style={{marginTop :30}}>
      <CardLayout name="Media" navigation={true} navigationRoute = "/mediaLibrary">
      <div style={{margin: 20}}>
        <FormGroup row>
          <Col xs="12" md="6">
            <FormGroup row />
            <FormGroup row>
              <Col xs="12" md="10">
                <Label />
                <DropdownSelect
                  name="Categrory"
                  placeholder="Select category..."
                  options={this.state.category}
                  value={fileData.Categrory}
                  onChange={this.onCategorySelect.bind(this)}
                  simpleValue
                />
              </Col>
            
            </FormGroup>
            <FormGroup row>
            <Col xs="12" md="10">
            <Label />
                <DropdownSelect
                  name="Sub-Categrory"
                  placeholder="Select sub-category..."
                  options={this.state.subCategory}
                  value={fileData.SubCategory}
                  onChange={this.onSubCategorySelect.bind(this)}
                  simpleValue
                />
                </Col>
              </FormGroup>
              <FormGroup row>
            <Col xs="12" md="10">
            <Label />
                <DropdownSelect
                  name="Step"
                  placeholder="Select step..."
                  options={this.state.steps}
                  value={fileData.StepName}
                  onChange={this.onStepSelect.bind(this)}
                  simpleValue
                />
                </Col>
              </FormGroup>
            <FormGroup row>
              <Col xs="12" md="6">
              <InputElement
              type="file"
              //value={fileData.FileName}
              onChange={event => this.handleUploadFile(event)}
            />
              </Col>
              <Col md="6">
               
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Button
                  className="theme-positive-btn"
                  onClick={this.onSubmitMedia.bind(this)}
                >
                  Submit
                </Button>
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            {fileData.MediaType.split("/")[0] === "image" ? (
              <img
                src={this.state.renderURL}
                style={{ height: 300, width: 350 }}
                alt = ""
              />
            ) : null}
            {fileData.MediaType.split("/")[0] === "video" ? (
              <VideoPlayer source={this.state.renderURL} />
            ) : null}
            {fileData.MediaType == "" ? (
              <VideoPlayer  />
            ) : null}
          </Col>
        </FormGroup>
        </div>
      </CardLayout>
      </div>
    );
  }
}
export const mapStateToProps = state => {
  return {};
};

export const mapDispatchToProps = dispatch => {
  return {
    storeMedia: fileData => dispatch(actions.postMediaContent(fileData))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MediaForm);
