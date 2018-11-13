import React, { Component } from "react";
import { Route } from "react-router-dom";
import FeedbackQuestions from "./FeedbackQuestions";
import FeedbackResponses from "./FeedbackResponses";

export default class Feedback extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path={`${this.props.match.path}/feedbackQuestions`}
          component={FeedbackQuestions}
        />
        {/* <Route
          path={`${this.props.match.path}/crops/CropForm/:id?`}
          component={CropForm}
        /> */}
        <Route
          exact
          path={`${this.props.match.path}/feedbackResponse`}
          component={FeedbackResponses}
        />
        {/* <Route
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
        /> */}
      </div>
    );
  }
}
