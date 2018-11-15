import React, { Component } from "react";
import { Route } from "react-router-dom";
import Crops from "./Crops";
import CropSteps from "./CropSteps";
import CropsMaterial from "./CropsMaterial";
import CropForm from "./CropForm";
import CropStepsForm from "./CropStepsForm";
import CropsMaterialForm from "./CropsMaterialForm";
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
          path={`${this.props.match.path}/audioAllocation/:audioCategory?/:id?`}
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
