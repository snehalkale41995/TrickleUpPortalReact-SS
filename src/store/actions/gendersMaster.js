import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const catchUncaughtException = (exception) => {
  return {
    type: actionTypes.CATCH_UNCAUGHT_EXCEPTION,
    exception: exception
  };
}
export const clearUncaughtException = () => {
  return {
    type: actionTypes.CLEAR_UNCAUGHT_EXCEPTION,
  };
}
export const storeGendersList = (genders, gendersList, inactiveGenders) => {
  return {
    type: actionTypes.GET_GENDERS,
    gendersList: gendersList,
    genders: genders,
    inactiveGenders: inactiveGenders
  };
};

export const logGenderMasterError = error => {
  return {
    type: actionTypes.LOG_GENDER_ERROR,
    error: error
  };
};

export const createGenderSuccess = () => {
  return {
    type: actionTypes.CREATE_GENDER_SUCCESS
  };
};

export const updateGenderSuccess = () => {
  return {
    type: actionTypes.UPDATE_GENDER_SUCCESS
  };
};
export const getGendersList = () => {
  let gendersList = [];

  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Genders/GetGenders`)
      .then(response => {
        if (response.data.success) {
          let genders = _.filter(response.data.data.Genders, function(gender) {
            return gender.Active === true;
          });
          let inactiveGenders = _.filter(response.data.data.Genders, function(
            gender
          ) {
            return gender.Active === false;
          });
          response.data.data.Genders.forEach(gender => {
            if (gender.GenderName !== null && gender.Active) {
              gendersList.push({ label: gender.GenderName, value: gender.Id });
            }
          });
          dispatch(storeGendersList(genders, gendersList, inactiveGenders));
        } else {
          dispatch(logGenderMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logGenderMasterError("Something went wrong!"));
      });
  };
};

export const createGender = gender => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Genders/PostGender`, gender)
      .then(response => {
        if (response.data.success) {
          dispatch(getGendersList());
          dispatch(createGenderSuccess());
        } else {
          dispatch(logGenderMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logGenderMasterError("Something went wrong!"));
      });
  };
};

export const updateGender = (id, gender) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Genders/PutGender?id=${id}`, gender)
      .then(response => {
        if (response.data.success) {
          dispatch(getGendersList());
          dispatch(updateGenderSuccess());
        } else {
          dispatch(logGenderMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logGenderMasterError("Something went wrong!"));
      });
  };
};

export const deleteGender = (id, gender) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Genders/PutGender?id=${id}`, gender)
      .then(response => {
        if (response.data.success) {
          dispatch(getGendersList());
        } else {
          dispatch(logGenderMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logGenderMasterError("Something went wrong!"));
      });
  };
};
