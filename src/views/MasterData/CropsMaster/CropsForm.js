import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import InputElement from "../../../components/InputElement/InputElement";
import { AppSwitch } from "@coreui/react";
import AppConfig from "../../../constants/AppConfig";
import CropSteps from "./CropSteps";
class CropsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      cropStatus: "Active",
      renderURL: "",
      crop: {
        CropName: "",
        FilePath: "",
        CropNameRequired: false,
        FilePathRequired: false,
        Ready: false,
        CultivationSteps: []
      },
      filePath: ""
    };
  }
  componentWillMount() {
    if (this.props.match.params.id !== undefined) {
      let currentCrop = this.props.cropsList.find(
        crop => crop.Id == this.props.match.params.id
      );
      currentCrop.CultivationSteps = [];
      if (currentCrop) {
        let renderURL = `${AppConfig.serverURL}/${currentCrop.FilePath}`;
        let filePath = "";
        this.setState({
          updateFlag: true,
          crop: currentCrop,
          renderURL: renderURL,
          filePath: ""
        });
      }
    }
  }

  onSubmit(Crop) {
    console.log("onSubmit", Crop);
  }
  render() {
    const crop = { ...this.state.crop };
    return (
      <div style={{ marginTop: 30 }}>
        <CardLayout
          name="Crops"
          navigation={true}
          navigationRoute="/master/crops"
        >
          <FormGroup row />
          <div style={{ margin: 20 }}>
            <FormGroup row>
              <Col xs="12" md="12">
                <CropSteps
                  Crop={this.state.crop}
                  onSubmit={this.onSubmit}
                  updateFlag={this.state.updateFlag}
                />
              </Col>
            </FormGroup>
          </div>
        </CardLayout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    //cropsList: state.cropsReducer.cropsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //getCropsList: () => dispatch(actions.getCropsList())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropsForm);
