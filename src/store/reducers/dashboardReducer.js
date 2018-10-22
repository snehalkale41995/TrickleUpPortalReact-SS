import * as actionTypes from "../actions/actionTypes";

const initialState = {
  message : "Hello World"
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WELCOME_MESSAGE:
      return {
        ...state
      };
    default:
      return state;
  }
};
export default dashboardReducer;

