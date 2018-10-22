import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";


export const loginUser = user => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/UserCredentials/AuthenticateUser`, user)
      .then(response => {
        if (response.data.success) {
          dispatch(storeUser(response.data.data));
        }
        else{
          dispatch(loginError(response.data.error));
        }
      })
      .catch((error)=>{
           dispatch(loginError(error));
      });
  };
};

export const storeUser = userData => {
  return {
    type: actionTypes.LOGIN_USER,
    loggedInUserId: userData.Id
  };
};

export const loginError = error => {
  return {
    type: actionTypes.LOGIN_ERROR,
    loginErrorMsg: error
  };
};
