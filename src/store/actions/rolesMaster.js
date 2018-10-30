import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from 'lodash'
export const storeRolesList = (rolesList, roles) => {
  return {
    type: actionTypes.GET_ROLES,
    rolesList: rolesList,
    roles: roles
  };
};
export const storeGendersList = (genders, gendersList) => {
  return {
    type: actionTypes.GET_GENDERS,
    gendersList: gendersList,
    genders: genders
  };
};
export const storeLanguagesList = (languages, languagesList) => {
  return {
    type: actionTypes.GET_LANGUAGES,
    languagesList: languagesList,
    languages: languages
  };
};

export const getRolesList = () => {
  let rolesList = [];
  let roles = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Roles/GetRoles`)
      .then(response => {
       roles =  _.filter(response.data.data.Roles, function(role) {
             return role.Active === true ;
              });
        response.data.data.Roles.forEach(role => {
          if (role.RoleName !== null && role.Active === true) {
            rolesList.push({ label: role.RoleName, value: role.Id });
          }
        });
        dispatch(storeRolesList(rolesList, roles));
      })
      .catch(error => {});
  };
};


export const createRole = (role) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Roles/PostRole`, role)
      .then(response => {
        dispatch(createRoleSuccess());
      })
      .catch(error => {
        dispatch(roleMasterError(error));
      });
  };
};

export const updateRole = (id, role) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Roles/PutRole?id=${id}`, role)
      .then(response => {
        dispatch(updateRoleSuccess());
      })
      .catch(error => {
        dispatch(roleMasterError(error));
      });
  };
};

export const deleteRole = (id, role) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Roles/PutRole?id=${id}`, role)
      .then(response => {
        dispatch(getRolesList());
      })
      .catch(error => {
        dispatch(roleMasterError(error));
      });
  };
};

export const roleMasterError = error => {
  return {
    type: actionTypes.LOG_ROLE_ERROR,
    error: error
  };
};

export const createRoleSuccess = () => {
  return {
    type: actionTypes.CREATE_ROLE_SUCCESS
  };
};

export const updateRoleSuccess = () => {
  return {
    type: actionTypes.UPDATE_ROLE_SUCCESS
  };
};
