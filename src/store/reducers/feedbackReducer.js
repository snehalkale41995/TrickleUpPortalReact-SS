import * as actionTypes from "../actions/actionTypes";

const initialState = {
  feedbackQuestions: [],
  feedbackQuestionError: null,
  userFeedbacks: [],
  userFeedbackError: null
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
        feedbackQuestionError: action.error
      };
    case actionTypes.STORE_USER_FEEDBACKS:
      return {
        ...state,
        userFeedbacks: action.userFeedbacks,
        userFeedbackError: null
      };
    case actionTypes.LOG_USER_FEEDBACK_ERROR:
      return {
        ...state,
        userFeedbackError: action.error
      };
    default:
      return state;
  }
};
export default feedbackReducer;
