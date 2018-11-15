import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeFeedbackQuestionsList = feedBackQuestions => {
  return {
    type: actionTypes.STORE_FEEDBACK_QUESTIONS,
    feedBackQuestions: feedBackQuestions
  };
};
export const logFeedbackQuestionsError = error => {
  return {
    type: actionTypes.LOG_FEEDBACK_QUESTIONS_ERROR,
    error: error
  };
};
export const storeUserFeedbackList = userFeedbacks=> {
  return {
    type: actionTypes.STORE_USER_FEEDBACKS,
    userFeedbacks: userFeedbacks
  };
};
export const logUserFeedbackError = error => {
  return {
    type: actionTypes.LOG_USER_FEEDBACK_ERROR,
    error: error
  };
};

export const getFeedbackQuestionList = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/FeedBackQuestions/GetFeedBackQuestions`)
      .then(response => {
        if (response.data.success) {
          dispatch(storeFeedbackQuestionsList(response.data.data.question));
        } else {
          dispatch(logFeedbackQuestionsError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logFeedbackQuestionsError(error.response.data.Message));
      });
  };
};

export const getUserFeedbackList = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/UserFeedbacks/GetUserFeedbacks`)
      .then(response => {
        if (response.data.success) {
          dispatch(storeUserFeedbackList(response.data.data.UserFeedbacks));
        } else {
          dispatch(logUserFeedbackError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logUserFeedbackError(error.response.data.Message));
      });
  };
};
// export const createFeedback = Feedback => {
//   return dispatch => {
//     axios
//       .post(`${AppConfig.serverURL}/api/Feedbacks/PostFeedback`, Feedback)
//       .then(response => {
//         if (response.data.success) {
//           dispatch(getFeedbackQuestionList());
//         } else {
//           dispatch(logFeedbackError(response.data.error));
//         }
//       })
//       .catch(error => {
//         dispatch(logFeedbackError(error.response.data.success));
//       });
//   };
// };
// export const updateFeedback = (id, Feedback) => {
//   return dispatch => {
//     axios
//       .post(`${AppConfig.serverURL}/api/Feedbacks/PutFeedback?id=${id}`, Feedback)
//       .then(response => {
//         if (response.data.success) {
//           dispatch(getFeedbackQuestionList());
//         } else {
//           dispatch(logFeedbackError(response.data.error));
//         }
//       })
//       .catch(error => {
//         dispatch(logFeedbackError(error.response.data.success));
//       });
//   };
// };
// export const deleteFeedback = (id, Feedback) => {
//   return dispatch => {
//     axios
//       .post(`${AppConfig.serverURL}/api/Feedbacks/PutFeedback?id=${id}`, Feedback)
//       .then(response => {
//         if (response.data.success) {
//           dispatch(getFeedbackQuestionList());
//         } else {
//           dispatch(logFeedbackError(response.data.error));
//         }
//       })
//       .catch(error => {
//         dispatch(logFeedbackError(error.response.data.success));
//       });
//   };
// };
