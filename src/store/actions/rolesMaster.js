import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";

export const storeRolesList = (rolesList, roles) => {
  return {
    type: actionTypes.GET_ROLES,
    rolesList: rolesList,
    roles: roles
  };
};
export const storeGendersList = (genders ,gendersList) => {
  return {
    type: actionTypes.GET_GENDERS,
    gendersList: gendersList,
    genders : genders
  };
};
export const storeLanguagesList = (languages, languagesList) => {
  return {
    type: actionTypes.GET_LANGUAGES,
    languagesList: languagesList,
    languages : languages
  };
}

export const getRolesList = () => {
  let rolesList = [];
  let roles = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Roles/GetRoles`)
      .then(response => {
        response.data.data.Roles.forEach(role => {
          if (role.RoleName !== null) {
            rolesList.push({ label: role.RoleName, value: role.Id });
            roles.push(role);
          }
        });
        dispatch(storeRolesList(rolesList, roles));
      })
      .catch(error => {});
  };
};

export const getGendersList = () => {
  let gendersList = [];
  let genders = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Genders/GetGenders`)
      .then(response => {
        response.data.data.Genders.forEach(gender => {
          if (gender.GenderName !== null) {
            gendersList.push({ label: gender.GenderName, value: gender.Id });
            genders.push(gender);
          }
        });
        dispatch(storeGendersList(genders,gendersList));
      })
      .catch(error => {});
  };
};
export const getLanguageList = () => {
  let languageList = [];
  let languages = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Languages/GetLanguages`)
      .then(response => {
        response.data.data.Languages.forEach(language => {
          if (language.LanguageName !== null) {
            languageList.push({ label: language.LanguageName, value: language.Id });
            languages.push(language);
          }
        });
        dispatch(storeLanguagesList(languages, languageList));
      })
      .catch(error => {});
  };
};