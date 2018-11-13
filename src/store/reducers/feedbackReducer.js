import * as actionTypes from "../actions/actionTypes";

const initialState = {
  feedbackQuestions: [],
  feedbackQuestionError: null
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_FEEDBACK_QUESTIONS:
      return {
        ...state,
        feedbackQuestions: action.feedBackQuestions,
        feedbackQuestionError: null
      };
    case actionTypes.LOG_FEEDBACK_QUESTIONS_ERROR:
      return {
        ...state,
        feedbackQuestions: action.feedBackQuestions,
        feedbackQuestionError: action.error
      };
    default:
      return state;
  }
};
export default feedbackReducer;
