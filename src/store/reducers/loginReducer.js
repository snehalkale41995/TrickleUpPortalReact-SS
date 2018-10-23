import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loggedInUserId: "",
  loginError: false,
  loginErrorMsg: "",
  changePasswordError : false,
  changePasswordErrorMsg : ""
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
    case actionTypes.CHANGE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordError: false,
        loginErrorMsg: ""
      };
    case actionTypes.CHANGE_USER_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordError: true,
        changePasswordErrorMsg: "Old Password is incorrect"
      };
    default:
      return state;
  }
};
export default loginReducer;
