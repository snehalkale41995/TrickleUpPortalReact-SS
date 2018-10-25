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
import Loader from "../../../components/Loader/Loader";

//const cropData = require('./crop.json');
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
        Cultivation_Steps: [],
        renderURL: ""
      },
      filePath: "",
      loading : true
    };
  }
  componentDidMount() {
    this.props.getCropsList();
    let compRef = this;
    if (this.props.match.params.id !== undefined) {
      if (this.props.cropsList.length !== 0) {
        this.props.CropsCultivationSteps(this.props.match.params.id);
        setTimeout(() => {
          if (compRef.props.currentCropData) {
            this.props.currentCropData.renderURL = `${AppConfig.serverURL}/${compRef.props.currentCropData.FilePath}`;
            let filePath = "";
            compRef.setState({
              loading :false,
              updateFlag: true,
              crop: compRef.props.currentCropData,
            });
          }
        }, 2000)
        //currentCrop.Cultivation_Steps = []; 
      }
    }else{
      this.setState({
        loading :false
      })
    }
  }

  onSubmit(Crop) {
    console.log("onSubmit", Crop);
  }
  render() {
    const crop = { ...this.state.crop };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) :  (
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
    cropsList: state.cropsReducer.cropsList,
    currentCropData: state.cropsReducer.currentCropData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropsList: () => dispatch(actions.getCropsList()),
    CropsCultivationSteps: (id) => dispatch(actions.getCropCultivationSteps(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropsForm);
