import React, { Component } from "react";
import { Route } from "react-router-dom";
import Crops from "./Crops/Crops";
import CropSteps from "./CropSteps/CropSteps";
import CropsMaterial from "./CropsMaterial/CropsMaterial";
import CropForm from "./Crops/CropForm";
import CropStepsForm from "./CropSteps/CropStepsForm";
import CropsMaterialForm from "./CropsMaterial/CropsMaterialForm";
import AudioAllocationForm from "./AudioAllocationForm";

export default class CropsCultivation extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path={`${this.props.match.path}/crops`}
          component={Crops}
        />
        <Route
          path={`${this.props.match.path}/crops/CropForm/:id?`}
          component={CropForm}
        />
        <Route
          path={`${this.props.match.path}/audioAllocation/:audioCategory?/:id?/:audioId?`}
          component={AudioAllocationForm}
        />
        <Route
          exact
          path={`${this.props.match.path}/CropSteps`}
          component={CropSteps}
        />
        <Route
          path={`${this.props.match.path}/CropSteps/CropStepForm/:id?`}
          component={CropStepsForm}
        />
        <Route
          exact
          path={`${this.props.match.path}/CropsMaterial`}
          component={CropsMaterial}
        />
        <Route
          path={`${this.props.match.path}/CropsMaterial/CropsMaterialForm/:id?`}
          component={CropsMaterialForm}
        />
      </div>
    );
  }
}
