import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";
export const storeRolesList = (rolesList, roles, inactiveRoles) => {
  return {
    type: actionTypes.GET_ROLES,
    rolesList: rolesList,
    roles: roles,
    inactiveRoles: inactiveRoles
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

export const logRoleMasterError = error => {
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
export const getRolesList = () => {
  let rolesList = [];
  let roles = [];
  let inactiveRoles = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Roles/GetRoles`)
      .then(response => {
        if (response.data.success) {
          roles = _.filter(response.data.data.Roles, function(role) {
            return role.Active === true;
          });
          inactiveRoles = _.filter(response.data.data.Roles, function(role) {
            return role.Active === false;
          });
          response.data.data.Roles.forEach(role => {
            if (role.RoleName !== null && role.Active === true) {
              rolesList.push({ label: role.RoleName, value: role.Id });
            }
          });
          dispatch(storeRolesList(rolesList, roles, inactiveRoles));
        } else {
          dispatch(logRoleMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logRoleMasterError(error.response.data.error));
      });
  };
};

export const createRole = role => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Roles/PostRole`, role)
      .then(response => {
        if (response.data.success) {
          dispatch(createRoleSuccess());
        } else {
          dispatch(logRoleMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logRoleMasterError(error.response.data.error));
      });
  };
};

export const updateRole = (id, role) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Roles/PutRole?id=${id}`, role)
      .then(response => {
        if (response.data.success) {
          dispatch(updateRoleSuccess());
        } else {
          dispatch(logRoleMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logRoleMasterError(error.response.data.error));
      });
  };
};

export const deleteRole = (id, role) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Roles/PutRole?id=${id}`, role)
      .then(response => {
        if (response.data.success) {
          dispatch(getRolesList());
        } else {
          dispatch(logRoleMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logRoleMasterError(error.response.data.error));
      });
  };
};
