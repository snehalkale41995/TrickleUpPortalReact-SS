import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loggedInUserId: "",
  loginError: false,
  loginErrorMsg: ""
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        loggedInUserId: action.loggedInUserId,
        loginError: false,
        loginErrorMsg: ""
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        loginError: true,
        loginErrorMsg: action.loginErrorMsg
      };
    default:
      return state;
  }
};
export default loginReducer;
