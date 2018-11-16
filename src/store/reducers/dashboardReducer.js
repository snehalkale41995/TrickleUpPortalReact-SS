import * as actionTypes from "../actions/actionTypes";

const initialState = {
  uncaughtException: null
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CATCH_UNCAUGHT_EXCEPTION:
      return {
        ...state,
        uncaughtException: action.exception
      };
    case actionTypes.CLEAR_UNCAUGHT_EXCEPTION:
      return {
        ...state,
        uncaughtException: null
      };
    default:
      return state;
  }
};
export default dashboardReducer;
