import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeGendersList = (genders ,gendersList) => {
  return {
    type: actionTypes.GET_GENDERS,
    gendersList: gendersList,
    genders : genders
  };
};

export const getGendersList = () => {
  let gendersList = [];
  let genders = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Genders/GetGenders`)
      .then(response => {
         genders =  _.filter(response.data.data.Genders, function(gender) {
             return gender.Active === true ;
              });
        response.data.data.Genders.forEach(gender => {
          if (gender.GenderName !== null && gender.Active) {
            gendersList.push({ label: gender.GenderName, value: gender.Id });
          }
        });
        dispatch(storeGendersList(genders,gendersList));
      })
      .catch(error => {});
  };
};


export const createGender = (gender) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Genders/PostGender`, gender)
      .then(response => {
        dispatch(getGendersList());
        dispatch(createGenderSuccess());
      })
      .catch(error => {
        dispatch(genderMasterError(error));
      });
  };
}

export const updateGender = (id ,gender) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Genders/PutGender?id=${id}`, gender)
      .then(response => {
        dispatch(getGendersList());
         dispatch(updateGenderSuccess());
      })
      .catch(error => {
        dispatch(genderMasterError(error));
      });
  };
}

export const deleteGender = (id, gender) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Genders/PutGender?id=${id}`, gender)
      .then(response => {
          dispatch(getGendersList());
      })
      .catch(error => {
         dispatch(genderMasterError(error));
      });
  };
}

export const genderMasterError = (error) => {
  return {
    type : actionTypes.LOG_GENDER_ERROR,
    error : error
  }
}

export const createGenderSuccess= () =>{
  return {
    type : actionTypes.CREATE_GENDER_SUCCESS
  }
}

export const updateGenderSuccess= () =>{
  return {
    type : actionTypes.UPDATE_GENDER_SUCCESS
  }
}

